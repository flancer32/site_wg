import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';
import {fileURLToPath} from 'node:url';

import nunjucks from 'nunjucks';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const locales = {
    en: {
        title: 'Early access',
        setup: 'Paid setup for an agreed workflow',
        cta: 'Ask about this product',
    },
    ru: {
        title: 'Ранний доступ',
        setup: 'Платная настройка согласованного сценария',
        cta: 'Спросить об этом продукте',
    },
    es: {
        title: 'Acceso anticipado',
        setup: 'Configuración de pago para un flujo acordado',
        cta: 'Consultar este producto',
    },
};

function renderProduct(locale) {
    const environment = nunjucks.configure(path.join(root, 'tmpl', 'web', locale), {autoescape: true});
    return environment.render('products/chatgpt-telegram.html', {
        allowedLocales: ['en', 'ru', 'es'],
        locale,
    });
}

test('renders localized ChatGPT + Telegram product pages with commercial boundaries', () => {
    for (const [locale, copy] of Object.entries(locales)) {
        const html = renderProduct(locale);
        assert.match(html, new RegExp(copy.title));
        assert.match(html, new RegExp(copy.setup));
        assert.match(html, new RegExp(`href="/${locale}/contact\\.html\\?topic=chatgpt-telegram">${copy.cta}`));
        assert.doesNotMatch(html, /enterprise-grade|zero-risk|fixed monthly price/i);
    }
});

test('localized product pages have resolvable local destinations', async () => {
    for (const locale of Object.keys(locales)) {
        const html = renderProduct(locale);
    const hrefs = [...html.matchAll(/\shref="([^"]+)"/g)].map((match) => match[1]);
    for (const href of hrefs) {
        const url = new URL(href, 'https://wiredgeese.com');
        if (url.origin !== 'https://wiredgeese.com' || !url.pathname.startsWith(`/${locale}/`)) continue;
        if (url.pathname.startsWith('/styles/') || url.pathname === '/favicon.ico' || url.pathname === `/${locale}/`) continue;
        const relative = url.pathname.replace(new RegExp(`^/${locale}/`), '');
        await assert.doesNotReject(fs.access(path.join(root, 'tmpl', 'web', locale, relative)), href);
    }
    }
});
