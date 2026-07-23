import type { Metadata } from "next";
import Link from "next/link";
import { PAYMENT_LABELS } from "@/lib/payments";
import { shopsInDistrict } from "@/lib/shops";

const DISTRICTS = {
  "tenjin-west": {
    title: "天神西",
    blurb: "福岡市中央区・天神西のマイクロエリア（パイロット核）。",
  },
  nakasu: {
    title: "中洲",
    blurb: "中洲近傍の飲食密集帯。夜間需要・現金のみ店の検証に向く。",
  },
  "hakata-station": {
    title: "博多駅周辺",
    blurb: "博多駅近傍。インバウンド動線の決済不安を拾うエリア。",
  },
} as const;

type DistrictId = keyof typeof DISTRICTS;

type Props = { params: Promise<{ district: string }> };

export function generateStaticParams() {
  return Object.keys(DISTRICTS).map((district) => ({ district }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { district } = await params;
  const meta = DISTRICTS[district as DistrictId];
  if (!meta) return { title: "エリア" };
  return {
    title: `${meta.title}（パイロットエリア）`,
    description: `${meta.blurb} Paymap（使えるペイ）`,
  };
}

export default async function DistrictPage({ params }: Props) {
  const { district } = await params;
  const meta = DISTRICTS[district as DistrictId];
  if (!meta) {
    return (
      <main className="mx-auto max-w-2xl px-4 py-8">
        <p>未知のエリアです。</p>
        <Link href="/area/fukuoka">福岡一覧へ</Link>
      </main>
    );
  }

  const shops = shopsInDistrict(district);
  const estimated = shops.filter((s) => s.paymentStatus === "estimated").length;
  const unverified = shops.filter(
    (s) => s.paymentStatus === "unverified",
  ).length;

  return (
    <main className="mx-auto min-h-full max-w-2xl px-4 py-8">
      <Link
        href="/"
        className="text-sm font-medium text-[var(--pay-deep)] underline-offset-2 hover:underline"
      >
        ← 地図に戻る
      </Link>
      <p className="mt-6 font-[family-name:var(--font-display)] text-sm font-semibold text-[var(--pay-deep)]">
        Paymap · 使えるペイ
      </p>
      <h1 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight">
        {meta.title}（パイロットエリア）
      </h1>
      <p className="mt-3 text-[var(--muted)]">
        {meta.blurb} OSM シード {shops.length} 件。
      </p>
      <p className="mt-2 text-sm text-[var(--muted)]">
        内訳:{" "}
        <span className="font-medium text-[var(--ink)]">
          チェーン推定 {estimated} 件
        </span>
        {" · "}
        <span className="font-medium text-[var(--ink)]">
          未検証 {unverified} 件
        </span>
        （現地確認済の捏造なし）
      </p>
      <ul className="mt-8 divide-y divide-[var(--line)] rounded-2xl bg-[var(--panel)] ring-1 ring-[var(--line)]">
        {shops.map((shop) => {
          const methods = shop.payments
            .filter((p) => p !== "cash")
            .map((p) => PAYMENT_LABELS[p])
            .join("・");
          return (
            <li key={shop.id}>
              <Link
                href={`/shop/${shop.id}`}
                className="block px-4 py-3 transition hover:bg-[var(--wash)]"
              >
                <span className="font-medium text-[var(--ink)]">{shop.name}</span>
                <span className="mt-1 block text-sm text-[var(--muted)]">
                  {methods || "現金のみ / 未検証"} · 信頼シード{" "}
                  {Math.round(shop.seedConfidence * 100)}% · {shop.hours}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
      <p className="mt-6 text-xs text-[var(--muted)]">
        <Link href="/area/fukuoka" className="underline">
          福岡エリア全体
        </Link>
        {" · "}
        <Link href="/area/fukuoka/tenjin-west" className="underline">
          天神西
        </Link>
        {" · "}
        <Link href="/area/fukuoka/nakasu" className="underline">
          中洲
        </Link>
        {" · "}
        <Link href="/area/fukuoka/hakata-station" className="underline">
          博多駅
        </Link>
        {" · "}
        <Link href="/metrics" className="underline">
          メトリクス
        </Link>
      </p>
    </main>
  );
}
