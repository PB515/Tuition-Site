"use client";

import { useState, useTransition } from "react";
import { Check } from "lucide-react";
import { saveMarks } from "@/app/admin/tests/actions";
import { cn } from "@/lib/utils";

type Student = { id: string; name: string; parent_whatsapp: string | null };
type Saved = Record<string, { marks: number | null; status: string | null; remark: string | null }>;

const STATUSES = [
  { v: "appeared", l: "Appeared", on: "bg-success text-white" },
  { v: "absent", l: "Absent", on: "bg-error text-white" },
  { v: "not_submitted", l: "Not submitted", on: "bg-accent text-white" },
];

function Card({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-surface p-3 text-center">
      <p className="font-heading text-xl font-bold text-ink">{value}</p>
      <p className="mt-0.5 text-xs text-ink-muted">{label}</p>
    </div>
  );
}

export default function MarksGrid({
  testId,
  testName,
  totalMarks,
  students,
  saved,
}: {
  testId: string;
  testName: string;
  totalMarks: number | null;
  students: Student[];
  saved: Saved;
}) {
  const [marks, setMarks] = useState<Record<string, string>>(() => {
    const init: Record<string, string> = {};
    Object.entries(saved).forEach(([id, v]) => {
      if (v.marks != null) init[id] = String(v.marks);
    });
    return init;
  });
  const [status, setStatus] = useState<Record<string, string>>(() => {
    const init: Record<string, string> = {};
    students.forEach((s) => (init[s.id] = saved[s.id]?.status || "appeared"));
    return init;
  });
  const [remarks, setRemarks] = useState<Record<string, string>>(() => {
    const init: Record<string, string> = {};
    Object.entries(saved).forEach(([id, v]) => {
      if (v.remark) init[id] = v.remark;
    });
    return init;
  });
  const [pending, start] = useTransition();
  const [savedOk, setSavedOk] = useState(Object.keys(saved).length > 0);

  function setStat(id: string, v: string) {
    setStatus((p) => ({ ...p, [id]: v }));
    if (v !== "appeared") setMarks((p) => ({ ...p, [id]: "" }));
    setSavedOk(false);
  }

  function onSave() {
    const rows = students.map((s) => {
      const appeared = status[s.id] === "appeared";
      const m = appeared && marks[s.id]?.trim() !== "" && marks[s.id] != null ? Number(marks[s.id]) : null;
      return { student_id: s.id, marks: m, status: status[s.id] || "appeared", remark: remarks[s.id] ?? null };
    });
    start(async () => {
      const r = await saveMarks(testId, rows);
      if (r.ok) setSavedOk(true);
    });
  }

  // Summary from appeared students with a mark.
  const scored = students
    .filter((s) => status[s.id] === "appeared" && marks[s.id]?.trim() !== "" && marks[s.id] != null)
    .map((s) => Number(marks[s.id]));
  const highest = scored.length ? Math.max(...scored) : null;
  const lowest = scored.length ? Math.min(...scored) : null;
  const average = scored.length ? Math.round(scored.reduce((a, b) => a + b, 0) / scored.length) : null;
  const above80 = totalMarks ? scored.filter((m) => (m / totalMarks) * 100 >= 80).length : 0;
  const below40 = totalMarks ? scored.filter((m) => (m / totalMarks) * 100 < 40).length : 0;
  const absentCount = students.filter((s) => status[s.id] === "absent").length;

  function waLink(s: Student) {
    const m = marks[s.id];
    let msg = `Hello, ${s.name} scored ${m}${totalMarks != null ? `/${totalMarks}` : ""} in ${testName} at Inspire Academy of Mathematics.`;
    if (remarks[s.id]) msg += ` Focus area: ${remarks[s.id]}.`;
    return `https://wa.me/91${s.parent_whatsapp}?text=${encodeURIComponent(msg)}`;
  }

  return (
    <div className="mt-8">
      <div className="overflow-x-auto rounded-2xl border border-border">
        <table className="w-full min-w-[820px] text-left text-sm">
          <thead className="border-b border-border bg-surface text-xs uppercase tracking-wide text-ink-muted">
            <tr>
              <th className="px-4 py-3 font-semibold">Student</th>
              <th className="px-4 py-3 font-semibold">Marks{totalMarks != null ? ` / ${totalMarks}` : ""}</th>
              <th className="px-4 py-3 font-semibold">Status</th>
              <th className="px-4 py-3 font-semibold">Focus area</th>
              <th className="px-4 py-3 font-semibold">Remark</th>
              <th className="px-4 py-3 font-semibold">Notify</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {students.map((s) => {
              const appeared = status[s.id] === "appeared";
              return (
                <tr key={s.id}>
                  <td className="px-4 py-2 font-medium text-ink">{s.name}</td>
                  <td className="px-4 py-2">
                    <input
                      type="number"
                      min="0"
                      max={totalMarks ?? undefined}
                      value={marks[s.id] ?? ""}
                      disabled={!appeared}
                      onChange={(e) => {
                        setMarks((p) => ({ ...p, [s.id]: e.target.value }));
                        setSavedOk(false);
                      }}
                      className="w-24 rounded-lg border border-border bg-bg px-2 py-1 text-sm text-ink focus:border-primary focus:outline-none disabled:bg-surface disabled:text-ink-muted"
                    />
                  </td>
                  <td className="px-4 py-2">
                    <div className="inline-flex overflow-hidden rounded-lg border border-border">
                      {STATUSES.map((opt) => (
                        <button
                          key={opt.v}
                          type="button"
                          onClick={() => setStat(s.id, opt.v)}
                          className={cn(
                            "px-2.5 py-1.5 text-xs font-semibold transition-colors",
                            status[s.id] === opt.v ? opt.on : "bg-bg text-ink-muted hover:bg-surface",
                          )}
                        >
                          {opt.l}
                        </button>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-2">
                    <input
                      value={remarks[s.id] ?? ""}
                      onChange={(e) => setRemarks((p) => ({ ...p, [s.id]: e.target.value }))}
                      placeholder="e.g. trigonometry"
                      className="w-36 rounded-lg border border-border bg-bg px-2 py-1 text-sm text-ink focus:border-primary focus:outline-none"
                    />
                  </td>
                  <td className="px-4 py-2 text-xs text-ink-muted">
                    {status[s.id] === "absent" ? "Absent" : status[s.id] === "not_submitted" ? "Not submitted" : ""}
                  </td>
                  <td className="px-4 py-2">
                    {savedOk && appeared && marks[s.id]?.trim() !== "" && s.parent_whatsapp ? (
                      <a
                        href={waLink(s)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-primary-strong hover:underline"
                      >
                        WhatsApp
                      </a>
                    ) : (
                      <span className="text-xs text-ink-muted">
                        {!s.parent_whatsapp ? "no number" : !savedOk ? "save first" : "-"}
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-4">
        <button
          type="button"
          onClick={onSave}
          disabled={pending}
          className="rounded-full bg-primary-strong px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary-deep disabled:opacity-60"
        >
          {pending ? "Saving..." : "Save marks"}
        </button>
        {savedOk && (
          <span className="inline-flex items-center gap-1 text-sm font-medium text-primary-strong">
            <Check size={15} strokeWidth={2.5} /> Saved
          </span>
        )}
      </div>

      {savedOk && scored.length > 0 && (
        <div className="mt-8">
          <h3 className="font-heading text-lg font-bold text-ink">Test summary</h3>
          <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            <Card label="Highest" value={String(highest)} />
            <Card label="Average" value={String(average)} />
            <Card label="Lowest" value={String(lowest)} />
            <Card label="Above 80%" value={String(above80)} />
            <Card label="Below 40%" value={String(below40)} />
            <Card label="Absent" value={String(absentCount)} />
          </div>
        </div>
      )}
    </div>
  );
}
