import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PageHeader from "@/components/site/PageHeader";
import EnquiryBand from "@/components/site/EnquiryBand";
import { POSTS } from "@/lib/blog";

export const metadata = {
  title: "Blog",
  description:
    "Maths study tips and exam advice from Inspire Academy of Mathematics, Vadodara, led by Snehal Soni Sir.",
};

export default function Page() {
  return (
    <main>
      <PageHeader
        title="Maths study tips and exam advice"
        subtitle="Short, practical notes from Snehal Soni Sir on doing better in maths."
      />

      <section className="border-b border-border">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:py-20">
          <div className="divide-y divide-border">
            {POSTS.map((post) => (
              <article key={post.slug} className="py-8 first:pt-0">
                <p className="text-xs font-medium text-ink-muted">
                  {post.date} · {post.readingMin} min read
                </p>
                <h2 className="mt-2 font-heading text-2xl font-bold tracking-tight text-ink">
                  <Link href={`/blog/${post.slug}`} className="hover:text-primary-strong">
                    {post.title}
                  </Link>
                </h2>
                <p className="mt-3 text-base leading-relaxed text-ink-muted">{post.excerpt}</p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-strong hover:text-primary-deep"
                >
                  Read more{" "}
                  <ArrowRight
                    size={16}
                    strokeWidth={2}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <EnquiryBand />
    </main>
  );
}
