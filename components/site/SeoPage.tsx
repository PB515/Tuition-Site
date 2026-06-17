import Link from "next/link";
import { Check } from "lucide-react";
import { SEO_LINKS } from "@/lib/site";
import PageHeader from "./PageHeader";
import SmartImage from "./SmartImage";
import EnquiryBand from "./EnquiryBand";
import FloatingMath from "./FloatingMath";
import Faq from "@/components/home/Faq";
import JsonLd from "@/components/JsonLd";
import { faqPageLd, breadcrumbLd } from "@/lib/structured-data";
import { resolveImage } from "@/lib/site-images";

export type SeoContent = {
  eyebrow: string;
  title: string;
  intro: string;
  // 2-3 short paragraphs of custom copy written per page (optional). When an
  // image is uploaded, these sit beside it in a two-column band; the image side
  // alternates per page (auto by path, or set bodyImageSide) so pages vary.
  body?: string[];
  bodyImageSide?: "left" | "right";
  whoFor: string[];
  covered?: string[];
  teaching: string;
  // Optional honest "nearest branch" note for catchment (near) area pages,
  // where we draw students from the area but have no branch in it.
  nearby?: { title: string; body: string };
  faqs: { q: string; a: string }[];
};

// Evergreen inclusions, shown on every batch page. Deliberately process-based,
// not syllabus, so nothing here needs updating when schools or terms change.
const INCLUDES = [
  "Personal teaching by Snehal Sir, every class",
  "Small batches, capped at 20 students",
  "Weekly tests with mistake analysis",
  "Custom, curated notes and material by Sir",
  "Personal doubt-solving with Sir",
  "Progress updates for parents when needed",
];

// Evergreen value points shown on every SEO page (real expertise + what you get,
// not keyword filler). Reinforces E-E-A-T without stuffing.
const WHY = [
  { t: "Taught by Snehal Sir himself", b: "For Class 9 to 12, the founder is in every session, not a substitute or a junior tutor." },
  { t: "25+ years of experience", b: "Former Head of the Mathematics Department at Navrachana School. He knows exactly where students get stuck, and how to bring them back." },
  { t: "Small batches, maximum 20", b: "Real personal attention, so we know where each student is and how they progress week to week." },
  { t: "Concept before formula", b: "Students learn why a method works, so it holds up under exam pressure instead of being memorised." },
  { t: "Custom study material", b: "Sir's own curated notes and practice material for each topic, not generic photocopies." },
  { t: "Weekly tests and parent updates", b: "A test every week with honest mistake analysis, and progress updates for parents through the app." },
];

// Two evergreen questions appended to each page's own FAQs.
const COMMON_FAQS = [
  {
    q: "Why choose Inspire over a bigger class?",
    a: "Because Sir teaches every batch himself in groups capped at 20, with his own study material and weekly tests. You get an experienced teacher's personal attention, not a crowded class.",
  },
  {
    q: "Will parents get progress updates?",
    a: "Yes. Parents receive attendance, test scores and progress through our parent app, so you always know where your child stands.",
  },
];

export default async function SeoPage({
  content,
  imageSlug,
  path,
}: {
  content: SeoContent;
  imageSlug?: string;
  path?: string;
}) {
  const faqs = [...content.faqs, ...COMMON_FAQS];
  // Per-page image: legacy imageSlug, otherwise a slot derived from the path
  // (uploaded in admin -> Website). Render only once an image actually exists,
  // so live pages never show an admin placeholder box.
  const imgSrc = imageSlug
    ? `/images/courses/${imageSlug}.jpg`
    : path
      ? `/images/seo${path}.jpg`
      : null;
  const imgUrl = imgSrc ? await resolveImage(imgSrc) : null;
  // Which side the body image sits on. Defaults to alternating by path length
  // so consecutive pages don't all look the same; override with bodyImageSide.
  const bodyImageSide = content.bodyImageSide ?? ((path?.length ?? 0) % 2 === 0 ? "left" : "right");
  const hasBody = !!content.body && content.body.length > 0;
  return (
    <main>
      <JsonLd data={faqPageLd(faqs)} />
      {path && (
        <JsonLd
          data={breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "Batches", path: "/batches" },
            { name: content.title, path },
          ])}
        />
      )}
      <PageHeader eyebrow={content.eyebrow} title={content.title} subtitle={content.intro} />

      {/* Body-less pages: full-width header image (when uploaded). */}
      {!hasBody && imgUrl && imgSrc && (
        <section className="relative overflow-hidden border-b border-border">
          <FloatingMath preset="band" offset={3} count={2} />
          <div className="relative z-10 mx-auto max-w-7xl px-4 pt-12 sm:px-6">
            <SmartImage
              src={imgSrc}
              alt={content.title}
              label={`${content.title} header`}
              className="aspect-[16/9] w-full rounded-2xl border border-border lg:aspect-[21/9]"
            />
          </div>
        </section>
      )}

      {/* Pages with custom copy: paragraphs beside the image (side alternates). */}
      {hasBody && (
        <section className="relative overflow-hidden border-b border-border">
          <FloatingMath preset="band" offset={5} count={2} />
          {imgUrl && imgSrc ? (
            <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:py-20">
              <div className={bodyImageSide === "right" ? "lg:order-2" : ""}>
                <SmartImage
                  src={imgSrc}
                  alt={content.title}
                  label={`${content.title} photo`}
                  className="aspect-[4/3] w-full rounded-2xl border border-border"
                />
              </div>
              <div className="space-y-5">
                {content.body!.map((p, i) => (
                  <p key={i} className="text-base leading-relaxed text-ink-muted">
                    {p}
                  </p>
                ))}
              </div>
            </div>
          ) : (
            <div className="relative z-10 mx-auto max-w-3xl space-y-5 px-4 py-16 sm:px-6 lg:py-20">
              {content.body!.map((p, i) => (
                <p key={i} className="text-base leading-relaxed text-ink-muted">
                  {p}
                </p>
              ))}
            </div>
          )}
        </section>
      )}

      <section className="relative overflow-hidden border-b border-border">
        <FloatingMath preset="band" offset={0} count={3} />
        <div className="relative z-10 mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:py-20">
          <div>
            <h2 className="font-heading text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              Who it is for
            </h2>
            <ul className="mt-6 space-y-3">
              {content.whoFor.map((w) => (
                <li
                  key={w}
                  className="group flex gap-3 rounded-2xl border border-border bg-surface p-4 transition-all duration-200 hover:-translate-y-1 hover:border-primary hover:shadow-md"
                >
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-tint text-primary-strong transition-transform duration-200 group-hover:scale-110">
                    <Check size={16} strokeWidth={2.5} />
                  </span>
                  <span className="text-ink-muted">{w}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-heading text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              What every batch includes
            </h2>
            <ul className="mt-6 space-y-3">
              {INCLUDES.map((c) => (
                <li
                  key={c}
                  className="group flex gap-3 rounded-2xl border border-border bg-surface p-4 transition-all duration-200 hover:-translate-y-1 hover:border-primary hover:shadow-md"
                >
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-tint text-primary-strong transition-transform duration-200 group-hover:scale-110">
                    <Check size={16} strokeWidth={2.5} />
                  </span>
                  <span className="text-ink-muted">{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-b border-border bg-surface">
        <FloatingMath preset="band" offset={1} count={3} />
        <div className="relative z-10 mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:py-20">
          <h2 className="font-heading text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            How Snehal Sir teaches it
          </h2>
          <p className="mt-5 text-base leading-relaxed text-ink-muted">{content.teaching}</p>
        </div>
      </section>

      {content.nearby && (
        <section className="relative overflow-hidden border-b border-border">
          <div className="relative z-10 mx-auto max-w-3xl px-4 py-12 sm:px-6">
            <div className="rounded-2xl border border-border bg-primary-tint p-6 sm:p-7">
              <h2 className="font-heading text-lg font-bold text-ink sm:text-xl">
                {content.nearby.title}
              </h2>
              <p className="mt-2.5 text-base leading-relaxed text-ink-muted">
                {content.nearby.body}
              </p>
            </div>
          </div>
        </section>
      )}

      <section className="relative overflow-hidden border-b border-border">
        <FloatingMath preset="band" offset={4} count={3} />
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
          <h2 className="font-heading text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            Why students choose Inspire
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {WHY.map((w) => (
              <div
                key={w.t}
                className="group rounded-2xl border border-border bg-surface p-5 transition-all duration-200 hover:-translate-y-1 hover:border-primary hover:shadow-md"
              >
                <p className="font-semibold text-ink">{w.t}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{w.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-b border-border">
        <FloatingMath preset="band" offset={2} count={4} />
        <div className="relative z-10 mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:py-20">
          <h2 className="font-heading text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            Common questions
          </h2>
          <div className="mt-8">
            <Faq items={faqs} />
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-b border-border bg-surface">
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-12 sm:px-6">
          <h2 className="font-heading text-xl font-bold tracking-tight text-ink">
            Explore related pages
          </h2>
          <div className="mt-5 flex flex-wrap gap-2.5">
            {SEO_LINKS.flatMap((g) => g.links)
              .filter((l) => l.href !== path)
              .map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="rounded-full border border-border bg-bg px-4 py-2 text-sm text-ink-muted transition-all hover:-translate-y-0.5 hover:border-primary hover:text-primary-strong"
                >
                  {l.label}
                </Link>
              ))}
          </div>
        </div>
      </section>

      <EnquiryBand />
    </main>
  );
}
