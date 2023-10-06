import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from './store/index.js'
import 'lib-flexible'
import Vconsole from 'vconsole'
import { Toast } from 'vant'
import 'vant/es/toast/style'
import './router/routeGuard'

import.meta.env.MODE == 'test' ? new Vconsole() : ''

createApp(App).use(router).use(pinia).use(Toast).mount('#app')
