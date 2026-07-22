import type { PaymentMethod, PaymentReport, Shop } from "./types";

export type MethodConfidence = {
  method: PaymentMethod;
  score: number;
  worked: number;
  failed: number;
  accepted: boolean;
};

export type MethodCounts = {
  worked: number;
  failed: number;
};

/**
 * シード信頼度とユーザー報告を合成する。
 * WHY: 報告が少ないうちはシードを残し、増えるほど実測を優先する。
 * 失敗報告は成功より少し重く見て「昔は使えた」誤情報を早く落とす。
 */
export function mergeMethodConfidence(
  shop: Shop,
  method: PaymentMethod,
  reports: PaymentReport[],
): MethodConfidence {
  const relevant = reports.filter(
    (r) => r.shopId === shop.id && r.method === method,
  );
  return mergeMethodCounts(shop, method, {
    worked: relevant.filter((r) => r.kind === "worked").length,
    failed: relevant.filter((r) => r.kind === "failed").length,
  });
}

export function mergeMethodCounts(
  shop: Shop,
  method: PaymentMethod,
  counts: MethodCounts,
): MethodConfidence {
  const worked = counts.worked;
  const failed = counts.failed;
  const total = worked + failed;
  const seedAccepted = shop.payments.includes(method);

  if (total === 0) {
    return {
      method,
      score: seedAccepted ? shop.seedConfidence : 0,
      worked: 0,
      failed: 0,
      accepted: seedAccepted,
    };
  }

  const weighted = (worked * 1 + failed * 0) / (worked + failed * 1.35);
  const reportWeight = Math.min(1, total / 5);
  const seedScore = seedAccepted ? shop.seedConfidence : 0.15;
  const score = seedScore * (1 - reportWeight) + weighted * reportWeight;

  return {
    method,
    score,
    worked,
    failed,
    accepted: score >= 0.45,
  };
}

export function shopCashlessScore(
  shop: Shop,
  reports: PaymentReport[],
  methods: PaymentMethod[],
): number {
  const scores = methods
    .filter((m) => m !== "cash")
    .map((m) => mergeMethodConfidence(shop, m, reports).score);
  if (scores.length === 0) return 0;
  return Math.max(...scores);
}

export function formatConfidence(score: number): string {
  if (score >= 0.8) return "高い";
  if (score >= 0.55) return "まずまず";
  if (score >= 0.35) return "要確認";
  return "低い";
}
