/**
 * Page footer with additional info (copyright, policy, etc.).
 */
import DEF from '../../def.mjs';

const template = `
<q-card class="t-footer">
    <div>© SIA "F. Lancer", 2023</div>
    <div class="t-mob-hide"><a href="mailto:info@wiredgeese.com">info@wiredgeese.com</a></div>
    <div><a href="#${DEF.ROUTE_PRIVACY}">Privacy Policy</a></div>
</q-card>
`;

export default {
    template,
    data() {
        return {}
    }
}