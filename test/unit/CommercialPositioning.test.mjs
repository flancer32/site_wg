import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';
import {fileURLToPath} from 'node:url';

import nunjucks from 'nunjucks';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');

function render(locale, template) {
    return nunjucks.configure(path.join(root, 'tmpl/web', locale), {autoescape: true}).render(template, {
        allowedLocales: ['en', 'ru', 'es'], locale,
        recentJournal: {items: []},
    });
}

async function readTemplate(locale, template) {
    return fs.readFile(path.join(root, 'tmpl/web', locale, template), 'utf8');
}

function homeStructure(html) {
    return {
        sections: [...html.matchAll(/<section class="([^"]+)" aria-labelledby="([^"]+)">/g)]
            .map(([, className, labelledBy]) => ({className, labelledBy})),
        headings: [...html.matchAll(/<h([1-3])(?: id="([^"]+)")?>/g)]
            .map(([, level, id]) => ({level, id: id ?? null})),
        links: [...html.matchAll(/href="\/(en|ru|es)(\/[^\"]*)"/g)]
            .map(([, , destination]) => destination),
    };
}

test('commercial pages present product construction, engineering ownership, and a scope-based start', () => {
    const html = render('en', 'work-with-me.html');
    assert.match(html, /build web applications and software products from the ground up/i);
    assert.match(html, /You define the business problem/i);
    assert.match(html, /I own the architecture and engineering approach/i);
    assert.match(html, /I choose and maintain the architecture/i);
    assert.match(html, /Scope and price/i);
    assert.match(html, /contact\.html\?topic=product/);
    assert.doesNotMatch(html, /ChatGPT \+ Telegram/i);
});

test('all maintained locales expose a product conversation and no retired commercial page', async () => {
    for (const locale of ['en', 'ru', 'es']) {
        const home = render(locale, 'index.html');
        const contact = render(locale, 'contact.html');
        const projects = render(locale, 'projects.html');
        assert.match(home, new RegExp(`/${locale}/work-with-me\\.html`));
        assert.match(home, new RegExp(`/${locale}/contact\\.html\\?topic=product`));
        assert.match(home, new RegExp(`/${locale}/contact\\.html\\?topic=pde`));
        assert.match(projects, /PDE/);
        assert.match(projects, new RegExp(`/${locale}/contact\\.html\\?topic=pde`));
        assert.match(contact, /credentials|учётные данные|credenciales/i);
        await assert.rejects(fs.access(path.join(root, 'tmpl/web', locale, 'products/chatgpt-telegram.html')));
        await assert.rejects(fs.access(path.join(root, 'tmpl/web', locale, 'land/agent-orchestration-poc/index.html')));
        await assert.rejects(fs.access(path.join(root, 'tmpl/web', locale, 'contacts.html')));
    }
});

test('principal buyer-journey pages keep an equivalent semantic structure in every locale', () => {
    const pages = ['index.html', 'how-it-works.html', 'projects.html', 'work-with-me.html', 'about.html', 'contact.html'];
    for (const page of pages) {
        const structures = ['en', 'ru', 'es'].map((locale) => {
            const html = render(locale, page);
            return {
                h1: (html.match(/<h1[ >]/g) ?? []).length,
                h2: (html.match(/<h2[ >]/g) ?? []).length,
                sections: (html.match(/<section[ >]/g) ?? []).length,
            };
        });
        assert.equal(structures[0].h1, 1, `${page}: English has one H1`);
        assert.deepEqual(structures[1], structures[0], `${page}: Russian matches English structure`);
        assert.deepEqual(structures[2], structures[0], `${page}: Spanish matches English structure`);
    }

    for (const locale of ['en', 'ru', 'es']) {
        assert.match(render(locale, 'contact.html'), /<ol class="process-grid">/, `${locale}: contact steps are a semantic list`);
    }
});

test('localized Home pages preserve the English document structure and discovery paths', async () => {
    const english = render('en', 'index.html');
    const canonical = homeStructure(english);
    const expectedSections = [
        {className: 'home-hero', labelledBy: 'home-title'},
        {className: 'home-products', labelledBy: 'system-title'},
        {className: 'home-section', labelledBy: 'paths-title'},
        {className: 'home-section home-preview--vision home-current-work', labelledBy: 'proof-title'},
        {className: 'home-section home-preview', labelledBy: 'journal-title'},
        {className: 'home-section home-preview--maker', labelledBy: 'maker-title'},
        {className: 'cta-panel home-cta', labelledBy: 'start-title'},
    ];

    assert.deepEqual(canonical.sections, expectedSections, 'English Home defines the canonical section order');
    assert.match(english, /<div class="home-page">[\s\S]*<div class="home-opening">/);
    assert.equal((english.match(/class="featured-work-card"/g) ?? []).length, 3, 'English Home has three evidence cards');
    assert.equal((english.match(/class="fit-card fit-card--yes"/g) ?? []).length, 2, 'English Home has both commercial paths');

    for (const locale of ['ru', 'es']) {
        const localized = render(locale, 'index.html');
        assert.deepEqual(homeStructure(localized), canonical, `${locale}: Home structure and localized destinations match English`);
        assert.equal((localized.match(/class="featured-work-card"/g) ?? []).length, 3, `${locale}: three evidence cards`);
        assert.match(localized, /home-preview--maker/, `${locale}: responsible-maker section`);
        assert.match(localized, /contact\.html\?topic=product/, `${locale}: product CTA`);
        assert.match(localized, /contact\.html\?topic=pde/, `${locale}: PDE CTA`);

        const source = await readTemplate(locale, 'index.html');
        assert.match(source, /\{% if recentJournal and recentJournal\.items\.length %\}/, `${locale}: Journal template integration`);
        assert.match(source, /\{% for item in recentJournal\.items %\}/, `${locale}: Journal item loop`);
    }
});

test('English home presents the system and systems as evidence rather than services', () => {
    const html = render('en', 'index.html');
    assert.match(html, /directing AI agents through an engineering system of my own/i);
    assert.match(html, /agents do much of the direct implementation work/i);
    assert.match(html, /no longer write most implementation code by hand/i);
    assert.match(html, /I change that system when working software reveals a better way/i);
    assert.match(html, /AI agents are my primary development interface/i);
    assert.match(html, /Alarisa/i);
    assert.match(html, /projects are evidence|Evidence in working systems/i);
    assert.doesNotMatch(html, /MCP Integration Pilot|ChatGPT \+ Telegram|agent-service problem/i);
});

test('Work with Alex excludes retired service-catalogue positioning', () => {
    const html = render('en', 'work-with-me.html');
    assert.match(html, /product engineering, not interchangeable hourly capacity/i);
    assert.match(html, /standalone review/i);
    assert.match(html, /generic AI or MCP integration/i);
    assert.match(html, /rescue work, or staff augmentation/i);
});

test('Journal presents evolving practice instead of a generic development guide', () => {
    const expectedPractice = {
        en: /Records of what I build, observe, change, and learn/i,
        ru: /Записи о том, что я создаю, наблюдаю, меняю и узнаю/i,
        es: /Registros de lo que construyo, observo, cambio y aprendo/i,
    };
    for (const [locale, expected] of Object.entries(expectedPractice)) {
        const html = render(locale, 'blog.html');
        assert.match(html, expected, `${locale}: Journal records practice`);
        assert.match(html, /not a generic guide|не универсальная инструкция|no una guía genérica/u, `${locale}: Journal does not teach a universal method`);
    }
});

test('English Current Work makes PDE and Telegram Desk concrete early product paths', () => {
    const html = render('en', 'projects.html');
    assert.match(html, /Independent product within the Alarisa direction/i);
    assert.match(html, /MCP is one technical interface/i);
    assert.match(html, /deployments available by agreement/i);
    assert.match(html, /list contacts, list and search known chats, read known-chat history, and send plain-text messages/i);
    assert.match(html, /contact\.html\?topic=pde/);
    assert.doesNotMatch(html, /not a public offer/i);
});
