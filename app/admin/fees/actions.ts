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
  revalidatePath(`/admin/students/${student_id}`);
}

export async function createFeesForBatch(formData: FormData) {
  const batch_id = String(formData.get("batch_id") || "");
  if (!batch_id) return;
  const month = String(formData.get("month") || "").trim() || null;
  const amountRaw = formData.get("amount");
  const amount = amountRaw && String(amountRaw).trim() !== "" ? Number(amountRaw) : null;
  const due_date = String(formData.get("due_date") || "") || null;

  const supabase = await createClient();
  const { data: students } = await supabase
    .from("students")
    .select("id")
    .eq("batch_id", batch_id)
    .eq("active", true);

  const rows = ((students ?? []) as { id: string }[]).map((s) => ({
    student_id: s.id,
    month,
    amount,
    due_date,
    paid: false,
  }));
  if (rows.length) await supabase.from("fees").insert(rows);
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
