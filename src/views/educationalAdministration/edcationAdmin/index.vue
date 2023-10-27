<template>
  <div>
    <!-- 搜索栏 -->
    <unitFromSearch
      :visible="visible"
      :fromConfig="fromConfig.fromKey"
      @submit="visible = false"
      @close="visible = false"
      ><template #input2="row">
        <el-input
          v-model="row.formData.input2"
          placeholder="Please input"
        /> </template
    ></unitFromSearch>

    <el-button type="primary" style="margin-bottom: 15px" @click="addDeta">
      新增教务
    </el-button>
    <!-- 表格 -->
    <unitTable :tableConfig="tableConfig" @pageChang="pageChang">
      <template #operation="{ row }"
        ><span v-if="row.existDuty == 1">
          <el-button type="text" @click="showDeta(row, 'check')" text
            >详情</el-button
          >
          <el-button
            v-if="row.dataStatus == 0 && row.approveStatus == 'AGREE'"
            @click="changeDataStatusFN(row, 'start')"
            type="text"
            text
            >启用</el-button
          >
          <el-button
            v-if="row.dataStatus == 1 && row.approveStatus == 'AGREE'"
            @click="changeDataStatusFN(row, 'forbidden')"
            type="text"
            text
            >停用</el-button
          >
        </span>
      </template></unitTable
    >

    <!-- 新增 修改 查看 -->
    <unitFrom
      :visible="visible"
      width="600"
      labelWidth="90px"
      :title="fromTitle"
      :fromConfig="fromConfig.fromKey"
      @submit="visible = false"
      @close="visible = false"
      ><template #input2="row">
        <el-input
          v-model="row.formData.input2"
          placeholder="Please input"
        /> </template
    ></unitFrom>
  </div>
</template>
<script lang="ts" setup name="/educationalAdministration/edcationAdmin">
import unitFrom from '@/components/unitFrom/index.vue'
import unitFromSearch from '@/components/unitFromSearch/index.vue'
import unitTable from '@/components/unitTable/index.vue'

// 弹窗是否展示
const visible = ref(false)
// 弹窗的名称
const fromTitle = ref('')

const fromConfig = ref({
  fromKey: [
    {
      prop: 'name',
      type: 'input',
      label: '姓名',
      events: {},
      attrs: {
        placeholder: 'input'
      },
      rules: []
    },
    {
      prop: 'name',
      type: 'input',
      label: '手机号码',
      attrs: {
        placeholder: 'input'
      },
      rules: []
    }
  ],
  fromData: {}
})

const tableConfig = ref({
  tableKey: [
    // { prop: 'date', label: '助教ID', attrs: { sortable: true, fixed: true } },
    // { prop: 'name', label: '助教ID', width: '800px' },
    // { prop: 'address', label: '助教ID', operate: true, width: '800px' },
    // { prop: 'addre2', label: '助教ID', type: 'image', width: '10000px' },

    { prop: 'teacherId', label: '教务ID' },
    { prop: 'name', label: '姓名' },
    { prop: 'phone', label: '手机' },
    { prop: 'provinceBusinessGroupName', label: '省校' },
    { prop: 'businessGroupName', label: '分校' },
    { prop: 'nick', label: '昵称' },
    { prop: 'wechat', label: '微信号' },
    { prop: 'sex', label: '性别', operate: true },
    { prop: 'age', label: '年龄' },
    { prop: 'trainingName', label: '所属培训类别' },
    { prop: 'sort', label: '排序值' },
    { prop: 'dataStatus', label: '数据状态', operate: true },
    {
      prop: 'approveStatus',
      label: '审批状态',
      operate: true
    },
    { prop: 'existDuty', label: '是否在职', operate: true },
    { prop: 'createTime', label: '创建时间' },
    {
      prop: 'operation',
      label: '操作栏',
      attrs: { fixed: 'right', width: '300px' },
      operate: true
    }
  ],
  tableData: [],
  pageData: {
    total: 0,
    pageSize: 10,
    pageNum: 1,
    layout: 'total, prev, pager, next ,sizes',
    pageSizesArr: [1, 2, 3, 4]
  },
  events: {},
  attrs: {}
})

// 分页发生改变
const pageChang = (val) => {
  val.pageSize
    ? (tableConfig.value.pageData.pageSize = val.pageSize)
    : (tableConfig.value.pageData.pageNum = val.pageNum)
  getPageData()
}

onMounted(() => {
  getPageData()
})

// 获取页面数据
const getPageData = async () => {
  const [err, res] = await request.api.getEducationalData({
    teacherType: 'TeachService',
    pageSize: tableConfig.value.pageData.pageSize,
    pageNum: tableConfig.value.pageData.pageNum,
    ...fromConfig.value.fromData
  })
  if (!err && res) {
    tableConfig.value.tableData = res.data
    tableConfig.value.pageData.total = res.total
  }
}

// 启用停用
const changeDataStatusFN = (row, Status) => {
  ElMessageBox.confirm(
    `是否确认${
      Status == 'forbidden' ? '停用' : '启用'
    }[<span style="color: red;">${row.name}</span>]教务老师信息？`,
    '操作确认',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
      dangerouslyUseHTMLString: true
    }
  )
    .then(async () => {
      const [err, res] = await request.api.teacherInfoDataStartOrStop({
        teacherId: row.teacherId,
        dataStatus: Status == 'forbidden' ? 0 : 1
      })
      if (!err && res) {
        ElMessage({
          type: 'success',
          message: '请求成功'
        })
        getPageData()
      }
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消成功'
      })
    })
}

// 查看详情
const showDeta = (row, type) => {
  type == 'check' ? (fromTitle.value = '查看详情') : (fromTitle.value = '修改')
  visible.value = true
}

const addDeta = () => {
  fromTitle.value = '新增教务'
  visible.value = true
}
</script>
