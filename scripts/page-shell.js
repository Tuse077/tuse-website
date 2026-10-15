/* Shared HTML shell for generated Tușe pages (services + guides).
   Keep markup identical to the live site chrome — do not invent components. */
'use strict';

const ORIGIN = 'https://tuse.ng';

const NAV_LINKS = [
  ['/#about', 'About us'], ['/#services', 'Services'], ['/#how', 'How it works'],
  ['/#trust', 'Verification'], ['/#artisans', 'For artisans'], ['/#business', 'Business'],
  ['/contact', 'Contact us'],
];

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function head({ title, description, canonical, jsonLd, bodyAttrs }) {
  const bodyOpen = bodyAttrs ? `<body ${bodyAttrs}>` : '<body>';
  return `<!DOCTYPE html>
<html lang="en" data-theme="light">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="theme-color" content="#2B0103">
<meta name="color-scheme" content="light">
<title>${title}</title>
<meta name="description" content="${description}">
<link rel="canonical" href="${canonical}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="TUȘE">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${description}">
<meta property="og:url" content="${canonical}">
<meta property="og:locale" content="en_NG">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:site" content="@tuse__ng">
<meta property="og:image" content="https://tuse.ng/assets/og-tuse.png">
<meta name="twitter:image" content="https://tuse.ng/assets/og-tuse.png">
<link rel="icon" href="/assets/favicon-32.png" sizes="32x32" type="image/png">
<link rel="icon" href="/assets/favicon-512.png" sizes="512x512" type="image/png">
<link rel="apple-touch-icon" href="/assets/favicon-180.png">
<link rel="stylesheet" href="/assets/tokens.css">
<script src="/assets/analytics-config.js"></script>
<script src="/assets/analytics.js" defer></script>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,400..700&family=Newsreader:ital,opsz,wght@0,6..72,400..700;1,6..72,400..500&display=swap" onload="this.onload=null;this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,400..700&family=Newsreader:ital,opsz,wght@0,6..72,400..700;1,6..72,400..500&display=swap"></noscript>
<link rel="stylesheet" href="/assets/site.css">
${jsonLd.map((obj) => `<script type="application/ld+json">\n${JSON.stringify(obj)}\n</script>`).join('\n')}
</head>
${bodyOpen}
<a class="skip" href="#main">Skip to content</a>

<header class="nav">
  <div class="wrap nav__in">
    <a href="/" class="logo" aria-label="TUȘE home"><img src="/assets/logo.png" alt="TUȘE" width="420" height="226"></a>
    <nav class="nav__links" aria-label="Primary">
${NAV_LINKS.map(([href, label]) => `      <a href="${href}">${label}</a>`).join('\n')}
    </nav>
    <a href="/#get" class="btn nav__cta">Get the app</a>
    <button class="burger" id="burger" aria-label="Open menu" aria-expanded="false" aria-controls="mnav">
      <i aria-hidden="true"></i><i aria-hidden="true"></i>
    </button>
  </div>
</header>

<div class="mnav" id="mnav" role="dialog" aria-modal="true" aria-label="Menu">
  <ul class="mnav__list">
    <li><a href="/#about">About us <span class="mnav__idx">01</span></a></li>
    <li><a href="/#services">Services <span class="mnav__idx">02</span></a></li>
    <li><a href="/#how">How it works <span class="mnav__idx">03</span></a></li>
    <li><a href="/#trust">Verification <span class="mnav__idx">04</span></a></li>
    <li><a href="/#artisans">For artisans <span class="mnav__idx">05</span></a></li>
    <li><a href="/#business">Business <span class="mnav__idx">06</span></a></li>
    <li><a href="/help">Help centre <span class="mnav__idx">07</span></a></li>
  </ul>
  <div class="mnav__foot">
    <a href="/#get" class="btn">Get the app</a>
    <p class="mnav__meta"><a href="mailto:info@tuse.ng">info@tuse.ng</a> and <a href="tel:+2347074032138">+234 707 403 2138</a><br>Life Camp, FCT Abuja, Nigeria</p>
  </div>
</div>

<main id="main">
`;
}

function ctaStrip() {
  return `<section class="cta-strip">
  <div class="wrap">
    <h2 class="h-md">Book a verified artisan</h2>
    <p>Identity-checked, location-matched, paid securely in-app.</p>
    <div class="actions">
      <a href="https://apps.apple.com/ng/app/tu%C8%99e-request-an-artisan/id6753882515" class="store">
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.05 12.54c-.02-2.3 1.88-3.4 1.96-3.46-1.07-1.56-2.73-1.78-3.32-1.8-1.41-.14-2.76.83-3.48.83-.72 0-1.83-.81-3.01-.79-1.55.02-2.98.9-3.78 2.28-1.61 2.8-.41 6.93 1.16 9.2.77 1.11 1.68 2.35 2.88 2.31 1.16-.05 1.6-.75 3-.75s1.79.75 3.01.72c1.24-.02 2.03-1.13 2.79-2.24.88-1.29 1.24-2.54 1.26-2.6-.03-.01-2.42-.93-2.44-3.7zM14.79 5.4c.64-.78 1.07-1.86.95-2.94-.92.04-2.03.61-2.69 1.38-.59.69-1.11 1.79-.97 2.85 1.03.08 2.07-.52 2.71-1.29z"/></svg>
        <span class="store__txt"><span class="store__top">Download on the</span><span class="store__bot">App Store</span></span>
      </a>
      <a href="https://play.google.com/store/apps/details?id=client.tuse.ltd" class="store">
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M3.6 2.3c-.24.25-.38.64-.38 1.15v17.1c0 .51.14.9.38 1.15l.06.05 9.58-9.58v-.23L3.66 2.35l-.06-.05zm12.85 12.85l-3.19-3.2v-.23l3.2-3.2.07.05 3.79 2.15c1.08.61 1.08 1.62 0 2.24l-3.79 2.15-.08.04zM14.14 12.7l3.26 3.26-9.42 5.35c-.36.2-.7.18-.99-.01l7.15-8.6zM7 2.7c-.29-.19-.63-.21-.99-.01l9.42 5.35-3.26 3.26L7 2.7z"/></svg>
        <span class="store__txt"><span class="store__top">Get it on</span><span class="store__bot">Google Play</span></span>
      </a>
    </div>
  </div>
</section>
`;
}

function footer() {
  return `</main>

<footer class="foot">
  <div class="wrap">
    <div class="foot__grid">
      <div class="foot__brand">
        <div class="logo" style="margin-bottom:1rem"><img src="/assets/logo.png" alt="TUȘE" width="420" height="226"></div>
        <p class="foot__bio">Nigeria's platform for verified, skilled artisans, booked, tracked and paid in one app.</p>
        <div class="socials">
          <a href="https://x.com/tuse__ng" aria-label="Tuse on X"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.65l-5.22-6.82-5.96 6.82H1.68l7.73-8.84L1.25 2.25h6.82l4.71 6.23 5.46-6.23Zm-1.16 17.52h1.83L7.01 4.13H5.05l12.03 15.64Z"/></svg></a>
          <a href="https://instagram.com/tuse__ng" aria-label="Tuse on Instagram"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none"/></svg></a>
        </div>
      </div>
      <div>
        <h5>Company</h5>
        <ul>
          <li><a href="/about">About us</a></li>
          <li><a href="/services">Services</a></li>
          <li><a href="/#how">How it works</a></li>
          <li><a href="/#artisans">Become an artisan</a></li>
          <li><a href="/#business">Tuse for Business</a></li>
        </ul>
      </div>
      <div>
        <h5>Support</h5>
        <ul>
          <li><a href="/help">FAQ</a></li>
          <li><a href="/guides">Problem guides</a></li>
          <li><a href="/contact">Contact us</a></li>
          <li><a href="/about-the-app">About the app</a></li>
          <li><a href="/community-guidelines">Community guidelines</a></li>
        </ul>
      </div>
      <div>
        <h5>Contact</h5>
        <address class="foot__addr">
          <a href="mailto:info@tuse.ng">info@tuse.ng</a><br>
          <a href="tel:+2347074032138">+234 707 403 2138</a><br>
          Diamond Close, Brains &amp; Hammers City,<br>Life Camp, FCT Abuja, Nigeria
        </address>
      </div>
    </div>
    <div class="foot__bar">
      <span>© 2026 TUȘE LTD. All rights reserved. RC 8198640.</span>
      <nav aria-label="Legal"><a href="/privacy">Privacy policy</a><a href="/terms-and-conditions">Terms and conditions</a><a href="/refund-policy">Refund policy</a><a href="/delete-account">Delete account</a><a href="/community-guidelines">Community guidelines</a></nav>
    </div>
  </div>
</footer>

<script src="/assets/site.js"></script>
</body>
</html>
`;
}

module.exports = { ORIGIN, NAV_LINKS, esc, head, ctaStrip, footer };
