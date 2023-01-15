import DEF from '../../def.mjs';

const template = `
<div class="app-card-home">

    <q-card class="app-colors app-pointer" v-on:click="$router.push('${DEF.ROUTE_ABOUT}')">
        <q-card-section>
            <div v-for="n in 5" :key="n">ABOUT {{ n }} / 5</div>
        </q-card-section>
    </q-card>
    
    <q-card class="app-colors app-pointer" v-on:click="$router.push('${DEF.ROUTE_STACK}')">
        <q-card-section>
            <div v-for="n in 5" :key="n">STACK {{ n }} / 5</div>
        </q-card-section>
    </q-card>
    
    <q-card class="app-colors app-pointer" v-on:click="$router.push('${DEF.ROUTE_CONTACTS}')">
        <q-card-section>
            <div v-for="n in 5" :key="n">CONTACTS {{ n }} / 5</div>
        </q-card-section>
    </q-card>
    
    <q-card class="app-colors app-pointer" v-on:click="$router.push('${DEF.ROUTE_SERVICE}')">
        <q-card-section>
            <div v-for="n in 5" :key="n">SERVICE {{ n }} / 5</div>
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