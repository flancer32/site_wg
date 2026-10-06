import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import http2 from 'node:http2';
import os from 'node:os';
import {fileURLToPath} from 'node:url';
import test from 'node:test';
import * as marked from 'marked';
import nunjucks from 'nunjucks';
import Publication from '../../src/Back/Web/Markdown/Publication.js';
import Markdown from '../../src/Back/Web/Handler/Markdown.js';
import Metadata from '../../src/Back/Web/Metadata.js';
import Blog from '../../src/Back/Web/Cms/Handler/Blog.js';
import Render from '../../node_modules/@flancer32/teq-tmpl/src/Back/Service/Render.js';
import Engine from '../../node_modules/@flancer32/teq-tmpl/src/Back/Service/Engine/Nunjucks.js';
import Environment from '../../node_modules/@flancer32/teq-tmpl/src/Back/Factory/Nunjucks/Env.js';

const root = fileURLToPath(new URL('../../', import.meta.url));
const locales = ['en', 'ru', 'es'];
const log = {forSource: () => ({error: (message, detail) => assert.fail(`${message}: ${detail.err}`)})};

function assertPublicUrls(html, pageUrl) {
    const attributes = [...html.matchAll(/\b(href|src|srcset|action|poster|formaction|data|cite)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/gi)];
    assert.ok(attributes.length, pageUrl);
    for (const [, name, double, single, unquoted] of attributes) {
        const raw = (double ?? single ?? unquoted).replaceAll('&amp;', '&').trim();
        const values = name.toLowerCase() === 'srcset' ? raw.split(',').map((value) => value.trim().split(/\s+/)[0]) : [raw];
        for (const value of values) {
            assert.doesNotMatch(value, /^(null|undefined)$/i, `${pageUrl}: ${name}=${value}`);
            const url = new URL(value, pageUrl);
            assert.doesNotMatch(url.pathname, /\/blog\/\d{4}\/(null|undefined)$/i, `${pageUrl}: ${name}=${value}`);
        }
    }
}

test('production Markdown rendering emits valid Journal URLs and cards in every locale', async () => {
    const config = {getRootPath: () => root, getAvailableLocales: () => locales, getDefaultLocale: () => 'en'};
    const publication = new Publication({fs, path, marked, tmplConfig: config});
    const metadata = new Metadata({config: {getBaseUrl: () => 'https://wiredgeese.com'}, tmplConfig: config});
    const engine = new Engine({log, config, factEnv: new Environment({path, nunjucks, config})});
    const render = new Render({log, engine, actFind: {}, actLoad: {}});
    const blog = new Blog({fs, path, tmplConfig: config, publication});
    let body;
    const handler = new Markdown({http2, fs, path, metadata, publication, tmplConfig: config,
        servTmplRender: render, dtoInfo: {create: (value) => value}, STAGE: {PROCESS: 'PROCESS'},
        respond: {isWritable: () => true, code200_Ok: (payload) => { body = payload.body; }}});
    for (const locale of locales) {
        const cards = await blog.collectBlogIndex(locale);
        assert.equal(cards.length, 79);
        for (const card of cards) {
            const pageUrl = `https://wiredgeese.com${card.url}`;
            assertPublicUrls(card.html, pageUrl);
            const context = {request: {method: 'GET', url: card.url}, response: {}, completed: false};
            body = undefined;
            await handler.handle(context);
            assert.equal(context.completed, true, pageUrl);
            assertPublicUrls(body, pageUrl);
            assert.ok(body.includes(`rel="canonical" href="${pageUrl}"`), pageUrl);
            assert.ok(body.includes(`type="text/markdown" href="${pageUrl.slice(0, -5)}.md"`), pageUrl);
            for (const other of locales) {
                assert.ok(body.includes(`hreflang="${other}" href="${pageUrl.replace(`/${locale}/`, `/${other}/`)}"`), pageUrl);
            }
            for (const image of body.matchAll(/<zoom-img\b([^>]*)>/gi)) {
                assert.match(image[1], /\bsrc="[^"\s]+"/, pageUrl);
            }
        }
    }
});


test('nullable Markdown image metadata never becomes a Journal card URL', async (t) => {
    const temporary = await fs.mkdtemp(path.join(os.tmpdir(), 'wg-card-urls-'));
    t.after(() => fs.rm(temporary, {recursive: true, force: true}));
    const config = {getRootPath: () => temporary};
    const publication = new Publication({fs, path, marked, tmplConfig: config});
    const blog = new Blog({fs, path, tmplConfig: config, publication});
    for (const locale of locales) {
        const directory = path.join(temporary, 'tmpl/web', locale, 'blog/2026');
        await fs.mkdir(directory, {recursive: true});
        for (const image of ['', 'image:', 'image: null', 'image: undefined', 'image: " NULL "']) {
            await fs.writeFile(path.join(directory, 'article.md'), `---\ntitle: Article\ndescription: Summary\ndate: 2026-01-01\n${image ? `${image}\n` : ''}---\n\n# Article`);
            const [card] = await blog.collectBlogIndex(locale);
            assertPublicUrls(card.html, `https://wiredgeese.com/${locale}/blog/2026/article.html`);
            assert.ok(card.html.includes('src="/img/avatar.jpg"'), image);
        }
    }
});
