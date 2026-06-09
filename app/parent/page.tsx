import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";
export const metadata = { title: "Parent portal", robots: { index: false, follow: false } };

type Kid = { id: string; name: string; class: string | null; batches: { name: string } | null };

export default async function Page() {
  const supabase = await createClient();
  // RLS scopes this to only the parent's linked children.
  const { data: students } = await supabase
    .from("students")
    .select("id, name, class, batches(name)")
    .order("name");
  const kids = (students ?? []) as unknown as Kid[];

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <h1 className="font-heading text-2xl font-bold text-ink">Your children</h1>
      <p className="mt-1 text-sm text-ink-muted">Tap a name to see attendance, marks and fees.</p>

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
