const template = `
<ui-page>
    <template #header>Tech Stack</template>

    <template #resume>
        <div class="anno-wrap">
            <img class="anno-bg" src="img/page/stack.webp" alt="">
            <div class="anno-content">
                <q-card square class="app-bg  app-centered">
                    <q-card-section>
                        <ul>
                            <li>HTML5, CSS3, "vanilla" JS (ES2015+)</li>
                            <li>i18next</li>
                            <li>Vue 3</li>
                            <li>Quasar UI</li>
                            <li>Knex.js</li>
                            <li>TeqFW (DI, EDA)</li>
                        </ul>
                    </q-card-section>
                </q-card>
            </div>
        </div>

    </template>

    <template #content>
        <q-card class="app-bg" style="margin-bottom: 20px;">
            <q-card-section class="app-content">
                <div>We use the latest and most advanced technologies in web development to create cutting-edge
                    products. Our tech stack includes HTML5, CSS3, and ES2015+, which enables us to take advantage of
                    the latest features and capabilities of modern browsers without worrying about backwards
                    compatibility with older ones. We don't use preprocessors (such as Sass, Less, TypeScript, and
                    Babel) in our development, as we believe that sticking to the standard languages, HTML5, CSS3, and
                    ES2015+, allows us to write efficient and performant code without the added complexity of an extra
                    step and dependency. We use JSDoc in combination with JavaScript instead of TypeScript, as we
                    believe that JSDoc provides sufficient documentation and type hinting while keeping our development
                    process simple and sticking to "vanilla" JavaScript.
                </div>
                <div>We utilize <a href="https://www.i18next.com/">i18next</a> for internationalization and 
                    localization, making our apps accessible to a
                    global audience. We use <a href="https://vuejs.org/">Vue.js</a> 3 as our JavaScript framework for building user interfaces, providing
                    a smooth and intuitive user experience. <a href="https://quasar.dev/">Quasar</a> framework is used to create responsive and
                    cross-platform apps, ensuring that our products look and perform great on any device. Together,
                    these tools allow us to deliver high-quality and performant web applications that meet the unique
                    needs of our clients.
                </div>
                <div>We use the <a href="https://knexjs.org/">Knex.js</a> library to handle all of our database interactions on the backend. Knex.js is a
                    SQL query builder that allows us to write JavaScript code to interact with our databases, rather
                    than writing raw SQL queries. It supports a wide variety of database management systems, including
                    PostgreSQL, MySQL, SQLite3, and Oracle. With its simple and consistent API, Knex.js makes it easy
                    for us to perform a variety of database operations, such as creating tables, inserting data,
                    querying data, etc.
                </div> 
                <div>We use our own development of <a href="https://github.com/teqfw?tab=repositories">TeqFW</a> (Tequila Framework) to build our web applications. Tequila
                    FW allows us to take advantage of several advanced software architectural patterns to create
                    efficient and scalable products. We use dependency injection to make our code more modular and
                    maintainable, monolithic-modular architecture to break down the complexity of our applications,
                    event-driven architecture to handle the flow of our application, and the ability to use common code
                    for both frontend and backend. This allows us to create highly performant and flexible products that
                    meet the unique needs of our clients.
                </div>
                <div>At Wiredgeese Devs, we use a combination of advanced technologies and tools to create highly
                    performant, flexible, and scalable web applications that meet the unique needs of our clients. Our
                    development process allows us to create efficient and maintainable code, handle complex database
                    interactions, and deliver high-quality user interfaces that are accessible to a global audience.
                    Together, these tools and technologies enable us to provide the best possible solutions for our
                    clients.
                </div>                                               

            </q-card-section>
        </q-card>
    </template>

</ui-page>
`;

export default {
    template,
    data() {
        return {}
    }
}
