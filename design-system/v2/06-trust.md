# Phase Six — Trust Design Language

Tușe's product is not booking. Booking is a form. **The product is the belief that the stranger arriving at your gate is who they say they are.** Every other design decision is downstream of that.

This phase governs how that belief is built, displayed and — critically — how it is prevented from becoming decoration.

---

## The first law

> **A trust signal must be falsifiable.**

If a badge cannot be lost, it is branding, not verification. Every indicator in this system names a specific check, states when it was performed, and can be removed. A badge that only ever accrues is worthless, and users learn that faster than product teams expect.

## The second law

> **Never rating alone.**

A star rating is a single number that compresses punctuality, competence, cleanliness and manner into one figure, and it is trivially gamed at low volume. **5.0 from one job is not 5.0 from four hundred.**

Every rating in every Tușe product renders as a **trust unit**, never a bare score:

```
★ 4.9   ·   412 jobs   ·   Verified   ·   96% on time
└ score    └ volume     └ identity     └ behaviour
```

**Four channels. Minimum three visible.** Volume is never omissible — it is what converts a score into evidence.

---

## The trust ladder

Five tiers. Each is earned, displayed identically everywhere, and can be lost.

| Tier | Requirement | Visual |
|---|---|---|
| **Unverified** | Registered only | No badge. Cannot receive bookings. Never shown to customers |
| **Identity Verified** | Government ID + face match + address | Shield outline, `--text-muted` |
| **Verified Artisan** | Identity + trade assessment + bank in own name | Shield filled, `--color-success` |
| **Trusted Artisan** | Verified + 50 paid jobs + ≥95% on-time + ≥4.7 | Shield filled + `--color-secondary` ring |
| **Master Artisan** | Trusted + 250 jobs + certification + ≥98% + training complete | Shield filled + `--color-accent` ring |

**Rules.**
- Tier is displayed with its **name**, never the icon alone. An unlabelled shield is a decoration.
- Tier is **tappable everywhere** and opens the verification detail — what was checked, and when.
- Gold (`--color-accent`) appears on **Master only**. Its scarcity is what makes it read as rare.
- Tiers are **not colour-coded by hue alone** — the ring, the fill and the label all differ, so the ladder survives monochrome and colour-blindness.

---

## The verification record

Tapping any tier opens the same panel in every product:

```
ADAEZE O.                          Verified Artisan
────────────────────────────────────────────────────
✓ Government ID confirmed              12 Mar 2026
✓ Facial verification at signup        12 Mar 2026
✓ Trade competence assessed            18 Mar 2026
✓ Home address on record               12 Mar 2026
✓ Bank account tied to identity        14 Mar 2026
────────────────────────────────────────────────────
318 jobs · 96% on time · 62% repeat · 4 min response
```

**Dates are mandatory.** "Verified" without a date is a claim; "verified 12 March 2026" is a record. It also makes the point-in-time nature honest — verification is a snapshot, not a guarantee, and the terms say so.

---

## Signal taxonomy

Four categories. Never mix them in one row — a customer must be able to tell an identity fact from a behavioural average at a glance.

**Identity** — binary, checked, dated. ID confirmed · face matched · address on record · bank in own name · background check · certification.
Rendered as **check rows**. Present or absent. Never a percentage.

**Behaviour** — measured, moving, always with volume. On-time arrival · response time · completion rate · repeat customers.
Rendered as **percentage + sample size**. `96% on time (318 jobs)` — never `96%` alone.

**Reputation** — earned from paid work only. Rating · review count · tier.
Rendered as the **trust unit**.

**Protection** — platform guarantees. Escrow held · insured · dispute cover.
Rendered as **statements of fact about the money**, in plain words. See Phase Three.

---

## Rendering rules

| Context | Minimum |
|---|---|
| Search result card | Tier + rating + volume + distance |
| Artisan profile | Full verification record |
| Booking confirmation | Tier + name + photo |
| Live tracking | Tier + name + photo + "this is who is coming" |
| Message thread | Tier chip beside the name |
| Review | Reviewer's booking count |

**The tracking screen is the highest-stakes surface in the product.** Someone is about to open their door. The artisan's photo, name and tier must be visible without scrolling, and the photo must be the same one that was verified.

---

## What is forbidden

- **Stars alone.** Anywhere. Ever.
- **A badge without a name.** Icons are not self-describing.
- **"Verified" as a general adjective.** It means the five checks. Nothing else may borrow the word — not "verified reviews", not "verified business".
- **Percentages without denominators.** `100%` from two jobs is noise dressed as data.
- **Trust signals in marketing that don't exist in product.** If the site claims a check, the app must show it, dated.
- **Colour as the only tier signal.**
- **Inflating a tier for supply reasons.** The moment tiers become a growth lever they stop being evidence, and every previously-earned badge is retroactively devalued.

---

## Trust in failure

Trust is built in the good case and **proven in the bad one**. The failure surfaces matter more than the badges.

| Event | Trust behaviour |
|---|---|
| Artisan no-show | State immediately that escrow is untouched. Rematch offered before an apology |
| Damage reported | Name the traceability — address and bank on record. This is *why* verification goes that deep |
| Dispute raised | Show the funds are held. State the timeline. Then meet it |
| Artisan suspended | Tell the affected customers what it means for their booking |
| Tier lost | Tell the artisan which metric fell, what the threshold is, and how to recover it |

**Never hide a downgrade.** An artisan who discovers a lost tier from a customer will not stay.

---

## Trust copy

| Say | Not |
|---|---|
| Identity confirmed against a government ID | 100% verified |
| Held in-app until the job is done | Secure payments |
| 96% on time across 318 jobs | Highly reliable |
| Verified 12 March 2026 | Trusted member |
| We check ID, face, trade, address and bank | Fully vetted |

**Specific beats reassuring.** "Fully vetted" is what an unverified marketplace says. "Bank account tied to identity" is what one that actually checks says — and the second is more persuasive precisely because it is checkable.

---

## Cross-product consistency

The same artisan renders identically in the customer app, the artisan app, the business portal, the estate platform, the admin console and the marketing site. Same tier name, same icon, same order of checks, same dates.

**If the admin console shows a richer record than the customer sees, the customer is being under-informed on purpose.** Everything an operator can see about verification status, a customer can see about the artisan coming to their home.
