import type { MetadataRoute } from "next";
import { SHOPS } from "@/lib/shops";

function siteBaseUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "https://paymap-six.vercel.app";
}

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteBaseUrl();
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    {
      url: `${base}/for-city`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${base}/for-city/print`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${base}/area/fukuoka`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${base}/area/shibuya`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.4,
    },
  ];

  const shopRoutes: MetadataRoute.Sitemap = SHOPS.map((shop) => ({
    url: `${base}/shop/${shop.id}`,
    lastModified: shop.lastVerified ? new Date(shop.lastVerified) : now,
    changeFrequency: "weekly" as const,
    priority: shop.sample ? 0.3 : 0.7,
  }));

  return [...staticRoutes, ...shopRoutes];
}
