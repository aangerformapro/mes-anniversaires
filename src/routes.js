import NotFoundView from "./views/NotFoundView.vue";

export default [
    {
        path: '/',
        name: 'home',
        component: ()=> import('./views/HomeView.vue')
    },
    {
        path: '/about',
        name: 'about',
        component: () => import('./views/AboutView.vue')
    },
    {
        path: '/.+',
        name: 'notfound',
        component: NotFoundView
    }
];