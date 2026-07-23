import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Paymap",
    short_name: "使えるペイ",
    description:
      "福岡の店舗で PayPay・クレジット等が使えるかを地図と報告で確認できる Web アプリ",
    lang: "ja",
    start_url: "/",
    display: "standalone",
    background_color: "#0c1f1a",
    theme_color: "#00c2a8",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/icon.svg",
        sizes: "512x512",
        type: "image/svg+xml",
        purpose: "maskable",
      },
    ],
  };
}
