import shopsJson from "@/data/shops.json";
import type { Genre, PaymentMethod, Shop } from "@/lib/types";

export const SHOPS = shopsJson as Shop[];

export const SHIBUYA_CENTER = { lat: 35.6595, lng: 139.7005 } as const;

export function getShopById(id: string): Shop | undefined {
  return SHOPS.find((s) => s.id === id);
}

export function filterShops(opts: {
  payment?: PaymentMethod | null;
  genre?: Genre | null;
  cashlessOnly?: boolean;
}): Shop[] {
  return SHOPS.filter((shop) => {
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
