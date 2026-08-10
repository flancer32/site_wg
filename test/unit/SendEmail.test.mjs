import assert from 'node:assert/strict';
import test from 'node:test';

import SendEmail from '../../src/Back/Web/Handler/SendEmail.js';

test('reads SMTP settings from the APP cfg namespace', () => {
    /** @type {string|undefined} */
    let requestedNamespace;
    new SendEmail({
        http2: {constants: {}},
        respond: {},
        dtoInfo: {create: () => ({})},
        logger: {forSource: () => ({})},
        formProtection: {},
        reader: {
            get(namespace) {
                requestedNamespace = namespace;
                return {};
            },
        },
        STAGE: {PROCESS: 'process'},
    });

    assert.equal(requestedNamespace, 'APP');
});
