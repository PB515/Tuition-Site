# Phase 1.5 setup - admin login + leads dashboard

The admin area at `/admin` is built (security-first: auth -> RLS -> denial -> features).
To switch it on, do this once in Supabase. No new Vercel env vars are needed.

## 1. Access rules (RLS) - run in the Supabase SQL editor

```sql
-- staff table: who is allowed into the admin
create table if not exists public.staff (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz default now()
);
alter table public.staff enable row level security;

-- a logged-in user may read only their own staff row (to confirm they are staff)
create policy "staff see self"
  on public.staff for select to authenticated
  using (user_id = auth.uid());

-- leads: only staff may read and update (the public stays INSERT-only, no read)
create policy "staff read leads"
  on public.leads for select to authenticated
  using (exists (select 1 from public.staff s where s.user_id = auth.uid()));

create policy "staff update leads"
  on public.leads for update to authenticated
  using (exists (select 1 from public.staff s where s.user_id = auth.uid()))
  with check (exists (select 1 from public.staff s where s.user_id = auth.uid()));
```

## 2. Create your staff login (there is NO public signup)
Supabase -> Authentication -> Users -> **Add user** -> enter an email + password and tick
**Auto Confirm User**. That email/password is your `/admin` login.

## 3. Make that user "staff"
Authentication -> Users -> copy the new user's **UID**, then run:
```sql
insert into public.staff (user_id) values ('PASTE-USER-UID-HERE');
```

## 4. (recommended) Close public signups
Authentication -> Providers -> Email -> turn OFF "Allow new users to sign up", so only you
can add staff accounts.

## Test - the denial gate AND the feature
- Open `/admin` while logged OUT -> redirected to `/admin/login`. (route guard)
- The public form still only INSERTs; anon cannot SELECT leads (no read policy for anon). (denial)
- Log in at `/admin/login` -> you see all leads, can change status, and WhatsApp a lead.
- A logged-in user who is NOT in the `staff` table sees ZERO leads (RLS denies). This is the
  future-proofing: when parents get accounts in Phase 3, they still cannot read leads.

> Why a `staff` table instead of "any logged-in user": in Phase 3 parents will also have logins.
> Gating on staff membership means a parent account can never read the leads table.
