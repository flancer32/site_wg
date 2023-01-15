import DEF from '../def.mjs';

const template = `
<q-layout view="hhh lpR fff"  class="shadow-2 rounded-borders">
    <q-header reveal class="app-colors">
        <q-toolbar>
            <q-toolbar-title>
                <span class="app-pointer" v-on:click="$router.push('${DEF.ROUTE_HOME}')">Wiredgeese Devs</span>
            </q-toolbar-title>
            <q-btn flat @click="drawerRight = !drawerRight" round dense icon="menu" />
        </q-toolbar>
    </q-header>

    <q-drawer v-model="drawerRight"
            behavior="desktop"
            class="app-colors"
            overlay
            side="right"
            width="200"
    >
        <q-scroll-area class="fit">
            <div class="q-pa-sm">
                <q-list bordered separator>
                    <q-item clickable v-ripple>
                        <q-item-section>
                            <router-link to="${DEF.ROUTE_ABOUT}">About</router-link>        
                        </q-item-section>
                    </q-item>
                    <q-item clickable v-ripple>
                        <q-item-section>
                            <router-link to="${DEF.ROUTE_STACK}">Stack</router-link>        
                        </q-item-section>
                    </q-item>
                    <q-item clickable v-ripple>
                        <q-item-section>
                            <router-link to="${DEF.ROUTE_SERVICE}">Service</router-link>        
                        </q-item-section>
                    </q-item>
                    <q-item clickable v-ripple>
                        <q-item-section>
                            <router-link to="${DEF.ROUTE_CONTACTS}">Contacts</router-link>        
                        </q-item-section>
                    </q-item>
                </q-list>
            </div>
        </q-scroll-area>
    </q-drawer>

    <q-page-container>
        <q-page class="app-main q-pa-md">
            <div>
                <router-view v-slot="{ Component }">
                    <transition name="fade" mode="out-in">
                        <component :is="Component" :key="$route.path"/>
                    </transition>
                </router-view>
            </div>
        </q-page>

        <q-page-scroller position="bottom">
            <q-btn fab icon="keyboard_arrow_up" color="red" />
        </q-page-scroller>
    </q-page-container>
</q-layout>
`;

export default {
    template,
    data() {
        return {
            drawerRight: false,
        }
    },
};
