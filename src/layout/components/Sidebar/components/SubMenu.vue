<template>
  <template v-for="(item, index) in MenuList" :key="index">
    <el-sub-menu
      v-if="item.children && item.children.length > 0"
      :index="item.path"
    >
      <template #title>
        <el-icon><i-ep-Search /></el-icon>
        <span>{{ item.name }}</span>
      </template>
      <SubMenu :MenuList="item.children"></SubMenu>
    </el-sub-menu>
    <el-menu-item :index="item.path" v-else>
      <span>{{ item.name }}</span>
    </el-menu-item>
  </template>
</template>

<script setup>
defineProps({
  MenuList: {
    type: Object
  }
})
</script>
