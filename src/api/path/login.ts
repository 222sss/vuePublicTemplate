import { Post, Get } from '../server'

interface FcResponse<T> {
  errno: string
  errmsg: string
  dataJson: T | any
  data: T | any
}

type ApiResponse<T> = Promise<[any, FcResponse<T> | undefined]>

//  获取权限路由
function getRoutersTree<T>(requestData?: object | never): ApiResponse<T> {
  return Post<T>('/center/admin/routers/getRoutersList', { ...requestData })
}

//  获取登录的图形验证码
function getAuthCaptcha<T>(requestData?: object | never): ApiResponse<T> {
  return Get<T>('/center/auth/captcha/captcha', { ...requestData })
}

//  获取登录的图形验证码
function goLogin<T>(requestData?: object | never): ApiResponse<T> {
  return Post<T>('/center/auth/center/login', { ...requestData })
}

export const login = {
  getRoutersTree,
  getAuthCaptcha,
  goLogin
}
