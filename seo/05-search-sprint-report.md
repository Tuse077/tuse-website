# SEO sprint, October 2026

Branch `seo-sprint`. Built from the Search Console top-10 queries pulled on 2026-10-12.

## What the data said

| Query | Clicks | Impressions | Diagnosis |
|---|---|---|---|
| tușe | 12 | 17 | Brand, healthy. |
| tuse | 7 | 514 | Brand, low click rate. Part of this is unrelated intent ("tuse" is Romanian for "cough"), which cannot be won. |
| artisan app in nigeria | 7 | 52 | App page was titled "About the app". |
| artisans in nigeria | 1 | 34 | Homepage and services hub. |
| artisan websites in nigeria | 1 | 18 | Same. |
| artisan services | 1 | 8 | Same. |
| generator dies | 0 | 53 | Guide ranked but used "stops", not "dies", and was 156 words. |
| tuse meaning | 0 | 28 | Nothing on the site explained the name. |
| artisan app | 0 | 22 | App page title. |
| all services | 0 | 15 | Services hub. |

No service-plus-city searches ("plumber in Abuja") appear yet. That is the growth target.

## What changed

**Brand**
- New `/about` page: what Tușe means, how to say it, that Tuse and Tușe are the same company, company details. AboutPage + FAQPage schema.
- "What does Tușe mean?" added to the help FAQ and its schema.
- Organization schema now has `alternateName` (Tuse, Tușe, TUSE, Tuse app), logo, and all four app store listings in `sameAs`.
- Footer "About us" now links to `/about` on every page.

**App page** (`/about-the-app`)
- Title: "Tuse: The Artisan App for Nigeria (iOS & Android)". New description and intro.
- MobileApplication schema for both apps. No ratings, because there is no verified rating data to cite.

**19 service pages**
- Titles now use the trade as people search it, plus the cities help.html already names: "Plumber in Abuja, Lagos & Port Harcourt".
- Each page gets unique content from `scripts/services-content.js`: an intro, what drives the price, how to prepare, what a good job looks like, and two trade-specific FAQs. Pages went from roughly 650 to roughly 900 words, most of the gain unique.
- Services hub retitled "All Services: 19 Verified Artisan Services in Nigeria".

**Guides: 25 deepened, 15 new, 40 total**
- Every guide now has "Why this happens", "What affects the repair cost", and at least three FAQs (`scripts/guides-depth.js`).
- Generator guide retitled "Generator Starts Then Dies?" for the 53-impression query.
- 15 new guides (`scripts/guides-more.js`): generator overheating, generator smoking, car overheating, car battery keeps dying, bedbugs, rats, termites, pests back after fumigation, ceiling fan, water heater, paint peeling, damp patches, wardrobe door, overhead tank overflowing, no water from the tap. Fumigation and Painting get their first guides.
- Prices in guides now come from the live SERVICES array via `{price}`. The generator refuses to build if a typed price disagrees.

**Technical**
- `sitemap.xml` lastmod now uses each file's last git commit date instead of "today" for every URL.
- Branded `404.html`, noindex.
- Security headers in `vercel.json`: nosniff, frame options, referrer policy, permissions policy, and a CSP limited to directives that cannot break inline scripts, fonts or analytics.
- Long cache on images under `/assets`.

## Needs confirming by the team

- **The etymology and pronunciation** on `/about` and in the help FAQ: "from the Yorùbá túṣe, to fix or mend", said "TOO-sheh". The tagline translations are taken from the homepage, but the root word and the pronunciation are the one new claim in this sprint. Correct both places if either is wrong.

## What only the team can do

These matter more than anything on the website for "plumber near me" style searches, because Google shows ads and the Maps pack above the normal results.

1. **Google Business Profile.** Create or claim it for TUȘE LTD at the Life Camp address, category "Home services" or the closest fit, with the same name, phone and address as the site footer. Add photos and the website link. This is the single biggest lever for local searches.
2. **Reviews on that profile.** Ask satisfied customers to leave a Google review. Never buy or write them.
3. **App store listings.** Make sure both listings link to `https://tuse.ng` and use the words people search: "artisan", "plumber", "electrician", "cleaner", "Abuja".
4. **Links from other sites.** Nigerian business directories (VConnect, BusinessList, Finelib), and press: Techpoint, TechCabal, Nairametrics, local news. A handful of real links outweighs dozens of pages.
5. **Bing Webmaster Tools.** Import the site from Search Console. It takes two minutes and covers Bing and the AI answers built on it.
6. **Coverage data.** City and neighbourhood pages were not built, per the earlier brief. With a list of areas where artisans are genuinely active, these become the next sprint.

## What to watch in Search Console

- **Pages report:** the 40 guides and 19 services moving to "Indexed" over 2 to 6 weeks.
- **Performance, Queries:** service-plus-city queries ("electrician abuja", "fumigation services lagos") starting to appear.
- **"tuse meaning":** should start getting clicks once `/about` is indexed.
- Re-check in four weeks before judging. Rankings move slowly for a site this young.
