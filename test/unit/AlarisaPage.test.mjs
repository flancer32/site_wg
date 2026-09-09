import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';
import {fileURLToPath} from 'node:url';

import nunjucks from 'nunjucks';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const locales = {
    en: {
        principal: 'A Principal and an Assistant',
        status: 'not a product available to buy or try',
        archive: 'A long-term vision of a person (the Principal)',
        stale: /private (digital|personal)|personal tool|Interested in trying/i,
    },
    ru: {
        principal: 'Принципал и Ассистент',
        status: 'не продукт, который можно купить или попробовать',
        archive: 'Долгосрочное видение человека (Принципала)',
        stale: /Личный цифровой двойник|Персональный агент|Личный инструмент|Хотите попробовать/u,
    },
    es: {
        principal: 'La Persona Principal y el Asistente',
        status: 'no un producto que se pueda comprar o probar',
        archive: 'Una visión a largo plazo de una Persona Principal',
        stale: /doble digital privado|agente personal privado|Herramienta personal|¿Te interesa probarla/i,
    },
};

function render(locale, template, data = {}) {
    const environment = nunjucks.configure(path.join(root, 'tmpl', 'web', locale), {autoescape: true});
    return environment.render(template, {
        allowedLocales: ['en', 'ru', 'es'],
        alternateUrls: {
            en: 'https://wiredgeese.com/en/projects/alarisa.html',
            ru: 'https://wiredgeese.com/ru/projects/alarisa.html',
            es: 'https://wiredgeese.com/es/projects/alarisa.html',
        },
        canonicalUrl: `https://wiredgeese.com/${locale}/projects/alarisa.html`,
        locale,
        ...data,
    });
}

function alarisaArticle(html) {
    return html.match(/<article class="card project-detail">([\s\S]*?)<\/article>/)?.[1] ?? '';
}

test('renders localized Alarisa as a non-commercial Principal–Assistant vision', async () => {
    for (const [locale, copy] of Object.entries(locales)) {
        const html = render(locale, 'projects/alarisa.html');
        const article = alarisaArticle(html);
        const links = [...article.matchAll(/\shref="([^"]+)"/g)].map((match) => match[1]);

        assert.match(html, new RegExp(`<link rel="canonical" href="https://wiredgeese\\.com/${locale}/projects/alarisa\\.html">`));
        assert.match(article, new RegExp(copy.principal));
        assert.match(article, new RegExp(copy.status));
        assert.match(article, /PDE/);
        assert.match(article, /ChatGPT \+ Telegram/);
        assert.doesNotMatch(article, copy.stale);
        assert.deepEqual(links, [
            `/${locale}/products/chatgpt-telegram.html`,
            `/${locale}/products/`,
            `/${locale}/how-it-works.html`,
        ]);

        for (const href of links) {
            const route = href.replace(new RegExp(`^/${locale}/`), '').split('#')[0] || 'index.html';
            await assert.doesNotReject(fs.access(path.join(root, 'tmpl', 'web', locale, route)), href);
        }
    }
});

test('keeps the localized Home preview and Project Archive aligned with Alarisa', () => {
    for (const [locale, copy] of Object.entries(locales)) {
        const home = render(locale, 'index.html');
        const archive = render(locale, 'projects.html');

        assert.match(home, /home-preview--vision/);
        assert.match(home, /Principal(?:–|-|—)Assistant|Принципал–Ассистент|Principal–Asistente/u);
        assert.ok(archive.includes(copy.archive));
        assert.doesNotMatch(archive, copy.stale);
    }
});
