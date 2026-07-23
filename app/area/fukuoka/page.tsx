import type { Metadata } from "next";
import Link from "next/link";
import { PAYMENT_LABELS } from "@/lib/payments";
import { shopsInArea } from "@/lib/shops";

export const metadata: Metadata = {
  title: "福岡のキャッシュレス対応店",
  description:
    "福岡市・天神〜博多の店舗で PayPay・クレジットカード等が使えるかを一覧。OSM由来シード＋ユーザー報告。Paymap（使えるペイ）",
};

export default function FukuokaAreaPage() {
  const shops = shopsInArea("fukuoka").filter((s) => !s.sample);

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
        福岡（天神〜博多）のキャッシュレス対応店
      </h1>
      <p className="mt-3 text-[var(--muted)]">
        OSM 由来シード {shops.length}{" "}
        件。チェーンは一般対応の推定、個人店は未検証が多い。報告で精度が上がります。
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
        地図データ © OpenStreetMap contributors ·{" "}
        <Link href="/for-city" className="underline">
          福岡市向け説明
        </Link>
      </p>
    </main>
  );
}
