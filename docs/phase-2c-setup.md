# Phase 2c setup - tests + marks

Run once in the Supabase SQL editor (staff-only, deny-by-default).

```sql
create table if not exists public.tests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  name text not null,
  date date,
  batch_id uuid references public.batches(id) on delete set null,
  total_marks integer,
  syllabus text
);

create table if not exists public.marks (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  test_id uuid not null references public.tests(id) on delete cascade,
  student_id uuid not null references public.students(id) on delete cascade,
  marks_obtained integer,
  remark text,
  unique (test_id, student_id)
);

alter table public.tests enable row level security;
alter table public.marks enable row level security;

create policy "staff all tests" on public.tests for all to authenticated
  using (exists (select 1 from public.staff s where s.user_id = auth.uid()))
  with check (exists (select 1 from public.staff s where s.user_id = auth.uid()));

create policy "staff all marks" on public.marks for all to authenticated
  using (exists (select 1 from public.staff s where s.user_id = auth.uid()))
  with check (exists (select 1 from public.staff s where s.user_id = auth.uid()));
```

Then go to `/admin/tests`, create a test (pick a batch), open it, enter each student's marks,
and Save. A WhatsApp button per student sends the result + focus area to the parent.
