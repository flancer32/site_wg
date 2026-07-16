const header = document.querySelector('.site-header');
const menu = document.querySelector('#site-menu');
const toggle = document.querySelector('.nav-toggle');

const closeMenu = ({restoreFocus = false} = {}) => {
    if (!menu || !toggle) return;
    menu.dataset.open = 'false';
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', toggle.dataset.labelOpen || 'Open menu');
    if (restoreFocus) toggle.focus();
};

const openMenu = () => {
    if (!menu || !toggle) return;
    menu.dataset.open = 'true';
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', toggle.dataset.labelClose || 'Close menu');
    menu.querySelector('a')?.focus();
};

toggle?.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    if (isOpen) closeMenu();
    else openMenu();
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menu?.dataset.open === 'true') {
        closeMenu({restoreFocus: true});
    }
});

document.addEventListener('click', (event) => {
    if (menu?.dataset.open !== 'true') return;
    if (header?.contains(event.target)) return;
    closeMenu();
});

menu?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => closeMenu());
});

const currentPath = window.location.pathname.replace(/\/index\.html$/, '/');
document.querySelectorAll('.primary-nav a').forEach((link) => {
    const linkPath = new URL(link.href, window.location.origin).pathname.replace(/\/index\.html$/, '/');
    const isHome = /^\/(en|es|ru)\/$/.test(linkPath);
    const matches = isHome ? currentPath === linkPath : currentPath === linkPath || currentPath.startsWith(linkPath.replace(/\.html$/, '/'));
    if (matches) link.setAttribute('aria-current', 'page');
});

const localePattern = /^\/(en|es|ru)(?=\/|$)/;
document.querySelectorAll('[data-locale-target]').forEach((link) => {
    const targetLocale = link.dataset.localeTarget;
    if (!targetLocale) return;
    const localizedPath = currentPath.match(localePattern)
        ? currentPath.replace(localePattern, `/${targetLocale}`)
        : `/${targetLocale}/`;
    link.href = `${localizedPath}${window.location.search}${window.location.hash}`;
});

const routeWithoutLocale = currentPath.replace(localePattern, '') || '/';
let routeKind = 'page';
if (routeWithoutLocale === '/') routeKind = 'home';
else if (/^\/projects(?:\.html|\/)?$/.test(routeWithoutLocale)) routeKind = 'projects';
else if (/^\/blog(?:\.html|\/)?$/.test(routeWithoutLocale)) routeKind = 'blog-index';
else if (/^\/library(?:\/|\/index\.html)?$/.test(routeWithoutLocale)) routeKind = 'library-index';
else if (/^\/contact(?:\.html|\/)?$/.test(routeWithoutLocale)) routeKind = 'contact';
else if (routeWithoutLocale.startsWith('/blog/')) routeKind = 'publication';
else if (routeWithoutLocale.startsWith('/library/')) routeKind = 'publication';
document.body.dataset.route = routeKind;

document.querySelectorAll('.blog-item .card-link').forEach((link) => {
    if (link.getAttribute('aria-label')) return;
    const title = link.parentElement?.querySelector('h4')?.textContent?.trim();
    if (title) link.setAttribute('aria-label', title);
});

document.querySelectorAll('.blog-item h4').forEach((heading) => {
    heading.setAttribute('role', 'heading');
    heading.setAttribute('aria-level', '2');
});

document.querySelectorAll('a[target="_blank"]').forEach((link) => {
    const tokens = new Set((link.getAttribute('rel') || '').split(/\s+/).filter(Boolean));
    tokens.add('noopener');
    tokens.add('noreferrer');
    link.setAttribute('rel', [...tokens].join(' '));
});

document.querySelectorAll('[data-current-year]').forEach((node) => {
    node.textContent = String(new Date().getFullYear());
});

const updateHeaderState = () => {
    if (header) header.dataset.scrolled = window.scrollY > 8 ? 'true' : 'false';
};
updateHeaderState();
window.addEventListener('scroll', updateHeaderState, {passive: true});
