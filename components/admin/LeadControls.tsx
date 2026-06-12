"use client";

import { useState, useTransition } from "react";
import { MessageCircle, Trash2 } from "lucide-react";
import { updateLeadStatus, deleteLead } from "@/app/admin/actions";

const STATUS = [
  { v: "new", l: "New" },
  { v: "enquired", l: "Enquired" },
  { v: "visited", l: "Visited" },
  { v: "joined", l: "Joined" },
  { v: "not_interested", l: "Not interested" },
];

export default function LeadControls({
  id,
  name,
  phone,
  status,
}: {
  id: string;
  name: string;
  phone: string;
  status: string;
}) {
  const [value, setValue] = useState(status);
  const [pending, start] = useTransition();

  const wa = `https://wa.me/91${phone}?text=${encodeURIComponent(
    `Hello ${name}, this is Inspire Academy of Mathematics about your math coaching enquiry.`,
  )}`;

  function onDelete() {
    if (!confirm(`Delete the lead from ${name}? This cannot be undone.`)) return;
    start(() => deleteLead(id));
  }

  return (
    <div className="flex items-center gap-2">
      <select
        value={value}
        disabled={pending}
        onChange={(e) => {
          const s = e.target.value;
          setValue(s);
          start(() => updateLeadStatus(id, s));
        }}
        className="rounded-lg border border-border bg-bg px-2.5 py-1.5 text-sm text-ink focus:border-primary focus:outline-none disabled:opacity-60"
      >
        {STATUS.map((s) => (
          <option key={s.v} value={s.v}>
            {s.l}
          </option>
        ))}
      </select>
      <a
        href={wa}
        target="_blank"
        rel="noopener noreferrer"
        title="WhatsApp this lead"
        className="inline-flex items-center gap-1.5 rounded-lg bg-primary-strong px-3 py-1.5 text-sm font-semibold text-white hover:bg-primary-deep"
      >
        <MessageCircle size={15} strokeWidth={2} /> WhatsApp
      </a>
      <button
        type="button"
        onClick={onDelete}
        disabled={pending}
        title="Delete lead"
        className="inline-flex items-center rounded-lg border border-error/40 px-2.5 py-1.5 text-error hover:bg-error/5 disabled:opacity-60"
      >
        <Trash2 size={15} strokeWidth={1.75} />
      </button>
    </div>
  );
}
