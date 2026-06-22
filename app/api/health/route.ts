import { createClient } from "@/lib/supabase/server";

/**
 * Health check + free-tier keep-alive.
 *
 * Returns 200 when the DB answers. A daily external cron
 * (.github/workflows/keepalive.yml) hits this so the real DB query resets
 * Supabase's 7-day inactivity timer — the free project pauses after 7 days
 * idle, which would take the site's DB calls down until a manual restore.
 * The keepalive() function ships in supabase/migrations/*_keepalive.sql.
 */
export const dynamic = "force-dynamic"; // never cache — a cached 200 wouldn't touch the DB

export async function GET() {
  try {
    const supabase = await createClient();
    const { error } = await supabase.rpc("keepalive"); // a real DB round-trip
    if (error) {
      return Response.json({ ok: false, error: error.message }, { status: 500 });
    }
    return Response.json({ ok: true, at: new Date().toISOString() });
  } catch {
    return Response.json({ ok: false }, { status: 500 });
  }
}
