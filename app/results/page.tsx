import PageHeader from "@/components/site/PageHeader";
import EnquiryBand from "@/components/site/EnquiryBand";
import ResultCard from "@/components/site/ResultCard";
import TestimonialCard from "@/components/site/TestimonialCard";
import HeroCarousel from "@/components/site/HeroCarousel";
import FloatingMath from "@/components/site/FloatingMath";
import { getResults, getTestimonials } from "@/lib/content";
import { resolveImage } from "@/lib/site-images";

export const metadata = { title: "Results" };

export default async function Page() {
  const [results, testimonials] = await Promise.all([getResults(), getTestimonials()]);
  const bannerSlides = await Promise.all(
    [1, 2, 3, 4, 5].map(async (nn) => {
      const src = `/images/results/banner-${nn}.jpg`;
      return { url: await resolveImage(src), label: `Results banner ${nn}`, src };
    }),
  );

  return (
    <main>
      {/* Full-bleed results banner, first thing visitors see */}
      <section className="border-b border-border">
        <HeroCarousel
          slides={bannerSlides}
          aspectClass="aspect-[16/9] sm:aspect-[21/9] lg:aspect-[3/1]"
          frameClass=""
        />
      </section>

      <PageHeader
        title="Results that speak for the teaching"
        subtitle="Real scores from real students, shared with permission."
      />

      <section className="relative overflow-hidden border-b border-border">
        <FloatingMath preset="band" offset={1} count={3} />
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
          {results.length === 0 ? (
            <p className="rounded-2xl border border-border bg-surface p-6 text-sm text-ink-muted">
              Results are published here through the year, with student permission.
            </p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {results.map((r) => (
                <ResultCard key={r.id} r={r} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="relative overflow-hidden border-b border-border bg-surface">
        <FloatingMath preset="band" offset={2} count={3} />
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
          <h2 className="font-heading text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            Student and parent feedback
          </h2>
          {testimonials.length === 0 ? (
            <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-muted">
              We are collecting testimonials from students and parents, and will publish them here
              with permission.
            </p>
          ) : (
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((t) => (
                <TestimonialCard key={t.id} t={t} />
              ))}
            </div>
          )}
        </div>
      </section>

      <EnquiryBand heading="Want results like these for your child?" />
    </main>
  );
}
