import Link from "next/link";

export const dynamic = "force-dynamic";
export const metadata = { title: "Help", robots: { index: false, follow: false } };

const GUIDES: { title: string; steps: string[] }[] = [
  {
    title: "Take attendance (daily)",
    steps: [
      "Sidebar → Attendance.",
      "Pick the date and the batch, then click Load.",
      "Tip: click 'Mark all present', then change only the few who are absent or late.",
      "Set each student's status: Present, Absent, Late or Leave.",
      "Click Save attendance. (You cannot save until every student is marked.)",
      "After saving, use the 'Notify absent / late' panel: tap WhatsApp next to a student to message their parent, or 'Copy list'.",
    ],
  },
  {
    title: "Enter test marks",
    steps: [
      "Sidebar → Tests & Marks.",
      "To make a new test: fill name, date, batch and total marks. It opens for marks entry.",
      "For each student, type the marks and set status (Appeared / Absent / Not submitted). Add a focus area if useful.",
      "Click Save marks. A summary (highest, average, lowest, above 80%, below 40%, absent) appears.",
      "Tap WhatsApp next to a student to send the result to their parent.",
    ],
  },
  {
    title: "Record a fee payment / send a reminder",
    steps: [
      "Sidebar → Fees (or open the student's profile).",
      "Find the fee row and tap 'Mark paid'.",
      "For a pending fee, tap WhatsApp to send the parent a reminder (message is pre-filled).",
      "Use the filters (month, batch, status) to find pending or overdue fees quickly.",
    ],
  },
  {
    title: "WhatsApp messages (how they work)",
    steps: [
      "We use WhatsApp for absences, marks and exams.",
      "Every WhatsApp button opens WhatsApp with the message already written, so you just press send.",
      "Nothing is ever sent automatically; you are always in control.",
      "To message a whole batch at once: Sidebar → Messages → pick recipients → type the message → send to each parent, or copy the numbers.",
    ],
  },
  {
    title: "Add a student",
    steps: [
      "Sidebar → Students → Add student.",
      "Fill the name (required), parent WhatsApp, class, board, batch and so on.",
      "Click Save (or 'Save & add another' to keep adding more).",
      "To add many at once: Students → Import CSV → download the sample file, fill it, and upload. Duplicates (same name + parent phone) are skipped automatically.",
    ],
  },
  {
    title: "Create a batch",
    steps: [
      "Sidebar → Batches.",
      "Fill the name, class and timing, tick the class days, and set a capacity.",
      "Click Add batch.",
      "Set the class days so the dashboard knows which batches run today.",
    ],
  },
  {
    title: "Follow up on enquiries (leads)",
    steps: [
      "Sidebar → Leads. Every website enquiry appears here.",
      "Set the status (New / Enquired / Visited / Joined / Not interested).",
      "Tap the phone number to call, or WhatsApp to message.",
      "Delete old leads individually, or use 'Delete all' to clear them. Export CSV for a backup.",
    ],
  },
  {
    title: "Give a parent their login",
    steps: [
      "Open the student's profile → 'Parent access' section.",
      "Type the parent's email → Create login link.",
      "Tap 'Send on WhatsApp' to send them the link. They set a password and can then see their child's attendance, marks and fees.",
      "The same button re-sends a reset link if a parent forgets their password.",
    ],
  },
  {
    title: "Change website photos, results & testimonials",
    steps: [
      "Photos: Sidebar → Images. Upload or replace any photo on the site (the recommended size is shown on each slot).",
      "Results: Sidebar → Results. Add a result (photo + title + description + year), publish, edit or delete.",
      "Testimonials: Sidebar → Testimonials. Add a quote, a review screenshot, or a YouTube video. Publish/unpublish anytime.",
      "Changes go live immediately, with no code needed.",
    ],
  },
  {
    title: "Settings & assistants",
    steps: [
      "Sidebar → Settings: academy details and the default fee.",
      "To print this guide for a new assistant, press Ctrl+P (or Cmd+P on Mac).",
      "Adding and removing assistant logins is on the Settings / Staff screen.",
    ],
  },
];

export default function Page() {
  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="font-heading text-2xl font-bold text-ink">Help &amp; how-to</h1>
      <p className="mt-1 max-w-2xl text-sm text-ink-muted">
        Step-by-step for everyday tasks.
      </p>
      <div className="mt-4">
        <Link
          href="/admin/help/sop"
          className="inline-flex items-center rounded-full bg-primary-strong px-5 py-2 text-sm font-semibold text-white hover:bg-primary-deep"
        >
          One-page SOP (print / save as PDF)
        </Link>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {GUIDES.map((g) => (
          <section key={g.title} className="rounded-2xl border border-border bg-surface p-4">
            <h2 className="font-heading text-lg font-bold text-ink">{g.title}</h2>
            <ol className="mt-2 list-decimal space-y-1.5 pl-5 text-sm leading-relaxed text-ink-muted">
              {g.steps.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ol>
          </section>
        ))}
      </div>
    </div>
  );
}
