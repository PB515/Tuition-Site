import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import ReportTable from "@/components/admin/ReportTable";

export const dynamic = "force-dynamic";
export const metadata = { title: "Weak students", robots: { index: false, follow: false } };

const field =
  "w-full rounded-lg border border-border bg-bg px-3 py-2 text-sm text-ink focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30";

type SO = {
  name: string;
  roll_number: string | null;
  class: string | null;
  batch_id: string | null;
  batch_name: string | null;
  att_total: number;
  att_present: number;
  last_test_marks: number | null;
  last_test_total: number | null;
};

export default async function Page({ searchParams }: { searchParams: Promise<{ threshold?: string; batch?: string }> }) {
  const sp = await searchParams;
  const supabase = await createClient();
  const { data: batches } = await supabase.from("batches").select("id, name").order("name");
  const threshold = Math.max(1, Math.min(100, Number(sp.threshold ?? "40") || 40));
  const batch = sp.batch ?? "";

  let q = supabase
    .from("student_overview")
    .select("name, roll_number, class, batch_id, batch_name, att_total, att_present, last_test_marks, last_test_total")
    .eq("active", true);
  if (batch) q = q.eq("batch_id", batch);
  const { data } = await q.order("name");

  const rows = ((data ?? []) as unknown as SO[])
    .map((s) => {
      const attPct = s.att_total ? (s.att_present / s.att_total) * 100 : null;
      const testPct = s.last_test_total ? ((s.last_test_marks ?? 0) / s.last_test_total) * 100 : null;
      return { s, attPct, testPct };
    })
    .filter((r) => (r.attPct != null && r.attPct < threshold) || (r.testPct != null && r.testPct < threshold))
    .map((r) => ({
      roll: r.s.roll_number ?? "",
      student: r.s.name,
      class: r.s.class ?? "",
      batch: r.s.batch_name ?? "",
      attendance: r.attPct != null ? `${Math.round(r.attPct)}%` : "-",
      last_test: r.testPct != null ? `${Math.round(r.testPct)}%` : "-",
    }));

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      <Link href="/admin/reports" className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-muted hover:text-primary-strong">
        <ArrowLeft size={15} strokeWidth={2} /> Reports
      </Link>
      <h1 className="mt-4 font-heading text-2xl font-bold text-ink">Weak students</h1>
      <p className="mt-1 text-sm text-ink-muted">Attendance or last-test score below {threshold}%.</p>

      <form method="get" className="mt-6 grid max-w-lg gap-3 rounded-2xl border border-border bg-surface p-4 sm:grid-cols-[1fr_1fr_auto] sm:items-end">
        <label className="block text-sm">
          <span className="font-medium text-ink">Below (%)</span>
          <input type="number" name="threshold" min="1" max="100" defaultValue={threshold} className={`mt-1 ${field}`} />
        </label>
        <label className="block text-sm">
          <span className="font-medium text-ink">Batch</span>
          <select name="batch" defaultValue={batch} className={`mt-1 ${field}`}>
            <option value="">All</option>
            {(batches ?? []).map((b) => (
              <option key={b.id} value={b.id}>
                {b.name}
              </option>
            ))}
          </select>
        </label>
        <button type="submit" className="rounded-full border border-primary px-5 py-2 text-sm font-semibold text-primary-strong hover:bg-primary-tint">
          Run
        </button>
      </form>

      <ReportTable
        columns={[
          { key: "roll", label: "Roll" },
          { key: "student", label: "Student" },
          { key: "class", label: "Class" },
          { key: "batch", label: "Batch" },
          { key: "attendance", label: "Attendance" },
          { key: "last_test", label: "Last test" },
        ]}
        rows={rows}
        filename={`weak-students-below-${threshold}.csv`}
        empty="No students below this threshold."
      />
    </div>
  );
}
