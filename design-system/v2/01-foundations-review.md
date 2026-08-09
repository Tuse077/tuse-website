# Phase One — Foundations Review

**Status:** Complete. Seven findings, six amendments accepted, one rejected.

v1.0 was extracted by counting the codebase. This review does the opposite: it takes the tokens as declared and measures how far the live code actually sits from them. Where the code disagrees with the token, the code is usually telling the truth.

Method: every `padding`, `margin`, `gap`, `font-size`, `border-radius`, `transition`, `animation`, breakpoint and hex literal in `index.html` and `assets/site.css` was extracted and compared against the v1.0 token set. Script output is reproducible.

---

## Finding 1 — The 8-point grid is wrong. It is a 4-point grid. ⚠️ AMEND

**134 spacing declarations sit off the declared 8-point grid.** That is not drift; at that volume it is the actual system.

| Value | px | Count |
|---|---|---|
| `1.75rem` | 28 | 16 |
| `0.625rem` | 10 | 15 |
| `0.875rem` | 14 | 15 |
| `1.125rem` | 18 | 14 |
| `0.375rem` | 6 | 12 |
| `1.375rem` | 22 | 11 |
| `2.25rem` | 36 | 9 |
| `2.75rem` | 44 | 8 |
| `5.5rem` | 88 | 7 |

Sort the small values: **6, 10, 14, 18, 22** — a clean step of 4. Sort the large ones: **28, 36, 44, 88** — a clean step of 8.

**The real system is 4-point at component scale and 8-point at layout scale.** That is a coherent, common and defensible model, and v1.0 flattened it into a single 8-point claim that 134 declarations quietly contradict.

**Amendment accepted.** The spacing scale gains the intermediate 4-point steps. The rule becomes explicit:

> **Inside a component, step by 4. Between components, step by 8. Between sections, use the fluid rhythm tokens.**

```
component scale   2 · 4 · 6 · 8 · 10 · 12 · 14 · 16 · 18 · 20 · 22 · 24 · 28
layout scale      24 · 32 · 40 · 48 · 56 · 64 · 80 · 88 · 96 · 120 · 160
```

Nothing in the live site has to change. The token set simply stops lying about what it is.

---

## Finding 2 — The type scale has a real gap and some genuine drift. ⚠️ PARTIAL AMEND

Nine font sizes sit off the scale. They split cleanly into two groups.

**Legitimate, and missing from v1.0 — add these:**

| Value | px | Count | Role |
|---|---|---|---|
| `0.8125rem` | 13 | 8 | The step between caption (12) and body-sm (14). Genuinely used. |
| `1.25rem` | 20 | 1 | Missing rung between h5 (18) and h4 (23). |
| `1.375rem` | 22 | 2 | Missing rung. |

**Drift, and should be migrated — do not add:**

| Value | px | Count |
|---|---|---|
| `0.78125rem` | 12.5 | 3 |
| `0.71875rem` | 11.5 | 2 |
| `0.65625rem` | 10.5 | 2 |
| `0.90625rem` | 14.5 | 2 |
| `0.59375rem` | 9.5 | 3 |

Half-pixel type sizes are an artefact of scaling a base by an awkward ratio, not a decision anyone made. They render inconsistently across platforms and cannot survive translation to iOS or Android, where type is specified in whole points.

**Amendment accepted in part.** Add 13px, 20px and 22px. The half-pixel sizes are marked **deprecated** and each maps to its nearest whole step (9.5→10, 10.5→10, 11.5→12, 12.5→13, 14.5→14).

---

## Finding 3 — The motion scale is idealised, not observed. ⚠️ AMEND

v1.0 declared `80 / 180 / 250 / 350 / 500 / 900`. The codebase actually uses:

| Duration | Count | In v1.0? |
|---|---|---|
| `250ms` | 16 | ✅ |
| `300ms` | 15 | ❌ |
| `350ms` | 15 | ✅ |
| `200ms` | 8 | ❌ |
| `450ms` | 5 | ❌ |
| `400ms` | 4 | ❌ |

**300ms is the second most-used duration in the product and has no token.** 200ms is fourth and has no token. v1.0 rounded reality to a tidier-looking ramp.

**Amendment accepted.** The scale gains `200ms` and `300ms`. `180ms` is retained as `fast` because button feedback genuinely wants to be quicker than 200ms; `250ms` remains the default. The ramp becomes:

```
instant 80 · fast 180 · quick 200 · normal 250 · settle 300 · moderate 350 · slow 500 · very-slow 900
```

Eight steps is more than ideal. The alternative — telling engineers that the duration they have used 15 times does not exist — is worse.

---

## Finding 4 — Legacy breakpoints are still live. ✅ NO TOKEN CHANGE

Five non-token breakpoints remain in the code: `620px`, `760px`, `820px`, `960px`, `980px`, plus two `max-width` queries at `520px` and `899px`.

This is exactly what v1.0 predicted, and it is a **migration task, not a token problem**. The five-breakpoint scale is correct; the code has not caught up.

| Legacy | Migrate to | Note |
|---|---|---|
| 620px | 640px `sm` | Form two-column |
| 760px | 640px `sm` | |
| 820px | 900px `md` | App showcase |
| 960px, 980px | 900px `md` | Two-column page bodies |
| max-width 899px | `not (min-width: 900px)` | Invert to mobile-first |
| max-width 520px | 480px `xs` | Invert |

**Rejected as a token change.** Adding breakpoints to match the code would defeat the purpose of the audit. The code moves.

---

## Finding 5 — Six untokenised colours. ⚠️ TOKENISE

| Hex | Where | Resolution |
|---|---|---|
| `#413b34` `#3a342d` `#4a443c` `#211d18` | Phone mockup bezel gradient and side button | Legitimate device chrome. Promote to a `device.*` component token group — they are not brand colours and must never be reused as surfaces. |
| `#43040A` | Ticket/dispatch surface | Sits between `red-950` and `red-1000`. Map to a new `red-975`. |
| `#7CE8A9` | Live status pulse | A brighter verified green than `green-300`. Map to `green-200`. |

**Amendment accepted.** No new hues; three additions to existing ramps plus one isolated `device` group.

---

## Finding 6 — Asymmetric radius is an undocumented pattern. ⚠️ ADD

`3px 10px 10px 10px` and `10px 10px 10px 3px` appear in the code — message-bubble tails. This is a real, meaningful pattern (the sharp corner points at the speaker) with no token.

**Amendment accepted.** Add `radius.bubble-start` and `radius.bubble-end`. Needed anyway for Phase 3 Messaging.

The mockup's `36px` / `46px` radii are **correct as-is**: they are a physical device frame, not UI, and are already scoped to that component.

---

## Finding 7 — Signal red fails AA as text on dark grounds. ⚠️ ADD

Found while building the v2 documentation page — measured, not assumed, which is the point.

`--color-primary` (`#E7000B`) is **not redefined in dark mode**. As a button fill it is fine: white on signal is 4.77:1. But set as *type* on the night ground it measures **3.97:1** — below the 4.5:1 required for small text.

| Colour | On `#2B0103` | Verdict |
|---|---|---|
| `#E7000B` signal | 3.97:1 | ❌ fails as small text |
| `#FF3B30` ember (`red-500`) | 5.34:1 | ✅ passes |

Nothing in the token set stopped an engineer from setting a 12px label in `--color-primary` on a dark surface. The v1.0 "Red Problem" note covered red-on-red surfaces but not red-as-type.

**Amendment accepted.** Add `--text-accent` — signal in light, ember in dark — across all three theme blocks, with the rule stated in the file:

> **`--text-accent` for type. `--color-primary` for fills and borders. Never set small type in `--color-primary`.**

No new hue; ember is already `red-500`.

---

## What passed without change ✅

| Foundation | Verdict |
|---|---|
| **Colour ramps** | Sound. Semantic mapping holds. The Red Problem is documented and the mitigation is enforceable. |
| **Radius** | 2px default confirmed dominant. Scale correct. |
| **Shadows** | All five levels used consistently; the negative-spread rule holds without exception. |
| **Elevation** | Hierarchy is coherent. No overlap between levels. |
| **Grid** | Container 1400px, content 70ch, 12 columns. Correct. |
| **Accessibility** | The three AA failures found in v1.0 are corrected in the tokens. No new failures. |
| **Naming** | `category.property.variant.state` held up across 284 properties with no collisions. |
| **Responsive typography** | The `clamp()` approach is correct and needs no change. |

---

## Amendment summary

| # | Amendment | Verdict | Impact |
|---|---|---|---|
| 1 | 4-point component grid alongside 8-point layout grid | **Accepted** | Additive. No visual change. |
| 2 | Add 13/20/22px; deprecate five half-pixel sizes | **Accepted (part)** | Additive + deprecation path. |
| 3 | Add `quick 200ms` and `settle 300ms` | **Accepted** | Additive. No visual change. |
| 4 | Add legacy breakpoints | **Rejected** | Code migrates instead. |
| 5 | Tokenise six loose colours | **Accepted** | Additive. No visual change. |
| 6 | Add asymmetric bubble radius | **Accepted** | Additive. |
| 7 | Add `--text-accent` for red type on dark | **Accepted** | Additive. Closes an AA failure. |

**Every accepted amendment is additive.** Nothing already built breaks, and no pixel of the live site moves. That is the bar for changing a foundation after v1.0 has shipped.

---

## Outstanding technical debt

Ranked by cost of leaving it:

1. **The site does not consume the tokens.** Everything above is measured against a system the code has not adopted. Until migration happens, drift continues by default. *(Highest cost.)*
2. **Five legacy breakpoints** — inconsistent responsive behaviour across pages.
3. **Five half-pixel type sizes** — will not translate to native.
4. **Muted text still fails AA on the live site** — `rgba(22,19,15,.52)` at 3.67:1, carried over from before v1.0.

Phase Two proceeds on the amended foundation.
