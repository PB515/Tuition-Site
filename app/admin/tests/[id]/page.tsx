import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Trash2 } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { deleteTest } from "../actions";
import MarksGrid from "@/components/admin/MarksGrid";

export const dynamic = "force-dynamic";
export const metadata = { title: "Test marks", robots: { index: false, follow: false } };

type Student = { id: string; name: string; parent_whatsapp: string | null };

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: test } = await supabase.from("tests").select("*, batches(name)").eq("id", id).single();
  if (!test) notFound();

  let students: Student[] = [];
  const saved: Record<string, { marks: number | null; status: string | null; remark: string | null }> = {};

  if (test.batch_id) {
    const { data: studs } = await supabase
      .from("students")
      .select("id, name, parent_whatsapp")
      .eq("batch_id", test.batch_id)
      .eq("active", true)
      .order("roll_number", { nullsFirst: false })
      .order("name");
    students = (studs ?? []) as Student[];

    if (students.length) {
      const { data: marks } = await supabase
        .from("marks")
        .select("student_id, marks_obtained, status, remark")
        .eq("test_id", id);
      (marks ?? []).forEach(
        (m: { student_id: string; marks_obtained: number | null; status: string | null; remark: string | null }) => {
          saved[m.student_id] = { marks: m.marks_obtained, status: m.status, remark: m.remark };
        },
      );
    }
  }

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      <Link
        href="/admin/tests"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-muted hover:text-primary-strong"
      >
        <ArrowLeft size={15} strokeWidth={2} /> Tests & Marks
      </Link>
      <h1 className="mt-4 font-heading text-2xl font-bold text-ink">{test.name}</h1>
      <p className="mt-1 text-sm text-ink-muted">
        {[test.date, test.batches?.name, test.total_marks != null ? `Total ${test.total_marks}` : null, test.syllabus]
          .filter(Boolean)
          .join("  ·  ") || "No details"}
      </p>

      {!test.batch_id ? (
        <p className="mt-8 rounded-2xl border border-border bg-surface p-6 text-sm text-ink-muted">
          This test has no batch assigned, so there are no students to mark.
        </p>
      ) : students.length === 0 ? (
        <p className="mt-8 rounded-2xl border border-border bg-surface p-6 text-sm text-ink-muted">
          No active students in this batch.
        </p>
      ) : (
        <MarksGrid
          testId={id}
          testName={test.name}
          totalMarks={test.total_marks}
          students={students}
          saved={saved}
        />
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
    </div>
  );
}
