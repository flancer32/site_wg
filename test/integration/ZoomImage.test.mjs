import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import vm from 'node:vm';
import test from 'node:test';

const source = await fs.readFile(new URL('../../web/js/comp/zoom-img.js', import.meta.url), 'utf8');

// Model the custom-element lifecycle: construction precedes authored attributes
// for new elements, while upgrade supplies existing attributes before callbacks.
function fixture(locale, attributes = {}) {
    let Component;
    const listeners = new Set();
    class Element {
        attributes = {...attributes};
        style = {};
        hidden = true;
        getAttribute(name) { return this.attributes[name] ?? null; }
        setAttribute(name, value) {
            this.attributes[name] = String(value);
            if (this.constructor.observedAttributes?.includes(name)) this.attributeChangedCallback();
        }
        removeAttribute(name) {
            delete this.attributes[name];
            if (this.constructor.observedAttributes?.includes(name)) this.attributeChangedCallback();
        }
        addEventListener() {}
        focus() {}
        attachShadow() {
            const nodes = new Map(['.trigger', '.thumbnail', '.overlay', '.close', '.full'].map((name) => [name, new Element()]));
            for (const node of nodes.values()) node.attributes = {};
            this.shadowRoot = {innerHTML: '', querySelector: (selector) => nodes.get(selector)};
            return this.shadowRoot;
        }
    }
    vm.runInNewContext(source, {
        HTMLElement: Element,
        customElements: {define: (name, component) => { assert.equal(name, 'zoom-img'); Component = component; }},
        document: {
            documentElement: {lang: locale, classList: {add() {}, remove() {}}},
            addEventListener: (name, handler) => listeners.add(handler),
            removeEventListener: (name, handler) => listeners.delete(handler),
        },
    });
    return {element: new Component(), listeners};
}

for (const locale of ['en', 'ru', 'es']) {
    test(`zoom-img prevents historical null image URLs and tracks attributes (${locale})`, () => {
        const {element, listeners} = fixture(locale);
        const images = ['.thumbnail', '.full'].map((selector) => element.shadowRoot.querySelector(selector));
        assert.doesNotMatch(element.shadowRoot.innerHTML, /\bsrc\s*=/);
        element.connectedCallback();
        for (const value of [null, '', '  ', 'null', ' undefined ', 'NULL']) {
            if (value === null) element.removeAttribute('src');
            else element.setAttribute('src', value);
            for (const image of images) assert.equal(image.getAttribute('src'), null);
            assert.equal(element.shadowRoot.querySelector('.trigger').disabled, true);
        }
        element.setAttribute('src', '/img/avatar.jpg');
        element.setAttribute('alt', 'An image');
        element.setAttribute('width', '100px');
        for (const image of images) {
            assert.equal(image.getAttribute('src'), '/img/avatar.jpg');
            assert.equal(image.alt, 'An image');
        }
        assert.equal(images[0].style.width, '100px');
        assert.equal(element.shadowRoot.querySelector('.trigger').disabled, false);
        element.removeAttribute('src');
        for (const image of images) assert.equal(image.getAttribute('src'), null);
        element.disconnectedCallback();
        assert.equal(listeners.size, 0);
        element.connectedCallback();
        assert.equal(listeners.size, 1);
    });

    test(`zoom-img upgrades an authored image without changing its URL (${locale})`, () => {
        const {element} = fixture(locale, {src: '/img/avatar.jpg', alt: 'Article', width: '100px'});
        element.connectedCallback();
        for (const selector of ['.thumbnail', '.full']) {
            const image = element.shadowRoot.querySelector(selector);
            assert.equal(image.getAttribute('src'), '/img/avatar.jpg');
            assert.equal(image.alt, 'Article');
        }
    });
}
