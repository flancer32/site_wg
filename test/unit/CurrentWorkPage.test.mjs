import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';
import {fileURLToPath} from 'node:url';

import nunjucks from 'nunjucks';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');

const labels = {
    en: ['Current Work', 'Previous and historical work', 'What is true now'],
    ru: ['Текущая работа', 'Предыдущая и историческая работа', 'Что верно сейчас'],
    es: ['Trabajo actual', 'Trabajo previo e histórico', 'Lo que es cierto ahora'],
};

test('Current Work separates active system status from history and projects real TeqCMS Events', () => {
    for (const [locale, [currentLabel, historyLabel]] of Object.entries(labels)) {
        const html = nunjucks.configure(path.join(root, 'tmpl', 'web', locale), {autoescape: true}).render('projects.html', {
            allowedLocales: ['en', 'ru', 'es'],
            locale,
            currentWorkEvidence: {
                items: [{html: '<li class="blog-item"><a class="card-link" href="/event.html"></a><div><h2>Real TeqCMS event</h2></div></li>'}],
            },
        });
        assert.ok(html.includes(currentLabel), `${locale}: Current Work label`);
        assert.ok(html.includes(historyLabel), `${locale}: historical separation`);
        for (const id of ['pde', 'telegram-desk', 'shared-files-desk', 'teqcms']) {
            assert.match(html, new RegExp(`id="${id}"`));
        }
        assert.match(html, /Alarisa/);
        const historical = html.slice(html.indexOf('archive-heading'));
        assert.doesNotMatch(historical, /TeqCMS/, `${locale}: TeqCMS is not duplicated in history`);
        assert.doesNotMatch(historical, /Tequila Framework \(TeqFW\)/, `${locale}: TeqFW is not presented as historical work`);
        assert.match(html, /Real TeqCMS event/);
        assert.match(html, /<ul class="blog-list" role="list">/);
        assert.match(html, new RegExp(`href="/${locale}/products/chatgpt-telegram\\.html"`));
        assert.doesNotMatch(html, /fixed monthly price|фиксированн(?:ая|ой) ежемесячн|precio mensual fijo/i);
    }
});

test('real TeqCMS Events link to their current state without turning chronology into status', () => {
    for (const [locale, [, , currentStateLabel]] of Object.entries(labels)) {
        const html = nunjucks.configure(path.join(root, 'tmpl', 'web', locale), {autoescape: true}).render(
            'blog/2025/20250529-01-teq-cms-demo.html',
            {
                allowedLocales: ['en', 'ru', 'es'],
                locale,
                isPublication: true,
                journalRelations: ['teqcms'],
            }
        );
        assert.ok(html.includes(currentStateLabel), `${locale}: current-state explanation`);
        assert.ok(html.includes(`href="/${locale}/projects.html#teqcms"`), `${locale}: TeqCMS current state`);
    }
});

test('the 2026-09-10 site-publication Event does not claim Current Work relationships', async () => {
    for (const locale of Object.keys(labels)) {
        const source = await fs.readFile(path.join(root, 'tmpl', 'web', locale, 'blog/2026/20260910-01-current-work-evidence.html'), 'utf8');
        assert.doesNotMatch(source, /journal-relations:/);
        assert.match(source, /does not manufacture|не создаёт искусственных|no fabrica evidencia/u);
    }
});
