import { createClient } from "@/lib/supabase/server";
import { saveAttendance } from "./actions";

export const dynamic = "force-dynamic";
export const metadata = { title: "Attendance", robots: { index: false, follow: false } };

const field =
  "w-full rounded-lg border border-border bg-bg px-3 py-2 text-sm text-ink focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30";

const STATUS = [
  { v: "present", l: "Present" },
  { v: "absent", l: "Absent" },
  { v: "late", l: "Late" },
  { v: "leave", l: "Leave" },
];

function waLink(name: string, status: string, date: string, phone: string) {
  const d = new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  const messages: Record<string, string> = {
    present: `Hello, ${name} attended today's Maths class at Inspire Academy of Mathematics (${d}).`,
    absent: `Hello, ${name} was absent from today's Maths class at Inspire Academy of Mathematics (${d}). Please contact us if this was planned.`,
    late: `Hello, ${name} arrived late to today's Maths class at Inspire Academy of Mathematics (${d}).`,
    leave: `Hello, ${name} was on leave from today's Maths class at Inspire Academy of Mathematics (${d}).`,
  };
  return `https://wa.me/91${phone}?text=${encodeURIComponent(messages[status] ?? messages.present)}`;
}

type Batch = { id: string; name: string };
type Student = { id: string; name: string; parent_whatsapp: string | null };

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
  const attMap: Record<string, string> = {};

  if (batchId) {
    const { data: studs } = await supabase
      .from("students")
      .select("id, name, parent_whatsapp")
      .eq("batch_id", batchId)
      .eq("active", true)
      .order("name");
    students = (studs ?? []) as Student[];

    if (students.length) {
      const { data: att } = await supabase
        .from("attendance")
        .select("student_id, status")
        .eq("date", date)
        .in(
          "student_id",
          students.map((s) => s.id),
        );
      (att ?? []).forEach((a: { student_id: string; status: string }) => {
        attMap[a.student_id] = a.status;
      });
    }
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <h1 className="font-heading text-2xl font-bold text-ink">Attendance</h1>

      <form
        method="get"
        className="mt-6 grid gap-3 rounded-2xl border border-border bg-surface p-4 sm:grid-cols-[1fr_1fr_auto] sm:items-end"
      >
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
        <label className="block text-sm">
          <span className="font-medium text-ink">Date</span>
          <input type="date" name="date" defaultValue={date} className={`mt-1 ${field}`} />
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
        <form action={saveAttendance} className="mt-8">
          <input type="hidden" name="batch" value={batchId} />
          <input type="hidden" name="date" value={date} />
          <div className="overflow-x-auto rounded-2xl border border-border">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead className="border-b border-border bg-surface text-xs uppercase tracking-wide text-ink-muted">
                <tr>
                  <th className="px-4 py-3 font-semibold">Student</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 font-semibold">Notify parent</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {students.map((st) => {
                  const saved = attMap[st.id];
                  return (
                    <tr key={st.id}>
                      <td className="px-4 py-3 font-medium text-ink">{st.name}</td>
                      <td className="px-4 py-3">
                        <select
                          name={`s_${st.id}`}
                          defaultValue={saved ?? "present"}
                          className={`${field} max-w-[150px]`}
                        >
                          {STATUS.map((s) => (
                            <option key={s.v} value={s.v}>
                              {s.l}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="px-4 py-3">
                        {saved && st.parent_whatsapp ? (
                          <a
                            href={waLink(st.name, saved, date, st.parent_whatsapp)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm font-medium text-primary-strong hover:underline"
                          >
                            WhatsApp
                          </a>
                        ) : (
                          <span className="text-sm text-ink-muted">
                            {!st.parent_whatsapp ? "no number" : "save first"}
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <button
            type="submit"
            className="mt-6 rounded-full bg-primary-strong px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary-deep"
          >
            Save attendance
          </button>
        </form>
      )}
    </main>
  );
}
