// @ts-check

/**
 * @namespace App_Back_Web_Helper_FormProtection
 * @description Issues and verifies signed form tokens and validates GitHub repository URLs.
 */
export default class App_Back_Web_Helper_FormProtection {
    /**
     * @param {typeof import('node:crypto')} crypto
     * @param {typeof import('node:fs/promises')} fs
     * @param {typeof import('node:path')} path
     * @param {Fl32_Cms_Back_Config} config
     */
    constructor({
        'node:crypto': crypto,
        'node:fs/promises': fs,
        'node:path': path,
        Fl32_Cms_Back_Config$: config,
    }) {
        const FORM_ID_AGENT_ORCHESTRATION_POC = 'agent-orchestration-poc';
        const FORM_TOKEN_SECRET_FILE_RELATIVE_PATH = 'var/app/form-token-secret';
        const FORM_TOKEN_TTL_SEC = 2 * 60 * 60;
        const secretCache = new Map();
        const rootPath = path.resolve(config.getRootPath?.() || process.cwd());

        const signToken = ({encodedPayload, secret}) => crypto
            .createHmac('sha256', secret)
            .update(encodedPayload)
            .digest('base64url');

        const isSafeEqual = (left, right) => {
            const leftBuffer = Buffer.from(left);
            const rightBuffer = Buffer.from(right);
            if (leftBuffer.length !== rightBuffer.length) {
                return false;
            }
            return crypto.timingSafeEqual(leftBuffer, rightBuffer);
        };

        const decodePayload = (encodedPayload) => {
            const raw = Buffer.from(encodedPayload, 'base64url').toString('utf-8');
            return JSON.parse(raw);
        };

        const getSecret = async () => {
            const envSecret = process.env.WG_FORM_TOKEN_SECRET?.trim();
            if (envSecret) {
                return envSecret;
            }
            if (secretCache.has(rootPath)) {
                return secretCache.get(rootPath);
            }

            const pending = (async () => {
                const filePath = path.join(rootPath, FORM_TOKEN_SECRET_FILE_RELATIVE_PATH);
                await fs.mkdir(path.dirname(filePath), {recursive: true});
                try {
                    const existing = (await fs.readFile(filePath, 'utf-8')).trim();
                    if (existing) {
                        return existing;
                    }
                } catch (error) {
                    if (error?.code !== 'ENOENT') {
                        throw error;
                    }
                }

                const generated = crypto.randomBytes(32).toString('base64url');
                try {
                    await fs.writeFile(filePath, `${generated}\n`, {encoding: 'utf-8', flag: 'wx', mode: 0o600});
                    return generated;
                } catch (error) {
                    if (error?.code !== 'EEXIST') {
                        throw error;
                    }
                    const existing = (await fs.readFile(filePath, 'utf-8')).trim();
                    if (existing) {
                        return existing;
                    }
                    throw new Error(`Form token secret file is empty: ${filePath}`);
                }
            })();

            secretCache.set(rootPath, pending);
            try {
                return await pending;
            } catch (error) {
                secretCache.delete(rootPath);
                throw error;
            }
        };

        /**
         * @returns {string}
         */
        this.getFormIdAgentOrchestrationPoc = () => FORM_ID_AGENT_ORCHESTRATION_POC;

        /**
         * @param {{ form: string, ttlSec?: number, nowSec?: number }} params
         * @returns {Promise<string>}
         */
        this.issueFormToken = async ({
            form,
            ttlSec = FORM_TOKEN_TTL_SEC,
            nowSec = Math.floor(Date.now() / 1000),
        }) => {
            const payload = {
                form,
                iat: nowSec,
                exp: nowSec + ttlSec,
                nonce: crypto.randomBytes(12).toString('base64url'),
            };
            const encodedPayload = Buffer.from(JSON.stringify(payload)).toString('base64url');
            const secret = await getSecret();
            return `${encodedPayload}.${signToken({encodedPayload, secret})}`;
        };

        /**
         * @param {{ token: string, form: string, nowSec?: number }} params
         * @returns {Promise<{ok: boolean, code?: string, payload?: object}>}
         */
        this.verifyFormToken = async ({
            token,
            form,
            nowSec = Math.floor(Date.now() / 1000),
        }) => {
            if (!token) {
                return {ok: false, code: 'missing'};
            }

            const parts = token.split('.');
            if (parts.length !== 2 || !parts[0] || !parts[1]) {
                return {ok: false, code: 'malformed'};
            }

            const [encodedPayload, signature] = parts;
            const secret = await getSecret();
            const expected = signToken({encodedPayload, secret});
            if (!isSafeEqual(signature, expected)) {
                return {ok: false, code: 'bad_signature'};
            }

            let payload;
            try {
                payload = decodePayload(encodedPayload);
            } catch {
                return {ok: false, code: 'bad_payload'};
            }

            if (payload?.form !== form) {
                return {ok: false, code: 'wrong_form'};
            }
            if (!Number.isInteger(payload?.iat) || !Number.isInteger(payload?.exp) || payload.exp < payload.iat) {
                return {ok: false, code: 'bad_timing'};
            }
            if (payload.iat > nowSec + 60) {
                return {ok: false, code: 'future'};
            }
            if (payload.exp < nowSec) {
                return {ok: false, code: 'expired'};
            }
            if (typeof payload.nonce !== 'string' || payload.nonce.length < 8) {
                return {ok: false, code: 'bad_nonce'};
            }

            return {ok: true, payload};
        };

        /**
         * @param {string} raw
         * @returns {string|null}
         */
        this.normalizeGithubRepositoryUrl = (raw) => {
            const input = raw?.trim();
            if (!input) {
                return null;
            }

            let parsed;
            try {
                parsed = new URL(input);
            } catch {
                return null;
            }

            if (!['http:', 'https:'].includes(parsed.protocol)) {
                return null;
            }
            if (parsed.username || parsed.password || parsed.search || parsed.hash) {
                return null;
            }
            if (parsed.hostname.toLowerCase() !== 'github.com') {
                return null;
            }

            const rawSegments = parsed.pathname.split('/').filter(Boolean);
            if (rawSegments.length !== 2) {
                return null;
            }

            let owner;
            let repo;
            try {
                [owner, repo] = rawSegments.map((segment) => decodeURIComponent(segment));
            } catch {
                return null;
            }

            if (!/^[A-Za-z0-9-]+$/.test(owner)) {
                return null;
            }

            repo = repo.replace(/\.git$/i, '');
            if (!/^[A-Za-z0-9._-]+$/.test(repo)) {
                return null;
            }

            return `https://github.com/${owner}/${repo}`;
        };
    }
}
