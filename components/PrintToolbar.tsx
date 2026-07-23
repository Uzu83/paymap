"use client";

import Link from "next/link";

export function PrintToolbar() {
  return (
    <>
      <Link
        href="/for-city"
        className="text-sm font-medium text-[var(--pay-deep)] underline-offset-2 hover:underline"
      >
        ← 福岡市向け説明へ
      </Link>
      <button
        type="button"
        onClick={() => window.print()}
        className="ml-4 rounded-lg bg-[var(--pay)] px-3 py-1.5 text-sm font-medium text-[var(--ink)]"
      >
        印刷
      </button>
    </>
  );
}
