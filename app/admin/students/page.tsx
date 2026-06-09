import Link from "next/link";
import { Plus } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { ENQUIRY_CLASSES } from "@/lib/site";

export const dynamic = "force-dynamic";
export const metadata = { title: "Students", robots: { index: false, follow: false } };

const PAGE_SIZE = 20;
const field =
  "w-full rounded-lg border border-border bg-bg px-3 py-2 text-sm text-ink focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30";

type Batch = { id: string; name: string };
type Row = {
  id: string;
  name: string;
  class: string | null;
  parent_name: string | null;
  parent_whatsapp: string | null;
  active: boolean;
  batches: { name: string } | null;
};

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
  searchParams: Promise<{ q?: string; class?: string; batch?: string; active?: string; page?: string }>;
}) {
  const sp = await searchParams;
  const q = (sp.q ?? "").trim();
  const cls = sp.class ?? "";
  const batch = sp.batch ?? "";
  const active = sp.active ?? "";
  const page = Math.max(1, Number(sp.page ?? "1") || 1);
  const from = (page - 1) * PAGE_SIZE;

  const supabase = await createClient();
  const { data: batches } = await supabase.from("batches").select("id, name").order("name");
  const batchList = (batches ?? []) as Batch[];

  let query = supabase
    .from("students")
    .select("id, name, class, parent_name, parent_whatsapp, active, batches(name)", {
      count: "exact",
    });
  if (q) {
    const safe = q.replace(/[,%()]/g, " ");
    query = query.or(
      `name.ilike.%${safe}%,parent_name.ilike.%${safe}%,parent_whatsapp.ilike.%${safe}%`,
    );
  }
  if (cls) query = query.eq("class", cls);
  if (batch) query = query.eq("batch_id", batch);
  if (active === "true") query = query.eq("active", true);
  if (active === "false") query = query.eq("active", false);

  const { data, count } = await query.order("name").range(from, from + PAGE_SIZE - 1);
  const rows = (data ?? []) as unknown as Row[];
  const total = count ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const base = { q, class: cls, batch, active };

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-heading text-2xl font-bold text-ink">Students</h1>
        <div className="flex items-center gap-2">
          <a
            href="/admin/export/students"
            className="rounded-full border border-border px-4 py-2.5 text-sm font-medium text-ink-muted hover:text-ink"
          >
            Export CSV
          </a>
          <Link
            href="/admin/students/new"
            className="inline-flex items-center gap-2 rounded-full bg-primary-strong px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-deep"
          >
            <Plus size={16} strokeWidth={2.5} /> Add student
          </Link>
        </div>
      </div>

      <form
        method="get"
        className="mt-6 grid gap-3 rounded-2xl border border-border bg-surface p-4 sm:grid-cols-[2fr_1fr_1fr_1fr_auto] sm:items-end"
      >
        <label className="block text-sm">
          <span className="font-medium text-ink">Search</span>
          <input name="q" defaultValue={q} placeholder="name, parent or phone" className={`mt-1 ${field}`} />
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
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
        </label>
        <button
          type="submit"
          className="rounded-full border border-primary px-5 py-2 text-sm font-semibold text-primary-strong hover:bg-primary-tint"
        >
          Search
        </button>
      </form>

      <p className="mt-5 text-sm text-ink-muted">
        {total === 0
          ? "No students match."
          : `Showing ${from + 1}-${Math.min(from + PAGE_SIZE, total)} of ${total}`}
      </p>

      {rows.length > 0 && (
        <div className="mt-3 overflow-x-auto rounded-2xl border border-border">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="border-b border-border bg-surface text-xs uppercase tracking-wide text-ink-muted">
              <tr>
                <th className="px-4 py-3 font-semibold">Name</th>
                <th className="px-4 py-3 font-semibold">Class</th>
                <th className="px-4 py-3 font-semibold">Batch</th>
                <th className="px-4 py-3 font-semibold">Parent</th>
                <th className="px-4 py-3 font-semibold">WhatsApp</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {rows.map((r) => (
                <tr key={r.id}>
                  <td className="px-4 py-3 font-medium text-ink">{r.name}</td>
                  <td className="px-4 py-3 text-ink-muted">{r.class ?? "-"}</td>
                  <td className="px-4 py-3 text-ink-muted">{r.batches?.name ?? "-"}</td>
                  <td className="px-4 py-3 text-ink-muted">{r.parent_name ?? "-"}</td>
                  <td className="px-4 py-3 text-ink-muted">{r.parent_whatsapp ?? "-"}</td>
                  <td className="px-4 py-3">
                    <span
                      className={
                        r.active
                          ? "rounded-full bg-primary-tint px-2.5 py-0.5 text-xs font-medium text-primary-strong"
                          : "rounded-full bg-surface px-2.5 py-0.5 text-xs font-medium text-ink-muted"
                      }
                    >
                      {r.active ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      href={`/admin/students/${r.id}`}
                      className="text-sm font-medium text-primary-strong hover:underline"
                    >
                      Open
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {totalPages > 1 && (
        <div className="mt-5 flex items-center justify-between text-sm">
          {page > 1 ? (
            <Link href={href({ ...base, page: page - 1 })} className="font-medium text-primary-strong hover:underline">
              Previous
            </Link>
          ) : (
            <span className="text-ink-muted">Previous</span>
          )}
          <span className="text-ink-muted">
            Page {page} of {totalPages}
          </span>
          {page < totalPages ? (
            <Link href={href({ ...base, page: page + 1 })} className="font-medium text-primary-strong hover:underline">
              Next
            </Link>
          ) : (
            <span className="text-ink-muted">Next</span>
          )}
        </div>
      )}
    </main>
  );
}
