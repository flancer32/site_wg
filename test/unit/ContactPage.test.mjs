import assert from 'node:assert/strict';
import path from 'node:path';
import test from 'node:test';
import {fileURLToPath} from 'node:url';
import nunjucks from 'nunjucks';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');

function render(locale, contactTopic) {
    return nunjucks.configure(path.join(root, 'tmpl', 'web', locale), {autoescape: true}).render('contact.html', {allowedLocales: ['en', 'ru', 'es'], locale, contactTopic});
}

test('Contact has localized generic, MCP, and Telegram human handoffs without a customer runtime', () => {
    for (const locale of ['en', 'ru', 'es']) {
        const generic = render(locale, 'commercial');
        const mcp = render(locale, 'mcp-integration');
        const telegram = render(locale, 'chatgpt-telegram');
        assert.match(generic, /Commercial conversation|Коммерческий разговор|Conversación comercial/u);
        assert.match(mcp, /MCP/);
        assert.match(telegram, /ChatGPT \+ Telegram/);
        assert.match(mcp, /MCP%20Integration%20Pilot%20inquiry/);
        assert.match(telegram, /ChatGPT%20%2B%20Telegram%20inquiry/);
        for (const html of [generic, mcp, telegram]) {
            assert.match(html, /credentials|учётные данные|credenciales/i);
            assert.doesNotMatch(html, /<form\b|GitHub Flows|Agent Orchestration PoC|€50/u);
        }
    }
});
