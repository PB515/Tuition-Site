import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { ENQUIRY_CLASSES } from "@/lib/site";
import StudentsTable from "@/components/admin/StudentsTable";

export const dynamic = "force-dynamic";
export const metadata = { title: "Students", robots: { index: false, follow: false } };

const PAGE_SIZES = [20, 50, 100];
const field =
  "w-full rounded-lg border border-border bg-bg px-3 py-2 text-sm text-ink focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30";

type Batch = { id: string; name: string };

function href(params: Record<string, string | number | undefined>) {
  const sp = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== "" && v !== null) sp.set(k, String(v));
  }
  const qs = sp.toString();
  return qs ? `/admin/students?${qs}` : "/admin/students";
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
    class?: string;
    batch?: string;
    active?: string;
    fee?: string;
    page?: string;
    per?: string;
  }>;
}) {
  const sp = await searchParams;
  const supabase = await createClient();

  const { data: batches } = await supabase.from("batches").select("id, name").order("name");
  const batchList = (batches ?? []) as Batch[];

  const q = (sp.q ?? "").trim();
  const cls = sp.class ?? "";
  const batch = sp.batch ?? "";
  const active = sp.active ?? "";
  const fee = sp.fee ?? "";
  const per = PAGE_SIZES.includes(Number(sp.per)) ? Number(sp.per) : 20;
  const page = Math.max(1, Number(sp.page ?? "1") || 1);
  const from = (page - 1) * per;

  let query = supabase.from("student_overview").select("*", { count: "exact" });
  if (q) {
    const safe = q.replace(/[,()%]/g, " ");
    query = query.or(
      `name.ilike.%${safe}%,parent_name.ilike.%${safe}%,parent_whatsapp.ilike.%${safe}%,roll_number.ilike.%${safe}%`,
    );
  }
  if (cls) query = query.eq("class", cls);
  if (batch) query = query.eq("batch_id", batch);
  if (active === "active") query = query.eq("active", true);
  if (active === "inactive") query = query.eq("active", false);
  if (fee === "pending") query = query.gt("fee_pending", 0);
  if (fee === "clear") query = query.eq("fee_pending", 0);

  const { data, count } = await query.order("name").range(from, from + per - 1);
  const rows = (data ?? []) as unknown as Parameters<typeof StudentsTable>[0]["rows"];
  const total = count ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / per));

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-heading text-2xl font-bold text-ink">Students</h1>
        <div className="flex flex-wrap gap-2">
          <a
            href="/admin/export/students"
            className="rounded-full border border-border px-4 py-2 text-sm font-medium text-ink-muted hover:text-ink"
          >
            Export all CSV
          </a>
          <Link
            href="/admin/students/import"
            className="rounded-full border border-primary px-4 py-2 text-sm font-semibold text-primary-strong hover:bg-primary-tint"
          >
            Import CSV
          </Link>
          <Link
            href="/admin/students/new"
            className="rounded-full bg-primary-strong px-5 py-2 text-sm font-semibold text-white hover:bg-primary-deep"
          >
            Add student
          </Link>
        </div>
      </div>

      <form
        method="get"
        className="mt-6 grid gap-3 rounded-2xl border border-border bg-surface p-4 sm:grid-cols-[1.6fr_1fr_1fr_1fr_1fr_0.9fr_auto] sm:items-end"
      >
        <label className="block text-sm">
          <span className="font-medium text-ink">Search</span>
          <input name="q" defaultValue={q} placeholder="name, parent, phone, roll" className={`mt-1 ${field}`} />
        </label>
        <label className="block text-sm">
          <span className="font-medium text-ink">Class</span>
          <select name="class" defaultValue={cls} className={`mt-1 ${field}`}>
            <option value="">All</option>
            {ENQUIRY_CLASSES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
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
          <select name="active" defaultValue={active} className={`mt-1 ${field}`}>
            <option value="">All</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </label>
        <label className="block text-sm">
          <span className="font-medium text-ink">Fee</span>
          <select name="fee" defaultValue={fee} className={`mt-1 ${field}`}>
            <option value="">All</option>
            <option value="pending">Pending</option>
            <option value="clear">Clear</option>
          </select>
        </label>
        <label className="block text-sm">
          <span className="font-medium text-ink">Show</span>
          <select name="per" defaultValue={String(per)} className={`mt-1 ${field}`}>
            {PAGE_SIZES.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
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
        {total === 0 ? "No students match." : `Showing ${from + 1}-${Math.min(from + per, total)} of ${total}`}
      </p>

      {rows.length > 0 && (
        <div className="mt-3">
          <StudentsTable rows={rows} batches={batchList} />
        </div>
      )}

      {totalPages > 1 && (
        <div className="mt-5 flex items-center justify-between text-sm">
          {page > 1 ? (
            <Link href={href({ q, class: cls, batch, active, fee, per, page: page - 1 })} className="font-medium text-primary-strong hover:underline">
              Previous
            </Link>
          ) : (
            <span className="text-ink-muted">Previous</span>
          )}
          <span className="text-ink-muted">
            Page {page} of {totalPages}
          </span>
          {page < totalPages ? (
            <Link href={href({ q, class: cls, batch, active, fee, per, page: page + 1 })} className="font-medium text-primary-strong hover:underline">
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
