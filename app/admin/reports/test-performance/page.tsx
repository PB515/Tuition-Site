import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import ReportTable from "@/components/admin/ReportTable";

export const dynamic = "force-dynamic";
export const metadata = { title: "Test performance", robots: { index: false, follow: false } };

const field =
  "w-full rounded-lg border border-border bg-bg px-3 py-2 text-sm text-ink focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30";

type Mark = {
  marks_obtained: number | null;
  status: string | null;
  remark: string | null;
  students: { name: string; roll_number: string | null } | null;
};

function Card({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-surface p-3 text-center">
      <p className="font-heading text-xl font-bold text-ink">{value}</p>
      <p className="mt-0.5 text-xs text-ink-muted">{label}</p>
    </div>
  );
}

export default async function Page({ searchParams }: { searchParams: Promise<{ test?: string }> }) {
  const sp = await searchParams;
  const supabase = await createClient();
  const { data: tests } = await supabase
    .from("tests")
    .select("id, name, date")
    .order("date", { ascending: false })
    .limit(200);
  const testId = sp.test ?? "";

  let total: number | null = null;
  let testName = "";
  let rows: Record<string, string | number | null>[] = [];
  const scored: number[] = [];
  let absent = 0;

  if (testId) {
    const { data: t } = await supabase.from("tests").select("name, total_marks").eq("id", testId).single();
    testName = t?.name ?? "";
    total = t?.total_marks ?? null;
    const { data: marks } = await supabase
      .from("marks")
      .select("marks_obtained, status, remark, students!inner(name, roll_number)")
      .eq("test_id", testId);
    rows = ((marks ?? []) as unknown as Mark[])
      .map((m) => {
        if (m.status === "absent") absent++;
        if (m.status !== "absent" && m.marks_obtained != null) scored.push(m.marks_obtained);
        return {
          roll: m.students?.roll_number ?? "",
          student: m.students?.name ?? "",
          marks: m.marks_obtained ?? "",
          status: m.status ?? "",
          pct: total && m.marks_obtained != null ? `${Math.round((m.marks_obtained / total) * 100)}%` : "",
          remark: m.remark ?? "",
        };
      })
      .sort((a, b) => String(a.student).localeCompare(String(b.student)));
  }

  const highest = scored.length ? Math.max(...scored) : null;
  const lowest = scored.length ? Math.min(...scored) : null;
  const avg = scored.length ? Math.round(scored.reduce((a, b) => a + b, 0) / scored.length) : null;
  const above80 = total ? scored.filter((m) => (m / total) * 100 >= 80).length : 0;
  const below40 = total ? scored.filter((m) => (m / total) * 100 < 40).length : 0;

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      <Link href="/admin/reports" className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-muted hover:text-primary-strong">
        <ArrowLeft size={15} strokeWidth={2} /> Reports
      </Link>
      <h1 className="mt-4 font-heading text-2xl font-bold text-ink">Test performance</h1>

      <form method="get" className="mt-6 grid max-w-xl gap-3 rounded-2xl border border-border bg-surface p-4 sm:grid-cols-[1fr_auto] sm:items-end">
        <label className="block text-sm">
          <span className="font-medium text-ink">Test</span>
          <select name="test" defaultValue={testId} className={`mt-1 ${field}`}>
            <option value="">Select a test</option>
            {(tests ?? []).map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
                {t.date ? ` (${t.date})` : ""}
              </option>
            ))}
          </select>
        </label>
        <button type="submit" className="rounded-full border border-primary px-5 py-2 text-sm font-semibold text-primary-strong hover:bg-primary-tint">
          Run
        </button>
      </form>

      {testId && scored.length > 0 && (
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          <Card label="Highest" value={String(highest)} />
          <Card label="Average" value={String(avg)} />
          <Card label="Lowest" value={String(lowest)} />
          <Card label="Above 80%" value={String(above80)} />
          <Card label="Below 40%" value={String(below40)} />
          <Card label="Absent" value={String(absent)} />
        </div>
      )}

      {testId && (
        <ReportTable
          columns={[
            { key: "roll", label: "Roll" },
            { key: "student", label: "Student" },
            { key: "marks", label: "Marks" },
            { key: "status", label: "Status" },
            { key: "pct", label: "%" },
            { key: "remark", label: "Focus area" },
          ]}
          rows={rows}
          filename={`test-${testName || testId}.csv`}
        />
      )}
    </div>
  );
}
