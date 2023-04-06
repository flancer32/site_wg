<script setup>
import {useData} from 'vitepress';
import Home from './Home.vue';
// import NotFound from './NotFound.vue';
import Page from './Page.vue';
import {onMounted} from 'vue';
import Analytics from './js/analytics.mjs';

// https://vitepress.dev/reference/runtime-api#usedata
const {site, page, frontmatter} = useData();
onMounted(Analytics);
</script>

<template>
  <!--  <NotFound v-if="page.isNotFound"/>-->
  <Home v-if="frontmatter.layout === 'home'"/>
  <Page v-else/>
</template>
