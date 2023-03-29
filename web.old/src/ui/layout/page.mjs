const template = `
<H1>
    <slot name="header"/>
</H1>

<div style="margin-bottom: 20px;">
    <slot name="resume"/>
</div>

<div>
    <slot name="content"/>
</div>

<ui-footer/>
`;

export default {
    template,
}