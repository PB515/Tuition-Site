import { MessageCircle } from "lucide-react";
import PageHeader from "@/components/site/PageHeader";
import GapTest from "@/components/gap-test/GapTest";
import { WA_ENQUIRY } from "@/lib/site";

export const metadata = {
  title: "Free Maths Concept-Gap Test",
  description:
    "A free self-check from Inspire Academy. Rate your confidence chapter by chapter and see exactly where your maths needs work, then message Snehal Soni Sir.",
};

export default function Page() {
  return (
    <main>
      <PageHeader
        eyebrow="Free tool"
        title="Find your weak maths chapters in two minutes"
        subtitle="Choose your class, rate how confident you feel on each chapter, and get a clear list of what to work on. No sign-up, nothing to pay."
      />

      <section className="border-b border-border">
        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:py-16">
          <GapTest />
          <noscript>
            <p className="mt-6 text-sm text-ink-muted">
              This tool needs JavaScript. You can still reach us directly on WhatsApp.
            </p>
          </noscript>
          <p className="mt-10 text-sm text-ink-muted">
            Prefer to just ask?{" "}
            <a
              href={WA_ENQUIRY}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-semibold text-primary-strong hover:text-primary-deep"
            >
              <MessageCircle size={15} strokeWidth={2} /> Message Snehal Soni Sir
            </a>
          </p>
        </div>
      </section>
    </main>
  );
}
