# 11 — Analytics & Events

*Living. Decide here early so components are built with hooks in place. Instrument BEFORE launch.*

```
ANALYTICS TOOL: COOKIELESS (Vercel Analytics or Plausible) — chosen.
  Why: clean DPDP story, no consent banner for analytics, counts everyone; the site handles
  minors' data so privacy-first is the right posture. No GA4 in v1 (no cookies/cross-border).
  Privacy policy MUST match this (cookieless, no ad cookies, India region).

URL STRUCTURE (clean, stable — no improvised slugs):
  / · /maths-concept-gap-test · /about-snehal-soni-sir · /courses · /results ·
  /teaching-method · /blog · /blog/[slug] · /contact · /privacy
  /class-10-maths-coaching-vadodara · /class-12-… · /applied-maths-… · /gujcet-… · /maths-tuition-new-sama-road

META PER PAGE: title + description + Open Graph on EVERY page.
  Title pattern: "<Page> — Inspire Academy of Mathematics, Vadodara" (firm name ONCE, not doubled).

STRUCTURED DATA:
  - LocalBusiness / EducationalOrganization on home + contact (name, address 3 Nand Complex New Sama Road,
    phone 9016679929, geo, areaServed: New Sama Road/Sama/Karelibaug/…, openingHours TBD)
  - Person (Snehal Soni Sir) on /about-snehal-soni-sir
  - Article on each /blog/[slug]
  - FAQPage on pages with FAQ sections

KEY EVENTS (the funnel — the numbers that prove it works):
  - gap_test_started        (Concept-Gap Test begun)        ← killer_feature_started
  - gap_test_completed       (result shown)                  ← killer_feature_completed
  - enquiry_whatsapp_click    (wa.me CTA)                     ← primary conversion
  - enquiry_call_click        (tel: CTA)
  - enquiry_form_submitted     (form lead)
  - seo_page_to_enquiry        (drop-off check per SEO page)
```

**Done-check:** every conversion moment in 01 has a named event; every page has a title/description/schema plan; analytics is cookieless and the privacy policy will match.
