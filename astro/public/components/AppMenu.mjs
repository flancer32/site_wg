export default function ({} = {}) {
    class AppMenu extends HTMLElement {
        constructor() {
            super();
            const shadow = this.attachShadow({mode: 'open'});
            shadow.innerHTML = `
<style>
    div {
        position: fixed;
        top: 20px;  
        right: 20px; 
        cursor: pointer;
        z-index: 1000;  
        padding: 10px;
        border: 2px solid white;  
        border-radius: 10px;  
        background-color: rgba(0, 0, 0, 0.6);  
        transition: background-color 0.3s ease; 
    }

    div svg {
        width: 20px;  
        height: 20px;  
        fill: #fff;  
        transition: fill 0.3s ease; 
    }

    div:hover {
        background-color: rgba(0, 0, 0, 0.8); /* Semi-transparent background */
    }

    div:hover svg {
        fill: #bbb;  
    }

    ::slotted(nav) {
        display: none; 
    } 
    
    ::slotted(nav.active) {
        display: block; /* Show the menu when active */
    }

</style>
<div>
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect y="4" width="24" height="2"/>
        <rect y="11" width="24" height="2"/>
        <rect y="18" width="24" height="2"/>
    </svg>
</div>
<slot></slot>
    `;

            // Add event listener for toggling the menu
            this.addEventListener('click', () => {
                const nav = this.querySelector('nav');
                if (nav) {
                    nav.classList.toggle('active');
                }
            });
        }
    }

    customElements.define('app-menu', AppMenu);
    return AppMenu;
}