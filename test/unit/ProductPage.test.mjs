import assert from 'node:assert/strict';
import path from 'node:path';
import test from 'node:test';
import {fileURLToPath} from 'node:url';
import nunjucks from 'nunjucks';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');

test('ChatGPT + Telegram remains a localized paid-validation route with commercial, model, and Journal paths', () => {
    for (const locale of ['en', 'ru', 'es']) {
        const html = nunjucks.configure(path.join(root, 'tmpl', 'web', locale), {autoescape: true}).render('products/chatgpt-telegram.html', {allowedLocales: ['en', 'ru', 'es'], locale});
        assert.match(html, /paid early[- ]access|Платный ранний доступ|Acceso anticipado/iu);
        assert.match(html, /validation|проверка|validación/u);
        assert.match(html, new RegExp(`href="/${locale}/contact\\.html\\?topic=chatgpt-telegram"`));
        assert.match(html, new RegExp(`href="/${locale}/products/"`));
        assert.match(html, new RegExp(`href="/${locale}/how-it-works\\.html"`));
        assert.match(html, new RegExp(`href="/${locale}/blog/"`));
        assert.doesNotMatch(html, /enterprise-grade|zero-risk|fixed monthly price/i);
    }
});
