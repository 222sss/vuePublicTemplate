import { defineStore } from 'pinia'
import { ref } from 'vue'
import md5 from 'md5'
import router from '@/router'

type userStateType = {
  headPic?: string
  jobnumber?: string
  name?: string
  phone?: string
  sysUserId?: number
  token?: string
}

type loginType = {
  userName: string
  userPass: string
  code: string
  saltKey: string
}

export const userStore = defineStore('userStore', {
  state: () => {
    // 相当于 vuex 中的 state
    const userInformation = ref<userStateType>()

    // 设置token
    const setInformation = (val: userStateType) => {
      userInformation.value = val
    }

    // 移除token
    const removeInformation = () => {
      userInformation.value = {}
    }

    return { userInformation, setInformation, removeInformation }
  },
  actions: {
    // 登录
    async goLogin(loginData: loginType) {
      const [err, res] = await request.api.goLogin({
        ...loginData,
        userPass: md5(loginData.userPass)
      })
      if (!err && res) {
        this.setInformation(res.data)
        router.push('./home')
      }
    }
  },
  // 使用数据持久化
  persist: true
})
