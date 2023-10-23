<template>
  <div>
    <el-menu
      default-active="2"
      class="sidebar-menu"
      active-text-color="#ffd04b"
      background-color="#545c64"
      text-color="#fff"
      router
      :unique-opened="true"
      :collapse="Store.systemState.SidebarState == 'show' ? false : true"
    >
      <SubMenu :MenuList="Store.SidebarList"></SubMenu>
    </el-menu>
  </div>
</template>
<script lang="ts" setup>
import { systemStore } from '@/store/index'
import SubMenu from './components/SubMenu.vue'
const Store = systemStore()
</script>
<style lang="less" scoped>
.sidebar-menu {
  height: 100vh;
  :deep(.el-sub-menu__title) {
    height: 46px;
  }
  :deep(.el-menu-item) {
    height: 46px;
  }
}
</style>
