"use client";

import { GENRE_LABELS, PAYMENT_FILTERS, PAYMENT_LABELS } from "@/lib/payments";
import type { Genre, PaymentMethod } from "@/lib/types";
import { useMapUiStore } from "@/store/mapUiStore";

const GENRES: Genre[] = ["food", "cafe", "beauty", "retail", "convenience"];

export function FilterBar() {
  const {
    payment,
    genre,
    cashlessOnly,
    setPayment,
    setGenre,
    setCashlessOnly,
  } = useMapUiStore();

  return (
    <div className="pointer-events-auto flex w-full flex-col gap-2">
      <div className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <Chip
          active={cashlessOnly}
          onClick={() => setCashlessOnly(!cashlessOnly)}
        >
          キャッシュレス可
        </Chip>
        {PAYMENT_FILTERS.map((p) => (
          <Chip
            key={p}
            active={payment === p}
            onClick={() =>
              setPayment(payment === p ? null : (p as PaymentMethod))
            }
          >
            {PAYMENT_LABELS[p]}
          </Chip>
        ))}
      </div>
      <div className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <Chip active={genre === null} onClick={() => setGenre(null)}>
          すべて
        </Chip>
        {GENRES.map((g) => (
          <Chip
            key={g}
            active={genre === g}
            onClick={() => setGenre(genre === g ? null : g)}
          >
            {GENRE_LABELS[g]}
          </Chip>
        ))}
      </div>
    </div>
  );
}

function Chip({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        active
          ? "shrink-0 rounded-md bg-[var(--pay)] px-3 py-1.5 text-sm font-medium text-[var(--ink)] shadow-sm transition"
          : "shrink-0 rounded-md bg-[var(--panel)]/95 px-3 py-1.5 text-sm font-medium text-[var(--ink)] ring-1 ring-[var(--line)] backdrop-blur transition hover:bg-white"
      }
    >
      {children}
    </button>
  );
}
