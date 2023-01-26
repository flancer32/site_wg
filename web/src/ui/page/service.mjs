import DEF from '../../def.mjs';

const template = `
<ui-page>
    <template #header>Service</template>

    <template #resume>
        <div class="anno-wrap">
            <img class="anno-bg" src="img/page/service.webp" alt="">
            <div class="anno-content">
                <q-card square class="app-bg  app-centered">
                    <q-card-section>
                        <ul>
                            <li>PWA for mobiles</li>
                            <li>Set of tools: Vue3, Quasar, Knex</li>
                            <li>Flexible approach to development</li>
                            <li>Spiral software development model with short iterations</li>
                            <li>Competitive rates and staged payment options</li>
                        </ul>
                    </q-card-section>
                </q-card>
            </div>
        </div>

    </template>

    <template #content>
        <q-card class="app-bg" style="margin-bottom: 20px;">
            <q-card-section class="app-content">
                <div>We specialize in developing Progressive Web Applications (PWAs) for small businesses. Our PWAs are optimized for mobile devices, providing a user-friendly experience for your customers while they are on the move.</div>
                <div>Our team of experienced developers use a selected <a href="#${DEF.ROUTE_STACK}">set of tools</a> to ensure that your PWA is built to the highest standards. Despite our limited toolset, we are not limited in terms of development topics and can work on a wide range of projects.</div>
                <div>We understand that every business is unique, which is why we offer a flexible approach to development. We can work without exact terms of reference, and our spiral software development model with short iterations (no more than one week at the start of the project) allows us to adapt and evolve your PWA as it grows.</div>
                <div>We offer competitive rates, with development costs of 30 EUR/hour including taxes. We also offer staged payment for work performed, so you only pay for the work that satisfies you.</div>
                <div>If you're looking for a reliable and experienced team to develop your PWA, look no further. <a href="#${DEF.ROUTE_CONTACTS}">Contact us</a> today to discuss your project and see how we can help your business succeed.</div>
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