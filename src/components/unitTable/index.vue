<template>
  <div class="table">
    <el-table
      :data="tableConfig.tableData"
      cell-class-name="cellStyle"
      show-overflow-tooltip
      v-on="tableConfig.events"
      v-bind="tableConfig.attrs"
      flexible
      border
    >
      <el-table-column type="selection" width="55" v-if="selection" />
      <el-table-column width="55" fixed v-if="SerialNumber" label="序号">
        <template #default="scope">{{ scope.$index + 1 }}</template>
      </el-table-column>
      <el-table-column
        :prop="item.prop"
        :label="item.label"
        align="center "
        v-bind="item.attrs"
        v-for="(item, index) in tableConfig.tableKey"
        :key="index"
      >
        <template v-slot="{ row }" v-if="item.operate">
          <slot :name="item.prop" :row="row"> </slot>
        </template>
        <template v-slot="{ row }" v-else-if="item.type == 'image'"
          ><el-image
            v-if="row[item.prop]"
            class="imageContent"
            :src="row[item.prop]"
            fit="contain"
          />
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      class="pagination"
      v-model:currentPage="currentPage"
      v-model:page-size="pageSize"
      :layout="tableConfig.pageData.layout || 'total, prev, pager, next ,sizes'"
      :total="tableConfig.pageData.total"
      :page-sizes="tableConfig.pageData.pageSizesArr || [10, 20, 30, 40, 50]"
    />
  </div>
</template>
<script lang="ts" setup>
const props = defineProps({
  tableConfig: { type: Object },
  selection: { type: Boolean, default: false },
  SerialNumber: { type: Boolean, default: false }
})

const emits = defineEmits(['pageChang'])

const pageSize = computed({
  get: () => props.tableConfig.pageData.pageSize,
  set: (val) => emits('pageChang', { pageSize: val })
})

const currentPage = computed({
  get: () => props.tableConfig.pageData.pageNum,
  set: (val) => emits('pageChang', { pageNum: val })
})
</script>
<style lang="less" scoped>
.table {
  .pagination {
    margin-top: 20px;
    justify-content: flex-end;
  }

  :deep(.cellStyle) {
    cursor: pointer;
    .cell {
      white-space: pre-wrap;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      vertical-align: middle;
      .imageContent {
        width: 50px;
        height: 50px;
        margin: 0 auto;
        display: block;
      }
    }
  }
  :deep(.is-dark) {
    line-height: 24px;
    max-width: 600px;
    display: block;
  }
}
</style>
