# Phase 4 (Students) - SQL

A read-only view that pre-aggregates attendance %, pending-fee count and last test per student,
so the students table can show those columns without N queries per page. `security_invoker = true`
makes the view respect the caller's RLS (staff see all; the view is only queried from the admin).

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
  lm.last_test_name, lm.last_test_marks, lm.last_test_total
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
