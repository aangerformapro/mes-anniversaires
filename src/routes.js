import NotFoundView from "./views/NotFoundView.vue";
import HomeView from "./views/HomeView.vue";
import AboutView from "./views/AboutView.vue";
import ProfileView from "./views/ProfileView.vue";

export default [
    {
        path: '/',
        name: 'home',
        component: HomeView

    },
    {
        path: '/profile/:id',
        name: 'profile',
        component: ProfileView
    },
    {
        path: '/about',
        name: 'about',
        component: AboutView
    },
    {
        path: '/:catchAll(.*)',
        component: NotFoundView
    }
];