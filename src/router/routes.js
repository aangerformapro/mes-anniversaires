import HomeView from "@/views/HomeView.vue";

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
        component: () => import('@/views/ProfileView.vue'),
        meta: {transition: 'slide-left'},
    },
    {
        path: '/about',
        name: 'about',
        component: () => import('@/views/AboutView.vue'),
        meta: {transition: 'slide-left'},
    },
    {
        path: '/:catchAll(.*)',
        component: () => import('@/views/NotFoundView.vue')
    }
];