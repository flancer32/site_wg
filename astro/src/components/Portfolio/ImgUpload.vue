<script setup>
</script>
<template>
    <h1>Images Upload</h1>
    <h2>Description</h2>
    <p>The Image Upload PWA is a simple web application that allows users to upload images to a server. Uploaded
        images are automatically scaled to take up less space, and can be searched by title. When a user searches for an
        image, they can easily navigate to a Google search for related images.</p>
    <h2>Links</h2>
    <ul>
        <li><a href="https://github.com/flancer32/pwa-up01-img-search">GitHub Sources</a></li>
    </ul>
    <h2>Tech Stack</h2>
    <ul>
        <li>PWA (HTML5, CSS3, ES6+, Service Worker)</li>
        <li>Vue 3, Quasar UI</li>
        <li>PostgreSQL, TeqFW (SSE, DI)</li>
    </ul>
    <h2>Development Features</h2>
    <ul>
        <li><b>Geolocation</b>: Utilized geolocation to determine the user's current location, which allowed for a more
            personalized user experience.
        </li>
        <li><b>Image Optimization</b>: Optimized image file sizes by dynamically changing the resolution based on device
            and connection speed. This feature ensured fast load times and a smooth browsing experience for all users.
        </li>
    </ul>
</template>
