"use client";

import L from "leaflet";
import { useEffect, useMemo } from "react";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { isCashless } from "@/lib/payments";
import { SHIBUYA_CENTER } from "@/lib/shops";
import type { Shop } from "@/lib/types";
import { useMapUiStore } from "@/store/mapUiStore";

function pinIcon(cashless: boolean, selected: boolean) {
  const fill = cashless ? "#00c2a8" : "#c45c26";
  const r = selected ? 11 : 8;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${r * 2 + 8}" height="${r * 2 + 8}" viewBox="0 0 ${r * 2 + 8} ${r * 2 + 8}"><circle cx="${r + 4}" cy="${r + 4}" r="${r}" fill="${fill}" stroke="#0c1f1a" stroke-width="2"/></svg>`;
  return L.divIcon({
    className: "",
    html: svg,
    iconSize: [r * 2 + 8, r * 2 + 8],
    iconAnchor: [r + 4, r + 4],
  });
}

function FitShops({ shops }: { shops: Shop[] }) {
  const map = useMap();
  useEffect(() => {
    if (shops.length === 0) return;
    const bounds = L.latLngBounds(shops.map((s) => [s.lat, s.lng]));
    map.fitBounds(bounds.pad(0.2), { animate: false });
  }, [map, shops]);
  return null;
}

export function MapView({ shops }: { shops: Shop[] }) {
  const selectedId = useMapUiStore((s) => s.selectedId);
  const selectShop = useMapUiStore((s) => s.selectShop);

  const markers = useMemo(
    () =>
      shops.map((shop) => (
        <Marker
          key={shop.id}
          position={[shop.lat, shop.lng]}
          icon={pinIcon(isCashless(shop.payments), selectedId === shop.id)}
          eventHandlers={{
            click: () => selectShop(shop.id),
          }}
        />
      )),
    [shops, selectedId, selectShop],
  );

  return (
    <MapContainer
      center={[SHIBUYA_CENTER.lat, SHIBUYA_CENTER.lng]}
      zoom={15}
      className="h-full w-full"
      zoomControl={false}
      attributionControl={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <FitShops shops={shops} />
      {markers}
    </MapContainer>
  );
}
