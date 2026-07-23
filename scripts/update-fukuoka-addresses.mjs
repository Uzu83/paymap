/**
 * 福岡シードの汎用住所を district ラベル付きに更新する（ネットワーク不要）。
 * 実行: node scripts/update-fukuoka-addresses.mjs
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const shopsPath = join(__dirname, "../data/shops.json");

/** lib/shops.ts FUKUOKA_DISTRICTS と同期 */
const DISTRICT_ADDRESS = {
  "tenjin-west": { ward: "福岡市中央区", label: "天神西" },
  nakasu: { ward: "福岡市博多区", label: "中洲" },
  "hakata-station": { ward: "福岡市博多区", label: "博多駅周辺" },
};

function isGenericFukuokaAddress(address) {
  return (
    address.startsWith("福岡市中央区") ||
    address.startsWith("福岡市博多区（天神〜博多")
  );
}

function formatAddress(shop) {
  if (shop.area !== "fukuoka" || shop.sample) return shop.address;
  if (!isGenericFukuokaAddress(shop.address)) return shop.address;

  const unverified = shop.paymentStatus === "unverified";
  const osmNote = unverified
    ? "（OSM座標・決済未検証）"
    : "（OSM座標）";

  const districtMeta = shop.district
    ? DISTRICT_ADDRESS[shop.district]
    : undefined;

  if (districtMeta) {
    const place = `${districtMeta.ward}・${districtMeta.label}`;
    return unverified ? `${place}近傍${osmNote}` : `${place}${osmNote}`;
  }

  return unverified
    ? `福岡市中央区近傍${osmNote}`
    : "福岡市中央区（天神〜博多・OSM座標）";
}

const shops = JSON.parse(readFileSync(shopsPath, "utf8"));
let updated = 0;

for (const shop of shops) {
  const next = formatAddress(shop);
  if (next !== shop.address) {
    shop.address = next;
    updated += 1;
  }
}

writeFileSync(shopsPath, `${JSON.stringify(shops, null, 2)}\n`, "utf8");
console.log(`Updated ${updated} shop address(es) in data/shops.json`);
