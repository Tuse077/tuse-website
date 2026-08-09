#!/usr/bin/env node
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
const brokenAssets = [];
const canonicalMismatches = [];

files.forEach((file) => {
  const html = fs.readFileSync(file, 'utf8');
  const rel = path.relative(root, file).replace(/\\/g, '/');

  const assetRe = /(?:href|src)="(\/assets\/[^"]*)"/g;
  let m;
  while ((m = assetRe.exec(html))) {
    const assetFsPath = path.join(root, m[1]);
    if (!fs.existsSync(assetFsPath)) brokenAssets.push(`${rel} -> ${m[1]}`);
  }

  const canonMatch = html.match(/<link rel="canonical" href="https:\/\/tuse\.ng(\/[^"]*)"/);
  if (canonMatch) {
    const expectedPath = '/' + rel.replace(/\.html$/, '');
    const declared = canonMatch[1];
    const normalisedExpected = expectedPath === '/index' ? '/' : expectedPath;
    if (declared !== normalisedExpected) {
      canonicalMismatches.push(`${rel}: canonical says "${declared}", file implies "${normalisedExpected}"`);
    }
  }
});

console.log('HTML files checked:', files.length);
console.log('Broken asset references:', brokenAssets.length);
brokenAssets.forEach((b) => console.log('  ' + b));
console.log('Canonical/location mismatches:', canonicalMismatches.length);
canonicalMismatches.forEach((c) => console.log('  ' + c));

if (brokenAssets.length || canonicalMismatches.length) process.exit(1);
