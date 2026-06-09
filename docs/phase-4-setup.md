# Phase 4 setup - enquiry form (Supabase + Resend)

The enquiry form on `/contact` is fully built. It saves leads to Supabase and emails the academy
via Resend. Until the keys below are set, the form shows a calm "use WhatsApp" fallback (it never
looks broken). Do these steps once.

## 1. Supabase (free, Mumbai region)

1. Create a project at https://supabase.com. **Region: Mumbai (ap-south-1)** for India DPDP.
2. In the SQL editor, run:

```sql
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  name text not null,
  phone text not null,
  student_class text,
  school text,
  message text,
  source text,
  consent_at timestamptz,
  status text default 'new'
);

alter table public.leads enable row level security;

-- Public can ONLY insert (no read/update/delete). Reads happen later from an admin login.
create policy "anon can insert leads"
  on public.leads for insert to anon with check (true);
```

3. Project Settings > API: copy the **Project URL** and the **anon public** key.

## 2. Resend (email notification)

1. Create an account at https://resend.com and make an **API key**.
2. To send to any inbox, verify a sending domain (Domains > Add). Until then the sandbox sender
   (`onboarding@resend.dev`) only delivers to the email you signed up with.
3. Set `FIRM_NOTIFICATION_EMAIL` to where the academy wants enquiry alerts.

## 3. Keys

- Local: copy `.env.example` to `.env.local` and fill the values (never commit it).
- Vercel: add the same variables in **Project Settings > Environment Variables** (Production +
  Preview), then **redeploy**.

```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
RESEND_API_KEY
RESEND_FROM_EMAIL
FIRM_NOTIFICATION_EMAIL
```

## 4. Test (on the deployed URL)

Submit the form, then check: a row appears in the Supabase `leads` table, and the notification
email arrives. Try to read `leads` as the anon key from the browser console; it must fail (RLS).

## Notes / hardening

- Rate limiting is best-effort in-memory (per serverless instance). For heavier traffic, move it to
  a shared store (Upstash Redis) or a Supabase RPC that checks recent inserts.
- Honeypot + server-side validation + consent are already enforced in `app/actions/enquiry.ts`.
