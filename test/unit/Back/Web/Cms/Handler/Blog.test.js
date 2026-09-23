import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import * as marked from 'marked';

import Blog from '../../../../../../src/Back/Web/Cms/Handler/Blog.js';
import Publication from '../../../../../../src/Back/Web/Markdown/Publication.js';

test('builds localized Journal index, recent entries, and relations from Markdown only', async () => {
    const root = await fs.mkdtemp(path.join(os.tmpdir(), 'wg-blog-'));
    const blogRoot = path.join(root, 'tmpl', 'web', 'en', 'blog');
    await fs.mkdir(path.join(blogRoot, '2025'), {recursive: true});
    await fs.mkdir(path.join(blogRoot, '2026'), {recursive: true});
    const source = (title, date, relations) => `---\ntitle: "${title}"\ndescription: "Summary"\ndate: ${date}\nrelations:\n  - ${relations}\n---\n\n# ${title}\n`;
    await fs.writeFile(path.join(blogRoot, '2025', '20250101-old.md'), source('Old entry', '2025-01-01', 'teqcms'));
    await fs.writeFile(path.join(blogRoot, '2026', '20260102-new.md'), source('New entry', '2026-01-02', 'pde'));
    await fs.writeFile(path.join(blogRoot, '2026', '20260103-legacy.html'), '<!-- journal-relations: teqcms -->');
    const tmplConfig = {getRootPath: () => root};
    const publication = new Publication({fs, path, marked, tmplConfig});
    const blog = new Blog({fs, path, tmplConfig, publication});
    const items = await blog.collectBlogIndex('en');
    assert.deepEqual(items.map((item) => item.slug), ['20260102-new', '20250101-old']);
    assert.match(items[0].html, /<h2>New entry<\/h2>/);
    assert.match(items[0].html, /loading="lazy" decoding="async"/);
    assert.deepEqual(items[0].relations, ['pde']);
    assert.deepEqual((await blog.collectRecentBlogEntries('en', 1)).map((item) => item.slug), ['20260102-new']);
    assert.deepEqual((await blog.collectRelatedBlogEntries('en', 'teqcms')).map((item) => item.slug), ['20250101-old']);
    assert.deepEqual(await blog.collectEntryRelations('en', '/blog/2026/20260102-new.html'), ['pde']);
    assert.deepEqual(await blog.collectRelatedBlogEntries('en', 'not valid'), []);
});
