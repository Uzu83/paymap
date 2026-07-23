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

/** 福岡パイロットのマイクロエリア（地図フィルタ・住所ラベル用） */
export const FUKUOKA_DISTRICTS = {
  "tenjin-west": "天神西",
  nakasu: "中洲",
  "hakata-station": "博多駅",
} as const;

export type FukuokaDistrictId = keyof typeof FUKUOKA_DISTRICTS;

export function getShopById(id: string): Shop | undefined {
  return SHOPS.find((s) => s.id === id);
}

export function shopsInArea(area: AreaId): Shop[] {
  return SHOPS.filter((s) => s.area === area);
}

/** 天神西パイロット bbox（座標タグ付け用） */
export const TENJIN_WEST_BBOX = {
  latMin: 33.5885,
  latMax: 33.5925,
  lngMin: 130.3945,
  lngMax: 130.4005,
} as const;

export function shopsInDistrict(district: string): Shop[] {
  return SHOPS.filter((s) => s.district === district && !s.sample);
}

export function countFukuokaByPaymentStatus(): Record<
  "estimated" | "unverified",
  number
> {
  const fukuoka = shopsInArea("fukuoka").filter((s) => !s.sample);
  return {
    estimated: fukuoka.filter((s) => s.paymentStatus === "estimated").length,
    unverified: fukuoka.filter((s) => s.paymentStatus === "unverified").length,
  };
}

export function filterShops(opts: {
  area?: AreaId;
  district?: string | null;
  payment?: PaymentMethod | null;
  genre?: Genre | null;
  cashlessOnly?: boolean;
  includeSample?: boolean;
  nameQuery?: string;
}): Shop[] {
  const area = opts.area ?? DEFAULT_AREA;
  const nameQ = opts.nameQuery?.trim().toLowerCase() ?? "";
  return SHOPS.filter((shop) => {
    if (shop.area !== area) return false;
    if (!opts.includeSample && shop.sample) return false;
    if (opts.district && shop.district !== opts.district) return false;
    if (nameQ && !shop.name.toLowerCase().includes(nameQ)) return false;
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
