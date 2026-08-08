// @ts-check

/**
 * @namespace App_Back_Web_Cms_Handler_Blog
 * @description Builds the localized journal index from article-owned summary fragments.
 */

const YEAR_DIRECTORY_PATTERN = /^\d{4}$/;
const BLOG_ITEM_BLOCK_PATTERN = /{% block blog_item %}([\s\S]*?){% endblock %}/i;
const HTML_EXTENSION_PATTERN = /\.html$/i;
const BLOG_ITEM_TITLE_PATTERN = /<h4\b[^>]*>([\s\S]*?)<\/h4>/i;
const BLOG_ITEM_LINK_PATTERN = /<a(\s+class=["'][^"']*\bcard-link\b[^"']*["'])/i;

/** @param {string} a @param {string} b @returns {number} */
const sortNumericDesc = (a, b) => Number(b) - Number(a);

/** @param {string} a @param {string} b @returns {number} */
const sortHtmlFilesDesc = (a, b) =>
    b.localeCompare(a, undefined, { numeric: true, sensitivity: 'base' });

export default class Blog {
    /**
     * @param {object} deps
     * @param {typeof import('node:fs/promises')} deps.fs
     * @param {typeof import('node:path')} deps.path
     * @param {Fl32_Tmpl_Back_Config} deps.tmplConfig
     */
    constructor({fs, path, tmplConfig}) {
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
        const listHtmlFiles = async (target) => {
            const dirents = await fs.readdir(target, {withFileTypes: true});
            return dirents
                .filter((dirent) => dirent.isFile() && HTML_EXTENSION_PATTERN.test(dirent.name))
                .map((dirent) => dirent.name)
                .sort(sortHtmlFilesDesc);
        };

        /** @param {string} html @returns {string} */
        const normalizeBlogItemHtml = (html) => {
            const titleMatch = BLOG_ITEM_TITLE_PATTERN.exec(html);
            const title = titleMatch?.[1]
                ?.replace(/<[^>]+>/g, '')
                .replace(/\s+/g, ' ')
                .trim()
                .replaceAll('"', '&quot;');
            let result = html
                .replace(/<h4\b([^>]*)>/i, '<h2$1>')
                .replace(/<\/h4>/i, '</h2>')
                .replace(/<img\b(?![^>]*\bloading=)/i, '<img loading="lazy" decoding="async"');
            if (title) {
                result = result.replace(BLOG_ITEM_LINK_PATTERN, `<a$1 aria-label="${title}"`);
            }
            return result;
        };

        /**
         * @param {string} dir
         * @param {string} fileName
         * @returns {Promise<string|null>}
         */
        const extractBlogItemHtml = async (dir, fileName) => {
            const filePath = path.join(dir, fileName);
            const content = await fs.readFile(filePath, 'utf-8');
            const match = BLOG_ITEM_BLOCK_PATTERN.exec(content);
            return match ? normalizeBlogItemHtml(match[1]) : null;
        };

        /**
         * @param {string} locale
         * @param {string} year
         * @param {string} yearPath
         * @returns {Promise<object[]>}
         */
        const collectEntriesFromYear = async (locale, year, yearPath) => {
            const entries = [];
            const files = await listHtmlFiles(yearPath);
            for (const fileName of files) {
                const html = await extractBlogItemHtml(yearPath, fileName);
                if (!html) continue;
                entries.push({
                    slug: fileName.replace(HTML_EXTENSION_PATTERN, ''),
                    url: path.posix.join('/', locale, 'blog', year, fileName),
                    html,
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
    }
}

export const __deps__ = Object.freeze({
    fs: 'node:fs/promises',
    path: 'node:path',
    tmplConfig: 'Fl32_Tmpl_Back_Config$',
});
