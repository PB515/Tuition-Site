import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import EnquiryBand from "@/components/site/EnquiryBand";
import MarkdownView from "@/components/site/MarkdownView";
import { getPostBySlug } from "@/lib/posts";
import { storagePublicUrl } from "@/lib/site-images";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Post not found" };
  return { title: post.title, description: post.excerpt ?? undefined };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const date = post.published_at
    ? new Date(post.published_at).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })
    : null;

  return (
    <main>
      <section className="border-b border-border bg-surface">
        <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:py-16">
          <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-muted hover:text-primary-strong">
            <ArrowLeft size={15} strokeWidth={2} /> All posts
          </Link>
          {date && <p className="mt-6 text-xs font-medium text-ink-muted">{date}</p>}
          <h1 className="mt-2 max-w-3xl font-heading text-4xl font-bold leading-[1.12] tracking-tight text-ink sm:text-5xl">
            {post.title}
          </h1>
        </div>
      </section>

      {post.cover_path && (
        <section className="border-b border-border">
          <div className="mx-auto max-w-3xl px-4 pt-10 sm:px-6">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={storagePublicUrl(post.cover_path)} alt={post.title} className="w-full rounded-2xl border border-border" />
          </div>
        </section>
      )}

      <article className="border-b border-border">
        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:py-16">
          <MarkdownView>{post.body}</MarkdownView>
        </div>
      </article>

      <EnquiryBand />
    </main>
  );
}
