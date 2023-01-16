import DEF from '../../def.mjs';

const template = `
<div class="app-card-home">

    <q-card class="app-colors app-pointer" v-on:click="$router.push('${DEF.ROUTE_ABOUT}')">
        <q-card-section>
            <div>MISSION</div>
        </q-card-section>
    </q-card>
    
    <q-card class="app-colors app-pointer" v-on:click="$router.push('${DEF.ROUTE_STACK}')">
        <q-card-section>
            <div>STACK</div>
        </q-card-section>
    </q-card>

    <q-card class="app-colors app-pointer" v-on:click="$router.push('${DEF.ROUTE_SERVICE}')">
        <q-card-section>
            <div>SERVICE</div>
        </q-card-section>
    </q-card>
    
    <q-card class="app-colors app-pointer" v-on:click="$router.push('${DEF.ROUTE_CONTACTS}')">
        <q-card-section>
            <div>CONTACTS</div>
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
