// @ts-check

/**
 * @namespace App_Back_Web_Handler_SendEmail
 * @description Accepts landing-page form submissions and delivers them through SMTP.
 * @implements Fl32_Web_Back_Api_Handler
 */
export default class App_Back_Web_Handler_SendEmail {
    /**
     * @param {typeof import('node:http2')} http2
     * @param {Fl32_Web_Back_Helper_Respond} respond
     * @param {Fl32_Cms_Back_Logger} logger
     * @param {App_Back_Web_Helper_FormProtection} formProtection
     */
    constructor(
        {
            'node:http2': http2,
            Fl32_Web_Back_Helper_Respond$: respond,
            Fl32_Cms_Back_Logger$: logger,
            App_Back_Web_Helper_FormProtection$: formProtection,
        }
    ) {
        const {constants: H2} = http2;
        const {HTTP2_HEADER_CONTENT_TYPE} = H2;

        const EMAIL_HOST = process.env.EMAIL_HOST || '';
        const EMAIL_PORT = parseInt(process.env.EMAIL_PORT || '465', 10);
        const EMAIL_SECURE = process.env.EMAIL_SECURE === 'true';
        const EMAIL_TO = process.env.EMAIL_TO || '';
        const EMAIL_AUTH_USER = process.env.EMAIL_AUTH_USER || '';
        const EMAIL_AUTH_PASS = process.env.EMAIL_AUTH_PASS || '';

        const collectBody = (req) => new Promise((resolve, reject) => {
            const chunks = [];
            req.on('data', (chunk) => chunks.push(chunk));
            req.on('end', () => resolve(Buffer.concat(chunks).toString('utf-8')));
            req.on('error', reject);
        });

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
                .filter((f) => data[f.key])
                .map((f) => `<tr><td style="padding:8px 12px;border:1px solid #ddd;font-weight:600">${f.label}</td><td style="padding:8px 12px;border:1px solid #ddd">${data[f.key]}</td></tr>`)
                .join('');
            return `<html><body><h2>Agent Orchestration PoC — запрос</h2><table style="border-collapse:collapse;width:100%;max-width:640px">${rows}</table><hr><p style="color:#666;font-size:0.9em">Отправлено через форму на wiredgeese.com</p></body></html>`;
        };

        const sendMail = async (text, html) => {
            const nodemailer = await import('nodemailer');
            const transporter = nodemailer.default.createTransport({
                host: EMAIL_HOST,
                port: EMAIL_PORT,
                secure: EMAIL_SECURE,
                auth: {
                    user: EMAIL_AUTH_USER,
                    pass: EMAIL_AUTH_PASS,
                },
            });
            await transporter.sendMail({
                from: EMAIL_AUTH_USER,
                to: EMAIL_TO,
                subject: 'Agent Orchestration PoC — новый запрос',
                text,
                html,
            });
        };

        this.getRegistrationInfo = () => Object.freeze({
            name: 'App_Back_Web_Handler_SendEmail',
            stage: 'process',
            before: [],
            after: [],
        });

        this.handle = async (req, res) => {
            const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
            if (req.method !== 'POST' || url.pathname !== '/api/send-email') {
                return false;
            }
            try {
                const raw = await collectBody(req);
                const data = Object.fromEntries(new URLSearchParams(raw));
                const tokenVerification = await formProtection.verifyFormToken({
                    token: data.form_token,
                    form: formProtection.getFormIdAgentOrchestrationPoc(),
                });
                if (!tokenVerification.ok) {
                    logger.warn(`Rejected form submission: invalid form token (${tokenVerification.code}).`);
                    respond.code403_Forbidden({
                        res,
                        headers: {[HTTP2_HEADER_CONTENT_TYPE]: 'application/json; charset=utf-8'},
                        body: JSON.stringify({ok: false, error: 'invalid form token'}),
                    });
                    return true;
                }

                const repositoryUrl = formProtection.normalizeGithubRepositoryUrl(data.repository_url);
                if (!repositoryUrl) {
                    logger.warn(`Rejected form submission: invalid repository URL (${data.repository_url || 'empty'}).`);
                    respond.code400_BadRequest({
                        res,
                        headers: {[HTTP2_HEADER_CONTENT_TYPE]: 'application/json; charset=utf-8'},
                        body: JSON.stringify({ok: false, error: 'invalid repository url'}),
                    });
                    return true;
                }
                data.repository_url = repositoryUrl;
                delete data.form_token;
                const html = composeHtml(data);
                const text = Object.entries(data).map(([k, v]) => `${k}: ${v}`).join('\n');
                await sendMail(text, html);
                respond.code200_Ok({
                    res,
                    headers: {[HTTP2_HEADER_CONTENT_TYPE]: 'application/json; charset=utf-8'},
                    body: JSON.stringify({ok: true}),
                });
            } catch (e) {
                logger.exception(e);
                respond.code500_InternalServerError({
                    res,
                    headers: {[HTTP2_HEADER_CONTENT_TYPE]: 'application/json; charset=utf-8'},
                    body: JSON.stringify({ok: false, error: e.message}),
                });
            }
            return true;
        };
    }
}
