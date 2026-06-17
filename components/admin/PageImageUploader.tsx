"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Upload, Trash2, ExternalLink } from "lucide-react";
import { uploadSiteImage, removeSiteImage } from "@/app/admin/images/actions";
import { compressImage, formatBytes } from "@/lib/compress-image";

// Compact, in-row image uploader used on the admin Website page, so each SEO
// page's image is managed next to the page itself (instead of crowding the
// Images screen). Reuses the same auto-WebP compression + upload action.
export default function PageImageUploader({
  slot,
  label,
  path,
  currentUrl,
}: {
  slot: string;
  label: string;
  path: string;
  currentUrl: string | null;
}) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [err, setErr] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [note, setNote] = useState<string | null>(null);

  function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const original = e.target.files?.[0];
    e.target.value = "";
    if (!original) return;
    setErr(null);
    setNote(null);
    start(async () => {
      setStatus("Optimizing...");
      let file = original;
      try {
        file = await compressImage(original);
      } catch {
        file = original;
      }
      if (file.size > 5 * 1024 * 1024) {
        setStatus(null);
        setErr("Image too large even after optimizing. Crop it smaller, or save it as a JPG.");
        return;
      }
      setStatus("Uploading...");
      const fd = new FormData();
      fd.set("slot", slot);
      fd.set("file", file);
      try {
        const r = await uploadSiteImage(fd);
        if (r?.error) {
          setErr(r.error);
        } else {
          if (file !== original) {
            setNote(`Optimized: ${formatBytes(original.size)} → ${formatBytes(file.size)} (WebP)`);
          }
          router.refresh();
        }
      } catch {
        setErr("Upload failed. Please check your connection and try again.");
      } finally {
        setStatus(null);
      }
    });
  }

  function onRemove() {
    if (!confirm("Remove this page image?")) return;
    start(async () => {
      await removeSiteImage(slot);
      router.refresh();
    });
  }

  return (
    <li className="px-4 py-3">
      <div className="flex items-center justify-between gap-4">
        <a
          href={path}
          target="_blank"
          rel="noopener noreferrer"
          className="group min-w-0"
        >
          <span className="font-medium text-ink group-hover:text-primary-strong">{label}</span>
          <span className="block truncate text-xs text-ink-muted">{path}</span>
        </a>
        <div className="flex shrink-0 items-center gap-2">
          {currentUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={currentUrl}
              alt=""
              className="h-9 w-14 rounded border border-border object-cover"
            />
          ) : (
            <span className="flex h-9 w-14 items-center justify-center rounded border border-dashed border-border text-[10px] text-ink-muted">
              No image
            </span>
          )}
          <label className="inline-flex cursor-pointer items-center gap-1.5 rounded-full bg-primary-strong px-3 py-1.5 text-xs font-semibold text-white hover:bg-primary-deep">
            <Upload size={13} strokeWidth={2} /> {currentUrl ? "Replace" : "Upload"}
            <input type="file" accept="image/*" onChange={onFile} disabled={pending} className="hidden" />
          </label>
          {currentUrl && (
            <button
              type="button"
              onClick={onRemove}
              disabled={pending}
              className="inline-flex items-center rounded-full border border-error/40 px-2 py-1.5 text-error hover:bg-error/5"
              aria-label="Remove image"
            >
              <Trash2 size={13} strokeWidth={1.75} />
            </button>
          )}
          <a href={path} target="_blank" rel="noopener noreferrer" className="text-primary" aria-label="Open page">
            <ExternalLink size={15} strokeWidth={1.75} />
          </a>
        </div>
      </div>
      {status && <p className="mt-1 text-xs text-ink-muted">{status}</p>}
      {note && !status && <p className="mt-1 text-xs text-primary-strong">{note}</p>}
      {err && <p className="mt-1 text-xs text-error">{err}</p>}
    </li>
  );
}
