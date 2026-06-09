import Link from "next/link";
import { notFound } from "next/navigation";
import { Pencil, MessageCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";
export const metadata = { title: "Student profile", robots: { index: false, follow: false } };

type MarkRow = {
  marks_obtained: number | null;
  remark: string | null;
  tests: { name: string; date: string | null; total_marks: number | null } | null;
};
type FeeRow = { month: string | null; amount: number | null; paid: boolean; due_date: string | null };

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-4">
      <p className="text-xs uppercase tracking-wide text-ink-muted">{label}</p>
      <p className="mt-1 font-heading text-xl font-bold text-ink">{value}</p>
    </div>
  );
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: student } = await supabase
    .from("students")
    .select("*, batches(name)")
    .eq("id", id)
    .single();
  if (!student) notFound();

  const [att, marksRes, feesRes] = await Promise.all([
    supabase.from("attendance").select("status").eq("student_id", id),
    supabase
      .from("marks")
      .select("marks_obtained, remark, tests(name, date, total_marks)")
      .eq("student_id", id)
      .order("created_at", { ascending: false }),
    supabase
      .from("fees")
      .select("month, amount, paid, due_date")
      .eq("student_id", id)
      .order("created_at", { ascending: false }),
  ]);

  const attRows = att.data ?? [];
  const totalDays = attRows.length;
  const attended = attRows.filter((a) => a.status === "present" || a.status === "late").length;
  const attPct = totalDays ? Math.round((attended / totalDays) * 100) : null;

  const marks = (marksRes.data ?? []) as unknown as MarkRow[];
  const fees = (feesRes.data ?? []) as unknown as FeeRow[];
  const pendingTotal = fees.filter((f) => !f.paid).reduce((sum, f) => sum + (f.amount ?? 0), 0);

  const waParent = student.parent_whatsapp
    ? `https://wa.me/91${student.parent_whatsapp}?text=${encodeURIComponent(
        `Hello, this is Inspire Academy of Mathematics regarding ${student.name}.`,
      )}`
    : null;

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold text-ink">{student.name}</h1>
          <p className="mt-1 text-sm text-ink-muted">
            {[student.class, student.batches?.name, student.school].filter(Boolean).join("  ·  ") || "No details"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {waParent && (
            <a
              href={waParent}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-primary-strong px-4 py-2 text-sm font-semibold text-white hover:bg-primary-deep"
            >
              <MessageCircle size={15} strokeWidth={2} /> WhatsApp parent
            </a>
          )}
          <Link
            href={`/admin/students/${id}/edit`}
            className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm font-medium text-ink-muted hover:text-ink"
          >
            <Pencil size={14} strokeWidth={1.75} /> Edit
          </Link>
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-4">
        <Stat label="Attendance" value={attPct != null ? `${attPct}%` : "-"} />
        <Stat label="Classes marked" value={String(totalDays)} />
        <Stat label="Tests recorded" value={String(marks.length)} />
        <Stat label="Pending fees" value={pendingTotal > 0 ? `Rs ${pendingTotal}` : "Rs 0"} />
      </div>

      {(student.parent_name || student.parent_whatsapp) && (
        <p className="mt-4 text-sm text-ink-muted">
          Parent: {student.parent_name ?? "-"}
          {student.parent_whatsapp ? `  ·  ${student.parent_whatsapp}` : ""}
        </p>
      )}

      <section className="mt-10">
        <h2 className="font-heading text-lg font-bold text-ink">Marks history</h2>
        {marks.length === 0 ? (
          <p className="mt-3 text-sm text-ink-muted">No marks recorded yet.</p>
        ) : (
          <div className="mt-3 overflow-x-auto rounded-2xl border border-border">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead className="border-b border-border bg-surface text-xs uppercase tracking-wide text-ink-muted">
                <tr>
                  <th className="px-4 py-3 font-semibold">Test</th>
                  <th className="px-4 py-3 font-semibold">Date</th>
                  <th className="px-4 py-3 font-semibold">Marks</th>
                  <th className="px-4 py-3 font-semibold">Focus area</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {marks.map((m, i) => (
                  <tr key={i}>
                    <td className="px-4 py-3 font-medium text-ink">{m.tests?.name ?? "-"}</td>
                    <td className="px-4 py-3 text-ink-muted">{m.tests?.date ?? "-"}</td>
                    <td className="px-4 py-3 text-ink-muted">
                      {m.marks_obtained != null
                        ? `${m.marks_obtained}${m.tests?.total_marks != null ? `/${m.tests.total_marks}` : ""}`
                        : "-"}
                    </td>
                    <td className="px-4 py-3 text-ink-muted">{m.remark ?? "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="mt-10">
        <h2 className="font-heading text-lg font-bold text-ink">Fees</h2>
        {fees.length === 0 ? (
          <p className="mt-3 text-sm text-ink-muted">No fee records yet.</p>
        ) : (
          <div className="mt-3 overflow-x-auto rounded-2xl border border-border">
            <table className="w-full min-w-[480px] text-left text-sm">
              <thead className="border-b border-border bg-surface text-xs uppercase tracking-wide text-ink-muted">
                <tr>
                  <th className="px-4 py-3 font-semibold">Month</th>
                  <th className="px-4 py-3 font-semibold">Amount</th>
                  <th className="px-4 py-3 font-semibold">Due</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {fees.map((f, i) => (
                  <tr key={i}>
                    <td className="px-4 py-3 text-ink-muted">{f.month ?? "-"}</td>
                    <td className="px-4 py-3 text-ink-muted">{f.amount != null ? `Rs ${f.amount}` : "-"}</td>
                    <td className="px-4 py-3 text-ink-muted">{f.due_date ?? "-"}</td>
                    <td className="px-4 py-3">
                      <span
                        className={
                          f.paid
                            ? "rounded-full bg-primary-tint px-2.5 py-0.5 text-xs font-medium text-primary-strong"
                            : "rounded-full bg-surface px-2.5 py-0.5 text-xs font-medium text-accent"
                        }
                      >
                        {f.paid ? "Paid" : "Pending"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}
