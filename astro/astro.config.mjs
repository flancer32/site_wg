import {defineConfig} from 'astro/config';
import vue from "@astrojs/vue";

// https://astro.build/config
export default defineConfig({
    outDir: '../web',
    // Vue 3 App customization
    integrations: [vue({appEntrypoint: '/src/_app'})]
});