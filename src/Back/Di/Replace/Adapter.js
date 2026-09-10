// @ts-check

/**
 * @namespace App_Back_Di_Replace_Adapter
 * @description Enriches CMS render data with project-specific page payloads.
 * @implements Fl32_Cms_Back_Api_Adapter
 */
export default class Adapter {
    /**
     * @param {object} deps
     * @param {typeof import('node:path')} deps.path
     * @param {Fl32_Cms_Back_Di_Replace_Adapter} deps.cmsAdapter
     * @param {Fl32_Cms_Back_Helper_Web} deps.helpWeb
     * @param {Fl32_Cms_Back_Config} deps.config
     * @param {Fl32_Tmpl_Back_Config} deps.tmplConfig
     * @param {TeqFw_Log_Provider} deps.logger
     * @param {App_Back_Web_Cms_Handler_Blog} deps.blogHandler
     * @param {App_Back_Web_Cms_Handler_Redirect} deps.redirectHandler
     */
    constructor(
        {
            path,
            cmsAdapter,
            helpWeb,
            config,
            tmplConfig,
            logger,
            blogHandler,
            redirectHandler,
        }
    ) {
        const self = this;
        const log = logger.forSource('App_Back_Di_Replace_Adapter');

        /**
         * @param {any} req
         * @returns {object}
         */
        const resolveRouting = (req) => {
            const encodedPath = req?.url?.split('?')[0] || '';
            let rawPath = encodedPath;
            try {
                rawPath = decodeURIComponent(encodedPath);
            } catch {
                // Keep malformed input inert so the request reaches the localized 404 handler.
            }
            const allowedLocales = tmplConfig.getAvailableLocales();
            const fallbackLocale = tmplConfig.getDefaultLocale();
            return helpWeb.extractRoutingInfo({
                path: rawPath,
                allowedLocales,
                fallbackLocale,
            });
        };

        /**
         * @param {any} req
         * @returns {void}
         */
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

        /** @param {string} cleanPath @returns {boolean} */
        const isBlogIndexRoute = (cleanPath) => {
            const normalized = (cleanPath || '').replace(/\/+$/, '');
            return normalized === '/blog' || normalized === '/blog.html';
        };

        /** @param {string} cleanPath @returns {boolean} */
        const isHomeRoute = (cleanPath) => {
            const normalized = (cleanPath || '/').replace(/\/+$/, '') || '/';
            return normalized === '/';
        };

        /** @param {string} cleanPath @returns {boolean} */
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

        /** @param {string} cleanPath @returns {boolean} */
        const isNotFoundRoute = (cleanPath) => {
            const normalized = (cleanPath || '').replace(/\/+$/, '');
            return normalized === '/404' || normalized === '/404.html';
        };

        /** @param {string} cleanPath @returns {boolean} */
        const isContactRoute = (cleanPath) => {
            const normalized = (cleanPath || '').replace(/\/+$/, '');
            return normalized === '/contact' || normalized === '/contact.html';
        };

        /**
         * Maps Contact origins to a small, safe vocabulary. Query values are
         * never rendered directly, so unrecognized input remains generic.
         *
         * @param {any} req
         * @returns {'default'|'commercial'|'mcp-integration'|'product'|'chatgpt-telegram'}
         */
        const resolveContactTopic = (req) => {
            const rawUrl = typeof req?.url === 'string' ? req.url : '';
            try {
                const queryStart = rawUrl.indexOf('?');
                if (queryStart < 0) return 'default';
                const rawQuery = rawUrl.slice(queryStart + 1).split('#', 1)[0];
                const topic = new URLSearchParams(rawQuery).get('topic');
                if (
                    topic === 'commercial'
                    || topic === 'mcp-integration'
                    || topic === 'product'
                    || topic === 'chatgpt-telegram'
                ) {
                    return topic;
                }
            } catch {
                // Keep malformed query input inert and use the generic handoff.
            }
            return 'default';
        };

        /** @param {string} cleanPath @returns {string} */
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
                '/products',
                '/products/index.html',
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

        /** @returns {string} */
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
            log.warn(`Ignored invalid TEQ_CMS__BASE_URL: ${configured}`);
            return fallback;
        };

        /**
         * @param {object} deps
         * @param {any} deps.data
         * @param {any} deps.routeInfo
         * @returns {void}
         */
        const applyLocalizedMetadata = ({data, routeInfo}) => {
            const locale = routeInfo?.locale || tmplConfig.getDefaultLocale();
            const cleanPath = toCanonicalCleanPath(routeInfo?.cleanPath);
            const origin = requestOrigin();
            const localizedPath = cleanPath === '/' ? `/${locale}/` : `/${locale}${cleanPath}`;
            data.canonicalUrl = `${origin}${localizedPath}`;
            const routeLocales = tmplConfig.getAvailableLocales();
            data.alternateUrls = Object.fromEntries(
                routeLocales.map((targetLocale) => {
                    const targetPath = cleanPath === '/'
                        ? `/${targetLocale}/`
                        : `/${targetLocale}${cleanPath}`;
                    return [targetLocale, `${origin}${targetPath}`];
                })
            );
        };

        /**
         * @param {object} deps
         * @param {any} deps.req
         * @returns {Promise<any>}
         */
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
            if (isContactRoute(effectiveRouteInfo?.cleanPath)) {
                data.contactTopic = resolveContactTopic(req);
            }
            if (data.isNotFound) {
                data.canonicalUrl = undefined;
                data.alternateUrls = {};
            }

            if (effectiveRouteInfo?.cleanPath && isBlogIndexRoute(effectiveRouteInfo.cleanPath)) {
                const targetLocale = effectiveRouteInfo.locale || tmplConfig.getDefaultLocale();
                /** @type {object[]} */
                let items = [];
                try {
                    items = await blogHandler.collectBlogIndex(targetLocale);
                } catch (error) {
                    if (error?.code !== 'ENOENT') {
                        log.error('Failed to build the blog index.', {err: error});
                    }
                }
                data.blogIndex = {
                    items,
                };
            }

            if (isHomeRoute(effectiveRouteInfo?.cleanPath)) {
                const targetLocale = effectiveRouteInfo.locale || tmplConfig.getDefaultLocale();
                /** @type {object[]} */
                let items = [];
                try {
                    items = await blogHandler.collectRecentBlogEntries(targetLocale, 3);
                } catch (error) {
                    if (error?.code !== 'ENOENT') {
                        log.error('Failed to build the Home Journal projection.', {err: error});
                    }
                }
                data.recentJournal = {items};
            }

            return renderData;
        };

    }
}

export const __deps__ = Object.freeze({
    path: 'node:path',
    cmsAdapter: 'Fl32_Cms_Back_Di_Replace_Adapter$',
    helpWeb: 'Fl32_Cms_Back_Helper_Web$',
    config: 'Fl32_Cms_Back_Config$',
    tmplConfig: 'Fl32_Tmpl_Back_Config$',
    logger: 'TeqFw_Log_Provider$',
    blogHandler: 'App_Back_Web_Cms_Handler_Blog$',
    redirectHandler: 'App_Back_Web_Cms_Handler_Redirect$',
});
