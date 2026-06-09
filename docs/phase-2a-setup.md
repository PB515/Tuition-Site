# Phase 2a setup - students + batches

Run this once in the Supabase SQL editor. It creates the two tables with
staff-only, deny-by-default RLS (same security model as the leads dashboard).

```sql
-- batches
create table if not exists public.batches (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  name text not null,
  class text,
  timing text
);

-- students
create table if not exists public.students (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  name text not null,
  parent_name text,
  parent_whatsapp text,
  class text,
  board text,
  school text,
  batch_id uuid references public.batches(id) on delete set null,
  admission_date date,
  active boolean default true,
  remarks text
);

alter table public.batches enable row level security;
alter table public.students enable row level security;

-- staff-only: full access for staff, nothing for anyone else (deny by default)
create policy "staff all batches" on public.batches for all to authenticated
  using (exists (select 1 from public.staff s where s.user_id = auth.uid()))
  with check (exists (select 1 from public.staff s where s.user_id = auth.uid()));

create policy "staff all students" on public.students for all to authenticated
  using (exists (select 1 from public.staff s where s.user_id = auth.uid()))
  with check (exists (select 1 from public.staff s where s.user_id = auth.uid()));
```

After running it, go to `/admin/batches` to add a batch, then `/admin/students` to add students.
