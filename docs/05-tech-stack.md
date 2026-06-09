# 05 — Tech Stack + Architecture

*Frozen. Every choice has a "because". Grows into the Phase 2/3 portal without re-platforming.*

```
Framework:   Next.js (App Router) — because static SEO pages + the interactive Concept-Gap
             Test + later an auth portal all live in one stack; great SEO/perf defaults.
Styling:     Tailwind CSS (v4, tokens in globals.css) — because tokens enforce the white+teal
             system mechanically; no hardcoded hex.
UI:          shadcn/ui (light) — because accessible primitives, no heavy dependency.
Database:    Supabase (Postgres, MUMBAI region) — because DPDP wants India data residency;
             RLS + Auth grow straight into the Phase 1.5/2/3 portal without re-platforming.
Email/forms: Resend — because enquiry notifications to the academy; verify a sending domain
             before real traffic (sandbox only reaches own inbox until then).
Messaging:   wa.me + tel: deep links — because Phase 1 needs zero WhatsApp API/cost.
Analytics:   Cookieless (Vercel Analytics or Plausible) — because clean DPDP story, no consent
             banner for analytics, counts everyone; minors' data → privacy-first. (see 11)
Hosting:     Vercel — because per-branch previews pair with the phase workflow; first-class Next.js.
Motion:      Framer Motion (named pieces only — see 04). JS-driven → content must render if JS slow/blocked.
```

**Architecture sketch**
```
Visitor ──► Next.js (Vercel)
              ├─ static: home, SEO pages, about, results, method, blog, privacy   (no runtime dep)
              ├─ Concept-Gap Test (client) ── logic in /lib/gap-test-config.ts (expert-reviewed)
              └─ Server Action: submit enquiry ──► Supabase `leads` (RLS: insert-only, no public read)
                                              └──► Resend ──► academy notification email

        ┌────────── LATER PHASES (same stack, nothing thrown away) ──────────┐
        │ Phase 1.5 admin login (Supabase Auth) → leads dashboard            │
        │ Phase 2 students/parents/batches/attendance/marks/fees            │
        │ Phase 3 parent/student portal + PWA (RLS per-child; PART 7)        │
        └───────────────────────────────────────────────────────────────────┘
```

**Region/compliance:** India DPDP → Supabase **Mumbai**; consent stored with each lead; minors' data handled per privacy policy.

**Done-check:** every choice has a "because"; a request traces click → Server Action → Supabase → email → back.
