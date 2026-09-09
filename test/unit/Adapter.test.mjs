import assert from 'node:assert/strict';
import path from 'node:path';
import test from 'node:test';

import Adapter from '../../src/Back/Di/Replace/Adapter.js';

const locales = ['en', 'ru', 'es'];

function createAdapter({baseUrl, redirect} = {}) {
    const config = {
        getBaseUrl: () => baseUrl,
    };
    const tmplConfig = {
        getAvailableLocales: () => locales,
        getDefaultLocale: () => 'en',
    };
    const helpWeb = {
        extractRoutingInfo({path: requestPath, fallbackLocale}) {
            const match = requestPath.match(/^\/(en|ru|es)(\/.*)?$/);
            return {
                locale: match?.[1] || fallbackLocale,
                cleanPath: match?.[2] || '/',
            };
        },
    };
    return new Adapter({
        path,
        cmsAdapter: {
            getRenderData: async () => ({target: {}, data: {}, options: {}}),
        },
        helpWeb,
        config,
        tmplConfig,
        logger: {forSource: () => ({error() {}, warn() {}})},
        blogHandler: {collectBlogIndex: async () => []},
        redirectHandler: {
            applyRedirect: async ({req}) => redirect?.(req),
        },
        formProtection: {
            getFormIdAgentOrchestrationPoc: () => 'poc',
            issueFormToken: async () => 'token',
        },
    });
}

test('uses a stable public fallback instead of request host metadata', async () => {
    const adapter = createAdapter();
    const result = await adapter.getRenderData({
        req: {
            url: '/ru/projects.html',
            headers: {host: 'attacker.example', 'x-forwarded-proto': 'javascript'},
            socket: {},
        },
    });

    assert.equal(result.data.canonicalUrl, 'https://wiredgeese.com/ru/projects.html');
    assert.equal(result.data.alternateUrls.es, 'https://wiredgeese.com/es/projects.html');
});

test('accepts configured HTTP origins and rejects invalid protocols', async () => {
    const local = createAdapter({baseUrl: 'http://127.0.0.1:3000/path'});
    const localResult = await local.getRenderData({req: {url: '/en/', headers: {}, socket: {}}});
    assert.equal(localResult.data.canonicalUrl, 'http://127.0.0.1:3000/en/');

    const invalid = createAdapter({baseUrl: 'javascript://metadata.example'});
    const invalidResult = await invalid.getRenderData({req: {url: '/en/', headers: {}, socket: {}}});
    assert.equal(invalidResult.data.canonicalUrl, 'https://wiredgeese.com/en/');
});

test('uses the effective post-redirect route and tolerates malformed escapes', async () => {
    const redirected = createAdapter({redirect: (req) => { req.url = '/es/contact.html'; }});
    const redirectedResult = await redirected.getRenderData({req: {url: '/es/contacts.html', headers: {}, socket: {}}});
    assert.equal(redirectedResult.data.canonicalUrl, 'https://wiredgeese.com/es/contact.html');

    const malformed = createAdapter();
    await assert.doesNotReject(() => malformed.getRenderData({
        req: {url: '/en/%ZZ', headers: {}, socket: {}},
    }));
});

test('marks only publication details and removes metadata from 404 pages', async () => {
    const adapter = createAdapter();
    const index = await adapter.getRenderData({req: {url: '/en/blog/', headers: {}, socket: {}}});
    const detail = await adapter.getRenderData({req: {url: '/en/blog/2026/example.html', headers: {}, socket: {}}});
    const missing = await adapter.getRenderData({req: {url: '/en/404.html', headers: {}, socket: {}}});

    assert.equal(index.data.isPublication, false);
    assert.equal(detail.data.isPublication, true);
    assert.equal(missing.data.isNotFound, true);
    assert.equal(missing.data.canonicalUrl, undefined);
    assert.deepEqual(missing.data.alternateUrls, {});
});

test('includes localized ChatGPT + Telegram product alternates', async () => {
    const adapter = createAdapter();
    const result = await adapter.getRenderData({
        req: {url: '/en/products/chatgpt-telegram.html', headers: {}, socket: {}},
    });

    assert.equal(result.data.canonicalUrl, 'https://wiredgeese.com/en/products/chatgpt-telegram.html');
    assert.deepEqual(result.data.alternateUrls, {
        en: 'https://wiredgeese.com/en/products/chatgpt-telegram.html',
        ru: 'https://wiredgeese.com/ru/products/chatgpt-telegram.html',
        es: 'https://wiredgeese.com/es/products/chatgpt-telegram.html',
    });
});

test('maps Contact topics through an allowlist without changing canonical metadata', async () => {
    const adapter = createAdapter();

    const product = await adapter.getRenderData({
        req: {url: '/ru/contact.html?topic=product', headers: {}, socket: {}},
    });
    const telegram = await adapter.getRenderData({
        req: {url: '/es/contact.html?topic=chatgpt-telegram', headers: {}, socket: {}},
    });
    const unknown = await adapter.getRenderData({
        req: {url: '/en/contact.html?topic=%3Cscript%3E', headers: {}, socket: {}},
    });

    assert.equal(product.data.contactTopic, 'product');
    assert.equal(telegram.data.contactTopic, 'chatgpt-telegram');
    assert.equal(unknown.data.contactTopic, 'default');
    assert.equal(telegram.data.canonicalUrl, 'https://wiredgeese.com/es/contact.html');
    assert.deepEqual(telegram.data.alternateUrls, {
        en: 'https://wiredgeese.com/en/contact.html',
        ru: 'https://wiredgeese.com/ru/contact.html',
        es: 'https://wiredgeese.com/es/contact.html',
    });
});
