/**
 * Card for a team member info on 'Contacts' page.
 * Slots: image, title, details.
 */

const template = `
<q-card class="app-bg" style="margin-bottom: 10px;">
    <q-item>
        <q-item-section avatar>
            <q-avatar size="100px" class="overlapping">
                <slot name="image"/>
            </q-avatar>
        </q-item-section>

        <q-item-section>
            <q-item-label>
                <slot name="title"/>
            </q-item-label>
<!--            <q-item-label caption>-->
<!--                <slot name="details"/>-->
<!--            </q-item-label>-->
        </q-item-section>
    </q-item>
</q-card>
`;

export default {
    template,
}