/**
 * 福岡・天神〜博多の OSM POI を Overpass から取得し data/shops.json にマージする。
 * サンプル（渋谷等）は消さない。osmId で冪等。
 *
 * 実行: node scripts/seed-fukuoka-osm.mjs
 * 確認のみ: node scripts/seed-fukuoka-osm.mjs --dry-run
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const shopsPath = join(__dirname, "../data/shops.json");
const dryRun = process.argv.includes("--dry-run");
const maxArg = process.argv.find((a) => a.startsWith("--max="));
const maxAdd = maxArg ? Number(maxArg.slice("--max=".length)) : null;

/** 天神〜博多の取得 bbox（south,west,north,east） */
const TENJIN_HAKATA_BBOX = {
  south: 33.585,
  west: 130.39,
  north: 33.598,
  east: 130.42,
};

/** lib/shops.ts TENJIN_WEST_BBOX と同期。nakasu / hakata-station は座標タグ付け用 */
const DISTRICT_BBOXES = [
  {
    id: "hakata-station",
    latMin: 33.586,
    latMax: 33.5925,
    lngMin: 130.414,
    lngMax: 130.421,
    ward: "福岡市博多区",
    label: "博多駅周辺",
  },
  {
    id: "nakasu",
    latMin: 33.591,
    latMax: 33.5965,
    lngMin: 130.4035,
    lngMax: 130.4075,
    ward: "福岡市博多区",
    label: "中洲",
  },
  {
    id: "tenjin-west",
    latMin: 33.5885,
    latMax: 33.5925,
    lngMin: 130.3945,
    lngMax: 130.4005,
    ward: "福岡市中央区",
    label: "天神西",
  },
];

/** 店名部分一致でチェーン推定（data/shops.json の estimated 店と整合） */
const CHAIN_PATTERNS = [
  "ローソン",
  "LAWSON",
  "セブン-イレブン",
  "セブンイレブン",
  "7-Eleven",
  "7-11",
  "ファミリーマート",
  "FamilyMart",
  "マクドナルド",
  "McDonald",
  "モスバーガー",
  "MOS BURGER",
  "スターバックス",
  "Starbucks",
  "吉野家",
  "すき家",
  "松屋",
  "ほっともっと",
  "ビックカメラ",
  "大丸",
  "三越",
  "ブックオフ",
  "ジョイフル",
  "無印良品",
  "MUJI",
  "ミスタードーナツ",
  "Mister Donut",
  "餃子の王将",
  "デイリーヤマザキ",
  "ドトール",
  "Doutor",
  "ダイソー",
  "DAISO",
  "ポプラ",
  "ゆで太郎",
  "CoCo壱",
  "CoCo壱番屋",
  "マルイ",
  "ベローチェ",
];

const CHAIN_PAYMENTS = [
  "paypay",
  "credit_card",
  "transit_ic",
  "rakuten_pay",
  "aupay",
  "cash",
];

const OVERPASS_URL = "https://overpass-api.de/api/interpreter";

function todayIso() {
  return new Date().toISOString().slice(0, 10);
}

function inBbox(lat, lng, bbox) {
  return (
    lat >= bbox.latMin &&
    lat <= bbox.latMax &&
    lng >= bbox.lngMin &&
    lng <= bbox.lngMax
  );
}

function resolveDistrict(lat, lng) {
  for (const d of DISTRICT_BBOXES) {
    if (inBbox(lat, lng, d)) return d;
  }
  return null;
}

function isChainName(name) {
  const upper = name.toUpperCase();
  return CHAIN_PATTERNS.some((p) => {
    const pat = p.toUpperCase();
    return upper.includes(pat) || name.includes(p);
  });
}

function mapGenre(tags) {
  const amenity = tags.amenity ?? "";
  const shop = tags.shop ?? "";

  if (amenity === "cafe" || shop === "coffee" || tags.cuisine === "coffee_shop") {
    return "cafe";
  }
  if (
    amenity === "fast_food" ||
    amenity === "restaurant" ||
    amenity === "food_court" ||
    amenity === "bar" ||
    amenity === "pub" ||
    amenity === "nightclub" ||
    amenity === "biergarten"
  ) {
    return "food";
  }
  if (
    shop === "hairdresser" ||
    shop === "beauty" ||
    amenity === "hairdresser"
  ) {
    return "beauty";
  }
  if (shop === "convenience" || tags.brand === "Lawson") {
    return "convenience";
  }
  if (shop) return "retail";
  return "other";
}

function formatAddress(districtMeta, paymentStatus) {
  const unverified = paymentStatus === "unverified";
  const osmNote = unverified
    ? "（OSM座標・決済未検証）"
    : "（OSM座標）";

  if (districtMeta) {
    const place = `${districtMeta.ward}・${districtMeta.label}`;
    return unverified ? `${place}近傍${osmNote}` : `${place}${osmNote}`;
  }

  return unverified
    ? `福岡市中央区近傍${osmNote}`
    : "福岡市中央区（天神〜博多・OSM座標）";
}

function buildOverpassQuery() {
  const { south, west, north, east } = TENJIN_HAKATA_BBOX;
  const bbox = `${south},${west},${north},${east}`;
  return `
[out:json][timeout:90];
(
  node["name"]["amenity"~"restaurant|cafe|fast_food|bar|pub|nightclub|food_court|ice_cream"](${bbox});
  node["name"]["shop"](${bbox});
  way["name"]["amenity"~"restaurant|cafe|fast_food|bar|pub|nightclub|food_court"](${bbox});
  way["name"]["shop"](${bbox});
);
out center;
`.trim();
}

function elementCoords(el) {
  if (el.type === "node") {
    return { lat: el.lat, lng: el.lon };
  }
  if (el.center) {
    return { lat: el.center.lat, lng: el.center.lon };
  }
  return null;
}

function osmElementToShop(el) {
  const tags = el.tags ?? {};
  const name = tags.name?.trim();
  if (!name) return null;

  const coords = elementCoords(el);
  if (!coords) return null;

  const { lat, lng } = coords;
  const districtBox = resolveDistrict(lat, lng);
  const chain = isChainName(name);
  const paymentStatus = chain ? "estimated" : "unverified";
  const genre = mapGenre(tags);
  const hours = tags.opening_hours ?? "要確認";
  const osmId = el.id;
  const id = `fukuoka-osm-${osmId}`;

  return {
    id,
    name,
    lat,
    lng,
    area: "fukuoka",
    genre,
    hours,
    payments: chain ? [...CHAIN_PAYMENTS] : ["cash"],
    seedConfidence: chain ? 0.88 : 0.35,
    lastVerified: todayIso(),
    address: formatAddress(districtBox, paymentStatus),
    note: chain
      ? "全国チェーンの一般的対応に基づく推定シード。店頭で最終確認を。"
      : "OSM上の実在POI。キャッシュレス対応は未検証（要現地/報告）。",
    source: "osm",
    osmId,
    sample: false,
    paymentStatus,
    ...(districtBox ? { district: districtBox.id } : {}),
  };
}

async function fetchOverpass() {
  const query = buildOverpassQuery();
  const res = await fetch(OVERPASS_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      Accept: "application/json",
      "User-Agent": "PaymapSeed/1.0 (https://paymap-six.vercel.app)",
    },
    body: `data=${encodeURIComponent(query)}`,
  });
  if (!res.ok) {
    throw new Error(`Overpass HTTP ${res.status}: ${await res.text()}`);
  }
  const json = await res.json();
  return json.elements ?? [];
}

function mergeShops(existing, fetched) {
  const byOsmId = new Map();
  for (const shop of existing) {
    if (typeof shop.osmId === "number") {
      byOsmId.set(shop.osmId, shop);
    }
  }

  let added = 0;
  let skipped = 0;
  const merged = [...existing];

  // Prefer shops that fall in named pilot districts first.
  const shops = [];
  for (const el of fetched) {
    const shop = osmElementToShop(el);
    if (!shop) continue;
    if (byOsmId.has(shop.osmId)) {
      skipped += 1;
      continue;
    }
    shops.push(shop);
  }
  shops.sort((a, b) => Number(Boolean(b.district)) - Number(Boolean(a.district)));
  for (const shop of shops) {
    if (maxAdd != null && added >= maxAdd) break;
    byOsmId.set(shop.osmId, shop);
    merged.push(shop);
    added += 1;
  }

  return { merged, added, skipped };
}

const existing = JSON.parse(readFileSync(shopsPath, "utf8"));
console.log(`Existing shops: ${existing.length} (${existing.filter((s) => s.sample).length} samples)`);

const elements = await fetchOverpass();
console.log(`Overpass elements with names: ${elements.length}`);

const { merged, added, skipped } = mergeShops(existing, elements);
console.log(`Would add ${added} new shop(s), skip ${skipped} existing osmId(s).`);

if (dryRun) {
  console.log("--dry-run: not writing data/shops.json");
  process.exit(0);
}

writeFileSync(shopsPath, `${JSON.stringify(merged, null, 2)}\n`, "utf8");
console.log(`Wrote ${merged.length} shops to data/shops.json (+${added}).`);
