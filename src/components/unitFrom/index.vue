<template>
  <el-dialog
    v-model="dialogFormVisible"
    :title="title"
    :width="width"
    @close="close(ruleFormRef)"
  >
    <el-form ref="ruleFormRef" :model="formData" :label-width="labelWidth">
      <el-form-item
        :label="item.label"
        :prop="item.prop"
        :rules="item.rules"
        v-for="(item, index) in fromConfig"
        :key="index"
      >
        <slot
          v-if="item.type == 'slot'"
          :name="item.prop"
          :formData="formData"
        ></slot>
        <component
          v-else
          :is="item.elementType"
          v-model="formData[item.prop]"
          v-bind="item.attrs"
          v-on="item.events"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="submit(ruleFormRef)">确定</el-button>
        <el-button @click="close(ruleFormRef)"> 取消 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import type { FormInstance } from 'element-plus'
import { ElInput } from 'element-plus'

type fromConfigItem = {
  prop?: string //唯一标识
  type?: string //控件类型
  label?: string //当前项名称
  placeholder?: string //提示占位符
  events?: any //当前控件绑定的事件
  attrs?: any //当前控件绑定的属性
  rules?: any //校验规则
  elementType?: any //element组件实例
  initValue?: any //初始化的时候值
}

type fromDataItem = {
  [propname: string]: any
}

const emits = defineEmits(['close', 'submit'])

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  title: { type: String, default: '' },
  width: { type: String, default: '800' },
  fromConfig: { type: Array<fromConfigItem> },
  labelWidth: { type: String, default: '120px' }
})

const ruleFormRef = ref<FormInstance>()

const formData: fromDataItem = ref({})

// 弹窗是否显示
const dialogFormVisible = ref<boolean>(false)

// 关闭弹窗
const close = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
  emits('close')
}

// 提交弹窗
const submit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log(formData.value)
      emits('submit')
    } else {
      console.log('error submit!', fields)
    }
  })
}

// 定义element控件类型
const ElementType = {
  input: shallowRef(ElInput)
}

//
const initConfig = () => {
  props.fromConfig.map((item) => {
    // 获取element控件
    item.type && item.type != 'slot'
      ? (item.elementType = ElementType[item.type])
      : ''
    formData.value[item.prop] = item.initValue
  })
}

watch(
  () => props.visible,
  (newValue: boolean) => {
    dialogFormVisible.value = newValue
    newValue ? initConfig() : ''
  }
)
</script>

<style lang="less" scoped>
:deep(.el-dialog__body) {
  max-height: 500px;
  overflow: auto;
  padding: 15px 20px 0px 20px;
  &::-webkit-scrollbar {
    display: none !important;
  }
}

:deep(.el-dialog__footer) {
  padding-top: 20px;
}
</style>
