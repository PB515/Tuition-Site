"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { storagePublicUrl } from "@/lib/site-images";

const BUCKET = "site-images";

async function staffClient() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;
  const { data: s } = await supabase.from("staff").select("user_id").eq("user_id", user.id).maybeSingle();
  return s ? supabase : null;
}

type SC = Awaited<ReturnType<typeof createClient>>;

async function uploadImage(supabase: SC, file: File | null) {
  if (!file || !(file instanceof File) || file.size === 0) return null;
  if (!file.type.startsWith("image/") || file.size > 5 * 1024 * 1024) return null;
  const ext = (file.name.split(".").pop() || "jpg").toLowerCase().replace(/[^a-z0-9]/g, "") || "jpg";
  const path = `blog/${Date.now()}-${Math.round(Math.random() * 1e6)}.${ext}`;
  const bytes = new Uint8Array(await file.arrayBuffer());
  const { error } = await supabase.storage.from(BUCKET).upload(path, bytes, { contentType: file.type });
  return error ? null : path;
}

function slugify(s: string) {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function createPost(formData: FormData) {
  const supabase = await staffClient();
  if (!supabase) return;
  const title = String(formData.get("title") || "").trim();
  const body = String(formData.get("body") || "");
  if (!title || !body.trim()) return;

  let slug = slugify(String(formData.get("slug") || "") || title) || `post-${Date.now()}`;
  const { data: clash } = await supabase.from("posts").select("id").eq("slug", slug).maybeSingle();
  if (clash) slug = `${slug}-${Date.now().toString().slice(-5)}`;

  const cover_path = await uploadImage(supabase, formData.get("cover") as File | null);
  await supabase.from("posts").insert({
    slug,
    title,
    excerpt: String(formData.get("excerpt") || "").trim() || null,
    cover_path,
    body,
    published: formData.get("published") === "on",
    published_at: String(formData.get("published_at") || "") || null,
  });
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  redirect("/admin/blog");
}

export async function updatePost(formData: FormData) {
  const supabase = await staffClient();
  if (!supabase) return;
  const id = String(formData.get("id") || "");
  if (!id) return;
  const slug = slugify(String(formData.get("slug") || "")) || `post-${Date.now()}`;
  const update: Record<string, unknown> = {
    title: String(formData.get("title") || "").trim(),
    slug,
    excerpt: String(formData.get("excerpt") || "").trim() || null,
    body: String(formData.get("body") || ""),
    published: formData.get("published") === "on",
    published_at: String(formData.get("published_at") || "") || null,
  };
  const cover = formData.get("cover") as File | null;
  if (cover instanceof File && cover.size > 0) {
    const path = await uploadImage(supabase, cover);
    if (path) {
      const { data: old } = await supabase.from("posts").select("cover_path").eq("id", id).maybeSingle();
      if (old?.cover_path) await supabase.storage.from(BUCKET).remove([old.cover_path]);
      update.cover_path = path;
    }
  }
  await supabase.from("posts").update(update).eq("id", id);
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);
  redirect("/admin/blog");
}

export async function deletePost(formData: FormData) {
  const supabase = await staffClient();
  if (!supabase) return;
  const id = String(formData.get("id") || "");
  if (!id) return;
  const { data: old } = await supabase.from("posts").select("cover_path").eq("id", id).maybeSingle();
  if (old?.cover_path) await supabase.storage.from(BUCKET).remove([old.cover_path]);
  await supabase.from("posts").delete().eq("id", id);
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
}

export async function togglePostPublished(formData: FormData) {
  const supabase = await staffClient();
  if (!supabase) return;
  const id = String(formData.get("id") || "");
  const published = String(formData.get("published") || "") === "true";
  if (!id) return;
  await supabase.from("posts").update({ published: !published }).eq("id", id);
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
}

export async function uploadPostImage(formData: FormData) {
  const supabase = await staffClient();
  if (!supabase) return { error: "Staff only." };
  const path = await uploadImage(supabase, formData.get("file") as File | null);
  if (!path) return { error: "Upload failed. Use an image under 5 MB." };
  return { url: storagePublicUrl(path) };
}
