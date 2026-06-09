# Inspire Academy - Admin & Parent Feature List

A complete reference of every feature in the admin (staff) and parent areas:
**what** it does, **how** it works, and **what it affects** (the data behind it).

> Security model throughout: Supabase Postgres with Row-Level Security (RLS), deny-by-default.
> Staff see everything; parents see only their own child. The public can only insert an enquiry,
> never read private data. Reads happen in server components; writes happen in server actions.

---

## ADMIN (staff only) - `/admin`

### Sign in / role guard
- **What:** Only Snehal Soni Sir (and any account you add to `staff`) can enter the admin.
- **How:** Supabase email + password auth; `middleware.ts` redirects logged-out users to `/admin/login`; the admin layout checks the `staff` table and sends any non-staff (a parent) to `/parent`. No public signup.
- **Affects:** `auth.users`, `staff` table. No data is shown until a valid staff session exists.

### Dashboard - `/admin`
- **What:** At-a-glance counts (active students, total students, new leads, pending fees), quick-action buttons, and the 5 most recent enquiries.
- **How:** Efficient head-only count queries (`count: exact, head: true`) so it stays fast at 1000+ students; reads via the staff session (RLS).
- **Affects:** Reads `students`, `leads`, `fees`. Changes nothing.

### Leads - `/admin/leads`
- **What:** Every website enquiry. Search by name/phone, filter by status, paginate, change a lead's status (New -> Enquired -> Visited -> Joined / Not interested), one-click WhatsApp follow-up, and export to CSV.
- **How:** Server component reads with `ilike` search + `.eq` status filter + `.range` pagination. Status change is a server action (`updateLeadStatus`). WhatsApp is a prefilled `wa.me` link (you send it). CSV is a server route that streams the rows.
- **Affects:** Reads/updates `leads.status`. The public enquiry form inserts into `leads`; this is where you action them.

### Students - `/admin/students`
- **What:** The student database. Search (name/parent/phone), filter (class, batch, active), paginate, add/edit/delete, and export CSV. Each student has a full **profile**.
- **How:** Server component list with search/filter/pagination. Add/edit/delete are server actions (`createStudent` / `updateStudent` / `deleteStudent`) writing via the staff session.
- **Affects:** `students` (name, parent name + WhatsApp, class, board, school, batch, admission date, active, remarks).

### Student profile - `/admin/students/[id]`
- **What:** One screen for a student: attendance %, classes marked, pending fees, recent marks (latest 5 + "view all"), fee history, a quick **add-fee** form, **Parent access** (invite), WhatsApp-parent, and Edit.
- **How:** Parallel reads of `attendance`, `marks` (limit 5), `fees`, and a parent-link count. Attendance % is computed from present+late over total marked. "View all" goes to a paginated `/marks` page.
- **Affects:** Reads `attendance`, `marks`, `fees`, `parents`; the add-fee form inserts into `fees`.

### Batches - `/admin/batches`
- **What:** Create class batches (name, class, timing), list, delete.
- **How:** Server actions `createBatch` / `deleteBatch`.
- **Affects:** `batches`. Students are assigned to a batch; deleting a batch unlinks its students (set null).

### Attendance - `/admin/attendance`
- **What:** Pick a batch + date, mark every active student Present / Absent / Late / Leave, save, then WhatsApp each parent the result.
- **How:** Loads the batch's active students + any saved marks for that date. Save is a server action that **upserts** rows keyed on (student, date), so re-marking updates. WhatsApp is a per-student prefilled `wa.me`.
- **Affects:** `attendance` (one row per student per day, unique on student+date).

### Tests & Marks - `/admin/tests`
- **What:** Create a test (name, date, batch, total marks, syllabus). Open it to enter each student's marks + a focus area, save, and WhatsApp the result to each parent. Search/filter/paginate the test list.
- **How:** `createTest` inserts and opens the test. The marks page upserts per (test, student). WhatsApp message includes "scored X/total, focus area: ...".
- **Affects:** `tests` and `marks` (unique on test+student).

### Fees - `/admin/fees`
- **What:** Track fees at scale: **bulk add** a month's fee to a whole batch in one click, or add for one student (batch -> student cascading picker), or from the profile. Filter by batch/student/status, paginate, mark paid/pending, WhatsApp a reminder for pending fees, delete.
- **How:** `createFeesForBatch` inserts one row per active student in a batch. The single-add picker reads the chosen batch's students client-side (logged-in staff session). `togglePaid` flips the status. WhatsApp reminder is a prefilled `wa.me`.
- **Affects:** `fees` (student, month, amount, paid, due date).

### Invite parent (Parent access) - on the student profile
- **What:** Create a login for a child's parent and send it over WhatsApp. The same button re-sends a reset link for an existing parent (staff-initiated forgot-password).
- **How:** A server action uses the **admin secret key** (server-only) to `generateLink` (invite for a new email, recovery for an existing one), builds an `/auth/confirm` link on our domain, links the parent to the student in `parents`, and returns a prefilled `wa.me`. No password is ever seen by staff.
- **Affects:** `auth.users` (creates the parent account), `parents` (links parent -> child).

### CSV export - Students and Leads
- **What:** Download the full students or leads list as a spreadsheet for backup/records.
- **How:** Authenticated server routes (`/admin/export/students`, `/admin/export/leads`) build CSV from the staff-scoped query.
- **Affects:** Read-only.

---

## PARENT (invite-only) - `/parent`

### Sign in / forgot password
- **What:** A parent logs in with the email + password they set from their invite. "Forgot password" sends a reset email (self-serve), and staff can also WhatsApp a reset link.
- **How:** Supabase email + password. Invite/reset links land on `/auth/confirm`, which verifies the one-time token, starts a session, and sends the parent to set/reset their password. `middleware.ts` guards `/parent`; the parent layout sends any staff account to `/admin`.
- **Affects:** `auth.users`. No data shown without a valid parent session.

### Parent dashboard - `/parent`
- **What:** Lists the parent's own child (or children). Tap a name to open that child's progress.
- **How:** Reads the `parents` links for the logged-in user, then loads exactly those students. RLS plus the explicit link check both enforce scope.
- **Affects:** Reads `parents` + `students` (only the parent's children).

### Child progress - `/parent/child/[id]`
- **What:** Read-only view of one child: attendance %, classes marked, pending fees, recent marks (latest 5 + "view all"), and the fee history.
- **How:** First confirms the child is linked to this parent (explicit cross-user denial + RLS); if not, returns 404. Then reads attendance/marks/fees scoped to that student.
- **Affects:** Read-only on `attendance`, `marks`, `fees`.

### Cross-user denial (the security guarantee)
- **What:** A parent can never see another family's child, even by guessing a URL/id.
- **How:** Every parent read is gated twice: an explicit "is this child linked to me?" check, and database RLS that makes other rows invisible. A non-owned id returns 404.
- **Affects:** Nothing - it is a guard, proven by the 404 on a foreign child id.

### Install as an app (PWA)
- **What:** Parents can install the site to their phone home screen and open it like a native app.
- **How:** A web manifest + service worker make it installable; an "Install app" button triggers the browser prompt (iPhone uses Share -> Add to Home Screen).
- **Affects:** Nothing server-side; improves access for parents.

---

## What changes data vs what only reads

| Writes (server actions / admin) | Reads only |
|---|---|
| lead status, students, batches, attendance, tests, marks, fees, parent invites/links | dashboards, profiles, all parent views, CSV exports, search/filter/pagination |

*One-click WhatsApp everywhere is a prefilled `wa.me` link that you send manually - no per-message
cost and no WhatsApp API. Automating sends later means a WhatsApp Business provider + templates.*
