// @ts-check

/**
 * @namespace App_Back_Web_Cms_Handler_Redirect
 * @description Normalizes legacy HTML routes before CMS rendering.
 */

const HTML_EXTENSION_PATTERN = /\.html$/i;
const STATIC_RESOURCE_PATTERN = /\.(?:avif|bmp|css|gif|ico|jpeg?|jpg|js|json|map|mjs|mp4|mov|pdf|png|svg|ts|txt|webmanifest|woff2?|woff|xml)$/i;

export default class Redirect {
    /**
     * @param {object} deps
     * @param {typeof import('node:fs/promises')} deps.fs
     * @param {typeof import('node:path')} deps.path
     * @param {Fl32_Tmpl_Back_Config} deps.tmplConfig
     * @param {TeqFw_Log_Provider} deps.logger
     * @param {Fl32_Cms_Back_Helper_Web} deps.helpWeb
     */
    constructor(
        {
            fs,
            path,
            tmplConfig,
            logger,
            helpWeb,
        }
    ) {
        const self = this;
        const fsModule = fs;
        const pathModule = path;
        const log = logger.forSource('App_Back_Web_Cms_Handler_Redirect');
        const posix = pathModule.posix;
        const allowedLocaleList = (() => {
            const raw = tmplConfig.getAvailableLocales();
            return Array.isArray(raw) ? raw : [];
        })();
        const localeSet = new Set(allowedLocaleList);

        /** @returns {string|null} */
        const getRedirectMapPath = () => {
            const root = tmplConfig.getRootPath();
            if (!root) {
                return null;
            }
            return pathModule.join(root, 'etc', 'redirect-map.json');
        };

        /** @param {string} value @returns {string} */
        const normalizeRoute = (value) => {
            const raw = typeof value === 'string' ? value.trim() : '';
            if (!raw) {
                return '/';
            }
            const withSlash = raw.startsWith('/') ? raw : `/${raw}`;
            const normalized = posix.normalize(withSlash);
            const cleaned = normalized.replace(/\/+$/, '');
            return cleaned === '' ? '/' : cleaned;
        };

        /** @param {string} value @returns {boolean} */
        const isHtmlRoute = (value) => {
            const normalized = normalizeRoute(value);
            if (!normalized) {
                return false;
            }
            if (normalized === '/') {
                return true;
            }
            if (HTML_EXTENSION_PATTERN.test(normalized)) {
                return true;
            }
            if (STATIC_RESOURCE_PATTERN.test(normalized)) {
                return false;
            }
            return !normalized.includes('.');
        };

        /** @param {string} value @returns {any} */
        const splitLocalePath = (value) => {
            const trimmed = (value ?? '').replace(/^\/+|\/+$/g, '');
            if (!trimmed) {
                return {locale: null, path: '/'};
            }
            const segments = trimmed.split('/');
            const first = segments[0];
            if (localeSet.has(first)) {
                const rest = segments.slice(1);
                return {
                    locale: first,
                    path: rest.length ? `/${rest.join('/')}` : '/',
                };
            }
            return {locale: null, path: normalizeRoute(value)};
        };

        /**
         * @param {string} targetPath
         * @param {string} locale
         * @returns {string}
         */
        const overlayLocale = (targetPath, locale) => {
            if (!locale) {
                return normalizeRoute(targetPath);
            }
            const normalizedTarget = normalizeRoute(targetPath);
            const {locale: targetLocale} = splitLocalePath(normalizedTarget);
            if (targetLocale) {
                return normalizedTarget;
            }
            if (normalizedTarget === '/') {
                return normalizeRoute(`/${locale}`);
            }
            return normalizeRoute(`/${locale}${normalizedTarget}`);
        };

        /** @param {any} raw @returns {any} */
        const buildRedirectMap = (raw) => {
            const result = new Map();
            if (!raw || typeof raw !== 'object') {
                return result;
            }

            /**
             * @param {unknown} fromValue
             * @param {unknown} toValue
             * @returns {void}
             */
            const register = (fromValue, toValue) => {
                if (typeof fromValue !== 'string' || typeof toValue !== 'string') {
                    return;
                }
                const normalizedFrom = normalizeRoute(fromValue);
                const normalizedTo = normalizeRoute(toValue);
                if (!isHtmlRoute(normalizedFrom) || !isHtmlRoute(normalizedTo)) {
                    return;
                }
                result.set(normalizedFrom, normalizedTo);
                if (HTML_EXTENSION_PATTERN.test(normalizedFrom)) {
                    const directoryAlias = normalizeRoute(
                        normalizedFrom.replace(HTML_EXTENSION_PATTERN, '')
                    );
                    if (directoryAlias !== normalizedFrom) {
                        result.set(directoryAlias, normalizedTo);
                    }
                }
            };

            if (Array.isArray(raw)) {
                for (const entry of raw) {
                    if (!entry || typeof entry !== 'object') {
                        continue;
                    }
                    register(entry.from, entry.to);
                }
            } else {
                for (const [key, value] of Object.entries(raw)) {
                    register(key, value);
                }
            }
            return result;
        };

        /** @type {Promise<any>|null} */
        let redirectMapPromise = null;

        /** @returns {Promise<any>} */
        const loadRedirectMap = () => {
            if (redirectMapPromise) {
                return redirectMapPromise;
            }
            const mapPath = getRedirectMapPath();
            if (!mapPath) {
                redirectMapPromise = Promise.resolve(new Map());
                return redirectMapPromise;
            }
            redirectMapPromise = fsModule.readFile(mapPath, 'utf-8')
                .then((content) => {
                    try {
                        return JSON.parse(content);
                    } catch (error) {
                        log.error('Failed to parse redirect map.', {err: error});
                        return {};
                    }
                })
                .catch((error) => {
                    if (error?.code === 'ENOENT') {
                        return {};
                    }
                    log.error('Unable to read redirect map.', {err: error});
                    return {};
                })
                .then((raw) => {
                    try {
                        return buildRedirectMap(raw);
                    } catch (error) {
                        log.error('Failed to normalize redirect map.', {err: error});
                        return new Map();
                    }
                });
            return redirectMapPromise;
        };

        const allowedLocales = allowedLocaleList;
        const fallbackLocale = tmplConfig.getDefaultLocale();
        /** @param {string} value @returns {any} */
        const resolveRouting = (value) => helpWeb?.extractRoutingInfo?.({
            path: value,
            allowedLocales,
            fallbackLocale,
        }) ?? {locale: fallbackLocale, cleanPath: value};

        /** @param {string} value @returns {string} */
        const decodePath = (value) => {
            if (typeof value !== 'string') {
                return '';
            }
            try {
                return decodeURIComponent(value);
            } catch {
                return value;
            }
        };

        /** @param {string} value @returns {any} */
        const splitUrl = (value) => {
            const delimiter = value.indexOf('?');
            if (delimiter === -1) {
                return {path: value, query: ''};
            }
            return {
                path: value.slice(0, delimiter),
                query: value.slice(delimiter + 1),
            };
        };

        /**
         * @param {string} pathValue
         * @param {string} query
         * @returns {string}
         */
        const buildUrlWithQuery = (pathValue, query) => (query ? `${pathValue}?${query}` : pathValue);

        /**
         * @param {object} deps
         * @param {any} deps.req
         * @param {any} deps.routeInfo
         * @returns {Promise<void>}
         */
        const tryRedirect = async ({req, routeInfo}) => {
            if (!req || typeof req.url !== 'string') {
                return;
            }
            const {path: rawPath, query} = splitUrl(req.url);
            const decoded = decodePath(rawPath);
            const resolved = routeInfo ?? resolveRouting(decoded);
            const normalizedCleanPath = normalizeRoute(resolved?.cleanPath ?? decoded);
            // @LLM-DOC: the helper provides cleanPath, so we anchor redirects on it and overlay locale separately.
            if (!isHtmlRoute(normalizedCleanPath)) {
                return;
            }
            const map = await loadRedirectMap();
            if (!map.size) {
                return;
            }
            const destinationBase = map.get(normalizedCleanPath);
            if (!destinationBase) {
                return;
            }

            let destination = destinationBase;
            if (resolved?.locale) {
                destination = overlayLocale(destination, resolved.locale);
            }

            if (destination === normalizedCleanPath) {
                return;
            }

            const finalUrl = buildUrlWithQuery(destination, query);
            log.info('Redirect applied.', {
                from: normalizedCleanPath,
                to: destination,
                query: query || undefined,
                locale: resolved?.locale || undefined,
            });
            req.url = finalUrl;
        };

        /**
         * @param {object} params
         * @param {any} params.req
         * @param {any} params.routeInfo
         * @returns {Promise<void>}
         */
        self.applyRedirect = async function ({req, routeInfo}) {
            try {
                await tryRedirect({req, routeInfo});
            } catch (error) {
                log.error('Redirect handler failure.', {err: error});
            }
        };
    }
}

export const __deps__ = Object.freeze({
    fs: 'node:fs/promises',
    path: 'node:path',
    tmplConfig: 'Fl32_Tmpl_Back_Config$',
    logger: 'TeqFw_Log_Provider$',
    helpWeb: 'Fl32_Cms_Back_Helper_Web$',
});
