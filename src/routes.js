import NotFoundView from "./views/NotFoundView.vue";
import HomeView from "./views/HomeView.vue";
import AboutView from "./views/AboutView.vue";
import ProfileView from "./views/ProfileView.vue";

export default [
    {
        path: '/',
        name: 'home',
        component: HomeView,
        meta: {transition: 'fade-up'},

    },
    {
        path: '/profile/:id',
        name: 'profile',
        component: ProfileView,
        meta: {transition: 'slide-left'},
    },
    {
        path: '/about',
        name: 'about',
        component: AboutView,
        meta: {transition: 'slide-left'},
    },
    {
        path: '/:catchAll(.*)',
        component: NotFoundView
    }
];


