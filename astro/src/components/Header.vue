<script setup>

</script>

<template>
    <header>
        <div class="logo"><a href="/">Wiredgeese Devs</a></div>
        <!--    <nav class="menu">Menu</nav>-->
    </header>
</template>

<style>
HEADER {
    font-size: 150%;
    font-weight: bold;
    height: var(--size-header-height);
    left: 0;
    padding-bottom: var(--size-sm);
    padding-top: var(--size-sm);
    position: fixed;
    top: 0;
    width: calc(100vw - (100vw - 100%));
    z-index: 10;
}

HEADER .logo {
    cursor: pointer;
    float: left;
    padding-left: var(--size-md);
    text-shadow: 1px 1px 2px var(--color-bg-dark);
}

/* TODO: use it or remove it */
HEADER .menu {
    cursor: pointer;
    float: right;
    padding-right: 5%;
    text-shadow: 1px 1px 2px var(--color-bg-dark);
}

/* Dark background for top bar when scrolling is in action */
HEADER.hasBg {
    background-color: var(--color-bg-dark);
}

HEADER A {
    color: var(--color-set-lightest);
    text-decoration: none;
}
</style>