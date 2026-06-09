# Scale Step 1 - database indexes

Postgres does NOT auto-index foreign keys. At 1000 students (and large attendance / marks /
fees tables), these indexes keep filtered queries fast. Run once in the Supabase SQL editor.
Safe to run anytime (idempotent).

```sql
create index if not exists idx_students_batch  on public.students(batch_id);
create index if not exists idx_students_class  on public.students(class);
create index if not exists idx_students_active on public.students(active);

create index if not exists idx_attendance_student on public.attendance(student_id);
create index if not exists idx_attendance_date    on public.attendance(date);

create index if not exists idx_marks_test    on public.marks(test_id);
create index if not exists idx_marks_student on public.marks(student_id);

create index if not exists idx_tests_batch on public.tests(batch_id);
create index if not exists idx_tests_date  on public.tests(date);

create index if not exists idx_fees_student on public.fees(student_id);
create index if not exists idx_fees_paid    on public.fees(paid);

create index if not exists idx_leads_created on public.leads(created_at);
create index if not exists idx_leads_status  on public.leads(status);
```

Later (only past several thousand students), name search can be sped up with a trigram index:
```sql
-- create extension if not exists pg_trgm;
-- create index if not exists idx_students_name_trgm on public.students using gin (name gin_trgm_ops);
```
