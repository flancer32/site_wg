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
    await fs.mkdir(directory, {recursive: true});
    const source = `---\ntitle: "A title"\ndescription: "A description"\ndate: 2026-09-23\nrelations:\n  - pde\n---\n\n# A title\n\nMarkdown **body**.`;
    await fs.writeFile(path.join(directory, 'article.md'), source);
    await fs.mkdir(path.join(root, 'tmpl/web'), {recursive: true});
    await fs.writeFile(path.join(root, 'tmpl/web/llms.txt'), 'Discovery\n');
    const publication = new Publication({fs, path, marked, tmplConfig: {getRootPath: () => root}});
    return {root, source, publication};
}

test('parses a canonical Markdown source and rejects non-public paths', async () => {
    const {publication, source} = await fixture();
    const route = publication.parseRoute('/en/blog/2026/article.html');
    assert.deepEqual(route, {locale: 'en', year: '2026', slug: 'article', representation: 'html'});
    const article = await publication.load(route);
    assert.equal(article.source, source);
    assert.equal(article.metadata.title, 'A title');
    assert.deepEqual(article.metadata.relations, ['pde']);
    assert.match(article.html, /<strong>body<\/strong>/);
    assert.equal(publication.parseRoute('/ctx/docs/architecture/state.md'), null);
    assert.equal(publication.parseRoute('/en/blog/2026/%2e%2e%2fstate.md'), null);
});

test('serves HTML and Markdown projections from one source plus llms discovery', async () => {
    const {root, source, publication} = await fixture();
    const calls = [];
    const handler = new Markdown({
        http2, fs, path,
        respond: {isWritable: () => true, code200_Ok: (payload) => calls.push(payload)},
        dtoInfo: {create: (info) => info},
        config: {getBaseUrl: () => 'https://wiredgeese.com'},
        tmplConfig: {getRootPath: () => root, getAvailableLocales: () => ['en', 'ru', 'es']},
        servTmplRender: {perform: async ({data}) => ({content: `<html>${data.article.html}</html>`})},
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
    const missing = {request: {method: 'GET', url: '/en/blog/2026/missing.md'}, response: {}, completed: false};
    await handler.handle(missing);
    assert.equal(missing.completed, false);
    const llms = {request: {method: 'GET', url: '/llms.txt'}, response: {}, completed: false};
    await handler.handle(llms);
    assert.equal(calls[2].body, 'Discovery\n');
});

test('the curated llms discovery links exactly the three migrated Markdown articles', async () => {
    const links = (await fs.readFile(path.join(projectRoot, 'tmpl/web/llms.txt'), 'utf8'))
        .match(/https:\/\/wiredgeese\.com\/en\/blog\/2026\/[^\s]+\.md/g) ?? [];
    assert.deepEqual(links, [
        'https://wiredgeese.com/en/blog/2026/20260910-01-current-work-evidence.md',
        'https://wiredgeese.com/en/blog/2026/20260810-01-teqfw-agent-skills.md',
        'https://wiredgeese.com/en/blog/2026/20260721-02-why-dependency-injection-matters-in-javascript.md',
    ]);
    for (const link of links) {
        const relative = new URL(link).pathname;
        const source = path.join(projectRoot, 'tmpl/web', relative.replace(/^\/en\//, 'en/'));
        await fs.access(source);
    }
    const sitemap = await fs.readFile(path.join(projectRoot, 'web/sitemap.xml'), 'utf8');
    assert.doesNotMatch(sitemap, /\.md<\/loc>/);
    for (const link of links) {
        assert.match(sitemap, new RegExp(link.replace('.md', '.html')));
    }
});
