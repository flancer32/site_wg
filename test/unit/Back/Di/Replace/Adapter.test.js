import assert from 'node:assert/strict';
import test from 'node:test';

import Adapter from '../../../../../src/Back/Di/Replace/Adapter.js';

test('adds localized canonical metadata and avoids enriching unrelated pages', async () => {
    const adapter = new Adapter({path: {extname: (value) => value.endsWith('.html') ? '.html' : '', posix: {}}, cmsAdapter: {getRenderData: async () => ({target: {}, data: {}})}, helpWeb: {extractRoutingInfo: () => ({locale: 'en', cleanPath: '/'})}, config: {getBaseUrl: () => 'https://wiredgeese.com'}, tmplConfig: {getAvailableLocales: () => ['en', 'ru'], getDefaultLocale: () => 'en'}, logger: {forSource: () => ({warn() {}, error() {}})}, blogHandler: {collectRecentBlogEntries: async () => []}});
    const result = await adapter.getRenderData({req: {url: '/en/'}});
    assert.equal(result.data.canonicalUrl, 'https://wiredgeese.com/en/');
    assert.deepEqual(result.data.alternateUrls, {en: 'https://wiredgeese.com/en/', ru: 'https://wiredgeese.com/ru/'});
});
