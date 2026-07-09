import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';

import FormProtection from '../../src/Back/Web/Helper/FormProtection.js';

function createHelper(rootPath, env = process.env) {
    const original = process.env.WG_FORM_TOKEN_SECRET;
    if (Object.prototype.hasOwnProperty.call(env, 'WG_FORM_TOKEN_SECRET')) {
        process.env.WG_FORM_TOKEN_SECRET = env.WG_FORM_TOKEN_SECRET;
    } else {
        delete process.env.WG_FORM_TOKEN_SECRET;
    }
    const helper = new FormProtection({
        'node:crypto': crypto,
        'node:fs/promises': fs,
        'node:path': path,
        Fl32_Cms_Back_Config$: {getRootPath: () => rootPath},
    });
    return {
        helper,
        restore() {
            if (original === undefined) {
                delete process.env.WG_FORM_TOKEN_SECRET;
            } else {
                process.env.WG_FORM_TOKEN_SECRET = original;
            }
        },
    };
}

async function makeRoot() {
    return fs.mkdtemp(path.join(os.tmpdir(), 'wg-form-protection-'));
}

test('uses environment secret without creating a runtime file', async () => {
    const rootPath = await makeRoot();
    const {helper, restore} = createHelper(rootPath, {WG_FORM_TOKEN_SECRET: 'env-secret'});

    try {
        const token = await helper.issueFormToken({form: helper.getFormIdAgentOrchestrationPoc(), nowSec: 1_700_000_000});
        const verification = await helper.verifyFormToken({
            token,
            form: helper.getFormIdAgentOrchestrationPoc(),
            nowSec: 1_700_000_100,
        });

        assert.equal(verification.ok, true);
        await assert.rejects(fs.access(path.join(rootPath, 'var/app/form-token-secret')));
    } finally {
        restore();
    }
});

test('creates and reuses runtime secret when environment secret is missing', async () => {
    const rootPath = await makeRoot();
    const first = createHelper(rootPath, {});
    const second = createHelper(rootPath, {});

    try {
        const tokenOne = await first.helper.issueFormToken({
            form: first.helper.getFormIdAgentOrchestrationPoc(),
            nowSec: 1_700_000_000,
        });
        const tokenTwo = await second.helper.issueFormToken({
            form: second.helper.getFormIdAgentOrchestrationPoc(),
            nowSec: 1_700_000_001,
        });
        const secretPath = path.join(rootPath, 'var/app/form-token-secret');
        const persisted = (await fs.readFile(secretPath, 'utf-8')).trim();

        assert.ok(tokenOne.includes('.'));
        assert.ok(tokenTwo.includes('.'));
        assert.ok(persisted.length > 20);
    } finally {
        first.restore();
        second.restore();
    }
});

test('rejects missing, tampered, and expired tokens', async () => {
    const rootPath = await makeRoot();
    const {helper, restore} = createHelper(rootPath, {WG_FORM_TOKEN_SECRET: 'test-secret'});

    try {
        const token = await helper.issueFormToken({
            form: helper.getFormIdAgentOrchestrationPoc(),
            nowSec: 1_700_000_000,
            ttlSec: 10,
        });

        const missing = await helper.verifyFormToken({
            token: '',
            form: helper.getFormIdAgentOrchestrationPoc(),
        });
        const tampered = await helper.verifyFormToken({
            token: `${token}x`,
            form: helper.getFormIdAgentOrchestrationPoc(),
        });
        const expired = await helper.verifyFormToken({
            token,
            form: helper.getFormIdAgentOrchestrationPoc(),
            nowSec: 1_700_000_020,
        });

        assert.equal(missing.ok, false);
        assert.equal(missing.code, 'missing');
        assert.equal(tampered.ok, false);
        assert.equal(expired.ok, false);
        assert.equal(expired.code, 'expired');
    } finally {
        restore();
    }
});

test('normalizes valid GitHub repository URLs', async () => {
    const rootPath = await makeRoot();
    const {helper, restore} = createHelper(rootPath, {});

    try {
        assert.equal(
            helper.normalizeGithubRepositoryUrl('https://github.com/openai/openai'),
            'https://github.com/openai/openai'
        );
        assert.equal(
            helper.normalizeGithubRepositoryUrl('http://github.com/openai/openai/'),
            'https://github.com/openai/openai'
        );
        assert.equal(
            helper.normalizeGithubRepositoryUrl('https://github.com/openai/openai.git'),
            'https://github.com/openai/openai'
        );
    } finally {
        restore();
    }
});

test('rejects invalid and suspicious repository URLs', async () => {
    const rootPath = await makeRoot();
    const {helper, restore} = createHelper(rootPath, {});

    try {
        const invalidInputs = [
            '',
            'git@github.com:openai/openai.git',
            'https://evil.example/openai/openai',
            'https://github.com/openai',
            'https://github.com/openai/openai/issues',
            'https://github.com/openai/openai/tree/main',
            'https://github.com/openai/openai?tab=readme',
            'https://www.github.com/openai/openai',
        ];

        for (const input of invalidInputs) {
            assert.equal(helper.normalizeGithubRepositoryUrl(input), null, input);
        }
    } finally {
        restore();
    }
});
