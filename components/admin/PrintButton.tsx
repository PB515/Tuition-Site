"use client";

import { Printer } from "lucide-react";

export default function PrintButton({
  label = "Save as PDF / Print",
  className,
}: {
  label?: string;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className={
        className ??
        "inline-flex items-center gap-2 rounded-full bg-primary-strong px-5 py-2 text-sm font-semibold text-white hover:bg-primary-deep print:hidden"
      }
    >
      <Printer size={15} strokeWidth={2} /> {label}
    </button>
  );
}
