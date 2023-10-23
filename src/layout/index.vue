<template>
  <div class="common-layout">
    <el-container>
      <el-aside
        :width="Store.systemState.SidebarState == 'show' ? '200px' : '64px'"
        ><Sidebar></Sidebar
      ></el-aside>
      <el-container>
        <el-header>
          <Navbar></Navbar>
        </el-header>
        <el-main>
          <AppMain></AppMain>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script lang="ts" setup>
import Navbar from './components/Navbar/index.vue'
import Sidebar from './components/Sidebar/index.vue'
import AppMain from './components/AppMain/index.vue'
import { systemStore } from '@/store/index'
const Store = systemStore()
</script>
<style lang="less" scoped>
.common-layout {
  height: 100vh;
  :deep(.el-container) {
    height: 100%;
    .el-header {
      height: auto;
      padding: 0;
      background-color: #f0f2f5;
    }
    .el-aside::-webkit-scrollbar {
      display: none;
    }
  }
  :deep(.el-main) {
    background-color: #f0f2f5;
  }
}
</style>
