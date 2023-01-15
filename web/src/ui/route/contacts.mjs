const template = `
    <q-card class="app-colors">
        <q-card-section>
            <div v-for="n in 5" :key="n">CONTACTS {{ n }} / 5</div>
        </q-card-section>
    </q-card>
`;

export default {
    template,
    data() {
        return {}
    }
}