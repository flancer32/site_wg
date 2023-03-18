const template = `
<ui-page>
    <template #header>Mission</template>

    <template #resume>
        <div class="anno-wrap">
            <img class="anno-bg" src="img/page/mission.webp" alt="">
            <div class="anno-content">
                <q-card square class="app-bg  app-centered">
                    <q-card-section>
                        <ul>
                            <li>Mobile PWA for small businesses</li>
                            <li>Web 3.0 is our goal</li>
                            <li>AI, encryption, decentralization</li>
                            <li>Cutting-edge technologies</li>
                        </ul>
                    </q-card-section>
                </q-card>
            </div>
        </div>

    </template>

    <template #content>
        <q-card class="t-bg" style="margin-bottom: 20px;">
            <q-card-section class="app-content">
                <div>At Wiredgeese Devs, our mission is to empower small businesses to succeed in the digital age by
                    providing them with high-quality, cutting-edge web applications for mobile phones.
                </div>
                <div>As a small company, we understand the challenges that small businesses face in today's
                    fast-paced, highly competitive digital landscape. That's why we're committed to leveraging the
                    latest technologies and innovations to help small businesses level the playing field.
                </div>
                <div>Our team of experienced developers is dedicated to creating innovative, user-friendly web
                    applications that take advantage of the latest Web 3.0 technologies, such as artificial
                    intelligence, encryption, and distributed data. We strive to build applications that are fast,
                    secure, and easy to use, and that help small businesses to increase their reach, boost
                    engagement, and ultimately drive more sales.
                </div>
                <div>We're not just developers, we're problem solvers. We love to understand the needs of our
                    clients and make sure they have the best solution to their needs. We use both our own tools and
                    third-party products, so that the final product is a perfect fit for our clients.
                </div>
                <div>Join us on this journey and see for yourself what a difference our cutting-edge web
                    applications can make for your small business.
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
    },
    mounted() {
        document.title = 'WGD: Mission';
    },
}