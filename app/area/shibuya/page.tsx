import type { Metadata } from "next";
import Link from "next/link";
import { PAYMENT_LABELS } from "@/lib/payments";
import { SHOPS } from "@/lib/shops";

export const metadata: Metadata = {
  title: "渋谷のキャッシュレス対応店",
  description:
    "渋谷エリアの飲食・カフェなどで PayPay・クレジットカード等が使えるかを一覧。Paymap（使えるペイ）",
};

export default function ShibuyaAreaPage() {
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
        渋谷のキャッシュレス対応店
      </h1>
      <p className="mt-3 text-[var(--muted)]">
        MVPシード {SHOPS.length}{" "}
        件。PayPay・クレジットカードなどの検索向けに店舗ページも用意しています。
      </p>
      <ul className="mt-8 divide-y divide-[var(--line)] rounded-2xl bg-[var(--panel)] ring-1 ring-[var(--line)]">
        {SHOPS.map((shop) => {
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
                <span className="font-medium text-[var(--ink)]">
                  {shop.name}
                </span>
                <span className="mt-1 block text-sm text-[var(--muted)]">
                  {methods || "現金のみ"} · {shop.hours}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
