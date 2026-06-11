import { storagePublicUrl } from "@/lib/site-images";
import type { TestimonialItem } from "@/lib/content";

function youtubeId(url: string): string | null {
  const m = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/))([\w-]{11})/);
  return m ? m[1] : null;
}

export default function TestimonialCard({ t }: { t: TestimonialItem }) {
  const author = [t.author_name, t.author_detail].filter(Boolean).join(", ");
  const vid = t.video_url ? youtubeId(t.video_url) : null;

  // Video testimonial
  if (vid) {
    return (
      <figure className="overflow-hidden rounded-2xl border border-border bg-bg">
        <div className="aspect-video w-full">
          <iframe
            className="h-full w-full"
            src={`https://www.youtube.com/embed/${vid}`}
            title="Testimonial video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        {(t.quote || author) && (
          <figcaption className="p-4">
            {t.quote && <p className="text-sm leading-relaxed text-ink">&ldquo;{t.quote}&rdquo;</p>}
            {author && <p className="mt-2 text-xs font-medium text-ink-muted">{author}</p>}
          </figcaption>
        )}
      </figure>
    );
  }

  // Screenshot-only testimonial
  if (t.image_path && !t.quote) {
    return (
      <div className="overflow-hidden rounded-2xl border border-border bg-bg">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={storagePublicUrl(t.image_path)} alt="Review" className="w-full object-cover" loading="lazy" />
      </div>
    );
  }

  // Quote testimonial (with optional photo)
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
