import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import ReportTable from "@/components/admin/ReportTable";

export const dynamic = "force-dynamic";
export const metadata = { title: "Monthly collection", robots: { index: false, follow: false } };

const field =
  "w-full rounded-lg border border-border bg-bg px-3 py-2 text-sm text-ink focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30";

type Row = {
  amount: number | null;
  month: string | null;
  paid_at: string | null;
  students: { name: string; batches: { name: string } | null } | null;
};

export default async function Page({ searchParams }: { searchParams: Promise<{ from?: string; to?: string }> }) {
  const sp = await searchParams;
  const supabase = await createClient();
  const today = new Date(Date.now() + 5.5 * 3600 * 1000).toISOString().slice(0, 10);
  const from = sp.from ?? today.slice(0, 7) + "-01";
  const to = sp.to ?? today;
  const toEnd = to + "T23:59:59";

  const { data } = await supabase
    .from("fees")
    .select("amount, month, paid_at, students!inner(name, batches(name))")
    .eq("paid", true)
    .gte("paid_at", from)
    .lte("paid_at", toEnd)
    .order("paid_at", { ascending: false });

  const data2 = (data ?? []) as unknown as Row[];
  const total = data2.reduce((sum, f) => sum + (f.amount ?? 0), 0);
  const rows = data2.map((f) => ({
    student: f.students?.name ?? "",
    batch: f.students?.batches?.name ?? "",
    month: f.month ?? "",
    amount: f.amount ?? 0,
    paid_on: f.paid_at ? f.paid_at.slice(0, 10) : "",
  }));

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      <Link href="/admin/reports" className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-muted hover:text-primary-strong">
        <ArrowLeft size={15} strokeWidth={2} /> Reports
      </Link>
      <h1 className="mt-4 font-heading text-2xl font-bold text-ink">Monthly collection</h1>
      <p className="mt-1 text-sm text-ink-muted">
        Collected {from} to {to}: <b className="text-ink">Rs {total}</b>
      </p>

      <form method="get" className="mt-6 grid max-w-lg gap-3 rounded-2xl border border-border bg-surface p-4 sm:grid-cols-[1fr_1fr_auto] sm:items-end">
        <label className="block text-sm">
          <span className="font-medium text-ink">From</span>
          <input type="date" name="from" defaultValue={from} className={`mt-1 ${field}`} />
        </label>
        <label className="block text-sm">
          <span className="font-medium text-ink">To</span>
          <input type="date" name="to" defaultValue={to} className={`mt-1 ${field}`} />
        </label>
        <button type="submit" className="rounded-full border border-primary px-5 py-2 text-sm font-semibold text-primary-strong hover:bg-primary-tint">
          Run
        </button>
      </form>

      <ReportTable
        columns={[
          { key: "student", label: "Student" },
          { key: "batch", label: "Batch" },
          { key: "month", label: "Month" },
          { key: "amount", label: "Amount" },
          { key: "paid_on", label: "Paid on" },
        ]}
        rows={rows}
        filename={`collection-${from}-to-${to}.csv`}
      />
    </div>
  );
}
