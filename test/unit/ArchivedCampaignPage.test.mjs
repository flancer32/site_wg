import assert from 'node:assert/strict';
import path from 'node:path';
import test from 'node:test';
import {fileURLToPath} from 'node:url';

import nunjucks from 'nunjucks';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const copies = {
    en: {
        title: 'Agent Orchestration PoC — archived experiment | Wired Geese',
        status: 'Archived experiment',
        description: 'Archived GitHub Flows experiment',
        products: 'Explore current products',
        howItWorks: 'How I build software with AI agents',
    },
    ru: {
        title: 'Agent Orchestration PoC — архивный эксперимент | Wired Geese',
        status: 'Архивный эксперимент',
        description: 'Архивный эксперимент GitHub Flows',
        products: 'Посмотреть актуальные продукты',
        howItWorks: 'Как я создаю ПО с AI-агентами',
    },
    es: {
        title: 'Agent Orchestration PoC — experimento archivado | Wired Geese',
        status: 'Experimento archivado',
        description: 'Experimento archivado de GitHub Flows',
        products: 'Explorar productos actuales',
        howItWorks: 'Cómo creo software con agentes de IA',
    },
};

function render(locale) {
    const environment = nunjucks.configure(path.join(root, 'tmpl', 'web', locale), {autoescape: true});
    const canonicalUrl = `https://wiredgeese.com/${locale}/land/agent-orchestration-poc/`;
    return environment.render('land/agent-orchestration-poc/index.html', {
        allowedLocales: ['en', 'ru', 'es'],
        locale,
        canonicalUrl,
        alternateUrls: Object.fromEntries(['en', 'ru', 'es'].map((targetLocale) => [
            targetLocale,
            `https://wiredgeese.com/${targetLocale}/land/agent-orchestration-poc/`,
        ])),
    });
}

test('renders the localized campaign route as an indexable archived experiment', () => {
    for (const [locale, copy] of Object.entries(copies)) {
        const html = render(locale);

        assert.ok(html.includes(`<title>${copy.title}</title>`));
        assert.ok(html.includes(copy.status));
        assert.ok(html.includes(copy.description));
        assert.match(html, new RegExp(`<link rel="canonical" href="https://wiredgeese\\.com/${locale}/land/agent-orchestration-poc/">`));
        assert.match(html, new RegExp(`href="/${locale}/products/"`));
        assert.match(html, new RegExp(`href="/${locale}/how-it-works\\.html"`));
        assert.ok(html.includes(copy.products));
        assert.ok(html.includes(copy.howItWorks));
        assert.doesNotMatch(html, /€50|50 €|trial setup|prueba guiada|пробный стенд/i);
        assert.doesNotMatch(html, /<form\b|form_token|\/api\/send-email|request_poc|hosted_poc/i);
        assert.doesNotMatch(html, /Request a €50 PoC|Запросить PoC|Solicitar un PoC/i);
        assert.doesNotMatch(html, /<meta name="robots" content="noindex,follow"/);
    }
});
