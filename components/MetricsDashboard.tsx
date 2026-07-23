"use client";

import Link from "next/link";
import { useEffect, useMemo } from "react";
import {
  aggregateReportStats,
  METRICS_TARGETS,
  progressRatio,
} from "@/lib/metrics";
import { countFukuokaByPaymentStatus, shopsInDistrict } from "@/lib/shops";
import { useReportStore } from "@/store/reportStore";

function ProgressBar({
  label,
  current,
  target,
}: {
  label: string;
  current: number;
  target: number;
}) {
  const pct = Math.round(progressRatio(current, target) * 100);
  return (
    <div>
      <div className="flex items-baseline justify-between gap-2 text-sm">
        <span className="font-medium text-[var(--ink)]">{label}</span>
        <span className="text-[var(--muted)]">
          {current} / {target}（{pct}%）
        </span>
      </div>
      <div
        className="mt-2 h-2 overflow-hidden rounded-full bg-[var(--wash)]"
        role="progressbar"
        aria-valuenow={current}
        aria-valuemin={0}
        aria-valuemax={target}
        aria-label={label}
      >
        <div
          className="h-full rounded-full bg-[var(--pay)] transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

export function MetricsDashboard() {
  const stats = useReportStore((s) => s.stats);
  const loaded = useReportStore((s) => s.loaded);
  const hydrate = useReportStore((s) => s.hydrate);

  useEffect(() => {
    void hydrate();
  }, [hydrate]);

  const seedCounts = useMemo(() => countFukuokaByPaymentStatus(), []);
  const reportAgg = useMemo(() => aggregateReportStats(stats), [stats]);
  const tenjinWest = useMemo(() => shopsInDistrict("tenjin-west"), []);

  return (
    <div className="space-y-8">
      <section className="rounded-2xl bg-[var(--panel)] p-5 ring-1 ring-[var(--line)]">
        <h2 className="text-lg font-semibold">福岡シード（OSM）</h2>
        <p className="mt-1 text-sm text-[var(--muted)]">
          paymentStatus の実数。捏造の field ステータスは含めません。
        </p>
        <dl className="mt-4 grid grid-cols-2 gap-4 text-sm">
          <div>
            <dt className="text-[var(--muted)]">チェーン推定</dt>
            <dd className="text-2xl font-bold text-[var(--ink)]">
              {seedCounts.estimated}
            </dd>
          </div>
          <div>
            <dt className="text-[var(--muted)]">未検証</dt>
            <dd className="text-2xl font-bold text-[var(--ink)]">
              {seedCounts.unverified}
            </dd>
          </div>
        </dl>
        <p className="mt-3 text-xs text-[var(--muted)]">
          合計 {seedCounts.estimated + seedCounts.unverified} 店（サンプル渋谷除く）
        </p>
      </section>

      <section className="rounded-2xl bg-[var(--panel)] p-5 ring-1 ring-[var(--line)]">
        <h2 className="text-lg font-semibold">天神西パイロット</h2>
        <p className="mt-1 text-sm text-[var(--muted)]">
          bbox タグ付け {tenjinWest.length} 店
        </p>
        <Link
          href="/area/fukuoka/tenjin-west"
          className="mt-3 inline-block text-sm font-medium text-[var(--pay-deep)] underline"
        >
          店舗一覧へ
        </Link>
      </section>

      <section className="rounded-2xl bg-[var(--panel)] p-5 ring-1 ring-[var(--line)]">
        <h2 className="text-lg font-semibold">ユーザー報告（Supabase）</h2>
        <p className="mt-1 text-sm text-[var(--muted)]">
          GET /api/reports から取得。{loaded ? "読み込み済み" : "読み込み中…"}
        </p>
        <dl className="mt-4 grid grid-cols-2 gap-4 text-sm sm:grid-cols-4">
          <div>
            <dt className="text-[var(--muted)]">総報告数</dt>
            <dd className="text-2xl font-bold text-[var(--ink)]">
              {reportAgg.totalReports}
            </dd>
          </div>
          <div>
            <dt className="text-[var(--muted)]">使えた</dt>
            <dd className="text-2xl font-bold text-[var(--pay-deep)]">
              {reportAgg.worked}
            </dd>
          </div>
          <div>
            <dt className="text-[var(--muted)]">使えなかった</dt>
            <dd className="text-2xl font-bold text-[var(--warn)]">
              {reportAgg.failed}
            </dd>
          </div>
          <div>
            <dt className="text-[var(--muted)]">報告あり店</dt>
            <dd className="text-2xl font-bold text-[var(--ink)]">
              {reportAgg.shopsWithReports}
            </dd>
          </div>
        </dl>
      </section>

      <section className="rounded-2xl bg-[var(--panel)] p-5 ring-1 ring-[var(--line)]">
        <h2 className="text-lg font-semibold">パイロット目標</h2>
        <p className="mt-1 text-sm text-[var(--muted)]">
          実証開始の目安。現状は正直な進捗のみ表示します。
        </p>
        <div className="mt-5 space-y-5">
          <ProgressBar
            label="累計報告数"
            current={reportAgg.totalReports}
            target={METRICS_TARGETS.reports}
          />
          <ProgressBar
            label="報告あり店舗数"
            current={reportAgg.shopsWithReports}
            target={METRICS_TARGETS.shopsWithReports}
          />
        </div>
      </section>
    </div>
  );
}
