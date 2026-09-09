import assert from 'node:assert/strict';
import path from 'node:path';
import test from 'node:test';
import {fileURLToPath} from 'node:url';

import nunjucks from 'nunjucks';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const locales = {
    en: {
        responsibility: 'A person remains answerable for what is built.',
        agents: 'Agents are development participants, not a black box.',
        context: 'Important product knowledge is made explicit.',
        verification: 'Designed for change, checked before acceptance.',
        control: 'Hosting and trust boundaries are discussed explicitly.',
        adaptation: 'Start with a working product, then adapt where it is justified.',
        continuity: 'Future work need not begin by reverse-engineering intent from code alone.',
    },
    ru: {
        responsibility: 'За созданное отвечает человек.',
        agents: 'Агенты — участники разработки, а не чёрный ящик.',
        context: 'Важное знание о продукте становится явным.',
        verification: 'Структура для изменений, проверка до принятия.',
        control: 'Хостинг и границы доверия обсуждаются явно.',
        adaptation: 'Начните с работающего продукта, затем адаптируйте его, когда это обоснованно.',
        continuity: 'Необязательно начинать будущую работу с обратного восстановления замысла из одного кода.',
    },
    es: {
        responsibility: 'Una persona sigue respondiendo por lo que se construye.',
        agents: 'Los agentes participan en el desarrollo; no son una caja negra.',
        context: 'El conocimiento importante del producto se hace explícito.',
        verification: 'Diseñado para cambiarse, comprobado antes de aceptarse.',
        control: 'El alojamiento y los límites de confianza se conversan explícitamente.',
        adaptation: 'Empieza con un producto que funciona y adáptalo cuando esté justificado.',
        continuity: 'El trabajo futuro no tiene que empezar reconstruyendo toda la intención a partir del código.',
    },
};

function render(locale, template, data = {}) {
    const environment = nunjucks.configure(path.join(root, 'tmpl', 'web', locale), {autoescape: true});
    return environment.render(template, {
        allowedLocales: ['en', 'ru', 'es'],
        alternateUrls: Object.fromEntries(['en', 'ru', 'es'].map((target) => [target, `https://wiredgeese.com/${target}/how-it-works.html`])),
        canonicalUrl: `https://wiredgeese.com/${locale}/how-it-works.html`,
        locale,
        ...data,
    });
}

test('renders every localized How-it-works page as a cross-product trust layer', () => {
    for (const [locale, markers] of Object.entries(locales)) {
        const html = render(locale, 'how-it-works.html');

        assert.match(html, new RegExp(`<link rel="canonical" href="https://wiredgeese\\.com/${locale}/how-it-works\\.html">`));
        assert.match(html, /<h1>/);
        for (const marker of Object.values(markers)) assert.ok(html.includes(marker), `${locale}: ${marker}`);
        assert.ok(html.includes('ADSM'), `${locale}: ADSM`);
        assert.ok(html.includes('TeqFW'), `${locale}: TeqFW`);
        assert.ok(html.includes('PDE'), `${locale}: PDE`);
        assert.match(html, new RegExp(`href="/${locale}/products/chatgpt-telegram\\.html"`));
        assert.match(html, new RegExp(`href="/${locale}/products/"`));
        assert.doesNotMatch(html, /GitHub Flows|Agent Orchestration PoC|€50/u);
    }
});

test('shared navigation, footer, Home preview, and Alarisa use the standalone destination', async () => {
    for (const locale of Object.keys(locales)) {
        const nav = render(locale, 'inc/nav.html');
        const footer = render(locale, 'inc/footer.html');
        const home = render(locale, 'index.html');
        const alarisa = render(locale, 'projects/alarisa.html', {
            canonicalUrl: `https://wiredgeese.com/${locale}/projects/alarisa.html`,
            alternateUrls: {},
        });
        const route = `/${locale}/how-it-works.html`;

        assert.ok(nav.includes(route), `${locale} nav`);
        assert.ok(footer.includes(route), `${locale} footer`);
        assert.ok(home.includes(route), `${locale} Home preview`);
        assert.ok(alarisa.includes(route), `${locale} Alarisa`);
    }
});
