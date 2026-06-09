import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import InstallButton from "@/components/InstallButton";

export const dynamic = "force-dynamic";
export const metadata = { title: "Parent portal", robots: { index: false, follow: false } };

type Kid = { id: string; name: string; class: string | null; batches: { name: string } | null };

export default async function Page() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Only this parent's linked children (explicit, plus RLS).
  const { data: links } = await supabase
    .from("parents")
    .select("student_id")
    .eq("user_id", user?.id ?? "");
  const ids = (links ?? []).map((l) => l.student_id);

  let kids: Kid[] = [];
  if (ids.length) {
    const { data } = await supabase
      .from("students")
      .select("id, name, class, batches(name)")
      .in("id", ids)
      .order("name");
    kids = (data ?? []) as unknown as Kid[];
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <h1 className="font-heading text-2xl font-bold text-ink">Your children</h1>
      <p className="mt-1 text-sm text-ink-muted">Tap a name to see attendance, marks and fees.</p>

      <div className="mt-5 rounded-2xl border border-border bg-surface p-4">
        <div className="flex flex-wrap items-center gap-3">
          <p className="text-sm font-medium text-ink">Get this on your phone</p>
          <InstallButton
            label="Install app"
            className="inline-flex items-center gap-2 rounded-full bg-primary-strong px-5 py-2 text-sm font-semibold text-white hover:bg-primary-deep"
          />
        </div>
        <p className="mt-1 text-xs text-ink-muted">
          On iPhone: open in Safari, tap Share, then Add to Home Screen.
        </p>
      </div>

      {kids.length === 0 ? (
        <p className="mt-6 rounded-2xl border border-border bg-surface p-6 text-sm text-ink-muted">
          No student is linked to your account yet. Please contact the academy on WhatsApp.
        </p>
      ) : (
        <div className="mt-6 grid gap-3">
          {kids.map((k) => (
            <Link
              key={k.id}
              href={`/parent/child/${k.id}`}
              className="flex items-center justify-between gap-4 rounded-2xl border border-border bg-bg p-5 transition-all hover:-translate-y-0.5 hover:border-primary hover:shadow-md"
            >
              <div>
                <p className="font-heading text-lg font-semibold text-ink">{k.name}</p>
                <p className="mt-1 text-sm text-ink-muted">
                  {[k.class, k.batches?.name].filter(Boolean).join("  ·  ") || "-"}
                </p>
              </div>
              <ArrowRight size={20} strokeWidth={1.75} className="shrink-0 text-primary" />
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
