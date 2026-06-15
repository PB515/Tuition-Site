import { Check } from "lucide-react";
import PageHeader from "./PageHeader";
import SmartImage from "./SmartImage";
import EnquiryBand from "./EnquiryBand";
import FloatingMath from "./FloatingMath";
import Faq from "@/components/home/Faq";
import JsonLd from "@/components/JsonLd";
import { faqPageLd, breadcrumbLd } from "@/lib/structured-data";

export type SeoContent = {
  eyebrow: string;
  title: string;
  intro: string;
  whoFor: string[];
  covered?: string[];
  teaching: string;
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

export default function SeoPage({
  content,
  imageSlug,
  path,
}: {
  content: SeoContent;
  imageSlug?: string;
  path?: string;
}) {
  return (
    <main>
      <JsonLd data={faqPageLd(content.faqs)} />
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

      {imageSlug && (
        <section className="relative overflow-hidden border-b border-border">
          <FloatingMath preset="band" offset={3} count={2} />
          <div className="relative z-10 mx-auto max-w-7xl px-4 pt-12 sm:px-6">
            <SmartImage
              src={`/images/courses/${imageSlug}.jpg`}
              alt={content.title}
              label={`${content.title} header`}
              className="aspect-[16/9] w-full rounded-2xl border border-border lg:aspect-[21/9]"
            />
          </div>
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

      <section className="relative overflow-hidden border-b border-border">
        <FloatingMath preset="band" offset={2} count={4} />
        <div className="relative z-10 mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:py-20">
          <h2 className="font-heading text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            Common questions
          </h2>
          <div className="mt-8">
            <Faq items={content.faqs} />
          </div>
        </div>
      </section>

      <EnquiryBand />
    </main>
  );
}
