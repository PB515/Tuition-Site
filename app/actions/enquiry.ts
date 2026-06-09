"use server";

import { Resend } from "resend";
import { getSupabase } from "@/lib/supabase";
import { ENQUIRY_CLASSES } from "@/lib/site";

export type EnquiryState = {
  ok: boolean;
  error?: string; // "not_configured" => show WhatsApp fallback
  fieldErrors?: Record<string, string>;
};

// Best-effort rate limit (per serverless instance). Hardening note in docs/phase-4-setup.md.
const recent = new Map<string, number>();

function normalisePhone(raw: string): string {
  let d = raw.replace(/\D/g, "");
  if (d.length === 12 && d.startsWith("91")) d = d.slice(2);
  if (d.length === 11 && d.startsWith("0")) d = d.slice(1);
  return d;
}

export async function submitEnquiry(
  _prev: EnquiryState,
  formData: FormData,
): Promise<EnquiryState> {
  // Honeypot: hidden field only bots fill. Silently accept and drop.
  if (((formData.get("company") as string) || "").trim()) {
    return { ok: true };
  }

  const name = ((formData.get("name") as string) || "").trim();
  const phoneRaw = ((formData.get("phone") as string) || "").trim();
  const studentClass = ((formData.get("student_class") as string) || "").trim();
  const school = ((formData.get("school") as string) || "").trim();
  const message = ((formData.get("message") as string) || "").trim();
  const consent = formData.get("consent") === "on";
  const phone = normalisePhone(phoneRaw);

  const fieldErrors: Record<string, string> = {};
  if (name.length < 2) fieldErrors.name = "Please enter a name.";
  if (!/^[6-9]\d{9}$/.test(phone))
    fieldErrors.phone = "Please enter a valid 10-digit mobile number.";
  if (studentClass && !ENQUIRY_CLASSES.includes(studentClass))
    fieldErrors.student_class = "Please choose a class.";
  if (!consent) fieldErrors.consent = "Please tick the box to continue.";
  if (Object.keys(fieldErrors).length) return { ok: false, fieldErrors };

  const now = Date.now();
  const last = recent.get(phone);
  if (last && now - last < 30_000) {
    return { ok: false, error: "You just sent an enquiry. Please wait a moment." };
  }

  const supabase = getSupabase();
  if (!supabase) return { ok: false, error: "not_configured" };

  const { error } = await supabase.from("leads").insert({
    name,
    phone,
    student_class: studentClass || null,
    school: school || null,
    message: message || null,
    source: "contact-form",
    consent_at: new Date().toISOString(),
  });
  if (error) {
    return { ok: false, error: "Could not save right now. Please message us on WhatsApp." };
  }
  recent.set(phone, now);

  // Email notification is best-effort: a failure here must not lose the lead.
  try {
    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.FIRM_NOTIFICATION_EMAIL;
    if (apiKey && to) {
      const resend = new Resend(apiKey);
      const from = process.env.RESEND_FROM_EMAIL || "Inspire Academy <onboarding@resend.dev>";
      await resend.emails.send({
        from,
        to,
        subject: `New enquiry: ${name} (${studentClass || "maths"})`,
        text: [
          `Name: ${name}`,
          `Phone: ${phone}`,
          `Class: ${studentClass || "-"}`,
          `School: ${school || "-"}`,
          `Message: ${message || "-"}`,
        ].join("\n"),
      });
    }
  } catch {
    // swallow: the lead is already saved
  }

  return { ok: true };
}
