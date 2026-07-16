import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';

import Blog from '../../src/Back/Web/Cms/Handler/Blog.js';

test('builds accessible, lazy journal cards in reverse chronological order', async () => {
    const root = await fs.mkdtemp(path.join(os.tmpdir(), 'wg-blog-'));
    const blogRoot = path.join(root, 'tmpl', 'web', 'en', 'blog');
    await fs.mkdir(path.join(blogRoot, '2025'), {recursive: true});
    await fs.mkdir(path.join(blogRoot, '2026'), {recursive: true});
    const fragment = (title) => `{% block blog_item %}
<li class="blog-item">
  <a class="card-link" href="/entry.html"></a>
  <img src="/img/entry.webp" alt="">
  <div><h4>${title}</h4></div>
</li>
{% endblock %}`;
    await fs.writeFile(path.join(blogRoot, '2025', '20250101-old.html'), fragment('Old entry'));
    await fs.writeFile(path.join(blogRoot, '2026', '20260102-new.html'), fragment('New "entry"'));

    const blog = new Blog({
        'node:fs/promises': fs,
        'node:path': path,
        Fl32_Cms_Back_Config$: {getRootPath: () => root},
    });
    const items = await blog.collectBlogIndex('en');

    assert.deepEqual(items.map((item) => item.slug), ['20260102-new', '20250101-old']);
    assert.equal(items[0].url, '/en/blog/2026/20260102-new.html');
    assert.match(items[0].html, /<h2>New "entry"<\/h2>/);
    assert.match(items[0].html, /aria-label="New &quot;entry&quot;"/);
    assert.match(items[0].html, /<img loading="lazy" decoding="async"/);
    assert.doesNotMatch(items[0].html, /<h4>/);
});
