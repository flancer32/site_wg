import assert from 'node:assert/strict';
import test from 'node:test';

import Metadata from '../../../../src/Back/Web/Metadata.js';

test('builds consistent locale metadata from the configured public origin', () => {
    const metadata = new Metadata({
        config: {getBaseUrl: () => 'https://wiredgeese.com/path'},
        tmplConfig: {getAvailableLocales: () => ['en', 'ru', 'es']},
    });
    assert.deepEqual(metadata.forRoute('ru', '/library/concepts/article.html'), {
        canonicalUrl: 'https://wiredgeese.com/ru/library/concepts/article.html',
        alternateUrls: {
            en: 'https://wiredgeese.com/en/library/concepts/article.html',
            ru: 'https://wiredgeese.com/ru/library/concepts/article.html',
            es: 'https://wiredgeese.com/es/library/concepts/article.html',
        },
    });
    const invalid = new Metadata({
        config: {getBaseUrl: () => 'javascript:alert(1)'},
        tmplConfig: {getAvailableLocales: () => ['en']},
    });
    assert.equal(invalid.forRoute('en', '/').canonicalUrl, 'https://wiredgeese.com/en/');
});
