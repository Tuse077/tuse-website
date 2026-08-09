# Phase Eight — Design Principles

Nine principles. Each is stated, explained, and given a **test** — because a principle that cannot adjudicate a real disagreement is a poster, not a principle.

---

### 1. Trust before beauty

When an elegant layout and a legible trust signal compete, the trust signal wins. A rating badge that spoils a card's balance stays.

**Test:** *Would removing this make the user less certain about who is coming to their home?* If yes, it stays regardless of how it looks.

---

### 2. Whitespace is functionality

Space is how a screen says what matters. Cramming is not efficiency; it is a refusal to prioritise.

**Test:** *Can you name the single most important element within two seconds?* If not, the answer is more space, not smaller type.

---

### 3. One screen, one decision

Every screen asks for exactly one thing. Two competing primary actions means the decision has not been made — it has been forwarded to the user.

**Test:** *How many primary buttons?* More than one is a failure.

---

### 4. Typography creates hierarchy

Not colour, not boxes, not shadow. Size, weight and family carry the structure — which is why the system survives greyscale, dark mode and colour-blindness.

**Test:** *Print it in black and white. Is the hierarchy intact?*

---

### 5. Motion communicates purpose

Every animation does one of three jobs: continuity, feedback, status.

**Test:** *Remove it. Is anything harder to understand?* If nothing is lost, delete it.

---

### 6. AI assists quietly

iRanti presents evidence and proposes actions. It does not perform personality, does not act unilaterally, and does not speak in the first person.

**Test:** *Does this make the user more capable, or more dependent?*

---

### 7. Respect professional craftsmanship

Artisans are professionals running businesses, not gig-workers to be gamified. No leaderboards, no streak pressure, no artificial scarcity.

**Test:** *Would a 20-year master electrician find this respectful or patronising?*

---

### 8. Design for confidence

Every interface answers: what is happening, what happens next, what to do if it goes wrong. Confidence comes from knowing where you stand, not from reassurance.

**Test:** *At any point, can the user answer all three?*

---

### 9. Consistency creates trust

The same artisan renders identically in every product. The same escrow state uses the same words everywhere. Inconsistency reads as carelessness, and carelessness in a platform that holds money reads as risk.

**Test:** *Does this exist elsewhere in the system?* If yes, use it. If it needs to differ, document why.

---

## Tie-breaks

When principles conflict:

**Trust > Clarity > Consistency > Efficiency > Beauty**

A trust signal beats a clean layout. A clear label beats a consistent one. A consistent pattern beats a faster one. Beauty is what is left when the other four are satisfied — which, done properly, is most of the time.

---

# Phase Nine — Design Governance

## The review

Every feature passes review before merge. It is a **checklist, not a critique** — the questions are answerable yes or no, and any no blocks.

Reviewers: one designer, one engineer. Neither may be the author.

---

## Design Review Checklist

### Tokens
- [ ] No hardcoded colours, sizes, spacing, radii, durations
- [ ] No primitive tokens referenced in product code
- [ ] Spacing on the 4-point component / 8-point layout grid
- [ ] Type from the scale — no half-pixel sizes
- [ ] One of the five breakpoints

### Components
- [ ] Existing components used where one exists
- [ ] Any new component has a full ten-part spec
- [ ] No visual variant achieved by overriding a component's internals

### Accessibility
- [ ] All text meets AA against its own background — **measured, not assumed**
- [ ] Focus visible on every interactive element
- [ ] Full keyboard operation, logical order
- [ ] Touch targets ≥ 48px, ≥ 8px apart
- [ ] No state signalled by colour alone
- [ ] Screen-reader pass on the primary path
- [ ] Every image has alt text or `alt=""`
- [ ] Charts and maps have text equivalents

### Responsive
- [ ] 375 / 640 / 900 / 1400 verified
- [ ] No horizontal overflow at any width
- [ ] Mobile designed, not compressed
- [ ] Safe-area insets respected

### Dark mode
- [ ] Every surface, border and text token resolves
- [ ] Contrast re-measured on dark grounds
- [ ] Elevation reads without relying on shadow
- [ ] No hardcoded light-mode value leaking through

### States — all five
- [ ] **Loading** — skeleton matching real layout; nothing under 300ms
- [ ] **Empty** — what would be here, why not, one action
- [ ] **Error** — what happened, what to do, retry available
- [ ] **Offline** — banner, cached content, queued actions, no lost input
- [ ] **Success** — proportionate; no confetti

### Interaction & motion
- [ ] Press feedback on every tappable element
- [ ] Durations and curves from the token set
- [ ] Spring used only for a permitted confirmation
- [ ] `prefers-reduced-motion` honoured, meaning preserved without motion
- [ ] No animation that fails the removal test

### Copy
- [ ] Buttons name what happens
- [ ] Errors never blame the user
- [ ] Escrow states use the canonical words
- [ ] No jargon where a plain word exists
- [ ] Numbers carry units and denominators

### Trust
- [ ] No rating without volume
- [ ] Tiers named, not icon-only
- [ ] Verification dated
- [ ] Claims match what the product can actually show
- [ ] Failure paths state what happens to the money

### Performance
- [ ] Images sized and lazy-loaded below the fold
- [ ] No layout shift on load
- [ ] Interactive within 3s on a mid-range Android over 3G

---

## Governing the system

**Adding a component.** Propose with a use case and two real screens that need it. If only one screen needs it, it is not a component. Full ten-part spec required.

**Changing a token.** Requires evidence — a count from the codebase, a measured contrast failure, or a platform constraint. *"It looks better"* is not evidence. Every accepted v2 amendment met this bar, and one was rejected for failing it.

**Versioning.** Additions are minor. Changes and removals are major and require an audit of every consuming product. **Deprecate before deleting** — always ship the migration path first.

**Exceptions.** Granted, time-boxed, documented in the code at the point of exception, with an owner and an expiry. An undocumented exception is a bug.

**Quarterly drift audit.** Re-run the Phase One script. Off-token values are technical debt and get ranked and scheduled like any other.

---

## What this cannot do

Governance catches inconsistency. It does not catch a bad idea expressed consistently. The checklist is a floor, not a ceiling — a feature can pass every item and still be the wrong feature. That judgement stays with people.
