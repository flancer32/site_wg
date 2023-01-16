import uiContact from '../lib/contact/card.mjs';

const template = `
<ui-page>
    <template #header>Contacts</template>

    <template #resume>
        <div style="padding-bottom: 5px;">We are a small company based in Riga, Latvia.</div>
        <div>email: info@wiredgeese.com</div>
        <div>legal person: <a href="https://company.lursoft.lv/en/f-lancer/40103303120">SIA "F. Lancer"</a></div>
        <div>bank acc.: <a href="https://www.swedbank.lv/about/start">LV83HABA0551028650868</a></div>
    </template>

    <template #content>
    
        <div style="text-align: center; font-size: larger;">Our Team</div>

        <ui-contact>
            <template #image>
                <img src="./img/avatar/tanya.png">
            </template>
            <template #title>Tanya, CEO</template>
            <template #details>ceo@wiredgeese.com</template>
        </ui-contact>
        
        <ui-contact>
            <template #image>
                <img src="./img/avatar/alex.png">
            </template>
            <template #title>Alex, developer</template>
            <template #details>ag@wiredgeese.com</template>
        </ui-contact>

    </template>
</ui-page>
`;

export default {
    template,
    components: {uiContact},
}