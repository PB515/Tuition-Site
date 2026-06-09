import { notFound } from "next/navigation";
import { Trash2 } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import StudentForm from "@/components/admin/StudentForm";
import { updateStudent, deleteStudent } from "../actions";

export const dynamic = "force-dynamic";
export const metadata = { title: "Edit student", robots: { index: false, follow: false } };

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: student } = await supabase.from("students").select("*").eq("id", id).single();
  if (!student) notFound();

  const { data: batches } = await supabase.from("batches").select("id, name").order("name");

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <h1 className="font-heading text-2xl font-bold text-ink">Edit student</h1>
      <StudentForm
        student={student}
        batches={batches ?? []}
        action={updateStudent}
        submitLabel="Save changes"
      />

      <form action={deleteStudent} className="mt-8 border-t border-border pt-6">
        <input type="hidden" name="id" value={id} />
        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-full border border-error/40 px-4 py-2 text-sm font-medium text-error hover:bg-error/5"
        >
          <Trash2 size={15} strokeWidth={1.75} /> Delete student
        </button>
      </form>
    </main>
  );
}
