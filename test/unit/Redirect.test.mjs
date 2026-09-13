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
        respond: {
            isWritable: () => true,
            code301_MovedPermanently({res, headers}) {
                res.statusCode = 301;
                res.headers = headers;
            },
        },
        dtoInfo: {create: (info) => info},
        STAGE: {PROCESS: 'PROCESS'},
        helpWeb: {
            extractRoutingInfo: ({path: requestPath}) => {
                const match = requestPath.match(/^\/(en|ru|es)(\/.*)?$/);
                return {locale: match?.[1] ?? 'en', cleanPath: match?.[2] ?? '/'};
            },
        },
    });
}

test('normalizes localized Products aliases to the current catalogue and preserves query strings', async () => {
    const redirect = createRedirect();
    const requests = [
        {url: '/en/products/', expected: '/en/products', locale: 'en', cleanPath: '/products/'},
        {url: '/en/products', expected: '/en/products', locale: 'en', cleanPath: '/products'},
        {url: '/en/products.html?source=legacy', expected: '/en/products?source=legacy', locale: 'en', cleanPath: '/products.html'},
        {url: '/ru/products.html', expected: '/ru/products', locale: 'ru', cleanPath: '/products.html'},
        {url: '/es/products', expected: '/es/products', locale: 'es', cleanPath: '/products'},
        {url: '/es/products.html', expected: '/es/products', locale: 'es', cleanPath: '/products.html'},
    ];

    for (const request of requests) {
        const req = {url: request.url};
        await redirect.applyRedirect({
            req,
            routeInfo: {locale: request.locale, cleanPath: request.cleanPath},
        });
        assert.equal(req.url, request.expected);
        assert.doesNotMatch(req.url, /projects\.html/);
    }
});

test('redirects retired commercial routes to their closest current destinations', async () => {
    const redirect = createRedirect();
    const requests = [
        {url: '/en/index.html', expected: '/en/', locale: 'en', cleanPath: '/index.html'},
        {url: '/en/contacts.html', expected: '/en/contact.html', locale: 'en', cleanPath: '/contacts.html'},
        {url: '/en/products/chatgpt-telegram.html', expected: '/en/projects.html', locale: 'en', cleanPath: '/products/chatgpt-telegram.html'},
        {url: '/ru/land/agent-orchestration-poc/', expected: '/ru/work-with-me.html', locale: 'ru', cleanPath: '/land/agent-orchestration-poc/'},
        {url: '/es/github-flows.html', expected: '/es/work-with-me.html', locale: 'es', cleanPath: '/github-flows.html'},
        {url: '/en/mcp-integration-pilot.html', expected: '/en/work-with-me.html', locale: 'en', cleanPath: '/mcp-integration-pilot.html'},
    ];
    for (const request of requests) {
        const req = {url: request.url};
        await redirect.applyRedirect({req, routeInfo: {locale: request.locale, cleanPath: request.cleanPath}});
        assert.equal(req.url, request.expected);
    }
});

test('sends a permanent redirect for the legacy localized index before static or template delivery', async () => {
    const redirect = createRedirect();
    const request = {url: '/en/index.html'};
    const response = {};
    const context = {request, response, completed: false};

    await redirect.handle(context);

    assert.equal(response.statusCode, 301);
    assert.equal(response.headers.location, '/en/');
    assert.equal(context.completed, true);
});

test('sends a permanent HTTP redirect before template rendering', async () => {
    const redirect = createRedirect();
    const request = {url: '/en/products/chatgpt-telegram.html?source=legacy'};
    const response = {};
    const context = {request, response, completed: false};

    await redirect.handle(context);

    assert.equal(response.statusCode, 301);
    assert.equal(response.headers.location, '/en/projects.html?source=legacy');
    assert.equal(context.completed, true);
});
