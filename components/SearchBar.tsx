"use client";

import { useMapUiStore } from "@/store/mapUiStore";

export function SearchBar() {
  const searchQuery = useMapUiStore((s) => s.searchQuery);
  const setSearchQuery = useMapUiStore((s) => s.setSearchQuery);

  return (
    <div className="relative w-full">
      <input
        type="search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="店名で検索"
        aria-label="店名で検索"
        className="w-full rounded-md bg-[var(--panel)]/95 py-2 pl-3 pr-9 text-sm text-[var(--ink)] ring-1 ring-[var(--line)] backdrop-blur placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[var(--pay)]"
      />
      {searchQuery ? (
        <button
          type="button"
          onClick={() => setSearchQuery("")}
          aria-label="検索をクリア"
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded px-1.5 py-0.5 text-sm font-medium text-[var(--muted)] hover:bg-[var(--wash)] hover:text-[var(--ink)]"
        >
          ×
        </button>
      ) : null}
    </div>
  );
}
