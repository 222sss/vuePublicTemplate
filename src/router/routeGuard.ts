import router from './index'
import pinia from '@/store/index'
import { systemStore } from '@/store/index'
import rebuildFn from './routeRebuild'
const Store = systemStore(pinia)

router.beforeEach(async (to, from, next) => {
  if (to.path !== '/login') {
    if (
      !localStorage.getItem('userStore') ||
      !JSON.parse(localStorage.getItem('userStore')).userInformation.token
    ) {
      next({ path: '/login' })
    } else {
      // 先去pinia查看是否有菜单,如果有就不需要获取,当页面刷新会导致pinia状态丢失,这时才需要重新获取路由
      if (!Store.SidebarList.length) {
        // 获取动态路由并且重组路由表
        const routerList = rebuildFn(await Store.getRouter())

        // 把路由表设置到pinia中
        Store.setSidebarList(routerList)

        console.log(routerList)
        // 挂载路由
        await routerList.map((item) => {
          router.addRoute(item)
        })
        next({ ...to, replace: true })
        Store.addCacheItem(to.name, to.path)
      } else {
        Store.addCacheItem(to.name, to.path)
        next()
      }
    }
  } else {
    next()
  }
})
