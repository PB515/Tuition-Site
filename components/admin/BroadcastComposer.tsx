"use client";

import { useState } from "react";

type Student = { id: string; name: string; parent_whatsapp: string | null };
type Template = { id: string; name: string; body: string };

export default function BroadcastComposer({
  students,
  templates,
}: {
  students: Student[];
  templates: Template[];
}) {
  const [msg, setMsg] = useState("");
  const [copied, setCopied] = useState(false);
  const withPhone = students.filter((s) => s.parent_whatsapp);

  function copyNumbers() {
    navigator.clipboard.writeText(withPhone.map((s) => s.parent_whatsapp).join(", "));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function wa(s: Student) {
    const text = msg.replace(/\{name\}/g, s.name);
    return `https://wa.me/91${s.parent_whatsapp}?text=${encodeURIComponent(text)}`;
  }

  return (
    <div className="mt-4 space-y-4">
      {templates.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-ink-muted">Templates:</span>
          {templates.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setMsg(t.body)}
              className="rounded-full border border-border px-3 py-1 text-sm font-medium text-ink-muted hover:border-primary hover:text-primary-strong"
            >
              {t.name}
            </button>
          ))}
        </div>
      )}

      <textarea
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
        rows={3}
        placeholder="Type a message. Use {name} for the student's name."
        className="w-full rounded-lg border border-border bg-bg px-3 py-2 text-sm text-ink focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
      />

      <div className="flex flex-wrap items-center gap-3 text-sm">
        <span className="text-ink-muted">{withPhone.length} parent(s) with a number</span>
        <button
          type="button"
          onClick={copyNumbers}
          className="rounded-full border border-border px-4 py-1.5 font-medium text-ink-muted hover:text-ink"
        >
          {copied ? "Copied" : "Copy numbers"}
        </button>
      </div>

      {withPhone.length > 0 && (
        <div className="overflow-hidden rounded-2xl border border-border">
          <ul className="divide-y divide-border">
            {withPhone.map((s) => (
              <li key={s.id} className="flex items-center justify-between gap-3 px-4 py-2.5">
                <span className="text-sm text-ink">
                  {s.name} <span className="text-ink-muted">{s.parent_whatsapp}</span>
                </span>
                <a
                  href={wa(s)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={
                    msg.trim()
                      ? "text-sm font-medium text-primary-strong hover:underline"
                      : "pointer-events-none text-sm text-ink-muted"
                  }
                >
                  WhatsApp
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
