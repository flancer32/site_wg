export default function ({} = {}) {
    class AppMenu extends HTMLElement {
        constructor() {
            super();
            const shadow = this.attachShadow({mode: 'open'});
            shadow.innerHTML = `
<style>
    div {
        position: fixed;
        top: 20px; /* Position from the top of the viewport */
        right: 20px; /* Position from the right of the viewport */
        cursor: pointer;
        z-index: 1000; /* Ensure it stays on top */
        padding:10px;
        border: 2px solid white; /* Black border */
        border-radius: 10px; /* Rounded corners */
        background-color: rgba(255, 255, 255, 0.1); /* Semi-transparent background */
        transition: background-color 0.3s ease; /* Transition effect for hover */
    }

    div svg {
        width: 40px; /* Width of the SVG icon */
        height: 40px; /* Height of the SVG icon */
        fill: #FFF; /* Color of the icon */
        transition: fill 0.3s ease; /* Transition effect for hover */
    }

    div:hover {
        background-color: rgba(255, 255, 255, 0.4); /* Semi-transparent background */
    }
    div:hover svg {
        fill: #BBB; /* Change color on hover */
    }
</style>
<div>
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect y="4" width="24" height="2" />
        <rect y="11" width="24" height="2" />
        <rect y="18" width="24" height="2" />
    </svg>
</div>
    `;
        }
    }

    customElements.define('app-menu', AppMenu);
    return AppMenu;
}