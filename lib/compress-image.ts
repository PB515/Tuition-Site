// Client-side image compression. Re-encodes the chosen file to WebP at high
// (near-lossless) quality and caps the longest edge, so a heavy DSLR file
// becomes web-light BEFORE it is uploaded — which also keeps it well under the
// server's request-body limit (that limit is what made a 17 MB upload fail with
// a 404). Falls back to the original file if the browser cannot process it.

const MAX_EDGE = 2400; // px — the founder usually crops smaller; this is a safety cap
const QUALITY = 0.9; // near-lossless WebP, so quality is preserved

export async function compressImage(file: File): Promise<File> {
  if (!file.type.startsWith("image/")) return file;
  // Leave vector/animated formats untouched — a canvas would flatten them.
  if (file.type === "image/svg+xml" || file.type === "image/gif") return file;

  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, MAX_EDGE / Math.max(bitmap.width, bitmap.height));
    const w = Math.round(bitmap.width * scale);
    const h = Math.round(bitmap.height * scale);

    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) return file;
    ctx.drawImage(bitmap, 0, 0, w, h);
    bitmap.close?.();

    const blob: Blob | null = await new Promise((resolve) =>
      canvas.toBlob(resolve, "image/webp", QUALITY),
    );
    // If the browser couldn't make WebP, or it came out heavier, keep the source.
    if (!blob || blob.size >= file.size) return file;

    const name = file.name.replace(/\.[^.]+$/, "") + ".webp";
    return new File([blob], name, { type: "image/webp" });
  } catch {
    return file; // any failure: let the original through; the server validates size
  }
}

export function formatBytes(n: number): string {
  if (n >= 1024 * 1024) return `${(n / (1024 * 1024)).toFixed(1)} MB`;
  return `${Math.round(n / 1024)} KB`;
}
