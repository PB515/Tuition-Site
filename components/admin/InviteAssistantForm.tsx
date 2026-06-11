"use client";

import { useActionState } from "react";
import { inviteAssistant, type AssistantState } from "@/app/admin/settings/actions";

const initial: AssistantState = { ok: false };
const field =
  "w-full rounded-lg border border-border bg-bg px-3 py-2 text-sm text-ink focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30";

export default function InviteAssistantForm() {
  const [state, action, pending] = useActionState(inviteAssistant, initial);

  return (
    <div>
      <form action={action} className="flex flex-wrap items-end gap-2">
        <label className="block min-w-[12rem] flex-1 text-sm">
          <span className="font-medium text-ink">Assistant email</span>
          <input name="email" type="email" required className={`mt-1 ${field}`} />
        </label>
        <button
          type="submit"
          disabled={pending}
          className="rounded-full bg-primary-strong px-5 py-2 text-sm font-semibold text-white hover:bg-primary-deep disabled:opacity-60"
        >
          {pending ? "Creating..." : "Invite assistant"}
        </button>
      </form>

      {state.error && <p className="mt-2 text-sm text-error">{state.error}</p>}

      {state.ok && state.link && (
        <div className="mt-2 rounded-lg border border-border bg-bg p-3">
          <p className="text-sm font-medium text-ink">
            {state.mode === "invite" ? "Invite link ready" : "Reset link ready"} - send it to the assistant.
          </p>
          <p className="mt-1 text-xs text-ink-muted">
            They open it, set a password, and can then sign in at the admin.
          </p>
          <p className="mt-2 break-all text-xs text-ink-muted">{state.link}</p>
        </div>
      )}
    </div>
  );
}
