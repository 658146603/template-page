import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from "./components/App.vue";
import HomePage from "./components/HomePage.vue";
import NotFoundPage from "./components/NotFoundPage.vue";
import ReleasePage from './components/ReleasePage';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './main.css';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: HomePage },
        { path: '/page/:page', component: ReleasePage, props: true },
        { path: '/:pathMatch(.*)*', component: NotFoundPage }
    ],
})

const app = createApp(App);
app.use(router);
app.use(ElementPlus);
app.mount('#app');