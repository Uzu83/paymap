import { describe, expect, it } from "vitest";
import {
  PAYMENT_STATUS_LABELS,
  paymentStatusLabel,
  resolvePaymentStatus,
} from "./paymentStatus";
import type { Shop } from "./types";

function shop(overrides: Partial<Shop> = {}): Shop {
  return {
    id: "test-shop",
    name: "Test",
    lat: 33.59,
    lng: 130.4,
    area: "fukuoka",
    genre: "food",
    hours: "10:00–22:00",
    payments: ["paypay"],
    seedConfidence: 0.5,
    lastVerified: "2026-07-01",
    address: "福岡市",
    ...overrides,
  };
}

describe("resolvePaymentStatus", () => {
  it("paymentStatus があればそのまま返す", () => {
    expect(resolvePaymentStatus(shop({ paymentStatus: "estimated" }))).toBe(
      "estimated",
    );
    expect(resolvePaymentStatus(shop({ paymentStatus: "unverified" }))).toBe(
      "unverified",
    );
    expect(resolvePaymentStatus(shop({ paymentStatus: "field" }))).toBe(
      "field",
    );
  });

  it("paymentStatus 未指定で sample なら sample", () => {
    expect(
      resolvePaymentStatus(shop({ sample: true, paymentStatus: undefined })),
    ).toBe("sample");
  });

  it("paymentStatus も sample もなければ undefined", () => {
    expect(resolvePaymentStatus(shop())).toBeUndefined();
  });

  it("paymentStatus が sample より優先される", () => {
    expect(
      resolvePaymentStatus(
        shop({ sample: true, paymentStatus: "estimated" }),
      ),
    ).toBe("estimated");
  });
});

describe("paymentStatusLabel", () => {
  it("全ステータスに日本語ラベルがある", () => {
    for (const status of Object.keys(PAYMENT_STATUS_LABELS) as Array<
      keyof typeof PAYMENT_STATUS_LABELS
    >) {
      expect(paymentStatusLabel(status)).toBe(PAYMENT_STATUS_LABELS[status]);
      expect(paymentStatusLabel(status).length).toBeGreaterThan(0);
    }
  });
});
