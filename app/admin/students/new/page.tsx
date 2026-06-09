import { createClient } from "@/lib/supabase/server";
import StudentForm from "@/components/admin/StudentForm";
import { createStudent } from "../actions";

export const dynamic = "force-dynamic";
export const metadata = { title: "Add student", robots: { index: false, follow: false } };

export default async function Page() {
  const supabase = await createClient();
  const { data: batches } = await supabase.from("batches").select("id, name").order("name");

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <h1 className="font-heading text-2xl font-bold text-ink">Add student</h1>
      <StudentForm batches={batches ?? []} action={createStudent} submitLabel="Add student" />
    </main>
  );
}
