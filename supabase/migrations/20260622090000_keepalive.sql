-- keepalive — free-tier anti-pause target.
-- The /api/health route calls this daily (via .github/workflows/keepalive.yml)
-- so a real DB query resets Supabase's 7-day inactivity timer and the free
-- project doesn't pause (a paused project = the site's DB calls fail until a
-- manual restore). Granted to anon so the logged-out health route can call it.
-- Safe to keep in production. (Pattern from the IDP: docs/runbooks/free-tier-uptime.md)

create or replace function public.keepalive()
returns timestamptz
language sql
stable
as $$ select now(); $$;

grant execute on function public.keepalive() to anon, authenticated;
