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

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');

async function fixture() {
    const root = await fs.mkdtemp(path.join(os.tmpdir(), 'wg-markdown-'));
    const directory = path.join(root, 'tmpl/web/en/blog/2026');
    const russianDirectory = path.join(root, 'tmpl/web/ru/blog/2026');
    const spanishDirectory = path.join(root, 'tmpl/web/es/blog/2026');
    await fs.mkdir(directory, {recursive: true});
    await fs.mkdir(russianDirectory, {recursive: true});
    await fs.mkdir(spanishDirectory, {recursive: true});
    const source = `---\ntitle: "A title"\ndescription: "A description"\ndate: 2026-09-23\nrelations:\n  - pde\n---\n\n# A title\n\nMarkdown **body**.`;
    await fs.writeFile(path.join(directory, 'article.md'), source);
    await fs.writeFile(path.join(russianDirectory, 'article.md'), source.replaceAll('A title', 'Русский заголовок'));
    await fs.writeFile(path.join(spanishDirectory, 'article.md'), source.replaceAll('A title', 'Título en español'));
    const russianLibraryDirectory = path.join(root, 'tmpl/web/ru/library/concepts');
    await fs.mkdir(russianLibraryDirectory, {recursive: true});
    await fs.writeFile(path.join(russianLibraryDirectory, 'article.md'), source.replaceAll('A title', 'Русский заголовок'));
    await fs.mkdir(path.join(root, 'tmpl/web'), {recursive: true});
    await fs.writeFile(path.join(root, 'tmpl/web/llms.txt'), 'Discovery\n');
    const publication = new Publication({fs, path, marked, tmplConfig: {getRootPath: () => root}});
    return {root, source, publication};
}

/** @param {string} locale @returns {Promise<{locale: string, year: string, slug: string, representation: 'html'}[]>} */
async function collectJournalRoutes(locale) {
    const blogRoot = path.join(projectRoot, 'tmpl/web', locale, 'blog');
    const years = await fs.readdir(blogRoot, {withFileTypes: true});
    const routes = [];
    for (const year of years.filter((entry) => entry.isDirectory()).map((entry) => entry.name).sort()) {
        const directory = path.join(blogRoot, year);
        const files = await fs.readdir(directory, {withFileTypes: true});
        for (const file of files.filter((entry) => entry.isFile() && entry.name.endsWith('.md')).map((entry) => entry.name).sort()) {
            routes.push({locale, year, slug: file.slice(0, -'.md'.length), representation: 'html'});
        }
        assert.deepEqual(files.filter((entry) => entry.isFile() && entry.name.endsWith('.html')).map((entry) => entry.name), []);
    }
    return routes;
}

/** @param {string} locale @returns {Promise<{locale: string, directory: string[], slug: string, representation: 'html'}[]>} */
async function collectLibraryRoutes(locale) {
    const libraryRoot = path.join(projectRoot, 'tmpl/web', locale, 'library');
    const routes = [];
    async function walk(directory, relative = []) {
        const entries = await fs.readdir(directory, {withFileTypes: true});
        for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name))) {
            const fullPath = path.join(directory, entry.name);
            if (entry.isDirectory()) await walk(fullPath, [...relative, entry.name]);
            else if (entry.isFile() && entry.name.endsWith('.md')) {
                routes.push({type: 'library', locale, directory: relative, slug: entry.name.slice(0, -'.md'.length), representation: 'html'});
            } else if (entry.isFile() && entry.name.endsWith('.html') && entry.name !== 'index.html') {
                assert.fail(`Library article remains in HTML: ${fullPath}`);
            }
        }
    }
    await walk(libraryRoot);
    return routes;
}

test('parses a canonical Markdown source and rejects non-public paths', async () => {
    const {publication, source} = await fixture();
    const route = publication.parseRoute('/en/blog/2026/article.html');
    assert.deepEqual(route, {type: 'blog', locale: 'en', year: '2026', slug: 'article', representation: 'html'});
    const article = await publication.load(route);
    assert.equal(article.source, source);
    assert.equal(article.metadata.title, 'A title');
    assert.deepEqual(article.metadata.relations, ['pde']);
    assert.match(article.html, /<strong>body<\/strong>/);
    assert.equal(publication.parseRoute('/ctx/docs/architecture/state.md'), null);
    assert.equal(publication.parseRoute('/en/blog/2026/%2e%2e%2fstate.md'), null);
});

test('publishes every localized Library article from Markdown at stable HTML and Markdown routes', async () => {
    const publication = new Publication({fs, path, marked, tmplConfig: {getRootPath: () => projectRoot}});
    const routesByLocale = await Promise.all(['en', 'ru', 'es'].map(collectLibraryRoutes));
    assert.equal(routesByLocale[0].length, 43);
    const routeKey = ({directory, slug}) => [...directory, slug].join('/');
    const englishPaths = routesByLocale[0].map(routeKey);
    assert.deepEqual(routesByLocale[1].map(routeKey), englishPaths);
    assert.deepEqual(routesByLocale[2].map(routeKey), englishPaths);
    for (const routes of routesByLocale) {
        for (const route of routes) {
            const article = await publication.load(route);
            assert.ok(article, `${route.locale}/library/${routeKey(route)}`);
            assert.equal(typeof article.metadata.title, 'string');
            assert.equal(typeof article.metadata.description, 'string');
            assert.match(article.metadata.date, /^\d{4}-\d{2}-\d{2}$/);
            assert.match(article.body, /\S/);
            const htmlUrl = `/${route.locale}/library/${routeKey(route)}.html`;
            const mdUrl = `/${route.locale}/library/${routeKey(route)}.md`;
            assert.deepEqual(publication.parseRoute(htmlUrl), {...route, type: 'library'});
            assert.deepEqual(publication.parseRoute(mdUrl), {...route, type: 'library', representation: 'md'});
        }
    }
    const sitemap = await fs.readFile(path.join(projectRoot, 'web/sitemap.xml'), 'utf8');
    for (const relative of englishPaths) {
        assert.match(sitemap, new RegExp(`https://wiredgeese\\.com/en/library/${relative.replaceAll('/', '\\/')}\\.html`));
    }
    assert.doesNotMatch(sitemap, /\.md<\/loc>/);
    const llms = await fs.readFile(path.join(projectRoot, 'tmpl/web/llms.txt'), 'utf8');
    const links = llms.match(/(?<=^- )https:\/\/wiredgeese\.com\/en\/library\/[^\s]+\.md$/gm) ?? [];
    assert.deepEqual(links, routesByLocale[0].map((route) =>
        `https://wiredgeese.com/en/library/${routeKey(route)}.md`));
});

test('parses and renders Library Markdown without Journal-only metadata', async () => {
    const root = await fs.mkdtemp(path.join(os.tmpdir(), 'wg-library-'));
    const directory = path.join(root, 'tmpl/web/en/library/methodology');
    await fs.mkdir(directory, {recursive: true});
    const source = await fs.readFile(path.join(projectRoot, 'tmpl/web/en/library/methodology/doc-principles.md'), 'utf8');
    await fs.writeFile(path.join(directory, 'doc-principles.md'), source);
    const publication = new Publication({fs, path, marked, tmplConfig: {getRootPath: () => root}});
    const route = publication.parseRoute('/en/library/methodology/doc-principles.html');
    assert.deepEqual(route, {type: 'library', locale: 'en', directory: ['methodology'], slug: 'doc-principles', representation: 'html'});
    const article = await publication.load(route);
    assert.equal(article.metadata.title, 'Key Principles of Documentation Creation');
    assert.equal(article.metadata.date, '2025-02-12');
    assert.match(article.html, /<h2>Terminology<\/h2>/);
    assert.match(article.html, /<zoom-img[\s\S]*src="\/img\/brand\/doc\.svg"/);
    assert.doesNotMatch(article.html, /Publication date:/);
});

test('serves raw Markdown routes in every locale and exposes localized HTML', async () => {
    const {root, source, publication} = await fixture();
    const calls = [];
    const handler = new Markdown({
        http2, fs, path,
        respond: {isWritable: () => true, code200_Ok: (payload) => calls.push(payload)},
        dtoInfo: {create: (info) => info},
        config: {getBaseUrl: () => 'https://wiredgeese.com'},
        tmplConfig: {getRootPath: () => root, getAvailableLocales: () => ['en', 'ru', 'es']},
        servTmplRender: {perform: async ({data}) => ({content: `<html>${data.markdownUrl ? `<link rel="alternate" type="text/markdown" href="${data.markdownUrl}">` : ''}${data.article.html}</html>`})},
        publication, STAGE: {PROCESS: 'PROCESS'},
    });
    const html = {request: {method: 'GET', url: '/en/blog/2026/article.html'}, response: {}, completed: false};
    await handler.handle(html);
    assert.equal(html.completed, true);
    assert.equal(calls[0].headers['content-type'], 'text/html; charset=utf-8');
    assert.match(calls[0].body, /<strong>body<\/strong>/);
    const markdown = {request: {method: 'GET', url: '/en/blog/2026/article.md'}, response: {}, completed: false};
    await handler.handle(markdown);
    assert.equal(calls[1].headers['content-type'], 'text/markdown; charset=utf-8');
    assert.equal(calls[1].body, source);
    const russianHtml = {request: {method: 'GET', url: '/ru/blog/2026/article.html'}, response: {}, completed: false};
    await handler.handle(russianHtml);
    assert.equal(russianHtml.completed, true);
    assert.match(calls[2].body, /Русский заголовок/u);
    assert.match(calls[2].body, /type="text\/markdown" href="https:\/\/wiredgeese\.com\/ru\/blog\/2026\/article\.md"/);
    const russianMarkdown = {request: {method: 'GET', url: '/ru/blog/2026/article.md'}, response: {}, completed: false};
    await handler.handle(russianMarkdown);
    assert.equal(russianMarkdown.completed, true);
    assert.equal(calls[3].headers['content-type'], 'text/markdown; charset=utf-8');
    assert.match(calls[3].body, /Русский заголовок/);
    const russianLibraryMarkdown = {request: {method: 'GET', url: '/ru/library/concepts/article.md'}, response: {}, completed: false};
    await handler.handle(russianLibraryMarkdown);
    assert.equal(russianLibraryMarkdown.completed, true);
    assert.equal(calls[4].headers['content-type'], 'text/markdown; charset=utf-8');
    assert.match(calls[4].body, /Русский заголовок/);
    const russianLibraryHtml = {request: {method: 'GET', url: '/ru/library/concepts/article.html'}, response: {}, completed: false};
    await handler.handle(russianLibraryHtml);
    assert.equal(russianLibraryHtml.completed, true);
    assert.match(calls[5].body, /type="text\/markdown" href="https:\/\/wiredgeese\.com\/ru\/library\/concepts\/article\.md"/);
    const spanishHtml = {request: {method: 'GET', url: '/es/blog/2026/article.html'}, response: {}, completed: false};
    await handler.handle(spanishHtml);
    assert.equal(spanishHtml.completed, true);
    assert.match(calls[6].body, /type="text\/markdown" href="https:\/\/wiredgeese\.com\/es\/blog\/2026\/article\.md"/);
    const spanishMarkdown = {request: {method: 'GET', url: '/es/blog/2026/article.md'}, response: {}, completed: false};
    await handler.handle(spanishMarkdown);
    assert.equal(spanishMarkdown.completed, true);
    assert.equal(calls[7].headers['content-type'], 'text/markdown; charset=utf-8');
    assert.match(calls[7].body, /Título en español/);
    const missing = {request: {method: 'GET', url: '/en/blog/2026/missing.md'}, response: {}, completed: false};
    await handler.handle(missing);
    assert.equal(missing.completed, false);
    const llms = {request: {method: 'GET', url: '/llms.txt'}, response: {}, completed: false};
    await handler.handle(llms);
    assert.equal(calls[8].body, 'Discovery\n');
});

test('uses locale-specific Markdown for the complete Journal and indexes only the English corpus', async () => {
    const publication = new Publication({fs, path, marked, tmplConfig: {getRootPath: () => projectRoot}});
    const routesByLocale = await Promise.all(['en', 'ru', 'es'].map(collectJournalRoutes));
    for (const routes of routesByLocale) {
        assert.equal(routes.length, 79);
        for (const route of routes) {
            const article = await publication.load(route);
            assert.ok(article, `${route.locale}/${route.year}/${route.slug}`);
            assert.equal(typeof article.metadata.title, 'string');
            assert.equal(typeof article.metadata.description, 'string');
            assert.match(article.body, /\S/);
        }
    }
    const englishPaths = routesByLocale[0].map((route) => `${route.year}/${route.slug}`);
    assert.deepEqual(routesByLocale[1].map((route) => `${route.year}/${route.slug}`), englishPaths);
    assert.deepEqual(routesByLocale[2].map((route) => `${route.year}/${route.slug}`), englishPaths);
    const links = (await fs.readFile(path.join(projectRoot, 'tmpl/web/llms.txt'), 'utf8'))
        .match(/(?<=^- )https:\/\/wiredgeese\.com\/en\/blog\/[^\s]+\.md$/gm) ?? [];
    const expectedLinks = routesByLocale[0].map((route) =>
        `https://wiredgeese.com/en/blog/${route.year}/${route.slug}.md`);
    assert.deepEqual(links, expectedLinks);
    assert.doesNotMatch(await fs.readFile(path.join(projectRoot, 'tmpl/web/llms.txt'), 'utf8'),
        /https:\/\/wiredgeese\.com\/(?:ru|es)\/blog\/[^\s]+\.md/);
    const sitemap = await fs.readFile(path.join(projectRoot, 'web/sitemap.xml'), 'utf8');
    assert.doesNotMatch(sitemap, /\.md<\/loc>/);
    for (const link of links) {
        assert.match(sitemap, new RegExp(link.replace('.md', '.html')));
    }
});
