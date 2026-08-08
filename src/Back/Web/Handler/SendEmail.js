// @ts-check

/**
 * @namespace App_Back_Web_Handler_SendEmail
 * @description Accepts landing-page form submissions and delivers them through SMTP.
 * @implements Fl32_Web_Back_Api_Handler
 */

export default class SendEmail {
    /**
     * @param {object} deps
     * @param {typeof import('node:http2')} deps.http2
     * @param {Fl32_Web_Back_Helper_Respond} deps.respond
     * @param {Fl32_Web_Back_Dto_Info__Factory} deps.dtoInfo
     * @param {TeqFw_Log_Provider} deps.logger
     * @param {App_Back_Web_Helper_FormProtection} deps.formProtection
     * @param {Fl32_Web_Back_Enum_Stage} deps.STAGE
     */
    constructor({http2, respond, dtoInfo, logger, formProtection, STAGE}) {
        const {constants: H2} = http2;
        const {HTTP2_HEADER_CONTENT_TYPE} = H2;
        const log = logger.forSource('App_Back_Web_Handler_SendEmail');
        const info = dtoInfo.create({
            name: 'App_Back_Web_Handler_SendEmail',
            stage: STAGE.PROCESS,
        });

        const EMAIL_HOST = process.env.EMAIL_HOST || '';
        const EMAIL_PORT = parseInt(process.env.EMAIL_PORT || '465', 10);
        const EMAIL_SECURE = process.env.EMAIL_SECURE === 'true';
        const EMAIL_TO = process.env.EMAIL_TO || '';
        const EMAIL_AUTH_USER = process.env.EMAIL_AUTH_USER || '';
        const EMAIL_AUTH_PASS = process.env.EMAIL_AUTH_PASS || '';

        /** @param {any} req @returns {Promise<string>} */
        const collectBody = (req) => new Promise((resolve, reject) => {
            /** @type {any[]} */
            const chunks = [];
            req.on('data', (chunk) => chunks.push(chunk));
            req.on('end', () => resolve(Buffer.concat(chunks).toString('utf-8')));
            req.on('error', reject);
        });

        /** @param {any} data @returns {string} */
        const composeHtml = (data) => {
            const fields = [
                {label: 'Тип запроса', key: 'request_type'},
                {label: 'Имя', key: 'name'},
                {label: 'Email', key: 'email'},
                {label: 'URL репозитория', key: 'repository_url'},
                {label: 'Тип репозитория', key: 'repository_type'},
                {label: 'Что хотите протестировать', key: 'test_goal'},
                {label: 'Следующий шаг', key: 'next_step'},
            ];
            const rows = fields
                .filter((field) => data[field.key])
                .map((field) => `<tr><td style="padding:8px 12px;border:1px solid #ddd;font-weight:600">${field.label}</td><td style="padding:8px 12px;border:1px solid #ddd">${data[field.key]}</td></tr>`)
                .join('');
            return `<html><body><h2>Agent Orchestration PoC — запрос</h2><table style="border-collapse:collapse;width:100%;max-width:640px">${rows}</table><hr><p style="color:#666;font-size:0.9em">Отправлено через форму на wiredgeese.com</p></body></html>`;
        };

        /**
         * @param {string} text
         * @param {string} html
         * @returns {Promise<void>}
         */
        const sendMail = async (text, html) => {
            const nodemailer = await import('nodemailer');
            const transporter = nodemailer.default.createTransport({
                host: EMAIL_HOST,
                port: EMAIL_PORT,
                secure: EMAIL_SECURE,
                auth: {user: EMAIL_AUTH_USER, pass: EMAIL_AUTH_PASS},
            });
            await transporter.sendMail({
                from: EMAIL_AUTH_USER,
                to: EMAIL_TO,
                subject: 'Agent Orchestration PoC — новый запрос',
                text,
                html,
            });
        };

        /** @returns {Fl32_Web_Back_Dto_Info} */
        this.getRegistrationInfo = () => info;

        /**
         * @param {Fl32_Web_Back_Pipeline_RequestContext} context
         * @returns {Promise<void>}
         */
        this.handle = async function (context) {
            const {request: req, response: res} = context;
            const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
            if (req.method !== 'POST' || url.pathname !== '/api/send-email') return;

            try {
                const raw = await collectBody(req);
                const data = Object.fromEntries(new URLSearchParams(String(raw)));
                const tokenVerification = await formProtection.verifyFormToken({
                    token: data.form_token,
                    form: formProtection.getFormIdAgentOrchestrationPoc(),
                });
                if (!tokenVerification.ok) {
                    log.warn('Rejected form submission: invalid form token.', {code: tokenVerification.code});
                    respond.code403_Forbidden({
                        res,
                        headers: {[HTTP2_HEADER_CONTENT_TYPE]: 'application/json; charset=utf-8'},
                        body: JSON.stringify({ok: false, error: 'invalid form token'}),
                    });
                    context.completed = true;
                    return;
                }

                const repositoryUrl = formProtection.normalizeGithubRepositoryUrl(data.repository_url);
                if (!repositoryUrl) {
                    log.warn('Rejected form submission: invalid repository URL.');
                    respond.code400_BadRequest({
                        res,
                        headers: {[HTTP2_HEADER_CONTENT_TYPE]: 'application/json; charset=utf-8'},
                        body: JSON.stringify({ok: false, error: 'invalid repository url'}),
                    });
                    context.completed = true;
                    return;
                }
                data.repository_url = repositoryUrl;
                delete data.form_token;
                const html = composeHtml(data);
                const text = Object.entries(data).map(([key, value]) => `${key}: ${value}`).join('\n');
                await sendMail(text, html);
                respond.code200_Ok({
                    res,
                    headers: {[HTTP2_HEADER_CONTENT_TYPE]: 'application/json; charset=utf-8'},
                    body: JSON.stringify({ok: true}),
                });
            } catch (error) {
                log.error('Failed to deliver form submission.', {err: error});
                respond.code500_InternalServerError({
                    res,
                    headers: {[HTTP2_HEADER_CONTENT_TYPE]: 'application/json; charset=utf-8'},
                    body: JSON.stringify({ok: false, error: 'internal error'}),
                });
            }
            context.completed = true;
        };
    }
}

export const __deps__ = Object.freeze({
    http2: 'node:http2',
    respond: 'Fl32_Web_Back_Helper_Respond$',
    dtoInfo: 'Fl32_Web_Back_Dto_Info__Factory$',
    logger: 'TeqFw_Log_Provider$',
    formProtection: 'App_Back_Web_Helper_FormProtection$',
    STAGE: 'Fl32_Web_Back_Enum_Stage$',
});
