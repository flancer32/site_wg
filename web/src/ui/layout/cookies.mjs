/**
 * Banner to display cookies warning.
 */
import DEF from '../../def.mjs';

const KEY_DISMISS = 'wg-site-cookies-warn';

const template = `
<div class="t-cookies q-pa-md q-gutter-sm" v-if="ifAvailable">
    <q-banner inline-actions rounded class="t-bg-darker text-white">
       Our website uses cookies to improve your experience and track your activities on the site. By using our website, you consent to <a href="#${DEF.ROUTE_PRIVACY}">our use</a> of cookies.
        <template v-slot:action>
            <q-btn flat label="Dismiss" v-on:click="onDismiss"/>
        </template>
    </q-banner>
</div>
`;

export default {
    template,
    data() {
        return {
            ifAvailable: false,
        }
    },
    methods: {
        onDismiss() {
            this.ifAvailable = false;
            localStorage.setItem(KEY_DISMISS, JSON.stringify(false));
        },
    },
    created() {
        const str = localStorage.getItem(KEY_DISMISS);
        if (str === null) {
            this.ifAvailable = true;
            localStorage.setItem(KEY_DISMISS, JSON.stringify(true));
        } else {
            const val = JSON.parse(str);
            if (typeof val === 'boolean') this.ifAvailable = val;
            else {
                this.ifAvailable = true;
                localStorage.setItem(KEY_DISMISS, JSON.stringify(true));
            }
        }
    },
}