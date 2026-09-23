import assert from 'node:assert/strict';
import test from 'node:test';

import Plugin from '../../../../src/Back/Cli/Plugin.js';

test('registers project handlers on startup and leaves shutdown clean', async () => {
    const registered = [];
    const plugin = new Plugin({pipeline: {addHandler: (handler) => registered.push(handler)}, handRedirect: 'redirect', handMarkdown: 'markdown', handNotFound: 'not-found'});
    await plugin.onStartup();
    await plugin.onShutdown();
    assert.deepEqual(registered, ['redirect', 'markdown', 'not-found']);
});
