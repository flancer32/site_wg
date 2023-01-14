const template = `
<div class="app-card-home">

    <q-card class="bg-black text-white">
        <q-card-section>
            <div v-for="n in 5" :key="n">ABOUT {{ n }} / 5</div>
        </q-card-section>
    </q-card>
    
    <q-card class="bg-black text-white">
        <q-card-section>
            <div v-for="n in 5" :key="n">PRICING {{ n }} / 5</div>
        </q-card-section>
    </q-card>
    
    <q-card class="bg-black text-white cell-bottom">
        <q-card-section>
            <div v-for="n in 5" :key="n">CONTACTS {{ n }} / 5</div>
        </q-card-section>
    </q-card>

</div>
`;

export default {
    template,
    data() {
        return {}
    }
}