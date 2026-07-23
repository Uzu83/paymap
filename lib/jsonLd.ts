import { siteBaseUrl } from "@/lib/site";
import type { Shop } from "@/lib/types";

export function shopLocalBusinessJsonLd(shop: Shop) {
  const base = siteBaseUrl();
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: shop.name,
    geo: {
      "@type": "GeoCoordinates",
      latitude: shop.lat,
      longitude: shop.lng,
    },
    address: shop.address,
    url: `${base}/shop/${shop.id}`,
  };
}

export function shopItemListJsonLd(shops: Shop[], listName: string) {
  const base = siteBaseUrl();
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: listName,
    numberOfItems: shops.length,
    itemListElement: shops.map((shop, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${base}/shop/${shop.id}`,
      name: shop.name,
    })),
  };
}
