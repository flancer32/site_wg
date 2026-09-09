import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';
import {fileURLToPath} from 'node:url';

import nunjucks from 'nunjucks';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const localeRoot = path.join(root, 'tmpl', 'web', 'en');

function renderProduct() {
    const environment = nunjucks.configure(localeRoot, {autoescape: true});
    return environment.render('products/chatgpt-telegram.html', {
        allowedLocales: ['en', 'ru', 'es'],
        locale: 'en',
        localeRouteFallback: true,
    });
}

test('renders the English ChatGPT + Telegram product page with its commercial boundaries', () => {
    const html = renderProduct();
    const expectedOrder = [
        'Connect your ChatGPT to your Telegram.',
        'What it lets you do',
        'Typical workflows',
        'How setup works',
        'Control and trust',
        'Fit and boundaries',
        'The product can be adapted.',
        'Built on PDE',
        'Want ChatGPT to work with your Telegram?',
    ];

    let cursor = -1;
    for (const content of expectedOrder) {
        const index = html.indexOf(content);
        assert.ok(index > cursor, `${content} must appear in buyer-decision order`);
        cursor = index;
    }

    assert.match(html, /Early access/);
    assert.match(html, /Paid setup for an agreed workflow/);
    assert.match(html, /href="\/en\/contact\.html\?topic=chatgpt-telegram">Ask about this product/);
    assert.match(html, /data-locale-fallback="root"/);
    assert.doesNotMatch(html, /enterprise-grade|zero-risk|fixed monthly price/i);
});

test('the English product page has resolvable local destinations', async () => {
    const html = renderProduct();
    const hrefs = [...html.matchAll(/\shref="([^"]+)"/g)].map((match) => match[1]);
    for (const href of hrefs) {
        const url = new URL(href, 'https://wiredgeese.com');
        if (url.origin !== 'https://wiredgeese.com' || !url.pathname.startsWith('/en/')) continue;
        if (url.pathname.startsWith('/styles/') || url.pathname === '/favicon.ico' || url.pathname === '/en/') continue;
        const relative = url.pathname.replace(/^\/en\//, '');
        await assert.doesNotReject(fs.access(path.join(localeRoot, relative)), href);
    }
});
