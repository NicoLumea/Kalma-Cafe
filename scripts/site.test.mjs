import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';

const root = resolve('dist');
const walk = dir => readdirSync(dir).flatMap(name => {
  const path = join(dir, name);
  return statSync(path).isDirectory() ? walk(path) : [path];
});
assert.ok(existsSync(root), 'Run npm run build before npm test');
const pages = walk(root).filter(path => path.endsWith('.html'));
const attr = (tag, name) => tag.match(new RegExp(`\\b${name}="([^"]*)"`))?.[1];
const tags = (html, name) => html.match(new RegExp(`<${name}\\b[^>]*>`, 'g')) ?? [];

test('all planned routes exist; every page is noindex with one primary heading', () => {
  for (const route of ['', 'heritage/', 'organic/', 'minimal/', 'immersive/', 'concept-notice/']) assert.ok(existsSync(join(root, route, 'index.html')), route);
  assert.ok(existsSync(join(root, '404.html')));
  assert.equal(pages.length, 7, 'QA-only pages must never ship');
  for (const path of pages) {
    const html = readFileSync(path, 'utf8');
    assert.equal(tags(html, 'h1').length, 1, path);
    assert.match(html, /<html lang="en"/);
    assert.ok(tags(html, 'meta').some(tag => attr(tag, 'name') === 'robots' && attr(tag, 'content')?.includes('noindex')), path);
    assert.ok(tags(html, 'meta').some(tag => attr(tag, 'name') === 'description' && attr(tag, 'content')?.length > 20), path);
    const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
    assert.equal(new Set(ids).size, ids.length, `Duplicate ID: ${path}`);
  }
});

test('internal navigation, fragments, stylesheets, scripts and image references resolve', () => {
  for (const path of pages) {
    const html = readFileSync(path, 'utf8');
    const url = path.endsWith('/index.html') ? path.slice(root.length, -10) : path.slice(root.length);
    for (const tag of [...tags(html, 'a'), ...tags(html, 'link'), ...tags(html, 'script'), ...tags(html, 'img')]) {
      const raw = attr(tag, 'href') ?? attr(tag, 'src');
      if (!raw || /^(https?:|mailto:|tel:|data:)/.test(raw)) continue;
      const target = new URL(raw, `https://concept.test${url}`);
      let targetPath = join(root, decodeURIComponent(target.pathname));
      if (target.pathname.endsWith('/')) targetPath = join(targetPath, 'index.html');
      assert.ok(existsSync(targetPath), `${path} → ${raw}`);
      if (target.hash) assert.ok(readFileSync(targetPath, 'utf8').includes(`id="${target.hash.slice(1)}"`), `Missing fragment: ${raw}`);
    }
  }
});

test('photos are valid non-empty WebP assets and have alt, dimensions and responsive sources', () => {
  for (const path of pages) {
    for (const tag of tags(readFileSync(path, 'utf8'), 'img')) {
      assert.ok(attr(tag, 'alt')?.length > 12, tag);
      assert.ok(Number(attr(tag, 'width')) > 0 && Number(attr(tag, 'height')) > 0, tag);
      assert.ok(attr(tag, 'srcset') && attr(tag, 'sizes'), tag);
      for (const source of attr(tag, 'srcset').split(',').map(part => part.trim().split(' ')[0])) {
        const bytes = readFileSync(join(root, source));
        assert.ok(bytes.length > 1000, source);
        assert.equal(bytes.toString('ascii', 0, 4), 'RIFF', source);
        assert.equal(bytes.toString('ascii', 8, 12), 'WEBP', source);
      }
    }
  }
});

test('no operational forms, active email collection, third-party scripts or remote fonts', () => {
  for (const path of pages) {
    const html = readFileSync(path, 'utf8');
    assert.equal(tags(html, 'form').length, 0, path);
    for (const input of tags(html, 'input')) assert.match(input, /\bdisabled(?:\s|>|=)/);
    for (const script of tags(html, 'script')) assert.ok(!/^https?:/.test(attr(script, 'src') ?? ''), script);
    for (const script of tags(html, 'script')) assert.ok(attr(script, 'src'), 'Executable scripts must be external to satisfy the production CSP');
  }
  const heritage = readFileSync(join(root, 'heritage/index.html'), 'utf8');
  assert.match(heritage, /Newsletter demonstration only/);
  assert.match(heritage, /Independent website design concept/);
  for (const file of walk(join(root, 'assets/fonts')).filter(path => path.endsWith('.css'))) {
    const css = readFileSync(file, 'utf8');
    assert.doesNotMatch(css, /https?:\/\//);
    for (const match of css.matchAll(/url\(([^)]+)\)/g)) assert.ok(statSync(join(root, match[1])).size > 1000);
  }
});

test('only Heritage is linked from the concept gallery', () => {
  const home = readFileSync(join(root, 'index.html'), 'utf8');
  for (const route of ['organic', 'minimal', 'immersive']) assert.doesNotMatch(home, new RegExp(`href="/${route}`));
  assert.match(home, /href="\/heritage\/"/);
  assert.equal((home.match(/COMING SOON/g) ?? []).length, 3);
});
