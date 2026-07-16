#!/usr/bin/env node

import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import {fileURLToPath} from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const templateRoot = path.join(root, 'tmpl', 'web');
const outputPath = path.join(root, 'web', 'sitemap.xml');
const siteUrl = (process.env.WG_SITE_URL || 'https://wiredgeese.com').replace(/\/+$/, '');
const locales = ['en', 'ru', 'es'];
const excluded = new Set(['404.html', 'contacts.html', 'posts.html', 'products.html']);

const escapeXml = (value) => value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');

const collectHtml = async (directory, prefix = '') => {
    const entries = await fs.readdir(directory, {withFileTypes: true});
    const result = [];
    for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name))) {
        if (entry.name === 'inc') continue;
        const relative = prefix ? `${prefix}/${entry.name}` : entry.name;
        if (entry.isDirectory()) {
            result.push(...await collectHtml(path.join(directory, entry.name), relative));
        } else if (entry.isFile() && entry.name.endsWith('.html') && !excluded.has(relative)) {
            result.push(relative);
        }
    }
    return result;
};

const toPublicPath = (locale, relative) => {
    if (relative === 'index.html') return `/${locale}/`;
    if (relative === 'blog.html') return `/${locale}/blog/`;
    if (relative.endsWith('/index.html')) {
        return `/${locale}/${relative.slice(0, -'index.html'.length)}`;
    }
    return `/${locale}/${relative}`;
};

const routeLocales = new Map();
for (const locale of locales) {
    for (const relative of await collectHtml(path.join(templateRoot, locale))) {
        if (!routeLocales.has(relative)) routeLocales.set(relative, []);
        routeLocales.get(relative).push(locale);
    }
}

const rank = (relative) => {
    if (relative === 'index.html') return 0;
    if (relative === 'projects.html') return 1;
    if (relative === 'contact.html') return 2;
    if (relative === 'library/index.html') return 3;
    if (relative === 'blog.html') return 4;
    return 10;
};

const routes = [...routeLocales.entries()].sort(([a], [b]) => {
    const rankDiff = rank(a) - rank(b);
    return rankDiff || a.localeCompare(b);
});

const lines = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
];

for (const [relative, availableLocales] of routes) {
    for (const locale of availableLocales) {
        const url = `${siteUrl}${toPublicPath(locale, relative)}`;
        lines.push('  <url>');
        lines.push(`    <loc>${escapeXml(url)}</loc>`);
        for (const alternateLocale of availableLocales) {
            const alternate = `${siteUrl}${toPublicPath(alternateLocale, relative)}`;
            lines.push(`    <xhtml:link rel="alternate" hreflang="${alternateLocale}" href="${escapeXml(alternate)}"/>`);
        }
        if (availableLocales.includes('en')) {
            const fallback = `${siteUrl}${toPublicPath('en', relative)}`;
            lines.push(`    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(fallback)}"/>`);
        }
        lines.push('  </url>');
    }
}

lines.push('</urlset>', '');
await fs.writeFile(outputPath, lines.join('\n'), 'utf8');

const counts = Object.fromEntries(locales.map((locale) => [
    locale,
    routes.filter(([, available]) => available.includes(locale)).length,
]));
console.log(`Generated ${outputPath}`);
console.log(`URLs: ${Object.values(counts).reduce((sum, count) => sum + count, 0)} (${locales.map((locale) => `${locale}: ${counts[locale]}`).join(', ')})`);
