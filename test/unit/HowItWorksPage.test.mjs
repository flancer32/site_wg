import assert from 'node:assert/strict';
import path from 'node:path';
import test from 'node:test';
import {fileURLToPath} from 'node:url';
import nunjucks from 'nunjucks';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');

test('working-model route stays localized and explains accountable human, agents, TeqFW, and ADSM', () => {
    for (const locale of ['en', 'ru', 'es']) {
        const html = nunjucks.configure(path.join(root, 'tmpl', 'web', locale), {autoescape: true}).render('how-it-works.html', {allowedLocales: ['en', 'ru', 'es'], locale});
        assert.match(html, /ADSM/);
        assert.match(html, /TeqFW/);
        assert.match(html, /responsible|ответ|responsable/u);
        assert.match(html, /agent|агент|agente/u);
        assert.match(html, new RegExp(`href="/${locale}/contact\\.html\\?topic=(?:product|commercial)"`));
        assert.doesNotMatch(html, /GitHub Flows|Agent Orchestration PoC|€50/u);
    }
});

test('working-model page presents an evolving practice rather than a universal method', () => {
    const expectedPracticeLoop = {
        en: /build → observe → understand → document → change the approach → build again/,
        ru: /создать → наблюдать → понять → задокументировать → изменить подход → создать снова/,
        es: /construir → observar → comprender → documentar → cambiar el enfoque → construir de nuevo/,
    };
    for (const [locale, expected] of Object.entries(expectedPracticeLoop)) {
        const html = nunjucks.configure(path.join(root, 'tmpl', 'web', locale), {autoescape: true}).render('how-it-works.html', {allowedLocales: ['en', 'ru', 'es'], locale});
        assert.match(html, expected, `${locale}: shows the practice feedback loop`);
        assert.match(html, /not a universal recipe|не универсальный рецепт|no una receta universal/u, `${locale}: does not claim a universal method`);
    }
});
