"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef } from "react";
import { countFukuokaByPaymentStatus } from "@/lib/shops";

const DEMO_URL = "https://paymap-six.vercel.app";

const SLIDES = [
  {
    id: "title",
    kicker: "Paymap · 使えるペイ",
    title: "決済前に、通るかがわかる地図",
    body: "福岡・天神〜博多の実在店舗を OSM シード＋市民報告で更新する Web アプリ。",
  },
  {
    id: "problem",
    kicker: "課題",
    title: "「この店で PayPay / カードは通る？」が直前まで分からない",
    body: "Google マップ等は決済鮮度が弱い。インバウンド・キャッシュレス利用者は機会損失と現金依存が残る。",
  },
  {
    id: "solution",
    kicker: "解決策",
    title: "地図 × フィルタ × 報告で鮮度を上げる",
    body: "決済手段で絞り込み、ピンで詳細確認。「今使えた / 使えなかった」で次の利用者の不安を減らす。",
  },
  {
    id: "why-fukuoka",
    kicker: "なぜ福岡",
    title: "DX 推進 × 観光 × 商店街密度",
    body: "市のキャッシュレス推進とインバウンド需要が重なる。天神西などマイクロエリアからパイロット可能。",
  },
  {
    id: "demo",
    kicker: "デモ",
    title: "30秒で体験",
    body: `地図でピン表示 → PayPay 等でフィルタ → ピン詳細でバッジ確認 → 報告。本番: ${DEMO_URL}`,
  },
  {
    id: "honesty",
    kicker: "データの正直さ",
    title: "捏造トラクションは出さない",
    body: "チェーン推定・未検証を UI で明示。現地確認済みを装う field ステータスは使わない。報告は Supabase 集計のみ。",
  },
  {
    id: "kpi",
    kicker: "KPI（案）",
    title: "カバー率・報告数・確認率",
    body: "対象エリアの実在店カバー率、週次ユニーク報告、決済前確認率、未検証→報告ありへの遷移。",
  },
  {
    id: "plan",
    kicker: "3ヶ月計画",
    title: "M1 シード厚み → M2 報告キャンペーン → M3 KPI レビュー",
    body: "商店街ヒアリング、QR 導線、倫理ガイド準拠の現地確認。市と継続・拡張を判断。",
  },
  {
    id: "ask",
    kicker: "お願い",
    title: "商店街紹介・観光導線・告知協力",
    body: "パイロットエリアの組合・商工会への紹介、案内所・ホテルでの試験掲載、SNS・イベント告知。",
  },
  {
    id: "risks",
    kicker: "リスク",
    title: "データ密度・運用体制・持続性",
    body: "個人店は未検証が多い。個人開発のため法人・商店街接点が弱い。報告はこれから蓄積する。",
  },
  {
    id: "team",
    kicker: "チーム",
    title: "個人プロジェクト",
    body: "開発・運用は個人。実証採択後にパートナー・ボランティアと役割分担を設計。",
  },
  {
    id: "next",
    kicker: "次のステップ",
    title: "天神西パイロット → 実報告50件 → 専用 Supabase",
    body: "マイクロエリアで密度を上げ、正直なメトリクスを公開。審査・実証に向けた資料とデモを継続更新。",
  },
] as const;

export default function PitchDeckClient() {
  const rootRef = useRef<HTMLElement>(null);
  const seedCounts = countFukuokaByPaymentStatus();

  const scrollToSlide = useCallback((index: number) => {
    const root = rootRef.current;
    if (!root) return;
    const slide = root.querySelectorAll<HTMLElement>("[data-slide]")[index];
    slide?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const root = rootRef.current;
      if (!root) return;
      const slides = [...root.querySelectorAll<HTMLElement>("[data-slide]")];
      const tops = slides.map((el) => el.offsetTop);
      const scrollTop = root.scrollTop;
      let current = 0;
      for (let i = 0; i < tops.length; i++) {
        if (scrollTop + 40 >= tops[i]) current = i;
      }
      if (e.key === "ArrowDown" || e.key === "PageDown" || e.key === " ") {
        e.preventDefault();
        scrollToSlide(Math.min(current + 1, slides.length - 1));
      }
      if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        scrollToSlide(Math.max(current - 1, 0));
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [scrollToSlide]);

  return (
    <main
      ref={rootRef}
      className="paymap-deck h-[100dvh] snap-y snap-mandatory overflow-y-auto scroll-smooth bg-[var(--paper)]"
    >
      <div className="pointer-events-none fixed inset-x-0 top-0 z-10 flex justify-between px-4 py-3 print:hidden">
        <Link
          href="/for-city"
          className="pointer-events-auto text-sm font-medium text-[var(--pay-deep)] underline"
        >
          ← 市向け説明
        </Link>
        <p className="text-xs text-[var(--muted)]">↑↓ でスライド移動</p>
      </div>

      {SLIDES.map((slide, i) => (
        <section
          key={slide.id}
          data-slide
          className="flex min-h-[100dvh] snap-start flex-col justify-center px-6 py-16 sm:px-12 print:min-h-0 print:break-after-page print:py-10"
        >
          <p className="font-[family-name:var(--font-display)] text-sm font-semibold tracking-wide text-[var(--pay-deep)]">
            {String(i + 1).padStart(2, "0")} · {slide.kicker}
          </p>
          <h2 className="mt-4 max-w-3xl font-[family-name:var(--font-display)] text-3xl font-bold leading-tight tracking-tight text-[var(--ink)] sm:text-4xl">
            {slide.title}
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--muted)]">
            {slide.body}
          </p>
          {slide.id === "honesty" ? (
            <p className="mt-4 text-sm text-[var(--ink)]">
              現状シード: チェーン推定 {seedCounts.estimated} 件 · 未検証{" "}
              {seedCounts.unverified} 件
            </p>
          ) : null}
          {slide.id === "demo" ? (
            <div className="mt-6 flex flex-wrap gap-3 text-sm print:hidden">
              <Link
                href="/"
                className="rounded-lg bg-[var(--pay)] px-4 py-2 font-medium text-[var(--ink)]"
              >
                地図デモ
              </Link>
              <a
                href={DEMO_URL}
                className="rounded-lg bg-[var(--panel)] px-4 py-2 font-medium text-[var(--ink)] ring-1 ring-[var(--line)]"
              >
                {DEMO_URL}
              </a>
              <Link
                href="/metrics"
                className="rounded-lg bg-[var(--panel)] px-4 py-2 font-medium text-[var(--ink)] ring-1 ring-[var(--line)]"
              >
                メトリクス
              </Link>
            </div>
          ) : null}
        </section>
      ))}
    </main>
  );
}
