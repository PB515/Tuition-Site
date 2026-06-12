"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

// "Back to website" link for the parent area. Shown in a normal browser, hidden
// when running as an installed PWA (standalone) so the public site never opens
// inside the app. Renders nothing until we have confirmed we are NOT standalone,
// so the link never flashes in the installed app.
export default function WebsiteLink({
  className,
  label = "Back to website",
}: {
  className?: string;
  label?: string;
}) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      // iOS Safari
      (window.navigator as unknown as { standalone?: boolean }).standalone === true;
    setShow(!standalone);
  }, []);

  if (!show) return null;

  return (
    <Link
      href="/"
      className={
        className ??
        "inline-flex items-center gap-1.5 text-sm font-medium text-ink-muted transition-colors hover:text-primary-strong"
      }
    >
      <ArrowLeft size={15} strokeWidth={2} /> {label}
    </Link>
  );
}
