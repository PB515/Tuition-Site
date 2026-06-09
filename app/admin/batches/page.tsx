import { Trash2 } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { ENQUIRY_CLASSES } from "@/lib/site";
import { createBatch, deleteBatch } from "./actions";

export const dynamic = "force-dynamic";
export const metadata = { title: "Batches", robots: { index: false, follow: false } };

const field =
  "w-full rounded-lg border border-border bg-bg px-3 py-2 text-sm text-ink focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30";

type Batch = { id: string; name: string; class: string | null; timing: string | null };

export default async function Page() {
  const supabase = await createClient();
  const { data: batches } = await supabase.from("batches").select("*").order("name");

  return (
    <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <h1 className="font-heading text-2xl font-bold text-ink">Batches</h1>

      <form
        action={createBatch}
        className="mt-6 grid gap-3 rounded-2xl border border-border bg-surface p-4 sm:grid-cols-[1fr_1fr_1fr_auto] sm:items-end"
      >
        <label className="block text-sm">
          <span className="font-medium text-ink">Name</span>
          <input name="name" required className={`mt-1 ${field}`} placeholder="e.g. Class 10 Evening" />
        </label>
        <label className="block text-sm">
          <span className="font-medium text-ink">Class</span>
          <select name="class" className={`mt-1 ${field}`}>
            <option value="">-</option>
            {ENQUIRY_CLASSES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm">
          <span className="font-medium text-ink">Timing</span>
          <input name="timing" className={`mt-1 ${field}`} placeholder="e.g. 6-7:30 PM" />
        </label>
        <button
          type="submit"
          className="rounded-full bg-primary-strong px-5 py-2 text-sm font-semibold text-white hover:bg-primary-deep"
        >
          Add batch
        </button>
      </form>

      <div className="mt-8 overflow-hidden rounded-2xl border border-border">
        {!batches || batches.length === 0 ? (
          <p className="bg-surface p-6 text-sm text-ink-muted">No batches yet. Add one above.</p>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="border-b border-border bg-surface text-xs uppercase tracking-wide text-ink-muted">
              <tr>
                <th className="px-4 py-3 font-semibold">Name</th>
                <th className="px-4 py-3 font-semibold">Class</th>
                <th className="px-4 py-3 font-semibold">Timing</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {(batches as Batch[]).map((b) => (
                <tr key={b.id}>
                  <td className="px-4 py-3 font-medium text-ink">{b.name}</td>
                  <td className="px-4 py-3 text-ink-muted">{b.class ?? "-"}</td>
                  <td className="px-4 py-3 text-ink-muted">{b.timing ?? "-"}</td>
                  <td className="px-4 py-3 text-right">
                    <form action={deleteBatch}>
                      <input type="hidden" name="id" value={b.id} />
                      <button
                        type="submit"
                        title="Delete batch"
                        className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-sm text-ink-muted hover:text-error"
                      >
                        <Trash2 size={15} strokeWidth={1.75} />
                      </button>
                    </form>
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
