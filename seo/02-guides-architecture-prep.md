# `/guides/` — architecture prepared, no pages built

**Deliberately not built yet, and here's why that's the correct call rather than a shortcut:**

The brief's own page-quality rule — *"Would this page genuinely help someone who searched this query? If no, do not create the page"* — applies to a `/guides/` hub exactly as much as it applies to a location page. A hub linking to zero real guide pages fails that test today. Building one now would be the same mistake the brief explicitly warns against elsewhere, just one level up the hierarchy.

So what "prepare the architecture" means here is genuinely just infrastructure, not a placeholder page:

## What's already in place

**The sitemap generator needs no changes to support `/guides/` later.** `scripts/generate-sitemap.js` walks every `.html` file in the site root except a short skip-list (`assets`, `scripts`, `seo`, `design-system`, dotfolders). The moment real files land in a `guides/` directory, the next `node scripts/generate-sitemap.js` run picks them up automatically — same as it already does for `services/`. Nothing to configure.

**The routing convention is proven.** `/services/{slug}` already demonstrates the pattern: a directory of `.html` files, each served clean by Vercel's `cleanUrls`, with a hub at the parent path. `/guides/{slug}` would work identically — `guides.html` at root as the hub, `guides/{slug}.html` per guide.

**The page shell is reusable.** `scripts/generate-services.js` separates the shared boilerplate (`head()`, `ctaStrip()`, `footer()`) from the per-page content. A `scripts/generate-guides.js` would reuse those same functions rather than duplicating markup.

## What's genuinely not decided, and why it's not mine to decide

The brief lists example guide topics — "pipe is leaking," "AC blowing warm air," "generator won't start." Each one needs:

- **A real cause/diagnosis section**, not a rewording of the SERVICES description the way service pages could legitimately do. "My generator won't start" needs actual troubleshooting content — check the fuel, check the battery terminals, check the oil level — and I don't have a verified source for that content the way I had a verified `SERVICES` array for the service pages. Writing it myself would mean inventing troubleshooting advice, which is exactly the fabrication the brief prohibits.
- **A judgement call on liability tone** — "what you can safely check yourself" is the kind of content that's genuinely useful when right and genuinely risky when wrong (electrical and gas-adjacent problems especially).

This is a legitimate blocker, not a stalling tactic: I can build the pipes, but the water has to come from somewhere real — either a subject-matter source you can point me to, or a smaller first batch (2–3 guides) that gets reviewed before the pattern repeats 15 more times.

## Recommended next step

Pick 2–3 of the highest-intent problems from the brief's own list, supply (or point me to) real diagnostic content for each, and I build those as the first batch — proving the pattern the same way the 19 service pages proved `/services/` before scaling further.
