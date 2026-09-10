import assert from 'node:assert/strict';
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
        assert.match(html, /Real TeqCMS event/);
        assert.match(html, /<ul class="blog-list" role="list">/);
        assert.match(html, new RegExp(`href="/${locale}/products/chatgpt-telegram\\.html"`));
        assert.doesNotMatch(html, /fixed monthly price|фиксированн(?:ая|ой) ежемесячн|precio mensual fijo/i);
    }
});

test('related Journal Events link to their current state without turning chronology into status', () => {
    for (const [locale, [, , currentStateLabel]] of Object.entries(labels)) {
        const html = nunjucks.configure(path.join(root, 'tmpl', 'web', locale), {autoescape: true}).render(
            'blog/2025/20250529-01-teq-cms-demo.html',
            {
                allowedLocales: ['en', 'ru', 'es'],
                locale,
                isPublication: true,
                journalRelations: ['alarisa', 'pde', 'telegram-desk', 'shared-files-desk', 'teqcms'],
            }
        );
        assert.ok(html.includes(currentStateLabel), `${locale}: current-state explanation`);
        for (const destination of [
            `/${locale}/projects/alarisa.html`,
            `/${locale}/projects.html#pde`,
            `/${locale}/projects.html#telegram-desk`,
            `/${locale}/projects.html#shared-files-desk`,
            `/${locale}/projects.html#teqcms`,
        ]) {
            assert.ok(html.includes(`href="${destination}"`), `${locale}: ${destination}`);
        }
    }
});
