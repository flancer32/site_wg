import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';
import {fileURLToPath} from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const canonicalUrls = [
    'https://github.com/teqfw/di',
    'https://github.com/teqfw/log',
    'https://github.com/teqfw/cfg',
    'https://github.com/teqfw/cli',
    'https://github.com/teqfw/web',
    'https://github.com/flancer32/skill-adsm-ctx',
    'https://github.com/flancer32/skill-teqfw-esm-validator',
    'https://github.com/flancer32/skill-teqfw-web',
    'https://github.com/flancer32/skill-teqfw-platform',
    'https://github.com/flancer32/skill-adsm-doc-web-browser',
    'https://github.com/flancer32/mindstream',
    'https://github.com/flancer32/teq-cms',
    'https://github.com/flancer32/teq-tmpl',
    'https://github.com/flancer32/alarisa',
    'https://github.com/flancer32/alarisa-back-state',
    'https://github.com/flancer32/alarisa-desk',
    'https://github.com/flancer32/alarisa-comm',
    'https://github.com/flancer32/alarisa-back',
    'https://github.com/flancer32/alarisa-mob',
    'https://github.com/flancer32/alarisa-back-control',
    'https://github.com/flancer32/pde-sdk',
    'https://github.com/flancer32/pde-runtime',
    'https://github.com/flancer32/pde-desk-telegram',
    'https://github.com/flancer32/pde-desk-files',
    'https://github.com/flancer32/site_wg',
    'https://github.com/flancer32/site-teqfw',
];

test('canonical software-estate inventory preserves all repository evidence and its limits', async () => {
    const source = await fs.readFile(path.join(root, 'ctx/docs/product/software-estate.md'), 'utf8');
    assert.equal((source.match(/https:\/\/github\.com\//g) || []).length, canonicalUrls.length);
    for (const url of canonicalUrls) assert.ok(source.includes(url), url);
    assert.match(source, /mindstream.*applied web application/is);
    assert.match(source, /Alarisa.*distinct from the Alarisa repository group/is);
    assert.match(source, /does not by itself demonstrate market demand/i);
    assert.doesNotMatch(source, /repositories built with AI\./i);
});
