// @ts-check

/**
 * @namespace App_Back_Web_Handler_NotFound
 * @description Renders the localized site error page as the final GET/HEAD fallback.
 * @implements Fl32_Web_Back_Api_Handler
 */

export default class NotFound {
    /**
     * @param {object} deps
     * @param {typeof import('node:http2')} deps.http2
     * @param {Fl32_Web_Back_Helper_Respond} deps.respond
     * @param {Fl32_Web_Back_Dto_Info__Factory} deps.dtoInfo
     * @param {Fl32_Cms_Back_Api_Adapter} deps.adapter
     * @param {Fl32_Tmpl_Back_Config} deps.tmplConfig
     * @param {Fl32_Cms_Back_Helper_Web} deps.helpWeb
     * @param {Fl32_Tmpl_Back_Service_Load} deps.servTmplLoad
     * @param {Fl32_Tmpl_Back_Service_Render} deps.servTmplRender
     * @param {Fl32_Web_Back_Enum_Stage} deps.STAGE
     */
    constructor({
        http2,
        respond,
        dtoInfo,
        adapter,
        tmplConfig,
        helpWeb,
        servTmplLoad,
        servTmplRender,
        STAGE,
    }) {
        const {constants: H2} = http2;
        const {HTTP2_HEADER_CONTENT_LENGTH, HTTP2_HEADER_CONTENT_TYPE} = H2;
        const info = dtoInfo.create({
            name: 'App_Back_Web_Handler_NotFound',
            stage: STAGE.PROCESS,
            after: [
                'Fl32_Cms_Back_Web_Handler_Template',
                'Fl32_Web_Back_Handler_Static',
                'App_Back_Web_Handler_SendEmail',
            ],
        });

        /** @returns {Fl32_Web_Back_Dto_Info} */
        this.getRegistrationInfo = () => info;

        /**
         * @param {Fl32_Web_Back_Pipeline_RequestContext} context
         * @returns {Promise<void>}
         */
        this.handle = async function (context) {
            const {request: req, response: res} = context;
            if (!respond.isWritable(res) || !['GET', 'HEAD'].includes(req.method || 'GET')) return;

            const originalUrl = req.url || '/';
            const encodedPath = originalUrl.split('?')[0];
            let decodedPath = encodedPath;
            try {
                decodedPath = decodeURIComponent(encodedPath);
            } catch {
                // Preserve malformed input as an inert path and render the normal 404 surface.
            }
            const routeInfo = helpWeb.extractRoutingInfo({
                path: decodedPath,
                allowedLocales: tmplConfig.getAvailableLocales(),
                fallbackLocale: tmplConfig.getDefaultLocale(),
            });
            const locale = routeInfo.locale || tmplConfig.getDefaultLocale();

            try {
                req.url = `/${locale}/404.html`;
                const {target, data, options} = await adapter.getRenderData({req});
                if (!target || !data) return;
                data.canonicalUrl = undefined;
                data.alternateUrls = {};
                data.isNotFound = true;

                const {template} = await servTmplLoad.perform({target});
                if (!template) return;
                const {content} = await servTmplRender.perform({target, template, data, options});
                if (!content) return;

                const body = req.method === 'HEAD' ? '' : content;
                respond.code404_NotFound({
                    res,
                    headers: {
                        [HTTP2_HEADER_CONTENT_TYPE]: 'text/html; charset=utf-8',
                        [HTTP2_HEADER_CONTENT_LENGTH]: Buffer.byteLength(content, 'utf8'),
                    },
                    body,
                });
                context.completed = true;
            } finally {
                req.url = originalUrl;
            }
        };
    }
}

export const __deps__ = Object.freeze({
    http2: 'node:http2',
    respond: 'Fl32_Web_Back_Helper_Respond$',
    dtoInfo: 'Fl32_Web_Back_Dto_Info__Factory$',
    adapter: 'Fl32_Cms_Back_Api_Adapter$',
    tmplConfig: 'Fl32_Tmpl_Back_Config$',
    helpWeb: 'Fl32_Cms_Back_Helper_Web$',
    servTmplLoad: 'Fl32_Tmpl_Back_Service_Load$',
    servTmplRender: 'Fl32_Tmpl_Back_Service_Render$',
    STAGE: 'Fl32_Web_Back_Enum_Stage$',
});
