import Link from "next/link";
import PageHeader from "@/components/site/PageHeader";
import { SEO_LINKS } from "@/lib/site";

export const metadata = {
  title: "Site Map",
  description:
    "All pages on the Inspire Academy of Mathematics website, in one place: classes, areas in Vadodara, exam and board pages, results and more.",
};

const MAIN: { href: string; label: string }[] = [
  { href: "/", label: "Home" },
  { href: "/about-snehal-soni-sir", label: "About Snehal Sir" },
  { href: "/batches", label: "Batches" },
  { href: "/results", label: "Results" },
  { href: "/teaching-method", label: "Teaching method" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
  { href: "/maths-concept-gap-test", label: "Free concept-gap test" },
  { href: "/privacy", label: "Privacy policy" },
];

const GROUPS = [{ title: "Main pages", links: MAIN }, ...SEO_LINKS];

export default function Page() {
  return (
    <main>
      <PageHeader
        eyebrow="Site map"
        title="All pages"
        subtitle="Every page on the site, grouped for easy browsing. If you are looking for a specific class, area or exam, it is here."
      />
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-20">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {GROUPS.map((g) => (
            <div key={g.title}>
              <h2 className="font-heading text-base font-bold text-ink">{g.title}</h2>
              <ul className="mt-4 space-y-2.5">
                {g.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-sm text-ink-muted transition-colors hover:text-primary-strong"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
