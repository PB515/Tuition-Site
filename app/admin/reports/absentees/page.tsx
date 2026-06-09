import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import ReportTable from "@/components/admin/ReportTable";

export const dynamic = "force-dynamic";
export const metadata = { title: "Absent students", robots: { index: false, follow: false } };

const field =
  "w-full rounded-lg border border-border bg-bg px-3 py-2 text-sm text-ink focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30";

type Row = {
  date: string;
  status: string;
  students: { name: string; roll_number: string | null; parent_whatsapp: string | null } | null;
};

export default async function Page({ searchParams }: { searchParams: Promise<{ from?: string; to?: string; batch?: string }> }) {
  const sp = await searchParams;
  const supabase = await createClient();
  const { data: batches } = await supabase.from("batches").select("id, name").order("name");
  const today = new Date(Date.now() + 5.5 * 3600 * 1000).toISOString().slice(0, 10);
  const from = sp.from ?? today.slice(0, 7) + "-01";
  const to = sp.to ?? today;
  const batch = sp.batch ?? "";

  let q = supabase
    .from("attendance")
    .select("date, status, students!inner(name, roll_number, parent_whatsapp)")
    .in("status", ["absent", "late"])
    .gte("date", from)
    .lte("date", to);
  if (batch) q = q.eq("batch_id", batch);
  const { data } = await q.order("date", { ascending: false });
  const rows = ((data ?? []) as unknown as Row[]).map((a) => ({
    date: a.date,
    roll: a.students?.roll_number ?? "",
    student: a.students?.name ?? "",
    status: a.status,
    whatsapp: a.students?.parent_whatsapp ?? "",
  }));

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      <Link href="/admin/reports" className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-muted hover:text-primary-strong">
        <ArrowLeft size={15} strokeWidth={2} /> Reports
      </Link>
      <h1 className="mt-4 font-heading text-2xl font-bold text-ink">Absent students</h1>

      <form method="get" className="mt-6 grid max-w-2xl gap-3 rounded-2xl border border-border bg-surface p-4 sm:grid-cols-[1fr_1fr_1fr_auto] sm:items-end">
        <label className="block text-sm">
          <span className="font-medium text-ink">From</span>
          <input type="date" name="from" defaultValue={from} className={`mt-1 ${field}`} />
        </label>
        <label className="block text-sm">
          <span className="font-medium text-ink">To</span>
          <input type="date" name="to" defaultValue={to} className={`mt-1 ${field}`} />
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
          { key: "date", label: "Date" },
          { key: "roll", label: "Roll" },
          { key: "student", label: "Student" },
          { key: "status", label: "Status" },
          { key: "whatsapp", label: "Parent WhatsApp" },
        ]}
        rows={rows}
        filename={`absentees-${from}-to-${to}.csv`}
      />
    </div>
  );
}
