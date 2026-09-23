import assert from 'node:assert/strict';
import test from 'node:test';

import Preprocessor from '../../src/Bootstrap/Di/Preprocessor.js';

test('replaces the current DI address fields used by CLI 2.4 container policy', () => {
    const preprocess = Preprocessor();
    const requested = Object.freeze({
        addressKind: 'teq',
        address: 'Fl32_Cms_Back_Api_Adapter',
        exportName: null,
        lifestyle: 'S',
        wrappers: Object.freeze([]),
    });
    assert.equal(preprocess(requested).address, 'App_Back_Di_Replace_Adapter');
    assert.equal(preprocess(requested).lifestyle, 'S');
    const untouched = Object.freeze({...requested, address: 'Other_Service'});
    assert.equal(preprocess(untouched), untouched);
});
