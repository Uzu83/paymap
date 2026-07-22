import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatConfidence, mergeMethodConfidence } from "@/lib/confidence";
import { GENRE_LABELS, PAYMENT_FILTERS, PAYMENT_LABELS } from "@/lib/payments";
import { getShopById, SHOPS } from "@/lib/shops";

type Props = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return SHOPS.map((shop) => ({ id: shop.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const shop = getShopById(id);
  if (!shop) return { title: "店が見つかりません" };
  const methods = shop.payments
    .filter((p) => p !== "cash")
    .map((p) => PAYMENT_LABELS[p])
    .join("・");
  const payText = methods || "現金のみ";
  return {
    title: `${shop.name}｜${payText}対応`,
    description: `${shop.name}（${shop.address}）のキャッシュレス対応・営業時間・ジャンル。Paymap（使えるペイ）`,
  };
}

export default async function ShopPage({ params }: Props) {
  const { id } = await params;
  const shop = getShopById(id);
  if (!shop) notFound();

  const cashless = shop.payments.some((p) => p !== "cash");

  return (
    <main className="mx-auto min-h-full max-w-lg px-4 py-8">
      <Link
        href="/"
        className="text-sm font-medium text-[var(--pay-deep)] underline-offset-2 hover:underline"
      >
        ← 地図に戻る
      </Link>
      <p className="mt-6 font-[family-name:var(--font-display)] text-sm font-semibold tracking-wide text-[var(--pay-deep)]">
        Paymap · 使えるペイ
      </p>
      <h1 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-[var(--ink)]">
        {shop.name}
      </h1>
      <p className="mt-2 text-[var(--muted)]">
        {GENRE_LABELS[shop.genre]} · {shop.address}
      </p>

      <section className="mt-8 space-y-3 rounded-2xl bg-[var(--panel)] p-5 ring-1 ring-[var(--line)]">
        <p className="text-sm text-[var(--muted)]">営業時間</p>
        <p className="text-lg font-medium">{shop.hours}</p>
        <p className="pt-2 text-sm text-[var(--muted)]">キャッシュレス</p>
        <p className="text-lg font-medium">
          {cashless ? "対応あり（シード）" : "現金のみ（シード）"}
        </p>
      </section>

      <section className="mt-6">
        <h2 className="font-semibold text-[var(--ink)]">対応決済（シード）</h2>
        <ul className="mt-3 space-y-2">
          {PAYMENT_FILTERS.map((method) => {
            const conf = mergeMethodConfidence(shop, method, []);
            if (!shop.payments.includes(method) && !conf.accepted) return null;
            return (
              <li
                key={method}
                className="flex items-center justify-between rounded-lg bg-[var(--wash)] px-3 py-2 text-sm"
              >
                <span>{PAYMENT_LABELS[method]}</span>
                <span className="text-[var(--muted)]">
                  信頼{formatConfidence(conf.score)}
                </span>
              </li>
            );
          })}
          {shop.payments.includes("cash") ? (
            <li className="flex items-center justify-between rounded-lg bg-[var(--wash)] px-3 py-2 text-sm">
              <span>{PAYMENT_LABELS.cash}</span>
              <span className="text-[var(--muted)]">可</span>
            </li>
          ) : null}
        </ul>
      </section>

      <p className="mt-8 text-xs leading-relaxed text-[var(--muted)]">
        シード最終確認 {shop.lastVerified}。地図上の「今使えた /
        使えなかった」報告で信頼度が更新されます（端末内保存・MVP）。
        {shop.note ? ` ${shop.note}` : ""}
      </p>
    </main>
  );
}
