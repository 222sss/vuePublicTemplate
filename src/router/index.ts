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
    name: '首页',
    component: () => import('@/layout/index.vue'),
    children: [
      {
        path: '/homePage',
        component: () => import('@/views/home/index.vue'),
        name: '登录',
        meta: { title: 'Export Excel' }
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    name: '登录',
    meta: { title: 'Export Excel' }
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
