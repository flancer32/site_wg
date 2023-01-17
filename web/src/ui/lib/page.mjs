const template = `
    <div style="text-align: center; margin-bottom: 10px; font-size: x-large;"><slot name="header"/></div>
    
    <div style="margin-bottom: 20px;"><slot name="resume" /></div>
    
    <div><slot name="content"/></div>
`;

export default {
    template,
}