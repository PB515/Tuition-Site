"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

export default function DeleteAllButton({
  action,
  count,
  noun,
}: {
  action: () => Promise<void>;
  count: number;
  noun: string;
}) {
  const router = useRouter();
  const [pending, start] = useTransition();

  function onClick() {
    if (count === 0) return;
    if (!confirm(`Delete ALL ${count} ${noun}? This permanently removes them and cannot be undone.`)) return;
    if (!confirm("Are you absolutely sure? This is final.")) return;
    start(async () => {
      await action();
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
