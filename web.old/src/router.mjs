import DEF from './def.mjs';

const contacts = () => import('./ui/page/contacts.mjs');
const home = () => import('./ui/page/home.mjs');
const mission = () => import('./ui/page/mission.mjs');
const privacy = () => import('./ui/page/privacy.mjs');
const service = () => import('./ui/page/service.mjs');
const stack = () => import('./ui/page/stack.mjs');

export default VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes: [
        {path: DEF.ROUTE_CONTACTS, component: contacts},
        {path: DEF.ROUTE_HOME, component: home},
        {path: DEF.ROUTE_MISSION, component: mission},
        {path: DEF.ROUTE_PRIVACY, component: privacy},
        {path: DEF.ROUTE_SERVICE, component: service},
        {path: DEF.ROUTE_STACK, component: stack},
    ],
});

