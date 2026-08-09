# Phase Four — Product Templates

Reference layouts. Each defines hierarchy, component placement, spacing rhythm and responsive behaviour. They are skeletons to inherit, not screens to copy.

## Universal layout law

**Every screen answers one question in its top third.** If a user cannot tell what a screen is for without scrolling, the template is wrong.

| Surface | Container | Density | Grid |
|---|---|---|---|
| Marketing | 1400px | Editorial — `--space-section` | 12 col |
| Consumer app | Full-bleed | Comfortable — `--space-16` / `--space-24` | 4 col |
| Portal / dashboard | 1400px + sidebar | Dense — `--space-12` / `--space-14` | 12 col |
| iRanti | 1400px | Analytical — `--space-16` | 12 col |

---

## Customer Home

**Question answered:** what do you need fixed?

```
┌ Top nav · logo, location chip, avatar ────────┐
│ SEARCH — 56px, natural-language placeholder   │  ← the hero. Nothing above it.
│ Active booking card (conditional, level 1)    │  ← only when live
│ ── Categories · 2-col grid, 1px hairlines     │
│ ── Recently booked · horizontal scroll        │
│ ── Trust strip · 4 signals                    │
└ Bottom nav · Home · Bookings · Wallet · You ──┘
```

Search is the primary action and sits above everything. An active booking outranks it *only* while one is live — that card is the answer to "where are they", which is the only question that beats "what do I need".

**Responsive** Categories 2-col < 640, 3-col ≥ 640, 4-col ≥ 900. Bottom nav becomes top nav ≥ 900.

**States** Empty (no history) → categories carry the screen. Offline → banner under nav, cached bookings readable.

---

## Search

```
Sticky search field (retains query)
Filter chips — horizontal scroll, `aria-pressed`
Result count · live region
Artisan cards — vertical list, 1px separated
```

Results are **artisan cards, not service cards** — the user has already chosen the service; now they are choosing a person. Every card carries the full trust unit (Phase Six).

**States** Loading → 5 skeleton cards matching card geometry. Empty → nearest categories + honest coverage statement. Error → retry naming what will retry.

---

## Booking

Stepper, one decision per step, price persistent in a footer bar from the moment it is known.

```
[1 Describe] [2 Where] [3 When] [4 Who] [5 Confirm]
                                    ┌──────────────┐
                                    │ ₦12,000  Next│  ← sticky, always visible
                                    └──────────────┘
```

**Rule** The footer price never changes without an explicit interaction. A price that moves between steps destroys the "no haggling" promise the brand is built on.

**Responsive** Steps are full screens < 900; two-column (form left, summary right) ≥ 900.

---

## Booking Details

```
Status band — escrow state, plain words
Artisan summary — full trust unit
Job — description, address, time, photos
Money — amount, escrow state, method
Actions — Message · Call · Cancel (ghost, last)
Timeline — every state change, timestamped
```

The timeline is the receipt. It is what a user screenshots when something goes wrong, so it must be complete and legible without context.

---

## Live Tracking

```
┌ Map — 60vh, artisan marker, route ─────┐
├ ETA card — overlapping the map edge ───┤  ← text is the source of truth
│ Stage · Artisan · Message | Call       │
└────────────────────────────────────────┘
```

Map is decorative; the ETA card is authoritative and must be fully usable with the map removed. On desktop, map left 60% / detail right 40%.

---

## Wallet

```
Balance — serif, tabular, largest element on screen
Held in escrow — secondary, always adjacent
[Withdraw]  [History]
Transactions — grouped by date, tabular amounts
```

Available and held sit together, always. Showing a balance without the held amount is the fastest route to a support ticket.

---

## Profile

Avatar + name + member since → account rows → support → legal → sign out (ghost) → delete (destructive, separated).

---

## Artisan Dashboard

**Question answered:** what do I earn, and what is next?

```
Greeting + name
┌ Wallet — available · held in escrow · [Withdraw] ┐  ← level 1, brand ground
├ Metrics — 2×2: incoming · active · completed · rating
├ Active job — full card, primary action
└ Incoming requests — accept / negotiate / decline
```

Money first. An artisan opens this app to answer one question and the design should not make them look for it.

---

## Job Management

Tabs: Incoming · Active · Completed. Each row: service, address, time, amount, state badge. Swipe actions on mobile; explicit buttons ≥ 900 — swipe alone is not discoverable and not accessible.

---

## Earnings

Period selector → total (serif, tabular) → trend chart → breakdown by area → payout history. Every figure exportable.

---

## Analytics (Artisan)

Completion rate, response time, on-time arrival, repeat customers — each with the platform median beside it as context. **A number without a comparison is not insight.** Never rank artisans against each other by name.

---

## Training

Modules as cards with progress. Completion feeds the trust tier (Phase Six), and the connection must be stated on the card — otherwise it reads as homework.

---

## Verification (Artisan)

```
Progress — 3 of 5 complete
Check rows — done · in review · action needed · not started
  each: what it is · why it is needed · what to do
[Continue verification]
```

Every check explains *why*. "Bank account" is an intrusion; "so your payouts reach an account in your own name" is a reason.

---

## Business Dashboard

```
Sidebar 260px          │ Main
Sites · Bookings ·     │ Summary row — 4 metrics
Invoices · Team ·      │ Open jobs table
Settings               │ Spend chart · Site breakdown
```

Tables over cards. `tabular-nums` throughout. Every table exportable, every column sortable, filters persistent across sessions.

---

## Estate Dashboard

Business Dashboard plus a resident-request queue and shared-facility scheduling. Requests are grouped by block, not by time — the operational unit is the building.

---

## Admin Portal

Highest density. Global search first. Queues: verification, disputes, payouts, flags. Every row deep-links to a full record. **Every destructive action is logged and attributed** — and the interface says so.

---

## iRanti Mission Control

```
┌ Confidence banner — what the system knows, how sure ┐
├ Priority insights — ranked, each with one action    │
├ Trend panel — chart + plain-language reading        │
└ Operational alerts — severity-ordered               │
```

Insights are ranked by **impact × confidence**, never by recency. See Phase Seven.

---

## Responsive behaviour (all templates)

| Range | Behaviour |
|---|---|
| < 480 | Single column, bottom nav, full-width sheets |
| 480–640 | Single column, 2-col grids where content allows |
| 640–900 | 2-col grids, sheets become centred modals |
| 900–1080 | Sidebar appears, top nav replaces bottom nav |
| ≥ 1080 | Full 12-col, 3-col grids, persistent detail panels |

**Mobile is not desktop compressed.** Where a desktop table becomes unreadable, it becomes a card list — not a horizontally scrolling table.
