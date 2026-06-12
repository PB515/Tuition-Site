"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ENQUIRY_CLASSES } from "@/lib/site";
import { bulkAssignBatch, bulkSetActive, bulkPromote } from "@/app/admin/students/actions";

type Row = {
  id: string;
  name: string;
  admission_no: string | null;
  roll_number: string | null;
  class: string | null;
  batch_name: string | null;
  parent_name: string | null;
  parent_whatsapp: string | null;
  active: boolean;
  att_total: number;
  att_present: number;
  fee_pending: number;
  last_test_marks: number | null;
  last_test_total: number | null;
};
type Batch = { id: string; name: string };

const cellBtn = "rounded-full border border-border px-3 py-1.5 text-sm font-medium text-ink-muted hover:text-ink";

export default function StudentsTable({ rows, batches }: { rows: Row[]; batches: Batch[] }) {
  const router = useRouter();
  const [sel, setSel] = useState<Set<string>>(new Set());
  const [assignBatch, setAssignBatch] = useState("");
  const [promoteClass, setPromoteClass] = useState("");
  const [promoteBatch, setPromoteBatch] = useState("");
  const [pending, start] = useTransition();

  const ids = Array.from(sel);
  const allSelected = rows.length > 0 && sel.size === rows.length;
  function toggleAll() {
    setSel(allSelected ? new Set() : new Set(rows.map((r) => r.id)));
  }
  function toggle(id: string) {
    setSel((p) => {
      const n = new Set(p);
      if (n.has(id)) n.delete(id);
      else n.add(id);
      return n;
    });
  }
  function run(fn: () => Promise<void>) {
    start(async () => {
      await fn();
      setSel(new Set());
      router.refresh();
    });
  }

  function exportSelected() {
    const chosen = rows.filter((r) => sel.has(r.id));
    const header = ["Admission no", "Roll", "Name", "Class", "Batch", "Parent", "WhatsApp", "Attendance", "Fee", "Last test", "Status"];
    const esc = (v: unknown) => `"${String(v ?? "").replace(/"/g, '""')}"`;
    const lines = [header.join(",")];
    chosen.forEach((r) => {
      const pct = r.att_total ? Math.round((r.att_present / r.att_total) * 100) + "%" : "";
      lines.push(
        [
          r.admission_no,
          r.roll_number,
          r.name,
          r.class,
          r.batch_name,
          r.parent_name,
          r.parent_whatsapp,
          pct,
          r.fee_pending > 0 ? "Pending" : "Clear",
          r.last_test_marks != null ? `${r.last_test_marks}/${r.last_test_total ?? "-"}` : "",
          r.active ? "Active" : "Inactive",
        ]
          .map(esc)
          .join(","),
      );
    });
    const blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "students-selected.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  function copyWhatsapp() {
    const text = rows
      .filter((r) => sel.has(r.id) && r.parent_whatsapp)
      .map((r) => `${r.name} - ${r.parent_whatsapp}`)
      .join("\n");
    navigator.clipboard.writeText(text);
  }

  return (
    <div>
      {sel.size > 0 && (
        <div className="mb-3 flex flex-wrap items-center gap-2 rounded-xl border border-primary bg-primary-tint/40 px-4 py-2 text-sm">
          <span className="font-medium text-ink">{sel.size} selected</span>

          <select
            value={assignBatch}
            onChange={(e) => setAssignBatch(e.target.value)}
            className="rounded-lg border border-border bg-bg px-2 py-1.5 text-sm"
          >
            <option value="">Assign batch...</option>
            {batches.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name}
              </option>
            ))}
          </select>
          <button onClick={() => run(() => bulkAssignBatch(ids, assignBatch))} disabled={!assignBatch} className={cellBtn}>
            Apply
          </button>

          <span className="mx-1 hidden h-5 w-px bg-border sm:inline-block" />

          <select
            value={promoteClass}
            onChange={(e) => setPromoteClass(e.target.value)}
            className="rounded-lg border border-border bg-bg px-2 py-1.5 text-sm"
          >
            <option value="">Promote to class...</option>
            {ENQUIRY_CLASSES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <select
            value={promoteBatch}
            onChange={(e) => setPromoteBatch(e.target.value)}
            className="rounded-lg border border-border bg-bg px-2 py-1.5 text-sm"
          >
            <option value="">into batch...</option>
            {batches.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name}
              </option>
            ))}
          </select>
          <button
            onClick={() => run(() => bulkPromote(ids, promoteClass, promoteBatch))}
            disabled={!promoteClass && !promoteBatch}
            className="rounded-full bg-primary-strong px-3 py-1.5 text-sm font-semibold text-white hover:bg-primary-deep disabled:opacity-40"
          >
            Promote
          </button>

          <span className="mx-1 hidden h-5 w-px bg-border sm:inline-block" />

          <button onClick={() => run(() => bulkSetActive(ids, true))} className={cellBtn}>Mark active</button>
          <button onClick={() => run(() => bulkSetActive(ids, false))} className={cellBtn}>Mark inactive</button>
          <button onClick={exportSelected} className={cellBtn}>Export selected</button>
          <button onClick={copyWhatsapp} className={cellBtn}>Copy WhatsApp list</button>
        </div>
      )}

      <div className="overflow-x-auto rounded-2xl border border-border">
        <table className="w-full min-w-[1000px] text-left text-sm">
          <thead className="border-b border-border bg-surface text-xs uppercase tracking-wide text-ink-muted">
            <tr>
              <th className="px-3 py-3">
                <input type="checkbox" checked={allSelected} onChange={toggleAll} />
              </th>
              <th className="px-4 py-3 font-semibold">Student</th>
              <th className="px-4 py-3 font-semibold">Class</th>
              <th className="px-4 py-3 font-semibold">Batch</th>
              <th className="px-4 py-3 font-semibold">Parent</th>
              <th className="px-4 py-3 font-semibold">WhatsApp</th>
              <th className="px-4 py-3 font-semibold">Att %</th>
              <th className="px-4 py-3 font-semibold">Fee</th>
              <th className="px-4 py-3 font-semibold">Last test</th>
              <th className="px-4 py-3 font-semibold">Status</th>
              <th className="px-4 py-3 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {rows.map((r) => {
              const pct = r.att_total ? Math.round((r.att_present / r.att_total) * 100) : null;
              return (
                <tr key={r.id}>
                  <td className="px-3 py-2">
                    <input type="checkbox" checked={sel.has(r.id)} onChange={() => toggle(r.id)} />
                  </td>
                  <td className="px-4 py-2">
                    <div className="font-medium text-ink">{r.name}</div>
                    {(r.admission_no || r.roll_number) && (
                      <div className="text-xs text-ink-muted">
                        {[r.admission_no, r.roll_number ? `Roll ${r.roll_number}` : null]
                          .filter(Boolean)
                          .join("  ·  ")}
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-2 text-ink-muted">{r.class ?? "-"}</td>
                  <td className="px-4 py-2 text-ink-muted">{r.batch_name ?? "-"}</td>
                  <td className="px-4 py-2 text-ink-muted">{r.parent_name ?? "-"}</td>
                  <td className="whitespace-nowrap px-4 py-2 text-ink-muted">{r.parent_whatsapp ?? "-"}</td>
                  <td className="px-4 py-2 text-ink-muted">{pct != null ? `${pct}%` : "-"}</td>
                  <td className="px-4 py-2">
                    <span
                      className={
                        r.fee_pending > 0
                          ? "rounded-full bg-surface px-2.5 py-0.5 text-xs font-medium text-accent"
                          : "rounded-full bg-primary-tint px-2.5 py-0.5 text-xs font-medium text-primary-strong"
                      }
                    >
                      {r.fee_pending > 0 ? `Pending` : "Clear"}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-ink-muted">
                    {r.last_test_marks != null ? `${r.last_test_marks}/${r.last_test_total ?? "-"}` : "-"}
                  </td>
                  <td className="px-4 py-2">
                    <span className={r.active ? "text-ink" : "text-ink-muted"}>
                      {r.active ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    <div className="flex flex-wrap items-center gap-2.5 text-sm">
                      <Link href={`/admin/students/${r.id}`} className="font-medium text-primary-strong hover:underline">
                        Open
                      </Link>
                      <Link href={`/admin/students/${r.id}/edit`} className="text-ink-muted hover:text-ink">
                        Edit
                      </Link>
                      {r.parent_whatsapp && (
                        <a
                          href={`https://wa.me/91${r.parent_whatsapp}?text=${encodeURIComponent(`Hello, this is Inspire Academy of Mathematics regarding ${r.name}.`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-ink-muted hover:text-primary-strong"
                        >
                          WhatsApp
                        </a>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {pending && <p className="mt-2 text-xs text-ink-muted">Working...</p>}
    </div>
  );
}
