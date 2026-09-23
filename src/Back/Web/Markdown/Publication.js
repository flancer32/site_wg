// @ts-check

/**
 * @namespace App_Back_Web_Markdown_Publication
 * @description Resolves the small, explicitly published Markdown article set.
 */

const ROUTE_PATTERN = /^\/(en|es|ru)\/blog\/(\d{4})\/([a-z0-9][a-z0-9-]*)\.(html|md)$/;
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
        const publicationRoot = () => path.join(tmplConfig.getRootPath(), 'tmpl', 'web');

        /** @param {string} source @returns {{attributes: Record<string, string|string[]>, body: string}|null} */
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

        /** @param {string} url @returns {{locale: string, year: string, slug: string, representation: 'html'|'md'}|null} */
        this.parseRoute = (url) => {
            const pathname = url.split('?', 1)[0];
            let decoded;
            try {
                decoded = decodeURIComponent(pathname);
            } catch {
                return null;
            }
            const match = ROUTE_PATTERN.exec(decoded);
            if (!match || decoded.includes('..')) return null;
            const [, locale, year, slug, representation] = match;
            return {locale, year, slug, representation: /** @type {'html'|'md'} */ (representation)};
        };

        /**
         * @param {{locale: string, year: string, slug: string}} route
         * @returns {Promise<{source: string, body: string, html: string, metadata: Record<string, string|string[]> & {title: string, description: string, date: string, relations: string[]}}|null>}
         */
        this.load = async (route) => {
            const filePath = path.join(publicationRoot(), route.locale, 'blog', route.year, `${route.slug}.md`);
            const expectedDirectory = path.join(publicationRoot(), route.locale, 'blog', route.year);
            if (path.dirname(filePath) !== expectedDirectory) return null;
            let source;
            try {
                source = await fs.readFile(filePath, 'utf8');
            } catch (error) {
                if (error?.code === 'ENOENT' || error?.code === 'ENOTDIR') return null;
                throw error;
            }
            const parsed = parseFrontMatter(source);
            const title = parsed?.attributes.title;
            const description = parsed?.attributes.description;
            const date = parsed?.attributes.date;
            if (!parsed || typeof title !== 'string' || typeof description !== 'string'
                || typeof date !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(date)) return null;
            const rawRelations = parsed.attributes.relations;
            const relations = Array.isArray(rawRelations)
                ? rawRelations.filter((relation) => RELATION_ID_PATTERN.test(relation))
                : [];
            return {
                source,
                body: parsed.body,
                html: await marked.parse(parsed.body, {gfm: true}),
                metadata: {...parsed.attributes, title, description, date, relations},
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
