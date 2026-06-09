# Phase 2d setup - fees

Run once in the Supabase SQL editor (staff-only, deny-by-default).

```sql
create table if not exists public.fees (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  student_id uuid not null references public.students(id) on delete cascade,
  month text,
  amount integer,
  paid boolean default false,
  due_date date,
  mode text,
  remark text
);

alter table public.fees enable row level security;

create policy "staff all fees" on public.fees for all to authenticated
  using (exists (select 1 from public.staff s where s.user_id = auth.uid()))
  with check (exists (select 1 from public.staff s where s.user_id = auth.uid()));
```

Then go to `/admin/fees`: add a fee for a student (month + amount + due date), mark it paid,
and WhatsApp a reminder for pending fees.
