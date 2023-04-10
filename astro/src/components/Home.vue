<script setup>
import Contacts from './Home/Contacts.vue';
import Header from './Header.vue';
import Mission from './Home/Mission.vue';
import Portfolio from './Home/Portfolio.vue';
import Service from './Home/Service.vue';
import TechStack from './Home/TechStack.vue';
</script>

<template>
    <Header/>
    <main style="margin-top: 0">
        <div class="home-img"></div>
        <div class="home-slogan">Experience web apps like never before with PWA</div>
        <Mission class="home-block direct"/>
        <Service class="home-block reverse"/>
        <TechStack class="home-block direct"/>
        <Portfolio class="home-block reverse"/>
        <Contacts class="home-block direct"/>
    </main>
</template>

<style>
.home-slogan {
    left: 0;
    position: absolute;
    text-align: center;
    text-shadow: 1px 1px 2px var(--color-bg-dark);
    top: calc(30vh);
    width: calc(100vw - (100vw - 100%)); /* scrollbar */
}

.home-img {
    background-image: url("../../public/img/home.png");
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    height: 100vh;
    left: 0;
    position: relative;
    top: 0;
    width: calc(100vw - (100vw - 100%)); /* scrollbar width */
}

/* Blocks on homepage: text + image */

.home-block {
    display: grid;
}

.home-block A {
    text-decoration: none;
}

.home-block .text {
    padding-left: 10px;
}

.home-block .image {
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
}

/* Desktop mode*/
@media (min-width: 601px) {
    .home-slogan {
        font-size: 500%;
    }

    .home-block {
        grid-template-areas: "left right";
        grid-template-columns: 1fr 1fr;
    }

    .home-block.direct .text {
        grid-area: left;
    }

    .home-block.direct .image {
        grid-area: right;
    }

    .home-block.reverse .text {
        grid-area: right;
    }

    .home-block.reverse .image {
        grid-area: left;
    }
}

/* Mobile vertical */
@media (max-width: 600px) {
    .home-slogan {
        font-size: 300%;
    }

    .home-block {
        grid-gap: var(--size-md);
        grid-template-columns: 1fr;
    }

    .home-block .image {
        height: 20vh;
    }
}

/* Mobile horizontal */
@media (max-height: 400px) {
    .home-slogan {
        font-size: 300%;
    }
}

</style>