# Phase 2b setup - attendance

Run once in the Supabase SQL editor (staff-only, deny-by-default).

```sql
create table if not exists public.attendance (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  student_id uuid not null references public.students(id) on delete cascade,
  date date not null,
  status text not null,
  unique (student_id, date)
);

alter table public.attendance enable row level security;

create policy "staff all attendance" on public.attendance for all to authenticated
  using (exists (select 1 from public.staff s where s.user_id = auth.uid()))
  with check (exists (select 1 from public.staff s where s.user_id = auth.uid()));
```

Then go to `/admin/attendance`, pick a batch + date, mark everyone, and Save. After saving,
a WhatsApp button appears per student to message the parent.
