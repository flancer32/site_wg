import DEF from './def.mjs';

const about = () => import('./ui/route/about.mjs');
const contacts = () => import('./ui/route/contacts.mjs');
const home = () => import('./ui/route/home.mjs');
const service = () => import('./ui/route/service.mjs');
const stack = () => import('./ui/route/stack.mjs');

export default VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes: [
        {path: DEF.ROUTE_ABOUT, component: about},
        {path: DEF.ROUTE_CONTACTS, component: contacts},
        {path: DEF.ROUTE_HOME, component: home},
        {path: DEF.ROUTE_SERVICE, component: service},
        {path: DEF.ROUTE_STACK, component: stack},
    ],
});

