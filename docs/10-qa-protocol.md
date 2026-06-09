# 10 — QA Checkpoint Protocol

*Living. Run at every phase gate. Never pass on "looks about right".*

```
[ ] Renders on real mobile width (360px), not just narrow desktop
[ ] All links/buttons in this phase work — wa.me/tel: open the REAL number (9016679929)
[ ] Matches Design System (colours are tokens, spacing on scale, no hardcoded hex)
[ ] Matches PRD scope for this phase — nothing extra crept in (check the No-List)
[ ] Empty / loading / error states exist where relevant
[ ] Any live-fetch (enquiry submit, gap-test, map embed) has a planned fallback —
    loading-with-timeout, empty, failed (calm message / cached) — NEVER an endless spinner;
    content stays visible if JS is slow/blocked; the gap RESULT renders even if submit fails
[ ] Motion uses named pieces only (reveal/pop-in/bounce) — no ad-hoc inline animation —
    and honors prefers-reduced-motion (page fully static & readable with it on)
[ ] No console errors
[ ] Committed to git on the phase branch
[ ] Context Anchor (CLAUDE.md) + Build Log updated
```

**Self-review before you review:** *"Review what you built against @02-prd.md and @04-design-system.md. List every deviation and missing state. Don't fix — just list."*

**Stuck-State Protocol:** if a bug isn't fixed in ~3 tries → STOP, `git checkout` to the last good commit, re-approach with a fresh session. Log the spiral here.

**App-phase add-on (Phase 1.5+):** before any feature shows user data — log in as one user, try to reach another's records (URL/API/id-guess). **It must fail.** (cross-user denial gate — see app-build-roadmap.md)
