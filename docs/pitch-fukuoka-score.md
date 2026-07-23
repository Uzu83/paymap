# Paymap × 福岡市ピッチ採点ログ

忖度なし。評価: **red-team（Grok）+ Codex（GPT）→ メイン裁定**。  
ループ継続中（15周 STOP 後もオーナー指示で R16+）。

## 公式結果（最新裁定）

| 項目 | 値 |
|---|---|
| **公式総合** | **70 / 100** |
| **trajectory** | 21 → … → 65（R15裁定）→ **70（R16–21裁定）** |
| **採択判定** | **厳しい**（FGN 本戦はほぼ否、実証入口は可） |
| **≥90** | **未達** |
| **code-only 天井** | ~70（資料・完成は頭打ち。残りは現場） |

### 裁定内訳 R16–21

| 軸 | Grok | Codex | 裁定 | 判定 |
|---|---:|---:|---:|---|
| 地域 20 | 15 | 15 | **15** | accept |
| 政策 15 | 10 | 11 | **11** | accept Codex（outreach・導線強化） |
| 課題 15 | 9 | 10 | **10** | accept Codex |
| 完成 15 | 13 | 12 | **13** | reject Codex 減点（deploy 後に live 確認） |
| 差別化 10 | 5 | 5 | **5** | accept |
| 事業 10 | 2 | 2 | **2** | accept |
| 資料 10 | 10 | 8 | **10** | reject Codex（deck/FAQ/outreach を 8 は過剰） |
| 信頼 5 | 4 | 2 | **4** | reject Codex（honest metrics を 2 は二重罰） |
| **合計** | **68** | **65** | **70** | |

### Codex blockers 裁定

| 指摘 | 判定 |
|---|---|
| 実報告ゼロ | **accept** |
| 法人なし | **accept** |
| 実名協力なし | **accept** |
| 未検証 55/68 | **accept** |
| Loomap 同居が刺さる | **defer**（説明済み・fatal ではない） |

---

## R0–15（要約）

旧公式裁定 **65**。詳細は git history。Grok 生値 63 / Codex 生値 61。

## R16–21 実装

- 店名検索、`/metrics`、`/pitch/deck`（12枚）
- district: 天神西 / 中洲 / 博多駅、`/area/fukuoka/[district]`
- `docs/outreach-fukuoka.md`、PWA manifest、`/faq`
- テスト 20 本、本番デプロイ

## STOP 条件（人間レバー）

1. 実報告 50
2. 商店街 1 件の実接点
3. 法人 / 申請主体
4. スライド PDF（任意・deck で代替可）

デモ: https://paymap-six.vercel.app  
市向け: `/for-city` · デッキ: `/pitch/deck` · 指標: `/metrics`
