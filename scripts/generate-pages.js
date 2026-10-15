#!/usr/bin/env node
/* ═══════════════════════════════════════════════════════════════════
   TUȘE — standalone pages built on the shared shell: /about and /404

   /about exists because "tuse meaning" was getting search impressions
   with nothing on the site that answered it. Every claim on it is
   already published elsewhere on the site:
     - the five-language tagline        -> homepage <h1>
     - the four fixes                   -> homepage #about
     - coverage cities                  -> help.html
     - free to download, pay per job    -> homepage #get
     - company name, RC, address        -> footer
   The one new statement is the etymology and pronunciation of the
   name itself, which the company owns.

   Usage:  node scripts/generate-pages.js
   ═══════════════════════════════════════════════════════════════════ */
'use strict';

const fs = require('fs');
const path = require('path');
const { ORIGIN, esc, head, ctaStrip, footer } = require('./page-shell');

const ROOT = path.resolve(__dirname, '..');

const ORG = {
  '@type': 'Organization',
  '@id': `${ORIGIN}/#org`,
  name: 'TUȘE',
  alternateName: ['Tuse', 'Tușe', 'TUSE', 'Tuse app'],
  legalName: 'TUȘE LTD',
  url: `${ORIGIN}/`,
  logo: `${ORIGIN}/assets/logo.png`,
  email: 'info@tuse.ng',
  telephone: '+2347074032138',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Diamond Close, Brains & Hammers City, Life Camp',
    addressLocality: 'Abuja',
    addressRegion: 'FCT',
    addressCountry: 'NG',
  },
  sameAs: [
    'https://x.com/tuse__ng',
    'https://instagram.com/tuse__ng',
    'https://apps.apple.com/ng/app/tu%C8%99e-request-an-artisan/id6753882515',
    'https://apps.apple.com/ng/app/tu%C8%99e-artisan-work-and-earn/id6753882570',
    'https://play.google.com/store/apps/details?id=client.tuse.ltd',
    'https://play.google.com/store/apps/details?id=artisan.tuse.ltd',
  ],
};

const ABOUT_FAQS = [
  {
    q: 'What does Tușe mean?',
    a: 'Tușe comes from the Yorùbá túṣe, to fix or mend. Our line "A máa túṣe" means "We will fix it", and we say the same thing in Igbo (Anyị ga edozi ya), Hausa (Za mu gyara shi) and Pidgin (We go fix am).',
  },
  {
    q: 'How do you pronounce Tușe?',
    a: 'Say it "TOO-sheh". The Ș in the wordmark is a "sh" sound, the same as the Yorùbá ṣ.',
  },
  {
    q: 'Is Tuse the same as Tușe?',
    a: 'Yes. Tuse is simply Tușe written without the accent, which is how most people type it. TUȘE, Tușe and Tuse are all the same company and the same app.',
  },
  {
    q: 'Where is Tușe based?',
    a: 'TUȘE LTD is based in Life Camp, Abuja. Coverage depends on which verified artisans are active near your address. Abuja, Lagos and Port Harcourt currently have the deepest coverage.',
  },
  {
    q: 'Is the Tuse app free?',
    a: 'Yes. The app is free to download on iOS and Android. You only pay for the job, at the price you agreed before booking, and the payment is held in the app until the work is done.',
  },
];

function aboutHtml() {
  const canonical = `${ORIGIN}/about`;
  const title = 'About Tușe (Tuse): What the Name Means | TUȘE';
  const description = 'Tușe, often typed Tuse, comes from the Yorùbá for "fix". What the name means, how to say it, and how Tuse connects people in Nigeria with verified artisans.';

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      name: 'About Tușe',
      url: canonical,
      description,
      mainEntity: ORG,
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${ORIGIN}/` },
          { '@type': 'ListItem', position: 2, name: 'About', item: canonical },
        ],
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: ABOUT_FAQS.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    },
  ];

  return head({ title, description, canonical, jsonLd }) + `
<section class="phead">
  <div class="wrap">
    <p class="crumb"><a href="/">Home</a> &nbsp;/&nbsp; About</p>
    <h1 class="h-lg">We will fix it. That is the name.</h1>
    <p class="lede">Tușe, often typed Tuse, is a Nigerian platform for booking verified, skilled artisans. The name is the promise.</p>
  </div>
</section>

<section class="pbody">
  <div class="wrap pgrid">
    <div class="prose">
      <h2 id="meaning">What does Tușe mean?</h2>
      <p>Tușe comes from the Yorùbá word <span lang="yo">túṣe</span>, to fix or mend. Our line <span lang="yo">A máa túṣe</span> means “We will fix it”, and we say it in every language our customers use:</p>
      <ul>
        <li><strong>Yorùbá:</strong> <span lang="yo">A máa túṣe.</span></li>
        <li><strong>Igbo:</strong> <span lang="ig">Anyị ga edozi ya.</span></li>
        <li><strong>Hausa:</strong> <span lang="ha">Za mu gyara shi.</span></li>
        <li><strong>Pidgin:</strong> <span lang="pcm">We go fix am.</span></li>
        <li><strong>English:</strong> We will fix it.</li>
      </ul>
      <p>The name is short on purpose. A leaking tap, a generator that will not start, braids at home on a Saturday, a deep clean before you move in: the answer is the same.</p>

      <h2 id="pronunciation">How do you say it?</h2>
      <p>Say it <strong>“TOO-sheh”</strong>. The Ș in the wordmark is a “sh” sound, the same as the Yorùbá ṣ. Most people type it without the accent, as <strong>Tuse</strong>, and that is fine. TUȘE, Tușe and Tuse are the same company and the same app.</p>

      <h2 id="what">What Tușe does</h2>
      <p>Tușe connects you with skilled artisans who have been checked before anyone can book them. That covers <a href="/services">19 services</a>, from <a href="/services/plumbing">plumbing</a>, <a href="/services/electrical-work">electrical work</a>, <a href="/services/ac-repair">AC repair</a> and <a href="/services/generator-repair">generator repair</a> to <a href="/services/cleaning">cleaning</a>, <a href="/services/barbing">barbing</a>, <a href="/services/hairdressing">hairdressing</a> and <a href="/services/makeup">makeup</a>.</p>
      <p>You describe the job in your own words in the app. iRanti, our assistant, works out what it likely involves and the expected price. A verified artisan near you is matched, you can track them to your door, and your payment is held in the app until the job is done.</p>

      <h2 id="why">Why we built it</h2>
      <p>Good hands shouldn't depend on who you know. Finding a reliable artisan in Nigeria has usually meant referral chains, unanswered calls, no-shows and cash disputes. We rebuilt the experience around four fixes:</p>
      <ul>
        <li><strong>Vetted before they're listed.</strong> Identity confirmed, skills assessed, address on file. If they're on Tușe, someone checked.</li>
        <li><strong>Matched by distance, not luck.</strong> The app finds who is genuinely closest to you and shows their arrival in real time.</li>
        <li><strong>Priced up front, paid in-app.</strong> You see the cost before you book, and payment is held until the job is done.</li>
        <li><strong>Rated after every single job.</strong> Reviews come only from customers who actually paid, so poor work follows an artisan.</li>
      </ul>

      <h2 id="who">Who it is for</h2>
      <ul>
        <li><strong>Anyone who needs something fixed, cleaned, styled or cooked.</strong> Browse <a href="/services">all services</a> or start with a <a href="/guides">problem guide</a>.</li>
        <li><strong>Artisans who want steady work and on-time pay.</strong> The Tuse Artisan app is how you join. See <a href="/about-the-app">the two apps</a>.</li>
        <li><strong>Businesses and property managers.</strong> One account for every property. <a href="/business-enquiry">Talk to us</a>.</li>
      </ul>

      <h2 id="company">Company details</h2>
      <p>TUȘE LTD, RC 8198640.<br>Diamond Close, Brains &amp; Hammers City, Life Camp, FCT Abuja, Nigeria.<br><a href="mailto:info@tuse.ng">info@tuse.ng</a> · <a href="tel:+2347074032138">+234 707 403 2138</a><br>Instagram and X: <a href="https://instagram.com/tuse__ng">@tuse__ng</a></p>

      <h2>FAQs</h2>
      <div class="faq">
${ABOUT_FAQS.map((f, i) => `        <details${i === 0 ? ' open' : ''}>
          <summary>${esc(f.q)}</summary>
          <div class="faq__a"><p>${esc(f.a)}</p></div>
        </details>`).join('\n')}
      </div>
    </div>

    <aside class="rail">
      <div class="rail__row">
        <h2>On this page</h2>
        <p style="margin-top:.625rem">
          <a class="rail__link" href="#meaning" style="margin-top:.5rem;display:block">What the name means</a>
          <a class="rail__link" href="#pronunciation" style="margin-top:.5rem;display:block">How to say it</a>
          <a class="rail__link" href="#what" style="margin-top:.5rem;display:block">What Tușe does</a>
          <a class="rail__link" href="#why" style="margin-top:.5rem;display:block">Why we built it</a>
          <a class="rail__link" href="#company" style="margin-top:.5rem;display:block">Company details</a>
        </p>
      </div>
      <div class="rail__row">
        <h2>Get started</h2>
        <p style="margin-top:.625rem">Free to download. You only pay for the job, at the price you agreed.</p>
        <p style="margin-top:.75rem"><a class="btn" href="/#get">Get the app</a></p>
      </div>
    </aside>
  </div>
</section>

${ctaStrip()}
${footer()}`;
}

function notFoundHtml() {
  // No canonical tag on purpose: the sitemap generator skips pages without one,
  // and noindex keeps it out of search even if a crawler finds it.
  const html = head({
    title: 'Page not found | TUȘE',
    description: 'This page does not exist. Find a verified artisan, browse services, or start with a problem guide.',
    canonical: `${ORIGIN}/404`,
    jsonLd: [],
  }).replace(/<link rel="canonical"[^>]*>\n/, '<meta name="robots" content="noindex">\n');

  return html + `
<section class="phead">
  <div class="wrap">
    <p class="crumb"><a href="/">Home</a> &nbsp;/&nbsp; Not found</p>
    <h1 class="h-lg">This page has gone missing.</h1>
    <p class="lede">The link may be old, or the page may have moved. Whatever you came for, there is a quicker way to it.</p>
  </div>
</section>

<section class="pbody">
  <div class="wrap">
    <div class="ccards" style="grid-template-columns:repeat(auto-fill,minmax(240px,1fr))">
      <a class="ccard" href="/services"><h3>Browse all 19 services</h3><p>Plumbing, electrical, AC, cleaning, barbing, makeup and more, each with a real starting price.</p></a>
      <a class="ccard" href="/guides"><h3>Fix a problem</h3><p>Short guides for the issues people actually search for, from a leaking tap to a generator that will not start.</p></a>
      <a class="ccard" href="/help"><h3>Read the FAQ</h3><p>Booking, payments and escrow, cancellations, verification and safety.</p></a>
      <a class="ccard" href="/"><h3>Go to the homepage</h3><p>Describe what you need and see how Tușe works.</p></a>
    </div>
  </div>
</section>

${ctaStrip()}
${footer()}`;
}

fs.writeFileSync(path.join(ROOT, 'about.html'), aboutHtml(), 'utf8');
console.log('wrote about.html');
fs.writeFileSync(path.join(ROOT, '404.html'), notFoundHtml(), 'utf8');
console.log('wrote 404.html');
