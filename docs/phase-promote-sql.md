# Year-end rollover - SQL

Run this once in the Supabase SQL editor (Mumbai project). It is additive and safe to
re-run (every statement is `if not exists` / `or replace`).

It adds three things:

1. `batches.academic_year` - so "10-A 2026-2027" and "10-A 2027-2028" are distinct.
2. `students.admission_no` - an auto, permanent, readable id like `2026-001`.
3. Updates the `student_overview` view so the list/table can show `admission_no`.

---

## 1. Academic year on batches

```sql
alter table public.batches
  add column if not exists academic_year text;

-- Optional: stamp existing batches with the current academic year.
-- (April-March. Adjust if your year started earlier.)
update public.batches
  set academic_year = case
    when extract(month from now()) >= 4
      then extract(year from now())::int || '-' || (extract(year from now())::int + 1)
      else (extract(year from now())::int - 1) || '-' || extract(year from now())::int
  end
  where academic_year is null;
```

## 2. Auto admission number on students

`admission_no` is `<join-year>-<running number>`, e.g. `2026-001`, resetting the
counter each year. A trigger fills it on insert so single-add **and** CSV import both
get one. It is never overwritten once set, so promotion keeps it stable for life.

```sql
alter table public.students
  add column if not exists admission_no text;

create unique index if not exists uq_students_admission_no
  on public.students(admission_no) where admission_no is not null;

create or replace function public.set_admission_no()
returns trigger
language plpgsql
as $$
declare
  yr  text;
  seq int;
begin
  if new.admission_no is null or new.admission_no = '' then
    yr := to_char(coalesce(new.admission_date, current_date), 'YYYY');
    select coalesce(max(split_part(admission_no, '-', 2)::int), 0) + 1
      into seq
      from public.students
      where admission_no like yr || '-%';
    new.admission_no := yr || '-' || lpad(seq::text, 3, '0');
  end if;
  return new;
end;
$$;

drop trigger if exists trg_set_admission_no on public.students;
create trigger trg_set_admission_no
  before insert on public.students
  for each row execute function public.set_admission_no();
```

Backfill existing students (numbers them per join year, oldest first):

```sql
with ordered as (
  select
    id,
    to_char(coalesce(admission_date, created_at, current_date), 'YYYY') as yr,
    row_number() over (
      partition by to_char(coalesce(admission_date, created_at, current_date), 'YYYY')
      order by coalesce(admission_date, created_at, current_date), id
    ) as rn
  from public.students
  where admission_no is null
)
update public.students s
  set admission_no = o.yr || '-' || lpad(o.rn::text, 3, '0')
  from ordered o
  where o.id = s.id;
```

## 3. Surface admission_no in the students list view

The list reads from `student_overview`. Re-create it with `admission_no` **appended at
the end** (every other column is unchanged from `phase-4-students-sql.md`). It must go
last: `create or replace view` cannot insert a column in the middle of an existing view.

```sql
create or replace view public.student_overview with (security_invoker = true) as
select
  s.id, s.name, s.roll_number, s.class, s.board, s.school,
  s.parent_name, s.parent_whatsapp, s.alternate_number,
  s.batch_id, s.active, s.admission_date, s.default_monthly_fee, s.remarks,
  b.name as batch_name,
  coalesce(att.total, 0)   as att_total,
  coalesce(att.present, 0) as att_present,
  coalesce(fee.pending, 0) as fee_pending,
  lm.last_test_name, lm.last_test_marks, lm.last_test_total,
  s.admission_no
from public.students s
left join public.batches b on b.id = s.batch_id
left join lateral (
  select count(*) as total,
         count(*) filter (where status in ('present','late')) as present
  from public.attendance a where a.student_id = s.id
) att on true
left join lateral (
  select count(*) filter (where not paid) as pending
  from public.fees f where f.student_id = s.id
) fee on true
left join lateral (
  select t.name as last_test_name, m.marks_obtained as last_test_marks, t.total_marks as last_test_total
  from public.marks m join public.tests t on t.id = m.test_id
  where m.student_id = s.id order by m.created_at desc limit 1
) lm on true;
```

---

## Notes

- **Academic year** in the app is treated as April-March (Indian standard). A batch
  created today (June 2026) defaults to `2026-2027`.
- **Promotion** never deletes a student. It updates `class` + `batch_id` only, so all
  attendance / marks / fees stay attached via the unchanged student `id` and
  `admission_no`.
- **History stays in Supabase** and is read live. The year-end CSV archive
  (`/admin/promote`) is a download-to-PC copy for research/backups, not a move.
