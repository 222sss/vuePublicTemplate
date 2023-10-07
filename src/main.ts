import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from './store/index.js'
import './router/routeGuard'
import mitt from 'mitt'
import {
  renderWithQiankun,
  qiankunWindow
} from 'vite-plugin-qiankun/dist/helper'
import { registerMicroApps, start } from 'qiankun'
import qiankunConfig from '@/configure/qiankunConfig'

const app = createApp(App)

// 子应用挂载函数
function render(props: any) {
  const { container } = props
  app.use(router)
  app.mount(
    container ? container.querySelector('#indexContainer') : '#indexContainer'
  ) // 这个ID为index.html中div的ID名称
  app.config.globalProperties.mittBus = mitt()
}

// 当做为子应用时
if (qiankunConfig.qiankunType == 'Sub') {
  renderWithQiankun({
    mount(props) {
      render(props)
      // store.commit("updateUserInfo",props);
      // 在vue全局注册主应用的状态监听和状态改变事件
      app.config.globalProperties.$onGlobalStateChange =
        props.onGlobalStateChange
      app.config.globalProperties.$setGlobalState = props.setGlobalState
    },
    bootstrap() {
      console.log('bootstrap')
    },
    unmount() {
      console.log('unmount')
      app.unmount()
    },
    update() {
      console.log('update')
    }
  })

  if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
    render({})
  }
}

// 当做为主应用时
if (qiankunConfig.qiankunType == 'main') {
  // 注册子应用
  registerMicroApps(qiankunConfig.registerMicroApps)

  // 启动项目
  start()
}

app.use(router).use(pinia).mount('#app')
