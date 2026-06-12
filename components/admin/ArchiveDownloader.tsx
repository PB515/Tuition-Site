"use client";

import { useState } from "react";

// Pick an academic year, then download each dataset for that year as CSV.
export default function ArchiveDownloader({ years, current }: { years: string[]; current: string }) {
  const [year, setYear] = useState(current);

  const datasets: { key: string; label: string; note: string }[] = [
    { key: "attendance", label: "Attendance", note: "every day marked that year" },
    { key: "marks", label: "Test marks", note: "all tests + marks that year" },
    { key: "fees", label: "Fees", note: "fees due that year, paid or not" },
    { key: "students", label: "Students roster", note: "full current roster (all years)" },
  ];

  return (
    <div className="rounded-2xl border border-border bg-surface p-4">
      <div className="flex flex-wrap items-end gap-3">
        <label className="block text-sm">
          <span className="font-medium text-ink">Academic year</span>
          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="mt-1 w-44 rounded-lg border border-border bg-bg px-3 py-2 text-sm text-ink focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
          >
            {years.length === 0 && <option value={current}>{current}</option>}
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
                {y === current ? " (now)" : ""}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
        {datasets.map((d) => (
          <a
            key={d.key}
            href={`/admin/export/archive?dataset=${d.key}&year=${encodeURIComponent(year)}`}
            className="flex items-center justify-between rounded-xl border border-border px-4 py-3 text-sm hover:border-primary"
          >
            <span>
              <span className="font-medium text-ink">{d.label}</span>
              <span className="mt-0.5 block text-xs text-ink-muted">{d.note}</span>
            </span>
            <span className="shrink-0 rounded-full bg-primary-tint px-3 py-1 text-xs font-semibold text-primary-strong">
              Download CSV
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
