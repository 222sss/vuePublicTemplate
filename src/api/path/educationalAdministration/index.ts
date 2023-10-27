import { Post } from '../../server'

interface FcResponse<T> {
  errno: string
  errmsg: string
  data: T | any
  total?: number
}

type ApiResponse<T> = Promise<[any, FcResponse<T> | undefined]>

//  教务管理和助教数据列表
function getEducationalData<T>(requestData?: object | never): ApiResponse<T> {
  return Post<T>('/center/teachingAffairs/teacher/page', { ...requestData })
}

//  教务管理和助教数据列表
function teacherInfoDataStartOrStop<T>(
  requestData?: object | never
): ApiResponse<T> {
  return Post<T>('/center/teachingAffairs/teacher/teacherInfoDataStartOrStop', {
    ...requestData
  })
}

export const educationalAdministration = {
  getEducationalData,
  teacherInfoDataStartOrStop
}
