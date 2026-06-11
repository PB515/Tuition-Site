import { storagePublicUrl } from "@/lib/site-images";
import type { TestimonialItem } from "@/lib/content";

export default function TestimonialCard({ t }: { t: TestimonialItem }) {
  // Screenshot-only testimonial
  if (t.image_path && !t.quote) {
    return (
      <div className="overflow-hidden rounded-2xl border border-border bg-bg">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={storagePublicUrl(t.image_path)} alt="Review" className="w-full object-cover" loading="lazy" />
      </div>
    );
  }

  const author = [t.author_name, t.author_detail].filter(Boolean).join(", ");
  return (
    <figure className="flex flex-col rounded-2xl border border-border bg-surface p-5">
      {t.image_path && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={storagePublicUrl(t.image_path)} alt="" className="mb-3 h-14 w-14 rounded-full object-cover" loading="lazy" />
      )}
      {t.quote && (
        <blockquote className="text-sm leading-relaxed text-ink">&ldquo;{t.quote}&rdquo;</blockquote>
      )}
      {author && <figcaption className="mt-3 text-xs font-medium text-ink-muted">{author}</figcaption>}
    </figure>
  );
}
