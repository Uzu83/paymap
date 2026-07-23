/**
 * 福岡ピッチ採点ルーブリック（`docs/pitch-fukuoka-score.md` と同期）。
 * 各軸の満点配点の合計は 100。スコアログの整合性チェック用。
 */
export const PITCH_RUBRIC_AXES = [
  "region",
  "policy",
  "problem",
  "product",
  "differentiation",
  "business",
  "materials",
  "trust",
] as const;

export type PitchRubricAxis = (typeof PITCH_RUBRIC_AXES)[number];

/** 軸ごとの満点配点（100点満点） */
export const PITCH_RUBRIC_WEIGHTS: Record<PitchRubricAxis, number> = {
  region: 15,
  policy: 12,
  problem: 12,
  product: 15,
  differentiation: 12,
  business: 10,
  materials: 12,
  trust: 12,
};

export const PITCH_RUBRIC_MAX_SCORE = Object.values(
  PITCH_RUBRIC_WEIGHTS,
).reduce((sum, w) => sum + w, 0);

/** 日本語ラベル（採点ログ表記と対応） */
export const PITCH_RUBRIC_LABELS: Record<PitchRubricAxis, string> = {
  region: "地域",
  policy: "政策",
  problem: "課題",
  product: "完成",
  differentiation: "差別化",
  business: "事業",
  materials: "資料",
  trust: "信頼",
};
