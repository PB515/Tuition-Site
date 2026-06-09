"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function createTemplate(formData: FormData) {
  const name = String(formData.get("name") || "").trim();
  const body = String(formData.get("body") || "").trim();
  if (!name || !body) return;
  const supabase = await createClient();
  await supabase.from("message_templates").insert({ name, body });
  revalidatePath("/admin/messages");
}

export async function deleteTemplate(formData: FormData) {
  const id = String(formData.get("id") || "");
  if (!id) return;
  const supabase = await createClient();
  await supabase.from("message_templates").delete().eq("id", id);
  revalidatePath("/admin/messages");
}
