export default function PageHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="border-b border-border bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-20">
        {eyebrow && (
          <p
            className="animate-fade-up text-xs font-semibold uppercase tracking-[0.16em] text-primary-strong"
            style={{ animationDelay: "0ms" }}
          >
            {eyebrow}
          </p>
        )}
        <h1
          className="animate-fade-up mt-3 max-w-3xl font-heading text-4xl font-bold leading-[1.1] tracking-tight text-ink sm:text-5xl"
          style={{ animationDelay: eyebrow ? "80ms" : "0ms" }}
        >
          {title}
        </h1>
        {subtitle && (
          <p
            className="animate-fade-up mt-4 max-w-2xl text-lg leading-relaxed text-ink-muted"
            style={{ animationDelay: eyebrow ? "160ms" : "90ms" }}
          >
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
