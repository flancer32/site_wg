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

test('commercial pages present product construction, engineering ownership, and a scope-based start', () => {
    const html = render('en', 'work-with-me.html');
    assert.match(html, /build web applications and software products from the ground up/i);
    assert.match(html, /You define the business problem/i);
    assert.match(html, /decision authority over and take responsibility/i);
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

test('English home presents the system and systems as evidence rather than services', () => {
    const html = render('en', 'index.html');
    assert.match(html, /engineering system of my own/i);
    assert.match(html, /AI agents under human control/i);
    assert.match(html, /Alarisa/i);
    assert.match(html, /projects are evidence|Evidence in working systems/i);
    assert.doesNotMatch(html, /MCP Integration Pilot|ChatGPT \+ Telegram|agent-service problem/i);
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
