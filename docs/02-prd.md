# 02 — PRD

*Frozen (approved). PRD · No-List · Killer Feature · Conversion Strategy.*

```
GOAL: Turn Vadodara parents/students searching for maths help into WhatsApp/call
      admission enquiries — by making Snehal Soni Sir's 25-year reputation legible
      online and giving parents a tool to self-diagnose their child's weak chapters.

KILLER FEATURE: Free interactive "Maths Concept-Gap Test" — routes by class, returns
      a personalised weak-chapter read, ends in a WhatsApp enquiry. No Vadodara
      competitor (maths specialist or science institute) has any self-serve tool.
```

**Competitors (condensed — see research-report.md):** maths specialists (Pi Square / Krishna / individual "sirs") are **Instagram-only, no website, no tool**; players *with* sites (Phoenix, Vyas, Ignescent) are **generalist science/JEE institutes**, not maths specialists; discovery is dominated by **directories** + **word-of-mouth teacher names**. Gap = *a maths-only brand with a real conversion site + a tool.*

```
CONVERSION STRATEGY
  Primary CTA:   WhatsApp for Admission Enquiry   (wa.me/919016679929)
  Secondary CTA: Call for Batch Details (tel:+919016679929)  /  Submit Enquiry (form)
  The one belief: "Snehal Soni Sir is an experienced, trusted maths teacher who can
                   actually fix my child's concepts — not just run another batch."
  Objections + on-page answers:
   1. "Is he really experienced / trustworthy?" → 25+ yrs since 2000 · Sir-as-hero About ·
                                                  Navrachana 97/100 (Chirayu Jani) · GBP reviews
   2. "Will my child get attention?"            → solo teacher-led · small batches · weekly tests
   3. "Boards AND competitive — focus split?"   → NCERT-first system (CBSE+GSEB) ·
                                                  Applied/GUJCET proof · honest maths-only scope
   4. "What's the fee / is there pressure?"     → soft enquiry model · "we'll explain batches &
                                                  fees directly" · no fee shown, no demo hard-sell
```

```
V1 FEATURES (phased)
  MVP / Phase 1 (this build):
    - Segment-router homepage · Concept-Gap Test (killer) · About Snehal Soni Sir
    - 5 SEO pages (Class 10 boards · Class 12 boards · Applied Maths · GUJCET · New Sama Road)
    - Results (real creatives) · Teaching Method ("Inspire Maths Learning System")
    - Contact + Google Map · Blog (3 seed posts) · enquiry form (consent + honeypot)
    - GBP + reviews as lead local-SEO asset · cookieless analytics
  Phase 1.5: Lead dashboard (admin login; enquiry status New→Enquired→Visited→Joined)
  Phase 2:   Student management (students/parents, batches, attendance, weekly marks,
             fees; one-click prefilled wa.me, admin sends manually)
  Phase 3:   Parent/Student portal + PWA (per-child private data — PART 7 security order)

NO-LIST (explicitly NOT in v1)
  - No fees shown · no demo-class promotion · no online classes · no home tuition
  - No other subjects (Physics/Chem/Bio/Science bundle) · no school-admission services
  - No guaranteed-marks/rank/selection claims · no "No.1/Best" without proof
  - No automated parent portal yet (Phase 1 = "updates when required", not a live portal)
  - No payments, no public login (Phase 1) · remaining 5 SEO pages staged for later

FORM SECURITY (every form): honeypot + server-side validation + rate limiting + consent checkbox

SUCCESS METRIC: # WhatsApp/call/form admission enquiries per month, and the Concept-Gap-Test
                started→completed rate (the funnel number that matters).
```
