import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { getPublishedPosts } from "@/lib/posts";

const ROUTES = [
  "",
  "/about-snehal-soni-sir",
  "/batches",
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
  "/maths-classes-alkapuri-vadodara",
  "/maths-classes-sama-vadodara",
  "/maths-classes-karelibaug-vadodara",
  "/maths-classes-fatehgunj-vadodara",
  "/best-maths-teacher-in-vadodara",
  "/jee-maths-coaching-vadodara",
  "/gujcet-maths-coaching-vadodara",
  "/cbse-maths-tuition-vadodara",
  "/gseb-maths-coaching-vadodara",
  "/maths-tuition-fees-vadodara",
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
