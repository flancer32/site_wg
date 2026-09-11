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
        assert.match(html, /Wild Geese|Wild Geese|Wild Geese/u);
        assert.match(html, /employees|сотрудники|empleados/u);
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

test('Home keeps its commercial action before repository evidence and Current Work', () => {
    for (const locale of Object.keys(locales)) {
        const html = renderHome(locale);
        const commercial = html.indexOf(`/${locale}/contact.html?topic=mcp-integration`);
        const evidence = html.indexOf('github.com/teqfw/di');
        const currentWork = html.indexOf('class="home-section home-preview--vision home-current-work"');
        assert.ok(commercial >= 0 && commercial < evidence, `${locale}: commercial action precedes repository evidence`);
        assert.ok(commercial >= 0 && commercial < currentWork, `${locale}: commercial action precedes Current Work`);
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

test('footer preserves the same current discovery model as primary navigation', async () => {
    for (const locale of Object.keys(locales)) {
        const footer = await fs.readFile(path.join(root, 'tmpl', 'web', locale, 'inc', 'footer.html'), 'utf8');
        for (const route of ['products/', 'work-with-me.html', 'projects.html', 'blog/', 'how-it-works.html', 'contact.html?topic=commercial']) {
            assert.ok(footer.includes(route), `${locale}: ${route} remains reachable in the footer`);
        }
        assert.doesNotMatch(footer, /Project Archive|Archivo de proyectos|Архив проектов/u);
    }
});
