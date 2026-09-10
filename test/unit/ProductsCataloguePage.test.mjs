import assert from 'node:assert/strict';
import path from 'node:path';
import test from 'node:test';
import {fileURLToPath} from 'node:url';
import nunjucks from 'nunjucks';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const titles = {en: 'Current commercial entries.', ru: 'Текущие коммерческие возможности.', es: 'Opciones comerciales actuales.'};

test('retained Products route renders distinct truthful commercial entry kinds in every locale', () => {
    for (const [locale, title] of Object.entries(titles)) {
        const html = nunjucks.configure(path.join(root, 'tmpl', 'web', locale), {autoescape: true}).render('products/index.html', {
            allowedLocales: ['en', 'ru', 'es'], locale,
            canonicalUrl: `https://wiredgeese.com/${locale}/products/`, alternateUrls: {},
        });
        assert.ok(html.includes(title));
        assert.match(html, /MCP/);
        assert.match(html, /Provisional|Предварительное|Provisional/u);
        assert.match(html, /ChatGPT \+ Telegram/);
        assert.match(html, /paid validation|платной проверки|validación de pago/u);
        assert.match(html, /leanpub\.com\/adsm-ru/);
        assert.match(html, /leanpub\.com\/adsm-en/);
        assert.match(html, /bhv\.ru\/product\/brauzer/);
        assert.match(html, new RegExp(`href="/${locale}/contact\\.html\\?topic=mcp-integration"`));
        assert.match(html, new RegExp(`href="/${locale}/products/chatgpt-telegram\\.html"`));
        assert.doesNotMatch(html, /fixed monthly price|фиксированн(?:ая|ой) ежемесячн|precio mensual fijo/i);
    }
});
