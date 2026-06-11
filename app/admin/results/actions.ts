"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

const BUCKET = "site-images";

async function staffClient() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;
  const { data: s } = await supabase
    .from("staff")
    .select("user_id")
    .eq("user_id", user.id)
    .maybeSingle();
  return s ? supabase : null;
}

type SC = Awaited<ReturnType<typeof createClient>>;

async function uploadImage(supabase: SC, file: File | null) {
  if (!file || !(file instanceof File) || file.size === 0) return null;
  if (!file.type.startsWith("image/") || file.size > 5 * 1024 * 1024) return null;
  const ext = (file.name.split(".").pop() || "jpg").toLowerCase().replace(/[^a-z0-9]/g, "") || "jpg";
  const path = `results/${Date.now()}-${Math.round(Math.random() * 1e6)}.${ext}`;
  const bytes = new Uint8Array(await file.arrayBuffer());
  const { error } = await supabase.storage.from(BUCKET).upload(path, bytes, { contentType: file.type });
  return error ? null : path;
}

function fields(formData: FormData) {
  return {
    title: String(formData.get("title") || "").trim(),
    description: String(formData.get("description") || "").trim() || null,
    student_name: String(formData.get("student_name") || "").trim() || null,
    marks: String(formData.get("marks") || "").trim() || null,
    class_course: String(formData.get("class_course") || "").trim() || null,
    school: String(formData.get("school") || "").trim() || null,
    year: String(formData.get("year") || "").trim() || null,
    published: formData.get("published") === "on",
    sort_order: Number(formData.get("sort_order") || "0") || 0,
  };
}

export async function createResult(formData: FormData) {
  const supabase = await staffClient();
  if (!supabase) return;
  const f = fields(formData);
  if (!f.title) return;
  const image_path = await uploadImage(supabase, formData.get("file") as File | null);
  await supabase.from("results").insert({ ...f, image_path });
  revalidatePath("/admin/results");
  revalidatePath("/results");
  redirect("/admin/results");
}

export async function updateResult(formData: FormData) {
  const supabase = await staffClient();
  if (!supabase) return;
  const id = String(formData.get("id") || "");
  if (!id) return;
  const update: Record<string, unknown> = { ...fields(formData) };
  const file = formData.get("file") as File | null;
  if (file instanceof File && file.size > 0) {
    const path = await uploadImage(supabase, file);
    if (path) {
      const { data: old } = await supabase.from("results").select("image_path").eq("id", id).maybeSingle();
      if (old?.image_path) await supabase.storage.from(BUCKET).remove([old.image_path]);
      update.image_path = path;
    }
  }
  await supabase.from("results").update(update).eq("id", id);
  revalidatePath("/admin/results");
  revalidatePath("/results");
  redirect("/admin/results");
}

export async function deleteResult(formData: FormData) {
  const supabase = await staffClient();
  if (!supabase) return;
  const id = String(formData.get("id") || "");
  if (!id) return;
  const { data: old } = await supabase.from("results").select("image_path").eq("id", id).maybeSingle();
  if (old?.image_path) await supabase.storage.from(BUCKET).remove([old.image_path]);
  await supabase.from("results").delete().eq("id", id);
  revalidatePath("/admin/results");
  revalidatePath("/results");
}

export async function deleteAllResults() {
  const supabase = await staffClient();
  if (!supabase) return;
  const { data } = await supabase.from("results").select("image_path");
  const paths = (data ?? []).map((r) => r.image_path).filter(Boolean) as string[];
  if (paths.length) await supabase.storage.from(BUCKET).remove(paths);
  await supabase.from("results").delete().not("id", "is", null);
  revalidatePath("/admin/results");
  revalidatePath("/results");
}

export async function toggleResultPublished(formData: FormData) {
  const supabase = await staffClient();
  if (!supabase) return;
  const id = String(formData.get("id") || "");
  const published = String(formData.get("published") || "") === "true";
  if (!id) return;
  await supabase.from("results").update({ published: !published }).eq("id", id);
  revalidatePath("/admin/results");
  revalidatePath("/results");
}
