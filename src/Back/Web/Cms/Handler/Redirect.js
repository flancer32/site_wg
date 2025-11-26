const HTML_EXTENSION_PATTERN = /\.html$/i;
const STATIC_RESOURCE_PATTERN = /\.(?:avif|bmp|css|gif|ico|jpeg?|jpg|js|json|map|mjs|mp4|mov|pdf|png|svg|ts|txt|webmanifest|woff2?|woff|xml)$/i;

export default class App_Back_Web_Cms_Handler_Redirect {
    /**
     * @param {typeof import('node:fs/promises')} fs
     * @param {typeof import('node:path')} path
     * @param {Fl32_Cms_Back_Config} config
     * @param {Fl32_Cms_Back_Logger} logger
     * @param {Fl32_Cms_Back_Helper_Web} helpWeb
     */
    constructor(
        {
            'node:fs/promises': fs,
            'node:path': path,
            Fl32_Cms_Back_Config$: config,
            Fl32_Cms_Back_Logger$: logger,
            Fl32_Cms_Back_Helper_Web$: helpWeb,
        }
    ) {
        const self = this;
        const fsModule = fs;
        const pathModule = path;
        const configRef = config;
        const loggerRef = logger;
        const posix = pathModule.posix;
        const allowedLocaleList = (() => {
            const raw = configRef?.getLocaleAllowed?.();
            return Array.isArray(raw) ? raw : [];
        })();
        const localeSet = new Set(allowedLocaleList);

        const getRedirectMapPath = () => {
            const root = configRef?.getRootPath?.();
            if (!root) {
                return null;
            }
            return pathModule.join(root, 'etc', 'redirect-map.json');
        };

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

        const buildRedirectMap = (raw) => {
            const result = new Map();
            if (!raw || typeof raw !== 'object') {
                return result;
            }

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

        let redirectMapPromise = null;

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
                        loggerRef?.error?.('Failed to parse redirect map:', error);
                        return {};
                    }
                })
                .catch((error) => {
                    if (error?.code === 'ENOENT') {
                        return {};
                    }
                    loggerRef?.error?.('Unable to read redirect map:', error);
                    return {};
                })
                .then((raw) => {
                    try {
                        return buildRedirectMap(raw);
                    } catch (error) {
                        loggerRef?.error?.('Failed to normalize redirect map:', error);
                        return new Map();
                    }
                });
            return redirectMapPromise;
        };

        const allowedLocales = allowedLocaleList;
        const fallbackLocale = configRef?.getLocaleBaseWeb?.() || '';
        const resolveRouting = (value) => helpWeb?.extractRoutingInfo?.({
            path: value,
            allowedLocales,
            fallbackLocale,
        }) ?? {locale: fallbackLocale, cleanPath: value};

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

        const buildUrlWithQuery = (pathValue, query) => (query ? `${pathValue}?${query}` : pathValue);

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

            req.url = buildUrlWithQuery(destination, query);
        };

        self.applyRedirect = async function ({req, routeInfo}) {
            try {
                await tryRedirect({req, routeInfo});
            } catch (error) {
                loggerRef?.error?.('Redirect handler failure:', error);
            }
        };
    }
}
