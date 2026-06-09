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

export async function saveMarks(formData: FormData) {
  const testId = String(formData.get("test_id") || "");
  if (!testId) return;

  const studentIds = new Set<string>();
  for (const [key] of formData.entries()) {
    if (key.startsWith("m_")) studentIds.add(key.slice(2));
    if (key.startsWith("r_")) studentIds.add(key.slice(2));
  }

  const rows = Array.from(studentIds).map((sid) => {
    const m = formData.get(`m_${sid}`);
    const remark = String(formData.get(`r_${sid}`) || "").trim();
    const obtained = m !== null && String(m).trim() !== "" ? Number(m) : null;
    return { test_id: testId, student_id: sid, marks_obtained: obtained, remark: remark || null };
  });

  if (rows.length) {
    const supabase = await createClient();
    await supabase.from("marks").upsert(rows, { onConflict: "test_id,student_id" });
  }
  revalidatePath(`/admin/tests/${testId}`);
}
