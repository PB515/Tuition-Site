import PageHeader from "@/components/site/PageHeader";
import { SITE } from "@/lib/site";

export const metadata = {
  title: "Privacy Policy",
  description:
    "How Inspire Academy of Mathematics collects, uses and protects your information, in line with India's Digital Personal Data Protection Act.",
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-heading text-xl font-bold text-ink">{title}</h2>
      <div className="mt-3 space-y-3 text-sm leading-relaxed text-ink-muted">{children}</div>
    </div>
  );
}

export default function Page() {
  return (
    <main>
      <PageHeader title="Privacy Policy" subtitle="Last updated: 9 June 2026" />

      <section className="border-b border-border">
        <div className="mx-auto max-w-3xl space-y-9 px-4 py-16 sm:px-6 lg:py-20">
          <p className="text-sm leading-relaxed text-ink-muted">
            This policy explains how {SITE.name} collects, uses and protects your information, in
            line with India&apos;s Digital Personal Data Protection Act. By contacting us or using
            this website, you agree to this policy.
          </p>

          <Section title="1. Who we are">
            <p>
              {SITE.name} is a math coaching academy at {SITE.address}, led by {SITE.teacher}. You
              can reach us on {SITE.phoneDisplay}.
            </p>
            <p className="text-ink-muted">
              [TBD: registered legal name of the business, and the name and email of the person who
              handles privacy questions. To be filled before full public launch.]
            </p>
          </Section>

          <Section title="2. What we collect">
            <p>
              When you enquire with us, we collect what you choose to share: a parent or student
              name, a mobile number, the class, the school, and any message you send. We do not ask
              you to create an account, and we do not collect payment details on this website.
            </p>
            <p>
              The Concept-Gap Test runs in your browser. Your chapter ratings are not stored by us
              unless you choose to send them to us on WhatsApp.
            </p>
          </Section>

          <Section title="3. Children's data and parental consent">
            <p>
              Our students are often under 18. We collect a student&apos;s details only with the
              involvement of a parent or guardian, who normally makes the enquiry. We do not run
              targeted advertising and we do not track children&apos;s behaviour online.
            </p>
          </Section>

          <Section title="4. How we use your information">
            <p>
              We use it to respond to your enquiry, explain the right batch, timings and fees, and to
              send important class, test and progress updates when required. We do not use it for
              anything else.
            </p>
          </Section>

          <Section title="5. How we share it">
            <p>
              We do not sell your information. We contact you by phone or WhatsApp using the number
              you provide. Where we use service providers (for example, website hosting, and email or
              database services when enabled), they only process data on our behalf, and we choose
              providers that store data in India where possible.
            </p>
          </Section>

          <Section title="6. Cookies and analytics">
            <p>
              We use privacy-friendly, cookieless analytics to understand how many people visit the
              site. We do not use advertising cookies and we do not track you across other websites.
            </p>
          </Section>

          <Section title="7. How long we keep it">
            <p>
              We keep enquiry details only as long as needed to respond to you and for our own
              records. You can ask us to delete your information at any time.
            </p>
          </Section>

          <Section title="8. Your rights">
            <p>
              You can ask to see the information we hold about you, ask us to correct it, or ask us to
              delete it. To do any of these, contact us on {SITE.phoneDisplay}.
            </p>
          </Section>

          <Section title="9. Contact us">
            <p>
              For any privacy question, call or message {SITE.phoneDisplay}, or visit us at{" "}
              {SITE.address}.
            </p>
          </Section>
        </div>
      </section>
    </main>
  );
}
