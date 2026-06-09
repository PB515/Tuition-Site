# Data Model & Security — Inspire Portal

*PART 7. The schema PLUS, for every table, who may read/write which rows. Deny by default. RLS specified, not assumed.*

```
PRINCIPLE: every table starts CLOSED. No access unless a policy explicitly grants it.

TABLE          ACCESS RULE (RLS)
staff          row visible only to that auth user; role='staff' grants the staff grants below.
students       staff: all. parent: only rows where students.parent_user_id = auth.uid().
parents        the parent's own row only; staff: all.
batches        staff: all. parent: read-only the batch their child is in.
attendance     staff: all. parent: only rows where attendance.student_id ∈ (their children). READ only.
tests          staff: all. parent: read tests for their child's class/batch.
marks          staff: all. parent: only their child's rows. READ only.
fees           staff: all. parent: only their child's rows. READ only. (sensitive)
announcements  staff: write. parent: read those targeted to their child's batch/class.
leads          staff: all. public: INSERT-only (Phase 1), no select.

SERVER-ONLY (never client): service-role key, full tables, status flags, fee internals.
```

**Cross-user denial gate (non-negotiable):** before any feature that shows user data ships — log in as Parent A, try to reach Parent B's child by URL, API call, and id-guess. **It must fail.** Add to the QA gate for every app phase touching private data.

**Build order is security-first (see app-build-roadmap.md):** auth → RLS → PROVE denial → THEN features.
