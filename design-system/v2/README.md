# TUȘE Design System v2.0 — Components, Patterns & Product Language

Builds on the v1.0 token foundation. **No brand change, no visual change, no token change without evidence.**

| Phase | File | Covers |
|---|---|---|
| 1 | [`01-foundations-review.md`](01-foundations-review.md) | Audit of v1.0 against the live code. 6 findings, 5 amendments, 1 rejected |
| 2 | [`02-components.md`](02-components.md) · [`components.css`](components.css) | 60+ components, ten-part spec contract, 77 production classes |
| 3 | [`03-patterns.md`](03-patterns.md) | 25 experience patterns with failure states |
| 4 | [`04-templates.md`](04-templates.md) | 17 reference layouts |
| 5 | [`05-motion.md`](05-motion.md) | Motion language and the spring budget |
| 6 | [`06-trust.md`](06-trust.md) | The trust ladder — the core product language |
| 7 | [`07-iranti.md`](07-iranti.md) | Intelligence layer language |
| 8–9 | [`08-principles-and-governance.md`](08-principles-and-governance.md) | 9 principles with tests, plus the review checklist |
| — | [`09-sprint-1a-migration-report.md`](09-sprint-1a-migration-report.md) | **Sprint 1A** — the production site migrated onto the system, verified against live |

## Install

```html
<link rel="stylesheet" href="/design-system/tokens.css">
<link rel="stylesheet" href="/design-system/v2/components.css">
```

`components.css` requires `tokens.css`. Verified: every `var()` across both files resolves, 299 properties, 77 classes, braces balanced.

## What changed in the foundation

Five additive amendments, each backed by a count from the codebase. **No pixel of the live site moves.**

| # | Amendment | Evidence |
|---|---|---|
| 1 | 4-point component grid alongside the 8-point layout grid | 134 off-grid declarations forming a clean 4-step series |
| 2 | Added 13/20/22px; deprecated five half-pixel sizes | 13px used 8× with no token; half-pixels won't survive native |
| 3 | Added `quick 200ms`, `settle 300ms` | 300ms is the 2nd most-used duration and had no token |
| 5 | Tokenised 6 loose colours | Device chrome, ticket surface, live pulse |
| 6 | Added asymmetric bubble radius | Real pattern, no token |
| 7 | Added `--text-accent` | Signal red measures 3.97:1 as text on night — an AA failure nothing prevented |

**Amendment 4 (adding the five legacy breakpoints) was rejected** — the code migrates, not the system. Documenting a rejection matters as much as documenting a change.

## The three ideas that carry the system

**Trust is falsifiable.** A badge that cannot be lost is branding, not verification. Every indicator names a check, carries a date, and can be removed.

**Never rating alone.** Score, volume, identity, behaviour — minimum three visible, and volume is never omissible.

**Motion earns its place.** Remove any animation; if nothing is harder to understand, delete it. One spring per user journey, reserved for money and time.

## Open items

1. ~~Nothing consumes these tokens yet.~~ **Done in Sprint 1A** — all 8 pages consume `assets/tokens.css`; 407 references migrated, both duplicate `:root` blocks deleted, verified byte-identical against production at 375/900/1280.
2. **Five legacy breakpoints** still live in the code.
3. ~~Muted text fails AA on the live site.~~ **Fixed in Sprint 1A** — 3.67:1 → 4.79:1.
4. **`index.html` still duplicates nav/footer/button CSS** against `site.css`. Largest remaining duplication; Sprint 1B.
4. **No component behaviour specs beyond states** — interaction models and keyboard maps are v2.1.
5. **Dark mode remains unproven at product scale.**
