"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import {
  bulkMarkPaid,
  bulkMarkReminded,
  bulkDeleteFees,
} from "@/app/admin/fees/actions";

type FeeRow = {
  id: string;
  month: string | null;
  amount: number | null;
  paid: boolean;
  due_date: string | null;
  reminded_at: string | null;
  students: {
    id: string;
    name: string;
    parent_whatsapp: string | null;
    batches: { name: string } | null;
  } | null;
};

function waReminder(name: string, amount: number | null, month: string | null, due: string | null, phone: string) {
  let msg = `Hello, this is Inspire Academy of Mathematics. The fee${amount != null ? ` of Rs ${amount}` : ""} for ${name}${month ? ` (${month})` : ""} is pending.`;
  if (due) msg += ` Kindly pay by ${due}.`;
  msg += " Thank you.";
  return `https://wa.me/91${phone}?text=${encodeURIComponent(msg)}`;
}

export default function FeesTable({ fees, exportHref }: { fees: FeeRow[]; exportHref: string }) {
  const router = useRouter();
  const [sel, setSel] = useState<Set<string>>(new Set());
  const [pending, start] = useTransition();

  const allSelected = fees.length > 0 && sel.size === fees.length;
  function toggleAll() {
    setSel(allSelected ? new Set() : new Set(fees.map((f) => f.id)));
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

  const ids = Array.from(sel);

  return (
    <div>
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        {sel.size > 0 ? (
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <span className="font-medium text-ink">{sel.size} selected</span>
            <button onClick={() => run(() => bulkMarkPaid(ids, true))} className="rounded-full border border-border px-3 py-1.5 font-medium text-ink-muted hover:text-ink">Mark paid</button>
            <button onClick={() => run(() => bulkMarkPaid(ids, false))} className="rounded-full border border-border px-3 py-1.5 font-medium text-ink-muted hover:text-ink">Mark pending</button>
            <button onClick={() => run(() => bulkMarkReminded(ids))} className="rounded-full border border-border px-3 py-1.5 font-medium text-ink-muted hover:text-ink">Mark reminded</button>
            <button onClick={() => run(() => bulkDeleteFees(ids))} className="rounded-full border border-error/40 px-3 py-1.5 font-medium text-error hover:bg-error/5">Delete</button>
          </div>
        ) : (
          <span className="text-sm text-ink-muted">{fees.length} record(s) on this page</span>
        )}
        <a href={exportHref} className="rounded-full border border-border px-4 py-1.5 text-sm font-medium text-ink-muted hover:text-ink">
          Export pending CSV
        </a>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-border">
        <table className="w-full min-w-[860px] text-left text-sm">
          <thead className="border-b border-border bg-surface text-xs uppercase tracking-wide text-ink-muted">
            <tr>
              <th className="px-3 py-3">
                <input type="checkbox" checked={allSelected} onChange={toggleAll} />
              </th>
              <th className="px-4 py-3 font-semibold">Student</th>
              <th className="px-4 py-3 font-semibold">Batch</th>
              <th className="px-4 py-3 font-semibold">Month</th>
              <th className="px-4 py-3 font-semibold">Amount</th>
              <th className="px-4 py-3 font-semibold">Due</th>
              <th className="px-4 py-3 font-semibold">Status</th>
              <th className="px-4 py-3 font-semibold">Reminder</th>
              <th className="px-4 py-3 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {fees.map((f) => {
              const overdue = !f.paid && f.due_date && f.due_date < new Date().toISOString().slice(0, 10);
              return (
                <tr key={f.id}>
                  <td className="px-3 py-2">
                    <input type="checkbox" checked={sel.has(f.id)} onChange={() => toggle(f.id)} />
                  </td>
                  <td className="px-4 py-2 font-medium text-ink">{f.students?.name ?? "-"}</td>
                  <td className="px-4 py-2 text-ink-muted">{f.students?.batches?.name ?? "-"}</td>
                  <td className="px-4 py-2 text-ink-muted">{f.month ?? "-"}</td>
                  <td className="px-4 py-2 text-ink-muted">{f.amount != null ? `Rs ${f.amount}` : "-"}</td>
                  <td className="px-4 py-2 text-ink-muted">{f.due_date ?? "-"}</td>
                  <td className="px-4 py-2">
                    <span
                      className={
                        f.paid
                          ? "rounded-full bg-primary-tint px-2.5 py-0.5 text-xs font-medium text-primary-strong"
                          : overdue
                            ? "rounded-full bg-error/10 px-2.5 py-0.5 text-xs font-medium text-error"
                            : "rounded-full bg-surface px-2.5 py-0.5 text-xs font-medium text-accent"
                      }
                    >
                      {f.paid ? "Paid" : overdue ? "Overdue" : "Pending"}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-xs text-ink-muted">{f.reminded_at ? "Reminded" : "-"}</td>
                  <td className="px-4 py-2">
                    <div className="flex flex-wrap items-center gap-2.5 text-sm">
                      <button
                        onClick={() => run(() => bulkMarkPaid([f.id], !f.paid))}
                        className="font-medium text-primary-strong hover:underline"
                      >
                        {f.paid ? "Mark pending" : "Mark paid"}
                      </button>
                      {!f.paid && f.students?.parent_whatsapp && (
                        <a
                          href={waReminder(f.students.name, f.amount, f.month, f.due_date, f.students.parent_whatsapp)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium text-primary-strong hover:underline"
                        >
                          WhatsApp
                        </a>
                      )}
                      {f.students?.id && (
                        <Link href={`/admin/students/${f.students.id}`} className="text-ink-muted hover:text-ink">
                          View
                        </Link>
                      )}
                      <button
                        onClick={() => run(() => bulkDeleteFees([f.id]))}
                        title="Delete"
                        className="text-ink-muted hover:text-error"
                      >
                        <Trash2 size={15} strokeWidth={1.75} />
                      </button>
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
