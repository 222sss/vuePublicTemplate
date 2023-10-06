import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

type parameterType = {
  yearMonthInfo: string
  staffId: string
  campusId: string
  parentCampusId: string
  provinceText?: string
  cityText?: string
  regionText?: string
  type: number
  projectType: string
}

export const filterStore = defineStore(
  'filter',
  () => {
    // 相当于 vuex 中的 state
    const parameter = ref<parameterType>({
      yearMonthInfo: '',
      staffId: '',
      campusId: '',
      parentCampusId: '',
      type: 2,
      projectType: 'all'
    })

    // 相当于 vuex 中的getters
    const changeParameter = computed(() => parameter.value)

    // 相当于 vuex 中的mutations
    const update = (val: parameterType) => (parameter.value = val)

    return { parameter, changeParameter, update }
  },
  // 使用数据持久化
  {
    persist: true
  }
)
