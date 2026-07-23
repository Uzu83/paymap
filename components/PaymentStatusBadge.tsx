import {
  paymentStatusLabel,
  resolvePaymentStatus,
} from "@/lib/paymentStatus";
import type { Shop } from "@/lib/types";

export function PaymentStatusBadge({ shop }: { shop: Shop }) {
  const status = resolvePaymentStatus(shop);
  if (!status) return null;

  const isWarn = status === "unverified" || status === "sample";

  return (
    <span
      className={
        isWarn
          ? "inline-flex rounded-full bg-[var(--wash)] px-2 py-0.5 text-xs font-medium text-[var(--warn)] ring-1 ring-[var(--line)]"
          : "inline-flex rounded-full bg-[var(--wash)] px-2 py-0.5 text-xs font-medium text-[var(--pay-deep)] ring-1 ring-[var(--line)]"
      }
    >
      {paymentStatusLabel(status)}
    </span>
  );
}
