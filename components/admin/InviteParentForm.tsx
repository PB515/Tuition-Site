"use client";

import { useActionState } from "react";
import { MessageCircle } from "lucide-react";
import { inviteParent, type InviteState } from "@/app/admin/students/invite-actions";

const initial: InviteState = { ok: false };
const field =
  "w-full rounded-lg border border-border bg-bg px-3 py-2 text-sm text-ink focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30";

export default function InviteParentForm({
  studentId,
  parentWhatsapp,
}: {
  studentId: string;
  parentWhatsapp: string | null;
}) {
  const [state, action, pending] = useActionState(inviteParent, initial);

  return (
    <div>
      <form action={action} className="grid gap-2 sm:grid-cols-[1fr_auto] sm:items-end">
        <input type="hidden" name="student_id" value={studentId} />
        <input type="hidden" name="parent_whatsapp" value={parentWhatsapp ?? ""} />
        <label className="block text-sm">
          <span className="font-medium text-ink">Parent email</span>
          <input name="email" type="email" required className={`mt-1 ${field}`} />
        </label>
        <button
          type="submit"
          disabled={pending}
          className="rounded-full bg-primary-strong px-5 py-2 text-sm font-semibold text-white hover:bg-primary-deep disabled:opacity-60"
        >
          {pending ? "Creating..." : "Create login link"}
        </button>
      </form>

      {state.error && <p className="mt-2 text-sm text-error">{state.error}</p>}

      {state.ok && (
        <div className="mt-3 rounded-lg border border-border bg-surface p-3">
          <p className="text-sm font-medium text-ink">
            {state.mode === "invite" ? "Invite link ready" : "Reset link ready"} - send it to the parent.
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-3">
            {state.waLink && (
              <a
                href={state.waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-primary-strong px-4 py-1.5 text-sm font-semibold text-white hover:bg-primary-deep"
              >
                <MessageCircle size={15} strokeWidth={2} /> Send on WhatsApp
              </a>
            )}
            {state.actionLink && (
              <a
                href={state.actionLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-primary-strong hover:underline"
              >
                Open link
              </a>
            )}
          </div>
          {state.actionLink && (
            <p className="mt-2 break-all text-xs text-ink-muted">{state.actionLink}</p>
          )}
        </div>
      )}
    </div>
  );
}
