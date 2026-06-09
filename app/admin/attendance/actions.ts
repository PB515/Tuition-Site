"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

const VALID = ["present", "absent", "late", "leave"];

export async function saveAttendance(
  batchId: string,
  date: string,
  rows: { student_id: string; status: string; note?: string }[],
) {
  if (!date) return { ok: false, error: "Missing date." };
  const clean = rows
    .filter((r) => VALID.includes(r.status))
    .map((r) => ({
      student_id: r.student_id,
      date,
      status: r.status,
      note: r.note?.trim() || null,
      batch_id: batchId || null,
    }));

  if (clean.length) {
    const supabase = await createClient();
    const { error } = await supabase
      .from("attendance")
      .upsert(clean, { onConflict: "student_id,date" });
    if (error) return { ok: false, error: error.message };
  }
  revalidatePath("/admin/attendance");
  return { ok: true };
}

export async function markNotified(batchId: string, date: string) {
  const supabase = await createClient();
  await supabase
    .from("attendance")
    .update({ notified_at: new Date().toISOString() })
    .eq("date", date)
    .eq("batch_id", batchId)
    .in("status", ["absent", "late"]);
  revalidatePath("/admin/attendance");
  return { ok: true };
}
