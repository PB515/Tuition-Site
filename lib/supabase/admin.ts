import { createClient } from "@supabase/supabase-js";

// SERVER-ONLY admin client (service/secret key). Bypasses RLS - use only in
// server actions for controlled admin operations (parent invites/resets).
// Never import this into a client component.
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SECRET_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } },
  );
}
