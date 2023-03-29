<!--
This is layout for one only page - for homepage.
-->
<script setup>
import {useData} from 'vitepress';
import {onMounted} from 'vue';

onMounted(() => {
  // VARS
  const CSS_HAS_BG = 'hasBg';
  let elHeader, hasBg = false;

  // MAIN
  self.document.addEventListener('scroll', () => {
    if (!elHeader) elHeader = self.document.getElementsByTagName('header')[0];
    const winScroll = self.document.body.scrollTop || self.document.documentElement.scrollTop;
    if (winScroll > 20) {
      // add background
      if (!hasBg) {
        hasBg = true;
        elHeader.classList.add(CSS_HAS_BG);
      }
    } else {
      // remove background
      if (hasBg) {
        hasBg = false;
        elHeader.classList.remove(CSS_HAS_BG);
      }
    }
  });
});

// https://vitepress.dev/reference/runtime-api#usedata
const {site, page, frontmatter} = useData();

</script>

<template>
  <header>
    <div class="logo">Wiredgeese Devs</div>
    <!--    <nav class="menu">Menu</nav>-->
  </header>
  <div class="home-img"></div>
  <div class="home-slogan">Experience web apps like never before with PWA</div>
  <Content/>
</template>
