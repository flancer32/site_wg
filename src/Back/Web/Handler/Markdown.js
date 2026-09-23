// @ts-check

/**
 * @namespace App_Back_Web_Handler_Markdown
 * @description Serves explicitly published Markdown articles and their SSR HTML projection.
 */

const PAGE_TEMPLATE = `{% extends "inc/layout.html" %}
{% block title %}{{ article.title }}{% endblock %}
{% block description %}{{ article.description }}{% endblock %}
{% block html_head_extra %}{% if markdownUrl %}<link rel="alternate" type="text/markdown" href="{{ markdownUrl }}" title="{{ article.title }} (Markdown)">{% endif %}{% endblock %}
{% block content %}<article class="card blog-post"><time datetime="{{ article.date }}">{{ article.display_date or article.date }}</time>{{ article.html | safe }}</article>{% endblock %}`;

export default class Markdown {
    /**
     * @param {object} deps
     * @param {typeof import('node:http2')} deps.http2
     * @param {typeof import('node:fs/promises')} deps.fs
     * @param {typeof import('node:path')} deps.path
     * @param {TeqFw_Web_Back_Helper_Respond} deps.respond
     * @param {TeqFw_Web_Back_Dto_Info__Factory} deps.dtoInfo
     * @param {Fl32_Cms_Back_Config} deps.config
     * @param {Fl32_Tmpl_Back_Config} deps.tmplConfig
     * @param {Fl32_Tmpl_Back_Service_Render} deps.servTmplRender
     * @param {App_Back_Web_Markdown_Publication} deps.publication
     * @param {TeqFw_Web_Back_Enum_Stage} deps.STAGE
     */
    constructor({http2, fs, path, respond, dtoInfo, config, tmplConfig, servTmplRender, publication, STAGE}) {
        const {HTTP2_HEADER_CONTENT_LENGTH, HTTP2_HEADER_CONTENT_TYPE} = http2.constants;
        const info = dtoInfo.create({
            name: 'App_Back_Web_Handler_Markdown',
            stage: STAGE.PROCESS,
            before: ['Fl32_Cms_Back_Web_Handler_Template'],
        });
        /** @returns {string} */
        const origin = () => {
            try {
                const value = new URL(config.getBaseUrl?.() || 'https://wiredgeese.com');
                return ['http:', 'https:'].includes(value.protocol) ? value.origin : 'https://wiredgeese.com';
            } catch {
                return 'https://wiredgeese.com';
            }
        };
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
            if (route.representation === 'md' && route.locale !== 'en') {
                // Keep unpublished localized Markdown on the normal localized 404 path.
                req.url = `/${route.locale}/__markdown-not-published__.html`;
                return;
            }
            const article = await publication.load(route);
            if (!article) return;
            const publicPath = `/${route.locale}/blog/${route.year}/${route.slug}`;
            let body;
            let contentType;
            if (route.representation === 'md') {
                body = article.source;
                contentType = 'text/markdown; charset=utf-8';
            } else {
                const locales = tmplConfig.getAvailableLocales();
                const canonicalUrl = `${origin()}${publicPath}.html`;
                const data = {
                    locale: route.locale,
                    allowedLocales: locales,
                    canonicalUrl,
                    alternateUrls: Object.fromEntries(locales.map((locale) => [locale, `${origin()}/${locale}/blog/${route.year}/${route.slug}.html`])),
                    isPublication: true,
                    journalRelations: article.metadata.relations,
                    markdownUrl: route.locale === 'en' ? `${origin()}${publicPath}.md` : undefined,
                    article: {...article.metadata, html: article.html},
                };
                const {content} = await servTmplRender.perform({
                    target: {locales: {user: route.locale}}, template: PAGE_TEMPLATE, data, options: {},
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
    config: 'Fl32_Cms_Back_Config$',
    tmplConfig: 'Fl32_Tmpl_Back_Config$',
    servTmplRender: 'Fl32_Tmpl_Back_Service_Render$',
    publication: 'App_Back_Web_Markdown_Publication$',
    STAGE: 'TeqFw_Web_Back_Enum_Stage$',
});
