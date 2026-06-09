"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function createBatch(formData: FormData) {
  const name = String(formData.get("name") || "").trim();
  if (!name) return;
  const supabase = await createClient();
  const days = formData.getAll("days").map(String).filter(Boolean).join(", ");
  const capacity = String(formData.get("capacity") || "").trim();
  await supabase.from("batches").insert({
    name,
    class: String(formData.get("class") || "").trim() || null,
    timing: String(formData.get("timing") || "").trim() || null,
    days: days || null,
    capacity: capacity ? Number(capacity) : null,
  });
  revalidatePath("/admin/batches");
}

export async function deleteBatch(formData: FormData) {
  const id = String(formData.get("id") || "");
  if (!id) return;
  const supabase = await createClient();
  await supabase.from("batches").delete().eq("id", id);
  revalidatePath("/admin/batches");
}
