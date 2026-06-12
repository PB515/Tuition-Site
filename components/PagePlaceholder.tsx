import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import WhatsappIcon from "@/components/icons/WhatsappIcon";
import { SITE, WA_ENQUIRY } from "@/lib/site";

/**
 * Soft-launch placeholder for routes not yet built out. Keeps the site usable
 * everywhere: any unbuilt page still offers a WhatsApp enquiry and a way home.
 * Real sections replace these page by page.
 */
export default function PagePlaceholder({
  title,
  note,
}: {
  title: string;
  note?: string;
}) {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-start justify-center gap-4 px-6 py-24">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary-strong">
        {SITE.name}
      </p>
      <h1 className="font-heading text-3xl font-bold text-ink sm:text-4xl">{title}</h1>
      <p className="max-w-xl text-base leading-relaxed text-ink-muted">
        {note ??
          "This page is on the way. For details right now, message Snehal Sir on WhatsApp or call the academy."}
      </p>
      <div className="flex flex-wrap gap-3 pt-2">
        <a
          href={WA_ENQUIRY}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-primary-strong px-6 py-3 text-sm font-semibold text-white hover:bg-primary-deep"
        >
          <WhatsappIcon size={18} strokeWidth={2} /> WhatsApp Enquiry
        </a>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full border border-primary px-6 py-3 text-sm font-semibold text-primary-strong hover:bg-primary-tint"
        >
          <ArrowLeft size={18} strokeWidth={2} /> Back to home
        </Link>
      </div>
    </main>
  );
}
