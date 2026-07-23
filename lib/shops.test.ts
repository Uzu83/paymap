import { describe, expect, it } from "vitest";
import {
  DEFAULT_AREA,
  filterShops,
  shopsInArea,
} from "./shops";

describe("shops area defaults", () => {
  it("デフォルトエリアは福岡", () => {
    expect(DEFAULT_AREA).toBe("fukuoka");
  });

  it("福岡フィルタにサンプル渋谷を混ぜない", () => {
    const shops = filterShops({ area: "fukuoka" });
    expect(shops.length).toBeGreaterThan(10);
    expect(shops.every((s) => s.area === "fukuoka")).toBe(true);
    expect(shops.every((s) => !s.sample)).toBe(true);
  });

  it("渋谷は sample フラグ付き", () => {
    const shibuya = shopsInArea("shibuya");
    expect(shibuya.length).toBeGreaterThan(0);
    expect(shibuya.every((s) => s.sample === true)).toBe(true);
  });

  it("福岡シードは osm 出典を持つ", () => {
    const fukuoka = shopsInArea("fukuoka").filter((s) => !s.sample);
    expect(fukuoka.every((s) => s.source === "osm")).toBe(true);
    expect(fukuoka.every((s) => typeof s.osmId === "number")).toBe(true);
  });

  it("福岡シードは paymentStatus が estimated または unverified", () => {
    const fukuoka = shopsInArea("fukuoka").filter((s) => !s.sample);
    expect(fukuoka.length).toBeGreaterThan(0);
    expect(
      fukuoka.every(
        (s) =>
          s.paymentStatus === "estimated" || s.paymentStatus === "unverified",
      ),
    ).toBe(true);
  });

  it("渋谷サンプルは paymentStatus が sample", () => {
    const shibuya = shopsInArea("shibuya");
    expect(shibuya.every((s) => s.paymentStatus === "sample")).toBe(true);
  });
});
