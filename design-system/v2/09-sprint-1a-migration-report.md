# Sprint 1A — Design System Migration Report

**Status:** Complete and deployed. Verified against production, not asserted.

The success criterion was that a user should feel nothing changed. That is only provable by measurement, so the migration was bracketed by a computed-style baseline and diffed against live production at every step.

---

## Method

Before touching anything, a fingerprint was captured for every element on the page: `tagName + rounded bounding box + 41 computed properties`, hashed per section, plus a whole-document box hash. Captured at **375 / 900 / 1280px** on the homepage and an interior page.

The comparison target was **live production**, which remained pre-migration throughout — so every check was against ground truth rather than against my own earlier snapshot.

Two measurement artefacts had to be eliminated before the numbers meant anything:

1. **Reveal transitions were frozen mid-flight.** The preview pane does not composite frames when hidden, so `.rv.in` sat at `opacity: 0` forever. Fixed by flushing the end state under a temporary `transition: none`, then restoring real values with nothing left to animate.
2. **JS-driven regions were on different animation frames.** The dispatch ticket, language cycler and loader are time-dependent. Local showed `Nigerian Pidgin / Electrician, Wuse II`; production showed `Yorùbá / Barber, Gwarinpa`. Both sides had to be frozen into one identical frame before hashing.

Neither was a regression. Both would have produced false failures — and, had I hashed less carefully, could have masked a real one.

---

## Verification result

| Surface | Viewport | Result |
|---|---|---|
| Homepage | 1280px | **20 / 20 sections byte-identical** |
| Homepage | 900px | Layout hash identical, doc height 9832 = 9832 |
| Homepage | 375px | Layout hash identical, doc height 15044 = 15044 |
| `/help` | 900px | 308 elements, hash `vu2nru` = `vu2nru` |

Document height matched exactly at every breakpoint — the single most sensitive indicator of layout drift.

**One intended visual change**, isolated and measured: the documented AA correction to muted text (52% → 60% opacity, 3.67:1 → 4.79:1). It moves **20 of 770 elements**, all eyebrows and captions. Nothing else. This was verified by pinning the old value, confirming full parity, then removing the pin and counting exactly what moved.

---

## Two real defects found by the diff

Both would have shipped silently without measurement.

### 1. The token file was painting elements

`tokens.css` contained:

```css
:where(button, a, input, select, textarea, [role="button"], [tabindex]) {
  min-height: var(--touch-target);   /* 48px */
}
```

This inflated **every inline text link**. Footer links went 39px → 48px, socials 44px → 48px, legal links 31px → 48px, and the document grew 63px.

Two problems. Architecturally, a token file declares custom properties; it does not style elements. Substantively, the Design System's touch-target rule governs **controls** — buttons, nav items, inputs — which take their height from `--btn-height-md`, `--input-height`, `--tab-height`. Applying it to a link inside a sentence is over-application, and a layout change is not an accessibility win.

**Removed.** Touch-target sizing is now a component responsibility, as the v2 component specs already define it.

### 2. My own insertion guard was fooled by a comment

The script that linked `tokens.css` into each page guarded with `if (notmatch 'assets/tokens.css')`. On `index.html` that matched the **comment I had just written** — *"Every design value on this page now resolves from /assets/tokens.css"* — so the link was never inserted. The script reported `tokens:1` and looked successful.

Every token on the homepage was unresolved. The section hashes caught it immediately; the self-report did not. **A migration that only checks its own logs is not verified.**

---

## What was migrated

**407 variable references** rewritten across `index.html` and `assets/site.css`, plus **66 white literals** tokenised in a second verified pass.

Before substituting, every proposed mapping was resolved in the browser and compared. That check caught **three mappings that would have been silent regressions**:

| Local | My first guess | Actual value | Correct token |
|---|---|---|---|
| `--verified` | `--color-success` | `#2EBD6B` vs `#177A43` | `--tuse-green-500` |
| `--stone` | `--color-border-strong` | `#E2DED6` vs `#CFC9BF` | `--tuse-neutral-200` |
| `--t-sm` | `--size-h5` | fluid clamp vs static `1.125rem` | `--size-h3` |

Eleven further "mismatches" were whitespace-only (`.64` vs `0.64`, `cubic-bezier(.22,...)` vs `cubic-bezier(0.22,...)`) and compute identically — confirmed, not assumed.

### Duplicate definitions removed

Both stylesheets carried their own `:root` block — 37 lines in `index.html`, 33 in `site.css` — defining the same colours, type scale, spacing, motion and layout values twice, with no mechanism keeping them in sync. `--ember`, `--spring` and `--t-xl` existed only in one. **Both deleted.** All values now resolve from `/assets/tokens.css`.

### Three tokens the migration proved were missing

Added with usage counts as evidence, per the v2 governance rule:

| Token | Evidence | Why not an existing token |
|---|---|---|
| `--color-verified` | 27 uses | The brand's badge green. `--color-success` is the AA-corrected **text** green — a different job |
| `--color-border-on-inverse` | 27 uses | Hairline on a dark band **inside the light theme**. Not `--color-border` |
| `--color-accent-on-inverse` | 9 uses | Signal red is too deep to read on night; the ramp steps up to ember |

### Theme locked

Every page now carries `data-theme="light"`. Without it, a visitor with a dark OS preference would have triggered the token set's dark block and seen a site that has never been designed in dark — a regression introduced *by* adopting semantic tokens. The attribute pins the resolution until dark mode is deliberately built.

---

## Before and after

| | Before | After |
|---|---|---|
| Sources of truth for colour | 2 (`index.html`, `site.css`) | 1 (`tokens.css`) |
| `:root` token blocks | 2, drifting | 0 in product code |
| Legacy `var()` references | 407 | **0** |
| Hardcoded hex in stylesheets | 84 | 21 |
| Tokens consumed by the site | 0 | 302 |
| Pages linking the system | 0 / 8 | **8 / 8** |
| Muted-text contrast | 3.67:1 ✗ | **4.79:1 ✓** |

---

## Remaining technical debt

Honest inventory. None of it is hidden.

1. **21 hex + ~100 rgba literals remain**, almost all gradient stops (`rgba(231,0,11,.34)` in the hero wash, `rgba(255,255,255,.16)` hairline variants at non-token opacities) and one-off alpha values. Tokenising a gradient stop requires either a token per stop or `color-mix()`, which is a design decision, not a mechanical substitution. Deferred deliberately.
2. **Five legacy breakpoints still live** — 620, 760, 820, 960, 980px. Carried over from the v2 audit; untouched here because changing them changes layout, which this sprint forbade.
3. **`index.html` still holds ~800 lines of inline CSS.** It now consumes tokens correctly, but the nav, footer, buttons, logo and mobile menu are still implemented twice — once inline, once in `site.css`. **This is the largest remaining duplication** and the obvious Sprint 1B: extract a shared `base.css`. It was not attempted here because it is a structural change with real regression risk, and this sprint's mandate was parity.
4. **Component library unused by the site.** `v2/components.css` (77 `.t-*` classes) is the reference implementation for the apps and portals. The marketing site keeps its own class names — rewriting the markup would be churn with no user benefit and real risk. Justified exception, revisit if the site gains app-like surfaces.
5. **Five half-pixel type sizes** remain deprecated-but-present.

---

## Justified exceptions

| Exception | Reason |
|---|---|
| `--stone` → `--tuse-neutral-200` (a primitive) | One use. The governance rule says a concept used once is not a token |
| Device chrome (`--device-bezel-*`) stays isolated | Physical hardware, never a UI surface |
| Site keeps its own class names | Markup churn with no user benefit; the token layer is what mattered |
| `.ts-*` utilities in `tokens.css` unused by the site | Reference ramp for new products. Harmless, unused selectors — flagged, not removed |

---

## What this did not do

It did not make the site faster, prettier, or better structured at the component level. It moved the visual authority into one file and proved nothing broke doing it.

The verification is only as good as its property list: 41 computed properties per element. Anything outside that list — `filter`, `clip-path`, `backdrop-filter`, pseudo-element content — was not compared. `backdrop-filter` in particular carries the nav's frosted effect and was not in the fingerprint. A visual spot-check found nothing wrong, but that is weaker evidence than the hashes.
