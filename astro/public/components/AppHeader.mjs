export default function Factory({} = {}) {
    class AppHeader extends HTMLElement {
        constructor() {
            super();
            const shadow = this.attachShadow({mode: 'open'});
            shadow.innerHTML = `
<style>
    /* Styles for the component */
    h1 {
        color: blue;
    }
</style>
<h1>Welcome to My App</h1>
    `;
        }
    }

    customElements.define('app-header', AppHeader);
    return AppHeader;
}