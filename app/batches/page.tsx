import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import PageHeader from "@/components/site/PageHeader";
import SmartImage from "@/components/site/SmartImage";
import EnquiryBand from "@/components/site/EnquiryBand";
import FloatingMath from "@/components/site/FloatingMath";
import { COURSES } from "@/lib/site";

export const metadata = {
  title: "Math Coaching & Batches in Vadodara, Class 9 to 12",
  description:
    "Math coaching and batches in Vadodara by Snehal Sir, Class 9 to 12, Regular and Applied. Small batches, weekly tests, custom material, NCERT for CBSE and GSEB.",
};

const INCLUDED = [
  "Weekly tests with mistake analysis",
  "Custom, curated notes and material by Sir for every topic",
  "Personal doubt-solving with Sir",
  "NCERT base that covers CBSE and GSEB",
  "Exam-pattern practice for boards, JEE and GUJCET",
  "Progress updates for parents when required",
];

export default function Page() {
  return (
    <main>
      <PageHeader
        title="Math batches in Vadodara, Class 9 to competitive exams"
        subtitle="Small, focused batches taught by Snehal Sir, for boards and competitive preparation alike."
      />

      <section className="relative overflow-hidden border-b border-border">
        <FloatingMath preset="band" offset={2} count={2} />
        <div className="relative z-10 mx-auto max-w-7xl px-4 pt-12 sm:px-6">
          <SmartImage
            src="/images/courses/main.jpg"
            alt="Math coaching at Inspire Academy"
            label="Courses header: classroom / Sir teaching"
            className="aspect-[16/9] w-full rounded-2xl border border-border lg:aspect-[21/9]"
            sizes="(max-width: 1024px) 100vw, 1152px"
          />
        </div>
      </section>

      <section className="relative overflow-hidden border-b border-border">
        <FloatingMath preset="band" offset={0} count={3} />
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {COURSES.map((c) => (
              <Link
                key={c.label}
                href={c.href}
                className="group flex items-center justify-between gap-4 rounded-2xl border border-border bg-bg p-5 transition-all duration-200 hover:-translate-y-1 hover:border-primary hover:shadow-md"
              >
                <div>
                  <p className="font-heading text-lg font-semibold text-ink">{c.label}</p>
                  <p className="mt-1 text-sm text-ink-muted">{c.note}</p>
                </div>
                <ArrowRight
                  size={20}
                  strokeWidth={1.75}
                  className="shrink-0 text-primary transition-transform group-hover:translate-x-1"
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-b border-border bg-surface">
        <FloatingMath preset="band" offset={1} count={3} />
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
          <h2 className="max-w-2xl font-heading text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Every batch includes
          </h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {INCLUDED.map((i) => (
              <li
                key={i}
                className="group flex gap-3 rounded-2xl border border-border bg-bg p-4 transition-all duration-200 hover:-translate-y-1 hover:border-primary hover:shadow-md"
              >
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-tint text-primary-strong transition-transform duration-200 group-hover:scale-110">
                  <Check size={16} strokeWidth={2.5} />
                </span>
                <span className="text-ink-muted">{i}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <EnquiryBand
        heading="Which class do you need coaching for?"
        sub="Tell us the class and school on WhatsApp, and we will share the right batch, timings and fees."
      />
    </main>
  );
}
