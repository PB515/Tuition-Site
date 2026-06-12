import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import PrintButton from "@/components/admin/PrintButton";

export const dynamic = "force-dynamic";
export const metadata = { title: "SOP cheat sheet", robots: { index: false, follow: false } };

const SOP: { t: string; s: string }[] = [
  { t: "Attendance", s: "Attendance > pick date + batch > Load > 'Mark all present', fix absentees > Save > WhatsApp absentees." },
  { t: "Test marks", s: "Tests & Marks > open or create a test > type marks + status > Save > WhatsApp results to parents." },
  { t: "Fees", s: "Fees > 'Mark paid', or WhatsApp a reminder. To create: month + batch + amount > Preview > Generate." },
  { t: "Add a student", s: "Students > Add student (name + parent WhatsApp + class + batch). Many at once: Students > Import CSV." },
  { t: "Parent login", s: "Open student profile > Parent access > type email > Create login link > Send on WhatsApp." },
  { t: "Enquiries (leads)", s: "Leads > set status, tap Call or WhatsApp to follow up, delete old ones." },
  { t: "Batches", s: "Batches > name + class + academic year + timing + tick class days + capacity > Add batch." },
  { t: "Year-end promotion", s: "Year-end page. Make next year's batches first. Pick the old batch > tick a group > choose new class + batch > Promote selected. Leavers > Mark selected as left. Nothing is deleted." },
  { t: "Website photos / results", s: "Images, Results or Testimonials > upload or add, then Publish. Goes live instantly." },
  { t: "WhatsApp (important)", s: "Every WhatsApp button opens a ready-written message. You just press send. Nothing is sent automatically." },
];

export default function Page() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 print:py-0">
      <div className="flex items-center justify-between print:hidden">
        <Link
          href="/admin/help"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-muted hover:text-primary-strong"
        >
          <ArrowLeft size={15} strokeWidth={2} /> Help
        </Link>
        <PrintButton label="Save as PDF / Print" />
      </div>

      <div className="mt-5 print:mt-0">
        <h1 className="font-heading text-2xl font-bold text-ink">Inspire Academy Admin cheat sheet</h1>
        <p className="mt-1 text-sm text-ink-muted">One page of everyday tasks. Print and hand it to a new assistant.</p>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {SOP.map((item) => (
            <div key={item.t} className="rounded-lg border border-border p-3">
              <p className="font-semibold text-ink">{item.t}</p>
              <p className="mt-1 text-sm leading-relaxed text-ink-muted">{item.s}</p>
            </div>
          ))}
        </div>

        <p className="mt-5 text-xs text-ink-muted">Inspire Academy of Mathematics. Staff use only.</p>
      </div>
    </div>
  );
}
