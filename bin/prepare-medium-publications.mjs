#!/usr/bin/env node

import {spawn} from 'node:child_process';
import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import {fileURLToPath} from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const archive = path.join(root, 'web', 'medium');
const skipRussian = process.env.MEDIUM_SKIP_RUSSIAN === '1';
const targetLocale = process.env.MEDIUM_TARGET_LOCALE || 'en';

const articles = [
    ['f84ab4c66abf', 'teqfw', 'library/teqfw/20240429-01-what-is-teqfw.html', 'en'],
    ['add155627b58', 'teqfw', 'library/teqfw/20240614-01-web-app-example.html', 'en'],
    ['e038e31766dd', 'teqfw', 'library/teqfw/20240605-01-console-app-example.html', 'en'],
    ['d65d1b6cea5e', 'teqfw', 'library/teqfw/20240215-01-top-level-code.html', 'en'],
    ['8d951d13becf', 'teqfw', 'library/teqfw/20220207-01-web-app-identification.html', 'ru'],
    ['73579bb1df2', 'teqfw', 'library/teqfw/20220202-01-cross-boundary-events.html', 'ru'],
    ['541b01dfbe6b', 'teqfw', 'library/teqfw/20220105-01-events-basics.html', 'ru'],
    ['33a5a903f7d9', 'teqfw', 'library/teqfw/20211215-01-web-server.html', 'ru'],
    ['46d32995a14e', 'teqfw', 'library/teqfw/20211203-01-library-wrappers.html', 'ru'],
    ['31b12870d107', 'teqfw', 'library/teqfw/20210817-01-plugin-lifecycle.html', 'ru'],
    ['346fb4788e98', 'teqfw', 'library/teqfw/20210625-01-core.html', 'ru'],
    ['b1beb319ca56', 'teqfw', 'library/teqfw/20210609-01-dependency-injection.html', 'ru'],
    ['d80c6b985f4b', 'concepts', 'blog/2024/20241112-01-early-vs-late-binding.html', 'en'],
    ['f4fbd41a3500', 'concepts', 'library/concepts/20240807-01-jsdoc-interfaces.html', 'en'],
    ['2feb64992e54', 'concepts', 'library/concepts/20240523-01-enum-in-js.html', 'en'],
    ['4269d161fa40', 'concepts', 'library/concepts/20230731-01-di-object-container.html', 'en'],
    ['1b2e701f331d', 'concepts', 'library/concepts/20230717-01-ioc-in-javascript.html', 'en'],
    ['3274a3063919', 'concepts', 'library/concepts/20230206-01-dto-in-javascript.html', 'en'],
    ['8ae5844696ea', 'concepts', 'library/concepts/20221116-01-az-code-structure.html', 'en'],
    ['9037fada36f2', 'concepts', 'library/concepts/20221103-01-namespace-scope-or-address.html', 'en'],
    ['e9a0fe4f1e1f', 'concepts', 'library/concepts/20210922-01-resilient-js-code.html', 'ru'],
    ['9ef49ef87415', 'concepts', 'library/concepts/20210128-01-service-locator.html', 'ru'],
    ['a68e6632999f', 'web', 'library/web/20240704-01-esm-and-cdns.html', 'en'],
    ['3787d028d653', 'web', 'library/web/20240324-01-personal-web-apps.html', 'en'],
    ['1317d7cb80df', 'web', 'library/web/20240314-01-user-data-types.html', 'en'],
    ['d3237abb712f', 'web', 'library/web/20240224-01-remote-console.html', 'en'],
    ['585664286cda', 'web', 'library/web/20230227-01-minimal-pwa.html', 'en'],
    ['d77d10cc3276', 'web', 'library/web/20211230-01-eda-for-pwa.html', 'ru'],
    ['c7cda44c1c98', 'web', 'library/web/20200808-01-service-workers-basics.html', 'ru'],
    ['9d9a675b27b9', 'telegram', 'library/telegram/20240903-01-what-is-a-telegram-bot.html', 'en'],
    ['c1688e572abe', 'telegram', 'blog/2024/20241008-01-medium-telegram-bots.html', 'en'],
    ['fcfb38991efa', 'telegram', 'blog/2024/20241014-01-medium-telegram-crudl.html', 'en'],
    ['6d03ffb4059c', 'telegram', 'blog/2024/20241022-01-medium-dialogues-telegram.html', 'en'],
    ['cd04f99074fc', 'telegram', 'blog/2024/20241028-01-telegram-error-handling.html', 'en'],
    ['e90f59acba45', 'cases', 'projects/cases/20230519-01-publickeycredential.html', 'en'],
    ['6fa4068878e0', 'cases', 'projects/cases/20230310-01-deepgram-pwa.html', 'en'],
    ['8cffdd920c29', 'cases', 'projects/remote-console/20220318-01-log-monitoring.html', 'ru'],
    ['208e64f14db4', 'cases', 'projects/cases/20230123-01-browser-oauth2.html', 'en'],
].map(([id, section, route, sourceLocale]) => ({id, section, route, sourceLocale}));

const markdownBody = (text) => text.replace(/^---\n[\s\S]*?---\n\n# .*?\n\n/, '');

const toHtml = async (markdown) => new Promise((resolve, reject) => {
    const pandoc = spawn('pandoc', ['--from=markdown', '--to=html5', '--wrap=none']);
    let output = '';
    let error = '';
    pandoc.stdout.on('data', (chunk) => { output += chunk; });
    pandoc.stderr.on('data', (chunk) => { error += chunk; });
    pandoc.on('error', reject);
    pandoc.on('close', (code) => code === 0 ? resolve(output.replaceAll('src="img/', 'src="/medium/img/')) : reject(new Error(error)));
    pandoc.stdin.end(markdown);
});

const summary = (markdown) => markdown.replace(/!\[[^]*?\]\([^)]*\)/g, '').replace(/[`*_>#]/g, '')
    .split(/\n\n+/).find((paragraph) => paragraph.trim().length > 60)?.replace(/\s+/g, ' ').trim().slice(0, 180) || 'Technical article by Alex Gusev.';

const manifest = JSON.parse(await fs.readFile(path.join(archive, 'manifest.json'), 'utf8'));
const records = new Map(manifest.articles.map((article) => [article.id, article]));
for (const article of articles) {
    if (targetLocale === 'ru' && article.sourceLocale !== 'ru') continue;
    if (targetLocale !== 'en' && targetLocale !== 'ru') throw new Error(`Unsupported target locale: ${targetLocale}`);
    if (skipRussian && article.sourceLocale === 'ru') continue;
    const record = records.get(article.id);
    if (!record) throw new Error(`Archive record is missing: ${article.id}`);
    let markdown = markdownBody(await fs.readFile(path.join(archive, record.file), 'utf8'));
    if (article.sourceLocale === 'ru' && targetLocale === 'en') {
        throw new Error(`English translation for ${article.id} must be authored manually.`);
    }
    const title = article.sourceLocale === 'ru' && targetLocale === 'en' ? (markdown.match(/^#\s+(.+)$/m)?.[1] || record.title) : record.title;
    markdown = markdown.replace(/^#\s+.+\n\n?/, '');
    const html = await toHtml(markdown);
    const isBlog = article.route.startsWith('blog/');
    const card = isBlog ? `\n{% block blog_item %}\n    <li class="blog-item">\n        <a class="card-link" href="/${targetLocale}/${article.route}"></a>\n        <div>\n            <h4>${title}</h4>\n            <p>${summary(markdown)}</p>\n            <time datetime="${record.date}">${record.date}</time>\n        </div>\n    </li>\n{% endblock %}\n` : '';
    const publicationDate = targetLocale === 'ru' ? 'Дата публикации:' : 'Publication date:';
    const template = `{% extends "inc/layout.html" %}\n\n{% block title %}${title}{% endblock %}\n{% block description %}${summary(markdown)}{% endblock %}\n\n{% block content %}\n<div class="card">\n    <h1>${title}</h1>\n    <span style="display: block; text-align: right;">\n        <strong>${publicationDate}</strong> ${record.date}\n    </span>\n    {% raw %}\n${html}\n    {% endraw %}\n</div>\n{% endblock %}\n${card}`;
    const destination = path.join(root, 'tmpl', 'web', targetLocale, article.route);
    await fs.mkdir(path.dirname(destination), {recursive: true});
    await fs.writeFile(destination, template, 'utf8');
}
console.log(`Prepared ${articles.filter(({sourceLocale}) => (targetLocale !== 'ru' || sourceLocale === 'ru') && (!skipRussian || sourceLocale !== 'ru')).length} ${targetLocale} publication templates.`);
