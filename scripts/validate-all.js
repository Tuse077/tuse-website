#!/usr/bin/env node
/* Full-site structured-data + metadata validation. One-off QA tool. */
const fs = require('fs');
const path = require('path');
const SKIP_DIRS = new Set(['node_modules', '.git', '.vercel', '.claude', 'scripts', 'seo', 'design-system', 'assets']);

function walk(dir, out) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name.startsWith('.')) continue;
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (SKIP_DIRS.has(e.name)) continue;
      walk(full, out);
    } else if (e.name.endsWith('.html')) {
      out.push(full);
    }
  }
  return out;
}

const root = path.resolve(__dirname, '..');
const files = walk(root, []);

let jsonBlocks = 0;
let jsonInvalid = [];
const titles = new Map();
const descriptions = new Map();
const h1Issues = [];
const placeholderHits = [];

// Things that are INTENTIONALLY still placeholders, documented and
// expected until the user supplies real values — not a QA failure.
const KNOWN_PLACEHOLDERS = ['REPLACE-WITH-YOUR-SEARCH-CONSOLE-CODE', 'G-XXXXXXXXXX'];

files.forEach((file) => {
  const html = fs.readFileSync(file, 'utf8');
  const rel = path.relative(root, file).replace(/\\/g, '/');

  const blockRe = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g;
  let m;
  while ((m = blockRe.exec(html))) {
    jsonBlocks++;
    try {
      JSON.parse(m[1].trim());
    } catch (e) {
      jsonInvalid.push(`${rel}: ${e.message}`);
    }
  }

  const titleMatch = html.match(/<title>([^<]*)<\/title>/);
  if (titleMatch) {
    const t = titleMatch[1];
    if (!titles.has(t)) titles.set(t, []);
    titles.get(t).push(rel);
  }

  const descMatch = html.match(/<meta name="description" content="([^"]*)"/);
  if (descMatch) {
    const d = descMatch[1];
    if (!descriptions.has(d)) descriptions.set(d, []);
    descriptions.get(d).push(rel);
  }

  const h1Count = (html.match(/<h1[\s>]/g) || []).length;
  if (h1Count !== 1) h1Issues.push(`${rel}: ${h1Count} H1 tags (expected 1)`);

  // flag anything bracket-placeholder-shaped that ISN'T a known one
  const bracketPlaceholders = [...html.matchAll(/\[(INSERT|TODO|TBD|PLACEHOLDER|XXX)[^\]]*\]/gi)];
  bracketPlaceholders.forEach((p) => placeholderHits.push(`${rel}: ${p[0]}`));
  KNOWN_PLACEHOLDERS.forEach(() => {}); // documented, not scanned for — see report
});

console.log('=== Structured data ===');
console.log('JSON-LD blocks found:', jsonBlocks);
console.log('Invalid JSON:', jsonInvalid.length);
jsonInvalid.forEach((i) => console.log('  ' + i));

console.log('\n=== Duplicate titles ===');
let dupTitles = 0;
titles.forEach((pages, t) => { if (pages.length > 1) { dupTitles++; console.log(`  "${t}" used on: ${pages.join(', ')}`); } });
console.log('Duplicate title groups:', dupTitles, '(0 expected)');

console.log('\n=== Duplicate meta descriptions ===');
let dupDesc = 0;
descriptions.forEach((pages, d) => { if (pages.length > 1) { dupDesc++; console.log(`  "${d.slice(0,50)}…" used on: ${pages.join(', ')}`); } });
console.log('Duplicate description groups:', dupDesc, '(0 expected)');

console.log('\n=== H1 count per page ===');
console.log('Pages with != 1 H1:', h1Issues.length);
h1Issues.forEach((i) => console.log('  ' + i));

console.log('\n=== Unresolved placeholder-shaped content ===');
console.log('Found:', placeholderHits.length);
placeholderHits.forEach((p) => console.log('  ' + p));

console.log('\nTotal pages scanned:', files.length);
