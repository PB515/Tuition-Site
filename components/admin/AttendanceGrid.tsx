"use client";

import { useState, useTransition } from "react";
import { Check, Copy } from "lucide-react";
import { saveAttendance, markNotified } from "@/app/admin/attendance/actions";
import { cn } from "@/lib/utils";

type Student = {
  id: string;
  name: string;
  roll_number: string | null;
  parent_whatsapp: string | null;
};
type Saved = Record<string, { status: string; note: string | null }>;

const STATUSES = [
  { v: "present", l: "Present", on: "bg-success text-white" },
  { v: "absent", l: "Absent", on: "bg-error text-white" },
  { v: "late", l: "Late", on: "bg-accent text-white" },
  { v: "leave", l: "Leave", on: "bg-ink-muted text-white" },
];

function Card({ label, value, alert }: { label: string; value: number; alert?: boolean }) {
  return (
    <div
      className={cn(
        "rounded-xl border bg-surface p-3 text-center",
        alert ? "border-accent" : "border-border",
      )}
    >
      <p className={cn("font-heading text-2xl font-bold", alert ? "text-accent" : "text-ink")}>{value}</p>
      <p className="mt-0.5 text-xs text-ink-muted">{label}</p>
    </div>
  );
}

export default function AttendanceGrid({
  batchId,
  date,
  students,
  saved,
}: {
  batchId: string;
  date: string;
  students: Student[];
  saved: Saved;
}) {
  const [statuses, setStatuses] = useState<Record<string, string>>(() => {
    const init: Record<string, string> = {};
    Object.entries(saved).forEach(([id, v]) => (init[id] = v.status));
    return init;
  });
  const [notes, setNotes] = useState<Record<string, string>>(() => {
    const init: Record<string, string> = {};
    Object.entries(saved).forEach(([id, v]) => {
      if (v.note) init[id] = v.note;
    });
    return init;
  });
  const [pending, start] = useTransition();
  const [savedOk, setSavedOk] = useState(Object.keys(saved).length > 0);
  const [notified, setNotified] = useState(false);
  const [copied, setCopied] = useState(false);

  const counts = { present: 0, absent: 0, late: 0, leave: 0 };
  students.forEach((s) => {
    const st = statuses[s.id];
    if (st && st in counts) counts[st as keyof typeof counts]++;
  });
  const marked = counts.present + counts.absent + counts.late + counts.leave;
  const unmarked = students.length - marked;

  function setAll(status: string) {
    const next: Record<string, string> = {};
    students.forEach((s) => (next[s.id] = status));
    setStatuses(next);
    setSavedOk(false);
  }
  function resetAll() {
    setStatuses({});
    setSavedOk(false);
  }
  function setOne(id: string, status: string) {
    setStatuses((p) => ({ ...p, [id]: status }));
    setSavedOk(false);
  }

  function onSave() {
    if (unmarked > 0) return;
    const rows = students.map((s) => ({ student_id: s.id, status: statuses[s.id], note: notes[s.id] }));
    start(async () => {
      const r = await saveAttendance(batchId, date, rows);
      if (r.ok) {
        setSavedOk(true);
        setNotified(false);
      }
    });
  }

  const absentLate = students.filter(
    (s) => statuses[s.id] === "absent" || statuses[s.id] === "late",
  );

  function copyAbsent() {
    const text = absentLate
      .map(
        (s) =>
          `${s.roll_number ? s.roll_number + " " : ""}${s.name}${s.parent_whatsapp ? " - " + s.parent_whatsapp : ""} (${statuses[s.id]})`,
      )
      .join("\n");
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  function waLink(s: Student) {
    const d = new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
    const msg =
      statuses[s.id] === "absent"
        ? `Hello, ${s.name} was absent from today's Maths class at Inspire Academy of Mathematics (${d}). Please contact us if this was planned.`
        : `Hello, ${s.name} arrived late to today's Maths class at Inspire Academy of Mathematics (${d}).`;
    return `https://wa.me/91${s.parent_whatsapp}?text=${encodeURIComponent(msg)}`;
  }

  return (
    <div className="mt-6">
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
        <Card label="Total" value={students.length} />
        <Card label="Present" value={counts.present} />
        <Card label="Absent" value={counts.absent} />
        <Card label="Late" value={counts.late} />
        <Card label="Leave" value={counts.leave} />
        <Card label="Unmarked" value={unmarked} alert={unmarked > 0} />
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setAll("present")}
          className="rounded-full border border-border px-4 py-2 text-sm font-medium text-ink-muted hover:border-primary hover:text-primary-strong"
        >
          Mark all present
        </button>
        <button
          type="button"
          onClick={() => setAll("absent")}
          className="rounded-full border border-border px-4 py-2 text-sm font-medium text-ink-muted hover:border-primary hover:text-primary-strong"
        >
          Mark all absent
        </button>
        <button
          type="button"
          onClick={resetAll}
          className="rounded-full border border-border px-4 py-2 text-sm font-medium text-ink-muted hover:text-ink"
        >
          Reset
        </button>
      </div>

      <div className="mt-4 overflow-x-auto rounded-2xl border border-border">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="border-b border-border bg-surface text-xs uppercase tracking-wide text-ink-muted">
            <tr>
              <th className="px-4 py-3 font-semibold">Roll</th>
              <th className="px-4 py-3 font-semibold">Student</th>
              <th className="px-4 py-3 font-semibold">Parent WhatsApp</th>
              <th className="px-4 py-3 font-semibold">Status</th>
              <th className="px-4 py-3 font-semibold">Note</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {students.map((s) => (
              <tr key={s.id}>
                <td className="px-4 py-2 text-ink-muted">{s.roll_number ?? "-"}</td>
                <td className="px-4 py-2 font-medium text-ink">{s.name}</td>
                <td className="whitespace-nowrap px-4 py-2 text-ink-muted">
                  {s.parent_whatsapp ?? "-"}
                </td>
                <td className="px-4 py-2">
                  <div className="inline-flex overflow-hidden rounded-lg border border-border">
                    {STATUSES.map((opt) => (
                      <button
                        key={opt.v}
                        type="button"
                        onClick={() => setOne(s.id, opt.v)}
                        className={cn(
                          "px-2.5 py-1.5 text-xs font-semibold transition-colors",
                          statuses[s.id] === opt.v
                            ? opt.on
                            : "bg-bg text-ink-muted hover:bg-surface",
                        )}
                      >
                        {opt.l}
                      </button>
                    ))}
                  </div>
                </td>
                <td className="px-4 py-2">
                  <input
                    value={notes[s.id] ?? ""}
                    onChange={(e) => setNotes((p) => ({ ...p, [s.id]: e.target.value }))}
                    placeholder="optional"
                    className="w-32 rounded-lg border border-border bg-bg px-2 py-1 text-sm text-ink focus:border-primary focus:outline-none"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-4">
        <button
          type="button"
          onClick={onSave}
          disabled={pending || unmarked > 0}
          className="rounded-full bg-primary-strong px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-deep disabled:cursor-not-allowed disabled:opacity-50"
        >
          {pending ? "Saving..." : "Save attendance"}
        </button>
        {unmarked > 0 ? (
          <span className="text-sm font-medium text-accent">{unmarked} still unmarked</span>
        ) : savedOk ? (
          <span className="inline-flex items-center gap-1 text-sm font-medium text-primary-strong">
            <Check size={15} strokeWidth={2.5} /> Saved
          </span>
        ) : null}
      </div>

      {savedOk && (
        <div className="mt-8 rounded-2xl border border-border bg-surface p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="font-heading text-lg font-bold text-ink">
              Notify absent / late ({absentLate.length})
            </h3>
            {absentLate.length > 0 && (
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={copyAbsent}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-1.5 text-sm font-medium text-ink-muted hover:text-ink"
                >
                  <Copy size={14} strokeWidth={2} /> {copied ? "Copied" : "Copy list"}
                </button>
                <button
                  type="button"
                  disabled={pending || notified}
                  onClick={() => start(async () => {
                    await markNotified(batchId, date);
                    setNotified(true);
                  })}
                  className="rounded-full bg-primary-strong px-4 py-1.5 text-sm font-semibold text-white hover:bg-primary-deep disabled:opacity-60"
                >
                  {notified ? "Marked notified" : "Mark as notified"}
                </button>
              </div>
            )}
          </div>
          {absentLate.length === 0 ? (
            <p className="mt-2 text-sm text-ink-muted">Everyone was present, late or on leave only.</p>
          ) : (
            <ul className="mt-3 divide-y divide-border">
              {absentLate.map((s) => (
                <li key={s.id} className="flex items-center justify-between gap-3 py-2">
                  <span className="text-sm text-ink">
                    {s.name} <span className="text-ink-muted">({statuses[s.id]})</span>
                  </span>
                  {s.parent_whatsapp ? (
                    <a
                      href={waLink(s)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-primary-strong hover:underline"
                    >
                      WhatsApp
                    </a>
                  ) : (
                    <span className="text-xs text-ink-muted">no number</span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
