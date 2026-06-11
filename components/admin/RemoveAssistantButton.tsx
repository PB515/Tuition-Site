"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { removeAssistant } from "@/app/admin/settings/actions";

export default function RemoveAssistantButton({ userId, email }: { userId: string; email: string }) {
  const router = useRouter();
  const [pending, start] = useTransition();

  function onClick() {
    if (!confirm(`Remove admin access for ${email}? They will no longer be able to sign in to the admin.`)) return;
    start(async () => {
      await removeAssistant(userId);
      router.refresh();
    });
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={pending}
      title="Remove access"
      className="text-ink-muted hover:text-error disabled:opacity-60"
    >
      <Trash2 size={15} strokeWidth={1.75} />
    </button>
  );
}
