import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';
import {fileURLToPath} from 'node:url';

import nunjucks from 'nunjucks';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
function renderHome(locale = 'en') {
    const localeRoot = path.join(root, 'tmpl', 'web', locale);
    const environment = nunjucks.configure(localeRoot, {autoescape: true});
    return environment.render('index.html', {
        allowedLocales: ['en', 'ru', 'es'],
        locale,
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
    assert.match(html, /href="\/en\/products\/">Explore products<\/a>/);
    assert.match(html, /href="\/en\/products\/chatgpt-telegram\.html">View product<\/a>/);
    assert.match(html, /<section class="home-section home-preview home-preview--method" id="how-it-works"/);
    assert.match(html, /href="\/en\/how-it-works\.html">See how it works →<\/a>/);
    assert.match(html, /<a class="header-action" href="\/en\/contact\.html\?topic=product">Ask about a product<\/a>/);
    assert.doesNotMatch(html, /GitHub Flows|I build web systems|Discuss your project|Ways to work together|Evidence, not AI theatre/);
});

test('keeps Alex as the accountable maker and Wired Geese as the site and development brand in every locale', () => {
    const locales = {
        en: {
            title: "Wired Geese — Alex Gusev's site and trade brand for software made with AI agents",
            maker: 'The maker behind Wired Geese',
            brand: 'Wired Geese is the name and brand I use for this site and my work building software with AI agents.',
            legacy: 'Wired Geese is the name I use for the software I create.',
            accountability: 'I work directly on the products and remain responsible for the decisions behind them.',
            productLink: '/en/products/',
        },
        ru: {
            title: 'Wired Geese — сайт и торговый бренд Алекса Гусева для программных продуктов, создаваемых с ИИ-агентами',
            maker: 'Создатель Wired Geese',
            brand: 'Wired Geese — название и бренд этого сайта и моей работы по созданию программного обеспечения с ИИ-агентами.',
            legacy: 'Wired Geese — название программного обеспечения, которое я создаю.',
            accountability: 'Я работаю с продуктами напрямую и остаюсь ответственным за решения, стоящие за ними.',
            productLink: '/ru/products/',
        },
        es: {
            title: 'Wired Geese — sitio y marca comercial de Alex Gusev para productos de software creados con agentes de IA',
            maker: 'El creador detrás de Wired Geese',
            brand: 'Wired Geese es el nombre y la marca que uso para este sitio y mi trabajo creando software con agentes de IA.',
            legacy: 'Wired Geese es el nombre que uso para el software que creo.',
            accountability: 'Trabajo directamente en los productos y sigo siendo responsable de las decisiones que hay detrás.',
            productLink: '/es/products/',
        },
    };

    for (const [locale, expected] of Object.entries(locales)) {
        const html = renderHome(locale);
        const products = html.indexOf('id="products"');
        const maker = html.indexOf('id="maker"');

        assert.match(html, new RegExp(`<title>${expected.title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}</title>`));
        assert.match(html, new RegExp(expected.maker.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
        assert.match(html, new RegExp(expected.brand.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
        assert.doesNotMatch(html, new RegExp(expected.legacy.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
        assert.match(html, new RegExp(expected.accountability.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
        assert.match(html, new RegExp(`href="${expected.productLink}"`));
        assert.ok(products >= 0 && products < maker, `${locale} keeps product discovery before maker identity`);
    }
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
