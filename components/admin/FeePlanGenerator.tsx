"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { generateFeePlan } from "@/app/admin/fees/actions";
import { cn } from "@/lib/utils";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const PLANS = [
  { label: "Full year", count: 1, interval: 12 },
  { label: "6-month", count: 2, interval: 6 },
  { label: "3-month", count: 4, interval: 3 },
  { label: "2-month", count: 6, interval: 2 },
  { label: "Monthly", count: 12, interval: 1 },
];
const field =
  "w-full rounded-lg border border-border bg-bg px-2.5 py-1.5 text-sm text-ink focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30";

export default function FeePlanGenerator({
  studentId,
  defaultTotal,
}: {
  studentId: string;
  defaultTotal: number | null;
}) {
  const router = useRouter();
  const [total, setTotal] = useState(defaultTotal ? String(defaultTotal) : "");
  const [count, setCount] = useState(2);
  const [interval, setIntervalM] = useState(6);
  const [start, setStart] = useState("");
  const [planLabel, setPlanLabel] = useState("6-month");
  const [pending, startT] = useTransition();
  const [result, setResult] = useState<string | null>(null);

  const totalN = Number(total) || 0;

  const installments = (() => {
    if (!totalN || count < 1 || !start) return [] as { label: string; amount: number; due: string }[];
    const [y, m, d] = start.split("-").map(Number);
    if (!y || !m || !d) return [];
    const base = Math.floor(totalN / count);
    const out: { label: string; amount: number; due: string }[] = [];
    for (let i = 0; i < count; i++) {
      const dt = new Date(y, m - 1 + i * interval, d);
      out.push({
        label: `${MONTHS[dt.getMonth()]} ${dt.getFullYear()}`,
        amount: i < count - 1 ? base : totalN - base * (count - 1),
        due: `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, "0")}-${String(dt.getDate()).padStart(2, "0")}`,
      });
    }
    return out;
  })();

  function applyPlan(p: (typeof PLANS)[number]) {
    setCount(p.count);
    setIntervalM(p.interval);
    setPlanLabel(p.label);
    setResult(null);
  }

  function onGenerate() {
    if (!installments.length) return;
    startT(async () => {
      const r = await generateFeePlan(studentId, totalN, count, start, interval);
      setResult(`Created ${r.created} installment(s).`);
      router.refresh();
    });
  }

  return (
    <div className="mt-3 rounded-2xl border border-border bg-surface p-3">
      <p className="text-sm font-semibold text-ink">Generate a fee plan</p>

      <div className="mt-2 flex flex-wrap gap-1.5">
        {PLANS.map((p) => (
          <button
            key={p.label}
            type="button"
            onClick={() => applyPlan(p)}
            className={cn(
              "rounded-full px-3 py-1 text-xs font-medium transition-colors",
              planLabel === p.label
                ? "bg-primary-strong text-white"
                : "border border-border text-ink-muted hover:text-ink",
            )}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="mt-3 grid gap-2 sm:grid-cols-4">
        <label className="block text-sm">
          <span className="font-medium text-ink">Total (Rs)</span>
          <input type="number" min="0" value={total} onChange={(e) => setTotal(e.target.value)} className={`mt-1 ${field}`} />
        </label>
        <label className="block text-sm">
          <span className="font-medium text-ink">First due date</span>
          <input type="date" value={start} onChange={(e) => setStart(e.target.value)} className={`mt-1 ${field}`} />
        </label>
        <label className="block text-sm">
          <span className="font-medium text-ink">Installments</span>
          <input type="number" min="1" max="12" value={count} onChange={(e) => setCount(Math.max(1, Number(e.target.value) || 1))} className={`mt-1 ${field}`} />
        </label>
        <label className="block text-sm">
          <span className="font-medium text-ink">Every (months)</span>
          <input type="number" min="1" max="12" value={interval} onChange={(e) => setIntervalM(Math.max(1, Number(e.target.value) || 1))} className={`mt-1 ${field}`} />
        </label>
      </div>

      {installments.length > 0 && (
        <div className="mt-3">
          <ul className="divide-y divide-border rounded-lg border border-border bg-bg text-sm">
            {installments.map((it, i) => (
              <li key={i} className="flex items-center justify-between px-3 py-1.5">
                <span className="text-ink-muted">
                  {it.label} <span className="text-xs">(due {it.due})</span>
                </span>
                <span className="font-medium text-ink">Rs {it.amount}</span>
              </li>
            ))}
          </ul>
          <div className="mt-2 flex items-center gap-3">
            <button
              type="button"
              onClick={onGenerate}
              disabled={pending}
              className="rounded-full bg-primary-strong px-5 py-2 text-sm font-semibold text-white hover:bg-primary-deep disabled:opacity-60"
            >
              {pending ? "Creating..." : "Generate plan"}
            </button>
            {result && <span className="text-sm font-medium text-primary-strong">{result}</span>}
          </div>
          <p className="mt-1 text-xs text-ink-muted">
            Tip: for vacation months, reduce the number of installments. Re-running skips months already created.
          </p>
        </div>
      )}
    </div>
  );
}
