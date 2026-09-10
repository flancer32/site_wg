import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';
import {fileURLToPath} from 'node:url';

import nunjucks from 'nunjucks';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const locales = {en: 'Read the Journal →', ru: 'Читать Журнал →', es: 'Leer la Bitácora →'};

function renderHome(locale) {
    return nunjucks.configure(path.join(root, 'tmpl', 'web', locale), {autoescape: true}).render('index.html', {
        allowedLocales: ['en', 'ru', 'es'], locale,
        recentJournal: {items: [{html: '<li class="blog-item"><a class="card-link" href="/entry.html"></a><div><h2>Recent evidence</h2></div></li>'}]},
    });
}

test('Home gives every locale a proposition, provisional MCP action, alternatives, and SSR Journal evidence', () => {
    for (const [locale, journalLabel] of Object.entries(locales)) {
        const html = renderHome(locale);
        assert.match(html, /<h1/);
        assert.match(html, new RegExp(`href="/${locale}/contact\\.html\\?topic=mcp-integration"`));
        assert.match(html, /MCP/);
        assert.match(html, /Provisional|Предварительное|Provisional/u);
        assert.match(html, /ChatGPT \+ Telegram/);
        assert.match(html, /Books|книги|libros/u);
        assert.match(html, /Recent evidence/);
        assert.match(html, /<ul class="blog-list" role="list">/);
        assert.ok(html.includes(journalLabel), `${locale}: Journal handoff`);
        assert.match(html, new RegExp(`href="/${locale}/blog/"`));
        assert.match(html, new RegExp(`href="/${locale}/how-it-works\\.html"`));
        assert.match(html, new RegExp(`href="/${locale}/projects\\.html"`));
        assert.match(html, new RegExp(`href="/${locale}/contact\\.html\\?topic=commercial"`));
        assert.doesNotMatch(html, /GitHub Flows/u);
    }
});

test('shared compact navigation exposes commercial entries, Journal, working model, projects, and human handoff', async () => {
    for (const locale of Object.keys(locales)) {
        const nav = await fs.readFile(path.join(root, 'tmpl', 'web', locale, 'inc', 'nav.html'), 'utf8');
        for (const route of ['products/', 'blog/', 'how-it-works.html', 'projects.html']) {
            assert.match(nav, new RegExp(`href="/\\{\\{ locale \\}\\}/${route.replace('.', '\\.')}`));
        }
        assert.match(nav, /contact\.html\?topic=commercial/);
        assert.doesNotMatch(nav, /projects\/alarisa\.html/);
        assert.match(nav, /aria-expanded="false"/);
        assert.match(nav, /aria-controls="site-menu"/);
    }
});
