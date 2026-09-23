// @ts-check

/**
 * @namespace App_Back_Web_Cms_Handler_Blog
 * @description Builds localized Journal indexes and relation projections from Markdown metadata.
 */

const YEAR_DIRECTORY_PATTERN = /^\d{4}$/;
const MARKDOWN_EXTENSION_PATTERN = /\.md$/i;
const RELATION_ID_PATTERN = /^[a-z][a-z0-9-]*$/;

/** @param {string} a @param {string} b @returns {number} */
const sortNumericDesc = (a, b) => Number(b) - Number(a);

/** @param {string} a @param {string} b @returns {number} */
const sortArticleFilesDesc = (a, b) =>
    b.localeCompare(a, undefined, { numeric: true, sensitivity: 'base' });

export default class Blog {
    /**
     * @param {object} deps
     * @param {typeof import('node:fs/promises')} deps.fs
     * @param {typeof import('node:path')} deps.path
     * @param {Fl32_Tmpl_Back_Config} deps.tmplConfig
     * @param {App_Back_Web_Markdown_Publication} deps.publication
     */
    constructor({fs, path, tmplConfig, publication}) {
        /** @param {string} locale @returns {string} */
        const resolveBlogRoot = (locale) =>
            path.join(tmplConfig.getRootPath(), 'tmpl', 'web', locale, 'blog');

        /**
         * @param {string} target
         * @param {RegExp} pattern
         * @returns {Promise<string[]>}
         */
        const listDirectoryNames = async (target, pattern) => {
            const dirents = await fs.readdir(target, {withFileTypes: true});
            return dirents
                .filter((dirent) => dirent.isDirectory() && pattern.test(dirent.name))
                .map((dirent) => dirent.name)
                .sort(sortNumericDesc);
        };

        /** @param {string} target @returns {Promise<string[]>} */
        const listYearDirectories = (target) =>
            listDirectoryNames(target, YEAR_DIRECTORY_PATTERN);

        /** @param {string} target @returns {Promise<string[]>} */
        const listArticleFiles = async (target) => {
            const dirents = await fs.readdir(target, {withFileTypes: true});
            return dirents
                .filter((dirent) => dirent.isFile()
                    && MARKDOWN_EXTENSION_PATTERN.test(dirent.name))
                .map((dirent) => dirent.name)
                .sort(sortArticleFilesDesc);
        };

        /** @param {string} value @returns {string} */
        const escapeHtml = (value) => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;')
            .replaceAll('>', '&gt;').replaceAll('"', '&quot;');

        /**
         * @param {string} locale
         * @param {string} year
         * @param {string} fileName
         * @returns {Promise<object>}
         */
        const extractMarkdownBlogItem = async (locale, year, fileName) => {
            const slug = fileName.replace(MARKDOWN_EXTENSION_PATTERN, '');
            const article = await publication.load({type: 'blog', locale, year, slug});
            if (!article) return null;
            const {metadata} = article;
            const summary = typeof metadata.summary === 'string' ? metadata.summary : metadata.description;
            const displayDate = typeof metadata.display_date === 'string'
                ? metadata.display_date
                : metadata.date;
            const image = typeof metadata.image === 'string' ? metadata.image : '/img/avatar.jpg';
            const imageAlt = typeof metadata.image_alt === 'string' ? metadata.image_alt : '';
            return {
                html: `<li class="blog-item"><a class="card-link" href="/${locale}/blog/${year}/${slug}.html" aria-label="${escapeHtml(metadata.title)}"></a><img loading="lazy" decoding="async" src="${escapeHtml(image)}" alt="${escapeHtml(imageAlt)}"><div><h2>${escapeHtml(metadata.title)}</h2><p>${escapeHtml(summary)}</p><time datetime="${metadata.date}">${escapeHtml(displayDate)}</time></div></li>`,
                relations: metadata.relations,
            };
        };

        /**
         * @param {string} locale
         * @param {string} year
         * @param {string} yearPath
         * @returns {Promise<object[]>}
         */
        const collectEntriesFromYear = async (locale, year, yearPath) => {
            const entries = [];
            const files = await listArticleFiles(yearPath);
            for (const fileName of files) {
                const item = await extractMarkdownBlogItem(locale, year, fileName);
                if (!item) continue;
                entries.push({
                    slug: fileName.replace(MARKDOWN_EXTENSION_PATTERN, ''),
                    url: path.posix.join('/', locale, 'blog', year, `${fileName.replace(MARKDOWN_EXTENSION_PATTERN, '')}.html`),
                    ...item,
                });
            }
            return entries;
        };

        /**
         * @param {string} locale
         * @param {string} blogRoot
         * @param {string[]} years
         * @returns {Promise<object[]>}
         */
        const collectEntriesFromYears = async (locale, blogRoot, years) => {
            const entries = [];
            for (const year of years) {
                const yearPath = path.join(blogRoot, year);
                entries.push(...await collectEntriesFromYear(locale, year, yearPath));
            }
            return entries;
        };

        /**
         * Builds journal cards in reverse chronological order.
         * @param {string} locale
         * @returns {Promise<object[]>}
         */
        this.collectBlogIndex = async function (locale) {
            const blogRoot = resolveBlogRoot(locale);
            const yearDirectories = await listYearDirectories(blogRoot);
            return collectEntriesFromYears(locale, blogRoot, yearDirectories);
        };

        /**
         * Builds a deliberately small, deterministic projection for a page
         * that needs recent Journal evidence without becoming the Journal index.
         * @param {string} locale
         * @param {number} [limit]
         * @returns {Promise<object[]>}
         */
        this.collectRecentBlogEntries = async function (locale, limit = 3) {
            const items = await this.collectBlogIndex(locale);
            return items.slice(0, Math.max(0, limit));
        };

        /**
         * Projects a bounded, deterministic set of genuinely related Events
         * from the same authored Journal content.
         *
         * @param {string} locale
         * @param {string|string[]} relationId
         * @param {number} [limit]
         * @returns {Promise<object[]>}
         */
        this.collectRelatedBlogEntries = async function (locale, relationId, limit = 3) {
            const relationIds = Array.isArray(relationId) ? relationId : [relationId];
            if (!relationIds.length || relationIds.some((id) => !RELATION_ID_PATTERN.test(id))) return [];
            const items = await this.collectBlogIndex(locale);
            return items
                .filter((item) => item.relations.some((relation) => relationIds.includes(relation)))
                .slice(0, Math.max(0, limit));
        };

        /**
         * Finds optional authored relation identifiers for a localized Event.
         * The relation only identifies what the dated Event concerns; it does
         * not change the current state owned by the target destination.
         *
         * @param {string} locale
         * @param {string} cleanPath
         * @returns {Promise<string[]>}
         */
        this.collectEntryRelations = async function (locale, cleanPath) {
            const normalized = (cleanPath || '').replace(/\/+$/, '') || '/';
            const items = await this.collectBlogIndex(locale);
            return items.find((item) => item.url === `/${locale}${normalized}`)?.relations || [];
        };
    }
}

export const __deps__ = Object.freeze({
    fs: 'node:fs/promises',
    path: 'node:path',
    tmplConfig: 'Fl32_Tmpl_Back_Config$',
    publication: 'App_Back_Web_Markdown_Publication$',
});
