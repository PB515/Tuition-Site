import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import FeeGenerator from "@/components/admin/FeeGenerator";
import FeesTable from "@/components/admin/FeesTable";

export const dynamic = "force-dynamic";
export const metadata = { title: "Fees", robots: { index: false, follow: false } };

const PAGE_SIZE = 20;
const field =
  "w-full rounded-lg border border-border bg-bg px-3 py-2 text-sm text-ink focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30";

type Batch = { id: string; name: string };

function Kpi({ label, value, tone }: { label: string; value: string; tone?: "due" | "ok" }) {
  return (
    <div className="rounded-xl border border-border bg-surface p-4">
      <p className="text-xs uppercase tracking-wide text-ink-muted">{label}</p>
      <p
        className={
          "mt-1 font-heading text-xl font-bold " +
          (tone === "due" ? "text-error" : tone === "ok" ? "text-primary-strong" : "text-ink")
        }
      >
        {value}
      </p>
    </div>
  );
}

function href(params: Record<string, string | number | undefined>) {
  const sp = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== "" && v !== null) sp.set(k, String(v));
  }
  const qs = sp.toString();
  return qs ? `/admin/fees?${qs}` : "/admin/fees";
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ month?: string; batch?: string; status?: string; q?: string; page?: string }>;
}) {
  const sp = await searchParams;
  const supabase = await createClient();
  const today = new Date().toISOString().slice(0, 10);

  const { data: batches } = await supabase.from("batches").select("id, name").order("name");
  const batchList = (batches ?? []) as Batch[];

  // Default to the most recently created fee's month.
  let month = sp.month;
  if (month === undefined) {
    const { data: latest } = await supabase
      .from("fees")
      .select("month")
      .not("month", "is", null)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();
    month = latest?.month ?? "";
  }
  const batch = sp.batch ?? "";
  const status = sp.status ?? "";
  const q = (sp.q ?? "").trim();
  const page = Math.max(1, Number(sp.page ?? "1") || 1);
  const from = (page - 1) * PAGE_SIZE;

  // KPIs for the selected month (+ batch) - light columns.
  let kpiQ = supabase.from("fees").select("amount, paid, due_date, student_id");
  if (month) kpiQ = kpiQ.eq("month", month);
  if (batch) kpiQ = kpiQ.eq("batch_id", batch);
  const { data: kpiData } = await kpiQ;
  let totalDue = 0,
    collected = 0,
    pending = 0,
    overdue = 0;
  const paidSet = new Set<string>();
  const pendSet = new Set<string>();
  for (const r of (kpiData ?? []) as {
    amount: number | null;
    paid: boolean;
    due_date: string | null;
    student_id: string;
  }[]) {
    const amt = r.amount ?? 0;
    totalDue += amt;
    if (r.paid) {
      collected += amt;
      paidSet.add(r.student_id);
    } else {
      pending += amt;
      pendSet.add(r.student_id);
      if (r.due_date && r.due_date < today) overdue += amt;
    }
  }

  // Table (paginated).
  let query = supabase
    .from("fees")
    .select(
      "id, month, amount, paid, due_date, reminded_at, students!inner(id, name, parent_whatsapp, batches(name))",
      { count: "exact" },
    );
  if (month) query = query.eq("month", month);
  if (batch) query = query.eq("batch_id", batch);
  if (status === "paid") query = query.eq("paid", true);
  if (status === "pending") query = query.eq("paid", false);
  if (status === "overdue") query = query.eq("paid", false).lt("due_date", today);
  if (q) query = query.ilike("students.name", `%${q.replace(/[,%()]/g, " ")}%`);

  const { data, count } = await query
    .order("created_at", { ascending: false })
    .range(from, from + PAGE_SIZE - 1);
  const fees = (data ?? []) as unknown as Parameters<typeof FeesTable>[0]["fees"];
  const total = count ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  const exportHref = href({ month, batch, status: status || "pending" }).replace(
    "/admin/fees",
    "/admin/export/fees",
  );

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="font-heading text-2xl font-bold text-ink">Fees</h1>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        <Kpi label="Total due" value={`Rs ${totalDue}`} />
        <Kpi label="Collected" value={`Rs ${collected}`} tone="ok" />
        <Kpi label="Pending" value={`Rs ${pending}`} />
        <Kpi label="Overdue" value={`Rs ${overdue}`} tone="due" />
        <Kpi label="Paid students" value={String(paidSet.size)} />
        <Kpi label="Pending students" value={String(pendSet.size)} />
      </div>

      <div className="mt-6">
        <FeeGenerator batches={batchList} />
      </div>

      <form
        method="get"
        className="mt-6 grid gap-3 rounded-2xl border border-border bg-surface p-4 sm:grid-cols-[1.5fr_1fr_1fr_1fr_auto] sm:items-end"
      >
        <label className="block text-sm">
          <span className="font-medium text-ink">Search student</span>
          <input name="q" defaultValue={q} placeholder="student name" className={`mt-1 ${field}`} />
        </label>
        <label className="block text-sm">
          <span className="font-medium text-ink">Month</span>
          <input name="month" defaultValue={month} placeholder="June 2026" className={`mt-1 ${field}`} />
        </label>
        <label className="block text-sm">
          <span className="font-medium text-ink">Batch</span>
          <select name="batch" defaultValue={batch} className={`mt-1 ${field}`}>
            <option value="">All</option>
            {batchList.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm">
          <span className="font-medium text-ink">Status</span>
          <select name="status" defaultValue={status} className={`mt-1 ${field}`}>
            <option value="">All</option>
            <option value="pending">Pending</option>
            <option value="paid">Paid</option>
            <option value="overdue">Overdue</option>
          </select>
        </label>
        <button
          type="submit"
          className="rounded-full border border-primary px-5 py-2 text-sm font-semibold text-primary-strong hover:bg-primary-tint"
        >
          Filter
        </button>
      </form>

      <p className="mt-4 text-sm text-ink-muted">
        {total === 0 ? "No fee records match." : `Showing ${from + 1}-${Math.min(from + PAGE_SIZE, total)} of ${total}`}
      </p>

      {fees.length > 0 && (
        <div className="mt-3">
          <FeesTable fees={fees} exportHref={exportHref} />
        </div>
      )}

      {totalPages > 1 && (
        <div className="mt-5 flex items-center justify-between text-sm">
          {page > 1 ? (
            <Link href={href({ month, batch, status, q, page: page - 1 })} className="font-medium text-primary-strong hover:underline">
              Previous
            </Link>
          ) : (
            <span className="text-ink-muted">Previous</span>
          )}
          <span className="text-ink-muted">
            Page {page} of {totalPages}
          </span>
          {page < totalPages ? (
            <Link href={href({ month, batch, status, q, page: page + 1 })} className="font-medium text-primary-strong hover:underline">
              Next
            </Link>
          ) : (
            <span className="text-ink-muted">Next</span>
          )}
        </div>
      )}
    </div>
  );
}
