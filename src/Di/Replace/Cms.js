/**
 * CMS backend adapter implementation for the demo environment.
 * Handles template rendering data preparation with locale extraction.
 * @implements Fl32_Cms_Back_Api_Adapter
 */
export default class MySite_Back_Di_Replace_Cms {
    /* eslint-disable jsdoc/require-param-description,jsdoc/check-param-names */
    /**
     * @param {typeof import('node:fs')} fs
     * @param {typeof import('node:path')} path
     * @param {Fl32_Cms_Back_Config} configCms
     * @param {Fl32_Cms_Back_Helper_Web} helpCmsWeb
     * @param {Fl32_Tmpl_Back_Dto_Target} dtoTmplTarget
     */
    constructor(
        {
            'node:fs': fs,
            'node:path': path,
            Fl32_Cms_Back_Config$: configCms,
            Fl32_Cms_Back_Helper_Web$: helpCmsWeb,
            Fl32_Tmpl_Back_Dto_Target$: dtoTmplTarget,
        }
    ) {
        /* eslint-enable jsdoc/require-param-description,jsdoc/check-param-names */
        // VARS
        const {constants, promises: {access}} = fs;
        const {extname, join} = path;

        // MAIN
        this.getRenderData = async function ({req}) {
            // FUNCS
            function extractLocaleFromUrl(urlPath, allowed, fallback) {
                const trimmed = urlPath.replace(/^\/+|\/+$/g, '');
                const segments = trimmed.split('/');
                const first = segments[0];

                if (allowed.includes(first)) {
                    return {
                        locale: first,
                        cleanPath: '/' + segments.slice(1).join('/'),
                    };
                } else {
                    return {
                        locale: fallback,
                        cleanPath: urlPath,
                    };
                }
            }

            /**
             * Resolves a template path by checking known variants for .html pages only.
             * Leaves other file types untouched (e.g., .css, .js).
             *
             * @param {string} locale
             * @param {string} cleanPath
             * @param {string} defaultFile
             * @returns {Promise<string>}
             */
            async function buildTemplatePath(locale, cleanPath, defaultFile = 'index.html') {
                const trimmed = cleanPath.replace(/^\/+|\/+$/g, '');
                const baseDir = `./tmpl/web/${locale}`;
                const ext = extname(trimmed);

                // 1. If a path has non-.html extension (e.g., .css, .js) — use as-is
                if (ext && ext !== '.html') return trimmed;

                // 2. Try an exact path (e.g., already ends with .html)
                if (trimmed && ext === '.html') {
                    const candidate = trimmed;
                    try {
                        await access(join(baseDir, candidate), constants.R_OK);
                        return candidate;
                    } catch {}
                }

                // 3. Try *.html for clean paths without extension
                if (trimmed && !ext) {
                    const htmlCandidate = `${trimmed}.html`;
                    try {
                        await access(join(baseDir, htmlCandidate), constants.R_OK);
                        return htmlCandidate;
                    } catch {}

                    const indexCandidate = `${trimmed}/${defaultFile}`;
                    try {
                        await access(join(baseDir, indexCandidate), constants.R_OK);
                        return indexCandidate;
                    } catch {}
                }

                // 4. Fallback to default
                try {
                    await access(join(baseDir, defaultFile), constants.R_OK);
                    return defaultFile;
                } catch {}
                return null;
            }


            // MAIN
            const localeAllowed = configCms.getLocaleAllowed();
            const localeBaseWeb = configCms.getLocaleBaseWeb();
            const rawPath = decodeURIComponent(req.url?.split('?')[0] || '');
            const {cleanPath} = extractLocaleFromUrl(rawPath, localeAllowed, localeBaseWeb);
            const locale = helpCmsWeb.extractLocale({req});
            const tmplPath = await buildTemplatePath(locale, cleanPath);

            const target = dtoTmplTarget.create({
                type: 'web',
                name: tmplPath,
                locales: {
                    user: locale,
                    app: localeBaseWeb,
                },
            });
            const data = {
                ...extractVisitorInfo(req),
                locale,
                localeAllowed,
            };
            return {target, data, options: {}};
        };
    }
}

/**
 * Extracts basic visitor information from an HTTP request.
 * @param {import('node:http').IncomingMessage | import('node:http2').Http2ServerRequest} req
 * @returns {{
 *   client: {
 *     ip: string,
 *     ua: string,
 *     lang: string
 *   },
 *   url: {
 *     path: string
 *   }
 * }}
 */
function extractVisitorInfo(req) {
    const headers = req.headers || {};
    const ip = req.socket?.remoteAddress || req.connection?.remoteAddress || '';
    const ua = headers['user-agent'] || '';
    const lang = headers['accept-language']?.split(',')[0] || '';
    const path = req.url?.split('?')[0] || '';

    return {
        client: {ip, ua, lang},
        url: {path}
    };
}