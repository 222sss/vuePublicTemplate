import { Post } from '../server'

interface FcResponse<T> {
  errno: string
  errmsg: string
  dataJson: T | any
  data: T | any
}

type ApiResponse<T> = Promise<[any, FcResponse<T> | undefined]>

//  登录
function dologin<T>(requestData?: object | never): ApiResponse<T> {
  return Post<T>('/user/dataCockpitLogin', { ...requestData })
}

export const login = {
  dologin
}
