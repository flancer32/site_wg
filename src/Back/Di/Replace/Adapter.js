// @ts-nocheck
/**
 * @implements Fl32_Cms_Back_Api_Adapter
 */
export default class App_Back_Di_Replace_Adapter {
    /**
     * @param {typeof import('node:fs/promises')} fs
     * @param {typeof import('node:path')} path
     * @param {Fl32_Cms_Back_Di_Replace_Adapter} cmsAdapter
     * @param {Fl32_Cms_Back_Helper_Web} helpWeb
     * @param {Fl32_Cms_Back_Config} config
     * @param {Fl32_Cms_Back_Logger} logger
     * @param App_Back_Web_Cms_Handler_Blog} blogHandler
     */
    constructor(
        {
            'node:fs/promises': fs,
            'node:path': path,
            Fl32_Cms_Back_Di_Replace_Adapter$: cmsAdapter,
            Fl32_Cms_Back_Helper_Web$: helpWeb,
            Fl32_Cms_Back_Config$: config,
            Fl32_Cms_Back_Logger$: logger,
            App_Back_Web_Cms_Handler_Blog$: blogHandler,
        }
    ) {
        const self = this;
        const cmsAdapterRef = cmsAdapter;
        const helpWebRef = helpWeb;
        const configRef = config;
        const loggerRef = logger;
        const fsModule = fs;
        const pathModule = path;

        const resolveRouting = (req) => {
            const rawPath = decodeURIComponent(req?.url?.split('?')[0] || '');
            const allowedLocales = configRef.getLocaleAllowed?.() || [];
            const fallbackLocale = configRef.getLocaleBaseWeb?.() || '';
            return helpWebRef.extractRoutingInfo({
                path: rawPath,
                allowedLocales,
                fallbackLocale,
            });
        };

        const isBlogIndexRoute = (cleanPath) => {
            const normalized = (cleanPath || '').replace(/\/+$/, '');
            return normalized === '/blog' || normalized === '/blog.html';
        };

        self.getRenderData = async function ({req}) {
            const renderData = await cmsAdapterRef.getRenderData({req});
            const data = renderData?.data;
            const routeInfo = resolveRouting(req);
            if (!renderData || !data) {
                return renderData;
            }

            if (routeInfo?.cleanPath && isBlogIndexRoute(routeInfo.cleanPath)) {
                const targetLocale = routeInfo.locale || configRef.getLocaleBaseWeb();
                let items = [];
                try {
                    items = await blogHandler.collectBlogIndex(targetLocale);
                } catch (error) {
                    if (error?.code !== 'ENOENT') {
                        loggerRef?.error?.(error);
                    }
                }
                data.blogIndex = {
                    items,
                };
            }

            return renderData;
        };

    }
}
