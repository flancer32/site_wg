import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import * as http2 from 'node:http2';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import {fileURLToPath} from 'node:url';
import * as marked from 'marked';

import Publication from '../../src/Back/Web/Markdown/Publication.js';
import Markdown from '../../src/Back/Web/Handler/Markdown.js';
import Metadata from '../../src/Back/Web/Metadata.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const locales = ['en', 'ru', 'es'];
const dates = ['2026-09-21', '2026-09-22', '2026-09-23'];
const prefix = '/products/pde/telegram-digest/';
const publication = new Publication({fs, path, marked, tmplConfig: {getRootPath: () => root}});

test('resolves the bounded digest routes and rejects malformed paths and unsupported locales', async () => {
    for (const locale of locales) {
        assert.deepEqual(publication.parseRoute(`/${locale}${prefix}`),
            {type: 'telegram-digest', locale, slug: 'index', representation: 'html'});
        assert.deepEqual(publication.parseRoute(`/${locale}${prefix}index.md`),
            {type: 'telegram-digest', locale, slug: 'index', representation: 'md'});
        for (const date of dates) for (const representation of ['md', 'html']) {
            assert.deepEqual(publication.parseRoute(`/${locale}${prefix}${date}.${representation}`),
                {type: 'telegram-digest', locale, slug: date, representation});
        }
    }
    for (const url of [
        '/fr/products/pde/telegram-digest/',
        '/en/products/pde/telegram-digest/index.html',
        '/en/products/pde/telegram-digest/2026-09-23/',
        '/en/products/pde/telegram-digest/2026-09-23.md%ZZ',
        '/en/products/pde/telegram-digest/../2026-09-23.md',
        '/en/products/pde/telegram-digest/%2e%2e%2f2026-09-23.md',
        '/en/products/other/telegram-digest/2026-09-23.md',
    ]) assert.equal(publication.parseRoute(url), null, url);
    for (const route of [
        {type: 'telegram-digest', locale: 'fr', slug: 'index'},
        {type: 'telegram-digest', locale: 'en', slug: '../index'},
        {type: 'telegram-digest', locale: 'en', slug: 'other'},
    ]) assert.equal(await publication.load(route), null);
});

test('loads all locale sources with dated metadata, matching inventories, and no authored HTML', async () => {
    for (const locale of locales) {
        const directory = path.join(root, 'tmpl/web', locale, 'products/pde/telegram-digest');
        const entries = (await fs.readdir(directory)).sort();
        assert.deepEqual(entries, [...dates.map((date) => `${date}.md`), 'index.md'].sort());
        const index = await publication.load(publication.parseRoute(`/${locale}${prefix}index.md`));
        assert.ok(index);
        assert.equal(index.metadata.date, '');
        assert.match(index.metadata.title, /Telegram|Телеграм/u);
        const linkedDates = [...index.body.matchAll(/^- (\d{4}-\d{2}-\d{2}) — /gm)].map((match) => match[1]);
        assert.deepEqual(linkedDates, [...dates].reverse());
        for (const date of dates) {
            assert.match(index.body, new RegExp(`\\[HTML\\]\\(\\./${date}\\.html\\)`));
            assert.match(index.body, new RegExp(`\\[Markdown\\]\\(\\./${date}\\.md\\)`));
            const article = await publication.load(publication.parseRoute(`/${locale}${prefix}${date}.html`));
            assert.ok(article);
            assert.equal(article.metadata.date, date);
            assert.ok(article.metadata.title && article.metadata.description);
            assert.match(article.html, /<h1>/);
        }
    }
});

test('serves digest Markdown and SSR HTML with canonical and locale alternate URLs for GET and HEAD', async () => {
    const calls = [];
    const rendered = [];
    const handler = new Markdown({
        http2, fs, path,
        respond: {isWritable: () => true, code200_Ok: (response) => calls.push(response)},
        dtoInfo: {create: (info) => info},
        metadata: new Metadata({config: {getBaseUrl: () => 'https://wiredgeese.com'}, tmplConfig: {getAvailableLocales: () => locales}}),
        tmplConfig: {getRootPath: () => root, getAvailableLocales: () => locales},
        servTmplRender: {perform: async ({data}) => {
            rendered.push(data);
            return {content: `<html><link rel="alternate" type="text/markdown" href="${data.markdownUrl}">${data.article.html}</html>`};
        }},
        publication, STAGE: {PROCESS: 'PROCESS'},
    });
    for (const locale of locales) for (const slug of ['index', ...dates]) {
        const htmlRoute = `/${locale}${prefix}${slug === 'index' ? '' : `${slug}.html`}`;
        const mdRoute = `/${locale}${prefix}${slug}.md`;
        for (const [url, type] of [[htmlRoute, 'text/html'], [mdRoute, 'text/markdown']]) {
            const context = {request: {method: 'GET', url}, response: {}, completed: false};
            await handler.handle(context);
            assert.equal(context.completed, true, url);
            const response = calls.at(-1);
            assert.equal(response.headers['content-type'], `${type}; charset=utf-8`);
            assert.match(response.body, /Вастрик.Ай/u);
        }
        const data = rendered.at(-1);
        assert.equal(data.canonicalUrl, `https://wiredgeese.com${htmlRoute}`);
        assert.equal(data.markdownUrl, `https://wiredgeese.com${mdRoute}`);
        assert.deepEqual(data.alternateUrls, Object.fromEntries(locales.map((other) =>
            [other, `https://wiredgeese.com/${other}${prefix}${slug === 'index' ? '' : `${slug}.html`}`])));
        assert.equal(data.isPublication, false);
        assert.equal(data.isLibrary, false);
        assert.equal(data.isDigest, true);
        for (const url of [htmlRoute, mdRoute]) {
            const context = {request: {method: 'HEAD', url}, response: {}, completed: false};
            await handler.handle(context);
            assert.equal(context.completed, true);
            assert.equal(calls.at(-1).body, '');
            assert.ok(calls.at(-1).headers['content-length'] > 0);
        }
    }
});

test('shared SSR article template renders the digest index and dated entries without Journal or Library treatment', async () => {
    const {default: nunjucks} = await import('nunjucks');
    const template = await fs.readFile(path.join(root, 'tmpl/web/markdown-article.html'), 'utf8');
    for (const locale of locales) for (const slug of ['index', dates.at(-1)]) {
        const route = publication.parseRoute(`/${locale}${prefix}${slug === 'index' ? '' : `${slug}.html`}`);
        const article = await publication.load(route);
        const cleanPath = `${prefix}${slug === 'index' ? '' : `${slug}.html`}`;
        const urls = new Metadata({config: {getBaseUrl: () => 'https://wiredgeese.com'},
            tmplConfig: {getAvailableLocales: () => locales}}).forRoute(locale, cleanPath);
        const markdownUrl = `https://wiredgeese.com/${locale}${prefix}${slug}.md`;
        const environment = new nunjucks.Environment(new nunjucks.FileSystemLoader(path.join(root, 'tmpl/web', locale)), {autoescape: true});
        const html = environment.renderString(template, {
            locale, allowedLocales: locales, ...urls, markdownUrl,
            isDigest: true, isPublication: false, isLibrary: false,
            article: {...article.metadata, html: article.html},
        });
        assert.match(html, /<article class="card digest-article">/);
        assert.match(html, new RegExp(`rel="canonical" href="${urls.canonicalUrl}"`));
        assert.match(html, new RegExp(`type="text/markdown" href="${markdownUrl}"`));
        assert.match(html, /hreflang="x-default"/);
        assert.doesNotMatch(html, /class="card blog-post"|class="card library-article"/);
        if (slug === 'index') assert.doesNotMatch(html, /<time datetime=/);
        else assert.match(html, /<time datetime="2026-09-23">/);
    }
});

test('rejects a digest source symlink outside the publication root', async () => {
    const temporary = await fs.mkdtemp(path.join(os.tmpdir(), 'wg-digest-'));
    const directory = path.join(temporary, 'tmpl/web/en/products/pde/telegram-digest');
    await fs.mkdir(directory, {recursive: true});
    await fs.writeFile(path.join(temporary, 'private.md'), '---\ntitle: Secret\ndescription: Secret\n---\n\n# Secret');
    await fs.symlink(path.join(temporary, 'private.md'), path.join(directory, 'index.md'));
    const isolated = new Publication({fs, path, marked, tmplConfig: {getRootPath: () => temporary}});
    assert.equal(await isolated.load(isolated.parseRoute('/en/products/pde/telegram-digest/index.md')), null);
    await fs.rm(temporary, {recursive: true, force: true});
});

test('sitemap and discovery expose canonical digest routes only; Current Work links to the demo', async () => {
    const sitemap = await fs.readFile(path.join(root, 'web/sitemap.xml'), 'utf8');
    for (const locale of locales) {
        for (const slug of ['', ...dates.map((date) => `${date}.html`)]) {
            assert.match(sitemap, new RegExp(`<loc>https://wiredgeese\\.com/${locale}${prefix}${slug}</loc>`));
        }
        const work = await fs.readFile(path.join(root, 'tmpl/web', locale, 'projects.html'), 'utf8');
        assert.match(work, /Telegram Desk[\s\S]*?href="\/\{\{ locale \}\}\/products\/pde\/telegram-digest\/"/);
    }
    assert.doesNotMatch(sitemap, /telegram-digest\/index\.html/);
    assert.doesNotMatch(sitemap, /telegram-digest\/[^<]*\.md<\/loc>/);
    const llms = await fs.readFile(path.join(root, 'tmpl/web/llms.txt'), 'utf8');
    const digestLinks = llms.split('\n').filter((line) => line.includes('/products/pde/telegram-digest/'));
    assert.deepEqual(digestLinks, ['- https://wiredgeese.com/en/products/pde/telegram-digest/index.md']);
});
