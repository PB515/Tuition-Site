export const dynamic = "force-dynamic";
export const metadata = { title: "Messages", robots: { index: false, follow: false } };

export default function Page() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <h1 className="font-heading text-2xl font-bold text-ink">Messages</h1>
      <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink-muted">
        The WhatsApp hub: reusable message templates and a log of who has been notified. Sending
        stays one-tap and manual (no per-message cost). This screen is built in the Messages phase.
      </p>
    </div>
  );
}
