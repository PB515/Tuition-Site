"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function createTest(formData: FormData) {
  const name = String(formData.get("name") || "").trim();
  if (!name) return;
  const supabase = await createClient();
  const total = formData.get("total_marks");
  const { data } = await supabase
    .from("tests")
    .insert({
      name,
      date: String(formData.get("date") || "") || null,
      batch_id: String(formData.get("batch_id") || "") || null,
      total_marks: total && String(total).trim() !== "" ? Number(total) : null,
      syllabus: String(formData.get("syllabus") || "").trim() || null,
    })
    .select("id")
    .single();
  revalidatePath("/admin/tests");
  if (data?.id) redirect(`/admin/tests/${data.id}`);
}

export async function deleteTest(formData: FormData) {
  const id = String(formData.get("id") || "");
  if (!id) return;
  const supabase = await createClient();
  await supabase.from("tests").delete().eq("id", id);
  revalidatePath("/admin/tests");
  redirect("/admin/tests");
}

export async function saveMarks(
  testId: string,
  rows: { student_id: string; marks: number | null; status: string; remark: string | null }[],
) {
  if (!testId || !rows.length) return { ok: false };
  const clean = rows.map((r) => ({
    test_id: testId,
    student_id: r.student_id,
    marks_obtained: r.marks,
    status: r.status || null,
    remark: r.remark?.trim() || null,
  }));
  const supabase = await createClient();
  const { error } = await supabase.from("marks").upsert(clean, { onConflict: "test_id,student_id" });
  if (error) return { ok: false, error: error.message };
  revalidatePath(`/admin/tests/${testId}`);
  return { ok: true };
}
