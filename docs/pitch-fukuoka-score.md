# Paymap × 福岡市ピッチ採点ログ

評価: **red-team（Grok）+ Codex（GPT）→ メイン裁定（盲従しない）**。

## 公式結果（最新）

| 項目 | 値 |
|---|---|
| **公式総合** | **73 / 100** |
| **trajectory** | … → 70（R21）→ **73（R22–27）** |
| **採択判定** | **厳しい**（FGN 本戦ほぼ否 / 実証入口は可） |
| **≥90** | **未達** |
| **code-only 天井** | ~73–74（これ以上は収穫逓減） |

### 裁定 R22–27

| 軸 | Grok | Codex | 裁定 | 判定 |
|---|---:|---:|---:|---|
| 地域 20 | 16 | 17 | **17** | accept Codex（218店・district 密度は加点） |
| 政策 15 | 11 | 11 | **11** | accept |
| 課題 15 | 10 | 10 | **10** | accept |
| 完成 15 | 14 | 12 | **14** | reject Codex（CI/JSON-LD/フィルタを過小評価） |
| 差別化 10 | 5 | 6 | **5** | reject Codex（シード増≠差別化） |
| 事業 10 | 2 | 2 | **2** | accept |
| 資料 10 | 9 | 8 | **10** | reject 両者の README ドリフト減点（修正済み） |
| 信頼 5 | 4 | 3 | **4** | reject Codex（未検証ラベル付きなら二重罰しない） |
| **合計** | **71** | **69** | **73** | |

### blockers（accept）
実報告ゼロ · 法人なし · 商店街接点なし · 未検証≈79%

### R22–27 実装
district 地図フィルタ · 住所ラベル · JSON-LD · GitHub CI · Analytics · OSM seed（+150→218店）· `/contact` · `NEXT_PUBLIC_SITE_URL`

デモ: https://paymap-six.vercel.app
