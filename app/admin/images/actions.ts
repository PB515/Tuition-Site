"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

const BUCKET = "site-images";

async function requireStaff() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;
  const { data: staffRow } = await supabase
    .from("staff")
    .select("user_id")
    .eq("user_id", user.id)
    .maybeSingle();
  return staffRow ? supabase : null;
}

export async function uploadSiteImage(formData: FormData) {
  const slot = String(formData.get("slot") || "");
  const file = formData.get("file");
  if (!slot || !(file instanceof File) || file.size === 0) return { error: "No file selected." };
  if (!file.type.startsWith("image/")) return { error: "Please choose an image file." };
  if (file.size > 5 * 1024 * 1024) return { error: "Image must be under 5 MB." };

  const supabase = await requireStaff();
  if (!supabase) return { error: "Staff only." };

  const ext = (file.name.split(".").pop() || "jpg").toLowerCase().replace(/[^a-z0-9]/g, "") || "jpg";
  const path = `${slot.replace(/\//g, "_")}-${Date.now()}.${ext}`;
  const bytes = new Uint8Array(await file.arrayBuffer());

  const { error: upErr } = await supabase.storage
    .from(BUCKET)
    .upload(path, bytes, { contentType: file.type, upsert: true });
  if (upErr) return { error: upErr.message };

  const { data: existing } = await supabase
    .from("site_images")
    .select("path")
    .eq("slot", slot)
    .maybeSingle();
  if (existing?.path && existing.path !== path) {
    await supabase.storage.from(BUCKET).remove([existing.path]);
  }
  await supabase.from("site_images").upsert({ slot, path, updated_at: new Date().toISOString() });

  revalidatePath("/admin/images");
  revalidatePath("/", "layout");
  return { ok: true };
}

export async function removeSiteImage(slot: string) {
  if (!slot) return;
  const supabase = await requireStaff();
  if (!supabase) return;
  const { data: existing } = await supabase
    .from("site_images")
    .select("path")
    .eq("slot", slot)
    .maybeSingle();
  if (existing?.path) await supabase.storage.from(BUCKET).remove([existing.path]);
  await supabase.from("site_images").delete().eq("slot", slot);
  revalidatePath("/admin/images");
  revalidatePath("/", "layout");
}
