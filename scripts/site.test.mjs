import test from 'node:test';
import { runInNewContext } from 'node:vm';
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
const withoutSwitcher = html => html.replace(/\s*<aside class="cs-root"[\s\S]*?<\/aside>/g, '');

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

test('all four completed concepts are linked from the gallery', () => {
  const home = readFileSync(join(root, 'index.html'), 'utf8');
  assert.match(home, /href="\/immersive\/"/);
  assert.match(home, /href="\/heritage\/"/);
  assert.match(home, /href="\/organic\/"/);
  assert.match(home, /href="\/minimal\/"/);
  assert.equal((home.match(/COMING SOON/g) ?? []).length, 0);
  assert.equal((home.match(/AVAILABLE TO EXPLORE/g) ?? []).length, 4);
});

test('Organic provides complete accessible sections, working directions and safe demonstration content', () => {
  const html = readFileSync(join(root, 'organic/index.html'), 'utf8');
  for (const id of ['home', 'story', 'origin', 'menu', 'gallery', 'visit']) {
    const section = tags(html, 'section').find(tag => attr(tag, 'id') === id);
    assert.ok(section, `Missing Organic section: ${id}`);
    assert.equal(attr(section, 'tabindex'), '-1', `Section must receive navigation focus: ${id}`);
    assert.ok(attr(section, 'aria-labelledby'), `Section must have a heading: ${id}`);
  }
  const toggle = tags(html, 'button').find(tag => attr(tag, 'aria-controls') === 'organic-navigation');
  assert.equal(attr(toggle, 'aria-expanded'), 'false');
  assert.match(html, /Newsletter demonstration only/);
  assert.match(html, /Independent website design concept/);
  assert.match(html, /not Café Kalma’s official menu/);
  assert.match(html, /do not show Café Kalma’s premises/);
  const directions = tags(html, 'a').find(tag => (attr(tag, 'href') ?? '').startsWith('https://www.google.com/maps/dir/'));
  assert.ok(directions);
  assert.equal(new URL(attr(directions, 'href').replaceAll('&amp;', '&')).searchParams.get('destination'), 'Seelingstraße 34, 14059 Berlin, Germany');
  const items = tags(html, 'article').filter(tag => attr(tag, 'data-menu-item'));
  assert.equal(items.length, 3);
  const photos = tags(html, 'img');
  assert.equal(photos.filter(tag => attr(tag, 'loading') === 'eager').length, 1);
  assert.ok(photos.every(tag => ['lazy', 'eager'].includes(attr(tag, 'loading'))));
  const newsletterButton = tags(html, 'button').find(tag => /\bdisabled(?:\s|>|=)/.test(tag));
  assert.ok(newsletterButton);
});

test('Organic styling and font are isolated from Heritage', () => {
  const heritage = readFileSync(join(root, 'heritage/index.html'), 'utf8');
  const organic = readFileSync(join(root, 'organic/index.html'), 'utf8');
  assert.doesNotMatch(heritage, /fraunces|organic-page|organic-navigation/);
  assert.match(organic, /fraunces\.css/);
  assert.match(organic, /class="organic-page"/);
  const cssLinks = html => tags(html, 'link').filter(tag => attr(tag, 'rel') === 'stylesheet').map(tag => attr(tag, 'href'));
  const heritageCss = cssLinks(heritage).map(file => readFileSync(join(root, file), 'utf8')).join('');
  assert.doesNotMatch(heritageCss, /\.o-hero/);
  const organicCss = cssLinks(organic).map(file => readFileSync(join(root, file), 'utf8')).join('');
  assert.match(organicCss, /prefers-reduced-motion/);
});

test('Minimal has complete sections, accessible navigation and demonstration-only controls', () => {
  const html = withoutSwitcher(readFileSync(join(root, 'minimal/index.html'), 'utf8'));
  for (const id of ['home', 'story', 'origin', 'menu', 'gallery', 'visit']) {
    const section = tags(html, 'section').find(tag => attr(tag, 'id') === id);
    assert.ok(section, `Missing Minimal section: ${id}`);
    assert.equal(attr(section, 'tabindex'), '-1');
    assert.ok(attr(section, 'aria-labelledby'));
  }
  const toggle = tags(html, 'button').find(tag => attr(tag, 'aria-controls') === 'minimal-navigation');
  assert.equal(attr(toggle, 'aria-expanded'), 'false');
  assert.equal(tags(html, 'a').filter(tag => attr(tag, 'aria-current') === 'location').length, 1);
  const ids = tags(html, 'article').map(tag => attr(tag, 'data-menu-item')).filter(Boolean);
  assert.equal(ids.length, 3);
  assert.equal(new Set(ids).size, 3);
  assert.match(html, /Demonstration menu only/);
  assert.match(html, /No orders or payments are accepted/);
  assert.match(html, /Newsletter demonstration only/);
  assert.match(html, /Independent website design concept/);
  assert.match(html, /not images of Café Kalma’s actual premises/);
  const buttons = tags(html, 'button');
  assert.equal(buttons.length, 2, 'Only menu disclosure and disabled newsletter controls are expected');
  assert.ok(buttons.filter(tag => !attr(tag, 'aria-controls')).every(tag => /\bdisabled(?:\s|>|=)/.test(tag)));
  assert.doesNotMatch(html, /href="[^"\s]*(?:checkout|cart|order\/|payment)/i);
  const directions = tags(html, 'a').find(tag => (attr(tag, 'href') ?? '').startsWith('https://www.google.com/maps/dir/'));
  assert.equal(new URL(attr(directions, 'href').replaceAll('&amp;', '&')).searchParams.get('destination'), 'Seelingstraße 34, 14059 Berlin, Germany');
  const images = tags(html, 'img');
  assert.equal(images.filter(tag => attr(tag, 'loading') === 'eager').length, 1);
  assert.ok(images.every(tag => ['lazy', 'eager'].includes(attr(tag, 'loading'))));
});

test('Minimal typography and CSS are isolated from Heritage and Organic', () => {
  for (const route of ['heritage', 'organic']) {
    const html = readFileSync(join(root, route, 'index.html'), 'utf8');
    assert.doesNotMatch(html, /instrument-serif|minimal-page|minimal-navigation/);
    const css = tags(html, 'link').filter(tag => attr(tag, 'rel') === 'stylesheet').map(tag => readFileSync(join(root, attr(tag, 'href')), 'utf8')).join('');
    assert.doesNotMatch(css, /\.m-hero|\.m-header/);
  }
  const html = withoutSwitcher(readFileSync(join(root, 'minimal/index.html'), 'utf8'));
  assert.match(html, /instrument-serif\.css/);
  assert.match(html, /class="minimal-page"/);
  const css = tags(html, 'link').filter(tag => attr(tag, 'rel') === 'stylesheet').map(tag => readFileSync(join(root, attr(tag, 'href')), 'utf8')).join('');
  assert.match(css, /prefers-reduced-motion/);
  assert.doesNotMatch(css, /\.o-hero|\.hero-visual/);
});

test('Immersive provides all nine sections, accessible controls and safe menu/newsletter content', () => {
  const html = withoutSwitcher(readFileSync(join(root, 'immersive/index.html'), 'utf8'));
  assert.equal(tags(html, 'header').length, 1);
  assert.equal(tags(html, 'footer').length, 1);
  const sections = tags(html, 'section');
  assert.equal(sections.length, 7);
  for (const id of ['home', 'story', 'origin', 'menu', 'gallery', 'visit', 'newsletter']) {
    const section = sections.find(tag => attr(tag, 'id') === id);
    assert.ok(section, id);
    assert.equal(attr(section, 'tabindex'), '-1');
    assert.ok(attr(section, 'aria-labelledby'));
  }
  const buttons = tags(html, 'button');
  const toggle = buttons.find(tag => attr(tag, 'aria-controls') === 'immersive-navigation');
  assert.equal(attr(toggle, 'aria-expanded'), 'false');
  for (const button of buttons) {
    const target = attr(button, 'aria-controls');
    if (target) assert.ok(html.includes(`id="${target}"`));
    else assert.match(button, /\bdisabled(?:\s|>|=)/);
  }
  const scenes = tags(html, 'article').filter(tag => (attr(tag, 'id') ?? '').startsWith('i-scene-'));
  assert.equal(scenes.length, 3);
  assert.ok(scenes.every(tag => !/\bhidden(?:\s|>|=)/.test(tag)), 'All scenes must be available before JavaScript');
  const items = tags(html, 'article').filter(tag => attr(tag, 'data-menu-item'));
  assert.equal(items.length, 3);
  assert.equal(new Set(items.map(tag => attr(tag, 'data-menu-item'))).size, 3);
  assert.ok(items.every(tag => attr(tag, 'data-availability') === 'unconfirmed'));
  for (const copy of ['Demonstration menu only', 'No orders or payments are accepted', 'Newsletter demonstration only', 'Independent website design concept', 'actual premises']) assert.ok(html.includes(copy), copy);
  assert.doesNotMatch(html, /href="[^"\s]*(?:checkout|cart|order\/|payment)/i);
  const images = tags(html, 'img');
  assert.equal(images.filter(tag => attr(tag, 'loading') === 'eager').length, 1);
  assert.ok(images.every(tag => ['lazy', 'eager'].includes(attr(tag, 'loading'))));
  const directions = tags(html, 'a').find(tag => (attr(tag, 'href') ?? '').startsWith('https://www.google.com/maps/dir/'));
  assert.equal(new URL(attr(directions, 'href').replaceAll('&amp;', '&')).searchParams.get('destination'), 'Seelingstraße 34, 14059 Berlin, Germany');
});

test('Immersive styles and scripts are isolated, lightweight and progressively enhanced', () => {
  const html = withoutSwitcher(readFileSync(join(root, 'immersive/index.html'), 'utf8'));
  const stylesheetPaths = html => tags(html, 'link').filter(tag => attr(tag, 'rel') === 'stylesheet').map(tag => attr(tag, 'href'));
  const css = stylesheetPaths(html).map(path => readFileSync(join(root, path), 'utf8')).join('');
  assert.match(css, /prefers-reduced-motion/);
  assert.doesNotMatch(css, /\.m-hero|\.o-hero|\.hero-visual/);
  const scriptPaths = tags(html, 'script').map(tag => attr(tag, 'src'));
  const scripts = scriptPaths.map(path => readFileSync(join(root, path), 'utf8')).join('');
  assert.ok(Buffer.byteLength(scripts) < 10000, 'Keep Immersive client scripts below 10 KB uncompressed');
  assert.match(scripts, /IntersectionObserver/);
  assert.match(scripts, /prefers-reduced-motion/);
  assert.doesNotMatch(scripts, /setInterval|fetch\(|XMLHttpRequest/);
  for (const route of ['heritage', 'organic', 'minimal']) {
    const prior = readFileSync(join(root, route, 'index.html'), 'utf8');
    assert.doesNotMatch(prior, /immersive-page|immersive-navigation|espresso-/);
    const priorCss = stylesheetPaths(prior).map(path => readFileSync(join(root, path), 'utf8')).join('');
    assert.doesNotMatch(priorCss, /\.i-hero|\.i-scene/);
    for (const tag of tags(prior, 'script')) assert.ok(!scriptPaths.includes(attr(tag, 'src')));
  }
});

test('motion enhancement safely handles reduced motion and missing IntersectionObserver', () => {
  const file = walk(join(root, '_astro')).find(path => /ImmersiveLayout.*\.js$/.test(path));
  const code = readFileSync(file, 'utf8');
  for (const scenario of [{ reduce: true, io: true }, { reduce: false, io: false }, { reduce: false, io: true }]) {
    let created = 0, observed = 0, disconnected = 0, onChange;
    const media = { matches: scenario.reduce, addEventListener: (_, fn) => { onChange = fn; } };
    class Observer { constructor() { created++; } observe() { observed++; } disconnect() { disconnected++; } }
    runInNewContext(code, {
      matchMedia: () => media,
      document: { querySelectorAll: () => [{ hasAttribute: () => false }] },
      window: scenario.io ? { IntersectionObserver: Observer } : {},
      IntersectionObserver: Observer,
    });
    const enabled = !scenario.reduce && scenario.io;
    assert.equal(created, enabled ? 1 : 0);
    assert.equal(observed, enabled ? 1 : 0);
    media.matches = true; onChange();
    assert.equal(disconnected, enabled ? 1 : 0, 'Changing to reduced motion disconnects the observer');
  }
});

test('one reusable switcher appears on every concept with correct links and current page', () => {
  const routes = ['heritage', 'organic', 'minimal', 'immersive'];
  const assets = new Set();
  for (const route of routes) {
    const html = readFileSync(join(root, route, 'index.html'), 'utf8');
    assert.equal((html.match(/data-concept-switcher/g) ?? []).length, 1);
    const markup = html.match(/<aside class="cs-root"[\s\S]*?<\/aside>/)?.[0];
    assert.ok(markup);
    const links = tags(markup, 'a');
    assert.deepEqual(links.map(tag => attr(tag, 'href')), [...routes.map(name => `/${name}/`), '/']);
    const current = links.filter(tag => attr(tag, 'aria-current') === 'page');
    assert.equal(current.length, 1);
    assert.equal(attr(current[0], 'href'), `/${route}/`);
    assert.match(markup, /Currently viewing/);
    const launch = tags(markup, 'button').find(tag => /data-cs-launch/.test(tag));
    const dialog = tags(markup, 'dialog')[0];
    assert.equal(attr(launch, 'aria-expanded'), 'false');
    assert.equal(attr(launch, 'aria-haspopup'), 'dialog');
    assert.equal(attr(launch, 'aria-controls'), attr(dialog, 'id'));
    assert.ok(markup.includes(`id="${attr(dialog, 'aria-labelledby')}"`));
    assert.match(markup, /<details/);
    assert.match(markup, /<summary/);
    for (const tag of [...tags(markup, 'link'), ...tags(markup, 'script')]) assets.add(attr(tag, 'src') ?? attr(tag, 'href'));
  }
  assert.equal(assets.size, 2, 'One shared stylesheet and one shared script');
  for (const path of ['index.html','concept-notice/index.html','404.html']) assert.doesNotMatch(readFileSync(join(root,path),'utf8'), /data-concept-switcher|ConceptSwitcher.*\.css|concept-switcher.*\.js/);
});

test('presentation disabled build omits switcher markup and asset requests', async () => {
  const { mkdtempSync, rmSync } = await import('node:fs');
  const { tmpdir } = await import('node:os');
  const { execFileSync } = await import('node:child_process');
  const output = mkdtempSync(join(tmpdir(), 'kalma-presentation-off-'));
  try {
    execFileSync(process.execPath, ['node_modules/astro/bin/astro.mjs','build','--outDir',output], { env: { ...process.env, PRESENTATION_MODE: 'off' }, stdio: 'pipe' });
    for (const route of ['heritage','organic','minimal','immersive']) {
      const disabled = readFileSync(join(output,route,'index.html'),'utf8');
      assert.doesNotMatch(disabled, /data-concept-switcher|cs-launch|ConceptSwitcher.*\.css|concept-switcher.*\.js/);
      const enabled = withoutSwitcher(readFileSync(join(root,route,'index.html'),'utf8'));
      const normalize = html => html.replace(/>\s+</g,'><').trim();
      assert.equal(normalize(disabled), normalize(enabled), `${route}: disabling presentation preserves the underlying output`);
    }
  } finally { rmSync(output, { recursive: true, force: true }); }
});

test('switcher keyboard focus wraps at both ends for any concept count', async () => {
  const { focusWrapTarget } = await import('../src/scripts/concept-switcher.js');
  for (const count of [2,3,4,7]) {
    const controls = Array.from({length: count + 2}, () => ({}));
    assert.equal(focusWrapTarget(controls, controls[0], true), controls.at(-1));
    assert.equal(focusWrapTarget(controls, controls.at(-1), false), controls[0]);
    assert.equal(focusWrapTarget(controls, controls[1], false), undefined);
    assert.equal(focusWrapTarget(controls, {}, false), controls[0]);
  }
  assert.equal(focusWrapTarget([], {}, false), undefined);
});
