"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

function parseStudent(formData: FormData) {
  const digits = String(formData.get("parent_whatsapp") || "").replace(/\D/g, "");
  return {
    name: String(formData.get("name") || "").trim(),
    parent_name: String(formData.get("parent_name") || "").trim() || null,
    parent_whatsapp: digits || null,
    class: String(formData.get("class") || "").trim() || null,
    board: String(formData.get("board") || "").trim() || null,
    school: String(formData.get("school") || "").trim() || null,
    batch_id: String(formData.get("batch_id") || "") || null,
    admission_date: String(formData.get("admission_date") || "") || null,
    active: formData.get("active") === "on",
    remarks: String(formData.get("remarks") || "").trim() || null,
  };
}

export async function createStudent(formData: FormData) {
  const data = parseStudent(formData);
  if (!data.name) return;
  const supabase = await createClient();
  await supabase.from("students").insert(data);
  revalidatePath("/admin/students");
  redirect("/admin/students");
}

export async function updateStudent(formData: FormData) {
  const id = String(formData.get("id") || "");
  if (!id) return;
  const data = parseStudent(formData);
  const supabase = await createClient();
  await supabase.from("students").update(data).eq("id", id);
  revalidatePath("/admin/students");
  redirect("/admin/students");
}

export async function deleteStudent(formData: FormData) {
  const id = String(formData.get("id") || "");
  if (!id) return;
  const supabase = await createClient();
  await supabase.from("students").delete().eq("id", id);
  revalidatePath("/admin/students");
  redirect("/admin/students");
}
