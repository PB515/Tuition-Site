import { cache } from "react";
import { createClient } from "@/lib/supabase/server";
import { publicExists } from "@/lib/images";

import { storagePublicUrl } from "@/lib/storage";
export { storagePublicUrl };

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

export const IMAGE_SLOTS: { slot: string; label: string; src: string; ratio: string; size: string }[] = [
  { slot: "hero/1", label: "Hero 1 - Sir teaching in class", src: "/images/hero/1.jpg", ratio: "4 / 5", size: "1200 x 1500 px" },
  { slot: "hero/2", label: "Hero 2 - Students in classroom", src: "/images/hero/2.jpg", ratio: "4 / 5", size: "1200 x 1500 px" },
  { slot: "hero/3", label: "Hero 3 - Sir explaining on board", src: "/images/hero/3.jpg", ratio: "4 / 5", size: "1200 x 1500 px" },
  { slot: "hero/4", label: "Hero 4 - Students solving problems", src: "/images/hero/4.jpg", ratio: "4 / 5", size: "1200 x 1500 px" },
  { slot: "hero/5", label: "Hero 5 - Test or practice session", src: "/images/hero/5.jpg", ratio: "4 / 5", size: "1200 x 1500 px" },
  { slot: "about/portrait", label: "About - Portrait of Sir", src: "/images/about/portrait.jpg", ratio: "4 / 5", size: "1200 x 1500 px" },
  { slot: "about/teaching", label: "About - Teaching photo", src: "/images/about/teaching.jpg", ratio: "16 / 9", size: "1600 x 900 px" },
  { slot: "method", label: "Method - Board photo", src: "/images/method.jpg", ratio: "16 / 9", size: "1600 x 900 px" },
  { slot: "courses/main", label: "Courses page - Header", src: "/images/courses/main.jpg", ratio: "16 / 9", size: "1600 x 900 px" },
  { slot: "courses/class-9", label: "Course - Class 9", src: "/images/courses/class-9.jpg", ratio: "16 / 9", size: "1600 x 900 px" },
  { slot: "courses/class-10", label: "Course - Class 10", src: "/images/courses/class-10.jpg", ratio: "16 / 9", size: "1600 x 900 px" },
  { slot: "courses/class-11", label: "Course - Class 11", src: "/images/courses/class-11.jpg", ratio: "16 / 9", size: "1600 x 900 px" },
  { slot: "courses/class-12", label: "Course - Class 12", src: "/images/courses/class-12.jpg", ratio: "16 / 9", size: "1600 x 900 px" },
  { slot: "courses/applied", label: "Course - Applied Maths", src: "/images/courses/applied.jpg", ratio: "16 / 9", size: "1600 x 900 px" },
  { slot: "courses/gujcet", label: "Course - GUJCET", src: "/images/courses/gujcet.jpg", ratio: "16 / 9", size: "1600 x 900 px" },
  { slot: "courses/jee", label: "Course - JEE", src: "/images/courses/jee.jpg", ratio: "16 / 9", size: "1600 x 900 px" },
  { slot: "courses/location", label: "New Sama Road page", src: "/images/courses/location.jpg", ratio: "16 / 9", size: "1600 x 900 px" },
  { slot: "results/1", label: "Results - Poster 1", src: "/images/results/1.jpg", ratio: "3 / 4", size: "1080 x 1350 px" },
  { slot: "results/2", label: "Results - Poster 2", src: "/images/results/2.jpg", ratio: "3 / 4", size: "1080 x 1350 px" },
  { slot: "results/3", label: "Results - Poster 3", src: "/images/results/3.jpg", ratio: "3 / 4", size: "1080 x 1350 px" },
  { slot: "results/4", label: "Results - Poster 4", src: "/images/results/4.jpg", ratio: "3 / 4", size: "1080 x 1350 px" },
  { slot: "results/banner-1", label: "Results banner 1 (group photo)", src: "/images/results/banner-1.jpg", ratio: "16 / 9", size: "wide ~1600 x 900 px" },
  { slot: "results/banner-2", label: "Results banner 2 (group photo)", src: "/images/results/banner-2.jpg", ratio: "16 / 9", size: "wide ~1600 x 900 px" },
  { slot: "results/banner-3", label: "Results banner 3 (group photo)", src: "/images/results/banner-3.jpg", ratio: "16 / 9", size: "wide ~1600 x 900 px" },
  { slot: "results/banner-4", label: "Results banner 4 (group photo)", src: "/images/results/banner-4.jpg", ratio: "16 / 9", size: "wide ~1600 x 900 px" },
  { slot: "results/banner-5", label: "Results banner 5 (group photo)", src: "/images/results/banner-5.jpg", ratio: "16 / 9", size: "wide ~1600 x 900 px" },
  { slot: "contact", label: "Contact - Academy photo", src: "/images/contact.jpg", ratio: "16 / 9", size: "1600 x 900 px" },
  { slot: "brand/logo", label: "Website logo", src: "/brand/logo.svg", ratio: "16 / 6", size: "wide ~1000 x 300 px works best in the navbar" },
];

const SLOT_BY_KEY = new Map(IMAGE_SLOTS.map((s) => [s.slot, s]));
export function slotMeta(src: string) {
  return SLOT_BY_KEY.get(slotFromSrc(src));
}
