#!/usr/bin/env node

import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const baseLocale = process.argv[2];
if (!['en', 'ru'].includes(baseLocale)) throw new Error('Usage: node bin/prepare-selected-translation.mjs <en|ru>');

const selected = new Set([
    'library/teqfw/20240429-01-what-is-teqfw.html', 'library/teqfw/20240614-01-web-app-example.html',
    'library/teqfw/20240605-01-console-app-example.html', 'library/teqfw/20240215-01-top-level-code.html',
    'library/teqfw/20220207-01-web-app-identification.html', 'library/teqfw/20220202-01-cross-boundary-events.html',
    'library/teqfw/20220105-01-events-basics.html', 'library/teqfw/20211215-01-web-server.html',
    'library/teqfw/20211203-01-library-wrappers.html', 'library/teqfw/20210817-01-plugin-lifecycle.html',
    'library/teqfw/20210625-01-core.html', 'library/teqfw/20210609-01-dependency-injection.html',
    'blog/2024/20241112-01-early-vs-late-binding.html', 'library/concepts/20240807-01-jsdoc-interfaces.html',
    'library/concepts/20240523-01-enum-in-js.html', 'library/concepts/20230731-01-di-object-container.html',
    'library/concepts/20230717-01-ioc-in-javascript.html', 'library/concepts/20230206-01-dto-in-javascript.html',
    'library/concepts/20221116-01-az-code-structure.html', 'library/concepts/20221103-01-namespace-scope-or-address.html',
    'library/concepts/20210922-01-resilient-js-code.html', 'library/concepts/20210128-01-service-locator.html',
    'library/web/20240704-01-esm-and-cdns.html', 'library/web/20240324-01-personal-web-apps.html',
    'library/web/20240314-01-user-data-types.html', 'library/web/20240224-01-remote-console.html',
    'library/web/20230227-01-minimal-pwa.html', 'library/web/20211230-01-eda-for-pwa.html',
    'library/web/20200808-01-service-workers-basics.html', 'library/telegram/20240903-01-what-is-a-telegram-bot.html',
    'blog/2024/20241008-01-medium-telegram-bots.html', 'blog/2024/20241014-01-medium-telegram-crudl.html',
    'blog/2024/20241022-01-medium-dialogues-telegram.html', 'blog/2024/20241028-01-telegram-error-handling.html',
    'projects/cases/20230519-01-publickeycredential.html', 'projects/cases/20230310-01-deepgram-pwa.html',
    'projects/remote-console/20220318-01-log-monitoring.html', 'projects/cases/20230123-01-browser-oauth2.html',
]);
const selectedRussianSources = new Set([
    'library/teqfw/20220207-01-web-app-identification.html', 'library/teqfw/20220202-01-cross-boundary-events.html',
    'library/teqfw/20220105-01-events-basics.html', 'library/teqfw/20211215-01-web-server.html',
    'library/teqfw/20211203-01-library-wrappers.html', 'library/teqfw/20210817-01-plugin-lifecycle.html',
    'library/teqfw/20210625-01-core.html', 'library/teqfw/20210609-01-dependency-injection.html',
    'library/concepts/20210922-01-resilient-js-code.html', 'library/concepts/20210128-01-service-locator.html',
    'library/web/20211230-01-eda-for-pwa.html', 'library/web/20200808-01-service-workers-basics.html',
    'projects/remote-console/20220318-01-log-monitoring.html',
]);
if (baseLocale === 'ru') {
    for (const item of selected) if (!selectedRussianSources.has(item)) selected.delete(item);
}

const root = process.cwd();
const collect = async (directory, prefix = '') => {
    const result = [];
    for (const entry of await fs.readdir(directory, {withFileTypes: true})) {
        const relative = prefix ? `${prefix}/${entry.name}` : entry.name;
        if (entry.isDirectory()) result.push(...await collect(path.join(directory, entry.name), relative));
        else if (entry.isFile() && entry.name.endsWith('.html')) result.push(relative);
    }
    return result;
};

const localeRoot = path.join(root, 'tmpl', 'web', baseLocale);
const data = {};
for (const relative of await collect(localeRoot)) {
    const mtime = (await fs.stat(path.join(localeRoot, relative))).mtime.toISOString();
    data[relative] = {en: mtime, ru: mtime, es: mtime};
    if (selected.has(relative)) {
        delete data[relative][baseLocale === 'en' ? 'ru' : 'en'];
        delete data[relative].es;
    }
}
await fs.mkdir(path.join(root, 'var', 'teq-cms'), {recursive: true});
await fs.writeFile(path.join(root, 'var', 'teq-cms', 'db_translate.json'), `${JSON.stringify(data, null, 2)}\n`, 'utf8');
console.log(`Prepared ${baseLocale} translation pass for ${[...selected].filter((item) => data[item]).length} selected templates.`);
