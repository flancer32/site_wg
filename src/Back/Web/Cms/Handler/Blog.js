const YEAR_DIRECTORY_PATTERN = /^\d{4}$/;
const MONTH_DIRECTORY_PATTERN = /^\d{2}$/;
const BLOG_ITEM_BLOCK_PATTERN = /{% block blog_item %}([\s\S]*?){% endblock %}/i;
const HTML_EXTENSION_PATTERN = /\.html$/i;

const sortNumericDesc = (a, b) => Number(b) - Number(a);

const sortHtmlFilesDesc = (a, b) =>
    b.localeCompare(a, undefined, { numeric: true, sensitivity: 'base' });

export default class App_Back_Web_Cms_Handler_Blog {
    /**
     * @param {typeof import('node:fs/promises')} fs
     * @param {typeof import('node:path')} path
     * @param {Fl32_Cms_Back_Config} config
     */
    constructor({ 'node:fs/promises': fs, 'node:path': path, Fl32_Cms_Back_Config$: config }) {
        this.fs = fs;
        this.path = path;
        this.config = config;
    }

    /**
     * Составляет список записей блога в хронологическом порядке.
     * @param {string} locale
     * @returns {Promise<Array<{slug:string,url:string,html:string}>>}
     */
    async collectBlogIndex(locale) {
        const blogRoot = this.resolveBlogRoot(locale);
        const yearDirectories = await this.listYearDirectories(blogRoot);
        return this.collectEntriesFromYears(locale, blogRoot, yearDirectories);
    }

    resolveBlogRoot(locale) {
        return this.path.join(this.config.getRootPath(), 'tmpl', 'web', locale, 'blog');
    }

    async collectEntriesFromYears(locale, blogRoot, years) {
        const entries = [];
        for (const year of years) {
            const yearPath = this.path.join(blogRoot, year);
            const months = await this.listMonthDirectories(yearPath);
            entries.push(
                ...await this.collectEntriesFromMonths(locale, year, yearPath, months)
            );
        }
        return entries;
    }

    async collectEntriesFromMonths(locale, year, yearPath, months) {
        const entries = [];
        for (const month of months) {
            const monthPath = this.path.join(yearPath, month);
            entries.push(
                ...await this.collectEntriesFromMonth(locale, year, month, monthPath)
            );
        }
        return entries;
    }

    async collectEntriesFromMonth(locale, year, month, monthPath) {
        const entries = [];
        const files = await this.listHtmlFiles(monthPath);
        for (const fileName of files) {
            const html = await this.extractBlogItemHtml(monthPath, fileName);
            if (!html) {
                continue;
            }
            entries.push({
                slug: this.createSlug(fileName),
                url: this.createUrl(locale, year, month, fileName),
                html,
            });
        }
        return entries;
    }

    async listYearDirectories(target) {
        return this.listDirectoryNames(target, YEAR_DIRECTORY_PATTERN);
    }

    async listMonthDirectories(target) {
        return this.listDirectoryNames(target, MONTH_DIRECTORY_PATTERN);
    }

    async listDirectoryNames(target, pattern) {
        const dirents = await this.fs.readdir(target, { withFileTypes: true });
        return dirents
            .filter((dirent) => dirent.isDirectory() && pattern.test(dirent.name))
            .map((dirent) => dirent.name)
            .sort(sortNumericDesc);
    }

    async listHtmlFiles(target) {
        const dirents = await this.fs.readdir(target, { withFileTypes: true });
        return dirents
            .filter((dirent) => dirent.isFile() && HTML_EXTENSION_PATTERN.test(dirent.name))
            .map((dirent) => dirent.name)
            .sort(sortHtmlFilesDesc);
    }

    async extractBlogItemHtml(dir, fileName) {
        const filePath = this.path.join(dir, fileName);
        const content = await this.fs.readFile(filePath, 'utf-8');
        const match = BLOG_ITEM_BLOCK_PATTERN.exec(content);
        return match ? match[1] : null;
    }

    createSlug(fileName) {
        return fileName.replace(HTML_EXTENSION_PATTERN, '');
    }

    createUrl(locale, year, month, fileName) {
        return this.path.posix.join('/', locale, 'blog', year, month, fileName);
    }
}
