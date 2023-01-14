const vueComp = {
    template: `
<q-layout view="hhh lpR fff"  class="shadow-2 rounded-borders">
    <q-header reveal class="bg-black">
        <q-toolbar>
            <q-toolbar-title>Wiredgeese Company</q-toolbar-title>
            <q-btn flat @click="drawerRight = !drawerRight" round dense icon="menu" />
        </q-toolbar>
    </q-header>

<!--    <q-footer>-->
<!--        <q-toolbar>-->
<!--            <q-toolbar-title>Footer</q-toolbar-title>-->
<!--        </q-toolbar>-->
<!--    </q-footer>-->

    <q-drawer v-model="drawerRight"
            behavior="desktop"
            bordered
            class=""
            overlay
            side="right"
            width="200"
    >
        <q-scroll-area class="fit">
            <div class="q-pa-sm">
                <div v-for="n in 50" :key="n">Drawer {{ n }} / 50</div>
            </div>
        </q-scroll-area>
    </q-drawer>

    <q-page-container>
        <q-page style="padding-top: 60px" class="q-pa-md">
            <slot/>
        </q-page>

        <q-page-scroller position="bottom">
            <q-btn fab icon="keyboard_arrow_up" color="red" />
        </q-page-scroller>
    </q-page-container>
</q-layout>
`,
    data() {
        return {
            drawerRight: false,
        }
    },
};

export {
    vueComp as default
}