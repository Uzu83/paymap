import { describe, expect, it } from "vitest";
import { aggregateReportStats, progressRatio } from "./metrics";

describe("metrics", () => {
  it("報告統計を集計する", () => {
    const agg = aggregateReportStats([
      { shop_id: "a", method: "paypay", worked: 2, failed: 1 },
      { shop_id: "b", method: "credit_card", worked: 1, failed: 0 },
    ]);
    expect(agg.totalReports).toBe(4);
    expect(agg.worked).toBe(3);
    expect(agg.failed).toBe(1);
    expect(agg.shopsWithReports).toBe(2);
  });

  it("進捗率は 0–1 にクランプ", () => {
    expect(progressRatio(0, 50)).toBe(0);
    expect(progressRatio(25, 50)).toBe(0.5);
    expect(progressRatio(100, 50)).toBe(1);
  });
});
