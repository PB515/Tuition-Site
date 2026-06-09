import { createClient } from "@/lib/supabase/server";
import AttendanceGrid from "@/components/admin/AttendanceGrid";

export const dynamic = "force-dynamic";
export const metadata = { title: "Attendance", robots: { index: false, follow: false } };

const field =
  "w-full rounded-lg border border-border bg-bg px-3 py-2 text-sm text-ink focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30";

type Batch = { id: string; name: string };
type Student = {
  id: string;
  name: string;
  roll_number: string | null;
  parent_whatsapp: string | null;
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ batch?: string; date?: string }>;
}) {
  const sp = await searchParams;
  const supabase = await createClient();

  const { data: batches } = await supabase.from("batches").select("id, name").order("name");
  const batchList = (batches ?? []) as Batch[];

  const today = new Date().toISOString().slice(0, 10);
  const batchId = sp.batch ?? "";
  const date = sp.date ?? today;

  let students: Student[] = [];
  const saved: Record<string, { status: string; note: string | null }> = {};

  if (batchId) {
    const { data: studs } = await supabase
      .from("students")
      .select("id, name, roll_number, parent_whatsapp")
      .eq("batch_id", batchId)
      .eq("active", true)
      .order("roll_number", { nullsFirst: false })
      .order("name");
    students = (studs ?? []) as Student[];

    if (students.length) {
      const { data: att } = await supabase
        .from("attendance")
        .select("student_id, status, note")
        .eq("date", date)
        .in(
          "student_id",
          students.map((s) => s.id),
        );
      (att ?? []).forEach((a: { student_id: string; status: string; note: string | null }) => {
        saved[a.student_id] = { status: a.status, note: a.note };
      });
    }
  }

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="font-heading text-2xl font-bold text-ink">Attendance</h1>

      <form
        method="get"
        className="mt-6 grid max-w-xl gap-3 rounded-2xl border border-border bg-surface p-4 sm:grid-cols-[1fr_1fr_auto] sm:items-end"
      >
        <label className="block text-sm">
          <span className="font-medium text-ink">Date</span>
          <input type="date" name="date" defaultValue={date} className={`mt-1 ${field}`} />
        </label>
        <label className="block text-sm">
          <span className="font-medium text-ink">Batch</span>
          <select name="batch" defaultValue={batchId} className={`mt-1 ${field}`}>
            <option value="">Select a batch</option>
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
          Load
        </button>
      </form>

      {batchId && students.length === 0 && (
        <p className="mt-8 rounded-2xl border border-border bg-surface p-6 text-sm text-ink-muted">
          No active students in this batch.
        </p>
      )}

      {batchId && students.length > 0 && (
        <AttendanceGrid batchId={batchId} date={date} students={students} saved={saved} />
      )}
    </div>
  );
}
