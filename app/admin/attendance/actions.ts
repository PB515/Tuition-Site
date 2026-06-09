"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

const VALID = ["present", "absent", "late", "leave"];

export async function saveAttendance(formData: FormData) {
  const date = String(formData.get("date") || "");
  if (!date) return;

  const rows: { student_id: string; date: string; status: string }[] = [];
  for (const [key, value] of formData.entries()) {
    if (key.startsWith("s_")) {
      const status = String(value);
      if (VALID.includes(status)) {
        rows.push({ student_id: key.slice(2), date, status });
      }
    }
  }

  if (rows.length) {
    const supabase = await createClient();
    await supabase.from("attendance").upsert(rows, { onConflict: "student_id,date" });
  }
  revalidatePath("/admin/attendance");
}
