const template = `
    <div style="text-align: center; margin-bottom: 10px; font-size: x-large;"><slot name="header"/></div>
    
    <div style="margin-bottom: 20px;"><slot name="resume" /></div>
    
    <div><slot name="content"/></div>
    
    <q-card style="display: grid; grid-template-columns: 1fr 1fr; padding-left: 10px; padding-right: 10px;">
        <div>© SIA "F. Lancer", 2023</div>
        <div style="text-align: right;"><a href="mailto:info@wiredgeese.com">info@wiredgeese.com</a></div>
    </q-card>
`;

export default {
    template,
}