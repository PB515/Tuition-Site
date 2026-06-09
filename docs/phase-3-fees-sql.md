# Phase 3 (Fees) - SQL

Run in the Supabase SQL editor. Dedupes existing fees, backfills batch_id, then adds the
unique constraint that prevents duplicate fee rows per student per month.

```sql
-- 1. Remove duplicate fees for the same student + month (keep one)
delete from public.fees a using public.fees b
where a.student_id = b.student_id and a.month = b.month
  and a.month is not null and a.ctid < b.ctid;

-- 2. Backfill batch_id from each student's current batch
update public.fees f set batch_id = s.batch_id
from public.students s where f.student_id = s.id and f.batch_id is null;

-- 3. Prevent duplicate fees per student per month
create unique index if not exists uq_fees_student_month on public.fees (student_id, month);
```
