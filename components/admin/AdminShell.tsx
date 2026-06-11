"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Inbox,
  Users,
  Boxes,
  CalendarCheck,
  ClipboardList,
  Wallet,
  MessageSquare,
  ImageIcon,
  Award,
  Quote,
  BarChart3,
  Settings as SettingsIcon,
  HelpCircle,
  Menu,
  X,
  Search,
} from "lucide-react";
import { signOut } from "@/app/admin/actions";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/leads", label: "Leads", icon: Inbox },
  { href: "/admin/students", label: "Students", icon: Users },
  { href: "/admin/batches", label: "Batches", icon: Boxes },
  { href: "/admin/attendance", label: "Attendance", icon: CalendarCheck },
  { href: "/admin/tests", label: "Tests & Marks", icon: ClipboardList },
  { href: "/admin/fees", label: "Fees", icon: Wallet },
  { href: "/admin/messages", label: "Messages", icon: MessageSquare },
  { href: "/admin/images", label: "Images", icon: ImageIcon },
  { href: "/admin/results", label: "Results", icon: Award },
  { href: "/admin/testimonials", label: "Testimonials", icon: Quote },
  { href: "/admin/reports", label: "Reports", icon: BarChart3 },
  { href: "/admin/settings", label: "Settings", icon: SettingsIcon },
  { href: "/admin/help", label: "Help", icon: HelpCircle },
];

function active(pathname: string, href: string) {
  return href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);
}

function NavLinks({ pathname, onNavigate }: { pathname: string; onNavigate?: () => void }) {
  return (
    <nav className="flex flex-col gap-1 p-3">
      {NAV.map(({ href, label, icon: Icon }) => (
        <Link
          key={href}
          href={href}
          onClick={onNavigate}
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
            active(pathname, href)
              ? "bg-primary-tint text-primary-strong"
              : "text-ink-muted hover:bg-bg hover:text-ink",
          )}
        >
          <Icon size={18} strokeWidth={1.75} />
          {label}
        </Link>
      ))}
    </nav>
  );
}

export default function AdminShell({
  email,
  children,
}: {
  email: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-bg">
      {/* Desktop sidebar */}
      <aside className="hidden w-60 shrink-0 flex-col border-r border-border bg-surface lg:flex print:hidden">
        <div className="flex h-14 items-center border-b border-border px-4 font-heading text-base font-bold text-ink">
          Inspire Admin
        </div>
        <div className="flex-1 overflow-y-auto">
          <NavLinks pathname={pathname} />
        </div>
      </aside>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-ink/30" onClick={() => setOpen(false)} />
          <aside className="absolute left-0 top-0 flex h-full w-64 flex-col border-r border-border bg-surface">
            <div className="flex h-14 items-center justify-between border-b border-border px-4">
              <span className="font-heading text-base font-bold text-ink">Inspire Admin</span>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close menu">
                <X size={20} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              <NavLinks pathname={pathname} onNavigate={() => setOpen(false)} />
            </div>
          </aside>
        </div>
      )}

      {/* Main column */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-border bg-bg/90 px-4 backdrop-blur sm:px-6 print:hidden">
          <button
            type="button"
            className="lg:hidden"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>
          <form action="/admin/students" method="get" className="max-w-md flex-1">
            <div className="relative">
              <Search
                size={16}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted"
              />
              <input
                name="q"
                placeholder="Search students..."
                className="w-full rounded-full border border-border bg-bg py-2 pl-9 pr-3 text-sm text-ink focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
          </form>
          <span className="hidden text-xs text-ink-muted sm:inline">{email}</span>
          <form action={signOut}>
            <button
              type="submit"
              className="rounded-full border border-border px-3 py-1.5 text-sm font-medium text-ink-muted transition-colors hover:text-ink"
            >
              Sign out
            </button>
          </form>
        </header>
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
