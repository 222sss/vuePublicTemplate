import axios from 'axios'

import {
  handleChangeRequestHeader,
  handleConfigureAuth,
  handleGeneralError,
  handleNetworkError
} from './tool'

type Fn = (data: FcResponse<any>) => unknown

interface IAnyObj {
  [index: string]: unknown
}

interface FcResponse<T> {
  errno: string
  errmsg: string
  dataJson: T | any
  data: T | any
}

axios.interceptors.request.use((config) => {
  config = handleChangeRequestHeader(config)
  config = handleConfigureAuth(config)
  return config
})

axios.interceptors.response.use(
  (response) => {
    if (!response.data.success)
      handleGeneralError(response.data.code, response.data.msg)

    if (response.status !== 200 || !response.data.success)
      return Promise.reject(response.data)
    return response
  },
  (err) => {
    handleNetworkError(err.response.status)
    Promise.reject(err.response)
  }
)

export const Get = <T>(
  url: string,
  params: IAnyObj = {},
  clearFn?: Fn,
  baseURL?: string
): Promise<[any, FcResponse<T> | undefined]> =>
  new Promise((resolve) => {
    axios
      .get(baseURL ? baseURL + url : import.meta.env.VITE_BASE_Url + url, {
        params
      })
      .then((result) => {
        let res: FcResponse<T>
        if (clearFn !== undefined) {
          res = clearFn(result.data) as unknown as FcResponse<T>
        } else {
          res = result.data as FcResponse<T>
        }
        resolve([null, res as FcResponse<T>])
      })
      .catch((err) => {
        resolve([err, undefined])
      })
  })

export const Post = <T>(
  url: string,
  data: IAnyObj,
  baseURL?: string
): Promise<[any, FcResponse<T> | undefined]> => {
  return new Promise((resolve) => {
    axios
      .post(baseURL ? baseURL + url : import.meta.env.VITE_BASE_Url + url, data)
      .then((result) => {
        resolve([null, result.data as FcResponse<T>])
      })
      .catch((err) => {
        resolve([err, undefined])
      })
  })
}
