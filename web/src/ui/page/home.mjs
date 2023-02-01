import DEF from '../../def.mjs';

const template = `
<div class="t-card-home">

    <q-card class="app-bg app-pointer" v-on:click="$router.push('${DEF.ROUTE_MISSION}')">
        <q-card-section>
            <div>MISSION</div>
            <div>
                <ul>
                    <li>Mobile PWA for small businesses</li>
                    <li>Web 3.0 is our goal</li>
                    <li>AI, encryption, decentralization</li>
                    <li>Cutting-edge technologies</li>
                </ul>
            </div>
        </q-card-section>
    </q-card>

    <q-card class="app-bg app-pointer" v-on:click="$router.push('${DEF.ROUTE_STACK}')">
        <q-card-section>
            <div>STACK</div>
            <div>
                <ul>
                    <li>HTML5, CSS3, "vanilla" JS (ES2015+)</li>
                    <li>i18next</li>
                    <li>Vue 3</li>
                    <li>Quasar UI</li>
                    <li>Knex.js</li>
                    <li>TeqFW (DI, EDA)</li>
                </ul>
            </div>
        </q-card-section>
    </q-card>

    <q-card class="app-bg app-pointer" v-on:click="$router.push('${DEF.ROUTE_SERVICE}')">
        <q-card-section>
            <div>SERVICE</div>
            <div>
                <ul>
                    <li>PWA for mobiles</li>
                    <li>Set of tools: Vue3, Quasar, Knex</li>
                    <li>Flexible approach to development</li>
                    <li>Spiral software development model with short iterations</li>
                    <li>Competitive rates and staged payment options</li>
                </ul>
            </div>            
        </q-card-section>
    </q-card>

    <q-card class="t-bg">
        <q-card-section>
            <div class="app-pointer" v-on:click="$router.push('${DEF.ROUTE_CONTACTS}')">CONTACTS</div>
            <div>
                <ul>
                    <li>email: <a href="mailto:info@wiredgeese.com">info@wiredgeese.com</a></li>
                    <li>legal person: <a href="https://company.lursoft.lv/en/f-lancer/40103303120">SIA "F. Lancer"</a>
                    </li>
                </ul>
            </div>            
        </q-card-section>
    </q-card>


</div>
`;

export default {
    template,
    data() {
        return {}
    },
    mounted() {
        document.title = 'Wiredgeese Devs';
    }
}
