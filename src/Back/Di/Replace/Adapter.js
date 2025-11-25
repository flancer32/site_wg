// @ts-nocheck
/**
 * @implements Fl32_Cms_Back_Api_Adapter
 */
export default class App_Back_Di_Replace_Adapter {
    /**
     * @param {Fl32_Cms_Back_Di_Replace_Adapter} cmsAdapter
     */
    constructor(
        {
            Fl32_Cms_Back_Di_Replace_Adapter$: cmsAdapter,
        }
    ) {
        const self = this;
        const cms = cmsAdapter;

        const normalizeHeaderValue = (value) => {
            if (!value) {
                return '';
            }
            const rawValue = Array.isArray(value) ? value[0] : value;
            return String(rawValue).split(',')[0].trim();
        };

        const buildOrigin = (req) => {
            const headers = req?.headers ?? {};
            const forwardedHost = normalizeHeaderValue(headers['x-forwarded-host']);
            const forwardedProto = normalizeHeaderValue(headers['x-forwarded-proto']);
            const host = forwardedHost || headers.host;

            if (!host) {
                return '';
            }

            const trimmedHost = host.replace(/\/+$/, '');
            const scheme = forwardedProto || (req?.socket?.encrypted ? 'https' : 'http');

            return `${scheme}://${trimmedHost}`;
        };

        const replaceOrigin = (url, origin) => {
            if (!url || !origin) {
                return url;
            }
            return url.replace(/^(?:https?:)?\/\/[^/]+/, origin);
        };

        const delegateCmsMethods = () => {
            const overrides = new Set([
                ...Object.getOwnPropertyNames(self.constructor.prototype),
                ...Object.getOwnPropertySymbols(self.constructor.prototype),
                'getRenderData',
            ]);

            const methods = new Set();
            let current = cms;

            while (current && current !== Object.prototype) {
                const keys = [
                    ...Object.getOwnPropertyNames(current),
                    ...Object.getOwnPropertySymbols(current),
                ];

                for (const key of keys) {
                    if (key === 'constructor' || overrides.has(key)) {
                        continue;
                    }

                    const descriptor = Object.getOwnPropertyDescriptor(current, key);
                    if (!descriptor || typeof descriptor.value !== 'function') {
                        continue;
                    }

                    methods.add(key);
                }

                current = Object.getPrototypeOf(current);
            }

            for (const method of methods) {
                if (Object.prototype.hasOwnProperty.call(self, method)) {
                    continue;
                }

                self[method] = (...args) => cms[method](...args);
            }
        };

        self.getRenderData = async function ({ req }) {
            const renderData = await cms.getRenderData({ req });
            const data = renderData?.data;
            const origin = buildOrigin(req);

            if (!data || !origin) {
                return renderData;
            }

            if (typeof data.canonicalUrl === 'string' && data.canonicalUrl) {
                data.canonicalUrl = replaceOrigin(data.canonicalUrl, origin);
            }

            if (data.alternateUrls && typeof data.alternateUrls === 'object') {
                for (const locale of Object.keys(data.alternateUrls)) {
                    const url = data.alternateUrls[locale];
                    if (typeof url === 'string' && url) {
                        data.alternateUrls[locale] = replaceOrigin(url, origin);
                    }
                }
            }

            return renderData;
        };

        delegateCmsMethods();
    }
}
