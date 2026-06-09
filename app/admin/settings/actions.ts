"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function saveSettings(formData: FormData) {
  const supabase = await createClient();
  const fee = String(formData.get("default_monthly_fee") || "").trim();
  await supabase
    .from("app_settings")
    .update({
      academy_name: String(formData.get("academy_name") || "").trim() || null,
      academy_phone: String(formData.get("academy_phone") || "").trim() || null,
      academy_address: String(formData.get("academy_address") || "").trim() || null,
      default_monthly_fee: fee ? Number(fee) : null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", 1);
  revalidatePath("/admin/settings");
}
