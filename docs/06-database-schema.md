# 06 — Database Schema

*Frozen. Every "writes:" line in the Flow Map (01) has a home here. Mark required* / unique / PII / server-only.*

### Phase 1 (live now): `leads`
```
TABLE: leads
  id              uuid pk default gen_random_uuid()
  created_at      timestamptz default now()
  name*           text          (parent or student name)         PII
  phone*          text          (Indian mobile, server-validated) PII
  student_class   text          (9 / 10 / 11 / 12 / applied / jee / gujcet / other)
  course_interest text
  source*         text          (home-form / seo:<slug> / gap-test / contact)
  gap_result      jsonb         (Concept-Gap Test: weak/strong chapter tags — nullable)
  message         text          (nullable)
  consent_at      timestamptz*  (DPDP — required true at submit)  server-only-meaning
  status          text default 'new'  (new→enquired→visited→joined→not_interested)  server-only

SECURITY (RLS ON):
  - public role: INSERT-ONLY via Server Action; NO public SELECT/UPDATE/DELETE.
  - reads happen only from the Phase 1.5 authenticated admin (staff role).
WHAT NEVER LEAVES THE SERVER: the full leads table, status, Resend/Supabase keys.
```
*Honeypot field is NOT stored — checked server-side then discarded. Rate-limit state lives in middleware/edge, not a table (or a small `rate_hits` table if needed).*

### Later phases (sketch — specified in detail in data-model-security.md when built)
```
students (id, name, parent_name, parent_phone, class, board, school, batch_id, admission_date, active)  PII, per-row private
parents  (auth user ↔ student link)                                                                      private
batches  (id, name, class, timing)
attendance (id, student_id, date, status)                                                                private
tests    (id, name, date, class, batch_id, syllabus)
marks    (id, student_id, test_id, obtained, total, topic, remark)                                       private
fees     (id, student_id, month, amount, paid, due_date, mode)                                           private, sensitive
staff    (auth user, role)
```

**Done-check:** Flow 1/3/5 `lead` writes → `leads` ✓ · gap-test result → `leads.gap_result` ✓ · public is insert-only, no public read ✓.
