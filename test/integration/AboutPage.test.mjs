import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';
import {fileURLToPath} from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');

test('About leads with the current agent-directed practice rather than a freelancer CV', async () => {
    const currentIdentity = {
        en: /software maker building primarily through AI agents/i,
        ru: /создатель ПО, который разрабатывает главным образом через ИИ-агентов/u,
        es: /creador experimentado de software que construye principalmente mediante agentes de IA/u,
    };
    for (const [locale, expectedIdentity] of Object.entries(currentIdentity)) {
        const source = await fs.readFile(path.join(root, 'tmpl', 'web', locale, 'about.html'), 'utf8');
        assert.match(source, expectedIdentity, `${locale}: current identity remains primary`);
        assert.match(source, /Alarisa/);
        assert.match(source, /PDE/);
        assert.doesNotMatch(source, /Vue|Quasar|Knex|HTML\/XML|CSS, JSON/u, `${locale}: omits generic capability inventory`);
    }
});
