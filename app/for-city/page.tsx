import Link from "next/link";
import { shopsInArea } from "@/lib/shops";

const DEMO_URL = "https://paymap-six.vercel.app";

const PROGRAMS = [
  {
    name: "Fukuoka Growth Next（FGN）",
    fit: "地域スタートアップの実証・メンター接続。観光×決済の「見える化」は市 DX テーマと直結。",
    gap: "法人・チーム体制・収益モデルが未整備。FGN 後期はトラクション指標が重く、現状はプロトタイプ段階。",
  },
  {
    name: "実証実験フルサポート（市）",
    fit: "3ヶ月パイロット・KPI 設計・商店街連携の枠組みと相性が良い。失敗報告を含む鮮度更新は実証向き。",
    gap: "実施主体・予算・協力店舗の確約がない。個人店の決済は未検証が多く、開始時点のデータ密度が弱い。",
  },
  {
    name: "県 ISSIN",
    fit: "社会課題型・インバウンド飲食の決済不安という課題設定は一致。オープンデータ/OSM 起点は説明しやすい。",
    gap: "県スケールの運用体制・持続性の説明が不足。報告トラクションはこれから（捏造はしない方針）。",
  },
] as const;

const TIMELINE = [
  {
    month: "M1",
    title: "シード厚み",
    body: "天神・博多・中洲の OSM 実在 POI を拡充。チェーンは推定・個人店は未検証と UI で明示。商店街への初回ヒアリング。",
  },
  {
    month: "M2",
    title: "報告キャンペーン",
    body: "観光案内・商店街 QR から地図へ導線。ボランティア現地確認（倫理ガイド準拠）。週次ユニーク報告数を計測。",
  },
  {
    month: "M3",
    title: "KPI レビュー",
    body: "カバー率・報告数・「決済前に確認した」率を市と共有。継続・拡張・データ分離の判断。",
  },
] as const;

const ASKS = [
  "パイロットエリアの商店街組合・商工会への紹介",
  "観光案内所・ホテル等への地図導線の試験掲載",
  "実証期間中の告知協力（SNS・チラシ・イベント）",
] as const;

export default function ForCityPage() {
  const fukuoka = shopsInArea("fukuoka").filter((s) => !s.sample);
  const estimated = fukuoka.filter(
    (s) => s.paymentStatus === "estimated",
  ).length;
  const unverified = fukuoka.filter(
    (s) => s.paymentStatus === "unverified",
  ).length;

  return (
    <main className="mx-auto min-h-full max-w-2xl px-4 py-10">
      <Link
        href="/"
        className="text-sm font-medium text-[var(--pay-deep)] underline-offset-2 hover:underline"
      >
        ← 地図デモへ
      </Link>

      <p className="mt-8 font-[family-name:var(--font-display)] text-sm font-semibold tracking-wide text-[var(--pay-deep)]">
        Paymap · 使えるペイ
      </p>
      <h1 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-[var(--ink)]">
        福岡市向け説明
      </h1>
      <p className="mt-3 text-[var(--muted)] leading-relaxed">
        「今この店で、自分の決済が通るか」を地図と市民・観光客の報告で更新する
        Web アプリです。市のキャッシュレス推進・観光 DX
        との接点を明示し、虚偽のトラクションは出しません。
      </p>

      <div className="mt-6 flex flex-wrap gap-3 text-sm">
        <Link
          href="/for-city/print"
          className="rounded-lg bg-[var(--pay)] px-3 py-1.5 font-medium text-[var(--ink)] hover:opacity-90"
        >
          印刷用1枚
        </Link>
        <a
          href="https://github.com/Uzu83/paymap/blob/main/docs/pitch-fukuoka.md"
          className="rounded-lg bg-[var(--wash)] px-3 py-1.5 font-medium text-[var(--ink)] ring-1 ring-[var(--line)] hover:bg-[var(--panel)]"
        >
          ピッチ文書
        </a>
        <a
          href="https://github.com/Uzu83/paymap/blob/main/docs/pitch-one-pager.md"
          className="rounded-lg bg-[var(--wash)] px-3 py-1.5 font-medium text-[var(--ink)] ring-1 ring-[var(--line)] hover:bg-[var(--panel)]"
        >
          1枚サマリー（Markdown）
        </a>
        <a
          href="https://github.com/Uzu83/paymap/blob/main/docs/ops-first-50-reports.md"
          className="rounded-lg bg-[var(--wash)] px-3 py-1.5 font-medium text-[var(--ink)] ring-1 ring-[var(--line)] hover:bg-[var(--panel)]"
        >
          初回50報告オペ
        </a>
      </div>

      <section className="mt-10 space-y-3">
        <h2 className="text-lg font-semibold">課題</h2>
        <p className="text-[var(--muted)] leading-relaxed">
          Google
          マップ等では決済手段の鮮度が弱い。インバウンドやキャッシュレス利用者は、飲食・小売の直前に「PayPay
          / カードが通るか」が分からず機会損失・現金依存が残る。福岡市は DX
          戦略でキャッシュレス推進を掲げており、民間店舗の「見える化」はその受け皿になる。
        </p>
      </section>

      <section className="mt-8 space-y-3">
        <h2 className="text-lg font-semibold">デモ（30秒）</h2>
        <ol className="list-decimal space-y-2 pl-5 text-[var(--muted)]">
          <li>
            <Link href="/" className="text-[var(--pay-deep)] underline">
              地図
            </Link>
            （本番:{" "}
            <a href={DEMO_URL} className="text-[var(--pay-deep)] underline">
              {DEMO_URL}
            </a>
            ）で天神〜博多のピン（OSM シード {fukuoka.length} 件）を表示
          </li>
          <li>PayPay / クレカ等でフィルタ</li>
          <li>
            ピンを開き「今使えた /
            使えなかった」で信頼度を更新。バッジで「チェーン推定」「未検証」を確認
          </li>
        </ol>
        <p className="text-sm text-[var(--muted)]">
          現状シード: チェーン推定 {estimated} 件 · 未検証 {unverified}{" "}
          件（捏造報告なし）
        </p>
      </section>

      <section className="mt-10 space-y-4">
        <h2 className="text-lg font-semibold">支援プログラムへの当てはめ</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-[var(--line)] text-left">
                <th className="py-2 pr-3 font-semibold">プログラム</th>
                <th className="py-2 pr-3 font-semibold">向いている点</th>
                <th className="py-2 font-semibold">足りない点</th>
              </tr>
            </thead>
            <tbody className="text-[var(--muted)]">
              {PROGRAMS.map((p) => (
                <tr
                  key={p.name}
                  className="border-b border-[var(--line)] align-top"
                >
                  <td className="py-3 pr-3 font-medium text-[var(--ink)]">
                    {p.name}
                  </td>
                  <td className="py-3 pr-3">{p.fit}</td>
                  <td className="py-3">{p.gap}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-10 space-y-4">
        <h2 className="text-lg font-semibold">3ヶ月パイロット計画（案）</h2>
        <ol className="space-y-4">
          {TIMELINE.map((t) => (
            <li
              key={t.month}
              className="rounded-xl bg-[var(--panel)] p-4 ring-1 ring-[var(--line)]"
            >
              <p className="text-xs font-semibold tracking-wide text-[var(--pay-deep)]">
                {t.month} · {t.title}
              </p>
              <p className="mt-1.5 text-sm text-[var(--muted)] leading-relaxed">
                {t.body}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-10 space-y-3">
        <h2 className="text-lg font-semibold">KPI（案）</h2>
        <ul className="list-disc space-y-2 pl-5 text-[var(--muted)]">
          <li>対象エリア内の実在店カバー率（OSM シード＋報告付き店の割合）</li>
          <li>週次ユニーク報告数（IP レート制限で捏造防止）</li>
          <li>「決済前に Paymap で確認した」利用者率（アンケート）</li>
          <li>未検証店 → 報告あり店への遷移率</li>
        </ul>
      </section>

      <section className="mt-10 space-y-3">
        <h2 className="text-lg font-semibold">
          市・パートナーへのお願い（Ask）
        </h2>
        <ul className="list-disc space-y-2 pl-5 text-[var(--muted)]">
          {ASKS.map((ask) => (
            <li key={ask}>{ask}</li>
          ))}
        </ul>
      </section>

      <section className="mt-10 space-y-3">
        <h2 className="text-lg font-semibold">データの扱い</h2>
        <p className="text-[var(--muted)] leading-relaxed">
          店舗位置は OpenStreetMap。決済対応はチェーン一般推定（
          <span className="text-[var(--ink)]">決済: チェーン推定</span>
          ）または未検証（
          <span className="text-[var(--ink)]">決済: 未検証</span>
          ）から開始し、ユーザー報告で更新。捏造のトラクションは出さない。詳細は{" "}
          <Link href="/area/fukuoka" className="underline">
            福岡エリア一覧
          </Link>
          。
        </p>
      </section>

      <section className="mt-10 space-y-3">
        <h2 className="text-lg font-semibold">DB・インフラ（一時措置）</h2>
        <p className="text-[var(--muted)] leading-relaxed">
          報告集計は姉妹プロダクト Loomap（公衆トイレ地図）と同一 Supabase
          無料枠に一時同居しています。審査・実証開始前に以下の条件で分離予定です。
        </p>
        <ul className="list-disc space-y-2 pl-5 text-sm text-[var(--muted)]">
          <li>
            <strong className="font-medium text-[var(--ink)]">
              分離トリガー
            </strong>
            ：パイロット採択・週次報告が安定（目安: 50
            件以上の実報告）または無料枠上限接近
          </li>
          <li>
            <strong className="font-medium text-[var(--ink)]">分離内容</strong>
            ：Paymap 専用 Supabase
            プロジェクト、テーブル・RLS・バックアップの独立
          </li>
          <li>
            <strong className="font-medium text-[var(--ink)]">移行</strong>
            ：既存報告のエクスポート→インポート。ダウンタイム最小化
          </li>
        </ul>
      </section>

      <section className="mt-10 space-y-3" lang="en">
        <h2 className="text-lg font-semibold">
          For inbound visitors &amp; city partners
        </h2>
        <p className="text-[var(--muted)] leading-relaxed">
          Paymap shows whether common cashless methods (PayPay, credit cards,
          transit IC, etc.) are likely to work at real shops around Tenjin and
          Hakata — before you order or reach the counter.
        </p>
        <ul className="list-disc space-y-2 pl-5 text-sm text-[var(--muted)]">
          <li>
            Open the{" "}
            <Link href="/" className="text-[var(--pay-deep)] underline">
              map
            </Link>
            , filter by your payment app, and tap a pin for details.
          </li>
          <li>
            Badges distinguish{" "}
            <strong className="font-medium text-[var(--ink)]">
              chain estimates
            </strong>{" "}
            from{" "}
            <strong className="font-medium text-[var(--ink)]">
              unverified
            </strong>{" "}
            independent shops — we do not claim field verification we have not
            done.
          </li>
          <li>
            Tap <em>worked</em> / <em>did not work</em> after paying to help the
            next visitor. Reports are aggregated; we do not fabricate traction
            for pitches.
          </li>
        </ul>
        <p className="text-sm text-[var(--muted)]">
          Demo:{" "}
          <a href={DEMO_URL} className="text-[var(--pay-deep)] underline">
            {DEMO_URL}
          </a>
          {" · "}
          <Link
            href="/area/fukuoka"
            className="text-[var(--pay-deep)] underline"
          >
            Fukuoka shop list
          </Link>
        </p>
      </section>
    </main>
  );
}
