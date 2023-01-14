import DEF from './def.mjs';

const Home = () => import('./ui/route/home.mjs');

const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes: [
        {
            path: DEF.ROUTE_HOME,
            component: Home,
        }
    ],
});

export {
    router as default
}