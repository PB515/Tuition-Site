import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MessageCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { SITE } from "@/lib/site";
import { academicYearOf, feeAcademicYear, currentAcademicYear } from "@/lib/academic-year";
import YearScope from "@/components/YearScope";

export const dynamic = "force-dynamic";
export const metadata = { title: "Progress", robots: { index: false, follow: false } };

type AttRow = { status: string | null; date: string | null };
type MarkRow = {
  marks_obtained: number | null;
  status: string | null;
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
    <div className="rounded-xl border border-border bg-surface p-3 text-center">
      <p className="font-heading text-lg font-bold leading-tight text-ink sm:text-xl">{value}</p>
      <p className="mt-0.5 text-[10px] uppercase tracking-wide text-ink-muted sm:text-xs">{label}</p>
    </div>
  );
}

function markCell(m: MarkRow) {
  if (m.marks_obtained != null) {
    return `${m.marks_obtained}${m.tests?.total_marks != null ? `/${m.tests.total_marks}` : ""}`;
  }
  if (m.status === "absent") return "Absent";
  if (m.status === "not_submitted") return "Not submitted";
  return "-";
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
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Explicit cross-user denial: this child must be linked to THIS parent.
  const { data: link } = await supabase
    .from("parents")
    .select("student_id")
    .eq("user_id", user?.id ?? "")
    .eq("student_id", id)
    .maybeSingle();
  if (!link) notFound();

  const { data: student } = await supabase
    .from("students")
    .select("name, roll_number, class, batches(name)")
    .eq("id", id)
    .single();
  if (!student) notFound();
  const info = student as unknown as {
    name: string;
    roll_number: string | null;
    class: string | null;
    batches: { name: string } | null;
  };

  const [att, marksRes, feesRes] = await Promise.all([
    supabase.from("attendance").select("status, date").eq("student_id", id),
    supabase
      .from("marks")
      .select("marks_obtained, status, remark, tests(name, date, total_marks)")
      .eq("student_id", id)
      .order("created_at", { ascending: false }),
    supabase
      .from("fees")
      .select("month, amount, paid, due_date, created_at")
      .eq("student_id", id)
      .order("created_at", { ascending: false }),
  ]);

  const allAtt = (att.data ?? []) as AttRow[];
  const allMarks = (marksRes.data ?? []) as unknown as MarkRow[];
  const allFees = (feesRes.data ?? []) as unknown as FeeRow[];

  // Which academic years does this child have data in? Newest first.
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

  // Default to the live year (latest present); "all" shows everything.
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
  const today = new Date(Date.now() + 5.5 * 3600 * 1000).toISOString().slice(0, 10);

  const waAcademy = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(
    `Hello, I am the parent of ${info.name} at Inspire Academy of Mathematics. `,
  )}`;

  return (
    <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <Link
        href="/parent"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-muted hover:text-primary-strong"
      >
        <ArrowLeft size={15} strokeWidth={2} /> Your children
      </Link>

      <div className="mt-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="font-heading text-2xl font-bold text-ink">
            {info.name}
            {info.roll_number && (
              <span className="ml-2 align-middle text-base font-medium text-ink-muted">
                #{info.roll_number}
              </span>
            )}
          </h1>
          <p className="mt-1 text-sm text-ink-muted">
            {[info.class, info.batches?.name].filter(Boolean).join("  ·  ") || "-"}
          </p>
        </div>
        <a
          href={waAcademy}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-primary px-4 py-2 text-sm font-semibold text-primary-strong hover:bg-primary-tint"
        >
          <MessageCircle size={15} strokeWidth={2} /> Message academy
        </a>
      </div>

      <YearScope years={years} selected={selected} current={current} base={`/parent/child/${id}`} />

      <div className="mt-6 grid grid-cols-3 gap-2.5">
        <Stat label="Attendance" value={attPct != null ? `${attPct}%` : "-"} />
        <Stat label="Classes" value={String(totalDays)} />
        <Stat label="Pending" value={pendingTotal > 0 ? `Rs ${pendingTotal}` : "Rs 0"} />
      </div>

      <section className="mt-8">
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-lg font-bold text-ink">Recent marks</h2>
          {marks.length > 5 && (
            <Link href={`/parent/child/${id}/marks`} className="text-sm font-medium text-primary-strong hover:underline">
              View all
            </Link>
          )}
        </div>
        {marks.length === 0 ? (
          <p className="mt-3 text-sm text-ink-muted">No marks recorded yet.</p>
        ) : (
          <div className="mt-3 divide-y divide-border rounded-2xl border border-border">
            {marks.slice(0, 5).map((m, i) => (
              <div key={i} className="flex items-center justify-between gap-3 px-4 py-3">
                <div className="min-w-0">
                  <p className="truncate font-medium text-ink">{m.tests?.name ?? "-"}</p>
                  <p className="mt-0.5 text-xs text-ink-muted">
                    {[m.tests?.date, m.remark].filter(Boolean).join("  ·  ") || "-"}
                  </p>
                </div>
                <span className="shrink-0 font-heading text-base font-bold text-ink">{markCell(m)}</span>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="mt-8">
        <h2 className="font-heading text-lg font-bold text-ink">Fees</h2>
        {fees.length === 0 ? (
          <p className="mt-3 text-sm text-ink-muted">No fee records yet.</p>
        ) : (
          <div className="mt-3 divide-y divide-border rounded-2xl border border-border">
            {fees.map((f, i) => {
              const overdue = !f.paid && !!f.due_date && f.due_date < today;
              return (
                <div key={i} className="flex items-center justify-between gap-3 px-4 py-3">
                  <div className="min-w-0">
                    <p className="font-medium text-ink">{f.month ?? "-"}</p>
                    <p className="mt-0.5 text-xs text-ink-muted">
                      {[f.amount != null ? `Rs ${f.amount}` : null, f.due_date ? `due ${f.due_date}` : null]
                        .filter(Boolean)
                        .join("  ·  ") || "-"}
                    </p>
                  </div>
                  <span
                    className={
                      f.paid
                        ? "shrink-0 rounded-full bg-primary-tint px-2.5 py-0.5 text-xs font-medium text-primary-strong"
                        : overdue
                          ? "shrink-0 rounded-full bg-error/10 px-2.5 py-0.5 text-xs font-medium text-error"
                          : "shrink-0 rounded-full bg-surface px-2.5 py-0.5 text-xs font-medium text-accent"
                    }
                  >
                    {f.paid ? "Paid" : overdue ? "Overdue" : "Pending"}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
