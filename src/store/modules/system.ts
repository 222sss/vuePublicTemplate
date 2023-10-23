import { defineStore } from 'pinia'
import { ref } from 'vue'
import router from '@/router/index'
type systemStateType = {
  SidebarState: string
}

type SidebarRow = {
  children: Array<any>
  component: any
  menuId: number
  meta: object
  name: string
  parentId: number
  path: string
}

type cacheRouterList = {
  name: any
  path: string
}

export const systemStore = defineStore('systemStore', {
  state: () => {
    // 菜单展示状态
    const systemState = ref<systemStateType>({
      SidebarState: 'show'
    })

    // 菜单路由数组
    const SidebarList = ref([])

    const cacheRouterList = ref<Array<cacheRouterList>>([
      {
        name: '首页',
        path: '/home'
      }
    ])

    // 设置菜单状态
    const setSidebarState = (val: string) => {
      systemState.value.SidebarState = val
    }

    // 设置菜单列表
    const setSidebarList = (val: Array<SidebarRow>) => {
      SidebarList.value = val
    }

    // 给缓存页面数组增加数据
    const addCacheItem = (name: any, path: string) => {
      let haveItem = true
      cacheRouterList.value.map((item) => {
        item.path == path ? (haveItem = false) : ''
      })
      if (haveItem && name) {
        cacheRouterList.value.push({
          name: name,
          path: path
        })
      }
    }

    // 删除指定的路由缓存页面
    const deleteCacheItem = (path: string) => {
      // 先判断他删掉的是不是当前页面
      if (router.currentRoute.value.path == path) {
        cacheRouterList.value.map((item, index) => {
          if (item.path == path) {
            index == 1 && cacheRouterList.value.length > 2
              ? router.push(cacheRouterList.value[index + 1])
              : router.push(cacheRouterList.value[index - 1])
          }
        })
      }
      cacheRouterList.value = cacheRouterList.value.filter(
        (item) => item.path != path
      )
    }

    return {
      systemState,
      SidebarList,
      cacheRouterList,
      setSidebarState,
      setSidebarList,
      addCacheItem,
      deleteCacheItem
    }
  },
  actions: {
    async getRouter() {
      const [err, res] = await request.api.getRoutersTree({
        appLogo: 'teaching-affairs-sys'
      })
      if (!err && res) {
        return res.data
      }
    }
  }
})
