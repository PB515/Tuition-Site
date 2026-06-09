import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { parentSignOut } from "./actions";

export const dynamic = "force-dynamic";

export default async function ParentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Logged-out flows (login / forgot / set / reset) render without the bar.
  if (!user) return <>{children}</>;

  return (
    <>
      <header className="border-b border-border bg-surface">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <Link href="/parent" className="font-heading text-sm font-bold text-ink">
            Inspire Academy · Parent
          </Link>
          <form action={parentSignOut}>
            <button
              type="submit"
              className="rounded-full border border-border px-3 py-1.5 text-sm font-medium text-ink-muted transition-colors hover:text-ink"
            >
              Sign out
            </button>
          </form>
        </div>
      </header>
      {children}
    </>
  );
}
