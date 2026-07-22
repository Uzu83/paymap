import type { Metadata } from "next";
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
    "お店のキャッシュレス可否・PayPayやクレジットカード対応・営業時間を地図で確認。ユーザー報告で精度が上がる「使えるペイ」。",
  openGraph: {
    title: "Paymap（使えるペイ）",
    description: "今この店で、自分の決済が通るかがわかる。",
    locale: "ja_JP",
    type: "website",
  },
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
