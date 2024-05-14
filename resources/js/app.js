import './bootstrap';

import { createApp } from 'vue';
import router from './router.js'
import store from './store'

import App from './layouts/App.vue'

// import ToastPlugin from 'vue-toast-notification';
// import 'vue-toast-notification/dist/theme-bootstrap.css';

createApp(App)
    // .use(ToastPlugin)
    .use(router)
    .use(store)
    .mount("#app")
