import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import * as marked from 'marked';

import Publication from '../../../../../src/Back/Web/Markdown/Publication.js';

test('resolves valid publication routes and renders canonical article metadata', async () => {
    const root = await fs.mkdtemp(path.join(os.tmpdir(), 'wg-publication-'));
    const directory = path.join(root, 'tmpl/web/en/blog/2026');
    await fs.mkdir(directory, {recursive: true});
    await fs.writeFile(path.join(directory, 'article.md'), '---\ntitle: Article\ndescription: Summary\ndate: 2026-09-23\nrelations:\n  - pde\n---\n\n# Body');
    const publication = new Publication({fs, path, marked, tmplConfig: {getRootPath: () => root}});
    const route = publication.parseRoute('/en/blog/2026/article.html');
    assert.deepEqual(route, {type: 'blog', locale: 'en', year: '2026', slug: 'article', representation: 'html'});
    const article = await publication.load(route);
    assert.equal(article.metadata.title, 'Article');
    assert.deepEqual(article.metadata.relations, ['pde']);
    assert.match(article.html, /<h1>Body<\/h1>/);
    assert.equal(publication.parseRoute('/en/blog/2026/%2e%2e%2farticle.html'), null);
});
