import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "よくある質問・リスク",
  description:
    "Paymap のデータ出典、未検証の意味、報告の扱い、Loomap 同居、個人情報、市との関係について（正直な FAQ）",
};

const SECTIONS = [
  {
    id: "source",
    title: "データの出典は？",
    body: (
      <>
        <p>
          店舗の位置・名称は{" "}
          <strong className="font-medium text-[var(--ink)]">
            OpenStreetMap（OSM）
          </strong>
          由来の実在 POI です。福岡・天神〜博多を中心にシードを載せています。
        </p>
        <p className="mt-2">
          決済手段の初期値は、チェーン店はブランド一般の対応を{" "}
          <strong className="font-medium text-[var(--ink)]">推定</strong>
          、個人店は{" "}
          <strong className="font-medium text-[var(--ink)]">未検証</strong>
          （現金のみシード）から始めます。現地確認済み（field）を捏造しません。
        </p>
      </>
    ),
  },
  {
    id: "unverified",
    title: "「未検証」とは何を意味する？",
    body: (
      <>
        <p>
          その店舗について、Paymap
          運営が現地で決済を確認したわけではなく、利用者報告もまだない状態です。地図上では{" "}
          <span className="font-medium text-[var(--ink)]">決済: 未検証</span>{" "}
          バッジで表示します。
        </p>
        <p className="mt-2">
          チェーン店の「決済: チェーン推定」も、当該店舗個別のレジ確認ではなく一般情報に基づく推定です。実際の決済可否は店舗・端末・キャンペーンで変わり得ます。
        </p>
      </>
    ),
  },
  {
    id: "reports",
    title: "ユーザー報告はどう扱う？",
    body: (
      <>
        <p>
          ピン詳細の「今使えた /
          使えなかった」は、実際の決済体験に基づく報告を想定しています。成功・失敗どちらも同等に集計し、店舗ごとの信頼度表示に反映します。
        </p>
        <p className="mt-2">
          捏造防止のため、同一 IP（ハッシュ化）＋店舗 ID で{" "}
          <strong className="font-medium text-[var(--ink)]">
            1 時間に 10 回まで
          </strong>
          のレート制限があります（
          <code className="text-sm">lib/rateLimit.ts</code>
          ）。審査・ピッチ用の数字を水増ししません。実数は{" "}
          <Link href="/metrics" className="underline">
            メトリクス
          </Link>
          で公開します。
        </p>
      </>
    ),
  },
  {
    id: "loomap",
    title: "Loomap（トイレ地図）と同居しているのはなぜ？",
    body: (
      <>
        <p>
          報告の保存先は、姉妹プロダクト{" "}
          <strong className="font-medium text-[var(--ink)]">
            Loomap（公衆トイレ地図）
          </strong>
          と同一の Supabase 無料枠に一時同居しています。個人開発のコスト都合です。
        </p>
        <p className="mt-2">
          パイロット採択・報告が安定（目安: 実報告 50
          件以上）または無料枠上限接近時に、Paymap 専用プロジェクトへテーブル・RLS
          を分離移行する予定です。詳細は{" "}
          <Link href="/for-city" className="underline">
            市向け説明
          </Link>
          の「DB・インフラ」節を参照してください。
        </p>
      </>
    ),
  },
  {
    id: "privacy",
    title: "個人情報（IP ハッシュ）は？",
    body: (
      <>
        <p>
          報告 API ではレート制限のため、リクエスト元 IP を SHA-256
          でハッシュ化し、先頭 32 文字のみを保存します（生 IP
          は永続化しません）。店舗 ID と組み合わせて連打を防ぎます。
        </p>
        <p className="mt-2">
          報告内容に氏名・メールは含めません。アカウント登録も不要です。集計結果のみが店舗の信頼表示に使われます。
        </p>
      </>
    ),
  },
  {
    id: "city",
    title: "福岡市・FGN との関係は？",
    body: (
      <>
        <p>
          Paymap は{" "}
          <strong className="font-medium text-[var(--ink)]">
            市公式採択・公認プロジェクトではありません
          </strong>
          。個人開発の MVP です。FGN・実証実験フルサポート・県 ISSIN
          等への応募・相談は検討段階であり、採択は未確定です。
        </p>
        <p className="mt-2">
          市のキャッシュレス推進・観光 DX
          との接点を説明する資料（
          <Link href="/for-city" className="underline">
            /for-city
          </Link>
          、
          <Link href="/pitch/deck" className="underline">
            ピッチデッキ
          </Link>
          ）は用意していますが、虚偽のトラクションや過大な連携表現はしません。
        </p>
      </>
    ),
  },
] as const;

export default function FaqPage() {
  return (
    <main className="mx-auto min-h-full max-w-2xl px-4 py-10">
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
        よくある質問・リスク
      </h1>
      <p className="mt-3 text-[var(--muted)] leading-relaxed">
        審査・パートナーから聞かれやすい点を、MVP
        段階の事実に基づいてまとめています。数字の捏造や現地確認済みの装いはしません。
      </p>

      <div className="mt-10 space-y-8">
        {SECTIONS.map((section) => (
          <section
            key={section.id}
            id={section.id}
            className="scroll-mt-8 space-y-2"
          >
            <h2 className="text-lg font-semibold text-[var(--ink)]">
              {section.title}
            </h2>
            <div className="text-[var(--muted)] leading-relaxed">
              {section.body}
            </div>
          </section>
        ))}
      </div>

      <section className="mt-12 rounded-xl bg-[var(--panel)] p-4 ring-1 ring-[var(--line)]">
        <h2 className="text-sm font-semibold text-[var(--ink)]">関連リンク</h2>
        <ul className="mt-2 space-y-1 text-sm text-[var(--muted)]">
          <li>
            <Link href="/for-city" className="underline">
              福岡市向け説明
            </Link>
          </li>
          <li>
            <Link href="/metrics" className="underline">
              メトリクス（実数のみ）
            </Link>
          </li>
          <li>
            <a
              href="https://github.com/Uzu83/paymap/blob/main/docs/outreach-fukuoka.md"
              className="underline"
            >
              アウトリーチ文面（docs）
            </a>
          </li>
        </ul>
      </section>
    </main>
  );
}
