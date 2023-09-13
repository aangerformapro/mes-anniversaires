import {createRouter, createWebHistory} from 'vue-router';
import {createApp} from 'vue';

import App from "./App.vue";
import {createPinia} from "pinia";
import routes from './routes';


const app = createApp(App);
app
    .use(createPinia())
    .use(createRouter({
        history: createWebHistory(),
        routes
    }))

    .mount('#app');
