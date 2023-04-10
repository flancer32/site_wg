<script setup>
</script>
<template>
    <h1>DUPLO Chat</h1>
    <h2>Description</h2>
    <p>DupChat is a secure messenger prototype created as a Progressive Web Application to test database connectivity,
        encryption, UI composition, and event-driven architecture. The chat engine uses asymmetric encryption, allowing
        users to communicate through text messages without the need for personal identification information. While still
        a PWA test, the app features one programming language, vanilla JavaScript (ES6+), and is limited to text
        messaging only.</p>
    <h2>Links</h2>
    <ul>
        <li><a href="https://github.com/flancer32/dup-proto">GitHub Sources</a></li>
        <li><a href="https://dup.flancer64.com/#/invite/validate/ed2cd297c33139872efd8d3373d5491b">Demo Invite</a></li>
    </ul>
    <h2>Tech Stack</h2>
    <ul>
        <li>PWA (HTML5, CSS3, ES6+, Service Worker, Web Push)</li>
        <li>Vue 3, Quasar UI, i18next</li>
        <li>knex.js (PostgreSQL/MariaDB), TeqFW (SSE, DI)</li>
    </ul>
    <h2>Development Features</h2>
    <ul>
        <li><b>Multiple Database Connections</b>: The app connects to multiple databases (PostgreSQL, MySQL, and
            MariaDB) using Knex.js. This feature provides flexibility and scalability in terms of data storage and
            retrieval.
        </li>
        <li><b>Web Push API Integration</b>: The app uses the Web Push API, which enables real-time push notifications
            to be sent to users even when they are not actively using the app. This feature helps to keep users engaged
            and informed, leading to a better overall user experience.
        </li>
        <li><b>Anonymity and Encryption</b>: The app ensures complete anonymity and uses asynchronous encryption with a
            public key, which provides secure data transmission and storage. This feature helps to protect user data
            from unauthorized access or tampering, ensuring a high level of privacy and security.
        </li>
        <li><b>SSE for Asynchronous Communication</b>: The app uses Server-Sent Events (SSE) for asynchronous
            communication between the server and the client. This feature allows for real-time updates and notifications
            to be sent to the client without requiring continuous polling, leading to improved performance and reduced
            server load.
        </li>
    </ul>
</template>
