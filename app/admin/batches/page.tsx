import Link from "next/link";
import { Trash2 } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { ENQUIRY_CLASSES } from "@/lib/site";
import { currentAcademicYear } from "@/lib/academic-year";
import { createBatch, deleteBatch } from "./actions";
import BatchTimingInput from "@/components/admin/BatchTimingInput";

export const dynamic = "force-dynamic";
export const metadata = { title: "Batches", robots: { index: false, follow: false } };

const field =
  "w-full rounded-lg border border-border bg-bg px-3 py-2 text-sm text-ink focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30";
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

type Batch = {
  id: string;
  name: string;
  class: string | null;
  academic_year: string | null;
  timing: string | null;
  days: string | null;
  capacity: number | null;
};

export default async function Page() {
  const supabase = await createClient();
  const thisYear = currentAcademicYear();
  const { data: batches } = await supabase
    .from("batches")
    .select("*")
    .order("academic_year", { ascending: false })
    .order("name");
  const { data: activeStuds } = await supabase.from("students").select("batch_id").eq("active", true);

  const countByBatch: Record<string, number> = {};
  (activeStuds ?? []).forEach((s) => {
    if (s.batch_id) countByBatch[s.batch_id] = (countByBatch[s.batch_id] || 0) + 1;
  });

  const list = (batches ?? []) as Batch[];

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="font-heading text-2xl font-bold text-ink">Batches</h1>

      <form action={createBatch} className="mt-6 rounded-2xl border border-border bg-surface p-4">
        <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-5">
          <label className="block text-sm">
            <span className="font-medium text-ink">Name</span>
            <input name="name" required className={`mt-1 ${field}`} placeholder="e.g. 10-A Evening" />
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
            <span className="font-medium text-ink">Academic year</span>
            <input
              name="academic_year"
              defaultValue={thisYear}
              placeholder="2026-2027"
              className={`mt-1 ${field}`}
            />
          </label>
          <label className="block text-sm">
            <span className="font-medium text-ink">Timing</span>
            <BatchTimingInput />
          </label>
          <label className="block text-sm">
            <span className="font-medium text-ink">Capacity</span>
            <input name="capacity" type="number" min="0" className={`mt-1 ${field}`} />
          </label>
        </div>
        <div className="mt-3 flex flex-wrap items-end justify-between gap-3">
          <div className="text-sm">
            <span className="font-medium text-ink">Class days</span>
            <div className="mt-1 flex flex-wrap gap-3">
              {DAYS.map((d) => (
                <label key={d} className="inline-flex items-center gap-1.5 text-sm text-ink-muted">
                  <input type="checkbox" name="days" value={d} className="h-4 w-4 rounded border-border text-primary" />
                  {d}
                </label>
              ))}
            </div>
          </div>
          <button
            type="submit"
            className="rounded-full bg-primary-strong px-5 py-2 text-sm font-semibold text-white hover:bg-primary-deep"
          >
            Add batch
          </button>
        </div>
      </form>

      <div className="mt-8 overflow-x-auto rounded-2xl border border-border">
        {list.length === 0 ? (
          <p className="bg-surface p-6 text-sm text-ink-muted">No batches yet. Add one above.</p>
        ) : (
          <table className="w-full min-w-[860px] text-left text-sm">
            <thead className="border-b border-border bg-surface text-xs uppercase tracking-wide text-ink-muted">
              <tr>
                <th className="px-4 py-3 font-semibold">Name</th>
                <th className="px-4 py-3 font-semibold">Class</th>
                <th className="px-4 py-3 font-semibold">Year</th>
                <th className="px-4 py-3 font-semibold">Timing</th>
                <th className="px-4 py-3 font-semibold">Days</th>
                <th className="px-4 py-3 font-semibold">Students</th>
                <th className="px-4 py-3 font-semibold">Actions</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {list.map((b) => {
                const count = countByBatch[b.id] ?? 0;
                return (
                  <tr key={b.id}>
                    <td className="px-4 py-3 font-medium text-ink">{b.name}</td>
                    <td className="px-4 py-3 text-ink-muted">{b.class ?? "-"}</td>
                    <td className="px-4 py-3">
                      {b.academic_year ? (
                        <span
                          className={
                            b.academic_year === thisYear
                              ? "rounded-full bg-primary-tint px-2.5 py-0.5 text-xs font-medium text-primary-strong"
                              : "text-ink-muted"
                          }
                        >
                          {b.academic_year}
                          {b.academic_year === thisYear ? " · now" : ""}
                        </span>
                      ) : (
                        <span className="text-ink-muted">-</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-ink-muted">{b.timing ?? "-"}</td>
                    <td className="px-4 py-3 text-ink-muted">{b.days ?? "-"}</td>
                    <td className="px-4 py-3 text-ink-muted">
                      {count}
                      {b.capacity != null ? ` / ${b.capacity}` : ""}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-2.5 text-sm">
                        <Link href={`/admin/students?batch=${b.id}`} className="font-medium text-primary-strong hover:underline">
                          Students
                        </Link>
                        <Link href={`/admin/attendance?batch=${b.id}`} className="text-ink-muted hover:text-ink">
                          Attendance
                        </Link>
                        <Link href={`/admin/fees?batch=${b.id}`} className="text-ink-muted hover:text-ink">
                          Fees
                        </Link>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <form action={deleteBatch}>
                        <input type="hidden" name="id" value={b.id} />
                        <button
                          type="submit"
                          title="Delete batch"
                          className="inline-flex items-center rounded-lg px-2 py-1 text-sm text-ink-muted hover:text-error"
                        >
                          <Trash2 size={15} strokeWidth={1.75} />
                        </button>
                      </form>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
