// Pure helper, safe to import from client components (no server-only imports).
const BUCKET = "site-images";

export function storagePublicUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${path}`;
}
