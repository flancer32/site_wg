#!/usr/bin/env node

import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import {fileURLToPath} from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sourcePath = path.resolve(process.env.MEDIUM_SOURCE_FILE || '/home/alex/work/medium_articles.md');
const destination = path.resolve(process.env.MEDIUM_DESTINATION || path.join(root, 'web', 'medium'));
const gateway = 'https://r.jina.ai/http://';
const requestDelayMs = Number(process.env.MEDIUM_DELAY_MS || 3500);
const onlyIds = new Set((process.env.MEDIUM_ONLY_IDS || '').split(',').filter(Boolean));

const sleep = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

const parseArticles = (source) => [...source.matchAll(
    /^\s*-\s+(\d{4}-\d{2}-\d{2})\s+—\s+\[(.*?)\]\((https:\/\/flancer32\.com\/[^)]+)\)$/gm,
)].map(([, date, title, url]) => {
    const id = new URL(url).pathname.match(/-([a-f0-9]+)$/i)?.[1];
    if (!id) throw new Error(`Could not determine Medium identifier from ${url}`);
    return {date, title, url, id};
});

const escapeYaml = (value) => JSON.stringify(value);

const removeMediumChrome = (markdown) => markdown
    .replace(/^\[!\[Image \d+: Alex Gusev\]\([^\n]+\)\]\([^\n]+\)\n\n?/m, '')
    .replace(/^\d+ min read\n\n[A-Z][a-z]{2} \d{1,2}, \d{4}\n\n(?:--\n\n){0,2}/m, '')
    .replace(/^## Get Alex Gusev’s stories in your inbox\n\nJoin Medium for free to get updates from this writer\.\n\nRemember me for faster sign in\n\n?/gm, '')
    .replace(/^Press enter or click to view image in full size\n\n?/gm, '')
    .trim();

const extensionFor = (contentType, url) => {
    const byType = {
        'image/avif': 'avif',
        'image/gif': 'gif',
        'image/jpeg': 'jpg',
        'image/png': 'png',
        'image/svg+xml': 'svg',
        'image/webp': 'webp',
    };
    if (byType[contentType]) return byType[contentType];
    const byUrl = new URL(url).pathname.match(/\.([a-zA-Z0-9]+)$/)?.[1]?.toLowerCase();
    return byUrl || 'img';
};

const fetchOrFail = async (url) => {
    const response = await fetch(url, {headers: {'user-agent': 'Mozilla/5.0 (compatible; flancer32-medium-archive/1.0)'}});
    if (!response.ok) throw new Error(`${response.status} ${response.statusText}: ${url}`);
    return response;
};

const downloadImages = async (markdown, article) => {
    const imageDirectory = path.join(destination, 'img', article.id);
    let imageNumber = 0;
    const imageUrls = new Map();
    for (const match of markdown.matchAll(/!\[([^\]]*)\]\((https:\/\/miro\.medium\.com\/[^\s)]+)\)/g)) {
        const [, alt, url] = match;
        if (!imageUrls.has(url)) imageUrls.set(url, {alt, url});
    }
    if (imageUrls.size === 0) return {markdown, images: []};

    await fs.mkdir(imageDirectory, {recursive: true});
    const replacements = new Map();
    const images = [];
    for (const image of imageUrls.values()) {
        imageNumber += 1;
        const response = await fetchOrFail(image.url);
        const extension = extensionFor(response.headers.get('content-type')?.split(';')[0], image.url);
        const filename = `image-${String(imageNumber).padStart(2, '0')}.${extension}`;
        const filePath = path.join(imageDirectory, filename);
        await fs.writeFile(filePath, Buffer.from(await response.arrayBuffer()));
        const localUrl = `img/${article.id}/${filename}`;
        replacements.set(image.url, localUrl);
        images.push({alt: image.alt, source: image.url, file: localUrl});
    }

    return {
        markdown: markdown.replace(/!\[([^\]]*)\]\((https:\/\/miro\.medium\.com\/[^\s)]+)\)/g,
            (whole, alt, url) => `![${alt}](${replacements.get(url) || url})`),
        images,
    };
};

const toDocument = (article, body) => `---
title: ${escapeYaml(article.title)}
date: ${article.date}
source: ${escapeYaml(article.url)}
medium_id: ${article.id}
---

# ${article.title}

${body}\n`;

const source = await fs.readFile(sourcePath, 'utf8');
const allArticles = parseArticles(source);
if (allArticles.length !== 88 || new Set(allArticles.map(({url}) => url)).size !== 88) {
    throw new Error(`Expected 88 unique article URLs, got ${allArticles.length}`);
}
const articles = onlyIds.size === 0 ? allArticles : allArticles.filter(({id}) => onlyIds.has(id));
if (onlyIds.size > 0 && articles.length !== onlyIds.size) throw new Error('One or more MEDIUM_ONLY_IDS values are unknown');

await fs.mkdir(destination, {recursive: true});
const manifestPath = path.join(destination, 'manifest.json');
const existingManifest = await fs.readFile(manifestPath, 'utf8').then(JSON.parse).catch(() => ({articles: [], failures: []}));
const articleRecords = new Map(existingManifest.articles.map((article) => [article.id, article]));
const failureRecords = new Map(existingManifest.failures.map((article) => [article.id, article]));
const saveManifest = async () => {
    const manifest = {
        source: sourcePath,
        generatedAt: new Date().toISOString(),
        articles: allArticles.filter(({id}) => articleRecords.has(id)).map(({id}) => articleRecords.get(id)),
        failures: allArticles.filter(({id}) => failureRecords.has(id)).map(({id}) => failureRecords.get(id)),
    };
    await fs.writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');
    return manifest;
};

for (const [index, article] of articles.entries()) {
    console.log(`[${index + 1}/${articles.length}] ${article.url}`);
    try {
        const response = await fetchOrFail(`${gateway}${article.url}`);
        const payload = await response.text();
        const content = payload.match(/^Markdown Content:\n([\s\S]*)$/m)?.[1];
        if (!content) throw new Error('Gateway response has no Markdown Content section');
        const cleaned = removeMediumChrome(content);
        const {markdown, images} = await downloadImages(cleaned, article);
        const filename = `${article.date}--${article.id}.md`;
        await fs.writeFile(path.join(destination, filename), toDocument(article, markdown), 'utf8');
        articleRecords.set(article.id, {...article, file: filename, images});
        failureRecords.delete(article.id);
    } catch (error) {
        failureRecords.set(article.id, {...article, error: error.message});
        console.error(`Failed: ${error.message}`);
    }
    await saveManifest();
    if (index < articles.length - 1) await sleep(requestDelayMs);
}

const manifest = await saveManifest();
console.log(`Imported ${manifest.articles.length}/${allArticles.length} articles; failures: ${manifest.failures.length}`);
if (manifest.failures.length > 0) process.exitCode = 1;
