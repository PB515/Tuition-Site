import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import EnquiryBand from "@/components/site/EnquiryBand";
import { POSTS, getPost } from "@/lib/blog";

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Post not found" };
  return { title: post.title, description: post.excerpt };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <main>
      <section className="border-b border-border bg-surface">
        <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:py-16">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-muted hover:text-primary-strong"
          >
            <ArrowLeft size={15} strokeWidth={2} /> All posts
          </Link>
          <p className="mt-6 text-xs font-medium text-ink-muted">
            {post.date} · {post.readingMin} min read
          </p>
          <h1 className="mt-2 max-w-3xl font-heading text-4xl font-bold leading-[1.12] tracking-tight text-ink sm:text-5xl">
            {post.title}
          </h1>
        </div>
      </section>

      <article className="border-b border-border">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:py-20">
          {post.body.map((section, i) => (
            <div key={i} className={i > 0 ? "mt-8" : ""}>
              {section.heading && (
                <h2 className="font-heading text-xl font-bold text-ink">{section.heading}</h2>
              )}
              {section.paragraphs.map((p, j) => (
                <p
                  key={j}
                  className={`text-base leading-relaxed text-ink-muted ${
                    section.heading ? "mt-3" : j > 0 ? "mt-4" : ""
                  }`}
                >
                  {p}
                </p>
              ))}
            </div>
          ))}
        </div>
      </article>

      <EnquiryBand />
    </main>
  );
}
