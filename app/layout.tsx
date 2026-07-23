import type { Metadata, Viewport } from "next";
import { Noto_Sans_JP, Sora } from "next/font/google";
import "./globals.css";

const display = Sora({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700"],
});

const body = Noto_Sans_JP({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Paymap（使えるペイ）— キャッシュレス対応マップ",
    template: "%s | Paymap",
  },
  description:
    "福岡・天神〜博多を中心に、お店のキャッシュレス可否・PayPayやクレジットカード対応・営業時間を地図で確認。ユーザー報告で精度が上がる「使えるペイ」。",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
  openGraph: {
    title: "Paymap（使えるペイ）— 福岡のキャッシュレス対応マップ",
    description:
      "福岡の実在店舗で、今この店で自分の決済が通るかがわかる。PayPay・クレジット等の対応を地図と報告で更新。",
    locale: "ja_JP",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#00c2a8",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${display.variable} ${body.variable} h-full`}>
      <body className="min-h-full antialiased">{children}</body>
    </html>
  );
}
