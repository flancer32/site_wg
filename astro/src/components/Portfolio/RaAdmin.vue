<script setup>
</script>
<template>
    <h1>Rehapp Desk</h1>
    <h2>Description</h2>
    <p>The Admin SPA is a desktop application designed to provide owners with an intuitive
        and efficient way to manage data related to the Rehapp Mobile PWA. The app is a single-page
        application (SPA) that features a user-friendly interface and provides access to key data management
        functionalities such as user management, program creation and management, exercise management, invoice creation
        and management, and report generation.</p>
    <h2>Links</h2>
    <ul>
        <li><a href="https://github.com/flancer32/pwa-ra-desk">GitHub Sources</a></li>
    </ul>
    <h2>Tech Stack</h2>
    <ul>
        <li>SPA (HTML5, CSS3, ES6+)</li>
        <li>Vue 3, Quasar UI, i18next</li>
        <li>PostgreSQL, TeqFW (SSE, DI)</li>
    </ul>
    <h2>Development Features</h2>
    <ul>
        <li><b>Modular Monolith Architecture</b>: The app uses the modular monolith architecture, which allows for the
            removal of common code between the admin SPA and mobile PWA. The code common with the mobile version has
            been extracted into the base module, simplifying maintenance and enabling easier upgrades.
        </li>
        <li><b>Command Line Utility</b>: The app includes a command line utility for optimizing animation frames for
            size. This utility helps to ensure that the animations within the app are optimized for performance,
            resulting in a smoother user experience.
        </li>
    </ul>
</template>
