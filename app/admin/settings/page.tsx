export const dynamic = "force-dynamic";
export const metadata = { title: "Settings", robots: { index: false, follow: false } };

export default function Page() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <h1 className="font-heading text-2xl font-bold text-ink">Settings</h1>
      <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink-muted">
        Academy details, default monthly fee, message templates and staff access. Built in the
        Settings phase.
      </p>
    </div>
  );
}
