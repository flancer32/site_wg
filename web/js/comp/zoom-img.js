class ZoomImage extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({mode: 'open'});
        const src = this.getAttribute('src') || '';
        const alt = this.getAttribute('alt') || '';
        const width = this.getAttribute('width') || '200px';
        const language = document.documentElement.lang.split('-')[0];
        const translations = {
            en: {open: 'Open image', expanded: 'Expanded image', close: 'Close image'},
            ru: {open: 'Открыть изображение', expanded: 'Увеличенное изображение', close: 'Закрыть изображение'},
            es: {open: 'Abrir imagen', expanded: 'Imagen ampliada', close: 'Cerrar imagen'},
        };
        const strings = translations[language] || translations.en;

        shadow.innerHTML = `
            <style>
                :host { display: inline-block; max-width: 100%; }
                button { font: inherit; }
                .trigger {
                    max-width: 100%; padding: 0; display: block; overflow: hidden;
                    border: 0; border-radius: .8rem; background: transparent; cursor: zoom-in;
                }
                .trigger:focus-visible { outline: 3px solid #8c4f0b; outline-offset: 3px; }
                .close:focus-visible { outline: 3px solid #ffb65e; outline-offset: 3px; }
                .thumbnail {
                    max-width: 100%; height: auto; display: block; border-radius: .8rem;
                    transition: transform 180ms ease, filter 180ms ease;
                }
                .trigger:hover .thumbnail { transform: scale(1.02); filter: brightness(.96); }
                .overlay {
                    position: fixed; inset: 0; z-index: 1000; padding: clamp(1rem, 4vw, 3rem);
                    display: grid; place-items: center; background: rgba(6, 20, 23, .92);
                    backdrop-filter: blur(10px); cursor: zoom-out;
                }
                .overlay[hidden] { display: none; }
                .full { max-width: 100%; max-height: calc(100vh - 2rem); border-radius: .8rem; box-shadow: 0 24px 80px #0008; }
                .close {
                    position: fixed; top: 1rem; right: 1rem; width: 3rem; height: 3rem;
                    border: 1px solid #ffffff40; border-radius: 50%; background: #132a2dee;
                    color: #fff; font-size: 1.65rem; line-height: 1; cursor: pointer;
                }
                @media (prefers-reduced-motion: reduce) { .thumbnail { transition: none; } }
            </style>
            <button class="trigger" type="button">
                <img class="thumbnail">
            </button>
            <div class="overlay" role="dialog" aria-modal="true" hidden tabindex="-1">
                <button class="close" type="button">×</button>
                <img class="full">
            </div>
        `;

        const trigger = shadow.querySelector('.trigger');
        const thumbnail = shadow.querySelector('.thumbnail');
        const overlay = shadow.querySelector('.overlay');
        const close = shadow.querySelector('.close');
        const full = shadow.querySelector('.full');
        const label = alt ? `${strings.open}: ${alt}` : strings.open;

        trigger.setAttribute('aria-label', label);
        thumbnail.src = src;
        thumbnail.alt = alt;
        thumbnail.loading = 'lazy';
        thumbnail.decoding = 'async';
        thumbnail.style.width = width;
        full.src = src;
        full.alt = alt;
        full.loading = 'lazy';
        full.decoding = 'async';
        overlay.setAttribute('aria-label', alt || strings.expanded);
        close.setAttribute('aria-label', strings.close);

        const open = () => {
            overlay.hidden = false;
            document.documentElement.classList.add('zoom-open');
            close.focus();
        };
        const dismiss = () => {
            overlay.hidden = true;
            document.documentElement.classList.remove('zoom-open');
            trigger.focus();
        };

        trigger.addEventListener('click', open);
        close.addEventListener('click', dismiss);
        overlay.addEventListener('click', (event) => {
            if (event.target === overlay) dismiss();
        });
        this.handleDocumentKeydown = (event) => {
            if (overlay.hidden) return;
            if (event.key === 'Escape') {
                event.preventDefault();
                dismiss();
            } else if (event.key === 'Tab') {
                event.preventDefault();
                close.focus();
            }
        };
        document.addEventListener('keydown', this.handleDocumentKeydown);
    }

    disconnectedCallback() {
        document.removeEventListener('keydown', this.handleDocumentKeydown);
    }
}

customElements.define('zoom-img', ZoomImage);
