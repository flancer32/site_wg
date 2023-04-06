<script setup>
import {useData} from 'vitepress';
// https://vitepress.dev/reference/runtime-api#usedata
const {site, frontmatter} = useData()
</script>

<template>
  <header class="page">
    <div class="logo">Wiredgeese Devs</div>
    <nav class="menu">Menu</nav>
  </header>
  <main class="page">
    <Content/>
  </main>
</template>
