import assert from 'node:assert/strict';
import path from 'node:path';
import test from 'node:test';

import Adapter from '../../src/Back/Di/Replace/Adapter.js';

const locales = ['en', 'ru', 'es'];

function createAdapter({baseUrl, redirect, blogEntries = [], relatedEntries = [], entryRelations = []} = {}) {
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
        blogHandler: {
            collectBlogIndex: async () => [],
            collectRecentBlogEntries: async () => blogEntries,
            collectRelatedBlogEntries: async () => relatedEntries,
            collectEntryRelations: async () => entryRelations,
        },
        redirectHandler: {
            applyRedirect: async ({req}) => redirect?.(req),
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

test('uses directory-index canonical and alternate routes for the Products catalogue', async () => {
    const adapter = createAdapter();
    const result = await adapter.getRenderData({
        req: {url: '/ru/products/', headers: {}, socket: {}},
    });

    assert.equal(result.data.canonicalUrl, 'https://wiredgeese.com/ru/products/');
    assert.deepEqual(result.data.alternateUrls, {
        en: 'https://wiredgeese.com/en/products/',
        ru: 'https://wiredgeese.com/ru/products/',
        es: 'https://wiredgeese.com/es/products/',
    });
});

test('uses the canonical Products directory identity after a legacy alias is normalized', async () => {
    const adapter = createAdapter({
        redirect: (req) => { req.url = '/en/products?source=legacy'; },
    });
    const result = await adapter.getRenderData({
        req: {url: '/en/products.html?source=legacy', headers: {}, socket: {}},
    });

    assert.equal(result.data.canonicalUrl, 'https://wiredgeese.com/en/products/');
    assert.deepEqual(result.data.alternateUrls, {
        en: 'https://wiredgeese.com/en/products/',
        ru: 'https://wiredgeese.com/ru/products/',
        es: 'https://wiredgeese.com/es/products/',
    });
});

test('preserves localized Alarisa canonical and alternate routes', async () => {
    const adapter = createAdapter();
    const result = await adapter.getRenderData({
        req: {url: '/ru/projects/alarisa.html', headers: {}, socket: {}},
    });

    assert.equal(result.data.canonicalUrl, 'https://wiredgeese.com/ru/projects/alarisa.html');
    assert.deepEqual(result.data.alternateUrls, {
        en: 'https://wiredgeese.com/en/projects/alarisa.html',
        ru: 'https://wiredgeese.com/ru/projects/alarisa.html',
        es: 'https://wiredgeese.com/es/projects/alarisa.html',
    });
});

test('preserves localized How-it-works canonical and alternate routes', async () => {
    const adapter = createAdapter();
    const result = await adapter.getRenderData({
        req: {url: '/ru/how-it-works.html', headers: {}, socket: {}},
    });

    assert.equal(result.data.canonicalUrl, 'https://wiredgeese.com/ru/how-it-works.html');
    assert.deepEqual(result.data.alternateUrls, {
        en: 'https://wiredgeese.com/en/how-it-works.html',
        ru: 'https://wiredgeese.com/ru/how-it-works.html',
        es: 'https://wiredgeese.com/es/how-it-works.html',
    });
});

test('preserves the localized canonical and alternate routes for the archived campaign', async () => {
    const adapter = createAdapter();
    const result = await adapter.getRenderData({
        req: {url: '/es/land/agent-orchestration-poc/', headers: {}, socket: {}},
    });

    assert.equal(result.data.canonicalUrl, 'https://wiredgeese.com/es/land/agent-orchestration-poc/');
    assert.deepEqual(result.data.alternateUrls, {
        en: 'https://wiredgeese.com/en/land/agent-orchestration-poc/',
        ru: 'https://wiredgeese.com/ru/land/agent-orchestration-poc/',
        es: 'https://wiredgeese.com/es/land/agent-orchestration-poc/',
    });
    assert.equal(result.data.formToken, undefined);
});

test('maps Contact topics through an allowlist without changing canonical metadata', async () => {
    const adapter = createAdapter();

    const product = await adapter.getRenderData({
        req: {url: '/ru/contact.html?topic=product', headers: {}, socket: {}},
    });
    const telegram = await adapter.getRenderData({
        req: {url: '/es/contact.html?topic=chatgpt-telegram', headers: {}, socket: {}},
    });
    const mcp = await adapter.getRenderData({
        req: {url: '/en/contact.html?topic=mcp-integration', headers: {}, socket: {}},
    });
    const commercial = await adapter.getRenderData({
        req: {url: '/en/contact.html?topic=commercial', headers: {}, socket: {}},
    });
    const unknown = await adapter.getRenderData({
        req: {url: '/en/contact.html?topic=%3Cscript%3E', headers: {}, socket: {}},
    });

    assert.equal(product.data.contactTopic, 'product');
    assert.equal(telegram.data.contactTopic, 'chatgpt-telegram');
    assert.equal(mcp.data.contactTopic, 'mcp-integration');
    assert.equal(commercial.data.contactTopic, 'commercial');
    assert.equal(unknown.data.contactTopic, 'default');
    assert.equal(telegram.data.canonicalUrl, 'https://wiredgeese.com/es/contact.html');
    assert.deepEqual(telegram.data.alternateUrls, {
        en: 'https://wiredgeese.com/en/contact.html',
        ru: 'https://wiredgeese.com/ru/contact.html',
        es: 'https://wiredgeese.com/es/contact.html',
    });
});

test('adds a localized recent-Journal projection only to Home', async () => {
    const entries = [{slug: 'latest'}];
    const adapter = createAdapter({blogEntries: entries});
    const home = await adapter.getRenderData({req: {url: '/ru/', headers: {}, socket: {}}});
    const product = await adapter.getRenderData({req: {url: '/ru/products/', headers: {}, socket: {}}});

    assert.deepEqual(home.data.recentJournal, {items: entries});
    assert.equal(product.data.recentJournal, undefined);
});

test('keeps authored Event relationships separate from bounded Current Work evidence', async () => {
    const adapter = createAdapter({
        relatedEntries: [{slug: 'teqcms-event'}],
        entryRelations: ['teqcms'],
    });
    const work = await adapter.getRenderData({req: {url: '/es/projects.html', headers: {}, socket: {}}});
    const event = await adapter.getRenderData({
        req: {url: '/es/blog/2025/20250529-01-teq-cms-demo.html', headers: {}, socket: {}},
    });

    assert.deepEqual(work.data.currentWorkEvidence, {items: [{slug: 'teqcms-event'}]});
    assert.deepEqual(event.data.journalRelations, ['teqcms']);
});
