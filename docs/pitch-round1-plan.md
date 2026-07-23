# Round 1 改善計画（総合 21 → 目標 45+）

評価 blocker への最短打ち込み。事業法人設立や資金調達は対象外。

## 実装スコープ

1. **福岡（天神〜博多）をデフォルト地図**にする
2. **OSM 由来の実在店舗シード**（name/lat/lng/出典付）。決済タグが無い店は `payments` を保守的に、`seedConfidence` 低め、`source: osm`
3. 渋谷シードは `sample: true` で明示分離。UI に「サンプル」バッジ
4. `/area/fukuoka` + ヘッダ「福岡MVP」
5. `docs/pitch-fukuoka.md` — 市 DX・観光・実証仮説・KPI
6. `/for-city` — 市向け1ページ（課題→デモ→報告ループ）
7. ピンシートに **出典・確認日・報告数** を露出
8. テスト: shops filter / 福岡デフォルト / sample フラグ

## 非スコープ（後ラウンド）

- 実店舗確認の人手オペ
- 専用 Supabase 分離
- 本格ピッチ PDF
- 収益モデル実装
