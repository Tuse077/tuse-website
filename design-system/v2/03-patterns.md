# Phase Three — Pattern Library

Patterns are experiences, not screens. Each states its goals, its decision points, and — most importantly — **where it fails**, because the failure states are where trust is actually won or lost.

Format: **User goal · Business goal · Primary · Secondary · Decision points · Failure states · Accessibility · Motion**

---

## Authentication

**User** Get in quickly without inventing another password. **Business** Verified, reachable identity from the first minute.

**Primary** Phone number → OTP. **Secondary** Email fallback; biometric on return.

**Decision points** New or returning · customer or artisan · number reachable or not.

**Failure states** *OTP doesn't arrive* — offer resend after 30s with a visible countdown, then a voice-call fallback after two failures. Never leave the user staring at an inert field. *Wrong code* — clear the boxes but keep focus in the first, state attempts remaining. *Number already registered as an artisan* — say so plainly and offer the right app; don't fail silently.

**Accessibility** `autocomplete="one-time-code"` so the OS can autofill. Paste must fill all boxes. Resend must be reachable by keyboard before the timer expires.

**Motion** No celebratory animation on sign-in. Getting in should feel like nothing happened.

---

## Onboarding

**User** Understand what this is and get to a first booking. **Business** Reach activation — location granted, one search performed.

**Primary** Location permission → first search. **Secondary** Skip to browse.

**Decision points** Grant location or enter manually · book now or look around.

**Failure states** *Permission denied* — never a dead end. Fall back to manual address entry immediately, with the same visual weight. *No artisans in area* — this is the hardest one: say where coverage exists, offer to notify, and do not pretend a search is loading.

**Rule** Onboarding is at most three screens, each asking exactly one thing. Every screen skippable except the one that makes the product work.

**Motion** Forward at `--duration-settle` with `--ease-standard`. Progress dots, never a percentage — a percentage invites the question "how long is this".

---

## Service discovery & natural-language search

**User** Describe a problem in their own words and be understood. **Business** Route correctly on the first attempt.

**Primary** Free-text query → matched category → artisans. **Secondary** Browse the category grid.

**Decision points** Query understood or ambiguous · category has coverage or not.

**Failure states** *No match* — never show "0 results". Show the nearest categories and a plain "we don't cover that yet" if true. *Ambiguous* ("my kitchen is leaking" → plumbing or appliance repair) — present both, do not guess silently. **A wrong confident guess costs more trust than an honest question.**

**Accessibility** `role="combobox"`, `aria-expanded`, results in `aria-live="polite"`. Announce the count, not each result. Keyboard ↑↓↵ throughout.

**Motion** Results fade in at `--duration-quick`, staggered `--stagger-tight`, capped at six. Never animate on every keystroke — it makes typing feel laggy.

---

## Booking flow

**User** Get the right person, at the right time, at a price agreed in advance. **Business** A confirmed, paid, in-app booking.

**Primary** Describe → locate → schedule → price → confirm. **Secondary** Save a draft; rebook a previous artisan.

**Decision points** Now or scheduled · which artisan · accept or negotiate the price.

**Failure states** *No artisan accepts* — say so within a bounded time with a visible wait state, then offer to widen the radius or schedule for later. Silence here is the single worst experience in the product. *Payment fails* — hold the booking, do not discard the form. *Artisan cancels post-confirmation* — immediate notification, automatic rematch offer, escrow untouched and said so explicitly.

**Rule** The price is visible before the commit, every time. No step may introduce a cost that was not on the previous step.

**Motion** Step transitions slide horizontally at `--duration-settle`. Progress is a stepper, not a bar. Confirmation gets the one `--ease-spring` moment in the whole product.

---

## Scheduling

**User** Pick a time that actually works. **Business** Reduce no-shows.

**Failure states** *No availability* — show the next three real options, never an empty calendar. *Timezone or DST edge* — always render the artisan's local time with an explicit label.

**Accessibility** Native pickers on mobile. Custom calendars need full arrow-key navigation and `aria-selected`. Never a date input that only accepts one text format.

---

## Payments · Wallet · Escrow

**User** Pay without risk. Be paid without chasing. **Business** Keep money in-app; make escrow legible.

**Escrow is the product.** Its states must be visible at all times and named in plain words:

| State | Copy | Never say |
|---|---|---|
| Held | *Held in-app: ₦18,500* | "Pending" |
| Releasing | *Releasing to Musa A.* | "Processing" |
| Released | *Paid — ₦18,500* | "Complete" |
| Refunding | *Returning to your account* | "Reversed" |
| Disputed | *Held while we look into this* | "Frozen" |

**Failure states** *Payment declined* — name the reason if the processor gives one, keep the booking alive, offer another method. *Payout delayed* — tell the artisan before they notice; an unexplained delay in someone's earnings is the fastest way to lose them. *Partial refund* — show the arithmetic, itemised. Never a single net figure.

**Accessibility** Money is `--font-display` with `tabular-nums`, and never conveyed by colour alone. Every amount has a currency symbol — never a bare number.

**Motion** Balance changes count up at `--duration-slow`. Release is the one place `--ease-spring` is permitted. Never animate a decreasing balance — it reads as loss.

---

## Booking tracking

**User** Know where the artisan is and when they arrive. **Business** Eliminate the "where are you" call.

**Primary** Live map + ETA + stage. **Secondary** Message; call; cancel.

**Failure states** *GPS lost* — say "Last seen 4 minutes ago", never freeze a stale marker as if it were live. *Artisan delayed* — proactive notification with a revised ETA; never let the user discover it by watching. *Overdue* — surface support before the user has to look for it.

**Accessibility** The map is decorative; the **text is the source of truth**. Stage and ETA in `aria-live="polite"`, updated on state change only — not on every GPS tick, which would flood a screen reader.

**Motion** Marker interpolates between points; it never jumps. Route draws once on load at `--duration-very-slow`. The live dot pulses at 2s — the only permanently looping animation in the product, because it means "this is current".

---

## Messaging

**User** Reach the other party without giving out a personal number. **Business** Keep communication on-platform and on-record.

**Failure states** *Message undelivered* — mark it, offer retry, never silently drop. *Recipient offline* — show last-seen honestly. *Sent to a completed booking* — allow it for a defined window, then close with an explanation.

**Accessibility** Bubbles use `--radius-bubble-start` / `--radius-bubble-end` — the sharp corner points at the speaker, which is a **second, non-colour signal** for who said what. New messages `aria-live="polite"`.

---

## Reviews

**User** Say what happened. **Business** Ratings that mean something.

**Rule** Reviews only from paid, completed jobs. **Never a bare star input** — pair each rating with at least one specific prompt (punctual? tidy? priced as quoted?). Free stars produce noise; prompted stars produce signal.

**Failure states** *Review window expired* — say when it closed. *Flagged as abusive* — tell the author, allow an edit rather than a silent delete.

---

## Disputes

**User** Be heard by a person. **Business** Resolve without losing either party.

**Primary** Raise → evidence → review → outcome. **Secondary** Escalate.

**Decision points** Refund, partial, release, or re-do.

**Failure states** *Evidence upload fails* — never lose typed text; save the draft. *Timeout* — if Tușe misses its own stated response time, say so and re-commit to a date. **A dispute pattern that goes quiet has failed regardless of its outcome.**

**Motion** None beyond state changes. A dispute is not a place for delight.

---

## Refunds

**Rule** Show the arithmetic. Original, deductions with reasons, net, destination, expected timing. A single "₦12,000 refunded" invites a support ticket.

**Failure states** *Bank delay* — separate "we sent it" from "your bank posted it", and label which is which.

---

## Verification journey

**User** Get approved and start earning. **Business** A traceable, checked artisan.

**Primary** ID → face match → trade → address → bank. **Secondary** Save and resume.

**Decision points** Each check passes, fails, or needs a resubmission.

**Failure states** *Document rejected* — say exactly which check failed and what a good submission looks like. "Verification failed" with no reason is the pattern most likely to lose a good artisan. *Stalled* — proactive nudge with the specific outstanding item.

**Rule** Progress is always visible: which checks are done, which remain, what each is for. See Phase Six.

---

## Artisan growth journey

**User** Understand how to earn more. **Business** Retain and improve supply.

Surface: jobs completed, on-time rate, repeat customers, next tier and the specific gap to it. **Never a leaderboard** — ranking artisans against each other converts colleagues into competitors and depresses the platform's cooperative norms.

---

## Customer loyalty

Points have no cash value and the interface must say so where they are displayed, not only in the terms. Show expiry before it happens, not after.

---

## Business management

Multi-site: consolidated records, per-site filtering, exportable invoices, role-based access. Density is higher than consumer surfaces — tables over cards, `--space-14` row rhythm, `tabular-nums` everywhere.

---

## Notification centre

Grouped by booking, not by timestamp. Unread is weight + a dot, never colour alone. **Every notification is deep-linked** to the thing it is about — a notification that cannot be acted on is noise.

---

## Settings & profile

One concern per row, current value visible without tapping in. Destructive actions (delete account) last, separated, and confirmed by typing — not by a single tap.

---

## Offline experience

**Rule** Offline is a state, not an error.

Persistent banner. Cached bookings readable. Actions queue and say they are queued. On reconnect, sync silently and confirm once. **Never lose typed input to a dropped connection** — this is the failure users forgive least.

---

## Error recovery

Every error says: what happened, why if known, and what to do next. Never an error code alone. Retry is always available and always says what it will retry.

**Never blame the user.** "That code didn't match" — not "You entered an invalid code."

---

## Loading states

| Wait | Treatment |
|---|---|
| < 300ms | Nothing. A flash of spinner is worse than the wait |
| 300ms–2s | Skeleton matching the real layout |
| > 2s | Skeleton + a plain progress message |
| Unknown | Say what is happening: *"Searching for available artisans"* |

Skeletons mirror the real content shape. A generic grey box that resolves into a different layout causes a visible jolt and reads as cheap.

---

## Empty states

Every empty state: what would be here, why it is not, and one action. **Never an empty state that is only an illustration.**

*"No bookings yet"* + *"Your bookings will appear here once you book an artisan."* + **Find an artisan**.

---

## Success states

Proportionate to the effort. A completed booking earns a moment; a saved setting earns a toast; a sent message earns a tick. **Nothing gets confetti.** Success in a trust product is quiet competence, not celebration.
