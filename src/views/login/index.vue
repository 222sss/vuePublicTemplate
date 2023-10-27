<template>
  <div class="login">
    <div class="loginCentre">
      <div class="title">系统登陆</div>
      <div>
        <el-form
          ref="ruleFormRef"
          :model="ruleForm"
          :rules="rules"
          label-width="0px"
          class="demo-ruleForm"
          status-icon
        >
          <el-form-item prop="userName">
            <el-input placeholder="请输入账号" v-model="ruleForm.userName" />
          </el-form-item>
          <el-form-item prop="userPass">
            <el-input placeholder="请输入密码" v-model="ruleForm.userPass" />
          </el-form-item>
          <el-form-item prop="code">
            <img
              :src="'data:image/png;base64,' + codeImg"
              alt=""
              class="Code"
              @click="getCode"
            />
            <el-input
              class="CodeInput"
              placeholder="请输入验证码"
              v-model="ruleForm.code"
            />
          </el-form-item>
          <el-form-item>
            <el-button
              class="loginButton"
              type="primary"
              @click="submitForm(ruleFormRef)"
            >
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { FormInstance, FormRules } from 'element-plus'
import { userStore } from '@/store/index'
const Store = userStore()

interface RuleForm {
  userName: string
  userPass: string
  code: string
  saltKey: string
}

const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
  userName: '',
  userPass: '',
  code: '',
  saltKey: ''
})

const rules = reactive<FormRules<RuleForm>>({
  userName: [{ required: true, message: '请输入账号！', trigger: 'blur' }],
  userPass: [{ required: true, message: '请输入密码！', trigger: 'blur' }],
  code: [{ required: true, message: '请输入验证码！', trigger: 'blur' }]
})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid) => {
    if (valid) {
      Store.goLogin(ruleForm)
      getCode()
    }
  })
}

onMounted(() => {
  init()
})
const init = () => {
  getCode()
}

// 图形验证码的图片
const codeImg = ref<string>('')

// 获取图形验证码
const getCode = async () => {
  const [err, res] = await request.api.getAuthCaptcha()
  if (!err && res) {
    codeImg.value = res.data.captchaBase64
    ruleForm.saltKey = res.data.saltKey
  }
}
</script>

<style lang="less" scoped>
.login {
  background-color: #2d3a4b;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  .loginCentre {
    width: 400px;
    height: auto;
    color: #fff;
    text-align: center;
    .title {
      margin-bottom: 40px;
      font-size: 26px;
      font-weight: 600;
    }
    .loginButton {
      flex: 1;
    }

    .Code {
      width: 100px;
    }
    .CodeInput {
      flex: 1;
      margin-left: 20px;
    }
  }
}
</style>
