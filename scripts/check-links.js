#!/usr/bin/env node
/* Scans every .html file for internal href="/..." links and verifies
   the target actually exists as a real page on disk. One-off QA tool,
   not part of the deployed site. */
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
const relFiles = files.map((f) => path.relative(root, f).replace(/\\/g, '/'));

const validPaths = new Set(['/']);
relFiles.forEach((f) => {
  validPaths.add('/' + f.replace(/\.html$/, ''));
});

let totalLinks = 0;
const broken = [];
const anchorsWithoutHash = [];

files.forEach((file) => {
  const html = fs.readFileSync(file, 'utf8');
  const rel = path.relative(root, file).replace(/\\/g, '/');
  const hrefRe = /href="(\/[^"]*)"/g;
  let m;
  while ((m = hrefRe.exec(html))) {
    const href = m[1];
    totalLinks++;
    if (href.startsWith('/assets/')) continue;
    const pathPart = href.split('#')[0];
    if (pathPart === '') continue;
    if (!validPaths.has(pathPart)) broken.push(`${rel} -> ${href}`);
  }
});

console.log('HTML files scanned:', files.length);
console.log('Total internal href="/..." links:', totalLinks);
console.log('Broken:', broken.length);
broken.forEach((b) => console.log('  ' + b));

if (broken.length > 0) process.exit(1);
