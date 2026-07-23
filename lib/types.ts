export type PaymentMethod =
  | "paypay"
  | "credit_card"
  | "transit_ic"
  | "rakuten_pay"
  | "aupay"
  | "cash";

export type Genre =
  | "food"
  | "cafe"
  | "beauty"
  | "retail"
  | "convenience"
  | "other";

export type AreaId = "fukuoka" | "shibuya";

export type ShopSource = "osm" | "sample" | "user";

/** 決済シードの検証段階。UI バッジと審査説明用。 */
export type PaymentStatus = "estimated" | "unverified" | "sample" | "field";

export type Shop = {
  id: string;
  name: string;
  lat: number;
  lng: number;
  area: AreaId;
  genre: Genre;
  /** OSM opening_hours 風の簡易文字列（表示用） */
  hours: string;
  /** シード時点で対応している決済。cash のみなら現金のみ店 */
  payments: PaymentMethod[];
  /** シードの信頼度 0–1。ユーザー報告で上書き合成する */
  seedConfidence: number;
  /** ISO date — シード最終確認日 */
  lastVerified: string;
  address: string;
  note?: string;
  source?: ShopSource;
  osmId?: number;
  /** true = デモ用サンプル（採択審査の本線ではない） */
  sample?: boolean;
  /** 決済情報の検証段階。未指定時は sample フラグから推定 */
  paymentStatus?: PaymentStatus;
  /** パイロット用マイクロエリア（例: tenjin-west） */
  district?: string;
};

export type ReportKind = "worked" | "failed";

export type PaymentReport = {
  shopId: string;
  method: PaymentMethod;
  kind: ReportKind;
  at: string;
};
