import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import PrintButton from "@/components/admin/PrintButton";

export const dynamic = "force-dynamic";
export const metadata = { title: "Operating manual", robots: { index: false, follow: false } };

const SECTIONS: { id: string; title: string }[] = [
  { id: "start", title: "Getting started (logging in)" },
  { id: "batches", title: "Create your batches" },
  { id: "students", title: "Add a student" },
  { id: "assign", title: "Put a student in a batch" },
  { id: "import", title: "Import many students at once (CSV)" },
  { id: "attendance", title: "Take attendance (daily)" },
  { id: "tests", title: "Tests and marks" },
  { id: "fees", title: "Fees: annual fee and installments" },
  { id: "whatsapp", title: "WhatsApp messaging" },
  { id: "invite", title: "Invite a parent" },
  { id: "reset", title: "Parent password reset" },
  { id: "assistants", title: "Assistants: add and remove logins" },
  { id: "leads", title: "Leads (website enquiries)" },
  { id: "content", title: "Website content (photos, results, blog)" },
  { id: "settings", title: "Settings, reports and troubleshooting" },
];

function Section({ id, n, title, children }: { id: string; n: number; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mt-10 scroll-mt-20">
      <h2 className="font-heading text-xl font-bold text-ink">
        {n}. {title}
      </h2>
      <div className="mt-3 space-y-3 text-sm leading-relaxed text-ink-muted">{children}</div>
    </section>
  );
}
function Steps({ items }: { items: string[] }) {
  return (
    <ol className="list-decimal space-y-1.5 pl-5">
      {items.map((s, i) => (
        <li key={i}>{s}</li>
      ))}
    </ol>
  );
}
function Fields({ items }: { items: [string, string][] }) {
  return (
    <ul className="space-y-1">
      {items.map(([k, v], i) => (
        <li key={i}>
          <b className="text-ink">{k}:</b> {v}
        </li>
      ))}
    </ul>
  );
}
function Tip({ text }: { text: string }) {
  return (
    <p className="rounded-lg border border-primary/30 bg-primary-tint/40 px-3 py-2 text-ink">
      <b>Tip:</b> {text}
    </p>
  );
}

export default function Page() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 print:py-0">
      <div className="flex items-center justify-between print:hidden">
        <Link href="/admin/help" className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-muted hover:text-primary-strong">
          <ArrowLeft size={15} strokeWidth={2} /> Help
        </Link>
        <PrintButton label="Save as PDF / Print" />
      </div>

      <h1 className="mt-5 font-heading text-2xl font-bold text-ink print:mt-0">Inspire Academy admin operating manual</h1>
      <p className="mt-2 text-sm leading-relaxed text-ink-muted">
        This manual explains every step of running the academy from the admin, in the order you would
        actually do it. The first time, read it top to bottom. Later, use it as a reference, or jump to
        a section below. Press the Print button (or Ctrl+P / Cmd+P) to save or print it as a PDF.
      </p>

      <nav className="mt-6 rounded-2xl border border-border bg-surface p-4 print:hidden">
        <p className="text-sm font-semibold text-ink">Contents</p>
        <ol className="mt-2 grid list-decimal gap-x-8 gap-y-1 pl-5 text-sm text-primary-strong sm:grid-cols-2">
          {SECTIONS.map((s) => (
            <li key={s.id}>
              <a href={`#${s.id}`} className="hover:underline">
                {s.title}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <Section id="start" n={1} title="Getting started (logging in)">
        <p>You sign in to the admin to run the academy. Parents have a separate login.</p>
        <Steps
          items={[
            "Open the website. Scroll to the footer at the very bottom and click 'Staff login' (or go straight to /admin/login).",
            "Type your email and the password you set when your login was created. Click Sign in.",
            "You land on the Dashboard. The menu is the left sidebar: Dashboard, Leads, Students, Batches, Attendance, Tests & Marks, Fees, Messages, Images, Results, Testimonials, Blog, Reports, Settings, Help.",
            "When you finish, click 'Sign out' at the top right, especially on a shared computer.",
          ]}
        />
        <Tip text="The search box at the top of the screen jumps straight to a student by name. Two separate doors: staff sign in at /admin, parents sign in at /parent." />
      </Section>

      <Section id="batches" n={2} title="Create your batches">
        <p>
          A batch is a class group, for example &quot;Class 10 Evening&quot;. Make your batches first, so
          that when you add students you can place each one into a batch.
        </p>
        <Steps
          items={[
            "Sidebar → Batches.",
            "Fill the form: Name, Class, Timing (use the AM / PM buttons), Capacity.",
            "Tick the Class days the batch runs (Mon, Wed, Fri, and so on).",
            "Click Add batch. It appears in the list below.",
          ]}
        />
        <Fields
          items={[
            ["Name", "what you call the batch, e.g. Class 10 Evening"],
            ["Class", "9, 10, 11 or 12"],
            ["Timing", "free text, e.g. 6-7:30 PM"],
            ["Capacity", "the maximum number of students for the batch"],
            ["Class days", "which days it runs. The Dashboard uses this to know which batches run today"],
          ]}
        />
        <Tip text="Always tick the class days. If you do not, the Dashboard's 'Batches today' will show 0. Each batch row also has quick links: Students, Attendance, Fees." />
      </Section>

      <Section id="students" n={3} title="Add a student">
        <Steps
          items={[
            "Sidebar → Students → Add student.",
            "Fill the fields (only the name is required).",
            "Choose one of the Save buttons at the bottom.",
          ]}
        />
        <Fields
          items={[
            ["Roll / admission no", "optional reference number"],
            ["Student name", "required"],
            ["Parent name", "optional"],
            ["Parent WhatsApp", "the number only, no +91. This is used for every parent message and the parent invite, so get it right"],
            ["Alternate number", "optional second contact"],
            ["Class / Board", "the class, and CBSE or GSEB"],
            ["Batch", "pick the batch you created in step 2"],
            ["School / Admission date", "optional details"],
            ["Annual fee", "the full year's fee. Used later to generate the fee installments"],
            ["Active", "tick if the student is currently studying"],
          ]}
        />
        <p>
          <b className="text-ink">The four Save buttons:</b> Save (go back to the list), Save & add
          another (keep adding more students quickly), Save & open profile, Save & add fee.
        </p>
      </Section>

      <Section id="assign" n={4} title="Put a student in a batch">
        <Steps
          items={[
            "When adding or editing a student, choose the Batch in the form.",
            "To move many students at once: Students list → tick the checkboxes on the left → 'Assign batch' in the bar that appears → pick the batch → Apply.",
            "To change one student's batch later: open the student → Edit → change Batch → Save.",
          ]}
        />
      </Section>

      <Section id="import" n={5} title="Import many students at once (CSV)">
        <Steps
          items={[
            "Sidebar → Students → Import CSV.",
            "Click 'Download sample CSV' and open it in Excel or Google Sheets.",
            "Fill one row per student. The batch column must match an existing batch name exactly.",
            "Save the file as CSV, then upload it. It shows how many rows were found.",
            "Click Import.",
          ]}
        />
        <Tip text="Duplicates (same student name + parent phone) are skipped automatically, so it is safe to re-upload." />
      </Section>

      <Section id="attendance" n={6} title="Take attendance (daily)">
        <Steps
          items={[
            "Sidebar → Attendance.",
            "Pick the date and the batch, then click Load.",
            "Fastest way: click 'Mark all present', then change only the few who are absent or late.",
            "Set each student: Present (green), Absent (red), Late (amber), Leave (grey). Add a note if needed.",
            "When everyone is marked (Unmarked shows 0), click Save attendance. You cannot save while anyone is still Unmarked.",
            "After saving, use the 'Notify absent / late' panel: tap WhatsApp next to a student to message their parent, 'Copy list' to copy all absentees, and 'Mark as notified' to record that you informed them.",
          ]}
        />
        <Tip text="If you already marked this date and batch, it opens in edit mode so you can correct it. The summary cards at the top show Total, Present, Absent, Late, Leave and Unmarked live." />
      </Section>

      <Section id="tests" n={7} title="Tests and marks">
        <Steps
          items={[
            "Sidebar → Tests & Marks.",
            "To make a new test, fill the name, date, batch and total marks, then add the syllabus. It opens for marks entry.",
            "For each student: type the marks, set status (Appeared / Absent / Not submitted), and add a focus area or remark.",
            "Click Save marks. A summary appears: highest, average, lowest, students above 80%, students below 40%, and absent.",
            "Tap WhatsApp next to a student to send the result to the parent (this appears after you save).",
          ]}
        />
      </Section>

      <Section id="fees" n={8} title="Fees: annual fee and installments">
        <p>Fees are an annual amount, collected either in full or in installments. The generator handles this for you.</p>
        <Steps
          items={[
            "First, set the student's Annual fee in the student form (Add or Edit student).",
            "Open the student's profile → the Fees section → 'Generate a fee plan'.",
            "Pick a plan: Full year (1 payment), 6-month (2), 3-month (4), 2-month (6) or Monthly (12).",
            "Check the Total (it fills in from the annual fee) and set the First due date.",
            "For vacation months with no fee, reduce the number of installments. For a full-payment discount, type the lower total.",
            "The preview lists each installment (month, amount, due date). Click Generate plan.",
          ]}
        />
        <p>
          Each installment becomes a normal fee record. To collect: on the Fees page or the student
          profile, click 'Mark paid'. To remind a parent, tap WhatsApp on a pending fee.
        </p>
        <p>
          <b className="text-ink">The Fees dashboard</b> (Sidebar → Fees) shows the money view: Total
          due, Collected, Pending, Overdue, plus filters (month, batch, status) and bulk actions (mark
          paid, mark reminded, delete, export pending).
        </p>
        <Tip text="Re-running the generator skips any months already created, so you will not get duplicate fees." />
      </Section>

      <Section id="whatsapp" n={9} title="WhatsApp messaging">
        <p>WhatsApp is used for absences, marks and exams. Nothing is ever sent automatically.</p>
        <Steps
          items={[
            "Every WhatsApp button opens WhatsApp with the message already written. You just press send.",
            "To message a whole batch at once: Sidebar → Messages → pick recipients (a batch, or All active students).",
            "Type the message. Use {name} and it is replaced with each student's name.",
            "Send to each parent from the list, or use 'Copy numbers' to broadcast another way.",
            "Templates: save reusable messages on the Messages page, then click one to fill the box.",
          ]}
        />
      </Section>

      <Section id="invite" n={10} title="Invite a parent">
        <Steps
          items={[
            "Open the student's profile → the 'Parent access' section.",
            "Type the parent's email → Create login link.",
            "Tap 'Send on WhatsApp' to send them the link (or copy it).",
            "The parent opens the link, sets a password, and can then sign in at the parent login to see their child's attendance, marks and fees.",
          ]}
        />
        <Tip text="One parent can be linked to more than one child: invite them with the same email on each child's profile." />
      </Section>

      <Section id="reset" n={11} title="Parent password reset">
        <Steps
          items={[
            "Self-serve: the parent clicks 'Forgot password' on the parent login and gets a reset email (this needs email delivery set up).",
            "You resend a link: open the student's profile → Parent access → enter the same email → Create login link → send it. For an existing parent, this acts as a reset link.",
          ]}
        />
      </Section>

      <Section id="assistants" n={12} title="Assistants: add and remove logins">
        <Steps
          items={[
            "Sidebar → Settings → the 'Staff & assistants' section.",
            "Invite: type the assistant's email → Invite assistant → send them the link. They set a password and can sign in to the admin.",
            "Remove: click the trash icon next to a person to revoke their admin access instantly. You cannot remove yourself.",
          ]}
        />
        <Tip text="Each assistant has their own login, so when one leaves you remove only their access, and your own login is untouched." />
      </Section>

      <Section id="leads" n={13} title="Leads (website enquiries)">
        <Steps
          items={[
            "Every enquiry sent from the website appears in Sidebar → Leads.",
            "Set the status: New, Enquired, Visited, Joined or Not interested.",
            "Tap the phone number to call, or WhatsApp to message.",
            "Delete old leads one by one, or use 'Delete all'. 'Export CSV' saves a backup.",
          ]}
        />
      </Section>

      <Section id="content" n={14} title="Website content (photos, results, blog)">
        <p>You can change website content yourself, with no code. Changes go live immediately.</p>
        <Fields
          items={[
            ["Images", "Sidebar → Images. Each slot shows the recommended pixel size. Upload or replace a photo, and it appears on the site"],
            ["Results", "Sidebar → Results → add a result (photo, title, description, and optional student name, marks, class, school, year), then Publish"],
            ["Testimonials", "Sidebar → Testimonials → add a typed quote, a review screenshot, or a YouTube link, then Publish"],
            ["Blog", "Sidebar → Blog → New post. Write in markdown on the left, see the preview on the right, add a cover image, set Published and the date, then Save"],
          ]}
        />
      </Section>

      <Section id="settings" n={15} title="Settings, reports and troubleshooting">
        <p>
          <b className="text-ink">Settings:</b> academy details and the default fee. <b className="text-ink">Reports</b>{" "}
          (Sidebar → Reports): daily and monthly attendance, absent students, monthly collection, test
          performance, weak students, pending and overdue fees, and lead follow-ups. Every report has
          filters and an Export CSV button.
        </p>
        <p className="font-semibold text-ink">Common problems</p>
        <Fields
          items={[
            ["Parent did not get the link", "resend it from the student's Parent access section, and check the WhatsApp number is correct"],
            ["A fee shows 'Overdue'", "it is unpaid and past its due date. Mark it paid once collected"],
            ["Cannot save attendance", "someone is still Unmarked. Mark every student, then Save"],
            ["The invite box is missing in Settings", "the server's secret key is not set. Ask the developer to add it"],
            ["An uploaded image is not showing", "wait a moment and refresh the page"],
          ]}
        />
      </Section>

      <p className="mt-12 border-t border-border pt-5 text-xs text-ink-muted">
        Inspire Academy of Mathematics. Staff operating manual. Keep this for training new assistants.
      </p>
    </div>
  );
}
