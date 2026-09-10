import assert from 'node:assert/strict';
import path from 'node:path';
import test from 'node:test';
import {fileURLToPath} from 'node:url';
import nunjucks from 'nunjucks';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');

test('Alarisa remains an ongoing non-commercial proof and routes toward current work, Journal, and working model', () => {
    for (const locale of ['en', 'ru', 'es']) {
        const html = nunjucks.configure(path.join(root, 'tmpl', 'web', locale), {autoescape: true}).render('projects/alarisa.html', {allowedLocales: ['en', 'ru', 'es'], locale});
        assert.match(html, /not a product available to buy|не продукт, который можно купить|no un producto que se pueda comprar/u);
        assert.match(html, /paid early-access validation|платной проверки|validación de pago/u);
        assert.match(html, new RegExp(`href="/${locale}/projects\\.html"`));
        assert.match(html, new RegExp(`href="/${locale}/blog/"`));
        assert.match(html, new RegExp(`href="/${locale}/how-it-works\\.html"`));
    }
});
