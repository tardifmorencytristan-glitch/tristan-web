import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { Script } from 'node:vm';
const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
assert.match(html, /<html lang="fr">/);
assert.match(html, /<meta name="viewport"/);
assert.match(html, /<title>Tristan · Web-First<\/title>/);
for (const id of ['search','cards','test','diagnostics','export','total']) {
  assert.match(html, new RegExp(`id="${id}"`), `Missing ${id}`);
}
assert.match(html, /productionQualified:false/);
assert.match(html, /remoteIntegrationsEnabled:false/);
assert.doesNotMatch(html, /<script[^>]+src=/i);
assert.doesNotMatch(html, /<link[^>]+rel="stylesheet"/i);
const scriptMatch = html.match(/<script>([\s\S]*?)<\/script>/);
assert.ok(scriptMatch, 'Missing inline script');
new Script(scriptMatch[1], { filename:'web-first-inline.js' });
assert.match(html, /function runDiagnostics\(\)/);
assert.match(html, /function render\(\)/);
console.log('PASS: static metadata, required controls, no remote dependencies, JS syntax, manifest safeguards');
