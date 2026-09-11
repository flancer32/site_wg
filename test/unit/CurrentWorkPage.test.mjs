import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';
import {fileURLToPath} from 'node:url';

import nunjucks from 'nunjucks';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');

const labels = {
    en: ['Current Work', 'Previous and historical work', 'What is true now', 'Related development records'],
    ru: ['Текущая работа', 'Предыдущая и историческая работа', 'Что верно сейчас', 'Связанные записи о разработке'],
    es: ['Trabajo actual', 'Trabajo previo e histórico', 'Lo que es cierto ahora', 'Registros de desarrollo relacionados'],
};

test('Current Work separates active systems from history and places real TeqCMS Events with TeqCMS', () => {
    for (const [locale, [currentLabel, historyLabel, , evidenceLabel]] of Object.entries(labels)) {
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
        assert.ok(html.includes(evidenceLabel), `${locale}: localized TeqCMS evidence heading`);
        const teqcmsCardStart = html.indexOf('id="teqcms"');
        const teqcmsCardEnd = html.indexOf('</article>', teqcmsCardStart);
        const teqcmsCard = html.slice(teqcmsCardStart, teqcmsCardEnd);
        assert.match(teqcmsCard, /Real TeqCMS event/, `${locale}: Event is inside the TeqCMS card`);
        assert.doesNotMatch(html, /Current Work changes in the Journal|Изменения текущей работы в Журнале|Cambios del Trabajo actual en la Bitácora/u);
        assert.match(html, new RegExp(`href="/${locale}/products/chatgpt-telegram\\.html"`));
        assert.doesNotMatch(html, /fixed monthly price|фиксированн(?:ая|ой) ежемесячн|precio mensual fijo/i);
    }
});

test('Current Work uses ordinary visitor language for its introduction', () => {
    const forbidden = {
        en: /Object kind and current status are stated separately|This is not a product catalogue|Current status lives here/u,
        ru: /Вид объекта и его текущий статус указаны отдельно|Это не каталог продуктов|Текущий статус указан здесь/u,
        es: /El tipo de objeto y su estado actual se muestran por separado|No es un catálogo de productos|El estado actual vive aquí/u,
    };
    for (const locale of Object.keys(labels)) {
        const html = nunjucks.configure(path.join(root, 'tmpl', 'web', locale), {autoescape: true}).render('projects.html', {
            allowedLocales: ['en', 'ru', 'es'],
            locale,
        });
        assert.doesNotMatch(html, forbidden[locale], `${locale}: no internal documentation language`);
        assert.doesNotMatch(html, /Related development records|Связанные записи о разработке|Registros de desarrollo relacionados/u, `${locale}: no empty evidence block`);
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
