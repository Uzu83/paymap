import { createHash } from "node:crypto";
import type { NextRequest } from "next/server";

const buckets = new Map<string, { count: number; resetAt: number }>();

export function extractIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return req.headers.get("x-real-ip") || "unknown";
}

export function hashIp(ip: string): string {
  return createHash("sha256").update(ip).digest("hex").slice(0, 32);
}

/** 同一 IP + shop は 1 時間に 10 回まで（決済手段ごとではない） */
export function checkAndRecord(
  ipHash: string,
  shopId: string,
  limit = 10,
  windowMs = 60 * 60 * 1000,
): { ok: true } | { ok: false; retryAfterSec: number } {
  const key = `${ipHash}:${shopId}`;
  const now = Date.now();
  const cur = buckets.get(key);
  if (!cur || cur.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true };
  }
  if (cur.count >= limit) {
    return {
      ok: false,
      retryAfterSec: Math.max(1, Math.ceil((cur.resetAt - now) / 1000)),
    };
  }
  cur.count += 1;
  return { ok: true };
}
