/**
 * Phase 0 scaffold placeholder. Every 03b route renders this so the route
 * exists, the design tokens are wired, and the build is provable — real
 * sections land in Phases 1–4. Delete usages as each page is built out.
 */
export default function PagePlaceholder({
  title,
  note,
}: {
  title: string;
  note?: string;
}) {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col items-start justify-center gap-3 px-6 py-24">
      <p className="text-sm font-medium text-primary-strong">
        Inspire Academy of Mathematics
      </p>
      <h1 className="font-heading text-3xl font-bold text-ink sm:text-4xl">
        {title}
      </h1>
      <p className="text-ink-muted">
        {note ??
          "Phase 0 scaffold — this route exists and is intentionally empty."}
      </p>
    </main>
  );
}
