import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';
import {fileURLToPath} from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');

test('About keeps the current software-making identity and omits political self-labels', async () => {
    const currentIdentity = {
        en: /independent software maker.*AI agents|software and integrations between agents and services/u,
        ru: /независимый создатель ПО.*ИИ-агентами|создаю ПО и интеграции агентов с сервисами/u,
        es: /creador independiente de software.*agentes de IA|software e integraciones entre agentes y servicios/u,
    };
    const politicalSelfLabels = /traditional values|liberal conservative|традиционных ценностей|либеральный консерватор|valores tradicionales|liberal conservador/ui;
    for (const [locale, expectedIdentity] of Object.entries(currentIdentity)) {
        const source = await fs.readFile(path.join(root, 'tmpl', 'web', locale, 'about.html'), 'utf8');
        assert.match(source, expectedIdentity, `${locale}: current identity remains primary`);
        assert.doesNotMatch(source, politicalSelfLabels, `${locale}: political self-label is absent`);
    }
});
