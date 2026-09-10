import assert from 'node:assert/strict';
import path from 'node:path';
import test from 'node:test';
import {fileURLToPath} from 'node:url';
import nunjucks from 'nunjucks';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');

test('Work With Me preserves its route while supporting aligned work beyond product customization', () => {
    for (const locale of ['en', 'ru', 'es']) {
        const html = nunjucks.configure(path.join(root, 'tmpl', 'web', locale), {autoescape: true}).render('work-with-me.html', {
            allowedLocales: ['en', 'ru', 'es'], locale, canonicalUrl: `https://wiredgeese.com/${locale}/work-with-me.html`, alternateUrls: {},
        });
        assert.match(html, /MCP/);
        assert.match(html, /ADSM/);
        assert.match(html, /Scope and price|Объём и цена|alcance y el precio/u);
        assert.match(html, new RegExp(`href="/${locale}/contact\\.html\\?topic=mcp-integration"`));
        assert.match(html, new RegExp(`href="/${locale}/contact\\.html\\?topic=commercial"`));
        assert.doesNotMatch(html, /GitHub Flows|Agent Orchestration PoC|<form\b|€\d|\$\d/u);
    }
});
