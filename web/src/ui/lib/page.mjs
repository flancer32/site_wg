const template = `
    <div style="text-align: center; margin-bottom: 10px; font-size: x-large;"><slot name="header"/></div>
    
     <q-card class="app-colors" style="margin-bottom: 20px;">
            <q-card-section>
                <slot name="resume"/>
            </q-card-section>
    </q-card>
    
    <div><slot name="content"/></div>
`;

export default {
    template,
}