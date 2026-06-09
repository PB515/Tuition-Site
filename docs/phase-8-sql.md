# Phase 8 (Messages + Settings) - SQL

Run in the Supabase SQL editor.

```sql
-- Reusable WhatsApp message templates
create table if not exists public.message_templates (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  body text not null,
  created_at timestamptz default now()
);
alter table public.message_templates enable row level security;
create policy "staff all templates" on public.message_templates for all to authenticated
  using (exists (select 1 from public.staff s where s.user_id = auth.uid()))
  with check (exists (select 1 from public.staff s where s.user_id = auth.uid()));

-- Single-row academy settings
create table if not exists public.app_settings (
  id int primary key default 1,
  academy_name text,
  academy_phone text,
  academy_address text,
  default_monthly_fee integer,
  updated_at timestamptz default now(),
  constraint app_settings_singleton check (id = 1)
);
alter table public.app_settings enable row level security;
create policy "staff all settings" on public.app_settings for all to authenticated
  using (exists (select 1 from public.staff s where s.user_id = auth.uid()))
  with check (exists (select 1 from public.staff s where s.user_id = auth.uid()));
insert into public.app_settings (id) values (1) on conflict (id) do nothing;
```
