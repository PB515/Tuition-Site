# 03b — Site Map & Page Layouts

*✅ APPROVED. Frozen. 06b (Image Plan) is counted from this page list.*

**Job 1 — Site Structure:** **Hybrid multi-page.** *Why:* each course/exam/locality page must rank for its own terms (multi-page), but the homepage's secondary nav (Why Us, Method, Parent Updates, FAQ) scrolls within the landing page (hybrid).

**Job 2 — Pages + nav behaviour**
```
PAGES (launch):
  /                                   home (segment router + Concept-Gap Test entry)
  /maths-concept-gap-test             the killer feature (own route, linkable/shareable)
  /about-snehal-soni-sir              the trust spine
  /courses                            index of all programmes
  /results                            real result creatives (Navrachana 97/100 etc.)
  /teaching-method                    Inspire Maths Learning System
  /blog  +  /blog/[slug]              3 seed posts
  /contact                            map + call + WhatsApp + enquiry form
  /privacy                            DPDP privacy policy (required — minors' data)
  SEO (launch 5):
    /class-10-maths-coaching-vadodara
    /class-12-maths-coaching-vadodara
    /applied-maths-coaching-vadodara
    /gujcet-maths-coaching-vadodara
    /maths-tuition-new-sama-road
  SEO (staged — later, behind blog content):
    /class-9-… · /class-11-… · /jee-maths-… · /ncert-maths-… · /maths-tuition-sama

NAV ITEMS:
  Home            → /                      (navigates)
  About Sir       → /about-snehal-soni-sir (navigates)
  Courses         → /courses               (navigates)
  Results         → /results               (navigates)
  Teaching Method → /teaching-method        (navigates)  + /#method anchor on home (hybrid)
  Blog            → /blog                   (navigates)
  Contact         → /contact               (navigates)
  WhatsApp Enquiry→ wa.me/919016679929      (button — external)
  Homepage-scroll anchors: #why-us · #method · #parent-updates · #faq
```

**Job 3 — Section order per page**
```
HOMEPAGE
  1. Hero            — "Learn Maths from Snehal Soni Sir · 25+ yrs" + segment router (class chips) + WhatsApp/Call
  2. Trust strip     — since 2000 · 25+ yrs · Navrachana 97/100 · New Sama Road
  3. Concept-Gap Test promo — "Find your child's weak chapters, free" → /maths-concept-gap-test
  4. Why Inspire     — maths-specialist · teacher-led · concept-first   (#why-us)
  5. Courses grid     — class/exam cards (icons) → course + SEO pages
  6. Teaching Method  — Inspire Maths Learning System steps   (#method)
  7. Results          — real creatives, named proof (permission granted)
  8. Parent Updates   — honest Phase-1 wording ("updates when required")   (#parent-updates)
  9. FAQ              — batch timings · batch size · tests · progress updates · fees-on-enquiry   (#faq)
  10. Contact band    — map + Call + WhatsApp + short enquiry form
  11. Footer          — NAP · nav · areas served · privacy link

SEO PAGE (template — all 5 launch pages)
  1. Hero (class/exam + Vadodara + Sir)  2. Who it's for  3. What's covered (NCERT → CBSE+GSEB)
  4. How Sir teaches it  5. Proof/results  6. FAQ (page-specific)  7. Enquiry CTA (WhatsApp/Call)

COURSE INDEX (/courses): intro → cards (each class/exam: who it's for · covered · tests · CTA) → enquiry band
ABOUT SNEHAL SONI SIR: 1. Portrait + 25-yr story  2. Qualification(TBD)/credentials  3. Teaching philosophy
  4. Why maths-only  5. Result proof  6. Enquiry CTA
RESULTS: 1. Headline proof (97/100)  2. Result creatives grid  3. (testimonials — deferred state)  4. Enquiry CTA
TEACHING METHOD: named system steps (concept → NCERT base → practice → doubt → test → feedback) → CTA
CONTACT: map embed (3 Nand Complex, New Sama Road) · Call · WhatsApp · enquiry form (consent+honeypot) · timings
CONCEPT-GAP TEST (/maths-concept-gap-test): class router → 8–10 Qs → gap result → WhatsApp CTA
  (loading-with-timeout / empty / failed states — never an endless spinner; result renders even if submit fails)
BLOG / PRIVACY: standard article template / DPDP policy
```

**Done-check:** structure declared with reason ✓ · every page listed ✓ · every nav item navigate-or-scroll ✓ · every page section order ✓ · **signed off ✓**.
