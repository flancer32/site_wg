/**
 * Top menu for desktop devices.
 */
import DEF from '../../../def.mjs';

const template = `
<menu id="menu-top" class="row">
    <q-item active-class="active" to="${DEF.ROUTE_MISSION}">
        <q-item-section>Mission</q-item-section>
    </q-item>
    <q-item active-class="active" to="${DEF.ROUTE_STACK}">
        <q-item-section>Stack</q-item-section>
    </q-item>
    <q-item active-class="active" to="${DEF.ROUTE_SERVICE}">
        <q-item-section>Service</q-item-section>
    </q-item>
    <q-item active-class="active" to="${DEF.ROUTE_CONTACTS}">
        <q-item-section>Contacts</q-item-section>
    </q-item>
</menu>
`;

export default {
    template,
    data() {
        return {}
    },
    methods: {}
}