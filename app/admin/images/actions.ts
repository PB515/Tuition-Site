"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

const BUCKET = "site-images";

// Verify the caller is staff using THEIR session (RLS-scoped client).
async function isStaff() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return false;
  const { data } = await supabase
    .from("staff")
    .select("user_id")
    .eq("user_id", user.id)
    .maybeSingle();
  return !!data;
}

export async function uploadSiteImage(formData: FormData) {
  const slot = String(formData.get("slot") || "");
  const file = formData.get("file");
  if (!slot || !(file instanceof File) || file.size === 0) return { error: "No file selected." };
  if (!file.type.startsWith("image/")) return { error: "Please choose an image file." };
  if (file.size > 5 * 1024 * 1024) return { error: "Image must be under 5 MB." };

  if (!(await isStaff())) return { error: "Staff only." };

  // Staff verified above. Do the actual writes with the service-role client so
  // they are not blocked by storage / table RLS policies.
  const admin = createAdminClient();
  // Ensure the bucket allows public read (no-op if already public).
  await admin.storage.updateBucket(BUCKET, { public: true });

  const ext = (file.name.split(".").pop() || "jpg").toLowerCase().replace(/[^a-z0-9]/g, "") || "jpg";
  const path = `${slot.replace(/\//g, "_")}-${Date.now()}.${ext}`;
  const bytes = new Uint8Array(await file.arrayBuffer());

  const { error: upErr } = await admin.storage
    .from(BUCKET)
    .upload(path, bytes, { contentType: file.type, upsert: true });
  if (upErr) return { error: upErr.message };

  const { data: existing } = await admin
    .from("site_images")
    .select("path")
    .eq("slot", slot)
    .maybeSingle();
  if (existing?.path && existing.path !== path) {
    await admin.storage.from(BUCKET).remove([existing.path]);
  }
  const { error: dbErr } = await admin
    .from("site_images")
    .upsert({ slot, path, updated_at: new Date().toISOString() });
  if (dbErr) return { error: dbErr.message };

  revalidatePath("/admin/images");
  revalidatePath("/", "layout");
  return { ok: true };
}

export async function removeSiteImage(slot: string) {
  if (!slot) return;
  if (!(await isStaff())) return;

  const admin = createAdminClient();
  const { data: existing } = await admin
    .from("site_images")
    .select("path")
    .eq("slot", slot)
    .maybeSingle();
  if (existing?.path) await admin.storage.from(BUCKET).remove([existing.path]);
  await admin.from("site_images").delete().eq("slot", slot);

  revalidatePath("/admin/images");
  revalidatePath("/", "layout");
}
