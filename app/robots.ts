import type { MetadataRoute } from "next";

function siteBaseUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }
  return "https://paymap-six.vercel.app";
}

export default function robots(): MetadataRoute.Robots {
  const base = siteBaseUrl();

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${base}/sitemap.xml`,
  };
}
