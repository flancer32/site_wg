import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
import {createServer} from 'node:net';
import {setTimeout as delay} from 'node:timers/promises';
import test from 'node:test';

async function freePort() {
    const server = createServer();
    await new Promise((resolve, reject) => server.once('error', reject).listen(0, '127.0.0.1', resolve));
    const address = server.address();
    assert.ok(address && typeof address !== 'string');
    const port = address.port;
    await new Promise((resolve, reject) => server.close(error => error ? reject(error) : resolve()));
    return port;
}

test('real CMS serves Journal indexes and localized HTML and Markdown', async () => {
    const port = await freePort();
    const proc = spawn(process.execPath, ['node_modules/@teqfw/cli/bin/teq.mjs', 'web:start', '--dotenv-file', '.env.example'], {
        cwd: process.cwd(), env: {...process.env, TEQFW_WEB__PORT: String(port), TEQ_CMS__BASE_URL: 'https://wiredgeese.com', TEQFW_TMPL__ENGINE: 'nunjucks'},
        stdio: 'ignore',
    });
    const origin = `http://127.0.0.1:${port}`;
    try {
        let ready = false;
        for (let i = 0; i < 60; i++) {
            if (proc.exitCode !== null) throw new Error(`CMS exited ${proc.exitCode}`);
            try { const r = await fetch(`${origin}/en/projects.html`); if (r.ok) { ready = true; break; } } catch {}
            await delay(250);
        }
        assert.ok(ready, 'CMS did not start');
        for (const locale of ['en', 'ru', 'es']) {
            for (const [path, type] of [[`/${locale}/blog/`, 'text/html'],
                [`/${locale}/blog/2026/20261030-01-pde-network-site.html`, 'text/html'],
                [`/${locale}/blog/2026/20261030-01-pde-network-site.md`, 'text/markdown']]) {
                const response = await fetch(origin + path, {headers: {accept: 'text/html'}});
                assert.equal(response.status, 200, path);
                assert.ok(response.headers.get('content-type')?.startsWith(type), path);
            }
        }
        for (const locale of ['en', 'ru', 'es']) {
            for (const page of ['projects.html', 'projects/portfolio.html', 'projects/archive.html']) {
                const route = `/${locale}/${page}`;
                const response = await fetch(origin + route, {headers: {accept: 'text/html'}});
                assert.equal(response.status, 200, route);
                const html = await response.text();
                assert.match(html, new RegExp(`<link rel="canonical" href="https://wiredgeese.com${route}">`));
                for (const alternate of ['en', 'ru', 'es']) {
                    assert.ok(html.includes(`hreflang="${alternate}" href="https://wiredgeese.com/${alternate}/${page}"`), route);
                }
                if (page === 'projects.html') {
                    for (const anchor of ['pde', 'telegram-desk', 'shared-files-desk', 'teqcms']) assert.ok(html.includes(`id="${anchor}"`), anchor);
                    assert.ok(html.includes(`/${locale}/projects/portfolio.html`));
                    assert.ok(html.includes(`/${locale}/projects/archive.html`));
                    assert.doesNotMatch(html, /id="(?:mindstream|rehapp)"/);
                } else {
                    const ids = page.includes('portfolio') ? ['rehapp', 'santegra', 'domotehnika'] : ['tg-wa-blog-post', 'mindstream', 'svyazist', 'smtp-logger', 'nutrilog', 'pwa-wallet', 'remote-console', 'deepgram', 'webauthn', 'browser-oauth2', 'bwl'];
                    for (const id of ids) assert.ok(html.includes(`id="${id}"`), `${route}#${id}`);
                }
            }
        }
        const missing = await fetch(`${origin}/en/blog/2026/missing-article.html`);
        assert.equal(missing.status, 404);
    } finally {
        proc.kill('SIGTERM');
        if (proc.exitCode === null) await new Promise(resolve => proc.once('exit', resolve));
    }
});
