"use client";

import { useActionState } from "react";
import { MessageCircle, CheckCircle2 } from "lucide-react";
import { submitEnquiry, type EnquiryState } from "@/app/actions/enquiry";
import { WA_ENQUIRY, ENQUIRY_CLASSES, SITE } from "@/lib/site";

const initial: EnquiryState = { ok: false };

const inputBase =
  "w-full rounded-lg border border-border bg-bg px-3.5 py-2.5 text-ink placeholder:text-ink-muted/70 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30";

export default function EnquiryForm() {
  const [state, action, pending] = useActionState(submitEnquiry, initial);

  if (state.ok) {
    return (
      <div className="rounded-2xl border border-border bg-surface p-6 text-center sm:p-8">
        <CheckCircle2 size={36} strokeWidth={1.75} className="mx-auto text-primary" />
        <h3 className="mt-3 font-heading text-xl font-bold text-ink">Thank you, we have your enquiry</h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-muted">
          {SITE.teacher} or the {SITE.name} team will get back to you soon. For anything urgent,
          message us on WhatsApp.
        </p>
      </div>
    );
  }

  const fe = state.fieldErrors ?? {};

  return (
    <form action={action} className="space-y-4">
      {/* Honeypot: hidden from people, filled by bots. */}
      <div aria-hidden="true" style={{ position: "absolute", left: "-9999px" }}>
        <label>
          Company
          <input type="text" name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-ink">
          Name
        </label>
        <input id="name" name="name" type="text" required className={`mt-1.5 ${inputBase}`} />
        {fe.name && <p className="mt-1 text-sm text-error">{fe.name}</p>}
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-ink">
          Mobile number
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          inputMode="tel"
          required
          className={`mt-1.5 ${inputBase}`}
        />
        {fe.phone && <p className="mt-1 text-sm text-error">{fe.phone}</p>}
      </div>

      <div>
        <label htmlFor="student_class" className="block text-sm font-medium text-ink">
          Class
        </label>
        <select id="student_class" name="student_class" className={`mt-1.5 ${inputBase}`}>
          <option value="">Select a class</option>
          {ENQUIRY_CLASSES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        {fe.student_class && <p className="mt-1 text-sm text-error">{fe.student_class}</p>}
      </div>

      <div>
        <label htmlFor="school" className="block text-sm font-medium text-ink">
          School <span className="font-normal text-ink-muted">(optional)</span>
        </label>
        <input id="school" name="school" type="text" className={`mt-1.5 ${inputBase}`} />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-ink">
          Message <span className="font-normal text-ink-muted">(optional)</span>
        </label>
        <textarea id="message" name="message" rows={3} className={`mt-1.5 ${inputBase}`} />
      </div>

      <label className="flex items-start gap-3 text-sm text-ink-muted">
        <input
          type="checkbox"
          name="consent"
          className="mt-1 h-4 w-4 shrink-0 rounded border-border text-primary focus:ring-primary"
        />
        <span>
          I agree that Inspire Academy may contact me about math coaching using the details above.
        </span>
      </label>
      {fe.consent && <p className="text-sm text-error">{fe.consent}</p>}

      {state.error && state.error !== "not_configured" && (
        <p className="text-sm text-error">{state.error}</p>
      )}

      {state.error === "not_configured" ? (
        <div className="rounded-lg border border-border bg-surface p-4 text-sm text-ink-muted">
          The online form is not switched on yet. Please reach us directly on{" "}
          <a
            href={WA_ENQUIRY}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-primary-strong hover:text-primary-deep"
          >
            WhatsApp
          </a>
          .
        </div>
      ) : (
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-primary-strong px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-deep disabled:cursor-not-allowed disabled:opacity-60"
        >
          <MessageCircle size={18} strokeWidth={2} />
          {pending ? "Sending..." : "Send enquiry"}
        </button>
      )}
    </form>
  );
}
