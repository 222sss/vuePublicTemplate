<template>
  <div>
    <el-form ref="ruleFormRef" :model="formData">
      <el-row> </el-row>
      <el-form-item
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
      <el-form-item>
        <el-button type="primary" @click="submit(ruleFormRef)">搜索</el-button>
        <el-button @click="clean(ruleFormRef)">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
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

const emits = defineEmits(['search', 'clean'])

const props = defineProps({
  fromConfig: { type: Array<fromConfigItem> }
})

const ruleFormRef = ref<FormInstance>()

const formData: fromDataItem = ref({})

// 重置搜索条件
const clean = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
  emits('clean')
}

// 搜索
const submit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log(formData.value)
      emits('search')
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

onMounted(() => {
  initConfig()
})
</script>

<style lang="less" scoped>
:deep(.el-form) {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  .el-form-item {
    width: 194px;
    margin-right: 15px;
    margin-bottom: 15px;
  }
}
</style>
