import type { Metadata } from "next";
import Link from "next/link";
import { MetricsDashboard } from "@/components/MetricsDashboard";

export const metadata: Metadata = {
  title: "メトリクス",
  description:
    "Paymap の福岡シード件数・ユーザー報告集計・パイロット目標の進捗ダッシュボード（捏造なし）",
};

export default function MetricsPage() {
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
        メトリクス
      </h1>
      <p className="mt-3 text-[var(--muted)]">
        シード件数と Supabase 報告の実数のみ。KPI 目標は参考線です。
      </p>
      <div className="mt-8">
        <MetricsDashboard />
      </div>
    </main>
  );
}
