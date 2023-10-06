import { showToast } from 'vant'
import qs from 'qs'
// 请求头处理,多用于不同类型的传参格式
export const handleChangeRequestHeader = (config: any) => {
  config.headers['Content-Type'] = 'application/json'
  return config
}

// 请求参数处理
export const handleConfigureAuth = (config: any) => {
  // config.header['token'] = localStorage.getItem('token') || '';

  if (config.url.indexOf('dataCockpitLogin') != -1) {
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    config.data = qs.stringify({
      ...config.data,
      token: JSON.parse(localStorage.getItem('token'))
        ? JSON.parse(localStorage.getItem('token')).token
        : ''
    })
  } else {
    config.data = {
      ...config.data,
      token: JSON.parse(localStorage.getItem('token'))
        ? JSON.parse(localStorage.getItem('token')).token
        : ''
    }
  }
  return config
}

// 服务器异常处理,即http链接过程产生的异常
export const handleNetworkError = (errStatus: number | null) => {
  let errMessage = '未知错误'
  if (errStatus) {
    switch (errStatus) {
      case 400:
        errMessage = '错误的请求'
        break
      case 401:
        errMessage = '未授权，请重新登录'
        break
      case 403:
        errMessage = '拒绝访问'
        break
      case 404:
        errMessage = '请求错误,未找到该资源'
        break
      case 405:
        errMessage = '请求方法未允许'
        break
      case 408:
        errMessage = '请求超时'
        break
      case 500:
        errMessage = '服务器端出错'
        break
      case 501:
        errMessage = '网络未实现'
        break
      case 502:
        errMessage = '网络错误'
        break
      case 503:
        errMessage = '服务不可用'
        break
      case 504:
        errMessage = '网络超时'
        break
      case 505:
        errMessage = 'http版本不支持该请求'
        break
      default:
        errMessage = `其他连接错误 --${errStatus}`
    }
  } else {
    errMessage = '无法连接到服务器！'
  }

  showToast(errMessage)
}

// 接口异常处理
export const handleGeneralError = (errno?: object, errmsg?: string) => {
  if (errno) {
    showToast(errmsg)
  }
  return true
}

/**
 * 参数处理
 * @param {*} config
 */
// const parameterHandle = function (parameter: { [key: string]: any }) {
//   /**
//    * 1、给进来的参数新增时间戳属性
//    */
//   parameter
//     ? (parameter.timestamp = new Date().getTime())
//     : (parameter = { timestamp: new Date().getTime() })

//   /**
//    * 2、去除无意义的参数
//    */

//   for (const key in parameter) {
//     // 先判断参数是否有值或者等于零，有值或等于零不处理
//     if (parameter[key] || (parameter[key] !== '' && parameter[key] == 0)) {
//       // 先判断数据的类型
//       if (parameter[key].__proto__.constructor == Object) {
//         // 若为对象，通过对象的长度判断是否为空对象，如果是！删除
//         Object.keys(parameter[key]).length ? '' : delete parameter[key]
//       } else if (parameter[key].__proto__.constructor == Array) {
//         // 若为数组，通过数组的长度判断是否为空数组，如果是！删除
//         parameter[key].length ? '' : delete parameter[key]
//       }
//     } else {
//       // 否则删除
//       delete parameter[key]
//     }
//   }

//   /**
//    * 3、对处理后的参数按特定的规则排序
//    */

//   // 通过获取parameters的key，返回的是一个数组，再通过数组排序使key根据code码大小排序
//   const parametersKeys = Object.keys(parameter).sort()

//   //创建一个新的对象，用于存放排好序的键值对
//   const orderedParameters: {
//     [key: string]: any
//   } = {}

//   // 然后遍历parametersKeys，一一赋值并且push到新数组
//   for (let i = 0; i < parametersKeys.length; i++) {
//     //遍历parametersKeys数组
//     orderedParameters[parametersKeys[i]] = parameter[parametersKeys[i]]
//     //向新创建的对象中按照排好的顺序依次增加键值对
//   }

//   /**
//    * 4、签名的处理
//    */

//   let parametersSign = ''

//   for (const item in orderedParameters) {
//     if (
//       orderedParameters[item].__proto__.constructor == Object ||
//       orderedParameters[item].__proto__.constructor == Array
//     ) {
//       parametersSign
//         ? (parametersSign += `&${item}=${JSON.stringify(
//           orderedParameters[item]
//         )}`)
//         : (parametersSign = `${item}=${JSON.stringify(
//           orderedParameters[item]
//         )}`)
//     } else {
//       parametersSign
//         ? (parametersSign += `&${item}=${orderedParameters[item]}`)
//         : (parametersSign = `${item}=${orderedParameters[item]}`)
//     }
//   }

//   /**
//    * 5、将排序后的参数和签名返回回去
//    */
//   return {
//     ...orderedParameters,
//     sign: md5(parametersSign)
//   }
// }
