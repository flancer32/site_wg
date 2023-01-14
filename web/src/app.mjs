const vueComp = {
    template: `
<layout id="app-layout" v-if="!canDisplay">
    <q-card>
        <q-card-section>
            <div v-for="n in 50" :key="n">Body {{ n }} / 50</div>
        </q-card-section>
    </q-card>
</layout>
`,
    setup() {
        return {
            canDisplay: false
        }
    },
    async mounted() {
        this.canDisplay = true;
    }
};

export {
    vueComp as default
}