// https://vitepress.dev/guide/custom-theme
import Layout from './Layout.vue';
import './style.css'
import pkg from 'naive-ui';
import {Quasar} from 'quasar';

export default {
    Layout,
    async enhanceApp({app, router, sitedata}) {
        debugger
        Quasar.install(app);
        pkg.install(app); // register 'native-ui'
    }
}