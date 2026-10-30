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
        cwd: process.cwd(), env: {...process.env, TEQFW_WEB__PORT: String(port), TEQ_CMS__BASE_URL: 'https://wiredgeese.com'},
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
        const missing = await fetch(`${origin}/en/blog/2026/missing-article.html`);
        assert.equal(missing.status, 404);
    } finally {
        proc.kill('SIGTERM');
        if (proc.exitCode === null) await new Promise(resolve => proc.once('exit', resolve));
    }
});
