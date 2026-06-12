"use client";

import { useState, useTransition } from "react";
import { getBatchStudents, bulkPromote, bulkSetActive } from "@/app/admin/students/actions";

type Student = { id: string; name: string; admission_no: string | null; class: string | null; active: boolean };
type Batch = { id: string; name: string; academic_year: string | null };

const selectCls =
  "rounded-lg border border-border bg-bg px-3 py-2 text-sm text-ink focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30";

function batchLabel(b: Batch) {
  return b.academic_year ? `${b.name} (${b.academic_year})` : b.name;
}

export default function PromoteTool({ batches, classes }: { batches: Batch[]; classes: string[] }) {
  const [source, setSource] = useState("");
  const [students, setStudents] = useState<Student[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [sel, setSel] = useState<Set<string>>(new Set());
  const [destClass, setDestClass] = useState("");
  const [destBatch, setDestBatch] = useState("");
  const [msg, setMsg] = useState("");
  const [pending, start] = useTransition();

  const ids = Array.from(sel);
  const allSel = students.length > 0 && sel.size === students.length;

  function loadBatch(batchId: string) {
    setSource(batchId);
    setSel(new Set());
    setMsg("");
    if (!batchId) {
      setStudents([]);
      setLoaded(false);
      return;
    }
    start(async () => {
      const data = (await getBatchStudents(batchId)) as Student[];
      setStudents(data);
      setLoaded(true);
    });
  }

  function refresh(message: string) {
    start(async () => {
      const data = (await getBatchStudents(source)) as Student[];
      setStudents(data);
      setSel(new Set());
      setMsg(message);
    });
  }

  function toggleAll() {
    setSel(allSel ? new Set() : new Set(students.map((s) => s.id)));
  }
  function toggle(id: string) {
    setSel((p) => {
      const n = new Set(p);
      if (n.has(id)) n.delete(id);
      else n.add(id);
      return n;
    });
  }

  function promote() {
    if (!ids.length || (!destClass && !destBatch)) return;
    const n = ids.length;
    start(async () => {
      await bulkPromote(ids, destClass, destBatch);
      const data = (await getBatchStudents(source)) as Student[];
      setStudents(data);
      setSel(new Set());
      setMsg(`Promoted ${n} student${n > 1 ? "s" : ""}.`);
    });
  }
  function deactivate() {
    if (!ids.length) return;
    const n = ids.length;
    start(async () => {
      await bulkSetActive(ids, false);
      const data = (await getBatchStudents(source)) as Student[];
      setStudents(data);
      setSel(new Set());
      setMsg(`Marked ${n} student${n > 1 ? "s" : ""} as left.`);
    });
  }

  return (
    <div className="rounded-2xl border border-border bg-surface p-4">
      {/* Step 1: which batch */}
      <div className="flex flex-wrap items-end gap-x-3 gap-y-4">
        <label className="block text-sm">
          <span className="font-medium text-ink">1. Pick the old batch</span>
          <select value={source} onChange={(e) => loadBatch(e.target.value)} className={`mt-1 block w-56 ${selectCls}`}>
            <option value="">Select a batch...</option>
            {batches.map((b) => (
              <option key={b.id} value={b.id}>
                {batchLabel(b)}
              </option>
            ))}
          </select>
        </label>

        {/* Step 2: where they go */}
        <div className="text-sm">
          <span className="font-medium text-ink">2. Promote the ticked students to</span>
          <div className="mt-1 flex flex-wrap gap-2">
            <select value={destClass} onChange={(e) => setDestClass(e.target.value)} className={selectCls}>
              <option value="">class...</option>
              {classes.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <select value={destBatch} onChange={(e) => setDestBatch(e.target.value)} className={selectCls}>
              <option value="">batch (optional)...</option>
              {batches.map((b) => (
                <option key={b.id} value={b.id}>
                  {batchLabel(b)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Step 3: the students */}
      {loaded && students.length === 0 && (
        <p className="mt-5 text-sm text-ink-muted">
          This batch has no students left to move. They have all been promoted or marked as left.
        </p>
      )}

      {students.length > 0 && (
        <>
          <div className="mt-5 overflow-x-auto rounded-xl border border-border">
            <table className="w-full min-w-[520px] text-left text-sm">
              <thead className="border-b border-border bg-bg text-xs uppercase tracking-wide text-ink-muted">
                <tr>
                  <th className="px-3 py-2.5">
                    <input type="checkbox" checked={allSel} onChange={toggleAll} aria-label="Select all" />
                  </th>
                  <th className="px-4 py-2.5 font-semibold">Student</th>
                  <th className="px-4 py-2.5 font-semibold">Class</th>
                  <th className="px-4 py-2.5 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {students.map((s) => (
                  <tr key={s.id} className={sel.has(s.id) ? "bg-primary-tint/30" : undefined}>
                    <td className="px-3 py-2">
                      <input type="checkbox" checked={sel.has(s.id)} onChange={() => toggle(s.id)} />
                    </td>
                    <td className="px-4 py-2">
                      <div className="font-medium text-ink">{s.name}</div>
                      {s.admission_no && <div className="text-xs text-ink-muted">{s.admission_no}</div>}
                    </td>
                    <td className="px-4 py-2 text-ink-muted">{s.class ?? "-"}</td>
                    <td className="px-4 py-2">
                      <span className={s.active ? "text-ink" : "text-accent"}>{s.active ? "Active" : "Left"}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Step 4: actions */}
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium text-ink">{sel.size} ticked</span>
            <button
              onClick={promote}
              disabled={!sel.size || (!destClass && !destBatch) || pending}
              className="rounded-full bg-primary-strong px-4 py-1.5 text-sm font-semibold text-white hover:bg-primary-deep disabled:opacity-40"
            >
              Promote selected
            </button>
            <button
              onClick={deactivate}
              disabled={!sel.size || pending}
              className="rounded-full border border-border px-4 py-1.5 text-sm font-medium text-ink-muted hover:text-ink disabled:opacity-40"
            >
              Mark selected as left
            </button>
            {pending && <span className="text-xs text-ink-muted">Working...</span>}
          </div>
        </>
      )}

      {msg && <p className="mt-3 text-sm font-medium text-primary-strong">{msg}</p>}
    </div>
  );
}
