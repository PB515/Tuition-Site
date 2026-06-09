"use client";

type Col = { key: string; label: string };

export default function ReportTable({
  columns,
  rows,
  filename,
  empty,
}: {
  columns: Col[];
  rows: Record<string, string | number | null>[];
  filename: string;
  empty?: string;
}) {
  function exportCsv() {
    const esc = (v: unknown) => `"${String(v ?? "").replace(/"/g, '""')}"`;
    const lines = [columns.map((c) => esc(c.label)).join(",")];
    rows.forEach((r) => lines.push(columns.map((c) => esc(r[c.key])).join(",")));
    const blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }

  if (!rows.length) {
    return (
      <p className="mt-6 rounded-2xl border border-border bg-surface p-6 text-sm text-ink-muted">
        {empty ?? "No data for these filters."}
      </p>
    );
  }

  return (
    <div className="mt-4">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm text-ink-muted">{rows.length} row(s)</span>
        <button
          type="button"
          onClick={exportCsv}
          className="rounded-full border border-border px-4 py-1.5 text-sm font-medium text-ink-muted hover:text-ink"
        >
          Export CSV
        </button>
      </div>
      <div className="overflow-x-auto rounded-2xl border border-border">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="border-b border-border bg-surface text-xs uppercase tracking-wide text-ink-muted">
            <tr>
              {columns.map((c) => (
                <th key={c.key} className="px-4 py-3 font-semibold">
                  {c.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {rows.map((r, i) => (
              <tr key={i}>
                {columns.map((c) => (
                  <td key={c.key} className="px-4 py-2 text-ink">
                    {r[c.key] ?? "-"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
