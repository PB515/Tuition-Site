import { Award } from "lucide-react";
import PageHeader from "@/components/site/PageHeader";
import EnquiryBand from "@/components/site/EnquiryBand";

export const metadata = { title: "Results" };

export default function Page() {
  return (
    <main>
      <PageHeader
        title="Results that speak for the teaching"
        subtitle="Real scores from real students, shared with permission."
      />

      <section className="border-b border-border">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:py-20">
          <div>
            <div className="flex items-baseline gap-4">
              <span className="font-heading text-6xl font-bold text-primary-strong sm:text-7xl">
                97<span className="text-3xl text-ink-muted">/100</span>
              </span>
              <Award size={28} strokeWidth={1.5} className="text-accent" />
            </div>
            <p className="mt-4 max-w-md text-base leading-relaxed text-ink-muted">
              The highest score in Navrachana Applied Maths, by our student Chirayu Jani. More board
              and Applied Maths results are added each year, with student permission.
            </p>
          </div>

          {/* Result creative slots: drop the real result images here (see docs/image-prompts.md). */}
          <div className="grid grid-cols-2 gap-4">
            {["Applied Maths 2026 result", "Board results creative"].map((label) => (
              <div
                key={label}
                className="flex aspect-[3/4] flex-col items-center justify-center gap-2 rounded-2xl border border-border bg-surface p-5 text-center"
              >
                <Award size={26} strokeWidth={1.5} className="text-primary" />
                <p className="text-xs font-medium text-ink-muted">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-surface">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 lg:py-20">
          <h2 className="font-heading text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            Student and parent feedback
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-ink-muted">
            We are collecting written testimonials from students and parents, and will publish them
            here with permission. For now, the results above speak for the teaching.
          </p>
        </div>
      </section>

      <EnquiryBand heading="Want results like these for your child?" />
    </main>
  );
}
