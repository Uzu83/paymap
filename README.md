# Paymap（使えるペイ）

キャッシュレス決済が使えるお店を地図で探す Web アプリ。  
キャッチ: **使えるペイ** — 今この店で、自分の決済が通るかがわかる。

Loomap と同型: **初期シード + ユーザー報告で精度が上がる**。

## 公開URL

- 本番: https://paymap-six.vercel.app
- 福岡エリア一覧: https://paymap-six.vercel.app/area/fukuoka
- 天神西パイロット: https://paymap-six.vercel.app/area/fukuoka/tenjin-west
- メトリクス: https://paymap-six.vercel.app/metrics
- ピッチデッキ: https://paymap-six.vercel.app/pitch/deck
- 福岡市向け説明: https://paymap-six.vercel.app/for-city
- お問い合わせ: https://paymap-six.vercel.app/contact
- 渋谷（サンプル）: https://paymap-six.vercel.app/area/shibuya
- GitHub: https://github.com/Uzu83/paymap

## 現状（福岡ピッチ本線）

**ピッチ準備度: 裁定 ~72/100 付近・code/docs 天井。提出可能なプロトタイプだが採択ライン未達。≥90 は実報告・法人・商店街接点が必須。**

| 項目 | 内容 |
|---|---|
| 本線エリア | 福岡・天神〜博多（OSM 実在 POI） |
| 件数 | OSM シード約218店（福岡本線）。内訳: チェーン推定〜45 / 未検証〜173。district: 天神西・中洲・博多駅 |
| サンプル | 渋谷はデモ比較用・審査本線ではない（約16店） |
| わかる情報 | キャッシュレス可否 / 決済手段 / 営業時間 / ジャンル |
| 報告 | 「今使えた / 使えなかった」→ Supabase に集計（端末横断） |
| SEO | `/shop/[id]`・`/area/fukuoka` で「店名 + PayPay」系タイトル |

ピッチ資料: [docs/pitch-fukuoka.md](./docs/pitch-fukuoka.md)  
1枚サマリー: [docs/pitch-one-pager.md](./docs/pitch-one-pager.md)（印刷版: `/for-city/print`）  
採点ログ: [docs/pitch-fukuoka-score.md](./docs/pitch-fukuoka-score.md)（15ラウンド完了・STOP 参照）

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

### 福岡 OSM シード（任意）

Overpass から天神〜博多の POI を取得し `data/shops.json` にマージします（サンプル店は保持、osmId で冪等）。

```bash
pnpm seed:fukuoka -- --dry-run   # 件数確認のみ
pnpm seed:fukuoka                # 書き込み（ネットワーク必要）
```

### お問い合わせ（MVP）

`/contact` は mailto ベースのクライアントフォームです。宛先は `NEXT_PUBLIC_CONTACT_EMAIL`（`.env.example` 参照）。サーバー保存は未実装。

## 次のステップ

1. Paymap 専用 Supabase（無料枠が空いたら分離）
2. 福岡エリアの決済検証・報告キャンペーン（目標: 50 報告 / 20 店）
3. 天神西パイロットの商店街接点

## 環境変数

```bash
cp .env.example .env.local
# NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
# NEXT_PUBLIC_SITE_URL — 本番 canonical URL（sitemap / JSON-LD）
# NEXT_PUBLIC_CONTACT_EMAIL — /contact の mailto 宛先
```
