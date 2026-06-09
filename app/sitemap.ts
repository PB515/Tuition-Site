import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { POSTS } from "@/lib/blog";

const ROUTES = [
  "",
  "/about-snehal-soni-sir",
  "/courses",
  "/results",
  "/teaching-method",
  "/blog",
  "/contact",
  "/privacy",
  "/maths-concept-gap-test",
  "/class-10-maths-coaching-vadodara",
  "/class-12-maths-coaching-vadodara",
  "/applied-maths-coaching-vadodara",
  "/gujcet-maths-coaching-vadodara",
  "/maths-tuition-new-sama-road",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticUrls = ROUTES.map((r) => ({
    url: `${SITE_URL}${r}`,
    lastModified: now,
  }));
  const blogUrls = POSTS.map((p) => ({
    url: `${SITE_URL}/blog/${p.slug}`,
    lastModified: new Date(p.dateISO),
  }));
  return [...staticUrls, ...blogUrls];
}
