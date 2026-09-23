// @ts-check

/**
 * @namespace App_Back_Web_Handler_Markdown
 * @description Serves explicitly published Markdown articles and their SSR HTML projection.
 */

export default class Markdown {
    /**
     * @param {object} deps
     * @param {typeof import('node:http2')} deps.http2
     * @param {typeof import('node:fs/promises')} deps.fs
     * @param {typeof import('node:path')} deps.path
     * @param {TeqFw_Web_Back_Helper_Respond} deps.respond
     * @param {TeqFw_Web_Back_Dto_Info__Factory} deps.dtoInfo
     * @param {App_Back_Web_Metadata} deps.metadata
     * @param {Fl32_Tmpl_Back_Config} deps.tmplConfig
     * @param {Fl32_Tmpl_Back_Service_Render} deps.servTmplRender
     * @param {App_Back_Web_Markdown_Publication} deps.publication
     * @param {TeqFw_Web_Back_Enum_Stage} deps.STAGE
     */
    constructor({http2, fs, path, respond, dtoInfo, metadata, tmplConfig, servTmplRender, publication, STAGE}) {
        const {HTTP2_HEADER_CONTENT_LENGTH, HTTP2_HEADER_CONTENT_TYPE} = http2.constants;
        const info = dtoInfo.create({
            name: 'App_Back_Web_Handler_Markdown',
            stage: STAGE.PROCESS,
            before: ['Fl32_Cms_Back_Web_Handler_Template'],
        });
        /** @returns {TeqFw_Web_Back_Dto_Info} */
        this.getRegistrationInfo = () => info;

        /**
         * @param {TeqFw_Web_Back_Pipeline_RequestContext} context
         * @returns {Promise<void>}
         */
        this.handle = async (context) => {
            const {request: req, response: res} = context;
            if (!respond.isWritable(res) || !['GET', 'HEAD'].includes(req.method || 'GET')) return;
            if ((req.url || '').split('?', 1)[0] === '/llms.txt') {
                const body = await fs.readFile(path.join(tmplConfig.getRootPath(), 'tmpl', 'web', 'llms.txt'), 'utf8');
                respond.code200_Ok({
                    res,
                    headers: {
                        [HTTP2_HEADER_CONTENT_TYPE]: 'text/plain; charset=utf-8',
                        [HTTP2_HEADER_CONTENT_LENGTH]: Buffer.byteLength(body, 'utf8'),
                    },
                    body: req.method === 'HEAD' ? '' : body,
                });
                context.completed = true;
                return;
            }
            const route = publication.parseRoute(req.url || '');
            if (!route) return;
            const article = await publication.load(route);
            if (!article) return;
            const publicPath = route.type === 'library'
                ? `/library/${route.directory.length ? `${route.directory.join('/')}/` : ''}${route.slug}`
                : `/blog/${route.year}/${route.slug}`;
            let body;
            let contentType;
            if (route.representation === 'md') {
                body = article.source;
                contentType = 'text/markdown; charset=utf-8';
            } else {
                const routeMetadata = metadata.forRoute(route.locale, `${publicPath}.html`);
                const data = {
                    locale: route.locale,
                    allowedLocales: tmplConfig.getAvailableLocales(),
                    ...routeMetadata,
                    isPublication: route.type === 'blog',
                    isLibrary: route.type === 'library',
                    journalRelations: route.type === 'blog' ? article.metadata.relations : [],
                    markdownUrl: `${routeMetadata.canonicalUrl.slice(0, -5)}.md`,
                    article: {
                        ...article.metadata,
                        dateLabel: route.locale === 'ru' ? 'Дата публикации'
                            : route.locale === 'es' ? 'Fecha de publicación'
                                : 'Publication date',
                        html: article.html,
                    },
                };
                const {content} = await servTmplRender.perform({
                    target: {locales: {user: route.locale}}, template: await fs.readFile(path.join(tmplConfig.getRootPath(), 'tmpl', 'web', 'markdown-article.html'), 'utf8'), data, options: {},
                });
                if (!content) return;
                body = content;
                contentType = 'text/html; charset=utf-8';
            }
            respond.code200_Ok({
                res,
                headers: {
                    [HTTP2_HEADER_CONTENT_TYPE]: contentType,
                    [HTTP2_HEADER_CONTENT_LENGTH]: Buffer.byteLength(body, 'utf8'),
                },
                body: req.method === 'HEAD' ? '' : body,
            });
            context.completed = true;
        };
    }
}

export const __deps__ = Object.freeze({
    http2: 'node:http2',
    fs: 'node:fs/promises',
    path: 'node:path',
    respond: 'TeqFw_Web_Back_Helper_Respond$',
    dtoInfo: 'TeqFw_Web_Back_Dto_Info__Factory$',
    metadata: 'App_Back_Web_Metadata$',
    tmplConfig: 'Fl32_Tmpl_Back_Config$',
    servTmplRender: 'Fl32_Tmpl_Back_Service_Render$',
    publication: 'App_Back_Web_Markdown_Publication$',
    STAGE: 'TeqFw_Web_Back_Enum_Stage$',
});
