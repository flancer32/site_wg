// @ts-check

/**
 * @namespace App_Back_Di_Replace_Adapter
 * @description Enriches CMS render data with project-specific page payloads.
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
     * @param {App_Back_Web_Helper_FormProtection} formProtection
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
            App_Back_Web_Helper_FormProtection$: formProtection,
        }
    ) {
        const self = this;

        const resolveRouting = (req) => {
            const encodedPath = req?.url?.split('?')[0] || '';
            let rawPath = encodedPath;
            try {
                rawPath = decodeURIComponent(encodedPath);
            } catch {
                // Keep malformed input inert so the request reaches the localized 404 handler.
            }
            const allowedLocales = config.getLocaleAllowed?.() || [];
            const fallbackLocale = config.getLocaleBaseWeb?.() || '';
            return helpWeb.extractRoutingInfo({
                path: rawPath,
                allowedLocales,
                fallbackLocale,
            });
        };

        const normalizeMalformedUrl = (req) => {
            const rawUrl = req?.url || '';
            const separator = rawUrl.indexOf('?');
            const encodedPath = separator >= 0 ? rawUrl.slice(0, separator) : rawUrl;
            try {
                decodeURIComponent(encodedPath);
            } catch {
                const suffix = separator >= 0 ? rawUrl.slice(separator) : '';
                req.url = `${encodedPath.replaceAll('%', '%25')}${suffix}`;
            }
        };

        const isBlogIndexRoute = (cleanPath) => {
            const normalized = (cleanPath || '').replace(/\/+$/, '');
            return normalized === '/blog' || normalized === '/blog.html';
        };

        const isPublicationRoute = (cleanPath) => {
            const normalized = (cleanPath || '').replace(/\/+$/, '');
            const indexRoutes = new Set([
                '/blog',
                '/blog.html',
                '/blog/index.html',
                '/library',
                '/library.html',
                '/library/index.html',
            ]);
            if (indexRoutes.has(normalized)) return false;
            return normalized.startsWith('/blog/') || normalized.startsWith('/library/');
        };

        const isNotFoundRoute = (cleanPath) => {
            const normalized = (cleanPath || '').replace(/\/+$/, '');
            return normalized === '/404' || normalized === '/404.html';
        };

        const isAgentOrchestrationPocRoute = (cleanPath) => {
            const normalized = (cleanPath || '').replace(/\/+$/, '');
            return normalized === '/land/agent-orchestration-poc'
                || normalized === '/land/agent-orchestration-poc/index.html';
        };

        const toCanonicalCleanPath = (cleanPath) => {
            const raw = cleanPath || '/';
            const normalized = raw.startsWith('/') ? raw : `/${raw}`;
            const withoutTrailingSlash = normalized.replace(/\/+$/, '') || '/';
            const directoryIndexes = new Set([
                '/blog',
                '/blog.html',
                '/blog/index.html',
                '/library',
                '/library.html',
                '/library/index.html',
                '/land/agent-orchestration-poc',
                '/land/agent-orchestration-poc/index.html',
            ]);
            if (withoutTrailingSlash === '/') return '/';
            if (directoryIndexes.has(withoutTrailingSlash)) {
                const indexFree = withoutTrailingSlash
                    .replace(/\/index\.html$/i, '')
                    .replace(/\.html$/i, '');
                return `${indexFree}/`;
            }
            if (/\/index\.html$/i.test(withoutTrailingSlash)) {
                return `${withoutTrailingSlash.replace(/index\.html$/i, '')}`;
            }
            if (path.extname(withoutTrailingSlash)) return withoutTrailingSlash;
            return `${withoutTrailingSlash}.html`;
        };

        const requestOrigin = () => {
            const fallback = 'https://wiredgeese.com';
            const configured = config.getBaseUrl?.() || fallback;
            try {
                const parsed = new URL(configured);
                if (parsed.protocol === 'http:' || parsed.protocol === 'https:') {
                    return parsed.origin;
                }
            } catch {
                // Fall through to the stable public origin.
            }
            logger?.warn?.(`Ignored invalid TEQ_CMS_BASE_URL: ${configured}`);
            return fallback;
        };

        const applyLocalizedMetadata = ({data, routeInfo}) => {
            const locale = routeInfo?.locale || config.getLocaleBaseWeb();
            const cleanPath = toCanonicalCleanPath(routeInfo?.cleanPath);
            const origin = requestOrigin();
            const localizedPath = cleanPath === '/' ? `/${locale}/` : `/${locale}${cleanPath}`;
            data.canonicalUrl = `${origin}${localizedPath}`;
            data.alternateUrls = Object.fromEntries(
                (config.getLocaleAllowed?.() || []).map((targetLocale) => {
                    const targetPath = cleanPath === '/'
                        ? `/${targetLocale}/`
                        : `/${targetLocale}${cleanPath}`;
                    return [targetLocale, `${origin}${targetPath}`];
                })
            );
        };

        self.getRenderData = async function ({req}) {
            normalizeMalformedUrl(req);
            // @LLM-DOC: `resolveRouting` returns `{ locale, cleanPath }` and we rely on `cleanPath`
            const routeInfo = resolveRouting(req);
            await redirectHandler?.applyRedirect?.({req, routeInfo});
            const renderData = await cmsAdapter?.getRenderData({req});
            const data = renderData?.data;
            if (!renderData || !data) {
                return renderData;
            }

            const effectiveRouteInfo = resolveRouting(req);
            applyLocalizedMetadata({data, routeInfo: effectiveRouteInfo});
            data.isPublication = isPublicationRoute(effectiveRouteInfo?.cleanPath);
            data.isNotFound = isNotFoundRoute(effectiveRouteInfo?.cleanPath);
            if (data.isNotFound) {
                data.canonicalUrl = undefined;
                data.alternateUrls = {};
            }

            if (effectiveRouteInfo?.cleanPath && isBlogIndexRoute(effectiveRouteInfo.cleanPath)) {
                const targetLocale = effectiveRouteInfo.locale || config.getLocaleBaseWeb();
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

            if (effectiveRouteInfo?.cleanPath && isAgentOrchestrationPocRoute(effectiveRouteInfo.cleanPath)) {
                data.formToken = await formProtection.issueFormToken({
                    form: formProtection.getFormIdAgentOrchestrationPoc(),
                });
            }

            return renderData;
        };

    }
}
