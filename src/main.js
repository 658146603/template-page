import { createApp, h } from 'vue';

import MainPage from "./components/MainPage.vue";
import NotFoundPage from "./components/NotFoundPage.vue";

const routes = {
    '/': MainPage,
}

const router = {
    data: () => ({
        currentRoute: window.location.pathname
    }),
    computed: {
        CurrentComponent() {
            return routes[this.currentRoute] || NotFoundPage
        }
    },
    render() {
        return h(this.CurrentComponent)
    }
}

createApp(router).mount('#app')
