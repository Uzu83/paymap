import { describe, expect, it } from "vitest";
import {
  DEFAULT_AREA,
  filterShops,
  shopsInArea,
  shopsInDistrict,
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

  it("店名部分一致でフィルタできる", () => {
    const all = filterShops({ area: "fukuoka", nameQuery: "ローソン" });
    expect(all.length).toBeGreaterThan(0);
    expect(all.every((s) => s.name.includes("ローソン"))).toBe(true);
  });

  it("天神西 district に bbox 内の店がタグ付けされている", () => {
    const west = shopsInDistrict("tenjin-west");
    expect(west.length).toBeGreaterThanOrEqual(5);
    expect(west.every((s) => s.area === "fukuoka")).toBe(true);
    expect(west.every((s) => s.district === "tenjin-west")).toBe(true);
  });

  it("district フィルタでマイクロエリアに絞れる", () => {
    const nakasu = filterShops({ area: "fukuoka", district: "nakasu" });
    expect(nakasu.length).toBeGreaterThan(0);
    expect(nakasu.every((s) => s.district === "nakasu")).toBe(true);
  });
});
