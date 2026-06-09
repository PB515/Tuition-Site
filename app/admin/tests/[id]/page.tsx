import { notFound } from "next/navigation";
import { Trash2 } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { saveMarks, deleteTest } from "../actions";

export const dynamic = "force-dynamic";
export const metadata = { title: "Test marks", robots: { index: false, follow: false } };

const field =
  "w-full rounded-lg border border-border bg-bg px-3 py-2 text-sm text-ink focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30";

type Student = { id: string; name: string; parent_whatsapp: string | null };

function waLink(
  name: string,
  obtained: number,
  total: number | null,
  testName: string,
  remark: string | null,
  phone: string,
) {
  let msg = `Hello, ${name} scored ${obtained}${total != null ? `/${total}` : ""} in ${testName} at Inspire Academy of Mathematics.`;
  if (remark) msg += ` Focus area: ${remark}.`;
  return `https://wa.me/91${phone}?text=${encodeURIComponent(msg)}`;
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: test } = await supabase
    .from("tests")
    .select("*, batches(name)")
    .eq("id", id)
    .single();
  if (!test) notFound();

  let students: Student[] = [];
  const markMap: Record<string, { marks: number | null; remark: string | null }> = {};

  if (test.batch_id) {
    const { data: studs } = await supabase
      .from("students")
      .select("id, name, parent_whatsapp")
      .eq("batch_id", test.batch_id)
      .eq("active", true)
      .order("name");
    students = (studs ?? []) as Student[];

    if (students.length) {
      const { data: marks } = await supabase
        .from("marks")
        .select("student_id, marks_obtained, remark")
        .eq("test_id", id);
      (marks ?? []).forEach((m: { student_id: string; marks_obtained: number | null; remark: string | null }) => {
        markMap[m.student_id] = { marks: m.marks_obtained, remark: m.remark };
      });
    }
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <h1 className="font-heading text-2xl font-bold text-ink">{test.name}</h1>
      <p className="mt-1 text-sm text-ink-muted">
        {[test.date, test.batches?.name, test.total_marks != null ? `Total ${test.total_marks}` : null, test.syllabus]
          .filter(Boolean)
          .join("  ·  ") || "No details"}
      </p>

      {!test.batch_id ? (
        <p className="mt-8 rounded-2xl border border-border bg-surface p-6 text-sm text-ink-muted">
          This test has no batch assigned, so there are no students to mark. Create the test with a
          batch to enter marks.
        </p>
      ) : students.length === 0 ? (
        <p className="mt-8 rounded-2xl border border-border bg-surface p-6 text-sm text-ink-muted">
          No active students in this batch.
        </p>
      ) : (
        <form action={saveMarks} className="mt-8">
          <input type="hidden" name="test_id" value={id} />
          <div className="overflow-x-auto rounded-2xl border border-border">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="border-b border-border bg-surface text-xs uppercase tracking-wide text-ink-muted">
                <tr>
                  <th className="px-4 py-3 font-semibold">Student</th>
                  <th className="px-4 py-3 font-semibold">Marks</th>
                  <th className="px-4 py-3 font-semibold">Focus area</th>
                  <th className="px-4 py-3 font-semibold">Notify</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {students.map((st) => {
                  const saved = markMap[st.id];
                  return (
                    <tr key={st.id}>
                      <td className="px-4 py-3 font-medium text-ink">{st.name}</td>
                      <td className="px-4 py-3">
                        <input
                          name={`m_${st.id}`}
                          type="number"
                          min="0"
                          max={test.total_marks ?? undefined}
                          defaultValue={saved?.marks ?? ""}
                          className={`${field} max-w-[110px]`}
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          name={`r_${st.id}`}
                          defaultValue={saved?.remark ?? ""}
                          className={field}
                          placeholder="optional"
                        />
                      </td>
                      <td className="px-4 py-3">
                        {saved && saved.marks != null && st.parent_whatsapp ? (
                          <a
                            href={waLink(
                              st.name,
                              saved.marks,
                              test.total_marks,
                              test.name,
                              saved.remark,
                              st.parent_whatsapp,
                            )}
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
            Save marks
          </button>
        </form>
      )}

      <form action={deleteTest} className="mt-10 border-t border-border pt-6">
        <input type="hidden" name="id" value={id} />
        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-full border border-error/40 px-4 py-2 text-sm font-medium text-error hover:bg-error/5"
        >
          <Trash2 size={15} strokeWidth={1.75} /> Delete test
        </button>
      </form>
    </main>
  );
}
