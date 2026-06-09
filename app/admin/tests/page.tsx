import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { createTest } from "./actions";

export const dynamic = "force-dynamic";
export const metadata = { title: "Tests", robots: { index: false, follow: false } };

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

export default async function Page() {
  const supabase = await createClient();
  const { data: batches } = await supabase.from("batches").select("id, name").order("name");
  const { data: tests } = await supabase
    .from("tests")
    .select("id, name, date, total_marks, batches(name)")
    .order("date", { ascending: false });

  const batchList = (batches ?? []) as Batch[];
  const testList = (tests ?? []) as unknown as Test[];

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

      <div className="mt-8 overflow-hidden rounded-2xl border border-border">
        {testList.length === 0 ? (
          <p className="bg-surface p-6 text-sm text-ink-muted">No tests yet. Create one above.</p>
        ) : (
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
        )}
      </div>
    </main>
  );
}
