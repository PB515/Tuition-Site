import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";
export const metadata = { title: "Progress", robots: { index: false, follow: false } };

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
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Explicit cross-user denial: this child must be linked to THIS parent
  // (belt-and-suspenders on top of RLS).
  const { data: link } = await supabase
    .from("parents")
    .select("student_id")
    .eq("user_id", user?.id ?? "")
    .eq("student_id", id)
    .maybeSingle();
  if (!link) notFound();

  const { data: student } = await supabase
    .from("students")
    .select("name, class, batches(name)")
    .eq("id", id)
    .single();
  if (!student) notFound();
  const info = student as unknown as {
    name: string;
    class: string | null;
    batches: { name: string } | null;
  };

  const [att, marksRes, feesRes] = await Promise.all([
    supabase.from("attendance").select("status").eq("student_id", id),
    supabase
      .from("marks")
      .select("marks_obtained, remark, tests(name, date, total_marks)")
      .eq("student_id", id)
      .order("created_at", { ascending: false })
      .limit(5),
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

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <Link
        href="/parent"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-muted hover:text-primary-strong"
      >
        <ArrowLeft size={15} strokeWidth={2} /> Your children
      </Link>
      <h1 className="mt-4 font-heading text-2xl font-bold text-ink">{info.name}</h1>
      <p className="mt-1 text-sm text-ink-muted">
        {[info.class, info.batches?.name].filter(Boolean).join("  ·  ") || "-"}
      </p>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <Stat label="Attendance" value={attPct != null ? `${attPct}%` : "-"} />
        <Stat label="Classes marked" value={String(totalDays)} />
        <Stat label="Pending fees" value={pendingTotal > 0 ? `Rs ${pendingTotal}` : "Rs 0"} />
      </div>

      <section className="mt-10">
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-lg font-bold text-ink">Recent marks</h2>
          {marks.length === 5 && (
            <Link
              href={`/parent/child/${id}/marks`}
              className="text-sm font-medium text-primary-strong hover:underline"
            >
              View all
            </Link>
          )}
        </div>
        {marks.length === 0 ? (
          <p className="mt-3 text-sm text-ink-muted">No marks recorded yet.</p>
        ) : (
          <div className="mt-3 overflow-x-auto rounded-2xl border border-border">
            <table className="w-full min-w-[480px] text-left text-sm">
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
            <table className="w-full min-w-[420px] text-left text-sm">
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
