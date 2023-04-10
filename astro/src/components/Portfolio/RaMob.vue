<script setup>
</script>
<template>
    <h1>Rehapp Mobile</h1>
    <h2>Description</h2>
    <p>This PWA is a minimum viable product (MVP) mobile application designed to assist doctors and patients with the
        rehabilitation process after sports-related injuries. The app allows doctors to
        create customized rehabilitation programs for their patients by selecting individual exercises from a library of
        options. These programs can then be assigned to patients for execution at home. Each exercise within the app is
        accompanied by a detailed description and animation to guide patients through the correct execution
        technique. </p>
    <h2>Links</h2>
    <ul>
        <li><a href="https://github.com/flancer32/pwa-ra-mob">GitHub Sources</a></li>
        <li><a href="https://rehapp.ru/">Project's site</a></li>
    </ul>
    <h2>Tech Stack</h2>
    <ul>
        <li>PWA (HTML5, CSS3, ES6+, Service Worker)</li>
        <li>Vue 3, Quasar UI, i18next, PDF generation, QR codes</li>
        <li>PostgreSQL, TeqFW (SSE, DI)</li>
    </ul>
    <h2>Development Features</h2>
    <ul>
        <li><b>Frame-Based Animation</b>: The app features frame-based animation to help control the speed of exercise
            execution for patients.
        </li>
        <li><b>Front-End Animation Caching</b>: The app also includes front-end animation caching to improve the overall
            performance of the application.
        </li>
        <li><b>Automatic Archive Creation</b>: The app automatically creates archives of exercise animations on the
            back-end, which can then be transferred to the front-end to further optimize performance.
        </li>
        <li><b>QR Code Link Exchange</b>: The app uses QR codes to allow for easy link exchange between doctors and
            patients, simplifying the process of program assignment and execution.
        </li>
        <li><b>PDF File Creation</b>: The app can also generate PDF files of exercise programs for patients to print out
            and reference during their rehabilitation process.
        </li>
    </ul>
</template>
