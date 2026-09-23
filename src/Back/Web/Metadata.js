// @ts-check

/**
 * @namespace App_Back_Web_Metadata
 * @description Owns public canonical and locale-alternate URL construction.
 */
export default class Metadata {
    /**
     * @param {object} deps
     * @param {Fl32_Cms_Back_Config} deps.config
     * @param {Fl32_Tmpl_Back_Config} deps.tmplConfig
     */
    constructor({config, tmplConfig}) {
        const fallback = 'https://wiredgeese.com';
        const configured = config.getBaseUrl?.() || fallback;
        let origin = fallback;
        try {
            const parsed = new URL(configured);
            if (parsed.protocol === 'http:' || parsed.protocol === 'https:') origin = parsed.origin;
        } catch {
            // Keep the stable public origin for invalid configuration.
        }

        /**
         * @param {string} locale
         * @param {string} cleanPath Canonical locale-independent route, beginning with `/`.
         * @returns {{canonicalUrl: string, alternateUrls: Record<string, string>}}
         */
        this.forRoute = (locale, cleanPath) => {
            const localize = (targetLocale) => `${origin}/${targetLocale}${cleanPath === '/' ? '/' : cleanPath}`;
            return {
                canonicalUrl: localize(locale),
                alternateUrls: Object.fromEntries(tmplConfig.getAvailableLocales().map((targetLocale) =>
                    [targetLocale, localize(targetLocale)])),
            };
        };
    }
}

export const __deps__ = Object.freeze({
    config: 'Fl32_Cms_Back_Config$',
    tmplConfig: 'Fl32_Tmpl_Back_Config$',
});
