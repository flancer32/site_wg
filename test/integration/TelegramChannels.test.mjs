import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';
import {fileURLToPath} from 'node:url';

import nunjucks from 'nunjucks';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const channels = {
    main: 'https://t.me/wiredgeese',
    en: 'https://t.me/alexgusev_lab_en',
    es: 'https://t.me/alexgusev_lab_es',
    ru: 'https://t.me/alexgusev_lab_ru',
};
const locales = ['en', 'es', 'ru'];

function render(locale, template, context = {}) {
    return nunjucks.configure(path.join(root, 'tmpl/web', locale), {autoescape: true}).render(template, {
        allowedLocales: locales,
        locale,
        recentJournal: {items: []},
        ...context,
    });
}

test('Each locale exposes the main Telegram contact and its matching language channel', async () => {
    for (const locale of locales) {
        const contact = render(locale, 'contact.html');
        const footer = render(locale, 'inc/footer.html');

        for (const [name, url] of Object.entries({main: channels.main, [locale]: channels[locale]})) {
            assert.match(contact, new RegExp(url.replaceAll('/', '\\/')), `${locale}: Contact exposes ${name} channel`);
            assert.match(footer, new RegExp(url.replaceAll('/', '\\/')), `${locale}: footer exposes ${name} channel`);
        }

        for (const otherLocale of locales.filter((item) => item !== locale)) {
            assert.doesNotMatch(contact, new RegExp(channels[otherLocale].replaceAll('/', '\\/')), `${locale}: Contact does not promote ${otherLocale} channel`);
            assert.doesNotMatch(footer, new RegExp(channels[otherLocale].replaceAll('/', '\\/')), `${locale}: footer does not promote ${otherLocale} channel`);
        }

        assert.match(footer, /<nav class="footer-groups"[^>]*>[\s\S]*<h2>Telegram<\/h2>/);
    }
});

test('Publication discussion CTA follows the page locale', () => {
    for (const locale of locales) {
        const html = render(locale, 'inc/layout.html', {isPublication: true});
        assert.match(html, new RegExp(channels[locale].replaceAll('/', '\\/')), `${locale}: publication CTA uses its locale channel`);
    }
});

test('Telegram channel links use safe external-link attributes', async () => {
    for (const locale of locales) {
        const [contact, footer] = await Promise.all([
            fs.readFile(path.join(root, 'tmpl/web', locale, 'contact.html'), 'utf8'),
            fs.readFile(path.join(root, 'tmpl/web', locale, 'inc/footer.html'), 'utf8'),
        ]);

        for (const url of [channels.main, channels[locale]]) {
            for (const source of [contact, footer]) {
                const link = source.slice(source.lastIndexOf(`<a href="${url}"`));
                assert.match(link, /target="_blank"/);
                assert.match(link, /rel="noopener noreferrer"/);
            }
        }
    }
});
