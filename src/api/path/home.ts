import { Post } from '../server'

interface FcResponse<T> {
  errno: string
  errmsg: string
  dataJson: T | any
}

type ApiResponse<T> = Promise<[any, FcResponse<T> | undefined]>

//  数据大屏的项目
function dataCenterProjectList<T>(
  requestData?: object | never
): ApiResponse<T> {
  return Post<T>('/h5/api/datacenter/dataCenterProjectList', { ...requestData })
}

export const home = {
  dataCenterProjectList
}
