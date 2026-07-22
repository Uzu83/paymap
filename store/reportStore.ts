"use client";

import { create } from "zustand";
import type { PaymentMethod, ReportKind } from "@/lib/types";

export type RemoteStat = {
  shop_id: string;
  method: PaymentMethod;
  worked: number;
  failed: number;
};

type ReportState = {
  stats: RemoteStat[];
  loaded: boolean;
  hydrate: () => Promise<void>;
  addReport: (
    shopId: string,
    method: PaymentMethod,
    kind: ReportKind,
  ) => Promise<{ ok: boolean; error?: string }>;
};

function bumpLocal(
  stats: RemoteStat[],
  shopId: string,
  method: PaymentMethod,
  kind: ReportKind,
): RemoteStat[] {
  const idx = stats.findIndex(
    (s) => s.shop_id === shopId && s.method === method,
  );
  if (idx < 0) {
    return [
      ...stats,
      {
        shop_id: shopId,
        method,
        worked: kind === "worked" ? 1 : 0,
        failed: kind === "failed" ? 1 : 0,
      },
    ];
  }
  const next = [...stats];
  const cur = next[idx];
  next[idx] = {
    ...cur,
    worked: cur.worked + (kind === "worked" ? 1 : 0),
    failed: cur.failed + (kind === "failed" ? 1 : 0),
  };
  return next;
}

export const useReportStore = create<ReportState>((set, get) => ({
  stats: [],
  loaded: false,
  hydrate: async () => {
    try {
      const res = await fetch("/api/reports");
      if (!res.ok) {
        set({ loaded: true });
        return;
      }
      const json = (await res.json()) as { stats?: RemoteStat[] };
      set({ stats: json.stats ?? [], loaded: true });
    } catch {
      set({ loaded: true });
    }
  },
  addReport: async (shopId, method, kind) => {
    try {
      const res = await fetch("/api/reports", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ shopId, method, kind }),
      });
      if (!res.ok) {
        const json = (await res.json().catch(() => ({}))) as {
          error?: string;
        };
        return { ok: false, error: json.error ?? "failed" };
      }
      set({ stats: bumpLocal(get().stats, shopId, method, kind) });
      return { ok: true };
    } catch {
      return { ok: false, error: "network" };
    }
  },
}));
