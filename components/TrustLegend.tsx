/** 地図上のピン色・信頼バッジのコンパクト凡例（ヒーロー用カードではなくユーティリティ向け） */
export function TrustLegend() {
  return (
    <section className="pointer-events-auto rounded-md bg-[var(--panel)]/92 px-2.5 py-1.5 text-[0.65rem] leading-snug text-[var(--muted)] shadow ring-1 ring-[var(--line)] backdrop-blur">
      <p className="sr-only">地図の凡例</p>
      <ul className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <LegendDot color="#00c2a8" label="キャッシュレス可" />
        <LegendDot color="#c45c26" label="現金のみ" />
        <LegendBadge tone="estimated" label="チェーン推定" />
        <LegendBadge tone="unverified" label="未検証" />
      </ul>
    </section>
  );
}

function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <li className="flex items-center gap-1.5">
      <span
        className="inline-block size-2.5 shrink-0 rounded-full ring-1 ring-[var(--ink)]/25"
        style={{ backgroundColor: color }}
        aria-hidden
      />
      <span>{label}</span>
    </li>
  );
}

function LegendBadge({
  tone,
  label,
}: {
  tone: "estimated" | "unverified";
  label: string;
}) {
  const className =
    tone === "unverified"
      ? "bg-[var(--wash)] text-[var(--warn)] ring-[var(--line)]"
      : "bg-[var(--wash)] text-[var(--pay-deep)] ring-[var(--line)]";

  return (
    <li className="flex items-center gap-1.5">
      <span
        className={`inline-flex rounded-full px-1.5 py-px text-[0.6rem] font-medium ring-1 ${className}`}
      >
        {label}
      </span>
    </li>
  );
}
