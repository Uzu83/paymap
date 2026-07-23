import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "福岡市向け — Paymap（使えるペイ）",
  description:
    "福岡市のキャッシュレス推進・観光受入に接続する店舗決済マップ。実証仮説とKPI。",
  openGraph: {
    title: "福岡市向け — Paymap（使えるペイ）",
    description:
      "福岡・天神〜博多の店舗キャッシュレス可否を地図で。市民・観光客の報告で鮮度を上げる実証プロトタイプ。",
    locale: "ja_JP",
    type: "website",
  },
};

export default function ForCityLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
