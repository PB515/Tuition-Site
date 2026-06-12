import Link from "next/link";
import { notFound } from "next/navigation";
import { Pencil, MessageCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { createFee } from "@/app/admin/fees/actions";
import InviteParentForm from "@/components/admin/InviteParentForm";
import FeePlanGenerator from "@/components/admin/FeePlanGenerator";
import YearScope from "@/components/YearScope";
import { academicYearOf, feeAcademicYear, currentAcademicYear } from "@/lib/academic-year";

const feeField =
  "w-full rounded-lg border border-border bg-bg px-3 py-2 text-sm text-ink focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30";

export const dynamic = "force-dynamic";
export const metadata = { title: "Student profile", robots: { index: false, follow: false } };

type AttRow = { status: string | null; date: string | null };
type MarkRow = {
  marks_obtained: number | null;
  remark: string | null;
  tests: { name: string; date: string | null; total_marks: number | null } | null;
};
type FeeRow = {
  month: string | null;
  amount: number | null;
  paid: boolean;
  due_date: string | null;
  created_at: string | null;
};

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-4">
      <p className="text-xs uppercase tracking-wide text-ink-muted">{label}</p>
      <p className="mt-1 font-heading text-xl font-bold text-ink">{value}</p>
    </div>
  );
}

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ year?: string }>;
}) {
  const { id } = await params;
  const { year: yearParam } = await searchParams;
  const supabase = await createClient();

  const { data: student } = await supabase
    .from("students")
    .select("*, batches(name)")
    .eq("id", id)
    .single();
  if (!student) notFound();

  const [att, marksRes, feesRes, parentCountRes] = await Promise.all([
    supabase.from("attendance").select("status, date").eq("student_id", id),
    supabase
      .from("marks")
      .select("marks_obtained, remark, tests(name, date, total_marks)")
      .eq("student_id", id)
      .order("created_at", { ascending: false }),
    supabase
      .from("fees")
      .select("month, amount, paid, due_date, created_at")
      .eq("student_id", id)
      .order("created_at", { ascending: false }),
    supabase.from("parents").select("*", { count: "exact", head: true }).eq("student_id", id),
  ]);

  const allAtt = (att.data ?? []) as AttRow[];
  const allMarks = (marksRes.data ?? []) as unknown as MarkRow[];
  const allFees = (feesRes.data ?? []) as unknown as FeeRow[];

  const current = currentAcademicYear();
  const years = Array.from(
    new Set(
      [
        ...allAtt.map((a) => academicYearOf(a.date)),
        ...allMarks.map((m) => academicYearOf(m.tests?.date)),
        ...allFees.map((f) => feeAcademicYear(f)),
      ].filter(Boolean) as string[],
    ),
  ).sort((a, b) => b.localeCompare(a));

  const selected =
    yearParam === "all" ? "all" : yearParam && years.includes(yearParam) ? yearParam : years[0] ?? current;
  const inYear = (ay: string | null) => selected === "all" || ay === selected;

  const attRows = allAtt.filter((a) => inYear(academicYearOf(a.date)));
  const marks = allMarks.filter((m) => inYear(academicYearOf(m.tests?.date)));
  const fees = allFees.filter((f) => inYear(feeAcademicYear(f)));

  const totalDays = attRows.length;
  const attended = attRows.filter((a) => a.status === "present" || a.status === "late").length;
  const attPct = totalDays ? Math.round((attended / totalDays) * 100) : null;

  const pendingTotal = fees.filter((f) => !f.paid).reduce((sum, f) => sum + (f.amount ?? 0), 0);
  const parentCount = parentCountRes.count ?? 0;

  const waParent = student.parent_whatsapp
    ? `https://wa.me/91${student.parent_whatsapp}?text=${encodeURIComponent(
        `Hello, this is Inspire Academy of Mathematics regarding ${student.name}.`,
      )}`
    : null;

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold text-ink">
            {student.name}
            {student.admission_no && (
              <span className="ml-2 align-middle text-sm font-medium text-ink-muted">
                {student.admission_no}
              </span>
            )}
          </h1>
          <p className="mt-1 text-sm text-ink-muted">
            {[student.class, student.batches?.name, student.school, student.roll_number ? `Roll ${student.roll_number}` : null]
              .filter(Boolean)
              .join("  ·  ") || "No details"}
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

      <YearScope years={years} selected={selected} current={current} base={`/admin/students/${id}`} />

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <Stat label="Attendance" value={attPct != null ? `${attPct}%` : "-"} />
        <Stat label="Classes marked" value={String(totalDays)} />
        <Stat label="Pending fees" value={pendingTotal > 0 ? `Rs ${pendingTotal}` : "Rs 0"} />
      </div>

      {(student.parent_name || student.parent_whatsapp) && (
        <p className="mt-4 text-sm text-ink-muted">
          Parent: {student.parent_name ?? "-"}
          {student.parent_whatsapp ? `  ·  ${student.parent_whatsapp}` : ""}
        </p>
      )}

      <section className="mt-10">
        <h2 className="font-heading text-lg font-bold text-ink">Parent access</h2>
        <p className="mt-1 text-sm text-ink-muted">
          {parentCount > 0
            ? `${parentCount} parent login${parentCount > 1 ? "s" : ""} linked to this student.`
            : "No parent login yet. Create a link and send it to the parent on WhatsApp."}
        </p>
        <div className="mt-3">
          <InviteParentForm studentId={id} parentWhatsapp={student.parent_whatsapp ?? null} />
        </div>
      </section>

      <section className="mt-10">
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-lg font-bold text-ink">Recent marks</h2>
          {marks.length > 5 && (
            <Link
              href={`/admin/students/${id}/marks`}
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
                {marks.slice(0, 5).map((m, i) => (
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

        <FeePlanGenerator studentId={id} defaultTotal={student.annual_fee ?? null} />

        <form
          action={createFee}
          className="mt-3 grid gap-2 rounded-2xl border border-border bg-surface p-3 sm:grid-cols-[1fr_1fr_1fr_auto] sm:items-end"
        >
          <input type="hidden" name="student_id" value={id} />
          <label className="block text-sm">
            <span className="font-medium text-ink">Month</span>
            <input name="month" className={`mt-1 ${feeField}`} placeholder="June 2026" />
          </label>
          <label className="block text-sm">
            <span className="font-medium text-ink">Amount (Rs)</span>
            <input name="amount" type="number" min="0" className={`mt-1 ${feeField}`} />
          </label>
          <label className="block text-sm">
            <span className="font-medium text-ink">Due date</span>
            <input name="due_date" type="date" className={`mt-1 ${feeField}`} />
          </label>
          <button
            type="submit"
            className="rounded-full bg-primary-strong px-5 py-2 text-sm font-semibold text-white hover:bg-primary-deep"
          >
            Add fee
          </button>
        </form>

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
