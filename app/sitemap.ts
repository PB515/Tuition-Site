import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { getPublishedPosts } from "@/lib/posts";

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
  "/class-9-maths-coaching-vadodara",
  "/class-10-maths-coaching-vadodara",
  "/class-11-maths-coaching-vadodara",
  "/class-11-applied-maths-coaching-vadodara",
  "/class-12-maths-coaching-vadodara",
  "/class-12-applied-maths-coaching-vadodara",
  "/maths-tuition-new-sama-road",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const staticUrls = ROUTES.map((r) => ({ url: `${SITE_URL}${r}`, lastModified: now }));
  const posts = await getPublishedPosts();
  const blogUrls = posts.map((p) => ({
    url: `${SITE_URL}/blog/${p.slug}`,
    lastModified: p.published_at ? new Date(p.published_at) : now,
  }));
  return [...staticUrls, ...blogUrls];
}
