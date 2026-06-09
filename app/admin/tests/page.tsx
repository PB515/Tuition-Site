import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { createTest } from "./actions";

export const dynamic = "force-dynamic";
export const metadata = { title: "Tests", robots: { index: false, follow: false } };

const PAGE_SIZE = 20;
const field =
  "w-full rounded-lg border border-border bg-bg px-3 py-2 text-sm text-ink focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30";

type Batch = { id: string; name: string };
type Test = {
  id: string;
  name: string;
  date: string | null;
  total_marks: number | null;
  batches: { name: string } | null;
};

function href(params: Record<string, string | number | undefined>) {
  const sp = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== "" && v !== null) sp.set(k, String(v));
  }
  const qs = sp.toString();
  return qs ? `/admin/tests?${qs}` : "/admin/tests";
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; batch?: string; page?: string }>;
}) {
  const sp = await searchParams;
  const q = (sp.q ?? "").trim();
  const batch = sp.batch ?? "";
  const page = Math.max(1, Number(sp.page ?? "1") || 1);
  const from = (page - 1) * PAGE_SIZE;

  const supabase = await createClient();
  const { data: batches } = await supabase.from("batches").select("id, name").order("name");
  const batchList = (batches ?? []) as Batch[];

  let query = supabase
    .from("tests")
    .select("id, name, date, total_marks, batches(name)", { count: "exact" });
  if (q) query = query.ilike("name", `%${q.replace(/[,%()]/g, " ")}%`);
  if (batch) query = query.eq("batch_id", batch);

  const { data, count } = await query
    .order("date", { ascending: false })
    .range(from, from + PAGE_SIZE - 1);
  const testList = (data ?? []) as unknown as Test[];
  const total = count ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <h1 className="font-heading text-2xl font-bold text-ink">Tests</h1>

      <form
        action={createTest}
        className="mt-6 grid gap-3 rounded-2xl border border-border bg-surface p-4 sm:grid-cols-2"
      >
        <label className="block text-sm sm:col-span-2">
          <span className="font-medium text-ink">Test name</span>
          <input name="name" required className={`mt-1 ${field}`} placeholder="e.g. Trigonometry test" />
        </label>
        <label className="block text-sm">
          <span className="font-medium text-ink">Date</span>
          <input name="date" type="date" className={`mt-1 ${field}`} />
        </label>
        <label className="block text-sm">
          <span className="font-medium text-ink">Batch</span>
          <select name="batch_id" className={`mt-1 ${field}`}>
            <option value="">-</option>
            {batchList.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm">
          <span className="font-medium text-ink">Total marks</span>
          <input name="total_marks" type="number" min="0" className={`mt-1 ${field}`} />
        </label>
        <label className="block text-sm">
          <span className="font-medium text-ink">Syllabus</span>
          <input name="syllabus" className={`mt-1 ${field}`} placeholder="e.g. Trigonometric identities" />
        </label>
        <div className="sm:col-span-2">
          <button
            type="submit"
            className="rounded-full bg-primary-strong px-5 py-2 text-sm font-semibold text-white hover:bg-primary-deep"
          >
            Create test
          </button>
        </div>
      </form>

      <form
        method="get"
        className="mt-8 grid gap-3 rounded-2xl border border-border bg-surface p-4 sm:grid-cols-[2fr_1fr_auto] sm:items-end"
      >
        <label className="block text-sm">
          <span className="font-medium text-ink">Search tests</span>
          <input name="q" defaultValue={q} placeholder="test name" className={`mt-1 ${field}`} />
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
        <button
          type="submit"
          className="rounded-full border border-primary px-5 py-2 text-sm font-semibold text-primary-strong hover:bg-primary-tint"
        >
          Filter
        </button>
      </form>

      <p className="mt-5 text-sm text-ink-muted">
        {total === 0
          ? "No tests match."
          : `Showing ${from + 1}-${Math.min(from + PAGE_SIZE, total)} of ${total}`}
      </p>

      {testList.length > 0 && (
        <div className="mt-3 overflow-hidden rounded-2xl border border-border">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-border bg-surface text-xs uppercase tracking-wide text-ink-muted">
              <tr>
                <th className="px-4 py-3 font-semibold">Test</th>
                <th className="px-4 py-3 font-semibold">Date</th>
                <th className="px-4 py-3 font-semibold">Batch</th>
                <th className="px-4 py-3 font-semibold">Total</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {testList.map((t) => (
                <tr key={t.id}>
                  <td className="px-4 py-3 font-medium text-ink">{t.name}</td>
                  <td className="px-4 py-3 text-ink-muted">{t.date ?? "-"}</td>
                  <td className="px-4 py-3 text-ink-muted">{t.batches?.name ?? "-"}</td>
                  <td className="px-4 py-3 text-ink-muted">{t.total_marks ?? "-"}</td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      href={`/admin/tests/${t.id}`}
                      className="text-sm font-medium text-primary-strong hover:underline"
                    >
                      Enter marks
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
            <Link href={href({ q, batch, page: page - 1 })} className="font-medium text-primary-strong hover:underline">
              Previous
            </Link>
          ) : (
            <span className="text-ink-muted">Previous</span>
          )}
          <span className="text-ink-muted">
            Page {page} of {totalPages}
          </span>
          {page < totalPages ? (
            <Link href={href({ q, batch, page: page + 1 })} className="font-medium text-primary-strong hover:underline">
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
