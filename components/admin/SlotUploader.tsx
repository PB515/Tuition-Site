"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Upload, Trash2 } from "lucide-react";
import { uploadSiteImage, removeSiteImage } from "@/app/admin/images/actions";
import { compressImage, formatBytes } from "@/lib/compress-image";

export default function SlotUploader({
  slot,
  label,
  currentUrl,
  ratio,
  size,
}: {
  slot: string;
  label: string;
  currentUrl: string | null;
  ratio: string;
  size?: string;
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
      setStatus("Optimizing image...");
      let file = original;
      try {
        file = await compressImage(original);
      } catch {
        file = original;
      }
      // Backstop: if it is still too big to send, tell the founder clearly
      // instead of letting the upload fail with a blank/404 page.
      if (file.size > 5 * 1024 * 1024) {
        setStatus(null);
        setErr(
          "This image is too large to upload, even after optimizing. Please crop it to the recommended size, or save it as a JPG, and try again.",
        );
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
    if (!confirm("Remove this image? The site falls back to the placeholder.")) return;
    start(async () => {
      await removeSiteImage(slot);
      router.refresh();
    });
  }

  return (
    <div className="rounded-2xl border border-border bg-surface p-3">
      <p className="text-xs font-medium text-ink">{label}</p>
      {size && <p className="text-[11px] text-ink-muted">Recommended: {size}</p>}
      <p className="text-[11px] text-ink-muted">JPG or PNG is fine — we optimize it to WebP and keep the quality.</p>
      <div
        className="relative mt-2 overflow-hidden rounded-lg border border-border bg-primary-tint/30"
        style={{ aspectRatio: ratio }}
      >
        {currentUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={currentUrl} alt={label} className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-xs text-ink-muted">
            No image yet
          </div>
        )}
      </div>
      <div className="mt-2 flex items-center gap-2">
        <label className="inline-flex cursor-pointer items-center gap-1.5 rounded-full bg-primary-strong px-3 py-1.5 text-sm font-semibold text-white hover:bg-primary-deep">
          <Upload size={14} strokeWidth={2} /> {currentUrl ? "Replace" : "Upload"}
          <input type="file" accept="image/*" onChange={onFile} disabled={pending} className="hidden" />
        </label>
        {currentUrl && (
          <button
            type="button"
            onClick={onRemove}
            disabled={pending}
            className="inline-flex items-center rounded-full border border-error/40 px-2.5 py-1.5 text-error hover:bg-error/5"
          >
            <Trash2 size={14} strokeWidth={1.75} />
          </button>
        )}
      </div>
      {status && <p className="mt-1 text-xs text-ink-muted">{status}</p>}
      {note && !status && <p className="mt-1 text-xs text-primary-strong">{note}</p>}
      {err && <p className="mt-1 text-xs text-error">{err}</p>}
    </div>
  );
}
