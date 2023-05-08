<script setup>

</script>

<template>

    <section class="clickable">
        <a href="/portfolio/">
            <section class="text">
                <h1>Portfolio</h1>
                <ul>
                    <li>Classical desktop web applications.</li>
                    <li>PWA, which offer native app-like experience and functionality on mobile and desktop devices.
                    </li>
                    <li>SPA with interactive user interfaces and smooth navigation.</li>
                </ul>
            </section>
        </a>
        <section class="image portfolio"><a href="/portfolio/">
            <div></div>
        </a></section>
    </section>
</template>

<style>
.image.portfolio {
    background-image: url("../../../public/img/home/portfolio.jpg");
}

.image.portfolio > A > DIV {
    height: 100%;
    width: 100%;
}

.clickable:hover {
    background-color: var(--color-bg);
    color: var(--color-bg-dark);
}
</style>