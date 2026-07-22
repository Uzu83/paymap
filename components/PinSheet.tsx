"use client";

import Link from "next/link";
import { formatConfidence, mergeMethodConfidence } from "@/lib/confidence";
import { GENRE_LABELS, PAYMENT_FILTERS, PAYMENT_LABELS } from "@/lib/payments";
import type { PaymentMethod, Shop } from "@/lib/types";
import { useMapUiStore } from "@/store/mapUiStore";
import { useReportStore } from "@/store/reportStore";

export function PinSheet({ shop }: { shop: Shop }) {
  const selectShop = useMapUiStore((s) => s.selectShop);
  const reports = useReportStore((s) => s.reports);
  const addReport = useReportStore((s) => s.addReport);
  const methods = PAYMENT_FILTERS.filter(
    (m) =>
      shop.payments.includes(m) ||
      reports.some((r) => r.shopId === shop.id && r.method === m),
  );
  const showMethods: PaymentMethod[] =
    methods.length > 0 ? methods : PAYMENT_FILTERS.slice(0, 3);

  const cashOnly =
    shop.payments.length === 1 &&
    shop.payments[0] === "cash" &&
    methods.length === 0;

  return (
    <section className="pointer-events-auto absolute inset-x-0 bottom-0 z-[1000] max-h-[55vh] overflow-y-auto rounded-t-2xl bg-[var(--panel)] px-4 pb-6 pt-3 shadow-[0_-8px_32px_rgba(12,31,26,0.18)] ring-1 ring-[var(--line)]">
      <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-[var(--line)]" />
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium tracking-wide text-[var(--muted)]">
            {GENRE_LABELS[shop.genre]} · 渋谷
          </p>
          <h2 className="mt-0.5 font-[family-name:var(--font-display)] text-xl font-semibold tracking-tight text-[var(--ink)]">
            {shop.name}
          </h2>
          <p className="mt-1 text-sm text-[var(--muted)]">{shop.address}</p>
        </div>
        <button
          type="button"
          onClick={() => selectShop(null)}
          className="rounded-md px-2 py-1 text-sm text-[var(--muted)] hover:bg-[var(--wash)]"
          aria-label="閉じる"
        >
          閉じる
        </button>
      </div>

      <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-lg bg-[var(--wash)] px-3 py-2">
          <dt className="text-[var(--muted)]">営業時間</dt>
          <dd className="mt-0.5 font-medium text-[var(--ink)]">{shop.hours}</dd>
        </div>
        <div className="rounded-lg bg-[var(--wash)] px-3 py-2">
          <dt className="text-[var(--muted)]">キャッシュレス</dt>
          <dd className="mt-0.5 font-medium text-[var(--ink)]">
            {cashOnly ? "現金のみ（シード）" : "対応あり"}
          </dd>
        </div>
      </dl>

      <div className="mt-4">
        <h3 className="text-sm font-semibold text-[var(--ink)]">対応決済</h3>
        <ul className="mt-2 space-y-2">
          {showMethods.map((method) => {
            const conf = mergeMethodConfidence(shop, method, reports);
            return (
              <li
                key={method}
                className="rounded-lg border border-[var(--line)] px-3 py-2"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-medium text-[var(--ink)]">
                    {PAYMENT_LABELS[method]}
                  </span>
                  <span
                    className={
                      conf.accepted
                        ? "text-xs font-medium text-[var(--pay-deep)]"
                        : "text-xs font-medium text-[var(--warn)]"
                    }
                  >
                    {conf.accepted ? "使える見込み" : "怪しい / 非対応"} · 信頼
                    {formatConfidence(conf.score)}
                  </span>
                </div>
                <div className="mt-2 flex gap-2">
                  <button
                    type="button"
                    onClick={() => addReport(shop.id, method, "worked")}
                    className="flex-1 rounded-md bg-[var(--pay)] px-2 py-1.5 text-sm font-medium text-[var(--ink)]"
                  >
                    今使えた
                  </button>
                  <button
                    type="button"
                    onClick={() => addReport(shop.id, method, "failed")}
                    className="flex-1 rounded-md bg-[var(--wash)] px-2 py-1.5 text-sm font-medium text-[var(--ink)] ring-1 ring-[var(--line)]"
                  >
                    使えなかった
                  </button>
                </div>
                {(conf.worked > 0 || conf.failed > 0) && (
                  <p className="mt-1.5 text-xs text-[var(--muted)]">
                    報告 成功{conf.worked} / 失敗{conf.failed}
                  </p>
                )}
              </li>
            );
          })}
        </ul>
      </div>

      {shop.note ? (
        <p className="mt-3 text-xs text-[var(--muted)]">{shop.note}</p>
      ) : null}

      <p className="mt-3 text-xs text-[var(--muted)]">
        シード確認日 {shop.lastVerified} ·{" "}
        <Link
          href={`/shop/${shop.id}`}
          className="underline underline-offset-2 hover:text-[var(--ink)]"
        >
          詳細ページ
        </Link>
      </p>
    </section>
  );
}
