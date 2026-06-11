"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

// Single fee (from the student profile or the fees page picker).
export async function createFee(formData: FormData) {
  const student_id = String(formData.get("student_id") || "");
  if (!student_id) return;
  const supabase = await createClient();
  const { data: stu } = await supabase
    .from("students")
    .select("batch_id")
    .eq("id", student_id)
    .maybeSingle();
  const amount = formData.get("amount");
  await supabase.from("fees").upsert(
    {
      student_id,
      batch_id: stu?.batch_id ?? null,
      month: String(formData.get("month") || "").trim() || null,
      amount: amount && String(amount).trim() !== "" ? Number(amount) : null,
      due_date: String(formData.get("due_date") || "") || null,
      paid: false,
    },
    { onConflict: "student_id,month", ignoreDuplicates: true },
  );
  revalidatePath("/admin/fees");
  revalidatePath(`/admin/students/${student_id}`);
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

// Preview before generating a month's fees for a batch.
export async function previewFees(month: string, batchId: string) {
  if (!month || !batchId) return { totalActive: 0, alreadyGenerated: 0, toCreate: 0 };
  const supabase = await createClient();
  const { data: students } = await supabase
    .from("students")
    .select("id")
    .eq("batch_id", batchId)
    .eq("active", true);
  const ids = (students ?? []).map((s) => s.id);
  const totalActive = ids.length;
  if (!totalActive) return { totalActive: 0, alreadyGenerated: 0, toCreate: 0 };
  const { data: existing } = await supabase
    .from("fees")
    .select("student_id")
    .eq("month", month)
    .in("student_id", ids);
  const alreadyGenerated = (existing ?? []).length;
  return { totalActive, alreadyGenerated, toCreate: totalActive - alreadyGenerated };
}

export async function generateFees(
  month: string,
  batchId: string,
  amount: number | null,
  dueDate: string | null,
) {
  if (!month || !batchId) return { ok: false, created: 0 };
  const supabase = await createClient();
  const { data: students } = await supabase
    .from("students")
    .select("id")
    .eq("batch_id", batchId)
    .eq("active", true);
  const ids = (students ?? []).map((s) => s.id);
  if (!ids.length) return { ok: true, created: 0 };
  const { data: existing } = await supabase
    .from("fees")
    .select("student_id")
    .eq("month", month)
    .in("student_id", ids);
  const have = new Set((existing ?? []).map((e) => e.student_id));
  const toCreate = ids.filter((id) => !have.has(id));
  if (toCreate.length) {
    const rows = toCreate.map((id) => ({
      student_id: id,
      batch_id: batchId,
      month,
      amount,
      due_date: dueDate,
      paid: false,
    }));
    await supabase.from("fees").insert(rows);
  }
  revalidatePath("/admin/fees");
  return { ok: true, created: toCreate.length };
}

export async function bulkMarkPaid(ids: string[], paid: boolean) {
  if (!ids.length) return;
  const supabase = await createClient();
  await supabase
    .from("fees")
    .update({ paid, paid_at: paid ? new Date().toISOString() : null })
    .in("id", ids);
  revalidatePath("/admin/fees");
}

export async function bulkMarkReminded(ids: string[]) {
  if (!ids.length) return;
  const supabase = await createClient();
  await supabase.from("fees").update({ reminded_at: new Date().toISOString() }).in("id", ids);
  revalidatePath("/admin/fees");
}

export async function bulkDeleteFees(ids: string[]) {
  if (!ids.length) return;
  const supabase = await createClient();
  await supabase.from("fees").delete().in("id", ids);
  revalidatePath("/admin/fees");
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const pad = (n: number) => String(n).padStart(2, "0");

// Split a student's total into installments spaced by intervalMonths, starting at startDate.
export async function generateFeePlan(
  studentId: string,
  total: number,
  count: number,
  startDate: string,
  intervalMonths: number,
) {
  if (!studentId || !total || !count || count < 1 || !startDate) return { created: 0 };
  const [y, m, d] = startDate.split("-").map(Number);
  if (!y || !m || !d) return { created: 0 };

  const supabase = await createClient();
  const { data: stu } = await supabase.from("students").select("batch_id").eq("id", studentId).maybeSingle();

  const base = Math.floor(total / count);
  const rows = [];
  for (let i = 0; i < count; i++) {
    const dt = new Date(y, m - 1 + i * intervalMonths, d);
    const amount = i < count - 1 ? base : total - base * (count - 1);
    rows.push({
      student_id: studentId,
      batch_id: stu?.batch_id ?? null,
      month: `${MONTHS[dt.getMonth()]} ${dt.getFullYear()}`,
      amount,
      due_date: `${dt.getFullYear()}-${pad(dt.getMonth() + 1)}-${pad(dt.getDate())}`,
      paid: false,
    });
  }
  const { error } = await supabase
    .from("fees")
    .upsert(rows, { onConflict: "student_id,month", ignoreDuplicates: true });
  revalidatePath(`/admin/students/${studentId}`);
  revalidatePath("/admin/fees");
  return { created: error ? 0 : rows.length };
}
