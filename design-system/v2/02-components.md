# Phase Two — Component Library

Every component is specified against the amended v1.0 foundation. Production CSS ships in `components.css`.

## The spec contract

No component enters the library without all ten:

**Purpose · Hierarchy · Sizing · Spacing · States · Accessibility · Motion · Do · Don't · Code**

If a component cannot state its *hierarchy* — what it outranks and what outranks it — it is not a component, it is a one-off. Send it back.

## Universal laws

These bind every component. They are not repeated in each spec.

1. **48px minimum touch target.** Visual size may be smaller; the hit area may not.
2. **2px radius** unless the component's spec overrides it.
3. **Focus is always visible** — 2px ring, 3px offset, `--color-focus-ring`.
4. **Never colour alone.** Every state carries a second signal: icon, text, weight or position.
5. **Motion defaults to `--duration-normal` / `--ease-standard`.** Deviation must be justified in the spec.
6. **Disabled is not `opacity: .5`.** Use `--color-disabled-surface` and `--text-disabled` so contrast stays measurable.
7. **Every component has a loading, empty and error state,** or a written note saying why it cannot.

---

# Buttons

**Purpose.** Commit to an action. Never navigate — that is a link.

**Hierarchy.** One primary per view. If two actions look equally important, the screen has failed *One screen, one decision*.

| Variant | Ground | Use |
|---|---|---|
| **Primary** | `--color-primary` | The single most important action |
| **Secondary** | `--color-secondary` (oxblood) | Considered/weighty action — "Talk to us" |
| **Ghost** | transparent, 1px border | Dismiss, cancel, tertiary |
| **Danger** | `--color-error` | Destructive and irreversible only |
| **Success** | `--color-success` | Confirming completion — "Release payment" |

**Sizing.** sm 40 · md 48 (default) · lg 56. Padding-x `--space-24`, gap `--space-8`.

**States.**

| State | Treatment |
|---|---|
| Rest | Ground, 1px border same colour |
| Hover | `--color-primary-hover`, `translateY(-2px)`, `--duration-fast` |
| Active | `--color-primary-active`, `scale(.97)` |
| Focus | 2px ring, 3px offset |
| Loading | Spinner replaces label; **width locks**; `aria-busy="true"` |
| Disabled | `--color-disabled-surface`, `--text-disabled`, `cursor: not-allowed` |

**Accessibility.** `<button>`, never a styled div. Loading buttons keep their accessible name — the spinner does not replace it in the a11y tree. Icon-only buttons require `aria-label`.

**Motion.** Lift on hover, press on active. The press is the confirmation the tap registered — never remove it on touch.

**Do** — write what happens: *Send enquiry*, *Release payment*, *Book artisan*.
**Don't** — *Submit*, *OK*, *Click here*. Don't put two primaries side by side. Don't let a loading button resize (the layout jumps and the user's thumb misses).

---

# Inputs

**Purpose.** Collect one piece of information.

**Sizing.** Height 48, padding `.8125rem` / `--space-12`, radius 2px, type `--size-input` (15px). Textarea min-height 150px, vertical resize only.

**Label.** Always visible above the field — `--size-label`, uppercase, `+.18em`. **Placeholders are never labels.** A placeholder disappears the moment someone types, which is exactly when they need it most.

| Variant | Specification |
|---|---|
| **Text** | Baseline |
| **Search** | Leading search icon, `--search-height` 56, clear button when filled, `type="search"` |
| **OTP** | 4–6 separate boxes, 48×56, `inputmode="numeric"`, `autocomplete="one-time-code"`, auto-advance, **paste fills all boxes** |
| **Phone** | `+234` prefix fixed in a leading affix, `inputmode="tel"`. Never validate on keystroke |
| **Email** | `inputmode="email"`, `autocomplete="email"`, validate on blur |
| **Password** | Show/hide toggle (`aria-pressed`), strength meter on create only, never on sign-in |
| **Currency** | `₦` leading affix, **serif tabular numerals**, thousands separators live, `inputmode="decimal"` |
| **Location** | Leading pin icon, "Use my location" affordance, opens the picker sheet |
| **Dropdown** | Native `<select>` on mobile — always. Custom listbox on desktop only |
| **Autocomplete** | `role="combobox"`, `aria-expanded`, results in `aria-live="polite"`, keyboard ↑↓↵ |
| **Date / Time** | Native pickers on mobile. Custom only where a range is required |

**States.** Rest → Focus (`--color-oxblood` border + 3px halo) → Filled → Error (`--color-error` border + icon + message) → Disabled → Read-only (no border, `--text-body`).

**Errors.** Below the field, `--size-caption`, `--color-error`, with an icon, and `aria-describedby` wired to the input. **Never validate while typing** — only on blur or submit. Validating mid-keystroke tells someone their half-typed email is wrong, which is both true and useless.

**Do** — one input, one question. State the format before the error (*"+234 800 000 0000"*).
**Don't** — placeholder-as-label. Don't clear a field on failed validation. Don't disable submit until valid; let them submit and tell them what to fix.

---

# Cards

**Purpose.** Group one object's information into a scannable unit.

**Universal.** Radius 2px. Padding `clamp(1.375rem, 2vw, 1.875rem)`. **Resting cards are flat** — separated by 1px hairlines in a 1px-gap grid, never by shadow. Elevation only on hover: `translateY(-4px)` + `--shadow-level2`.

| Variant | Contains | Notes |
|---|---|---|
| **Standard** | Media 16:10, eyebrow, title, body | Base |
| **Interactive** | Standard + whole-card link | One link per card; the title is the accessible name |
| **Service** | + price from, arrival estimate, rating, verified chip | Price in **serif** |
| **Artisan** | Avatar, name, trade, trust tier, rating, jobs, distance | See Phase Six — never rating alone |
| **Business** | Org name, type, sites, primary contact | Admin/portal density |
| **Pricing** | Tier, price, inclusions, one CTA | Highlight at most one |
| **Metric** | Label, big serif number, delta with direction | `tabular-nums` mandatory |
| **Statistic** | Metric + sparkline | Endpoint emphasised |
| **Recommendation** | iRanti mark, insight, confidence, action | See Phase Seven |
| **Alert** | Severity stripe, icon, message, action | 2px left stripe |
| **Verification** | Check list, tier, date verified | See Phase Six |

**Accessibility.** An interactive card is one link wrapping the title, with the rest presentational — not a `<div onclick>`. Nested interactive elements inside a linked card break keyboard navigation.

**Do** — same information in the same position in every card of a set.
**Don't** — shadow at rest. Don't mix card variants in one grid. Don't put two competing CTAs on one card.

---

# Navigation

| Component | Spec |
|---|---|
| **Top nav** | 60px mobile / 76px ≥900px. Translucent + 10px backdrop blur when scrolled, transparent over dark heroes. Max 7 links. Current page `aria-current="page"` |
| **Bottom nav** | Mobile apps only. 4–5 items max, 56px + safe-area inset. Icon + label always — never icon alone. Active = filled icon + `--color-primary` |
| **Sidebar** | Portal/dashboard only. 260px expanded, 64px collapsed. Sections labelled with `--size-label`. Never on the marketing site |
| **Tabs** | 48px, 2px bottom indicator sliding at `--duration-normal`. `role="tablist"`, ←→ keyboard. Max 5 — beyond that use a dropdown |
| **Breadcrumbs** | `nav[aria-label="Breadcrumb"]`, `/` separators, last item not a link. Portals and deep content only |
| **Pagination** | 44px targets. Show first, last, current ±1. Always offer "per page" |
| **Search bar** | 56px, leading icon, natural-language placeholder that names a real example (*"My AC isn't cooling"*) |

**Motion.** Nav transitions at `--duration-moderate`. The tab indicator slides — it never fades. Sliding shows the relationship between old and new; fading hides it.

---

# Status components

| Component | Spec |
|---|---|
| **Badge** | 24px, `--size-label-sm`, radius 2px. Static fact |
| **Tag** | 28px, removable (× at 24px hit area). User-applied |
| **Chip** | 32px, radius `full`, selectable, `aria-pressed` |
| **Progress** | 2px track. Determinate = `role="progressbar"` with values. Indeterminate only when the end is genuinely unknown |
| **Rating** | Serif number + star + count. **The count is mandatory** — 5.0 from 1 job is not 5.0 from 400 |
| **Trust indicator** | See Phase Six |

**Do** — badge for system facts, tag for user labels, chip for filters. The shapes differ so the meaning differs at a glance.
**Don't** — a badge that looks tappable but isn't.

---

# Notifications

| Component | Use | Duration | Dismiss |
|---|---|---|---|
| **Toast** | Transient confirmation | 4s | Auto + manual |
| **Snackbar** | Confirmation **with an undo** | 6s | Auto + action |
| **Banner** | Persistent system state (offline, maintenance) | Until resolved | Sometimes |
| **Alert** | Inline, contextual to a region | Persistent | No |

**Placement.** Toast/snackbar bottom-centre on mobile (thumb reach), bottom-right on desktop. Never top — it collides with the nav and with system notifications.

**Accessibility.** `role="status"` `aria-live="polite"` for success; `role="alert"` `aria-live="assertive"` for errors only. Assertive interrupts a screen reader mid-sentence — reserve it for things worth interrupting for. Anything with an action must not auto-dismiss before it can be reached: minimum 6s, and pause the timer on hover or focus.

**Motion.** Slide up + fade at `--duration-settle` with `--ease-decelerate`. Exit at `--duration-quick` with `--ease-accelerate`. Things arrive gently and leave briskly.

---

# Dialogs

| Component | Use | Spec |
|---|---|---|
| **Confirmation** | Irreversible actions | Max 560px, radius 8px, `--shadow-modal`. Title names the consequence |
| **Action sheet** | 3–6 choices on mobile | Bottom-anchored, radius 8px top, safe-area padded |
| **Bottom sheet** | Content + interaction | Drag handle 48×4. Snap points; drag-to-dismiss |
| **Full-screen modal** | Complex multi-step tasks | Close top-left on iOS, top-right on Android |

**Accessibility.** Focus moves in on open and **returns to the trigger on close**. Focus is trapped while open. `Esc` closes. Background gets `aria-hidden` and `inert`. Scroll locks on the body, not the sheet.

**Motion.** Sheets slide from the edge they belong to at `--duration-slow` / `--ease-standard`. Modals scale from 0.98 + fade at `--duration-settle`. The scrim fades at the same duration. **Never bounce a modal.**

**Confirmation copy.** Title = the consequence, not the action: *"Cancel this booking?"* Body = what actually happens: *"The artisan is 8 minutes away. A call-out charge of ₦2,000 applies."* Buttons = the verb: *"Cancel booking"* / *"Keep booking"*. Never *Yes*/*No* — a person clicking fast reads the title and the button, nothing else.

---

# Profile

| Component | Spec |
|---|---|
| **Avatar** | 24 / 32 / 44 / 64, circle. Fallback = initial on `--color-secondary`. **Never a generic silhouette** — it reads as absent |
| **Profile card** | Avatar + name + one qualifier line + trust tier |
| **Artisan summary** | The trust unit. Avatar, name, trade, tier, rating + count, distance, verified chip |
| **Business card** | Org, type, site count, contact, account status |
| **Customer card** | Name, member since, bookings, saved addresses |

---

# Media

| Component | Spec |
|---|---|
| **Gallery** | 16:10 grid, 1px gaps, lazy after the first row. Keyboard-navigable |
| **Before/After** | Draggable divider, 44px handle, keyboard ←→. **Labels always visible** — never rely on the drag alone |
| **Portfolio card** | Image + job type + date + artisan attribution |
| **Image viewer** | Full-screen, pinch/scroll zoom, swipe dismiss, counter, `Esc` closes |

**Every image has meaningful alt text or `alt=""`.** A gallery of artisan work where every alt reads *"image"* is worse than no alt at all.

---

# Maps

| Component | Spec |
|---|---|
| **Location picker** | Centre pin, draggable map, address confirmation, "Use my location". Pin stays centred — the *map* moves |
| **Tracking map** | Route line in `--color-primary`, artisan marker, destination marker, ETA card anchored bottom |
| **Service radius** | Filled circle at 16% primary, 1px border, draggable edge handle |

**Accessibility.** Maps are not accessible by default. **Every map must have a text equivalent** — the tracking map needs a live text ETA and status (`aria-live="polite"`, updated on state change, not on every GPS tick), and the picker needs a manual address field. A screen-reader user must be able to complete the flow without the map.

**Motion.** Map pans ease at `--duration-slow` / `--ease-decelerate`. The artisan marker interpolates between GPS points rather than jumping — jumping reads as a glitch and undermines confidence in the tracking. Never auto-recentre while the user is panning.
