# 03 — Component Inventory

*Frozen. Style lives in 04; this is the building blocks + their STATES. The states column is where consistency lives.*

```
COMPONENT            STATES NEEDED
Button (primary/     default / hover / focus / disabled / loading
  secondary/ghost)
Link                 default / hover / focus / visited
Input / Select       empty / focused / filled / error / disabled
Textarea             empty / focused / filled / error
Checkbox (consent)   unchecked / checked / focus / error (required)
Card (course/        default / hover
  result/post)
Nav                  desktop / mobile (hamburger) / scrolled
Footer               static (NAP, nav, areas, privacy)
EnquiryForm          idle / submitting / success / error
WhatsApp/Call CTA    default / hover (deep-links: wa.me + tel:)
ClassRouter (chips)  default / hover / selected
ConceptGapTest       intro / in-progress (+progress bar) / result / submitting / submitted /
                       error / empty(no-answers) / failed-submit(result still shown)
ResultCreative       default / lightbox-open
FAQ accordion        collapsed / expanded
MapEmbed             loading / loaded / failed (fallback: address text + directions link)
Toast/alert          success / warning / error
Page-level           loading / empty / error / 404
```

**Form security is a component requirement (every form):**
- **Honeypot** — a hidden field humans never see; if filled → silently reject.
- **Server-side validation** — re-check every field on the server (name, valid Indian mobile, class in allowed set, consent = true). Never trust the browser.
- **Rate limiting** — cap submissions per IP/session window.
- **Consent checkbox** — required true before submit (DPDP; minors' data).

**Reused everywhere (build once):** Button, Card, EnquiryForm, WhatsApp/Call CTA, section heading. The Concept-Gap Test reuses ClassRouter + Button + EnquiryForm's submit path.

**Done-check:** every screen in 03b assembles from this list; every form lists honeypot + validation + rate-limit + consent.
