"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

const inputBase =
  "w-full rounded-lg border border-border bg-bg px-3.5 py-2.5 text-ink focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30";

export default function ForgotForm() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [pending, setPending] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPending(true);
    const supabase = createClient();
    await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/confirm?next=/parent/reset`,
    });
    // Always show success (do not reveal whether the email exists).
    setSent(true);
    setPending(false);
  }

  if (sent) {
    return (
      <p className="rounded-2xl border border-border bg-surface p-5 text-sm leading-relaxed text-ink-muted">
        If that email is registered, a reset link is on its way. If you do not receive it, message
        the academy on WhatsApp and we will send you a reset link.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-ink">
          Your email
        </label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`mt-1.5 ${inputBase}`}
        />
      </div>
      <button
        type="submit"
        disabled={pending}
        className="inline-flex w-full items-center justify-center rounded-full bg-primary-strong px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-deep disabled:opacity-60"
      >
        {pending ? "Sending..." : "Send reset link"}
      </button>
    </form>
  );
}
