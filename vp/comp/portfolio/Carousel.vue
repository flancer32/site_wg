<script setup>
import AlusPils from './parts/AlusPils.vue';
import Bwl from './parts/Bwl.vue';
import ConfReg from './parts/ConfReg.vue';
import DEF from '../../js/defaults.mjs';
import Duplo from './parts/Duplo.vue';
import RaAdmin from './parts/RaAdmin.vue';
import RaMob from './parts/RaMob.vue';
import {computed, ref} from 'vue';

// VARS
const projects = [DEF.PRJ_RA_MOB, DEF.PRJ_RA_ADMIN, DEF.PRJ_DUPLO, DEF.PRJ_BWL, DEF.PRJ_IMG_UP];

// DATA (reactivity)
const index = ref(0);
const code = ref(null); // code for currently selected project
const showModal = ref(false);
const uiImageSrc = ref(null);

// COMPUTED (reactivity)

// METHODS
/**
 * Open modal popup on click on project's image in carousel
 * @param {string} code project code
 */
function openImg(code) {
  showModal.value = true;
  uiImageSrc.value = urlImgSource(code);
}

/**
 * Compose URL for image for given project.
 * @param {string} code project code
 * @returns {string}
 */
function urlImgSource(code) {
  return `${DEF.URL_PORTFOLIO}${code}.png`;
}

function doSwitch(cur, prev) {
  index.value = cur;
  code.value = projects[cur];
}

// const projects = computed(() => {});

</script>

<template>
  <q-btn color="primary">BUTTON</q-btn>
  <n-carousel
      effect="card"
      prev-slide-style="transform: translateX(-150%) translateZ(-800px);"
      next-slide-style="transform: translateX(50%) translateZ(-800px);"
      style="height: 240px"
      :on-update:current-index="doSwitch"
      :show-dots="false"
  >
    <n-carousel-item :style="{ width: '60%' }"
                     v-for="code in projects"
                     v-on:click="openImg(code)"
    >
      <img
          class="carousel-img"
          :src="urlImgSource(code)"
      >
    </n-carousel-item>
  </n-carousel>
  <div>MODAL POPUP</div>

  <n-modal v-model:show="showModal" class="preview" v-on:click="showModal=false">
    <div>
      <img :src="uiImageSrc" v-on:click="showModal=false">
      <!--      <div>CODE: {{ code }}</div>-->
    </div>
  </n-modal>

  <div class="description">
    <Bwl v-if="code===DEF.PRJ_BWL"/>
    <Duplo v-if="code===DEF.PRJ_DUPLO"/>
    <RaAdmin v-if="code===DEF.PRJ_RA_ADMIN"/>
    <RaMob v-if="code===DEF.PRJ_RA_MOB"/>
  </div>
</template>

<style scoped>
.carousel-img {
  width: 100%;
  max-height: 240px;
  object-fit: scale-down;
}

.preview {
  align-items: center;
  display: grid;
  grid-template-columns: 1fr;
  height: 100vh;
  justify-items: center;
  width: 100vw;
}

.preview IMG {
  max-height: 100vh;
  max-width: 100vw;
}

.description {
  width: max(50vw, 600px);
  margin: 0 auto;
  padding-top: var(--size-xl);
}

.n-modal {
  align-self: normal !important;
  margin: 0 !important;
}
</style>