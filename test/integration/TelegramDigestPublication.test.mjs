import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';
import {fileURLToPath} from 'node:url';
import * as marked from 'marked';

import Publication from '../../src/Back/Web/Markdown/Publication.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const locales = ['en', 'ru', 'es'];
const prefix = '/products/pde/telegram-digest/';
const publication = new Publication({fs, path, marked, tmplConfig: {getRootPath: () => root}});

test('digest routes expose only localized notices and no dated archive', async () => {
    for (const locale of locales) {
        const route = publication.parseRoute('/' + locale + prefix);
        assert.deepEqual(route, {type: 'digest-notice', locale, slug: 'index', representation: 'html'});
        assert.deepEqual(publication.parseRoute('/' + locale + prefix + 'index.md'),
            {type: 'digest-notice', locale, slug: 'index', representation: 'md'});
        for (const datedRoute of ['/2026-09-21.md', '/2026-09-21.html'])
            assert.equal(publication.parseRoute('/' + locale + prefix + datedRoute.slice(1)), null, datedRoute);

        const notice = await publication.load(route);
        assert.ok(notice);
        assert.match(notice.body, /hidden from this website|скрыт на этом сайте|(?:архив.*скрыт|archivo.*oculto)/iu);
        assert.ok(notice.body.includes('https://vas3k.club/room/ai/chat/'));
        const entries = (await fs.readdir(path.join(root, 'tmpl/web', locale, 'products/pde/telegram-digest'))).sort();
        assert.deepEqual(entries, ['index.md']);
    }
});

test('Current Work, llms.txt, and sitemap do not link to digest content or archives', async () => {
    const sitemap = await fs.readFile(path.join(root, 'web/sitemap.xml'), 'utf8');
    for (const locale of locales) {
        assert.ok(sitemap.includes('<loc>https://wiredgeese.com/' + locale + prefix + '</loc>'));
        assert.ok(!sitemap.includes('/' + locale + prefix + '2026-09-21'));
        const work = await fs.readFile(path.join(root, 'tmpl/web', locale, 'projects.html'), 'utf8');
        assert.ok(!work.includes('/products/pde/telegram-digest/'));
    }
    const llms = await fs.readFile(path.join(root, 'tmpl/web/llms.txt'), 'utf8');
    assert.ok(!llms.includes('/products/pde/telegram-digest/'));
});
