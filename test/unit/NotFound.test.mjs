import assert from 'node:assert/strict';
import * as http2 from 'node:http2';
import test from 'node:test';

import NotFound from '../../src/Back/Web/Handler/NotFound.js';

function createHandler() {
    const calls = [];
    const renderData = {canonicalUrl: 'unsafe', alternateUrls: {en: 'unsafe'}};
    const handler = new NotFound({
        'node:http2': http2,
        Fl32_Web_Back_Helper_Respond$: {
            isWritable: () => true,
            code404_NotFound: (payload) => calls.push(payload),
        },
        Fl32_Cms_Back_Api_Adapter$: {
            getRenderData: async ({req}) => {
                assert.match(req.url, /^\/(en|ru|es)\/404\.html$/);
                return {target: {name: '404.html'}, data: renderData, options: {}};
            },
        },
        Fl32_Cms_Back_Config$: {
            getLocaleAllowed: () => ['en', 'ru', 'es'],
            getLocaleBaseWeb: () => 'en',
        },
        Fl32_Cms_Back_Helper_Web$: {
            extractRoutingInfo: ({path}) => ({locale: path.startsWith('/ru/') ? 'ru' : 'en'}),
        },
        Fl32_Tmpl_Back_Service_Load$: {
            perform: async () => ({template: 'template'}),
        },
        Fl32_Tmpl_Back_Service_Render$: {
            perform: async ({data}) => {
                assert.equal(data.isNotFound, true);
                return {content: '<!doctype html><html lang="ru">404</html>'};
            },
        },
    });
    return {handler, calls, renderData};
}

test('renders a localized HTML 404 and restores the original request URL', async () => {
    const {handler, calls, renderData} = createHandler();
    const req = {method: 'GET', url: '/ru/missing.html?source=test'};
    const handled = await handler.handle(req, {});

    assert.equal(handled, true);
    assert.equal(req.url, '/ru/missing.html?source=test');
    assert.equal(calls.length, 1);
    assert.equal(calls[0].body, '<!doctype html><html lang="ru">404</html>');
    assert.equal(calls[0].headers['content-type'], 'text/html; charset=utf-8');
    assert.equal(calls[0].headers['content-length'], Buffer.byteLength(calls[0].body));
    assert.equal(calls[0].headers['content-encoding'], undefined);
    assert.equal(renderData.canonicalUrl, undefined);
    assert.deepEqual(renderData.alternateUrls, {});
});

test('handles malformed escapes safely and sends no body for HEAD', async () => {
    const {handler, calls} = createHandler();
    const req = {method: 'HEAD', url: '/ru/%ZZ'};
    const handled = await handler.handle(req, {});

    assert.equal(handled, true);
    assert.equal(req.url, '/ru/%ZZ');
    assert.equal(calls[0].body, '');
    assert.ok(calls[0].headers['content-length'] > 0);
});
