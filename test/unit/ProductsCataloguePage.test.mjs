import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';
import {fileURLToPath} from 'node:url';

import nunjucks from 'nunjucks';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const locales = {
    en: {
        title: 'Products — practical software by Alex Gusev | Wired Geese',
        maturity: 'Early access',
        cta: 'View product',
        trust: 'How it works →',
    },
    ru: {
        title: 'Продукты — практическое ПО Алекса Гусева | Wired Geese',
        maturity: 'Ранний доступ',
        cta: 'О продукте',
        trust: 'Как это работает →',
    },
    es: {
        title: 'Productos — software práctico de Alex Gusev | Wired Geese',
        maturity: 'Acceso anticipado',
        cta: 'Ver producto',
        trust: 'Cómo funciona →',
    },
};

function render(locale, template = 'products/index.html') {
    const environment = nunjucks.configure(path.join(root, 'tmpl', 'web', locale), {autoescape: true});
    return environment.render(template, {
        allowedLocales: ['en', 'ru', 'es'],
        alternateUrls: Object.fromEntries(['en', 'ru', 'es'].map((target) => [target, `https://wiredgeese.com/${target}/products/`])),
        canonicalUrl: `https://wiredgeese.com/${locale}/products/`,
        locale,
    });
}

test('renders a localized catalogue with only the authorized current product', () => {
    for (const [locale, copy] of Object.entries(locales)) {
        const html = render(locale);
        const catalogue = html.match(/<main[^>]*>([\s\S]*?)<\/main>/)?.[1] ?? '';
        const productCards = catalogue.match(/<article class="product-preview">/g) ?? [];

        assert.match(html, new RegExp(`<title>${copy.title}</title>`));
        assert.match(html, new RegExp(`<link rel="canonical" href="https://wiredgeese\\.com/${locale}/products/">`));
        assert.equal(productCards.length, 1, `${locale} has one catalogue product`);
        assert.ok(catalogue.includes('ChatGPT + Telegram'));
        assert.ok(catalogue.includes(copy.maturity));
        assert.ok(catalogue.includes(copy.cta));
        assert.ok(catalogue.includes(copy.trust));
        assert.match(catalogue, new RegExp(`href="/${locale}/products/chatgpt-telegram\\.html"`));
        assert.match(catalogue, new RegExp(`href="/${locale}/contact\\.html\\?topic=product"`));
        assert.match(catalogue, new RegExp(`href="/${locale}/how-it-works\\.html"`));
        assert.doesNotMatch(catalogue, /GitHub Flows|Work With Me|Alarisa|Shared Memory|Shared Files|PDE|TeqFW|€\d|\$\d/u);
    }
});

test('shared discovery links use the catalogue while direct product links stay direct', async () => {
    for (const locale of Object.keys(locales)) {
        const nav = render(locale, 'inc/nav.html');
        const footer = render(locale, 'inc/footer.html');
        const home = render(locale, 'index.html');
        const howItWorks = render(locale, 'how-it-works.html');
        const alarisa = render(locale, 'projects/alarisa.html');
        const product = render(locale, 'products/chatgpt-telegram.html');
        const cataloguePath = `/${locale}/products/`;
        const detailPath = `/${locale}/products/chatgpt-telegram.html`;

        assert.match(nav, new RegExp(`href="${cataloguePath}"`));
        assert.match(footer, new RegExp(`href="${cataloguePath}"`));
        assert.match(home, new RegExp(`href="${cataloguePath}">(?:Explore products|Посмотреть продукты|Ver productos)<`));
        assert.match(home, new RegExp(`href="${detailPath}"`));
        assert.match(howItWorks, new RegExp(`href="${cataloguePath}"`));
        assert.match(alarisa, new RegExp(`href="${cataloguePath}"`));
        assert.match(product, new RegExp(`href="${cataloguePath}"`));
        await assert.doesNotReject(fs.access(path.join(root, 'tmpl', 'web', locale, 'products', 'index.html')));
    }
});

test('the existing active-navigation and locale-switching rules cover catalogue and detail routes', async () => {
    const script = await fs.readFile(path.join(root, 'web', 'js', 'site.js'), 'utf8');

    assert.match(script, /currentPath === linkPath \|\| currentPath\.startsWith\(linkPath\.replace\(/);
    assert.match(script, /currentPath\.replace\(localePattern, `\/\$\{targetLocale\}`\)/);
});
