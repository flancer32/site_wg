import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';
import {fileURLToPath} from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const excluded = new Set(['404.html', 'contacts.html', 'posts.html', 'products.html']);

async function collectTemplates(directory, prefix = '') {
    const entries = await fs.readdir(directory, {withFileTypes: true});
    const result = [];
    for (const entry of entries) {
        if (entry.name === 'inc') continue;
        const relative = prefix ? `${prefix}/${entry.name}` : entry.name;
        if (entry.isDirectory()) {
            result.push(...await collectTemplates(path.join(directory, entry.name), relative));
        } else if (entry.isFile() && entry.name.endsWith('.html') && !excluded.has(relative)) {
            result.push(relative);
        }
    }
    return result;
}

function publicUrlForTemplate(locale, relative) {
    let route;
    if (relative === 'index.html') route = '';
    else if (relative === 'blog.html') route = 'blog/';
    else if (relative.endsWith('/index.html')) route = relative.slice(0, -'index.html'.length);
    else route = relative;
    return `https://wiredgeese.com/${locale}/${route}`;
}

function templatePathForUrl(url) {
    const match = url.match(/^https:\/\/wiredgeese\.com\/(en|ru|es)(\/.*)$/);
    assert.ok(match, `Unexpected sitemap URL: ${url}`);
    const [, locale, route] = match;
    let relative;
    if (route === '/') relative = 'index.html';
    else if (route === '/blog/') relative = 'blog.html';
    else if (route.endsWith('/')) relative = `${route.slice(1)}index.html`;
    else relative = route.slice(1);
    return path.join(root, 'tmpl', 'web', locale, relative);
}

test('sitemap contains only existing localized canonical templates', async () => {
    const xml = await fs.readFile(path.join(root, 'web', 'sitemap.xml'), 'utf8');
    const locations = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);

    assert.ok(locations.length > 250);
    assert.equal(new Set(locations).size, locations.length);
    assert.ok(locations.includes('https://wiredgeese.com/en/projects/alarisa.html'));
    assert.doesNotMatch(xml, /\/(?:contacts|posts|products)\.html/);
    assert.doesNotMatch(xml, /\/404\.html/);

    const expected = [];
    for (const locale of ['en', 'ru', 'es']) {
        const templates = await collectTemplates(path.join(root, 'tmpl', 'web', locale));
        expected.push(...templates.map((relative) => publicUrlForTemplate(locale, relative)));
    }
    assert.deepEqual([...locations].sort(), expected.sort());

    for (const location of locations) {
        await assert.doesNotReject(fs.access(templatePathForUrl(location)), location);
    }

    for (const locale of ['en', 'ru', 'es']) {
        const count = locations.filter((location) => location.includes(`/${locale}/`)).length;
        assert.equal(count, locations.length / 3, locale);
    }
    assert.equal((xml.match(/hreflang="x-default"/g) || []).length, locations.length);
});
