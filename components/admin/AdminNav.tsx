"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "@/app/admin/actions";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/leads", label: "Leads" },
  { href: "/admin/students", label: "Students" },
  { href: "/admin/batches", label: "Batches" },
  { href: "/admin/attendance", label: "Attendance" },
  { href: "/admin/tests", label: "Tests" },
  { href: "/admin/fees", label: "Fees" },
];

export default function AdminNav({ email }: { email: string }) {
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  return (
    <header className="border-b border-border bg-surface">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <div className="flex flex-wrap items-center gap-1">
          <span className="mr-3 font-heading text-sm font-bold text-ink">Inspire Admin</span>
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
                isActive(l.href)
                  ? "bg-primary-tint text-primary-strong"
                  : "text-ink-muted hover:text-ink",
              )}
            >
              {l.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden text-xs text-ink-muted sm:inline">{email}</span>
          <form action={signOut}>
            <button
              type="submit"
              className="rounded-full border border-border px-3 py-1.5 text-sm font-medium text-ink-muted transition-colors hover:text-ink"
            >
              Sign out
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}
