#!/usr/bin/env node
/* Generate /guides hub + problem pages from guides-data.js + live SERVICES prices. */
'use strict';

const fs = require('fs');
const path = require('path');
const { ORIGIN, esc, head, ctaStrip, footer } = require('./page-shell');
const GUIDES = require('./guides-data');

const ROOT = path.resolve(__dirname, '..');

const indexHtml = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const servicesMatch = indexHtml.match(/var SERVICES = \[([\s\S]*?)\];/);
if (!servicesMatch) throw new Error('Could not find SERVICES array in index.html');
// eslint-disable-next-line no-eval
const SERVICES = eval('[' + servicesMatch[1] + ']');

const SERVICE_SLUG = {
  'AC repair': 'ac-repair',
  'Plumbing': 'plumbing',
  'Barbing': 'barbing',
  'Cleaning': 'cleaning',
  'Deep cleaning': 'deep-cleaning',
  'Hairdressing': 'hairdressing',
  'Nail technician': 'nail-technician',
  'Makeup': 'makeup',
  'Chef and cooking': 'chef-and-cooking',
  'Electrical work': 'electrical-work',
  'Appliance repair': 'appliance-repair',
  'Generator repair': 'generator-repair',
  'Carpentry': 'carpentry',
  'Painting': 'painting',
  'Welding': 'welding',
  'Fumigation': 'fumigation',
  'Pest control': 'pest-control',
  'Tailoring': 'tailoring',
  'Auto care': 'auto-care',
};

function byTitle(t) {
  const s = SERVICES.find((x) => x.t === t);
  if (!s) throw new Error(`No SERVICES entry for "${t}"`);
  if (!SERVICE_SLUG[t]) throw new Error(`No slug for "${t}"`);
  return s;
}

function capPrice(p) {
  return p.charAt(0).toUpperCase() + p.slice(1);
}

function guideBySlug(slug) {
  return GUIDES.find((g) => g.slug === slug);
}

function seekHref(q) {
  return `/?q=${encodeURIComponent(q)}#seek`;
}

function guideHtml(g) {
  const service = byTitle(g.serviceTitle);
  const serviceSlug = SERVICE_SLUG[g.serviceTitle];
  const canonical = `${ORIGIN}/guides/${g.slug}`;
  const related = g.relatedSlugs.map(guideBySlug).filter(Boolean);

  // Three guides from other trades for the rail. Picked with a stride
  // from this guide's own position, so the 75 cross-links spread across
  // all 25 guides instead of piling onto whichever come first in the array.
  const others = GUIDES.filter((x) => x.serviceTitle !== g.serviceTitle);
  const offset = GUIDES.indexOf(g) * 3;
  const moreGuides = [0, 1, 2].map((i) => others[(offset + i) % others.length]);

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: g.h1,
      url: canonical,
      description: g.description,
      publisher: { '@type': 'Organization', name: 'TUȘE', url: `${ORIGIN}/` },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${ORIGIN}/` },
          { '@type': 'ListItem', position: 2, name: 'Guides', item: `${ORIGIN}/guides` },
          { '@type': 'ListItem', position: 3, name: g.shortTitle, item: canonical },
        ],
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: g.faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: `Safe checks for ${g.shortTitle}`,
      description: 'Low-risk checks only. Stop and book a professional if warning signs appear.',
      step: g.checks.map((c, i) => ({
        '@type': 'HowToStep',
        position: i + 1,
        text: c,
      })),
    },
  ];

  const bodyAttrs = `data-guide="${esc(g.slug)}" data-guide-service="${esc(serviceSlug)}"`;

  return head({ title: g.title, description: g.description, canonical, jsonLd, bodyAttrs }) + `
<section class="phead">
  <div class="wrap">
    <p class="crumb"><a href="/">Home</a> &nbsp;/&nbsp; <a href="/guides">Guides</a> &nbsp;/&nbsp; ${esc(g.shortTitle)}</p>
    <h1 class="h-lg">${esc(g.h1)}</h1>
    <p class="lede">${esc(service.t)} on Tuse starts ${esc(service.p)}. Describe the problem in the app — iRanti helps with a preliminary category and price band before anyone arrives.</p>
  </div>
</section>

<section class="pbody">
  <div class="wrap pgrid">
    <div class="prose">
      <h2>The short answer</h2>
      <p>${esc(g.answer)}</p>

      <h2>Common causes</h2>
      <ul>
${g.causes.map((c) => `        <li>${esc(c)}</li>`).join('\n')}
      </ul>

      <h2>What you can safely check</h2>
      <p class="prose__note">These are low-risk checks only. Do not open live electrical panels, handle refrigerant, or dismantle fuel systems. If anything feels unsafe, stop and book a verified professional.</p>
      <ol>
${g.checks.map((c) => `        <li>${esc(c)}</li>`).join('\n')}
      </ol>

      <h2>When to call a professional</h2>
      <ul>
${g.stopSigns.map((c) => `        <li>${esc(c)}</li>`).join('\n')}
      </ul>

      <h2>How Tușe and iRanti help</h2>
      <p>Open the Tuse app and describe what is happening in your own words — for example, “${esc(g.seekQuery)}”. iRanti reads the description, suggests the likely service category and a price band, and routes you toward a verified ${esc(g.serviceTitle.toLowerCase())} professional. It is a preliminary assessment, not a definitive remote diagnosis: the artisan still inspects on site before any repair.</p>
      <p><a class="btn" data-evt="iranti_cta" href="${seekHref(g.seekQuery)}">Try describing it on Tușe</a></p>

      <h2>Starting price for ${esc(g.serviceTitle)}</h2>
      <p><strong>${esc(g.serviceTitle)} on Tuse starts ${esc(service.p)}.</strong> That is starting guidance, not a guaranteed final quote. Scope, parts, and complexity can change the total — you see the price in the app before you confirm, and any on-site change needs your approval first.</p>
      <p><a data-evt="service_page" href="/services/${esc(serviceSlug)}">See the ${esc(g.serviceTitle)} service page</a></p>

      <h2>FAQs</h2>
      <div class="faq">
${g.faqs.map((f, i) => `        <details${i === 0 ? ' open' : ''}>
          <summary>${esc(f.q)}</summary>
          <div class="faq__a"><p>${esc(f.a)}</p></div>
        </details>`).join('\n')}
      </div>

${related.length ? `      <h2>Related problems</h2>
      <ul>
${related.map((r) => `        <li><a href="/guides/${esc(r.slug)}">${esc(r.shortTitle)}</a></li>`).join('\n')}
      </ul>` : ''}
    </div>

    <aside class="rail">
      <div class="rail__row">
        <h2>Book help</h2>
        <p style="margin-top:.625rem">${esc(capPrice(service.p))} starting price for ${esc(g.serviceTitle)}.</p>
        <p style="margin-top:.75rem"><a class="btn" data-evt="guide_cta" href="/#get">Get the app</a></p>
        <p style="margin-top:.75rem"><a class="rail__link" data-evt="iranti_cta" href="${seekHref(g.seekQuery)}">Describe this problem</a></p>
        <p style="margin-top:.5rem"><a class="rail__link" data-evt="service_page" href="/services/${esc(serviceSlug)}">${esc(g.serviceTitle)} on Tuse</a></p>
      </div>
      <div class="rail__row">
        <h2>More guides</h2>
        <p style="margin-top:.625rem">
${moreGuides.map((m) => `          <a class="rail__link" href="/guides/${esc(m.slug)}" style="margin-top:.5rem;display:block">${esc(m.shortTitle)}</a>`).join('\n')}
        </p>
        <p style="margin-top:.75rem"><a class="rail__link" href="/guides">All problem guides</a></p>
      </div>
    </aside>
  </div>
</section>

${ctaStrip()}
${footer()}`;
}

function hubHtml() {
  const canonical = `${ORIGIN}/guides`;
  const title = 'Problem Guides — Fix Home Issues with Tușe | TUȘE';
  const description = 'Practical guides for common home problems: AC not cooling, leaking pipes, generators that will not start, and more — linked to verified Tușe services and iRanti.';

  const byService = new Map();
  for (const g of GUIDES) {
    if (!byService.has(g.serviceTitle)) byService.set(g.serviceTitle, []);
    byService.get(g.serviceTitle).push(g);
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Tușe problem guides',
    url: canonical,
    description,
    publisher: { '@type': 'Organization', name: 'TUȘE', url: `${ORIGIN}/` },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${ORIGIN}/` },
        { '@type': 'ListItem', position: 2, name: 'Guides', item: canonical },
      ],
    },
    hasPart: GUIDES.map((g) => ({
      '@type': 'WebPage',
      name: g.shortTitle,
      url: `${ORIGIN}/guides/${g.slug}`,
    })),
  };

  const sections = [...byService.entries()].map(([serviceTitle, list]) => {
    const service = byTitle(serviceTitle);
    const serviceSlug = SERVICE_SLUG[serviceTitle];
    const cards = list.map((g) => `      <a class="ccard" href="/guides/${esc(g.slug)}">
        <h3>${esc(g.shortTitle)}</h3>
        <p>${esc(g.answer.slice(0, 140))}${g.answer.length > 140 ? '…' : ''}</p>
      </a>`).join('\n');
    return `    <h2 class="h-md" style="margin:2.5rem 0 1rem">${esc(serviceTitle)}</h2>
    <p class="lede" style="margin:0 0 1rem">Starting ${esc(service.p)}. <a data-evt="service_page" href="/services/${esc(serviceSlug)}">Service page</a></p>
    <div class="ccards" style="grid-template-columns:repeat(auto-fill,minmax(240px,1fr))">
${cards}
    </div>`;
  }).join('\n');

  return head({ title, description, canonical, jsonLd: [jsonLd] }) + `
<section class="phead">
  <div class="wrap">
    <p class="crumb"><a href="/">Home</a> &nbsp;/&nbsp; Guides</p>
    <h1 class="h-lg">Something broken? Start with the problem.</h1>
    <p class="lede">Short, practical guides for the issues people actually search for — then describe it in Tușe so iRanti can suggest the likely service and price band.</p>
  </div>
</section>

<section class="pbody">
  <div class="wrap">
    <div class="prose" style="margin-bottom:2rem">
      <p>These guides are a problem-solving layer on top of Tușe's verified services. They explain likely causes, safe checks, and when to stop DIY. They are not a substitute for on-site diagnosis.</p>
    </div>
${sections}
  </div>
</section>

${ctaStrip()}
${footer()}`;
}

/* Validate related slugs */
for (const g of GUIDES) {
  for (const r of g.relatedSlugs) {
    if (!guideBySlug(r)) throw new Error(`Guide ${g.slug} relatedSlug missing: ${r}`);
  }
  byTitle(g.serviceTitle);
}
if (GUIDES.length !== 25) throw new Error(`Expected 25 guides, found ${GUIDES.length}`);

const guidesDir = path.join(ROOT, 'guides');
fs.mkdirSync(guidesDir, { recursive: true });
fs.writeFileSync(path.join(ROOT, 'guides.html'), hubHtml(), 'utf8');
console.log('wrote guides.html');
for (const g of GUIDES) {
  fs.writeFileSync(path.join(guidesDir, `${g.slug}.html`), guideHtml(g), 'utf8');
  console.log(`wrote guides/${g.slug}.html`);
}
console.log(`\nDone: 1 hub + ${GUIDES.length} guides.`);
