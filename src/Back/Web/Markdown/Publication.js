// @ts-check

/**
 * @namespace App_Back_Web_Markdown_Publication
 * @description Resolves locale-scoped canonical Markdown sources for Journal and Library publications.
 */

const BLOG_ROUTE_PATTERN = /^\/(en|es|ru)\/blog\/(\d{4})\/([a-z0-9][a-z0-9-]*)\.(html|md)$/;
const LIBRARY_ROUTE_PATTERN = /^\/(en|es|ru)\/library\/((?:[a-z0-9-]+\/)*)([a-z0-9][a-z0-9-]*)\.(html|md)$/;
const DIGEST_INDEX_ROUTE_PATTERN = /^\/(en|es|ru)\/products\/pde\/telegram-digest\/(?:index\.md)?$/;
const FRONT_MATTER_PATTERN = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/;
const RELATION_ID_PATTERN = /^[a-z][a-z0-9-]*$/;

export default class Publication {
    /**
     * @param {object} deps
     * @param {typeof import('node:fs/promises')} deps.fs
     * @param {typeof import('node:path')} deps.path
     * @param {typeof import('marked')} deps.marked
     * @param {Fl32_Tmpl_Back_Config} deps.tmplConfig
     */
    constructor({fs, path, marked, tmplConfig}) {
        /** @returns {string} */
        const publicationRoot = () => path.join(tmplConfig.getRootPath(), 'tmpl', 'web');

        /** @param {string} source @returns {object} */
        const parseFrontMatter = (source) => {
            const match = FRONT_MATTER_PATTERN.exec(source);
            if (!match) return null;
            /** @type {Record<string, string|string[]>} */
            const attributes = {};
            let listKey = null;
            for (const rawLine of match[1].split(/\r?\n/)) {
                const listMatch = /^\s*-\s+(.+?)\s*$/.exec(rawLine);
                if (listMatch && listKey) {
                    const value = listMatch[1].replace(/^['"]|['"]$/g, '');
                    const current = attributes[listKey];
                    attributes[listKey] = [...(Array.isArray(current) ? current : []), value];
                    continue;
                }
                const entryMatch = /^([a-z_]+):\s*(.*?)\s*$/.exec(rawLine);
                if (!entryMatch) return null;
                const [, key, rawValue] = entryMatch;
                const value = rawValue.replace(/^['"]|['"]$/g, '');
                if (!value) {
                    attributes[key] = [];
                    listKey = key;
                } else {
                    attributes[key] = value;
                    listKey = null;
                }
            }
            return {attributes, body: match[2]};
        };

        /** @param {string} url @returns {object} */
        this.parseRoute = (url) => {
            const pathname = url.split('?', 1)[0];
            let decoded;
            try {
                decoded = decodeURIComponent(pathname);
            } catch {
                return null;
            }
            const match = BLOG_ROUTE_PATTERN.exec(decoded);
            if (match) {
                const [, locale, year, slug, representation] = match;
                return {type: 'blog', locale, year, slug, representation: /** @type {'html'|'md'} */ (representation)};
            }
            const digestIndex = DIGEST_INDEX_ROUTE_PATTERN.exec(decoded);
            if (digestIndex) {
                const [, locale] = digestIndex;
                return {type: 'digest-notice', locale, slug: 'index', representation: decoded.endsWith('.md') ? 'md' : 'html'};
            }
            const libraryMatch = LIBRARY_ROUTE_PATTERN.exec(decoded);
            if (libraryMatch) {
                const [, locale, directory, slug, representation] = libraryMatch;
                const relativeDirectory = directory ? directory.slice(0, -1).split('/') : [];
                return {type: 'library', locale, directory: relativeDirectory, slug, representation: /** @type {'html'|'md'} */ (representation)};
            }
            return null;
        };

        /**
         * @param {object} route
         * @returns {Promise<object>}
         */
        this.load = async (route) => {
            if (!route || !['en', 'ru', 'es'].includes(route.locale)
                || !/^[a-z0-9][a-z0-9-]*$/.test(route.slug)
                || (route.type === 'blog' && !/^\d{4}$/.test(route.year))
                || (route.type === 'digest-notice' && route.slug !== 'index')
                || (route.type === 'library' && (!Array.isArray(route.directory)
                    || route.directory.some((segment) => !/^[a-z0-9-]+$/.test(segment))))
                || !['blog', 'library', 'digest-notice'].includes(route.type)) return null;
            const parts = route.type === 'library'
                ? [publicationRoot(), route.locale, 'library', ...route.directory]
                : route.type === 'digest-notice'
                    ? [publicationRoot(), route.locale, 'products', 'pde', 'telegram-digest']
                    : [publicationRoot(), route.locale, 'blog', route.year];
            const expectedDirectory = path.join(...parts);
            const filePath = path.join(expectedDirectory, `${route.slug}.md`);
            if (path.dirname(filePath) !== expectedDirectory) return null;
            let source;
            try {
                if (await fs.realpath(filePath) !== path.resolve(filePath)) return null;
                source = await fs.readFile(filePath, 'utf8');
            } catch (error) {
                if (error?.code === 'ENOENT' || error?.code === 'ENOTDIR') return null;
                throw error;
            }
            const parsed = parseFrontMatter(source);
            const title = parsed?.attributes.title;
            const sourceDescription = parsed?.attributes.description;
            const date = parsed?.attributes.date;
            if (!parsed || typeof title !== 'string' || !title.trim()) return null;
            if (route.type === 'blog' && (typeof date !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(date))) return null;
            if (date && (typeof date !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(date))) return null;
            const rawRelations = parsed.attributes.relations;
            const relations = Array.isArray(rawRelations)
                ? rawRelations.filter((relation) => RELATION_ID_PATTERN.test(relation))
                : [];
            const bodyText = parsed.body
                .replace(/<[^>]*>/g, ' ')
                .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
                .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
                .replace(/[`*_>#]/g, ' ')
                .replace(/\s+/g, ' ')
                .trim();
            const excerpt = bodyText.length > 180 ? `${bodyText.slice(0, 180).replace(/\s+\S*$/, '')}…` : bodyText;
            const description = typeof sourceDescription === 'string' ? sourceDescription : excerpt;
            if (!description) return null;
            return {
                source,
                body: parsed.body,
                html: await marked.parse(parsed.body, {gfm: true}),
                metadata: {...parsed.attributes, title, description, date: date || '', relations},
            };
        };
    }
}

export const __deps__ = Object.freeze({
    fs: 'node:fs/promises',
    path: 'node:path',
    marked: 'npm:marked',
    tmplConfig: 'Fl32_Tmpl_Back_Config$',
});
