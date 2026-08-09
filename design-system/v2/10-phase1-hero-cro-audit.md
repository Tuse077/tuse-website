# Phase 1 — Hero, Conversion & Legal Pages

**Status:** Built and running locally. **Not deployed — awaiting approval.**

No redesign. No new colours, type, spacing, components or navigation. Every change uses existing tokens and existing components.

---

## 1. Hero audit — what was wrong

| # | Finding | Why it costs conversions |
|---|---|---|
| **1** | **The `<h1>` says nothing about the product.** "A máa túṣe." rotating through five languages is strong brand work, but a first-time visitor learns nothing in five seconds. The English line shows for one second in five. | The single most valuable element on the page carries zero proposition. |
| **2** | **The lede was a feature list.** *"Verified artisans, matched to your location, tracked to your door, paid only when the job is done."* Four features, no reason to prefer Tușe over calling someone you know. | Does not answer *why Tușe instead of an artisan directly?* |
| **3** | **iRanti — the actual differentiator — was absent from the hero.** It lived four screens down. | The one thing no competitor has was invisible above the fold. |
| **4** | **"Download the app" was a dead anchor.** It scrolled to `#get`, where the visitor still had to choose a store — a decision their device already answers. | Two extra taps and a decision, at the exact moment of intent. |
| **5** | **Flat CTA hierarchy.** "Download the app" and "Become an artisan" sat side by side at equal size, addressing opposite audiences. | Supply-side CTA competes with the demand-side conversion. |
| **6** | **Search had no empty state.** A non-matching query fell back to `SERVICES.slice(0,3)` — showing AC repair, Plumbing, Barbing for *anything*. | A confident wrong answer costs more trust than an honest "no". Forbidden by the Design System's own pattern rules. |
| **7** | **Search relevance was broken by stop-words.** "my ac **is** not cooling" scored *Nail technician* on the "is" inside "pol**is**h", and `ac` matched "**ac**rylic" and "ro**ac**h". | Bad results directly under an AI claim actively destroys the claim. |
| **8** | **Search results showed no diagnosis.** Category + "from ₦X" only — the estimate and likely fault existed only far below. | The differentiator was missing at the exact moment of evaluation. |
| **9** | **No plurals in search.** "socket**s**" did not reach the keyword "socket"; "roach**es**" did not reach "roach". | Real queries silently returned nothing. |

---

## 2. What changed

### Copy

| | Before | After |
|---|---|---|
| **Lede** | Verified artisans, matched to your location, tracked to your door, paid only when the job is done. | **Say what is wrong. iRanti works out the likely fault and what it should cost — before anyone comes, and before you pay a naira.** Then a verified artisan is matched, tracked to your door, and paid only once the job is done. |
| **Search label** | What do you need fixed today? | `iRanti` **What is wrong? Describe it in your own words.** |
| **Search hint** | Try: a leaking sink, a barber for tomorrow… | **Plain words work:** *my AC isn't cooling · the kitchen sink is leaking · I need a barber tomorrow* — now clickable, one tap fills the field |
| **Primary CTA** | Download the app | **Get the app — it's free** |
| **Secondary CTA** | Become an artisan | **I'm an artisan** (self-identification, not an instruction) |
| **New** | — | *Free to download. You only pay for the job, at the price you agreed.* |

The `<h1>` was **left alone**. The multilingual rotation is real brand equity and removing it would be a redesign. The proposition now sits in the lede directly beneath it, where it is readable for all five seconds.

### iRanti in the hero — no new section

Results now **lead with iRanti's read**, using the existing `.sr` component:

```
iRanti READS YOUR DESCRIPTION AS
🛡 AC repair                         from ₦12,000
Likely: Low refrigerant, a clogged filter or a failed capacitor
Verified artisan, tracked to your door, paid only when it is done
```

The three lines mirror the existing iRanti section — likely issue, price, right professional — so the hero and the section reinforce one message.

### Search quality

- **Stop-word filter** — 40 common words removed before scoring.
- **Whole-word matching scores 3×** a substring match.
- **Substring matching restricted to tokens over 3 characters**, so "ac" can no longer match "acrylic".
- **Light stemming** — plurals and gerunds (`-s`, `-es`, `-ies`, `-ing`, `-ed`) so "sockets" reaches "socket".
- **Honest empty state** — *"No match for that yet"* plus guidance, and a route to browse. **It never guesses a category.**

Verified against 13 real-phrasing queries: **12 exact top-match, 1 acceptable** ("roaches" returns Fumigation first with Pest control second — both legitimate, both shown, which is the documented behaviour for ambiguous queries).

### Device-aware CTAs

- **iOS** → App Store directly.
- **Android** → Play Store directly.
- **Desktop** → QR modal with both store buttons.
- Every CTA keeps its `href`, so it still works with JavaScript disabled.
- Modal: focus moves in, focus is trapped, `Esc` closes, focus returns to the trigger, body scroll locks. Verified.

Applies to the hero CTA, the nav CTA and the mobile dock.

---

## 3. Legal pages

### `/terms-and-conditions`
40 clauses, 8 parts, Schedule 1 and the Annexe. Sticky contents rail with scroll-spy, breadcrumb, version/effective/last-updated block, responsive table in its own scroll container. **42 TOC links, zero broken anchors.**

**The supplied content was rendered, not rewritten.** Which means:
- The document's own **"NOTICE — DRAFT DOCUMENT"** is displayed, because removing a warning aimed at readers would be worse than showing it.
- All **59 bracketed placeholders** are rendered and **visually marked** so they are impossible to miss before publication.

### `/delete-account`
Apple and Google both require a reachable account-deletion route. Built with: what is removed, what is retained and why (tied to Clause 28 retention periods), the 30-day timeframe, irreversibility, active bookings, wallet balances, loyalty points, two deletion methods with steps, 8 FAQs, and `FAQPage` structured data.

Content is grounded in the actual Terms — Clause 34 (termination), 28.2 (retention), 13 (wallets) — not invented.

---

## 4. Expected impact

Directional, ranked by confidence. No numbers are claimed because none have been measured on this site.

| Change | Effort | Expected impact | Confidence |
|---|---|---|---|
| Device-aware CTA | Low | **Highest.** Removes 2 taps and a decision at peak intent | High — well-established pattern |
| Search empty state | Low | Prevents the worst failure: a wrong confident answer | High |
| Search relevance fix | Low | Bad results under an AI claim discredit the claim | High |
| iRanti read in results | Medium | Moves the differentiator to the decision moment | Medium |
| Lede rewrite | Low | Answers "why Tușe" in the first five seconds | Medium |
| Clickable example queries | Low | Removes the blank-field stall | Medium |
| Legal pages | Medium | Unblocks app store compliance | Certain — it is a requirement |

---

## 5. Implementation order

1. ~~Search empty state + relevance~~ **done** — lowest effort, prevents active harm
2. ~~Device-aware CTA + QR modal~~ **done** — highest conversion impact
3. ~~Hero copy~~ **done**
4. ~~iRanti in search results~~ **done**
5. ~~Legal pages~~ **done**
6. **QR image** — needs one asset (below)
7. **Trust section** — deferred, see below

---

## 6. Not done, and why

**Trust section improvements (brief item 5).** The brief asks for improved platform statistics and review presentation using *"only genuine, verifiable social proof."* The current numbers are **not genuine** — the sample profile (318 jobs, 96% on-time) and the three testimonials are placeholder content written to your brief. Improving their *presentation* would make fabricated figures more prominent and more persuasive, which is the opposite of the intent. Blocked on real data.

**QR code image.** The modal is built and works; the store buttons carry the flow. `/assets/qr-app.png` does not exist yet — the `<img>` removes itself on error, so nothing breaks. I did not generate one because I cannot scan a QR to verify it decodes correctly, and a broken QR on a live site is worse than none. Generate one pointing at `https://tuse.ng/#get`, drop it in at 200×200, and it appears automatically.

**No fake urgency.** No "someone booked just now" notifications, as instructed — and they would violate the Design System's trust rules regardless.

---

## 7. One bug fixed along the way

`.pgrid > *` had no `min-width: 0`. Grid items default to `min-width: auto`, so the wide Schedule 1 table forced its column to 725px inside a 613px viewport and blew the page out horizontally. Fixed globally; verified as a no-op on the existing pages (`/help` layout hash and document height unchanged).

A second overflow came from my own `.ph` placeholder style: `white-space: nowrap` was written for short tokens like `[72]`, but three placeholders are full sentences — one stretched the page to **1697px**. Removed.
