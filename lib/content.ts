import { cache } from "react";
import { createClient } from "@/lib/supabase/server";

export type ResultItem = {
  id: string;
  title: string;
  description: string | null;
  student_name: string | null;
  marks: string | null;
  class_course: string | null;
  school: string | null;
  year: string | null;
  image_path: string | null;
};

export type TestimonialItem = {
  id: string;
  quote: string | null;
  author_name: string | null;
  author_detail: string | null;
  video_url: string | null;
  image_path: string | null;
};

export const getResults = cache(async (): Promise<ResultItem[]> => {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("results")
      .select("id, title, description, student_name, marks, class_course, school, year, image_path")
      .eq("published", true)
      .order("sort_order")
      .order("created_at", { ascending: false });
    return (data ?? []) as ResultItem[];
  } catch {
    return [];
  }
});

export const getTestimonials = cache(async (): Promise<TestimonialItem[]> => {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("testimonials")
      .select("id, quote, author_name, author_detail, video_url, image_path")
      .eq("published", true)
      .order("sort_order")
      .order("created_at", { ascending: false });
    return (data ?? []) as TestimonialItem[];
  } catch {
    return [];
  }
});
