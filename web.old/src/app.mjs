export default {
    template: `
<layout id="app-layout" v-if="!canDisplay">
    <router-view/>
</layout>
`,
    setup() {
        return {
            canDisplay: false
        }
    }
    ,
    async mounted() {
        this.canDisplay = true;
    }
}