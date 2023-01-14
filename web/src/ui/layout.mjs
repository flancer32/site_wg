const vueComp = {
    template: `
<q-layout view="hhh lpR fff"  class="shadow-2 rounded-borders">
    <q-header reveal class="bg-black">
        <q-toolbar>
            <q-toolbar-title>Wiredgeese Devs</q-toolbar-title>
            <q-btn flat @click="drawerRight = !drawerRight" round dense icon="menu" />
        </q-toolbar>
    </q-header>

    <q-drawer v-model="drawerRight"
            behavior="desktop"
            class="bg-black text-white"
            overlay
            side="right"
            width="200"
    >
        <q-scroll-area class="fit">
            <div class="q-pa-sm">
                <div>Home</div>
                <div>About</div>
                <div>Pricing</div>
                <div>Contacts</div>
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