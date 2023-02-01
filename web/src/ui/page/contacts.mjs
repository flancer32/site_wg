import uiContact from '../lib/contact/card.mjs';

const template = `
<ui-page>
    <template #header>Contacts</template>

    <template #resume>

        <q-card square class="t-bg">
            <q-card-section>
                <div style="padding-bottom: 5px;">We are a small company based in Riga, Latvia.</div>
                <div>email: <a href="mailto:info@wiredgeese.com">info@wiredgeese.com</a></div>
                <div>legal person: <a href="https://company.lursoft.lv/en/f-lancer/40103303120">SIA "F. Lancer"</a>
                </div>
                <div>bank acc.: <a href="https://www.swedbank.lv/about/start">LV83HABA0551028650868</a></div>
            </q-card-section>
        </q-card>

    </template>

    <template #content>

        <div style="text-align: center; font-size: larger;">Our Team</div>
        <div style="text-align: center; font-size: smaller;">All avatars are made by AI from real photos.</div>

        <ui-contact>
            <template #image>
                <img src="./img/avatar/tanya.png" alt="">
            </template>
            <template #title>Tanya, CEO</template>
            <template #details>ceo@wiredgeese.com</template>
        </ui-contact>

        <ui-contact>
            <template #image>
                <img src="./img/avatar/alex.png" alt="">
            </template>
            <template #title>Alex, CTO</template>
            <template #details>ag@wiredgeese.com</template>
        </ui-contact>

        <ui-contact>
            <template #image>
                <img src="./img/avatar/harry.png" alt="">
            </template>
            <template #title>Harry, Project Manager</template>
            <template #details>ig@wiredgeese.com</template>
        </ui-contact>
        
        <ui-contact>
            <template #image>
                <img src="./img/avatar/victor.png" alt="">
            </template>
            <template #title>Victor, Full Stack Developer</template>
            <template #details>vg@wiredgeese.com</template>
        </ui-contact>

        <ui-contact>
            <template #image>
                <img src="./img/avatar/nataly.png" alt="">
            </template>
            <template #title>Nataly, Software Tester</template>
            <template #details>nata@wiredgeese.com</template>
        </ui-contact>

    </template>
</ui-page>
`;

export default {
    template,
    components: {uiContact},
    mounted() {
        document.title = 'WGD: Contacts';
    },
}