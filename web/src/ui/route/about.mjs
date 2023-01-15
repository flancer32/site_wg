const template = `
    <q-card class="app-colors" style="max-width: 800px;">
        <q-card-section>
            <div v-for="n in 5" :key="n">ABOUT {{ n }} / 5</div>
        </q-card-section>
    </q-card>
`;

export default {
    template,
    data() {
        return {}
    }
}