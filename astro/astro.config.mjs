import {defineConfig} from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
	outDir: '../web',
    integrations: [mdx(), sitemap()],
    output: 'static',
    site: 'https://wiredgeese.com',
});
