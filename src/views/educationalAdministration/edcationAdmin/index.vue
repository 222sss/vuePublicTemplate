<template>
  <div>
    <unitFrom
      :visible="visible"
      width="600"
      labelWidth="90px"
      title="测试"
      :fromConfig="fromConfig"
      @submit="visible = false"
      @close="visible = false"
      ><template #input2="row">
        <el-input
          v-model="row.formData.input2"
          placeholder="Please input"
        /> </template
    ></unitFrom>
    <unitFromSearch
      :visible="visible"
      :fromConfig="fromConfig"
      @submit="visible = false"
      @close="visible = false"
      ><template #input2="row">
        <el-input
          v-model="row.formData.input2"
          placeholder="Please input"
        /> </template
    ></unitFromSearch>
    <el-button type="primary" @click="visible = true"> 打开 </el-button>
    <unitTable
      :tableConfig="tableConfig"
      @pageChang="pageChang"
      :selection="true"
      :SerialNumber="true"
    >
      <template #address="{ row }"> {{ row.address }}</template></unitTable
    >
  </div>
</template>
<script lang="ts" setup name="/educationalAdministration/edcationAdmin">
import unitFrom from '@/components/unitFrom/index.vue'
import unitFromSearch from '@/components/unitFromSearch/index.vue'
import unitTable from '@/components/unitTable/index.vue'

const visible = ref(false)

const fromConfig = ref([
  {
    prop: 'input',
    type: 'input',
    label: '1223',
    initValue: '22',
    events: {},
    attrs: {
      placeholder: 'input'
    },
    rules: []
  },
  {
    prop: 'input2',
    type: 'slot',
    label: '1223',
    initValue: '22223333445678'
  },
  {
    prop: 'input',
    type: 'input',
    label: '1223',
    initValue: '22',
    events: {},
    attrs: {
      placeholder: 'input'
    },
    rules: []
  },
  {
    prop: 'input',
    type: 'input',
    label: '1223',
    initValue: '22',
    events: {},
    attrs: {
      placeholder: 'input'
    },
    rules: []
  },
  {
    prop: 'input2',
    type: 'slot',
    label: '1223',
    initValue: '22223333445678'
  },
  {
    prop: 'input',
    type: 'input',
    label: '1223',
    initValue: '22',
    events: {},
    attrs: {
      placeholder: 'input'
    },
    rules: []
  },
  {
    prop: 'input',
    type: 'input',
    label: '1223',
    initValue: '22',
    events: {},
    attrs: {
      placeholder: 'input'
    },
    rules: []
  },
  {
    prop: 'input2',
    type: 'slot',
    label: '1223',
    initValue: '22223333445678'
  },
  {
    prop: 'input',
    type: 'input',
    label: '1223',
    initValue: '22',
    events: {},
    attrs: {
      placeholder: 'input'
    },
    rules: []
  }
])

const selectionChange = (val) => {
  console.log(val)
}

const tableConfig = ref({
  tableKey: [
    { prop: 'date', label: '助教ID', attrs: { sortable: true, fixed: true } },
    { prop: 'name', label: '助教ID', width: '800px' },
    { prop: 'address', label: '助教ID', operate: true, width: '800px' },
    { prop: 'addre2', label: '助教ID', type: 'image', width: '10000px' }
  ],
  tableData: [
    {
      date: '2016-05-01',
      name: 'Tom',
      address:
        'show-overflow-tooltipshow-overflow-tooltipshow-overflow-tooltipshow-overflow-tooltipshow-overflow-tooltipshow-overflow-tooltipshow-overflow-tooltipshow-overflow-tooltipshow-overflow-tooltipshow-overflow-tooltipshow-overflow-tooltipshow-overflow-tooltipshow-overflow-tooltipshow-overflow-tooltipshow-overflow-tooltipshow-overflow-tooltipshow-overflow-tooltipshow-overflow-tooltip',
      addre2:
        'https://img0.baidu.com/it/u=2142436775,2198899200&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=747'
    },
    {
      date: '2016-05-02',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
      addre2:
        'https://img0.baidu.com/it/u=2142436775,2198899200&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=747'
    },
    {
      date: '2016-05-03',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
      addre2:
        'https://img0.baidu.com/it/u=2142436775,2198899200&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=747'
    },
    {
      date: '2016-05-03',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
      addre2:
        'https://img0.baidu.com/it/u=2142436775,2198899200&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=747'
    },
    {
      date: '2016-05-03',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
      addre2:
        'https://img0.baidu.com/it/u=2142436775,2198899200&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=747'
    },
    {
      date: '2016-05-03',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
      addre2:
        'https://img0.baidu.com/it/u=2142436775,2198899200&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=747'
    },
    {
      date: '2016-05-03',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
      addre2:
        'https://img0.baidu.com/it/u=2142436775,2198899200&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=747'
    },
    {
      date: '2016-05-03',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
      addre2:
        'https://img0.baidu.com/it/u=2142436775,2198899200&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=747'
    },
    {
      date: '2016-05-03',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
      addre2:
        'https://img0.baidu.com/it/u=2142436775,2198899200&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=747'
    },
    {
      date: '2016-05-03',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
      addre2:
        'https://img0.baidu.com/it/u=2142436775,2198899200&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=747'
    },
    {
      date: '2016-05-03',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
      addre2:
        'https://img0.baidu.com/it/u=2142436775,2198899200&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=747'
    },
    {
      date: '2016-05-03',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
      addre2:
        'https://img0.baidu.com/it/u=2142436775,2198899200&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=747'
    },
    {
      date: '2016-05-03',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
      addre2:
        'https://img0.baidu.com/it/u=2142436775,2198899200&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=747'
    },
    {
      date: '2016-05-03',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
      addre2:
        'https://img0.baidu.com/it/u=2142436775,2198899200&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=747'
    },
    {
      date: '2016-05-03',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
      addre2:
        'https://img0.baidu.com/it/u=2142436775,2198899200&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=747'
    },
    {
      date: '2016-05-03',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
      addre2:
        'https://img0.baidu.com/it/u=2142436775,2198899200&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=747'
    },
    {
      date: '2016-05-03',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
      addre2:
        'https://img0.baidu.com/it/u=2142436775,2198899200&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=747'
    },
    {
      date: '2016-05-03',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
      addre2:
        'https://img0.baidu.com/it/u=2142436775,2198899200&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=747'
    },
    {
      date: '2016-05-03',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
      addre2:
        'https://img0.baidu.com/it/u=2142436775,2198899200&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=747'
    },
    {
      date: '2016-05-03',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
      addre2:
        'https://img0.baidu.com/it/u=2142436775,2198899200&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=747'
    },
    {
      date: '2016-05-03',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
      addre2:
        'https://img0.baidu.com/it/u=2142436775,2198899200&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=747'
    }
  ],
  pageData: {
    total: 0,
    pageSize: 10,
    pageNum: 1,
    layout: 'total, prev, pager, next ,sizes',
    pageSizesArr: [1, 2, 3, 4]
  },
  events: {
    selectionChange: selectionChange
  },
  attrs: {
    defaultSort: "{ prop: 'date', order: 'descending' }"
  }
})

// 分页发生改变
const pageChang = (val) => {
  val.pageSize
    ? (tableConfig.value.pageData.pageSize = val.pageSize)
    : (tableConfig.value.pageData.pageNum = val.pageNum)
}
</script>
