import NotFoundView from "./views/NotFoundView.vue";
import HomeView from "./views/HomeView.vue";
import AboutView from "./views/AboutView.vue";

export default [
    {
        path: '/',
        name: 'home',
        component: HomeView

    },
    {
        path: '/about',
        name: 'about',
        component: AboutView
    },
    // {
    //     path: '/404',
    //     name: 'notfound',
    //     component: NotFoundView
    // },
    {
        path: '/:catchAll(.*)',
        component: NotFoundView
    }
];