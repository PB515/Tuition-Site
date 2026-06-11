import { cache } from "react";
import { createClient } from "@/lib/supabase/server";
import { publicExists } from "@/lib/images";

const BUCKET = "site-images";

// Memoised per request: all stored slot -> path mappings in one query.
export const getSiteImages = cache(async (): Promise<Map<string, string>> => {
  try {
    const supabase = await createClient();
    const { data } = await supabase.from("site_images").select("slot, path");
    const map = new Map<string, string>();
    (data ?? []).forEach((r: { slot: string; path: string }) => map.set(r.slot, r.path));
    return map;
  } catch {
    return new Map();
  }
});

export function storagePublicUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${path}`;
}

// "/images/hero/1.jpg" -> "hero/1"; "/brand/logo.png" -> "brand/logo"
export function slotFromSrc(src: string) {
  return src
    .replace(/^\/images\//, "")
    .replace(/^\//, "")
    .replace(/\.[^.]+$/, "");
}

// Stored upload -> public/ file -> null (placeholder).
export async function resolveImage(publicSrc: string): Promise<string | null> {
  const images = await getSiteImages();
  const stored = images.get(slotFromSrc(publicSrc));
  if (stored) return storagePublicUrl(stored);
  if (publicExists(publicSrc)) return publicSrc;
  return null;
}

export const IMAGE_SLOTS: { slot: string; label: string; src: string; ratio: string }[] = [
  { slot: "hero/1", label: "Hero 1 - Sir teaching in class", src: "/images/hero/1.jpg", ratio: "4 / 5" },
  { slot: "hero/2", label: "Hero 2 - Students in classroom", src: "/images/hero/2.jpg", ratio: "4 / 5" },
  { slot: "hero/3", label: "Hero 3 - Sir explaining on board", src: "/images/hero/3.jpg", ratio: "4 / 5" },
  { slot: "hero/4", label: "Hero 4 - Students solving problems", src: "/images/hero/4.jpg", ratio: "4 / 5" },
  { slot: "hero/5", label: "Hero 5 - Test or practice session", src: "/images/hero/5.jpg", ratio: "4 / 5" },
  { slot: "about/portrait", label: "About - Portrait of Sir", src: "/images/about/portrait.jpg", ratio: "4 / 5" },
  { slot: "about/teaching", label: "About - Teaching photo", src: "/images/about/teaching.jpg", ratio: "16 / 9" },
  { slot: "method", label: "Method - Board photo", src: "/images/method.jpg", ratio: "16 / 9" },
  { slot: "courses/main", label: "Courses - Header", src: "/images/courses/main.jpg", ratio: "16 / 9" },
  { slot: "results/1", label: "Results - Poster 1", src: "/images/results/1.jpg", ratio: "3 / 4" },
  { slot: "results/2", label: "Results - Poster 2", src: "/images/results/2.jpg", ratio: "3 / 4" },
  { slot: "results/3", label: "Results - Poster 3", src: "/images/results/3.jpg", ratio: "3 / 4" },
  { slot: "results/4", label: "Results - Poster 4", src: "/images/results/4.jpg", ratio: "3 / 4" },
  { slot: "contact", label: "Contact - Academy photo", src: "/images/contact.jpg", ratio: "16 / 9" },
  { slot: "brand/logo", label: "Website logo", src: "/brand/logo.png", ratio: "16 / 6" },
];
