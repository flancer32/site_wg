/**
 * Right menu for mobile devices.
 */
import DEF from '../../../def.mjs';

const template = `
<q-scroll-area class="fit">
    <div class="q-pa-sm">
        <q-list bordered separator>
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
        </q-list>
    </div>
</q-scroll-area>
`;

export default {
    template,
    data() {
        return {}
    }
}