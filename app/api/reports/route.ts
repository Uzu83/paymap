import { type NextRequest, NextResponse } from "next/server";
import { checkAndRecord, extractIp, hashIp } from "@/lib/rateLimit";
import { SHOPS } from "@/lib/shops";
import { getServerSupabase, hasSupabaseEnv } from "@/lib/supabase";
import type { PaymentMethod, ReportKind } from "@/lib/types";

export const runtime = "nodejs";

const METHODS = new Set<PaymentMethod>([
  "paypay",
  "credit_card",
  "transit_ic",
  "rakuten_pay",
  "aupay",
  "cash",
]);
const KINDS = new Set<ReportKind>(["worked", "failed"]);
const SHOP_IDS = new Set(SHOPS.map((s) => s.id));

export async function GET(request: NextRequest) {
  if (!hasSupabaseEnv()) {
    return NextResponse.json({ stats: [], source: "none" });
  }

  const shopId = request.nextUrl.searchParams.get("shopId");
  const shopIds = shopId ? [shopId] : null;
  if (shopId && !SHOP_IDS.has(shopId)) {
    return NextResponse.json({ error: "unknown shopId" }, { status: 400 });
  }

  try {
    const supabase = getServerSupabase();
    const { data, error } = await supabase.rpc("payment_report_stats", {
      p_shop_ids: shopIds,
    });
    if (error) {
      console.error("payment_report_stats", error);
      return NextResponse.json({ error: "stats failed" }, { status: 500 });
    }
    return NextResponse.json({ stats: data ?? [], source: "supabase" });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "unavailable" }, { status: 503 });
  }
}

type Body = {
  shopId?: unknown;
  method?: unknown;
  kind?: unknown;
};

export async function POST(request: NextRequest) {
  if (!hasSupabaseEnv()) {
    return NextResponse.json(
      { error: "supabase not configured" },
      { status: 503 },
    );
  }

  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ error: "invalid json" }, { status: 400 });
  }

  const shopId = typeof body.shopId === "string" ? body.shopId : null;
  const method = typeof body.method === "string" ? body.method : null;
  const kind = typeof body.kind === "string" ? body.kind : null;

  if (!shopId || !SHOP_IDS.has(shopId)) {
    return NextResponse.json({ error: "invalid shopId" }, { status: 400 });
  }
  if (!method || !METHODS.has(method as PaymentMethod)) {
    return NextResponse.json({ error: "invalid method" }, { status: 400 });
  }
  if (!kind || !KINDS.has(kind as ReportKind)) {
    return NextResponse.json({ error: "invalid kind" }, { status: 400 });
  }

  const ipHash = hashIp(extractIp(request));
  const limit = checkAndRecord(ipHash, shopId);
  if (!limit.ok) {
    return NextResponse.json(
      { error: "同じ店への報告はしばらくお待ちください" },
      { status: 429, headers: { "retry-after": String(limit.retryAfterSec) } },
    );
  }

  try {
    const supabase = getServerSupabase();
    const { error } = await supabase.from("payment_reports").insert({
      shop_id: shopId,
      method,
      kind,
      ip_hash: ipHash,
    });
    if (error) {
      console.error("payment_reports insert", error);
      return NextResponse.json({ error: "insert failed" }, { status: 500 });
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "unavailable" }, { status: 503 });
  }
}
