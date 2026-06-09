"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { deleteAllLeads } from "@/app/admin/actions";

export default function DeleteAllLeads({ count }: { count: number }) {
  const router = useRouter();
  const [pending, start] = useTransition();

  function onClick() {
    if (count === 0) return;
    if (!confirm(`Delete ALL ${count} leads? This permanently removes every enquiry and cannot be undone.`)) return;
    if (!confirm("Are you absolutely sure? This is final.")) return;
    start(async () => {
      await deleteAllLeads();
      router.refresh();
    });
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={pending || count === 0}
      className="inline-flex items-center gap-2 rounded-full border border-error/40 px-4 py-2 text-sm font-semibold text-error hover:bg-error/5 disabled:opacity-50"
    >
      <Trash2 size={15} strokeWidth={2} /> {pending ? "Deleting..." : "Delete all"}
    </button>
  );
}
