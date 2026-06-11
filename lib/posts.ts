import { cache } from "react";
import { createClient } from "@/lib/supabase/server";

export type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  cover_path: string | null;
  body: string;
  published_at: string | null;
};

const COLS = "id, slug, title, excerpt, cover_path, body, published_at";

export const getPublishedPosts = cache(async (): Promise<Post[]> => {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("posts")
      .select(COLS)
      .eq("published", true)
      .order("published_at", { ascending: false, nullsFirst: false })
      .order("created_at", { ascending: false });
    return (data ?? []) as Post[];
  } catch {
    return [];
  }
});

export const getPostBySlug = cache(async (slug: string): Promise<Post | null> => {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("posts")
      .select(COLS)
      .eq("slug", slug)
      .eq("published", true)
      .maybeSingle();
    return (data ?? null) as Post | null;
  } catch {
    return null;
  }
});
