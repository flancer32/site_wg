import assert from 'node:assert/strict';
import * as http2 from 'node:http2';
import test from 'node:test';

import Markdown from '../../../../../src/Back/Web/Handler/Markdown.js';

test('serves an English Markdown representation and completes the request', async () => {
    const responses = [];
    const handler = new Markdown({http2, fs: {readFile: async () => 'source'}, path: {join: (...parts) => parts.join('/')}, respond: {isWritable: () => true, code200_Ok: (response) => responses.push(response)}, dtoInfo: {create: (value) => value}, config: {}, tmplConfig: {getRootPath: () => '/root'}, servTmplRender: {perform: async () => ({content: '<article>rendered</article>'})}, publication: {parseRoute: () => ({locale: 'en', year: '2026', slug: 'entry', representation: 'md'}), load: async () => ({source: '# Entry', metadata: {relations: []}})}, STAGE: {PROCESS: 'process'}});
    const context = {request: {method: 'GET', url: '/en/blog/2026/entry.md'}, response: {}, completed: false};
    await handler.handle(context);
    assert.equal(context.completed, true);
    assert.equal(responses[0].body, '# Entry');
    assert.equal(responses[0].headers['content-type'], 'text/markdown; charset=utf-8');
});
