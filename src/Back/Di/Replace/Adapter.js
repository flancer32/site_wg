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
     * @param {App_Back_Web_Cms_Handler_Blog} blogHandler
     * @param {App_Back_Web_Cms_Handler_Redirect} redirectHandler
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
            App_Back_Web_Cms_Handler_Redirect$: redirectHandler,
        }
    ) {
        const self = this;

        const resolveRouting = (req) => {
            const rawPath = decodeURIComponent(req?.url?.split('?')[0] || '');
            const allowedLocales = config.getLocaleAllowed?.() || [];
            const fallbackLocale = config.getLocaleBaseWeb?.() || '';
            return helpWeb.extractRoutingInfo({
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
            // @LLM-DOC: `resolveRouting` returns `{ locale, cleanPath }` and we rely on `cleanPath`
            const routeInfo = resolveRouting(req);
            await redirectHandler?.applyRedirect?.({req, routeInfo});
            const renderData = await cmsAdapter?.getRenderData({req});
            const data = renderData?.data;
            if (!renderData || !data) {
                return renderData;
            }

            if (routeInfo?.cleanPath && isBlogIndexRoute(routeInfo.cleanPath)) {
                const targetLocale = routeInfo.locale || config.getLocaleBaseWeb();
                let items = [];
                try {
                    items = await blogHandler.collectBlogIndex(targetLocale);
                } catch (error) {
                    if (error?.code !== 'ENOENT') {
                        logger?.error?.(error);
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
