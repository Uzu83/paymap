import shopsJson from "@/data/shops.json";
import type { AreaId, Genre, PaymentMethod, Shop } from "@/lib/types";

export const SHOPS = shopsJson as Shop[];

export const FUKUOKA_CENTER = { lat: 33.5902, lng: 130.4017 } as const;
export const SHIBUYA_CENTER = { lat: 35.6595, lng: 139.7005 } as const;

/** ピッチ・デモの本線。渋谷はサンプル比較用。 */
export const DEFAULT_AREA: AreaId = "fukuoka";

export const AREA_LABELS: Record<AreaId, string> = {
  fukuoka: "福岡（天神〜博多）",
  shibuya: "渋谷（サンプル）",
};

export function getShopById(id: string): Shop | undefined {
  return SHOPS.find((s) => s.id === id);
}

export function shopsInArea(area: AreaId): Shop[] {
  return SHOPS.filter((s) => s.area === area);
}

export function filterShops(opts: {
  area?: AreaId;
  payment?: PaymentMethod | null;
  genre?: Genre | null;
  cashlessOnly?: boolean;
  includeSample?: boolean;
}): Shop[] {
  const area = opts.area ?? DEFAULT_AREA;
  return SHOPS.filter((shop) => {
    if (shop.area !== area) return false;
    if (!opts.includeSample && shop.sample) return false;
    if (opts.genre && shop.genre !== opts.genre) return false;
    if (opts.cashlessOnly) {
      const cashless = shop.payments.some((p) => p !== "cash");
      if (!cashless) return false;
    }
    if (opts.payment && opts.payment !== "cash") {
      if (!shop.payments.includes(opts.payment)) return false;
    }
    return true;
  });
}
