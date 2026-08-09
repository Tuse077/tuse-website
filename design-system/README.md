# TUȘE Design System — Foundation v1.0

The permanent visual foundation for every Tușe product: marketing site, customer app, artisan app, admin dashboard, iRanti, and the business portal.

This system was **extracted, not invented**. Every value below was pulled from the live tuse.ng codebase and then systemised. Where a value was corrected, the reason is stated.

| File | Purpose |
|---|---|
| `tuse.tokens.json` | Source of truth. W3C Design Tokens format — framework-agnostic. |
| `tokens.css` | Web implementation. CSS custom properties, light + dark. |
| `README.md` | This document. How to use it, and why it is the way it is. |

---

## 1. What the audit found

Before writing a single token I counted what the site actually does. That count *is* the design language:

| Signal | Finding | What it means |
|---|---|---|
| `border-radius: 2px` | **11 uses** — more than every other radius combined | Tușe is a **square-cornered brand**. The sharp corner is the editorial voice. |
| `letter-spacing: .18em` | **9 uses**, all on uppercase micro-labels | The single most recognisable typographic signature. |
| `cubic-bezier(.22,.61,.36,1)` | Used on effectively every transition | One curve carries the whole product. |
| Shadows | Every one uses **large blur + large negative spread** | Shadows sit *under* elements, never haloing them. Printed, not plastic. |
| `font-size: .875rem` | **21 uses** — the most common size on the site | 14px is the real interface body size, not 16px. |
| Serif on numbers | Prices, balances, ratings, step numbers | Numerals are display type. This is a brand asset. |
| Breakpoints | **9 different widths** (480→1080) | The one genuine inconsistency found. Rationalised to 5. |

**The thesis:** Tușe reads premium because it is *restrained*. Square corners, one curve, soft grounded shadows, serif for anything that carries weight, and enormous whitespace. The system's job is to make that restraint reproducible.

---

## 2. Token architecture

Three tiers. **Products consume tier 3 and tier 2. Never tier 1.**

```
  PRIMITIVE          SEMANTIC              COMPONENT
  --tuse-red-600  →  --color-primary   →   --btn-bg
  raw value          meaning               application
  theme-independent  resolves per theme    resolves per component
```

Why it matters: when the brand red shifts, you change **one** primitive. When dark mode needs a different red, you change **one** semantic mapping. Product code never moves.

```css
/* ✗ never */
.button { background: #E7000B; }
.button { background: var(--tuse-red-600); }

/* ✓ always */
.button { background: var(--color-primary); }
```

### Naming

`category.property.variant.state` — lowercase, dot-delimited in JSON, hyphenated in CSS.

```
color.primary            →  --color-primary
color.primary.hover      →  --color-primary-hover
spacing.24               →  --space-24
radius.large             →  --radius-lg
shadow.level2            →  --shadow-level2
motion.duration.fast     →  --duration-fast
typography.body.small    →  .ts-body-sm
```

Never encode implementation in a name. `--color-primary`, not `--color-red-button-bg`.

---

## 3. Colour

### Ramps

| Ramp | Anchor from site | Role |
|---|---|---|
| **Neutral** | `#16130F` ink, `#FBFAF8` chalk | Warm greys. Never use pure `#000`. |
| **Red** | `#E7000B` signal → `#5C0408` oxblood → `#2B0103` night | Brand. Action *and* ground. |
| **Green** | `#2EBD6B` verified | Success, verification. |
| **Gold** | `#D8A24A` | Accent, warning. |
| **Steel** | `#1F6F8B` | **The one hue added.** Informational states needed a channel that isn't red, green or gold. Deliberately low-chroma so it never competes with Signal. |

### The Red Problem — read this before building anything

Tușe's primary action colour is red. In almost every other system, red means *error*. Here it means *go*.

**Resolution:** primary is `red-600` (#E7000B); error is `red-700` (#BE0009) — one step deeper, plus mandatory supporting signals.

**Rule: an error state must never rely on colour alone.** Every error carries at least two of:
1. `--color-error` text or border
2. An error icon
3. `--color-error-subtle` background
4. Literal text naming the problem

A red button on Tușe is an invitation. A red *message* is a problem. Only the supporting signals tell them apart — which is also why this survives colour-blindness.

### Dark mode is not an inversion

The dark theme is the **night/oxblood band the brand already owns**, promoted to a full surface family. That is why it feels native rather than bolted on: users have already seen these exact surfaces in the hero, the artisan section and the footer.

Elevation on dark grounds comes from **surface lightness**, not shadow — shadows barely read on `#2B0103`.

---

## 4. Measured contrast

Every text token was computed, not assumed. **Three failed WCAG AA on first pass and were corrected:**

| Token | Was | Measured | Now | Now measures |
|---|---|---|---|---|
| `text-muted` | ink @ 52% | **3.67:1 ✗** | ink @ 60% | **4.79:1 ✓** |
| `success` | green-700 | **4.16:1 ✗** | green-800 `#177A43` | **5.16:1 ✓** |
| `warning` | gold-700 | **3.65:1 ✗** | gold-800 `#8A6224` | **5.22:1 ✓** |

> **This is a live bug, not a hypothetical.** `--ink-40: rgba(22,19,15,.52)` is used for muted text across tuse.ng today and fails AA at 3.67:1. Adopting this system fixes it.

Passing values, measured:

| | Light (on chalk) | Dark (on night) |
|---|---|---|
| Heading | 17.75:1 | 18.95:1 |
| Body | 5.49:1 | 9.83:1 |
| Muted | 4.79:1 | 6.58:1 |
| Link | 13.64:1 | 8.33:1 |
| Primary | 4.57:1 | — |
| White on primary | 4.77:1 | — |

`green-500` (#2EBD6B) measures 2.2:1 on chalk — **badge and icon only, never text.**

---

## 5. Typography

Two families, and the split is semantic:

- **Newsreader (serif)** — headings, prices, balances, ratings, step numbers. *Anything that carries weight.*
- **Inter (sans)** — body copy, labels, controls, navigation.

**Serif numerals are a Tușe signature.** `₦14,680.50` in Newsreader is doing brand work. Use `.ts-numeric` (with `tabular-nums`) for any figure a user might compare or scan.

### Scale

Display steps are fluid — `clamp(min, preferred, max)`. Mobile is *designed*, not compressed.

| Token | Family | Size | Tracking |
|---|---|---|---|
| `display-xl` | serif 500 | `clamp(2.5rem, 1rem + 6.4vw, 6.5rem)` | −0.03em |
| `display-lg` / `h1` | serif 400 | `clamp(2rem, 1.05rem + 4.2vw, 4.375rem)` | −0.028em |
| `display-md` / `h2` | serif 400 | `clamp(1.625rem, 1.15rem + 2.1vw, 2.625rem)` | −0.02em |
| `h3` | serif 500 | `clamp(1.1875rem, 1.05rem + .6vw, 1.5rem)` | −0.01em |
| `h4` / `h5` / `h6` | serif 500 | 1.4375 / 1.125 / 1.0625rem | −0.01em |
| `body-lg` | sans 400 | `clamp(1rem, .96rem + .18vw, 1.1875rem)` | 0 |
| `body` / `body-sm` | sans 400 | 1rem / 0.875rem | 0 |
| `caption` | sans 400 | 0.75rem | 0 |
| `label` | sans 600 | 0.6875rem **uppercase** | **+0.18em** |
| `button` | sans 600 | 0.875rem | +0.02em |
| `input` | sans 400 | 0.9375rem | 0 |

**Tracking law: tightens as type grows, opens as type shrinks.** Display at −0.03em; uppercase labels at +0.18em. Never uppercase without opening the tracking — it is unreadable otherwise.

### Measure

Body copy must never exceed its measure. `--measure-body` 60ch, `--measure-prose` 70ch, `--measure-display` 20ch. Long lines are the fastest way to make a premium layout feel cheap.

---

## 6. Spacing

8-point grid. `2` and `4` exist **only** for optical correction inside controls — never for layout.

`0 · 2 · 4 · 8 · 12 · 16 · 20 · 24 · 32 · 40 · 48 · 56 · 64 · 80 · 96 · 120 · 160`

Section rhythm is fluid so vertical pacing scales with the viewport:

```css
--space-section: clamp(3.75rem, 9vw, 10rem);
--space-gutter:  clamp(1.25rem, 4.6vw, 4.5rem);
```

**Whitespace is a component.** If a layout feels cramped, the answer is almost always the next step up, not a smaller font.

---

## 7. Radius

| Token | Value | Use |
|---|---|---|
| `xs` | **2px** | **DEFAULT** — buttons, cards, inputs, badges, images |
| `sm` / `md` | 4px / 6px | Nested elements only |
| `lg` | 8px | Modals, bottom sheets |
| `xl` | 16px | Large panels |
| `full` | 99px | Pills, chips, toggles |
| `circle` | 50% | Avatars only |

**2px is the brand.** Anything rounder needs a reason. A 12px radius on a Tușe button would read as a different company.

---

## 8. Elevation

Every shadow uses **large blur with large negative spread**. The shadow sits under the element instead of haloing it.

| Level | Value | Use |
|---|---|---|
| 0 | `none` | Flat, on-grid |
| 1 | `0 10px 26px -18px rgba(22,19,15,.5)` | Hovered card, store button |
| 2 | `0 24px 48px -28px rgba(22,19,15,.3)` | Raised card |
| 3 | `0 30px 70px -40px rgba(22,19,15,.35)` | Feature panel |
| 4 | `0 40px 80px -30px rgba(0,0,0,.6)` | Dark grounds only |
| floating / dropdown / popover / modal | see tokens | Overlays |

**Elevation communicates hierarchy, never decoration.** If two things are on the same plane, they get the same level. Resting cards on Tușe are **flat** and separated by hairlines — the site's card grid uses 1px dividers, not shadows. Lift on hover only.

---

## 9. Motion

**One curve does almost everything:** `--ease-standard: cubic-bezier(.22,.61,.36,1)`. Fast out, long settle. Calm, not bouncy.

| Duration | Value | Use |
|---|---|---|
| instant | 80ms | Micro-feedback |
| fast | 180ms | Button press, toggle |
| **normal** | **250ms** | **DEFAULT** — hover, colour, border |
| moderate | 350ms | Nav state, disclosure |
| slow | 500ms | Sheets, overlays |
| very-slow | 900ms | Entrance choreography |

`--ease-spring` (one controlled overshoot) is for **confirmation moments only** — a job accepted, a payment released. Never navigation.

Stagger grid children by `--stagger-tight` (55ms), capped at ~6 items. Beyond that it reads as slow, not choreographed.

**Motion must never be the only carrier of meaning.** Everything collapses to 0.001ms under `prefers-reduced-motion`, and the interface must remain fully comprehensible.

---

## 10. Icons

One visual language, no exceptions:

- **Outlined**, 24×24 grid, `round` caps and joins
- Stroke `1.7px` default · `2px` small · `2.4px` ≤16px · `1.5px` large decorative
- Sizes: 14 / 16 / 19 / 22 / 24 / 32
- **Filled is reserved** for active/selected states and rating stars

Stroke width must stay optically constant. A 32px icon at 1.7px looks thin; a 14px icon at 1.7px looks fat. Step the stroke with the size.

---

## 11. Grid & responsive

Nine ad-hoc breakpoints found; rationalised to five:

| Token | Width | Columns | Gutter |
|---|---|---|---|
| `xs` | 480px | 4 | 20px |
| `sm` | 640px | 8 | 24px |
| **`md`** | **900px** | **12** | **32px** |
| `lg` | 1080px | 12 | 48px |
| `xl` | 1400px | 12 | 72px |

**`md` (900px) is load-bearing** — navigation, two-column layouts and the artisan grid all pivot there. Container max 1400px; content max 70ch.

Mobile-first. Write the small layout, then add `@media (min-width: …)`.

---

## 12. Accessibility

Non-negotiable, and enforced in `tokens.css`:

- **Contrast** — AA minimum for all text; measured values in §4
- **Focus** — 2px solid ring, 3px offset, visible on *every* interactive element. Switches to white on dark grounds. Never remove without an equivalent replacement.
- **Touch targets** — 48px standard, 44px absolute floor, 8px minimum gap
- **Reduced motion** — honoured globally
- **Colour independence** — no state signalled by colour alone (see The Red Problem)
- **Increased contrast** — `prefers-contrast: more` darkens body, muted and border tokens

---

## 13. Adoption

### Web
```html
<link rel="stylesheet" href="/design-system/tokens.css">
```
```css
.thing {
  background: var(--color-surface);
  color: var(--text-body);
  padding: var(--space-24);
  border: var(--border-default) solid var(--color-border);
  border-radius: var(--radius-xs);
  transition: var(--transition-hover);
}
```

### React Native / Flutter
Consume `tuse.tokens.json` directly, or transform it with [Style Dictionary](https://amzn.github.io/style-dictionary/) to Swift, Kotlin, Dart or JS. The JSON is the source of truth precisely so no platform has to re-key values by hand.

### Figma
Import `tuse.tokens.json` via the Tokens Studio plugin. Figma variables and code then resolve from the same file.

### Rules for every product
1. **Never hardcode a value.** If a token doesn't exist, propose one — don't inline it.
2. **Never reference a primitive** in product code. Semantic and component tiers only.
3. **Never remove a focus style.**
4. **Never signal state with colour alone.**
5. **Never use serif for body copy, or sans for prices.**
6. **Never round a corner past 2px** without a documented reason.

### Changing a token
Primitives and semantics are versioned. Adding is a minor version; changing or removing is a major version and requires an audit of every consuming product. **Deprecate before deleting** — `ink-52` is marked deprecated rather than removed, so existing code keeps working while it migrates.

---

## 14. Known gaps

Honest list of what v1.0 does **not** yet settle:

1. **The site does not consume these tokens yet.** This foundation is additive and deliberately not wired into `index.html` or `assets/site.css` — that migration is a separate, verifiable piece of work. The brief was to extract and systemise, not to redesign.
2. **`text-muted` will visibly change** when adopted (52% → 60% ink). It is a small darkening and it fixes a real AA failure, but it *is* a visual change.
3. **Steel is untested in production.** It is the one hue not drawn from existing work.
4. **No component behaviour specs.** This is a token foundation — the sizes and spacing of components, not their interaction states, keyboard models or content rules. That is v1.1.
5. **Dark mode is unproven at scale.** The surface family is derived correctly, but no full product screen has been built in it yet.
6. **Icon set is not yet a library.** The rules are defined; the icons themselves still live inline in the markup.

---

*Foundation v1.0 · Extracted from tuse.ng · Every value measured.*
