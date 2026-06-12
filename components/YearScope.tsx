import Link from "next/link";

// Year pills for separating live (this year) from old (past years) data.
// Rendered on the parent dashboard and the admin student profile. Pure links,
// no client JS: each pill carries ?year=<academic year> (or ?year=all).
export default function YearScope({
  years,
  selected,
  current,
  base,
}: {
  years: string[];
  selected: string; // a year string, or "all"
  current: string; // the live academic year, marked with a dot
  base: string;
}) {
  if (years.length <= 1) return null;
  const cls = (active: boolean) =>
    active
      ? "rounded-full bg-primary-strong px-3 py-1 text-xs font-semibold text-white"
      : "rounded-full border border-border px-3 py-1 text-xs font-medium text-ink-muted hover:text-ink";
  return (
    <div className="mt-4 flex flex-wrap items-center gap-2">
      {years.map((y) => (
        <Link key={y} href={`${base}?year=${encodeURIComponent(y)}`} className={cls(selected === y)}>
          {y}
          {y === current ? " · now" : ""}
        </Link>
      ))}
      <Link href={`${base}?year=all`} className={cls(selected === "all")}>
        All years
      </Link>
    </div>
  );
}
