import type { RemoteStat } from "@/store/reportStore";

export const METRICS_TARGETS = {
  reports: 50,
  shopsWithReports: 20,
} as const;

export function aggregateReportStats(stats: RemoteStat[]): {
  totalReports: number;
  shopsWithReports: number;
  worked: number;
  failed: number;
} {
  let worked = 0;
  let failed = 0;
  const shopIds = new Set<string>();

  for (const row of stats) {
    worked += row.worked;
    failed += row.failed;
    if (row.worked + row.failed > 0) {
      shopIds.add(row.shop_id);
    }
  }

  return {
    totalReports: worked + failed,
    shopsWithReports: shopIds.size,
    worked,
    failed,
  };
}

export function progressRatio(current: number, target: number): number {
  if (target <= 0) return 0;
  return Math.min(1, current / target);
}
