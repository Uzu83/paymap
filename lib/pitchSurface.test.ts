import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { DEFAULT_AREA, SHOPS } from "@/lib/shops";

const ROOT = join(import.meta.dirname, "..");

const KEY_ROUTE_MODULES = [
  "app/page.tsx",
  "app/area/fukuoka/page.tsx",
  "app/area/fukuoka/[district]/page.tsx",
  "app/shop/[id]/page.tsx",
  "app/metrics/page.tsx",
  "app/faq/page.tsx",
  "app/for-city/page.tsx",
  "app/contact/page.tsx",
  "app/pitch/deck/page.tsx",
  "components/MapApp.tsx",
  "lib/shops.ts",
  "lib/jsonLd.ts",
] as const;

describe("pitch surface smoke", () => {
  it("主要ルートのモジュールが存在する", () => {
    for (const rel of KEY_ROUTE_MODULES) {
      expect(existsSync(join(ROOT, rel)), `missing ${rel}`).toBe(true);
    }
  });

  it("デフォルトエリアは福岡", () => {
    expect(DEFAULT_AREA).toBe("fukuoka");
  });

  it("福岡シードに district タグが付いている店がある", () => {
    const tagged = SHOPS.filter(
      (s) => s.area === "fukuoka" && !s.sample && s.district,
    );
    expect(tagged.length).toBeGreaterThan(0);
  });

  it("福岡シードに field paymentStatus を捏造していない", () => {
    const fukuoka = SHOPS.filter((s) => s.area === "fukuoka" && !s.sample);
    expect(fukuoka.every((s) => s.paymentStatus !== "field")).toBe(true);
  });
});
