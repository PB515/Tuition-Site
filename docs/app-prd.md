# App PRD — Inspire Portal (Phase 1.5 / 2 / 3)

*PART 7 extension. Only for the authenticated phases. Layers onto 02-prd.md. The failure mode here is one user seeing another's data.*

```
ROLES
  staff (Snehal Soni Sir / admin)  — full access to all students, leads, batches, marks, fees.
  parent (Phase 3)                  — sees ONLY their own child(ren): attendance, marks, tests, fees, notices.
  student (Phase 3, optional)        — sees ONLY their own data.

WHAT EACH CAN SEE/DO
  staff:   CRUD students/parents/batches/attendance/marks/fees; manage leads; send one-click wa.me.
  parent:  READ own child's attendance/marks/test-dates/fees/announcements. No writes. No other child.
  student: READ own data only.

DATA THAT MUST STAY PRIVATE (per-child, per-parent):
  attendance, marks, fees, remarks, parent phone, school — visible only to staff and the owning parent/student.

NO-LIST (app)
  - No parent can EVER see another child's data (the cardinal rule)
  - No fees/marks exposed in any public route, API, or URL-guessable id
  - No automated WhatsApp Business API in Phase 2 (manual send only)
  - No payments in-portal (Phase 3 shows fee status, doesn't collect)

SUCCESS METRIC: staff runs daily ops (attendance/marks/fees) from the dashboard;
                (Phase 3) parents check progress without calling the academy.
```
