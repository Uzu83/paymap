# Paymap × 福岡市ピッチ採点ログ

忖度なし・100点満点。ループ: 評価 → 改善計画 → 実装 → テスト → 評価。  
終了条件: **総合 ≥ 90** または **最大15周**。

評価: red-team（Grok）。実装: coder / main。テスト: vitest + build。  
ルーブリック配点の機械検証: `lib/pitchScore.ts` + `lib/pitchScore.test.ts`（8軸合計100）。

| Round | 総合 | Δ | 判定 | 主な施策 |
|---:|---:|---:|---|---|
| 0 | 21 | — | ほぼ否 | 渋谷偽シードのまま |
| 1 | 43 | +22 | 否 | 福岡OSM本線・/for-city・sample分離 |
| 2 | 48 | +5 | ほぼ否 | バッジ・提出形LP・print・ops |
| 3 | 53 | +5 | ほぼ否 | **live** 68店・/for-city 200・empty・バッジ |
| 4–5 | — | — | — | R4–6 を一括で R6 採点（途中単独デプロイなし） |
| 6 | 58 | +5 vs R3 | ほぼ否 | **repo** locate・sitemap/robots・ADR・EN・tests（未 deploy） |
| 7 | 60 | +2 | ほぼ否 | llms.txt・60秒原稿 |
| 8 | 62 | +2 | ほぼ否 | 渋谷ヘルパー・店舗metadataキーワード |
| 9 | 64 | +2 | ほぼ否 | TrustLegend・ヘッダ導線 |
| 10 | 65 | +1 | ほぼ否 | 採点表整備・check通過 |
| 11 | 65 | 0 | ほぼ否 | for-city OG・layout 福岡メタ |
| 12 | 66 | +1 | ほぼ否 | pitch-one-pager.md・README/for-city リンク |
| 13 | 66 | 0 | ほぼ否 | PinSheet 未検証報告UX（収穫逓減） |
| 14 | 66 | 0 | ほぼ否 | pitchScore.test ルーブリック整合 |
| 15 | 66 | 0 | **STOP** | 採点表確定・人間アクション明示 |

**code/docs のみの現実的天井（red-team）: ~66**（R11–15 で +0〜1 の微調整のみ。頭打ち）。**≥90 は実報告・法人・部局/商店街接続が必須で code-only では到達不能。**

---

## STOP — 15ラウンド完了（2026-07-23）

### 判定

- **総合 ~66/100** — 提出可能なプロトタイプ・資料セットには到達。市プログラム採択ライン（≥90）には**コードとドキュメントだけでは届かない**。
- **ループ終了**: 最大15周に到達。以降の code/docs 磨きは信頼・差別化・事業軸に効かず、**人間の現場アクションが先**。

### code/docs 天井の内訳（R15 推定）

| 軸 | 満点 | R15 推定 | 天井の理由 |
|---|---:|---:|---|
| 地域 | 15 | 13 | OSM 68店は実在だが天神〜博多の商業密度・未検証55/68 |
| 政策 | 12 | 10 | /for-city・ADR・プログラム表はあるが部局・商店街接点ゼロ |
| 課題 | 12 | 9 | 決済鮮度の課題設定は妥当。市ソース定量・現場ヒアリングなし |
| 完成 | 15 | 12 | 地図・報告・SEO・凡例・locate。検索・本番未反映分あり |
| 差別化 | 12 | 6 | 失敗報告ループは仮説のまま。**実報告ゼロ** |
| 事業 | 10 | 2 | 個人プロトタイプ。法人・収益・チームなし |
| 資料 | 12 | 11 | LP・print・one-pager・ops・ADR・llms。スライド・LOI なし |
| 信頼 | 12 | 3 | 捏造なし・バッジ明示は正しい。**現場データゼロ** |

### ≥90 に必要なもの（コードでは作れない）

1. **実報告 50 件以上** — `docs/ops-first-50-reports.md` を実行。信頼・差別化の主因。
2. **商店街・商工会への紹介 1 件** — 会話ログ・LOI・パイロット協力の確約。
3. **法人（または実証主体）の整備** — FGN・実証フルサポートの必須要件。
4. **ピッチ用スライド 10〜15 枚** — デモ動線・KPI・Ask を市担当者向けに凝縮。

### 推奨する人間の次アクション（優先順）

1. **初回50報告キャンペーン** — ボランティア現地確認（倫理ガイド準拠）。捏造禁止。
2. **パイロット候補の商店街 1 件にコンタクト** — 天神・博多・中洲から選定。紹介依頼は `/for-city` の Ask をそのまま使う。
3. **実証フルサポートを第一候補にプログラム一本化** — スライド・申請書の骨子を `docs/pitch-one-pager.md` から展開。
4. **R4–15 の未 deploy 分を本番反映** — sitemap/robots/locate/OG 等（無料の完成度回収）。
5. **法人設立 or 実証パートナー探索** — 事業軸の blocker 解除。

### 成果物インデックス（R15 時点）

| 種別 | パス |
|---|---|
| 市向け LP | `/for-city` |
| 印刷1枚 | `/for-city/print` |
| Markdown 1枚 | `docs/pitch-one-pager.md` |
| ピッチ全文 | `docs/pitch-fukuoka.md` |
| 初回50報告オペ | `docs/ops-first-50-reports.md` |
| スコープ ADR | `docs/decisions/001-fukuoka-pitch-scope.md` |
| ルーブリック | `lib/pitchScore.ts` |

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

## Round 7 — 60/100（ほぼ否）

実装: `public/llms.txt`、`docs/pitch-fukuoka.md` 60秒原稿。AI クローラ向け要約で資料+1。

## Round 8 — 62/100（ほぼ否）

実装: FilterBar 渋谷ヘルパー、店舗 `generateMetadata` に福岡・PayPay キーワード。SEO 微増。

## Round 9 — 64/100（ほぼ否）

実装: `TrustLegend` 地図凡例、MapApp ヘッダから `/area/fukuoka`・`/for-city/print` 導線。

## Round 10 — 65/100（ほぼ否）

実装: 採点表 Round 3–10 行整備、lint/tsc/test/build 通過確認。

## Round 11 — 65/100（ほぼ否）

実装: `app/for-city/layout.tsx` に Open Graph、root layout description/OG に福岡言及。

## Round 12 — 66/100（ほぼ否）

実装: `docs/pitch-one-pager.md`、README・`/for-city` からリンク。GitHub レビュー用 Markdown ツイン。

## Round 13 — 66/100（ほぼ否）

実装: PinSheet — 現金のみシードでも PayPay/クレジット等を報告可能に明示（`PAYMENT_FILTERS.slice(0,3)` 維持）、「未検証でも報告できます」コピー。UX 改善だが採点軸にはほぼ効かず。

## Round 14 — 66/100（ほぼ否）

実装: `lib/pitchScore.ts` + `lib/pitchScore.test.ts`（8軸配点合計100のメタテスト）。採点ログの機械的整合。

## Round 15 — 66/100（STOP）

実装: 本ドキュメント STOP 節・README 準備度の正直な記載。ループ完了。
