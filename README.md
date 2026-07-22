# Paymap（使えるペイ）

キャッシュレス決済が使えるお店を地図で探す Web アプリ。  
キャッチ: **使えるペイ** — 今この店で、自分の決済が通るかがわかる。

Loomap と同型: **初期シード + ユーザー報告で精度が上がる**。

## 公開URL

- 本番: https://paymap-six.vercel.app
- エリア一覧: https://paymap-six.vercel.app/area/shibuya

## MVP（公開中）

| 項目 | 内容 |
|---|---|
| エリア | 渋谷 |
| 件数 | シード約16店（飲食・カフェ・美容・小売・コンビニ） |
| わかる情報 | キャッシュレス可否 / 決済手段 / 営業時間 / ジャンル |
| 報告 | 「今使えた / 使えなかった」→ 端末内で信頼度を更新 |
| SEO | `/shop/[id]`・`/area/shibuya` で「店名 + PayPay」系タイトル |

> シードは公開用のサンプル座標です。実在店舗の正確な対応状況は現地・公式情報を優先してください。

## ブランド

| 用途 | 表記 |
|---|---|
| 正式名 | Paymap |
| キャッチ | 使えるペイ |
| タグライン | キャッシュレス革命（任意） |

## 技術

- Next.js (App Router) + TypeScript + Tailwind CSS 4
- Leaflet + react-leaflet（OSM タイル）
- Zustand（フィルタ + 報告の localStorage）
- biome + vitest
- デプロイ: Vercel

## 開発

```bash
pnpm install
pnpm dev
pnpm check   # lint + typecheck + test + build
```

## 次のステップ

1. Supabase に報告を永続化（端末横断）
2. エリア・ジャンル拡大 / OSM・公開データからのシード
3. 位置情報・検索バー
