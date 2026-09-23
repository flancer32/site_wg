import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';
import {fileURLToPath} from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');

async function markdownPaths(directory, prefix) {
    const paths = [];
    for (const entry of await fs.readdir(directory, {withFileTypes: true})) {
        const relative = `${prefix}/${entry.name}`;
        if (entry.isDirectory()) paths.push(...await markdownPaths(path.join(directory, entry.name), relative));
        else if (entry.isFile() && entry.name.endsWith('.md')) paths.push(relative);
    }
    return paths;
}

test('authored llms.txt lists each and every English Markdown publication exactly once', async () => {
    const source = await fs.readFile(path.join(root, 'tmpl/web/llms.txt'), 'utf8');
    const listed = source.split('\n').filter((line) => line.startsWith('- ')).map((line) => line.slice(2));
    const expectedPaths = (await Promise.all(['blog', 'library'].map((family) =>
        markdownPaths(path.join(root, 'tmpl/web/en', family), `/en/${family}`)))).flat();
    const expected = expectedPaths.map((route) => `https://wiredgeese.com${route}`);
    assert.equal(listed.length, new Set(listed).size, 'Duplicate discovery URL');
    assert.deepEqual([...listed].sort(), [...expected].sort());
    assert.ok(listed.every((url) => /^https:\/\/wiredgeese\.com\/en\/(?:blog|library)\/[a-z0-9/-]+\.md$/.test(url)));
});
