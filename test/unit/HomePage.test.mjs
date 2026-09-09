import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';
import {fileURLToPath} from 'node:url';

import nunjucks from 'nunjucks';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const localeRoot = path.join(root, 'tmpl', 'web', 'en');

function renderHome() {
    const environment = nunjucks.configure(localeRoot, {autoescape: true});
    return environment.render('index.html', {
        allowedLocales: ['en', 'ru', 'es'],
        locale: 'en',
    });
}

function templatePathForLocalLink(href) {
    const url = new URL(href, 'https://wiredgeese.com');
    const match = url.pathname.match(/^\/(en|ru|es)\/(.*)$/);
    if (!match) return null;

    const [, locale, route] = match;
    let relative;
    if (!route) relative = 'index.html';
    else if (route === 'blog/') relative = 'blog.html';
    else if (route.endsWith('/')) relative = `${route}index.html`;
    else relative = route;
    return path.join(root, 'tmpl', 'web', locale, relative);
}

test('renders the English Home with the accepted product-led sequence', () => {
    const html = renderHome();
    const expectedOrder = [
        'I build software for people and their AI agents.',
        'Available now',
        'Need something different?',
        'One accountable maker, with AI agents actively involved.',
        'Where this work is heading',
        'The maker behind Wired Geese',
        'Start with a working product.',
    ];

    let cursor = -1;
    for (const content of expectedOrder) {
        const index = html.indexOf(content);
        assert.ok(index > cursor, `${content} must appear in the accepted Home sequence`);
        cursor = index;
    }

    assert.match(html, /<section class="home-products" id="products"/);
    assert.match(html, /href="\/en\/products\/chatgpt-telegram\.html">View product<\/a>/);
    assert.match(html, /<section class="home-section home-preview home-preview--method" id="how-it-works"/);
    assert.match(html, /<a class="header-action" href="\/en\/contact\.html\?topic=product">Ask about a product<\/a>/);
    assert.doesNotMatch(html, /GitHub Flows|I build web systems|Discuss your project|Ways to work together|Evidence, not AI theatre/);
});

test('renders only resolvable local links and Home anchors', async () => {
    const html = renderHome();
    const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]));
    const hrefs = [...html.matchAll(/\shref="([^"]+)"/g)].map((match) => match[1]);

    for (const href of hrefs) {
        if (href.startsWith('#')) {
            assert.ok(ids.has(href.slice(1)), href);
            continue;
        }

        const url = new URL(href, 'https://wiredgeese.com');
        if (url.origin !== 'https://wiredgeese.com') continue;
        if (url.hash && url.pathname === '/en/') {
            assert.ok(ids.has(url.hash.slice(1)), href);
        }

        const templatePath = templatePathForLocalLink(href);
        if (templatePath) await assert.doesNotReject(fs.access(templatePath), href);
    }
});
