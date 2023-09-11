import { createRouter, createWebHistory } from 'vue-router';
import routes from './routes.js';



const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router

import { createApp } from 'vue'
import App from "./App.vue";

console.debug(location.host);

globalThis.__VUE_OPTIONS_API__ = false;
globalThis.__VUE_PROD_DEVTOOLS__ = false;

if(/:\d+$/.test(location.host)){
    globalThis.__VUE_OPTIONS_API__ = true
    globalThis.__VUE_PROD_DEVTOOLS__ = true;
}






createApp(App)
    .use(router)
    .mount('#app')

