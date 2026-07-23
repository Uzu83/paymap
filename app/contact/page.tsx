import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "お問い合わせ（市・商店街向け）",
  description:
    "Paymap（使えるペイ）へのパイロット・商店街・観光・市担当者向けの MVP 連絡フォーム。",
};

export default function ContactPage() {
  return (
    <main className="mx-auto min-h-full max-w-xl px-4 py-10">
      <Link
        href="/"
        className="text-sm font-medium text-[var(--pay-deep)] underline-offset-2 hover:underline"
      >
        ← 地図に戻る
      </Link>

      <p className="mt-8 font-[family-name:var(--font-display)] text-sm font-semibold tracking-wide text-[var(--pay-deep)]">
        Paymap · 使えるペイ
      </p>
      <h1 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-[var(--ink)]">
        お問い合わせ
      </h1>
      <p className="mt-3 text-[var(--muted)] leading-relaxed">
        福岡パイロット・商店街連携・観光導線・市・FGN
        担当の方からのご連絡用です。個人 MVP
        のため、現時点ではメールアプリ経由の連絡のみ受け付けています（虚偽のトラクションは出しません）。
      </p>

      <div className="mt-4 flex flex-wrap gap-2 text-sm">
        <Link
          href="/for-city"
          className="rounded-lg bg-[var(--wash)] px-3 py-1.5 font-medium text-[var(--ink)] ring-1 ring-[var(--line)] hover:bg-[var(--panel)]"
        >
          市向け説明
        </Link>
        <Link
          href="/faq"
          className="rounded-lg bg-[var(--wash)] px-3 py-1.5 font-medium text-[var(--ink)] ring-1 ring-[var(--line)] hover:bg-[var(--panel)]"
        >
          FAQ
        </Link>
      </div>

      <ContactForm />
    </main>
  );
}
