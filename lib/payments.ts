import type { Genre, PaymentMethod } from "./types";

export const PAYMENT_LABELS: Record<PaymentMethod, string> = {
  paypay: "PayPay",
  credit_card: "クレジットカード",
  transit_ic: "交通系IC",
  rakuten_pay: "楽天ペイ",
  aupay: "au PAY",
  cash: "現金",
};

export const PAYMENT_FILTERS: PaymentMethod[] = [
  "paypay",
  "credit_card",
  "transit_ic",
  "rakuten_pay",
  "aupay",
];

export const GENRE_LABELS: Record<Genre, string> = {
  food: "飲食",
  cafe: "カフェ",
  beauty: "美容",
  retail: "小売",
  convenience: "コンビニ",
  other: "その他",
};

export function isCashless(payments: PaymentMethod[]): boolean {
  return payments.some((p) => p !== "cash");
}
