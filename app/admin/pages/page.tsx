import { ExternalLink } from "lucide-react";

export const dynamic = "force-dynamic";
export const metadata = { title: "Website pages", robots: { index: false, follow: false } };

const GROUPS: { title: string; items: { path: string; label: string; target: string }[] }[] = [
  {
    title: "Main pages",
    items: [
      { path: "/", label: "Home", target: "Inspire Academy, maths coaching Vadodara" },
      { path: "/about-snehal-soni-sir", label: "About Sir", target: "about Snehal Sir, best maths teacher" },
      { path: "/batches", label: "Batches", target: "maths classes / batches in Vadodara" },
      { path: "/results", label: "Results", target: "maths results in Vadodara" },
      { path: "/teaching-method", label: "Method", target: "how Sir teaches maths" },
      { path: "/blog", label: "Blog", target: "articles, long-tail SEO" },
      { path: "/contact", label: "Contact", target: "contact / enquiry" },
      { path: "/maths-concept-gap-test", label: "Concept-Gap Test", target: "free tool, lead capture" },
      { path: "/privacy", label: "Privacy", target: "policy" },
    ],
  },
  {
    title: "Batch (SEO) pages",
    items: [
      { path: "/class-9-maths-coaching-vadodara", label: "Class 9", target: "class 9 maths coaching Vadodara" },
      { path: "/class-10-maths-coaching-vadodara", label: "Class 10", target: "class 10 maths coaching Vadodara" },
      { path: "/class-11-maths-coaching-vadodara", label: "Class 11 Regular", target: "class 11 maths coaching Vadodara" },
      { path: "/class-11-applied-maths-coaching-vadodara", label: "Class 11 Applied", target: "applied maths class 11 Vadodara" },
      { path: "/class-12-maths-coaching-vadodara", label: "Class 12 Regular", target: "class 12 maths coaching Vadodara" },
      { path: "/class-12-applied-maths-coaching-vadodara", label: "Class 12 Applied", target: "applied maths class 12 Vadodara" },
      { path: "/maths-tuition-new-sama-road", label: "New Sama Road", target: "maths tuition New Sama Road" },
    ],
  },
];

export default function Page() {
  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="font-heading text-2xl font-bold text-ink">Website pages</h1>
      <p className="mt-1 max-w-2xl text-sm text-ink-muted">
        Every public page, with the search term it targets. Click any to open it in a new tab and review.
      </p>

      <div className="mt-6 space-y-8">
        {GROUPS.map((g) => (
          <section key={g.title}>
            <h2 className="font-heading text-lg font-bold text-ink">{g.title}</h2>
            <div className="mt-3 overflow-hidden rounded-2xl border border-border">
              <ul className="divide-y divide-border">
                {g.items.map((it) => (
                  <li key={it.path}>
                    <a
                      href={it.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between gap-4 px-4 py-3 transition-colors hover:bg-surface"
                    >
                      <span className="min-w-0">
                        <span className="font-medium text-ink">{it.label}</span>
                        <span className="block truncate text-xs text-ink-muted">{it.path}</span>
                      </span>
                      <span className="flex shrink-0 items-center gap-3">
                        <span className="hidden max-w-[16rem] truncate text-xs text-ink-muted sm:inline">
                          {it.target}
                        </span>
                        <ExternalLink size={15} strokeWidth={1.75} className="text-primary" />
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
