<script setup>
import Bwl from './Portfolio/Bwl.vue';
import DEF from '../js/defaults.mjs';
import Duplo from './Portfolio/Duplo.vue';
import ImgUpload from './Portfolio/ImgUpload.vue';
import RaAdmin from './Portfolio/RaAdmin.vue';
import RaMob from './Portfolio/RaMob.vue';
import {computed, onMounted, ref} from 'vue';

// VARS
const projects = [DEF.PRJ_RA_MOB, DEF.PRJ_RA_ADMIN, DEF.PRJ_DUPLO, DEF.PRJ_BWL, DEF.PRJ_IMG_UP];

// DATA (reactivity)
const code = ref(DEF.PRJ_RA_MOB); // code for currently selected project
const index = ref(0);
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
// MAIN
onMounted(() => {
    const el = document.querySelector('.carousel-container');
    el.style.display = 'block';
});
</script>

<template>
    <div class="carousel-container">
        <NCarousel
                :on-update:current-index="doSwitch"
                :show-dots="false"
                class="my-carousel"
                effect="card"
                next-slide-style="transform: translateX(50%) translateZ(-800px);"
                prev-slide-style="transform: translateX(-150%) translateZ(-800px);"
        >
            <NCarouselItem :style="{ width: '60%' }"
                           v-for="code in projects"
                           v-on:click="openImg(code)"
            >
                <img
                        class="carousel-img"
                        :src="urlImgSource(code)"
                >
            </NCarouselItem>
        </NCarousel>
    </div>
    <div class="description">
        <Bwl v-if="code===DEF.PRJ_BWL"/>
        <Duplo v-if="code===DEF.PRJ_DUPLO"/>
        <ImgUpload v-if="code===DEF.PRJ_IMG_UP"/>
        <RaAdmin v-if="code===DEF.PRJ_RA_ADMIN"/>
        <RaMob v-if="code===DEF.PRJ_RA_MOB"/>
    </div>
    <NModal v-model:show="showModal" class="preview" v-on:click="showModal=false">
        <div>
            <img :src="uiImageSrc" v-on:click="showModal=false">
        </div>
    </NModal>
</template>

<style scoped>
.my-carousel {
    height: 240px;
    width: 100vw;
}

.carousel-container {
    display: none;
}

.carousel-img {
    max-height: 240px;
    object-fit: scale-down;
    width: 100%;
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
    width: min(90vw, 600px);
    margin: 0 auto;
    padding-top: var(--size-xl);
}

.n-modal {
    align-self: normal !important;
    margin: 0 !important;
}
</style>