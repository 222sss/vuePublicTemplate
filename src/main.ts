import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from './store/index.js'
import { Toast } from 'vant'
import 'vant/es/toast/style'
import './router/routeGuard'

createApp(App).use(router).use(pinia).use(Toast).mount('#app')
