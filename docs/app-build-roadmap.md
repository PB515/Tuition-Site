# App Build Roadmap — Inspire Portal

*PART 7. Security-first order — NOT features-first. The denial test is an explicit acceptance gate.*

```
PHASE 1.5 — Admin + Leads (staff only)
  1. Auth first      — Supabase Auth login/logout/session for staff; no private data yet.
  2. Access rules    — enable RLS; staff role grants; leads readable only by staff.
  3. PROVE denial    — anon user cannot read leads by URL/API. Confirm it FAILS.
  4. THEN features   — leads dashboard (status New→Enquired→Visited→Joined), one-click wa.me follow-up.
  Gate: cross-user/anon denial proven before the dashboard ships.

PHASE 2 — Student management (staff only)
  1. Tables (students/parents/batches/attendance/tests/marks/fees) with RLS deny-by-default.
  2. Staff CRUD screens; weekly marks/attendance entry; fee tracking.
  3. One-click prefilled wa.me messages (attendance/marks/exam/fee) — admin sends manually.
  Gate: still staff-only; no parent access exists yet, so no cross-user surface — but RLS already deny-by-default.

PHASE 3 — Parent/Student portal + PWA
  1. Parent auth + parent_user_id ↔ student link.
  2. RLS: parent reads ONLY their child's attendance/marks/tests/fees/announcements.
  3. PROVE denial — Parent A cannot reach Parent B's child (URL, API, id-guess). MUST fail.
  4. THEN features — read-only parent views; PWA install.
  Gate: cross-user denial proven on a real second account BEFORE launch. Non-negotiable.
```

**Deny by default, allow on purpose.** Every table/route/query closed until a policy opens it. Open-by-default guarantees a forgotten lock.
