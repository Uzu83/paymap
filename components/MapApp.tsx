"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useMemo } from "react";
import { FilterBar } from "@/components/FilterBar";
import { PinSheet } from "@/components/PinSheet";
import { TrustLegend } from "@/components/TrustLegend";
import { AREA_LABELS, filterShops } from "@/lib/shops";
import { useMapUiStore } from "@/store/mapUiStore";
import { useReportStore } from "@/store/reportStore";

const MapView = dynamic(
  () => import("@/components/MapView").then((m) => m.MapView),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full items-center justify-center bg-[var(--wash)] text-sm text-[var(--muted)]">
        地図を読み込み中…
      </div>
    ),
  },
);

export function MapApp() {
  const area = useMapUiStore((s) => s.area);
  const district = useMapUiStore((s) => s.district);
  const payment = useMapUiStore((s) => s.payment);
  const genre = useMapUiStore((s) => s.genre);
  const cashlessOnly = useMapUiStore((s) => s.cashlessOnly);
  const searchQuery = useMapUiStore((s) => s.searchQuery);
  const selectedId = useMapUiStore((s) => s.selectedId);
  const hydrate = useReportStore((s) => s.hydrate);

  useEffect(() => {
    void hydrate();
  }, [hydrate]);

  const shops = useMemo(
    () =>
      filterShops({
        area,
        district: area === "fukuoka" ? district : null,
        payment,
        genre,
        cashlessOnly,
        nameQuery: searchQuery,
        includeSample: area === "shibuya",
      }),
    [area, district, payment, genre, cashlessOnly, searchQuery],
  );
  const selected = shops.find((s) => s.id === selectedId) ?? null;

  return (
    <div className="relative h-[100dvh] w-full overflow-hidden">
      <div className="absolute inset-0 z-0">
        <MapView shops={shops} />
      </div>

      <header className="pointer-events-none absolute inset-x-0 top-0 z-[500] bg-gradient-to-b from-[var(--paper)] via-[var(--paper)]/90 to-transparent px-4 pb-8 pt-4">
        <div className="pointer-events-auto flex items-end justify-between gap-3">
          <div>
            <p className="font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-[var(--ink)] sm:text-3xl">
              Paymap
            </p>
            <p className="mt-0.5 text-sm text-[var(--muted)]">
              使えるペイ · {AREA_LABELS[area]}
            </p>
          </div>
          <div className="flex flex-col items-end gap-1">
            <p className="rounded-md bg-[var(--panel)]/90 px-2 py-1 text-xs text-[var(--muted)] ring-1 ring-[var(--line)] backdrop-blur">
              {shops.length}件
            </p>
            <div className="flex flex-wrap justify-end gap-1">
              <Link
                href="/area/fukuoka/tenjin-west"
                className="rounded-md bg-[var(--panel)]/90 px-2 py-1 text-xs font-medium text-[var(--ink)] ring-1 ring-[var(--line)] backdrop-blur hover:bg-[var(--wash)]"
              >
                天神西
              </Link>
              <Link
                href="/metrics"
                className="rounded-md bg-[var(--panel)]/90 px-2 py-1 text-xs font-medium text-[var(--ink)] ring-1 ring-[var(--line)] backdrop-blur hover:bg-[var(--wash)]"
              >
                メトリクス
              </Link>
              <Link
                href="/area/fukuoka"
                className="rounded-md bg-[var(--panel)]/90 px-2 py-1 text-xs font-medium text-[var(--ink)] ring-1 ring-[var(--line)] backdrop-blur hover:bg-[var(--wash)]"
              >
                福岡エリア
              </Link>
              <Link
                href="/faq"
                className="rounded-md bg-[var(--panel)]/90 px-2 py-1 text-xs font-medium text-[var(--ink)] ring-1 ring-[var(--line)] backdrop-blur hover:bg-[var(--wash)]"
              >
                FAQ
              </Link>
              <Link
                href="/contact"
                className="rounded-md bg-[var(--panel)]/90 px-2 py-1 text-xs font-medium text-[var(--ink)] ring-1 ring-[var(--line)] backdrop-blur hover:bg-[var(--wash)]"
              >
                お問い合わせ
              </Link>
              <Link
                href="/for-city"
                className="rounded-md bg-[var(--ink)] px-2 py-1 text-xs font-medium text-[var(--panel)]"
              >
                市向け説明
              </Link>
              <Link
                href="/for-city/print"
                className="rounded-md bg-[var(--panel)]/90 px-2 py-1 text-xs font-medium text-[var(--ink)] ring-1 ring-[var(--line)] backdrop-blur hover:bg-[var(--wash)]"
              >
                印刷1枚
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-3">
          <FilterBar />
        </div>
      </header>

      {selected ? <PinSheet shop={selected} /> : null}

      <div className="pointer-events-none absolute bottom-4 left-4 z-[500]">
        <TrustLegend />
      </div>

      {shops.length === 0 ? (
        <div className="pointer-events-none absolute inset-x-0 bottom-8 z-[500] flex justify-center px-4">
          <p className="rounded-lg bg-[var(--panel)] px-4 py-3 text-sm text-[var(--ink)] shadow ring-1 ring-[var(--line)]">
            条件に合う店がありません。フィルタを緩めてみてください。
          </p>
        </div>
      ) : null}
    </div>
  );
}
