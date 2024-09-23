export default function ({} = {}) {
    class AppBigImage extends HTMLElement {
        constructor() {
            super();
            const shadow = this.attachShadow({mode: 'open'});
            shadow.innerHTML = `
<style>
    div {
        height: 100vh; /* Full viewport height */
        background-image: url('/img/bg1.jpg'); /* Replace with your image */
        background-size: cover; /* Cover the entire section */
        background-repeat: no-repeat; /* Prevent tiling */
        background-attachment: scroll; /* Make it scrollable */
        background-position: center; /* Center the background image */
    }
</style>
<div></div>
    `;
        }
    }

    customElements.define('app-big-image', AppBigImage);
    return AppBigImage;
}