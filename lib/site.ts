/** Canonical site origin for sitemap, JSON-LD, robots. */
export function siteBaseUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }
  return "https://paymap-six.vercel.app";
}
