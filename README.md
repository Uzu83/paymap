# Paymap（使えるペイ）

キャッシュレス決済が使えるお店を地図で探す Web アプリ。  
キャッチ: **使えるペイ** — 今この店で、自分の決済が通るかがわかる。

Loomap と同型: **初期シード + ユーザー報告で精度が上がる**。

## 公開URL

- 本番: https://paymap-six.vercel.app
- 福岡エリア一覧: https://paymap-six.vercel.app/area/fukuoka
- 福岡市向け説明: https://paymap-six.vercel.app/for-city
- 渋谷（サンプル）: https://paymap-six.vercel.app/area/shibuya
- GitHub: https://github.com/Uzu83/paymap

## 現状（福岡ピッチ本線）

| 項目 | 内容 |
|---|---|
| 本線エリア | 福岡・天神〜博多（OSM 実在 POI） |
| 件数 | OSM シード約68店（飲食・カフェ・美容・小売・コンビニ）。内訳: チェーン推定13 / 未検証55 |
| サンプル | 渋谷はデモ比較用・審査本線ではない（約16店） |
| わかる情報 | キャッシュレス可否 / 決済手段 / 営業時間 / ジャンル |
| 報告 | 「今使えた / 使えなかった」→ Supabase に集計（端末横断） |
| SEO | `/shop/[id]`・`/area/fukuoka` で「店名 + PayPay」系タイトル |

ピッチ資料: [docs/pitch-fukuoka.md](./docs/pitch-fukuoka.md)  
採点ログ: [docs/pitch-fukuoka-score.md](./docs/pitch-fukuoka-score.md)（Rounds 4–6: 現在地・sitemap・ADR 等）

> 福岡シードは OpenStreetMap 由来の実在 POI 座標です。決済対応は未検証シードが多く、現地・公式情報とユーザー報告で鮮度を上げます。
>
> 渋谷データは初期 MVP のサンプル座標です。実在店舗の正確な対応状況は現地・公式情報を優先してください。
>
> DB: 無料枠の都合で一時的に Loomap（toilet-map）の Supabase に `payment_reports` を同居。専用プロジェクト化は枠が空いてから。

## ブランド

| 用途 | 表記 |
|---|---|
| 正式名 | Paymap |
| キャッチ | 使えるペイ |
| タグライン | キャッシュレス革命（任意） |

## 技術

- Next.js (App Router) + TypeScript + Tailwind CSS 4
- Leaflet + react-leaflet（OSM タイル）
- Zustand（フィルタ）+ `/api/reports` → Supabase 集計
- biome + vitest
- デプロイ: Vercel

## 開発

```bash
pnpm install
pnpm dev
pnpm check   # lint + typecheck + test + build
```

## 次のステップ

1. Paymap 専用 Supabase（無料枠が空いたら分離）
2. 福岡エリアの決済検証・報告キャンペーン
3. 検索バー

## 環境変数

```bash
cp .env.example .env.local
# NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
```
