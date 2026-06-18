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

export type ResultsHighlight = {
  score: string;
  out_of: string;
  student_name: string;
  description: string;
};

// Shown before the founder edits it, and if the table is missing.
export const RESULTS_HIGHLIGHT_DEFAULT: ResultsHighlight = {
  score: "97",
  out_of: "100",
  student_name: "Chirayu Jani",
  description:
    "The highest score in Navrachana Applied Math. More board and Applied Math results are added each year, with student permission.",
};

// The single editable highlight block on the homepage Results section.
export const getResultsHighlight = cache(async (): Promise<ResultsHighlight> => {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("results_highlight")
      .select("score, out_of, student_name, description")
      .eq("id", 1)
      .maybeSingle();
    return data ? (data as ResultsHighlight) : RESULTS_HIGHLIGHT_DEFAULT;
  } catch {
    return RESULTS_HIGHLIGHT_DEFAULT;
  }
});

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
