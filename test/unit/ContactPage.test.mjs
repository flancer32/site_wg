import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';
import {fileURLToPath} from 'node:url';

import nunjucks from 'nunjucks';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const locales = {
    en: {
        default: 'Tell me what you need a product to do.',
        product: 'Ask about a product.',
        telegram: 'Ask about ChatGPT + Telegram.',
        title: 'Contact Alex Gusev — product inquiries and adaptation',
    },
    ru: {
        default: 'Расскажите, что должен делать продукт.',
        product: 'Спросить о продукте.',
        telegram: 'Спросить о ChatGPT + Telegram.',
        title: 'Связаться с Алексом Гусевым — вопросы о продуктах и адаптации',
    },
    es: {
        default: 'Cuéntame qué necesitas que haga un producto.',
        product: 'Consulta sobre un producto.',
        telegram: 'Consulta sobre ChatGPT + Telegram.',
        title: 'Contactar con Alex Gusev — consultas de producto y adaptación',
    },
};

function render(locale, contactTopic) {
    const environment = nunjucks.configure(path.join(root, 'tmpl', 'web', locale), {autoescape: true});
    return environment.render('contact.html', {
        allowedLocales: ['en', 'ru', 'es'],
        locale,
        contactTopic,
    });
}

test('renders product-oriented Contact variants in every maintained locale', () => {
    for (const [locale, copy] of Object.entries(locales)) {
        const defaultHtml = render(locale, 'default');
        const productHtml = render(locale, 'product');
        const telegramHtml = render(locale, 'chatgpt-telegram');

        assert.ok(defaultHtml.includes(copy.default));
        assert.ok(productHtml.includes(copy.product));
        assert.ok(telegramHtml.includes(copy.telegram));
        assert.ok(defaultHtml.includes(`<title>${copy.title}</title>`));
        assert.match(telegramHtml, /credentials|учётные данные|credenciales/i);
        assert.match(telegramHtml, /session files|файлы сессий|archivos de sesión/i);
        assert.match(telegramHtml, /access tokens|токены доступа|tokens de acceso/i);

        for (const html of [defaultHtml, productHtml, telegramHtml]) {
            assert.doesNotMatch(html, /GitHub Flows|Agent Orchestration PoC|Repository pilot|Пилот в репозитории|Piloto en un repositorio/i);
            assert.doesNotMatch(html, /\/land\/agent-orchestration-poc\//);
            assert.doesNotMatch(html, /€50|50 €|35\/hour|35 € por hora|35 € в час/);
        }
    }
});

test('falls back to the generic Contact variant without rendering unknown input', () => {
    const unknown = '<script>alert("topic")</script>';
    const html = render('en', unknown);

    assert.match(html, /Tell me what you need a product to do\./);
    assert.doesNotMatch(html, /alert\("topic"\)/);
});

test('active product paths carry meaningful Contact topics and the footer stays plain', async () => {
    for (const locale of Object.keys(locales)) {
        const home = await fs.readFile(path.join(root, 'tmpl', 'web', locale, 'index.html'), 'utf8');
        const nav = await fs.readFile(path.join(root, 'tmpl', 'web', locale, 'inc', 'nav.html'), 'utf8');
        const footer = await fs.readFile(path.join(root, 'tmpl', 'web', locale, 'inc', 'footer.html'), 'utf8');
        const product = await fs.readFile(path.join(root, 'tmpl', 'web', locale, 'products', 'chatgpt-telegram.html'), 'utf8');

        assert.match(home, /href="\/\{\{ locale \}\}\/contact\.html\?topic=product"/);
        assert.doesNotMatch(home, /topic=product-adaptation/);
        assert.match(nav, /href="\/\{\{ locale \}\}\/contact\.html\?topic=product"/);
        assert.match(product, /href="\/\{\{ locale \}\}\/contact\.html\?topic=chatgpt-telegram"/);
        assert.match(footer, /href="\/\{\{ locale \}\}\/contact\.html"/);
        assert.doesNotMatch(footer, /contact\.html\?topic=/);
    }
});
