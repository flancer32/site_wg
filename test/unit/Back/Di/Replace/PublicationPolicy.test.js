import test from 'node:test';
import assert from 'node:assert/strict';
import Policy from '../../../../../src/Back/Di/Replace/PublicationPolicy.js';

test('host policy leaves native CMS publication families disabled by default', () => {
    const policy = new Policy({config: {}});
    assert.equal(policy.getMode(), 'families');
    assert.deepEqual(policy.getStaticPrefixes(), ['/assets/']);
    assert.equal(policy.getPresentationName(), 'publication.html');
});
