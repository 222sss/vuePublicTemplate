import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

// 公共路由
export const releaseRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/home/index.vue')
  }
]

// 权限路由
export const authorityRoutes = []

// 创建路由
const router = createRouter({
  history: createWebHashHistory(),
  routes: releaseRoutes
})

export default router
