import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import PageHeader from "@/components/site/PageHeader";
import EnquiryBand from "@/components/site/EnquiryBand";
import { COURSES } from "@/lib/site";

export const metadata = { title: "Courses" };

const INCLUDED = [
  "Weekly tests with mistake analysis",
  "Printed notes for every topic",
  "Personal doubt-solving with Sir",
  "NCERT base that covers CBSE and GSEB",
  "Exam-pattern practice for boards, JEE and GUJCET",
  "Progress updates for parents when required",
];

export default function Page() {
  return (
    <main>
      <PageHeader
        title="Maths coaching from Class 9 to competitive exams"
        subtitle="One maths-focused system, taught by Snehal Soni Sir, for boards and competitive preparation alike."
      />

      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {COURSES.map((c) => (
              <Link
                key={c.label}
                href={c.href}
                className="group flex items-center justify-between gap-4 rounded-2xl border border-border bg-bg p-5 transition-colors hover:border-primary"
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

      <section className="border-b border-border bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
          <h2 className="max-w-2xl font-heading text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Every batch includes
          </h2>
          <ul className="mt-8 grid gap-x-10 gap-y-5 sm:grid-cols-2">
            {INCLUDED.map((i) => (
              <li key={i} className="flex gap-3 text-ink-muted">
                <Check size={20} strokeWidth={2.5} className="mt-0.5 shrink-0 text-primary" />
                <span>{i}</span>
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
