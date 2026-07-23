# Paymap × 福岡市ピッチ採点ログ

忖度なし・100点満点。ループ: 評価 → 改善計画 → 実装 → テスト → 評価。  
終了条件: **総合 ≥ 90** または **最大15周**。

評価: red-team（Grok）。実装: coder / main。テスト: vitest + build。

| Round | 総合 | Δ | 判定 | 主な施策 |
|---:|---:|---:|---|---|
| 0 | 21 | — | ほぼ否 | 渋谷偽シードのまま |
| 1 | 43 | +22 | 否 | 福岡OSM本線・/for-city・sample分離 |
| 2 | 48 | +5 | ほぼ否 | バッジ・提出形LP・print・ops |
| 3 | 53 | +5 | ほぼ否 | **live** 68店・/for-city 200・empty・バッジ |
| 4–5 | — | — | — | R4–6 を一括で R6 採点（途中単独デプロイなし） |
| 6 | 58 | +5 vs R3 | ほぼ否 | **repo** locate・sitemap/robots・ADR・EN・tests（未 deploy） |
| 7 | TBD | TBD | TBD | llms.txt・60秒原稿 |
| 8 | TBD | TBD | TBD | 渋谷ヘルパー・店舗metadataキーワード |
| 9 | TBD | TBD | TBD | TrustLegend・ヘッダ導線 |
| 10 | TBD | TBD | TBD | 採点表整備・check通過 |

**code/docs のみの現実的天井（red-team）: ~66**（旧 ~64。locate/ADR/SEO で微上げ。頭打ちは近い）。≥90 は実報告・法人・部局/商店街接続が必須で code-only では到達不能。

---

## Round 0 — 21/100（ほぼ否）

地域2 / 政策3 / 課題6 / 完成5 / 差別化3 / 事業1 / 資料1 / 信頼0

## Round 1 — 43/100（否）

地域11 / 政策6 / 課題7 / 完成9 / 差別化4 / 事業1 / 資料4 / 信頼1

## Round 2 — 48/100（ほぼ否）

地域11 / 政策8 / 課題8 / 完成8 / 差別化4 / 事業2 / 資料6 / 信頼1  
※ live `/for-city` 404 が減点 → Round 3 で deploy

## Round 3 — 53/100（ほぼ否）— live-only 2026-07-23

**採点対象**: https://paymap-six.vercel.app のみ（working tree の未 deploy は加点しない）。

| 軸 | 点 | 根拠（忖度なし） |
|---|---:|---|
| 地域 | 12 | デフォルト福岡・OSM 68 確認。天神〜博多の商業密度には遠い。55/68 が未検証決済。 |
| 政策 | 8 | `/for-city`・`/print` が 200（R2 の 404 解消）。FGN/実証/ISSIN 表・Ask はあるが部局接点ゼロ。 |
| 課題 | 8 | 決済鮮度の課題は妥当。市ソースの定量・現場ヒアリング根拠なし。 |
| 完成 | 10 | 地図・フィルタ・報告 API・バッジ・空状態コピーは live。検索なし。sitemap/robots は **live 404**。 |
| 差別化 | 4 | 「失敗報告で鮮度」は仮説のまま。`/api/reports` → `stats:[]`。楔未実証。 |
| 事業 | 2 | 個人プロトタイプ。法人・収益・チームなし。Loomap DB 同居は開示済みでも審査減点。 |
| 資料 | 7 | live LP + print + GitHub ピッチ/ops。スライドなし。EN は footer 1行のみ。 |
| 信頼 | 2 | 捏造なし・推定/未検証明示は正しい。実報告ゼロなので「信頼できる実証」には届かない。 |

総合 **53**（Δ +5 vs R2）。採択判定: **ほぼ否** — 提出可能なデモ形にはなったが、採択ラインではない。

検証メモ: `GET /for-city` 200、`/for-city/print` 200、`/sitemap.xml` 404、`/robots.txt` 404、reports `{"stats":[],"source":"supabase"}`。

## Round 4–5

単独デプロイなし。機能は Round 6 束で採点。

## Round 6 — 58/100（ほぼ否）— full repo（未 push / 未 deploy 含む）2026-07-23

**採点対象**: live + working tree（`LocateControl`・`app/sitemap.ts`・`app/robots.ts`・ADR 001・EN inbound 節・PinSheet `seedConfidence %`・`paymentStatus.test.ts`）。**これらの大半は origin/main 未反映・本番未反映。**

| 軸 | 点 | 根拠（忖度なし） |
|---|---:|---|
| 地域 | 12 | シード件数不変。locate は UX でありカバー率ではない。 |
| 政策 | 9 | ADR 001 で本線・OSM・fake field 禁止・DB 分離トリガーが文書化。プログラム選定の深掘りは薄い。 |
| 課題 | 8 | EN inbound 節は言い換え。新規エビデンスなし。 |
| 完成 | 11 | locate・sitemap/robots・シード%表示・ステータス試験。未 deploy なら市担当者には見えない。検索・密度は未解決。 |
| 差別化 | 5 | locate / EN は地図アプリの常識域。失敗報告ループは依然ゼロ件。 |
| 事業 | 2 | ADR は会社にならない。 |
| 資料 | 8 | ADR + テスト + EN 節。デッキ・LOI・商店街議事録なし。 |
| 信頼 | 3 | テストと昇格ルールで「嘘をつかない」体制は厚くなった。現場データは依然ゼロ。 |

総合 **58**（Δ +5 vs R3 live / +10 vs R2）。採択判定: **ほぼ否**。code 磨きの収穫逓減が明確。

### Blockers（採択まで）

1. **実報告ゼロ** — 信頼・差別化の天井。`ops-first-50` 未実行。
2. **法人・体制・収益なし** — FGN 系で即死級。
3. **商店街/部局の紹介・LOI なし** — Ask が一方通行。
4. **未検証 55/68** — デモが「分からない店」の山に見える。
5. **R4–6 未 deploy** — sitemap/robots/locate/EN が本番に無い（今すぐ直せる減点）。

### code/docs 天井更新

~64 → **~66**。R7+ の llms/原稿/凡例で +1〜2 はありうるが、**70 超えは実報告か対外接点なしでは無理**。

### Top 3 for Rounds 7+

1. **実報告を取る**（初回 20 店 / 50 件）。コードより先。これ無しの polish は点にならない。
2. **R4–6 を deploy**（sitemap/robots/locate/EN）。無料の誠実さ・完成度回収。
3. **プログラム一本化 + 1枚デッキ**（実証フルサポート優先が現実的）と商店街1件の会話ログ。

## Round 7 — TBD

実装: `public/llms.txt`（AI クローラ向け要約）、`docs/pitch-fukuoka.md` に60秒トーク原稿。

## Round 8 — TBD

実装: FilterBar 渋谷選択時ヘルパー、店舗詳細 `generateMetadata` に福岡・PayPay キーワード。

## Round 9 — TBD

実装: `TrustLegend` 地図凡例、MapApp ヘッダから `/area/fukuoka`・`/for-city/print` 導線。

## Round 10 — TBD

実装: 採点表 Round 3–10 行追加、lint/tsc/test/build 通過確認。
