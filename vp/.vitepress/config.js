import {defineConfig} from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    description: 'Mobile PWA for small businesses',
    lang: 'en-US',
    outDir: '../web',
    title: 'Wiredgeese Devs',
    titleTemplate: ':title',
    head: [
        [
            'link',
            { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }
        ]
        // would render: <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    ]
});
