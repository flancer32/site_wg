import assert from 'node:assert/strict';
import path from 'node:path';
import test from 'node:test';
import {fileURLToPath} from 'node:url';

import nunjucks from 'nunjucks';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const locales = {
    en: {
        aboutTitle: 'About Alex Gusev — independent software maker | Wired Geese',
        aboutMaker: 'I am an independent software maker.',
        aboutWork: 'See how we can adapt a product',
        title: 'Work with Alex Gusev — product setup and adaptation | Wired Geese',
        opening: 'Work directly with me around a product.',
        scope: 'Scope and price are agreed before setup or development work begins.',
    },
    ru: {
        aboutTitle: 'Об Алексе Гусеве — независимый создатель ПО | Wired Geese',
        aboutMaker: 'Я независимый создатель ПО.',
        aboutWork: 'Узнать об адаптации продукта',
        title: 'Работа с Алексом Гусевым — настройка и адаптация продуктов | Wired Geese',
        opening: 'Работайте со мной вокруг продукта.',
        scope: 'Объём работ и цена согласуются до начала настройки или разработки.',
    },
    es: {
        aboutTitle: 'Sobre Alex Gusev — creador independiente de software | Wired Geese',
        aboutMaker: 'Soy un creador independiente de software.',
        aboutWork: 'Ver cómo podemos adaptar un producto',
        title: 'Trabaja con Alex Gusev — configuración y adaptación de productos | Wired Geese',
        opening: 'Trabaja directamente conmigo alrededor de un producto.',
        scope: 'El alcance y el precio se acuerdan antes de que empiece la configuración o el desarrollo.',
    },
};

function render(locale, template) {
    const route = template === 'about.html' ? 'about.html' : 'work-with-me.html';
    const environment = nunjucks.configure(path.join(root, 'tmpl', 'web', locale), {autoescape: true});
    return environment.render(template, {
        allowedLocales: ['en', 'ru', 'es'],
        alternateUrls: Object.fromEntries(['en', 'ru', 'es'].map((target) => [target, `https://wiredgeese.com/${target}/${route}`])),
        canonicalUrl: `https://wiredgeese.com/${locale}/${route}`,
        locale,
    });
}

test('retains Work With Me as a localized product-led engagement route', () => {
    for (const [locale, copy] of Object.entries(locales)) {
        const html = render(locale, 'work-with-me.html');

        assert.match(html, new RegExp(`<title>${copy.title}</title>`));
        assert.match(html, new RegExp(`<link rel="canonical" href="https://wiredgeese\\.com/${locale}/work-with-me\\.html">`));
        assert.ok(html.includes(copy.opening), `${locale}: product-led opening`);
        assert.ok(html.includes(copy.scope), `${locale}: scope and price before work`);
        assert.match(html, new RegExp(`href="/${locale}/products/"`));
        assert.match(html, new RegExp(`href="/${locale}/products/chatgpt-telegram\\.html"`));
        assert.match(html, new RegExp(`href="/${locale}/contact\\.html\\?topic=product"`));
        assert.match(html, new RegExp(`href="/${locale}/how-it-works\\.html"`));
        assert.doesNotMatch(html, /GitHub Flows|Agent Orchestration PoC|mailto:|<form\b|noindex|€\d|\$\d/u);
        assert.doesNotMatch(html, /Architecture &amp; agent-readiness review|Focused build or rescue|Agent-driven engineering system|Архитектурный аудит|спасение системы|Система агентской разработки|Revisión de arquitectura|recuperación focalizada|Sistema de ingeniería con agentes/u);
    }
});

test('About presents Alex as the accountable maker and hands off to products', () => {
    for (const [locale, copy] of Object.entries(locales)) {
        const html = render(locale, 'about.html');

        assert.match(html, new RegExp(`<title>${copy.aboutTitle}</title>`));
        assert.match(html, new RegExp(`<link rel="canonical" href="https://wiredgeese\\.com/${locale}/about\\.html">`));
        assert.ok(html.includes(copy.aboutMaker), `${locale}: maker identity`);
        assert.ok(html.includes(copy.aboutWork), `${locale}: product-led Work With Me handoff`);
        assert.match(html, new RegExp(`href="/${locale}/products/"`));
        assert.match(html, new RegExp(`href="/${locale}/work-with-me\\.html"`));
        assert.doesNotMatch(html, /senior hands-on web engineer|независимый системный инженер|ingeniero de sistemas independiente|noindex/u);
    }
});
