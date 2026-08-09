# TUȘE SEO Audit — Findings & Roadmap

**Status:** Audit complete. Nothing implemented yet — this is the report, not the work.
**Method:** Every claim below was verified directly — against the live site (`curl`, browser network/console tools) or the source files. Nothing is assumed.

---

## The one-sentence summary

**The nine pages that exist are technically clean. The problem is that there are only nine.** Tușe currently has exactly one page that can rank for "plumber Abuja," one for "AC repair cost Abuja," one for everything — the homepage. That is the real ceiling, and it's an architecture gap, not a bug list.

Two genuine bugs did turn up along the way, unrelated to SEO strategy, and are called out separately because they need fixing regardless of what we decide about content.

---

## PART A — What's actually broken

### 🔴 A1. Zero measurement. We are flying blind.

Verified: no Google Analytics, no Tag Manager, no Search Console verification meta tag, no privacy-respecting alternative (Plausible/Fathom/etc.) — anywhere in the codebase. The only hits for "analytics" are prose copy, not tracking code.

**Why this is P0, not P1:** every other section of your brief — rankings, CTR, landing-page performance, search-to-booking conversion — depends on this existing first. Section 21 of your own brief can't be satisfied retroactively; the sooner this is wired in, the sooner it has data to show you. Building 30 service pages before this is live means 30 pages of invisible performance for however long the gap lasts.

**Also blocks:** we cannot even confirm Google has acknowledged the site in Search Console without a verification method (meta tag or DNS TXT).

### 🔴 A2. A real, live 404 — unrelated to SEO, found while verifying

Opened `tuse.ng` in a real browser and read the console: `GET https://tuse.ng/assets/qr-app.png → 404`. The file does not exist in `assets/` at all.

This is the desktop "scan to download" QR modal — a conversion path, not a content path. It's broken in production right now. Flagging it here because "do not assume anything works, verify it" surfaced it, not because it's an SEO item.

### 🟡 A3. Sitemap is stale and disconnected from the deploy process

Every URL in `sitemap.xml` carries `<lastmod>2026-08-02</lastmod>` — including `index.html` and `terms-and-conditions.html`, which were both substantially edited on **2026-08-09**, and the other seven pages edited **2026-08-04**. Nobody is updating this file when content changes. Low severity today at 9 URLs; becomes a real trust signal problem once there are 50+.

### 🟡 A4. `help.html` has 28 real Q&As and zero `FAQPage` schema

Counted directly: 28 `<details>` / 29 `<summary>` elements, genuine accordion content, not decorative. `delete-account.html` already implements `FAQPage` correctly — this is a working pattern in your own codebase that simply wasn't extended to the page that needs it most.

### 🟡 A5. Structured data coverage is inconsistent

| Page | Schema present |
|---|---|
| `index.html` | Organization, MobileApplication, WebSite |
| `terms-and-conditions.html` | Organization, WebPage, BreadcrumbList |
| `delete-account.html` | FAQPage |
| help, contact, about-the-app, community-guidelines, privacy, business-enquiry | **None** |

No page has more than one type combined with Breadcrumb — e.g. `help.html` should carry both `BreadcrumbList` and `FAQPage`, and doesn't carry either.

**What I did *not* find, correctly:** no `Review` or `AggregateRating` schema anywhere. That's correct — you don't have real aggregate review data, and the brief is explicit that fabricating it is off the table. Nothing to fix here; noted so you know it was checked, not missed.

### 🟢 A6. Minor — heading hierarchy skip

The "For artisans" section's four benefit cards use `<h4>` directly under an `<h2>`, skipping `<h3>`. The nearly identical "Tuse for Business" section two scrolls down does the same layout correctly with `<h3>`. Cosmetic for ranking purposes, real for outline-based accessibility tools and AI content extraction (your own section 19 goal).

### 🟢 A7. Google Fonts load render-blocking

`preconnect` hints exist for `fonts.googleapis.com` and `fonts.gstatic.com`, but the actual stylesheet is a plain synchronous `<link rel="stylesheet">` — no preload-and-swap pattern. Direct, measurable LCP/FCP cost on every page load. Fixable without touching layout, typography, or any visual output.

### 🟢 A8. "20+ services" vs. 19 actual services

Flagged in our last exchange, still open: the live search index (`SERVICES` array) has exactly 19 named entries with real `from ₦X` pricing. The homepage claims "20+." One service short of literally true. Add a 20th real service to the array, or soften the claim — your call, not mine to guess at.

---

## PART B — What's actually clean (verified, not assumed)

Worth stating plainly, since a report that's all problems is as misleading as one that's all praise:

- **Redirects:** `www→apex`, `http→https`, trailing-slash, and `.html`-suffix all collapse to a single canonical URL via clean 308s. Worst-case combined chain (http + www + trailing-slash + `.html` all at once) is 3 hops — nobody actually links that way, but noted as the true ceiling.
- **Canonical tags:** present, self-referencing, correct on every page — and confirmed to survive query-string pollution (`?utm_source=test&ref=fb` still canonicalizes to the clean URL).
- **404 handling:** a genuinely non-existent path returns a real HTTP 404, not a soft-404 disguised as 200.
- **robots.txt:** minimal, correct, blocks nothing it shouldn't, doesn't accidentally block `/assets/`.
- **Internal linking:** every real page is reachable from every other page via the footer. Zero orphans among the 9 indexable URLs. `business-enquiry.html` is intentionally linked only from `contact.html` and the homepage CTA — that's a conversion form, not a page that needs broad linking.
- **Images:** every `<img>` has an `alt` attribute; the two real product screenshots have specific, non-keyword-stuffed descriptive alt text (not decorative filler); dimensions are set to prevent layout shift.
- **No thin or placeholder content:** checked every page for leftover `lorem ipsum` / `TODO` / bracket placeholders outside the terms page (already handled) — none found. Content depth is real everywhere.
- **HSTS** is set. Mobile viewport meta is correct. `lang="en"` is correctly set with per-phrase `lang="yo"/"ig"/"ha"/"pcm"` scoping on the decorative hero language cycler — a detail that actually helps screen readers and doesn't need hreflang (not separate-language pages).
- **Duplicate content / query params:** clean, per A above.

---

## PART C — The actual opportunity: information architecture

This is where your brief's real ambition lives, and it's the part I have not built yet.

**The asset that makes this legitimate rather than spammy:** your `SERVICES` array in `index.html` already contains 19 real services with real, live `from ₦X` prices — the same prices customers see when they search in the app. That is genuine pricing intelligence. Every service page, every pricing page, every FAQ about cost can be built from data that already exists and is already true, rather than invented for SEO.

```
Electrical work    from ₦10,000     Painting          from ₦15,000
Plumbing            from ₦10,000     Welding           from ₦15,000
Barbing              from ₦15,000     Fumigation        from ₦25,000
Cleaning             from ₦15,000     Pest control      from ₦20,000
Deep cleaning        from ₦30,000     Tailoring         from ₦15,000
Hairdressing         from ₦20,000     Auto care         from ₦15,000
Nail technician      from ₦15,000     AC repair         from ₦12,000
Makeup               from ₦40,000     Appliance repair  from ₦10,000
Chef and cooking     from ₦20,000     Generator repair  from ₦12,000
```

### Proposed architecture

```
/services/                                 ← hub, links to all 19
/services/plumbing/                        ← real page, real price, real FAQ
/services/plumbing/abuja/                  ← only if we can back it with real coverage
/services/electrical-work/
...one per real service (19 pages)

/guides/                                   ← problem-based content, bridges to iRanti
/guides/pipe-is-leaking/
/guides/ac-blowing-warm-air/
/guides/generator-wont-start/
...

/pricing/                                  ← optional hub, or fold into each /services/ page
```

### What I need from you before building a single one of these

Your brief is explicit — *"Do NOT mass-generate empty location pages"* and *"Only create location pages where there is enough legitimate value and demand"* — and I agree with that instinct, but it means I'm blocked on business facts I don't have:

1. **Which neighborhoods do you actually have artisan coverage in right now?** The only ones with any evidentiary basis in the current site are Wuse, Maitama and Gwarinpa (from the homepage testimonials). I will not manufacture a `/plumber-lugbe/` page if there's no real coverage there — that's exactly the thin-page trap your brief warns against.
2. **Do you want service pages first, or problem pages first?** Both are legitimate; service pages are lower-risk (they extend a pattern you already have data for) and faster to ship correctly. Problem pages are higher-effort per page (need real cause/diagnosis content, not just a price) but map more directly to how people actually search ("my pipe is leaking" beats "plumber Abuja" in volume for a lot of trades).
3. **Analytics: install now, or after the first content batch?** I'd argue now — see A1 — but it's your call on sequencing.

I'm not asking these to stall. I'm asking because guessing at them is precisely the "generate thin pages and hope" failure mode you told me explicitly not to fall into.

---

## PART D — Roadmap

### P0 — Fix now, before anything else
| # | Item | Effort |
|---|---|---|
| 1 | Install analytics (GA4 or privacy-respecting alt.) + Search Console verification | Small |
| 2 | Fix the broken `qr-app.png` (need the actual QR image from you, or I generate one pointing at your real store links) | Small, blocked on asset |
| 3 | Add `FAQPage` schema to `help.html` | Small |
| 4 | Fix sitemap `lastmod` to reflect real edit dates, going forward | Small |

### P1 — High impact, no new pages
| # | Item | Effort |
|---|---|---|
| 5 | Preload/swap pattern for Google Fonts (fixes A7) | Small |
| 6 | Fix h4→h3 heading skip (A6) | Trivial |
| 7 | Extend `BreadcrumbList` + page-appropriate schema to the 6 pages currently carrying none | Medium |
| 8 | Resolve the 19-vs-20 services claim (A8) | Trivial, needs your input |

### P2 — Growth: the architecture itself
| # | Item | Effort |
|---|---|---|
| 9 | `/services/` hub + 19 individual service pages, built from the real `SERVICES` data | Large |
| 10 | 3–5 problem-based `/guides/` pages for the highest-intent problems, bridging to iRanti | Medium, per page |
| 11 | Location pages **only** for neighborhoods you confirm as real coverage | Depends on your answer |
| 12 | Sitemap index (pages/services/locations split) once URL count justifies it | Small, do when needed |

### P3 — Long term
| # | Item |
|---|---|
| 13 | Backlinks / digital PR |
| 14 | City expansion beyond Abuja, as Tușe actually launches there |
| 15 | Google Business Profile alignment |
| 16 | CSP header hardening |
| 17 | WebP/AVIF for the two real product screenshots |
| 18 | Clean up the 3-hop worst-case redirect chain (A-tier polish, not urgent) |

---

## What I'm explicitly not claiming

I have no access to Google Search Console, Keyword Planner, or any real search-volume tool from here — so "plumber Abuja" style keyword prioritization in this report is based on your brief's own examples and general domain logic, not verified search data. Once GA4/GSC are live (P0-1), we'll have real queries and impressions to prioritize against instead of informed guessing. I'd rather say that plainly than dress up an assumption as research.
