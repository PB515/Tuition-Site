import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PageHeader from "@/components/site/PageHeader";
import EnquiryBand from "@/components/site/EnquiryBand";
import { getPublishedPosts } from "@/lib/posts";
import { storagePublicUrl } from "@/lib/site-images";

export const metadata = {
  title: "Blog",
  description:
    "Maths study tips and exam advice from Inspire Academy of Mathematics, Vadodara, led by Snehal Soni Sir.",
};

function fmt(d: string | null) {
  return d ? new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "";
}

export default async function Page() {
  const posts = await getPublishedPosts();

  return (
    <main>
      <PageHeader
        title="Maths study tips and exam advice"
        subtitle="Short, practical notes from Snehal Soni Sir on doing better in maths."
      />

      <section className="border-b border-border">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:py-20">
          {posts.length === 0 ? (
            <p className="rounded-2xl border border-border bg-surface p-6 text-sm text-ink-muted">
              New posts are published here. Check back soon.
            </p>
          ) : (
            <div className="divide-y divide-border">
              {posts.map((post) => (
                <article key={post.id} className="py-8 first:pt-0">
                  {post.cover_path && (
                    <Link href={`/blog/${post.slug}`} className="mb-4 block overflow-hidden rounded-2xl border border-border">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={storagePublicUrl(post.cover_path)} alt={post.title} className="aspect-[16/9] w-full object-cover" loading="lazy" />
                    </Link>
                  )}
                  {post.published_at && <p className="text-xs font-medium text-ink-muted">{fmt(post.published_at)}</p>}
                  <h2 className="mt-2 font-heading text-2xl font-bold tracking-tight text-ink">
                    <Link href={`/blog/${post.slug}`} className="hover:text-primary-strong">
                      {post.title}
                    </Link>
                  </h2>
                  {post.excerpt && <p className="mt-3 text-base leading-relaxed text-ink-muted">{post.excerpt}</p>}
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-strong hover:text-primary-deep"
                  >
                    Read more{" "}
                    <ArrowRight size={16} strokeWidth={2} className="transition-transform group-hover:translate-x-1" />
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <EnquiryBand />
    </main>
  );
}
