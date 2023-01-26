import DEF from '../def.mjs';
import menuRight from './layout/menu/right.mjs';
import menuTop from './layout/menu/top.mjs';

const template = `
<q-layout view="hhh lpR fff"  class="shadow-2">
    <q-header reveal id="layout-header">
        <q-toolbar>
            <q-toolbar-title>
                <span class="app-pointer" v-on:click="$router.push('${DEF.ROUTE_HOME}')">Wiredgeese Devs</span>
            </q-toolbar-title>
            <menu-top />
            <q-btn id="btn-menu" flat @click="drawerRight = !drawerRight" icon="menu" />
        </q-toolbar>
    </q-header>

    <q-drawer v-model="drawerRight" id="layout-right"
            behavior="desktop"
            overlay
            side="right"
            width="200"
    >
        <menu-right />
    </q-drawer>

    <q-page-container>
        <q-page id="layout-main" class="q-pa-md">
            <div>
                <router-view/>
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
    components: {menuRight, menuTop},
    data() {
        return {
            drawerRight: false,
        }
    },
};
