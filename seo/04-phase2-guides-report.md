# Tușe SEO Phase 2 — Problem Guides Report

Built locally. **Not committed. Not pushed. Not deployed.** Awaiting approval.

---

## A. Search opportunity map (25 intents)

Selected for: Tușe can solve it, urgent intent, clear service mapping, useful safe guidance, iRanti funnel fit. **No fabricated search volumes.**

Evidence basis: live `SERVICES` keywords / homepage DX phrasing, help-centre example queries, and common Nigerian home-repair problem phrasing — not claimed rankings.

| # | Intent | Service | From | Why first batch |
|---|--------|---------|------|-----------------|
| 1 | AC blowing warm air | AC repair | ₦12,000 | High-heat urgency; homepage example language |
| 2 | AC not cooling | AC repair | ₦12,000 | Closely related; covers “weak cooling” queries |
| 3 | AC leaking water | AC repair | ₦12,000 | Common Lagos/Abuja indoor drip complaint |
| 4 | AC not turning on | AC repair | ₦12,000 | Power vs unit fault; safe breaker guidance |
| 5 | AC making noise | AC repair | ₦12,000 | Early failure signal; conversion to inspection |
| 6 | Pipe leaking | Plumbing | ₦10,000 | Classic emergency problem search |
| 7 | Leaking tap | Plumbing | ₦10,000 | Already in help/homepage examples |
| 8 | Blocked sink | Plumbing | ₦10,000 | Strong DIY-to-pro journey |
| 9 | Blocked drain | Plumbing | ₦10,000 | Health/urgency when multi-fixture |
| 10 | Toilet not flushing | Plumbing | ₦10,000 | High household intent |
| 11 | Low water pressure | Plumbing | ₦10,000 | Whole-home vs single fixture diagnosis |
| 12 | Generator won’t start | Generator repair | ₦12,000 | Homepage example; Nigerian outage reality |
| 13 | Generator starts then stops | Generator repair | ₦12,000 | Fuel/protection patterns |
| 14 | Generator no power | Generator repair | ₦12,000 | Engine-on / no-output confusion |
| 15 | Socket not working | Electrical work | ₦10,000 | Clear service map; safety gates |
| 16 | Breaker keeps tripping | Electrical work | ₦10,000 | “Don’t keep resetting” education |
| 17 | Lights flickering | Electrical work | ₦10,000 | Loose-connection urgency |
| 18 | No power in one room | Electrical work | ₦10,000 | Circuit isolation intent |
| 19 | Fridge not cooling | Appliance repair | ₦10,000 | Food-loss urgency |
| 20 | Washing machine not draining | Appliance repair | ₦10,000 | Filter-clearable vs pump fail |
| 21 | Washing machine not spinning | Appliance repair | ₦10,000 | Follow-on from drain faults |
| 22 | Cockroaches in the house | Pest control | ₦20,000 | Hygiene + pro treatment path |
| 23 | Car won’t start | Auto care | ₦15,000 | Battery/starter intent |
| 24 | Door won’t close | Carpentry | ₦10,000 | Humidity swell; low-risk checks |
| 25 | Gate needs welding | Welding | ₦15,000 | Security / sagging metal gates |

Deferred: beauty/lifestyle booking intents, generic cleaning price pages, neighbourhood pages, near-duplicate keyword variants.

---

## B. URLs created

```
/guides
/guides/ac-blowing-warm-air
/guides/ac-not-cooling
/guides/ac-leaking-water
/guides/ac-not-turning-on
/guides/ac-making-noise
/guides/pipe-leaking
/guides/leaking-tap
/guides/blocked-sink
/guides/blocked-drain
/guides/toilet-not-flushing
/guides/low-water-pressure
/guides/generator-wont-start
/guides/generator-starts-then-stops
/guides/generator-no-power
/guides/socket-not-working
/guides/breaker-keeps-tripping
/guides/lights-flickering
/guides/no-power-in-one-room
/guides/fridge-not-cooling
/guides/washing-machine-not-draining
/guides/washing-machine-not-spinning
/guides/cockroaches-in-house
/guides/car-wont-start
/guides/door-wont-close
/guides/gate-needs-welding
```

---

## C. Service mapping (Problem → Service → CTA)

| Problem slug | Service page | Primary CTAs |
|--------------|--------------|--------------|
| `ac-*` (5) | `/services/ac-repair` | `/?q=…#seek` (iRanti), `/#get` (app), service page |
| plumbing set (6) | `/services/plumbing` | same pattern |
| generator set (3) | `/services/generator-repair` | same |
| electrical set (4) | `/services/electrical-work` | same |
| appliance set (3) | `/services/appliance-repair` | same |
| `cockroaches-in-house` | `/services/pest-control` | same |
| `car-wont-start` | `/services/auto-care` | same |
| `door-wont-close` | `/services/carpentry` | same |
| `gate-needs-welding` | `/services/welding` | same |

Prices on every guide are pulled live from the homepage `SERVICES` array at generate time — never invented.

---

## D. iRanti integration

- Each guide explains iRanti as a **preliminary** category + price-band helper (not remote definitive diagnosis).
- Primary iRanti CTA: `/?q={seekQuery}#seek` — homepage seek prefill via `URLSearchParams`.
- Secondary CTA: `/#get` app download (existing conversion path).
- Mapped service pages now list “Common problems” linking back into `/guides/*`.

---

## E. Analytics events added

In [`assets/analytics.js`](../assets/analytics.js) (existing loader only):

| Event | When |
|-------|------|
| `guide_view` | `body[data-guide]` on guide pages |
| `guide_cta_click` | `[data-evt="guide_cta"]` |
| `iranti_cta_click` | `[data-evt="iranti_cta"]` |
| `service_page_click` | `[data-evt="service_page"]` |
| `app_store_click` | unchanged |
| `generate_lead` | unchanged |

GA4 ID remains in `assets/analytics-config.js` only.

---

## F. SEO validation

| Check | Result |
|-------|--------|
| Pages scanned | 56 |
| JSON-LD blocks | 144, **0 invalid** |
| Duplicate titles | **0** |
| Duplicate meta descriptions | **0** |
| H1 ≠ 1 | **0** |
| Internal links | 2,585, **0 broken** |
| Broken assets / canonical mismatches | **0** |
| Sitemap | **55** URLs (hub + 25 guides included; `enquiry-received` noindex skipped) |
| `robots.txt` | unchanged (`Allow: /` + sitemap) |
| Guide schema | WebPage + BreadcrumbList + FAQPage + HowTo (safe checks only) |
| Hub schema | CollectionPage + hasPart |

Local smoke: `/guides`, sample guide pages, `/services/plumbing`, terms, delete-account → 200; unknown guide → 404.

---

## G. Git status (summary)

**Modified:** analytics loader; sitemap priorities + regenerated `sitemap.xml`; service generator + regenerated hub/19 services; homepage seek deep-link; Guides footer link on core static pages; link checker query-string support.

**New (untracked):**
- `guides.html`
- `guides/*.html` (25)
- `scripts/page-shell.js`
- `scripts/guides-data.js`
- `scripts/generate-guides.js`
- `seo/04-phase2-guides-report.md` (this file)

**Not done:** commit, push, deploy.

---

## Implementation notes

- Generator: `node scripts/generate-guides.js`
- Shared chrome: `scripts/page-shell.js` (also used by `generate-services.js`)
- Content source of truth: `scripts/guides-data.js`
- Content is carefully caveated general knowledge with explicit stop-and-call-pro gates — review before production.
