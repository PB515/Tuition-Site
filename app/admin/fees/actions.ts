"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function createFee(formData: FormData) {
  const student_id = String(formData.get("student_id") || "");
  if (!student_id) return;
  const amount = formData.get("amount");
  const supabase = await createClient();
  await supabase.from("fees").insert({
    student_id,
    month: String(formData.get("month") || "").trim() || null,
    amount: amount && String(amount).trim() !== "" ? Number(amount) : null,
    due_date: String(formData.get("due_date") || "") || null,
    paid: false,
  });
  revalidatePath("/admin/fees");
}

export async function togglePaid(formData: FormData) {
  const id = String(formData.get("id") || "");
  const paid = String(formData.get("paid") || "") === "true";
  if (!id) return;
  const supabase = await createClient();
  await supabase.from("fees").update({ paid: !paid }).eq("id", id);
  revalidatePath("/admin/fees");
}

export async function deleteFee(formData: FormData) {
  const id = String(formData.get("id") || "");
  if (!id) return;
  const supabase = await createClient();
  await supabase.from("fees").delete().eq("id", id);
  revalidatePath("/admin/fees");
}
