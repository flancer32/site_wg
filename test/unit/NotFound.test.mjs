import assert from 'node:assert/strict';
import * as http2 from 'node:http2';
import test from 'node:test';

import NotFound from '../../src/Back/Web/Handler/NotFound.js';

function createHandler() {
    const calls = [];
    const renderData = {canonicalUrl: 'unsafe', alternateUrls: {en: 'unsafe'}};
    const handler = new NotFound({
        http2,
        respond: {
            isWritable: () => true,
            code404_NotFound: (payload) => calls.push(payload),
        },
        dtoInfo: {create: (data) => Object.freeze(data)},
        adapter: {
            getRenderData: async ({req}) => {
                assert.match(req.url, /^\/(en|ru|es)\/404\.html$/);
                return {target: {name: '404.html'}, data: renderData, options: {}};
            },
        },
        tmplConfig: {
            getAvailableLocales: () => ['en', 'ru', 'es'],
            getDefaultLocale: () => 'en',
        },
        helpWeb: {
            extractRoutingInfo: ({path}) => ({locale: path.startsWith('/ru/') ? 'ru' : 'en'}),
        },
        servTmplLoad: {
            perform: async () => ({template: 'template'}),
        },
        servTmplRender: {
            perform: async ({data}) => {
                assert.equal(data.isNotFound, true);
                return {content: '<!doctype html><html lang="ru">404</html>'};
            },
        },
        STAGE: {PROCESS: 'process'},
    });
    return {handler, calls, renderData};
}

test('renders a localized HTML 404 and restores the original request URL', async () => {
    const {handler, calls, renderData} = createHandler();
    const req = {method: 'GET', url: '/ru/missing.html?source=test'};
    const context = {request: req, response: {}, completed: false};
    await handler.handle(context);

    assert.equal(context.completed, true);
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
    const context = {request: req, response: {}, completed: false};
    await handler.handle(context);

    assert.equal(context.completed, true);
    assert.equal(req.url, '/ru/%ZZ');
    assert.equal(calls[0].body, '');
    assert.ok(calls[0].headers['content-length'] > 0);
});
