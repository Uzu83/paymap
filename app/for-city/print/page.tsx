import type { Metadata } from "next";
import { PrintToolbar } from "@/components/PrintToolbar";
import { shopsInArea } from "@/lib/shops";

export const metadata: Metadata = {
  title: "印刷用 — 福岡市向け Paymap",
  description: "Paymap（使えるペイ）福岡市向け1枚サマリー（印刷用）",
};

const DEMO_URL = "https://paymap-six.vercel.app";

export default function ForCityPrintPage() {
  const fukuoka = shopsInArea("fukuoka").filter((s) => !s.sample);

  return (
    <>
      <style>{`
        @media print {
          @page { size: A4; margin: 16mm; }
          body { background: white !important; }
          .no-print { display: none !important; }
          .print-page { box-shadow: none !important; max-width: none !important; padding: 0 !important; }
        }
      `}</style>

      <div className="no-print mx-auto max-w-2xl px-4 py-6">
        <PrintToolbar />
      </div>

      <article className="print-page mx-auto max-w-[210mm] bg-[var(--panel)] px-8 py-10 shadow-sm ring-1 ring-[var(--line)] print:bg-white print:shadow-none print:ring-0">
        <header className="border-b border-[var(--line)] pb-6">
          <p className="font-[family-name:var(--font-display)] text-sm font-semibold tracking-wide text-[var(--pay-deep)]">
            Paymap · 使えるペイ
          </p>
          <h1 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-[var(--ink)]">
            福岡市向け — 店舗キャッシュレス可否マップ
          </h1>
          <p className="mt-2 text-sm text-[var(--muted)]">
            市民・観光客の「今使えた / 使えなかった」報告で鮮度を上げる Web アプリ（個人開発プロトタイプ）
          </p>
        </header>

        <section className="mt-6">
          <h2 className="text-sm font-bold uppercase tracking-wide text-[var(--pay-deep)]">
            課題
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-[var(--ink)]">
            飲食・小売の直前に「PayPay / クレジットが通るか」が分からず、機会損失と現金依存が残る。Google
            マップ等の決済情報は鮮度が弱く、失敗報告を反映する仕組みがない。福岡市 DX
            戦略のキャッシュレス推進に、民間店舗の見える化が足りない。
          </p>
        </section>

        <section className="mt-6">
          <h2 className="text-sm font-bold uppercase tracking-wide text-[var(--pay-deep)]">
            ソリューション
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-[var(--ink)]">
            天神〜博多の実在店（OSM シード {fukuoka.length}{" "}
            件）を地図表示。決済手段でフィルタし、利用者報告で信頼度を更新。チェーン推定・未検証をバッジで明示し、虚偽トラクションは出さない。
          </p>
        </section>

        <section className="mt-6">
          <h2 className="text-sm font-bold uppercase tracking-wide text-[var(--pay-deep)]">
            デモ
          </h2>
          <p className="mt-2 text-sm text-[var(--ink)]">
            <span className="font-medium">{DEMO_URL}</span>
            <span className="text-[var(--muted)]"> — 地図 → ピン → 「今使えた / 使えなかった」</span>
          </p>
        </section>

        <section className="mt-6">
          <h2 className="text-sm font-bold uppercase tracking-wide text-[var(--pay-deep)]">
            3ヶ月パイロット KPI（案）
          </h2>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-[var(--ink)]">
            <li>対象エリアの実在店カバー率</li>
            <li>週次ユニーク報告数（レート制限あり）</li>
            <li>「決済前に確認した」利用者率</li>
            <li>未検証店 → 報告付き店への遷移率</li>
          </ul>
        </section>

        <section className="mt-6">
          <h2 className="text-sm font-bold uppercase tracking-wide text-[var(--pay-deep)]">
            お願い（Ask）
          </h2>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-[var(--ink)]">
            <li>パイロットエリアの商店街・商工会への紹介</li>
            <li>観光案内所等への地図導線の試験掲載</li>
            <li>実証期間中の告知協力</li>
          </ul>
        </section>

        <footer className="mt-8 border-t border-[var(--line)] pt-4 text-xs text-[var(--muted)]">
          <p>
            詳細: /for-city · docs/pitch-fukuoka.md · DB は Loomap と一時同居（採択後に分離予定）
          </p>
          <p className="mt-1">2026-07 · Paymap（使えるペイ）</p>
        </footer>
      </article>
    </>
  );
}
