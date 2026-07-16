// @ts-check

/**
 * @namespace App_Back_Web_Handler_NotFound
 * @description Renders the localized site error page as the final GET/HEAD fallback.
 * @implements Fl32_Web_Back_Api_Handler
 */
export default class App_Back_Web_Handler_NotFound {
    /**
     * @param {typeof import('node:http2')} http2
     * @param {Fl32_Web_Back_Helper_Respond} respond
     * @param {Fl32_Cms_Back_Api_Adapter} adapter
     * @param {Fl32_Cms_Back_Config} config
     * @param {Fl32_Cms_Back_Helper_Web} helpWeb
     * @param {Fl32_Tmpl_Back_Service_Load} servTmplLoad
     * @param {Fl32_Tmpl_Back_Service_Render} servTmplRender
     */
    constructor(
        {
            'node:http2': http2,
            Fl32_Web_Back_Helper_Respond$: respond,
            Fl32_Cms_Back_Api_Adapter$: adapter,
            Fl32_Cms_Back_Config$: config,
            Fl32_Cms_Back_Helper_Web$: helpWeb,
            Fl32_Tmpl_Back_Service_Load$: servTmplLoad,
            Fl32_Tmpl_Back_Service_Render$: servTmplRender,
        }
    ) {
        const {constants: H2} = http2;
        const {
            HTTP2_HEADER_CONTENT_LENGTH,
            HTTP2_HEADER_CONTENT_TYPE,
        } = H2;

        this.getRegistrationInfo = () => Object.freeze({
            name: 'App_Back_Web_Handler_NotFound',
            stage: 'process',
            before: [],
            after: [
                'Fl32_Cms_Back_Web_Handler_Template',
                'Fl32_Web_Back_Handler_Static',
                'App_Back_Web_Handler_SendEmail',
            ],
        });

        this.handle = async (req, res) => {
            if (!respond.isWritable(res) || !['GET', 'HEAD'].includes(req.method || 'GET')) {
                return false;
            }

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
                allowedLocales: config.getLocaleAllowed(),
                fallbackLocale: config.getLocaleBaseWeb(),
            });
            const locale = routeInfo.locale || config.getLocaleBaseWeb();

            try {
                req.url = `/${locale}/404.html`;
                const {target, data, options} = await adapter.getRenderData({req});
                if (!target || !data) return false;
                data.canonicalUrl = undefined;
                data.alternateUrls = {};
                data.isNotFound = true;

                const {template} = await servTmplLoad.perform({target});
                if (!template) return false;
                const {content} = await servTmplRender.perform({target, template, data, options});
                if (!content) return false;

                const body = req.method === 'HEAD' ? '' : content;
                const length = Buffer.byteLength(content, 'utf8');
                respond.code404_NotFound({
                    res,
                    headers: {
                        [HTTP2_HEADER_CONTENT_TYPE]: 'text/html; charset=utf-8',
                        [HTTP2_HEADER_CONTENT_LENGTH]: length,
                    },
                    body,
                });
                return true;
            } finally {
                req.url = originalUrl;
            }
        };
    }
}
