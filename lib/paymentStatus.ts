import type { PaymentStatus, Shop } from "@/lib/types";

export const PAYMENT_STATUS_LABELS: Record<PaymentStatus, string> = {
  estimated: "決済: チェーン推定",
  unverified: "決済: 未検証",
  sample: "サンプル",
  field: "現地確認済",
};

/** シード JSON の paymentStatus、なければ sample から推定 */
export function resolvePaymentStatus(shop: Shop): PaymentStatus | undefined {
  if (shop.paymentStatus) return shop.paymentStatus;
  if (shop.sample) return "sample";
  return undefined;
}

export function paymentStatusLabel(status: PaymentStatus): string {
  return PAYMENT_STATUS_LABELS[status];
}
