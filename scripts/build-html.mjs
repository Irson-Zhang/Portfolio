// Builds the portfolio into ONE self-contained HTML file (html/index.html) that opens
// by double-click (file://) or on any static host like GitHub Pages. No server needed.
//
// Without the Express API, projects come from the bundled data and the contact form
// shows the email fallback.
//
// Usage: npm run build:html
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const client = path.join(root, 'client');
const tmp = path.join(root, 'html', '.build');
const outFile = path.join(root, 'html', 'index.html');

fs.rmSync(tmp, { recursive: true, force: true });
execFileSync('npx', ['vite', 'build', '--base', './', '--outDir', tmp, '--emptyOutDir'], { cwd: client, stdio: 'inherit' });

const read = (rel) => fs.readFileSync(path.join(tmp, rel.replace(/^\.\//, '')), 'utf8');
// A literal "</script" inside inlined code would end the tag early.
const safeJs = (js) => js.replace(/<\/script/gi, '<\\/script');

let html = read('index.html');

// JS bundle -> inline module script (inline modules run fine from file://)
html = html.replace(/<script type="module" crossorigin src="([^"]+)"><\/script>/, (_, src) =>
  `<script type="module">\n${safeJs(read(src))}\n</script>`
);
// CSS -> inline <style>
html = html.replace(/<link rel="stylesheet" crossorigin href="([^"]+)">/, (_, href) => `<style>\n${read(href)}\n</style>`);
// Theme bootstrap -> inline (runs before paint, avoids a flash of the wrong theme)
html = html.replace(/<script src="[^"]*theme-init\.js"><\/script>/, () => `<script>\n${safeJs(read('theme-init.js'))}\n</script>`);
// Favicon -> data URI
html = html.replace(/href="[^"]*favicon\.svg"/, () => `href="data:image/svg+xml,${encodeURIComponent(read('favicon.svg').trim())}"`);

const leftovers = html.match(/(src|href)="\.?\/?(assets|theme-init|favicon)[^"]*"/g);
if (leftovers) throw new Error(`Un-inlined references remain: ${leftovers.join(', ')}`);

fs.writeFileSync(outFile, html);

// App files for "Add to Home Screen" / install. They're used when the folder is
// served (Vercel, Netlify, a local server); a double-clicked file simply ignores them.
const APP_FILES = ['manifest.webmanifest', 'icon.svg', 'icon-192.png', 'icon-512.png', 'apple-touch-icon.png', 'sw.js'];
for (const f of APP_FILES) fs.copyFileSync(path.join(tmp, f), path.join(root, 'html', f));

fs.rmSync(tmp, { recursive: true, force: true });
console.log(`\n✓ ${path.relative(root, outFile)} (${(Buffer.byteLength(html) / 1024).toFixed(0)} KB). Double-click it to open.`);
