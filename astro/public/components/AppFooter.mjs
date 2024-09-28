/**
 * This web-component does not use shadow DOM.
 * @return {AppFooter}
 * @constructor
 */
export default function Factory({} = {}) {
    class AppFooter extends HTMLElement {
        constructor() {
            super();
            this.innerHTML = `
<div class="footer-content">
    <p>© 2024 F. Lancer. All rights reserved.</p>
</div>
    `;
        }
    }

    customElements.define('app-footer', AppFooter);
    return AppFooter;
}