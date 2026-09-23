import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import test from 'node:test';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const locales = ['en', 'ru', 'es'];
const residualHeading = /^## (?:Additional source-code excerpts|Fragmentos adicionales de código fuente|Дополнительные фрагменты исходного кода)\s*$/m;
const conversionArtifact = /\\\$|\\->|<span class="math\b/;
const typographicCodeQuote = /[‘’“”]/;

async function walk(directory) {
    const files = [];
    for (const entry of await fs.readdir(directory, {withFileTypes: true})) {
        const fullPath = path.join(directory, entry.name);
        if (entry.isDirectory()) files.push(...await walk(fullPath));
        else if (entry.isFile() && entry.name.endsWith('.md')) files.push(fullPath);
    }
    return files;
}

test('Library code examples contain no known publication-conversion artifacts', async () => {
    const problems = [];
    for (const locale of locales) {
        for (const file of await walk(path.join(root, 'tmpl', 'web', locale, 'library'))) {
            const source = await fs.readFile(file, 'utf8');
            const label = path.relative(root, file);
            if (residualHeading.test(source)) problems.push(`${label}: residual source-code excerpts`);
            if (conversionArtifact.test(source)) problems.push(`${label}: escaped code or Pandoc math`);
            for (const [index, line] of source.split('\n').entries()) {
                if (/^ {4}/.test(line) && typographicCodeQuote.test(line)) {
                    problems.push(`${label}:${index + 1}: typographic quote in indented code`);
                }
                if (/^ {4}.*\}\s+[A-Za-zА-Яа-я].{25}/u.test(line)) {
                    problems.push(`${label}:${index + 1}: code and prose on one line`);
                }
            }

            const fences = [...source.matchAll(/^```([^\n]*)\n([\s\S]*?)^```\s*$/gm)];
            const fenceLines = source.match(/^```/gm)?.length ?? 0;
            if (fences.length * 2 !== fenceLines) problems.push(`${label}: unbalanced code fences`);
            for (const [, language, code] of fences) {
                if (typographicCodeQuote.test(code)) {
                    problems.push(`${label}: typographic quote in ${language.trim() || 'plain'} code`);
                }
                if (language.trim() === 'json') {
                    try { JSON.parse(code); }
                    catch { problems.push(`${label}: invalid JSON example`); }
                }
                if (['js', 'javascript', 'mjs'].includes(language.trim())) {
                    const checked = spawnSync(process.execPath, ['--check', '--input-type=module'], {
                        input: code,
                        encoding: 'utf8',
                    });
                    if (checked.status !== 0) problems.push(`${label}: invalid JavaScript example`);
                }
            }
        }
    }
    assert.deepEqual(problems, []);
});
