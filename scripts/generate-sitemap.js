#!/usr/bin/env node
/* ═══════════════════════════════════════════════════════════════════
   TUȘE — sitemap.xml generator

   Zero dependencies (Node built-ins only) so it never needs `npm
   install` to run. Not part of the deployed site — Vercel only ever
   serves the sitemap.xml this script writes; the script itself is a
   maintenance tool you run locally before each deploy.

   What it does, and nothing more:
     1. Walks the site root for *.html files (skips scripts/, seo/,
        design-system/, assets/, and dotfolders — none of those are
        pages).
     2. For each file, reads it directly rather than trusting a list:
          - <link rel="canonical"> is REQUIRED. No canonical, no entry
            — that's how a redirect target or a future draft page
            stays out of the sitemap without needing a second list to
            maintain.
          - <meta name="robots" content="noindex"> EXCLUDES the page,
            same reasoning.
          - The file's own last-modified time (mtime) becomes
            <lastmod>, so the date is never manually re-typed and
            never goes stale.
     3. Deduplicates by canonical URL (two files could theoretically
        canonicalise to the same URL; only one entry should exist).
     4. Sorts with the homepage first, then alphabetically — stable
        output, clean diffs.
     5. Refuses to write if it finds zero pages, so a bug here can
        never silently blank out the real sitemap.

   Usage:  node scripts/generate-sitemap.js
   ═══════════════════════════════════════════════════════════════════ */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SITE_ORIGIN = 'https://tuse.ng';
const OUTPUT = path.join(ROOT, 'sitemap.xml');

const SKIP_DIRS = new Set([
  'node_modules', '.git', '.vercel', '.claude',
  'scripts', 'seo', 'design-system', 'assets',
]);

function walk(dir, out) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('.')) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (SKIP_DIRS.has(entry.name)) continue;
      walk(full, out);
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      out.push(full);
    }
  }
  return out;
}

function extract(html, pattern) {
  const m = html.match(pattern);
  return m ? m[1] : null;
}

function priorityFor(urlPath) {
  if (urlPath === '/') return '1.0';
  if (urlPath === '/services' || urlPath === '/guides') return '0.9';
  if (urlPath.startsWith('/services/') || urlPath.startsWith('/guides/')) return '0.8';
  if (urlPath === '/help' || urlPath === '/business-enquiry') return '0.8';
  if (urlPath === '/contact' || urlPath === '/about-the-app') return '0.7';
  return '0.5';
}

function changefreqFor(urlPath) {
  if (urlPath === '/') return 'weekly';
  if (urlPath.startsWith('/services') || urlPath.startsWith('/guides')) return 'monthly';
  if (urlPath === '/help' || urlPath === '/contact' || urlPath === '/business-enquiry' || urlPath === '/about-the-app') {
    return 'monthly';
  }
  return 'yearly';
}

function main() {
  const files = walk(ROOT, []);
  const seen = new Map(); // canonical URL -> { lastmod, urlPath }
  const skipped = [];

  for (const file of files) {
    const html = fs.readFileSync(file, 'utf8');
    const rel = path.relative(ROOT, file).replace(/\\/g, '/');

    const canonical = extract(html, /<link\s+rel="canonical"\s+href="([^"]+)"/i);
    if (!canonical) { skipped.push(`${rel}  (no canonical tag)`); continue; }

    const robots = extract(html, /<meta\s+name="robots"\s+content="([^"]*)"/i);
    if (robots && /noindex/i.test(robots)) { skipped.push(`${rel}  (noindex)`); continue; }

    if (!canonical.startsWith(SITE_ORIGIN)) {
      skipped.push(`${rel}  (canonical is off-origin: ${canonical})`);
      continue;
    }

    const stat = fs.statSync(file);
    const lastmod = stat.mtime.toISOString().slice(0, 10);
    const urlPath = canonical.slice(SITE_ORIGIN.length) || '/';

    if (seen.has(canonical)) {
      skipped.push(`${rel}  (duplicate canonical, already have one: ${canonical})`);
      continue;
    }
    seen.set(canonical, { lastmod, urlPath });
  }

  if (seen.size === 0) {
    console.error('Refusing to write sitemap.xml: found zero indexable pages. Something is wrong — check SKIP_DIRS and canonical tags.');
    process.exit(1);
  }

  const entries = [...seen.entries()].sort((a, b) => {
    if (a[0] === SITE_ORIGIN + '/') return -1;
    if (b[0] === SITE_ORIGIN + '/') return 1;
    return a[0].localeCompare(b[0]);
  });

  const body = entries.map(([url, meta]) => `  <url>
    <loc>${url}</loc>
    <lastmod>${meta.lastmod}</lastmod>
    <changefreq>${changefreqFor(meta.urlPath)}</changefreq>
    <priority>${priorityFor(meta.urlPath)}</priority>
  </url>`).join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`;

  fs.writeFileSync(OUTPUT, xml, 'utf8');

  console.log(`sitemap.xml written: ${entries.length} URLs`);
  entries.forEach(([url, meta]) => console.log(`  ${meta.lastmod}  ${url}`));
  if (skipped.length) {
    console.log(`\nSkipped ${skipped.length} file(s) (expected — not indexable pages):`);
    skipped.forEach((s) => console.log(`  ${s}`));
  }
}

main();
