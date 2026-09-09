import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';
import {fileURLToPath} from 'node:url';

import Redirect from '../../src/Back/Web/Cms/Handler/Redirect.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');

function createRedirect() {
    return new Redirect({
        fs,
        path,
        tmplConfig: {
            getAvailableLocales: () => ['en', 'ru', 'es'],
            getDefaultLocale: () => 'en',
            getRootPath: () => root,
        },
        logger: {forSource: () => ({error() {}, info() {}})},
        helpWeb: {
            extractRoutingInfo: ({path: requestPath}) => {
                const match = requestPath.match(/^\/(en|ru|es)(\/.*)?$/);
                return {locale: match?.[1] ?? 'en', cleanPath: match?.[2] ?? '/'};
            },
        },
    });
}

test('keeps the legacy products.html rewrite while preserving the Products directory route', async () => {
    const redirect = createRedirect();
    const legacy = {url: '/ru/products.html?source=legacy'};
    const catalogue = {url: '/ru/products/'};

    await redirect.applyRedirect({req: legacy, routeInfo: {locale: 'ru', cleanPath: '/products.html'}});
    await redirect.applyRedirect({req: catalogue, routeInfo: {locale: 'ru', cleanPath: '/products/'}});

    assert.equal(legacy.url, '/ru/projects.html?source=legacy');
    assert.equal(catalogue.url, '/ru/products/');
});
