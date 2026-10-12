#!/usr/bin/env node
/* ═══════════════════════════════════════════════════════════════════
   TUȘE — /services/ hub + 19 service pages, generated

   Zero dependencies. Every fact used below traces to one of two real
   sources, both already live on the site before this script exists:

     1. The SERVICES array in index.html (name, description, real
        "from ₦X" price, search keywords) — extracted programmatically
        by scripts/extract-services.js logic inlined below, not
        retyped, so there is no transcription drift from the live data.
     2. Copy already published elsewhere on the site (help.html's FAQ,
        the homepage's iRanti section, the four trust signals) —
        reworded per service, never a new claim.

   Nothing here invents a price, a location claim beyond what
   help.html already states (Abuja/Lagos/Port Harcourt, coverage
   varies by address), an arrival time, a rating, or an FAQ answer
   that is not already true elsewhere on the site.

   Usage:  node scripts/generate-services.js
   ═══════════════════════════════════════════════════════════════════ */

const fs = require('fs');
const path = require('path');
const { ORIGIN, esc, head, ctaStrip, footer } = require('./page-shell');
const GUIDES = require('./guides-data');

const ROOT = path.resolve(__dirname, '..');

/* ── 1. Extract the real SERVICES array from index.html ────────────── */
const indexHtml = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const servicesMatch = indexHtml.match(/var SERVICES = \[([\s\S]*?)\];/);
if (!servicesMatch) throw new Error('Could not find SERVICES array in index.html — aborting rather than guessing.');
// eslint-disable-next-line no-eval
const SERVICES = eval('[' + servicesMatch[1] + ']');
if (SERVICES.length !== 19) {
  throw new Error(`Expected 19 services, found ${SERVICES.length}. The source of truth changed — update this script's assumptions before generating pages, do not just proceed.`);
}

/* ── 2. Slug + short label + "common reasons" per service ──────────
   "reasons" is a plain-language rewrite of that service's own `d`
   and `k` fields above — nothing here is a fact not already implied
   by the live search index. Order matches the SERVICES array. */
const META = {
  'AC repair':          { slug: 'ac-repair',          label: 'AC repair',        reasons: ['a split or window unit that is not cooling', 'a unit blowing warm or weak air', 'a routine inspection or gas top-up before the heat sets in'] },
  'Plumbing':           { slug: 'plumbing',           label: 'plumbing',         reasons: ['a leaking tap or pipe', 'a blocked sink, drain or toilet', 'a new tap, pipe or fitting installed'] },
  'Barbing':            { slug: 'barbing',             label: 'barbing',          reasons: ['a fresh cut or fade at home or in a shop', 'grooming and beard trims', 'a cut booked for a specific time rather than a walk-in queue'] },
  'Cleaning':           { slug: 'cleaning',            label: 'cleaning',         reasons: ['a one-bedroom clean', 'a move-in or move-out clean', 'regular housekeeping on a schedule'] },
  'Deep cleaning':      { slug: 'deep-cleaning',       label: 'deep cleaning',    reasons: ['a full-property clean from top to bottom', 'a post-construction or post-renovation clean', 'a property that has not been deep-cleaned in a long time'] },
  'Hairdressing':       { slug: 'hairdressing',        label: 'hairdressing',     reasons: ['braids or weaves', 'natural hair care and styling', 'a stylist who comes to you instead of a salon visit'] },
  'Nail technician':    { slug: 'nail-technician',     label: 'nail care',        reasons: ['a manicure or pedicure', 'gel or acrylic sets', 'nail care booked around your schedule, not a salon queue'] },
  'Makeup':             { slug: 'makeup',              label: 'makeup',           reasons: ['bridal makeup', 'an event or party look', 'everyday makeup application'] },
  'Chef and cooking':   { slug: 'chef-and-cooking',    label: 'a private chef',   reasons: ['a private chef for a party or event', 'regular meal prep', 'catering for a specific occasion'] },
  'Electrical work':    { slug: 'electrical-work',     label: 'electrical work',  reasons: ['a socket or switch that has stopped working', 'wiring or fitting faults', 'new sockets, switches or light fittings installed'] },
  'Appliance repair':   { slug: 'appliance-repair',    label: 'appliance repair', reasons: ['a fridge or freezer that is not cooling', 'a washing machine that will not drain or spin', 'a TV or microwave that is not working'] },
  'Generator repair':   { slug: 'generator-repair',    label: 'generator repair', reasons: ['a generator that will not start', 'routine servicing before it is needed', 'faults on gen sets of any size'] },
  'Carpentry':          { slug: 'carpentry',           label: 'carpentry',       reasons: ['furniture repairs', 'doors, wardrobes, shelves or cabinets', 'new fittings built or fixed'] },
  'Painting':           { slug: 'painting',            label: 'painting',        reasons: ['interior walls', 'exterior touch-ups', 'a full repaint before moving in'] },
  'Welding':            { slug: 'welding',             label: 'welding',         reasons: ['gates and burglary-proofing', 'metal fabrication and repairs', 'iron or steel work around the property'] },
  'Fumigation':         { slug: 'fumigation',          label: 'fumigation',      reasons: ['a whole-property fumigation treatment', 'preparing a property before moving in', 'a scheduled treatment to keep pests from returning'] },
  'Pest control':       { slug: 'pest-control',        label: 'pest control',    reasons: ['roaches or ants', 'rodents', 'termites or bedbugs'] },
  'Tailoring':          { slug: 'tailoring',           label: 'tailoring',       reasons: ['adjustments and alterations', 'native wear made or altered', 'repairs to existing clothing'] },
  'Auto care':          { slug: 'auto-care',           label: 'auto care',       reasons: ['mechanic work and diagnostics', 'a car wash', 'tyre repairs or replacement'] },
};

for (const s of SERVICES) {
  if (!META[s.t]) throw new Error(`No slug/label mapping for service "${s.t}" — add it to META before generating, do not skip it.`);
}

/* ── 3. Related services, per service ───────────────────────────────
   The "Other services" rail used to show the same first six entries of
   the SERVICES array on every page, so plumbing and cleaning collected
   dozens of internal links while fumigation and painting had one each
   and sat unindexed. Each list below is six genuinely related trades:
   same room, same job, or the obvious next booking. Every service must
   appear in at least four other services' lists — checked at generate
   time so the balance cannot silently drift. */
const RELATED = {
  'AC repair':          ['Electrical work', 'Appliance repair', 'Generator repair', 'Plumbing', 'Cleaning', 'Pest control'],
  'Plumbing':           ['Electrical work', 'AC repair', 'Carpentry', 'Painting', 'Deep cleaning', 'Welding'],
  'Barbing':            ['Hairdressing', 'Makeup', 'Nail technician', 'Tailoring', 'Chef and cooking', 'Cleaning'],
  'Cleaning':           ['Deep cleaning', 'Fumigation', 'Pest control', 'Painting', 'Chef and cooking', 'Hairdressing'],
  'Deep cleaning':      ['Cleaning', 'Fumigation', 'Pest control', 'Painting', 'Plumbing', 'Carpentry'],
  'Hairdressing':       ['Barbing', 'Makeup', 'Nail technician', 'Tailoring', 'Chef and cooking', 'Cleaning'],
  'Nail technician':    ['Hairdressing', 'Makeup', 'Barbing', 'Tailoring', 'Chef and cooking', 'Cleaning'],
  'Makeup':             ['Hairdressing', 'Nail technician', 'Tailoring', 'Barbing', 'Chef and cooking', 'Cleaning'],
  'Chef and cooking':   ['Cleaning', 'Deep cleaning', 'Makeup', 'Hairdressing', 'Tailoring', 'Nail technician'],
  'Electrical work':    ['Generator repair', 'AC repair', 'Appliance repair', 'Plumbing', 'Carpentry', 'Auto care'],
  'Appliance repair':   ['Electrical work', 'AC repair', 'Generator repair', 'Plumbing', 'Carpentry', 'Auto care'],
  'Generator repair':   ['Electrical work', 'Appliance repair', 'AC repair', 'Auto care', 'Welding', 'Plumbing'],
  'Carpentry':          ['Painting', 'Welding', 'Plumbing', 'Electrical work', 'Deep cleaning', 'Cleaning'],
  'Painting':           ['Carpentry', 'Deep cleaning', 'Cleaning', 'Welding', 'Plumbing', 'Fumigation'],
  'Welding':            ['Carpentry', 'Painting', 'Auto care', 'Generator repair', 'Electrical work', 'Plumbing'],
  'Fumigation':         ['Pest control', 'Deep cleaning', 'Cleaning', 'Painting', 'AC repair', 'Plumbing'],
  'Pest control':       ['Fumigation', 'Deep cleaning', 'Cleaning', 'Carpentry', 'Plumbing', 'Painting'],
  'Tailoring':          ['Makeup', 'Hairdressing', 'Barbing', 'Nail technician', 'Chef and cooking', 'Cleaning'],
  'Auto care':          ['Generator repair', 'Welding', 'Electrical work', 'Appliance repair', 'AC repair', 'Cleaning'],
};

{
  const inbound = {};
  for (const s of SERVICES) {
    const list = RELATED[s.t];
    if (!list || list.length !== 6) throw new Error(`RELATED["${s.t}"] must list exactly six services.`);
    for (const t of list) {
      if (!META[t]) throw new Error(`RELATED["${s.t}"] names unknown service "${t}".`);
      if (t === s.t) throw new Error(`RELATED["${s.t}"] links to itself.`);
      inbound[t] = (inbound[t] || 0) + 1;
    }
  }
  for (const s of SERVICES) {
    if ((inbound[s.t] || 0) < 4) throw new Error(`"${s.t}" is linked from only ${inbound[s.t] || 0} related lists — needs at least 4.`);
  }
}

// Display-only: capitalises "from ₦X" to "From ₦X" when it opens a sentence
// or stands alone as a label — matching the homepage's own card chips
// ("From ₦5,000"). Never applied to the JSON-LD offer value.
function capPrice(p) {
  return p.charAt(0).toUpperCase() + p.slice(1);
}

/* ── 4. The five FAQs used on every service page, reworded per
   service. Every answer is a direct rewording of copy already
   published on help.html or the homepage — not a new claim. ──────── */
function faqsFor(label) {
  return [
    {
      q: `How much does ${label} cost on Tuse?`,
      a: `Prices vary by category, so the exact cost is confirmed in the app before you book. The final price can depend on the scope of the job, materials or parts needed, and how complex the work is. If the job turns out to be bigger once the artisan is there, they raise a revised price in the app with a reason, and you approve or decline it before any extra work begins.`,
    },
    {
      q: `Are Tuse's ${label} professionals verified?`,
      a: `Yes. Before an artisan can be booked, they clear identity verification (government ID confirmed, face matched to the ID), a trade competence assessment for the categories they list, a home address on record, and a bank account tied to their own verified identity.`,
    },
    {
      q: `When do I pay?`,
      a: `You pay into the app when you book, but the money is held in escrow rather than sent to the artisan straight away. It is released once the job is marked complete, so you are not paying before the work is done.`,
    },
    {
      q: `Where does Tuse offer ${label}?`,
      a: `Coverage depends on which verified artisans are active near you. Abuja, Lagos and Port Harcourt currently have the deepest coverage. Open the Tuse app and enter your address to see who is available there right now.`,
    },
    {
      q: `How do I book?`,
      a: `Download the Tuse app, describe what you need — in your own words, iRanti works out the category — and you will be matched with a verified professional near you. You can track them to your door and pay in the app once the job is done.`,
    },
  ];
}

/* ── 5. Generate one service page ───────────────────────────────── */
function serviceHtml(service) {
  const meta = META[service.t];
  const canonical = `${ORIGIN}/services/${meta.slug}`;
  const title = `${service.t} — Verified Artisans | TUȘE`;
  const description = `Book verified, identity-checked ${meta.label} professionals through Tuse. Prices ${service.p}, paid securely in-app only once the job is done.`;
  const faqs = faqsFor(meta.label);

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: service.t,
      serviceType: service.t,
      description: `${service.d}.`,
      provider: { '@type': 'Organization', name: 'TUȘE', url: `${ORIGIN}/` },
      areaServed: [{ '@type': 'City', name: 'Abuja' }, { '@type': 'City', name: 'Lagos' }, { '@type': 'City', name: 'Port Harcourt' }],
      offers: { '@type': 'Offer', priceCurrency: 'NGN', price: service.p.replace(/[^\d]/g, ''), description: service.p },
      url: canonical,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: `${service.t} — Verified Artisans`,
      url: canonical,
      publisher: { '@type': 'Organization', name: 'TUȘE', url: `${ORIGIN}/` },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${ORIGIN}/` },
          { '@type': 'ListItem', position: 2, name: 'Services', item: `${ORIGIN}/services` },
          { '@type': 'ListItem', position: 3, name: service.t, item: canonical },
        ],
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    },
  ];

  const otherServices = RELATED[service.t].map((t) => SERVICES.find((s) => s.t === t));
  const relatedGuides = GUIDES.filter((g) => g.serviceTitle === service.t);

  const guidesRail = relatedGuides.length
    ? `
      <div class="rail__row">
        <h2>Common problems</h2>
        <p style="margin-top:.625rem">
${relatedGuides.map((g) => `          <a class="rail__link" href="/guides/${g.slug}" style="margin-top:.5rem;display:block">${esc(g.shortTitle)}</a>`).join('\n')}
        </p>
        <p style="margin-top:.75rem"><a class="rail__link" href="/guides">All problem guides</a></p>
      </div>`
    : '';

  return head({ title, description, canonical, jsonLd }) + `
<section class="phead">
  <div class="wrap">
    <p class="crumb"><a href="/">Home</a> &nbsp;/&nbsp; <a href="/services">Services</a> &nbsp;/&nbsp; ${esc(service.t)}</p>
    <h1 class="h-lg">Verified ${esc(meta.label)}, booked through Tuse.</h1>
    <p class="lede">${esc(service.d)}. ${esc(capPrice(service.p))}, held in the app and released only once the job is done.</p>
  </div>
</section>

<section class="pbody">
  <div class="wrap pgrid">
    <div class="prose">
      <h2>What this covers</h2>
      <p>Tuse's ${esc(meta.label)} category covers ${service.d.charAt(0).toLowerCase() + service.d.slice(1)}. People typically book it for:</p>
      <ul>
${meta.reasons.map((r) => `        <li>${esc(r)}</li>`).join('\n')}
      </ul>

      <h2>Pricing</h2>
      <p><strong>${esc(service.t)} on Tuse starts ${esc(service.p)}.</strong> That is a starting price, not a guaranteed final one — the actual cost depends on the scope of the job, any materials or parts required, and how complex the work turns out to be once the artisan looks at it. You see the price before you confirm the booking, and if it needs to change, the artisan raises a revised price in the app that you approve or decline before any extra work begins.</p>

      <h2>Not sure exactly what you need?</h2>
      <p>Describe it in your own words in the Tuse app — whether something has broken or you just want to book ${esc(meta.label)} for a specific day. iRanti reads what you type, works out what the job most likely involves and the likely price band, and routes you to the right verified professional.</p>
${relatedGuides.length ? `
      <h2>Common problems we help with</h2>
      <ul>
${relatedGuides.map((g) => `        <li><a href="/guides/${g.slug}">${esc(g.shortTitle)}</a></li>`).join('\n')}
      </ul>` : ''}

      <h2>Why book ${esc(meta.label)} through Tuse</h2>
      <div class="feats">
        <div class="feat">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M12 2.5 4 6v6c0 4.6 3.2 8.4 8 9.5 4.8-1.1 8-4.9 8-9.5V6l-8-3.5Z"/><path d="m9 12 2 2 4-4"/></svg>
          <h3>Identity verified</h3>
          <p>Every professional clears ID confirmation, a face match, and a trade competence check before they can accept a booking.</p>
        </div>
        <div class="feat">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M6.5 20V4l11 16V4"/><path d="M3.75 9.5h16.5M3.75 14.5h16.5"/></svg>
          <h3>Transparent pricing</h3>
          <p>You see the price before you book. No haggling at the door, no surprise additions.</p>
        </div>
        <div class="feat">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><rect x="3.5" y="6" width="17" height="13" rx="2.5"/><path d="m8.5 12.5 2.5 2.5 4.5-5"/></svg>
          <h3>Secure payments</h3>
          <p>Payment is held in the app and only released to the artisan once the job is marked complete.</p>
        </div>
        <div class="feat">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M12 21s7-5.7 7-11a7 7 0 1 0-14 0c0 5.3 7 11 7 11Z"/><circle cx="12" cy="10" r="2.6"/></svg>
          <h3>Live tracking</h3>
          <p>Follow your booking to your door once a professional has been matched.</p>
        </div>
      </div>

      <h2>FAQs</h2>
      <div class="faq">
${faqs.map((f, i) => `        <details${i === 0 ? ' open' : ''}>
          <summary>${esc(f.q)}</summary>
          <div class="faq__a">
            <p>${esc(f.a)}</p>
          </div>
        </details>`).join('\n')}
      </div>
    </div>

    <aside class="rail">
      <div class="rail__row">
        <h2>${esc(service.t)}</h2>
        <p>${esc(capPrice(service.p))}</p>
      </div>${guidesRail}
      <div class="rail__row">
        <h2>Related services</h2>
        <p style="margin-top:.625rem">
${otherServices.map((s) => `          <a class="rail__link" href="/services/${META[s.t].slug}" style="margin-top:.5rem;display:block">${esc(s.t)}</a>`).join('\n')}
        </p>
        <p style="margin-top:.75rem"><a class="rail__link" href="/services">See all 19 services</a></p>
      </div>
    </aside>
  </div>
</section>

${ctaStrip()}
${footer()}`;
}

/* ── 6. Generate the /services/ hub ─────────────────────────────── */
function hubHtml() {
  const canonical = `${ORIGIN}/services`;
  const title = 'All Services — 19 Verified Trades | TUȘE';
  const description = 'Every service Tuse covers, with real starting prices: plumbing, electrical work, AC repair, cleaning, barbing, makeup and 14 more. Verified artisans, booked in the app.';

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Tuse services',
      url: canonical,
      publisher: { '@type': 'Organization', name: 'TUȘE', url: `${ORIGIN}/` },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${ORIGIN}/` },
          { '@type': 'ListItem', position: 2, name: 'Services', item: canonical },
        ],
      },
      hasPart: SERVICES.map((s) => ({
        '@type': 'Service',
        name: s.t,
        url: `${ORIGIN}/services/${META[s.t].slug}`,
        offers: { '@type': 'Offer', priceCurrency: 'NGN', description: s.p },
      })),
    },
  ];

  const cards = SERVICES.map((s) => `      <a class="ccard" href="/services/${META[s.t].slug}">
        <h3>${esc(s.t)}</h3>
        <p>${esc(s.d)}</p>
        <span style="display:block;margin-top:.5rem;font-weight:600;color:var(--text-heading)">${esc(capPrice(s.p))}</span>
      </a>`).join('\n');

  return head({ title, description, canonical, jsonLd }) + `
<section class="phead">
  <div class="wrap">
    <p class="crumb"><a href="/">Home</a> &nbsp;/&nbsp; Services</p>
    <h1 class="h-lg">Everything you can book on Tuse.</h1>
    <p class="lede">19 verified trades, each with a real starting price. If it can be fixed, cleaned, styled or served, there is a verified professional for it — describe what you need in the app, or browse by category below.</p>
  </div>
</section>

<section class="pbody">
  <div class="wrap">
    <div class="ccards" style="grid-template-columns:repeat(auto-fill,minmax(240px,1fr))">
${cards}
    </div>

    <div class="prose" style="margin-top:3rem">
      <h2>How pricing works</h2>
      <p>Every price shown above is a starting price for that category — what the job actually costs depends on scope, materials and complexity, and you see the confirmed price in the app before you book. Nothing is charged until you approve it, and any change to the price during the job needs your approval before extra work begins.</p>

      <h2>Not sure which category you need?</h2>
      <p>You don't have to know the right trade name. Describe the problem in your own words in the Tuse app — whether something has broken or you just want to book a service for a specific day — and iRanti works out what it involves and routes you to the right verified professional. Or browse <a href="/guides">problem guides</a> for common issues first.</p>
    </div>
  </div>
</section>

${ctaStrip()}
${footer()}`;
}

/* ── 7. Write everything ────────────────────────────────────────── */
const servicesDir = path.join(ROOT, 'services');
fs.mkdirSync(servicesDir, { recursive: true });

fs.writeFileSync(path.join(ROOT, 'services.html'), hubHtml(), 'utf8');
console.log('wrote services.html (hub)');

for (const s of SERVICES) {
  const meta = META[s.t];
  const file = path.join(servicesDir, `${meta.slug}.html`);
  fs.writeFileSync(file, serviceHtml(s), 'utf8');
  console.log(`wrote services/${meta.slug}.html`);
}

console.log(`\nDone: 1 hub + ${SERVICES.length} service pages.`);
