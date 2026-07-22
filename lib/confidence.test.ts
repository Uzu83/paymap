import { describe, expect, it } from "vitest";
import { mergeMethodConfidence } from "./confidence";
import type { Shop } from "./types";

const shop: Shop = {
  id: "t1",
  name: "テスト店",
  lat: 0,
  lng: 0,
  area: "shibuya",
  genre: "food",
  hours: "11-22",
  payments: ["paypay", "cash"],
  seedConfidence: 0.7,
  lastVerified: "2026-07-01",
  address: "test",
};

describe("mergeMethodConfidence", () => {
  it("報告なしならシードを返す", () => {
    const r = mergeMethodConfidence(shop, "paypay", []);
    expect(r.accepted).toBe(true);
    expect(r.score).toBe(0.7);
  });

  it("失敗報告が増えるとacceptedが落ちる", () => {
    const reports = [
      {
        shopId: "t1",
        method: "paypay" as const,
        kind: "failed" as const,
        at: "a",
      },
      {
        shopId: "t1",
        method: "paypay" as const,
        kind: "failed" as const,
        at: "b",
      },
      {
        shopId: "t1",
        method: "paypay" as const,
        kind: "failed" as const,
        at: "c",
      },
      {
        shopId: "t1",
        method: "paypay" as const,
        kind: "failed" as const,
        at: "d",
      },
      {
        shopId: "t1",
        method: "paypay" as const,
        kind: "failed" as const,
        at: "e",
      },
    ];
    const r = mergeMethodConfidence(shop, "paypay", reports);
    expect(r.accepted).toBe(false);
    expect(r.score).toBeLessThan(0.45);
  });

  it("成功報告で未対応シードも上がる", () => {
    const reports = Array.from({ length: 5 }, (_, i) => ({
      shopId: "t1",
      method: "credit_card" as const,
      kind: "worked" as const,
      at: String(i),
    }));
    const r = mergeMethodConfidence(shop, "credit_card", reports);
    expect(r.accepted).toBe(true);
    expect(r.score).toBeGreaterThan(0.7);
  });
});
