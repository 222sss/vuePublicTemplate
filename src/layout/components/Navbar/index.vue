import { he } from 'element-plus/es/locale';
<template>
  <div class="NavbarTabs">
    <div class="Navbar">
      <div class="left">
        <div class="menuOperate" @click="menuClick">
          <el-icon size="20" v-show="Store.systemState.SidebarState == 'show'">
            <i-ep-Fold
          /></el-icon>
          <el-icon size="20" v-show="Store.systemState.SidebarState == 'hide'">
            <i-ep-Expand
          /></el-icon>
        </div>
        <div class="breader">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item
              v-for="(item, index) in breaderList"
              :key="index"
              >{{ item.name }}</el-breadcrumb-item
            >
          </el-breadcrumb>
        </div>
      </div>
      <div class="right">
        <div>
          <el-dropdown>
            <div class="user">
              <div class="userLog">
                <img
                  data-v-50bb1d33=""
                  src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80"
                  class="user-avatar"
                />
              </div>
              杨秋泽
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="a">Action 1</el-dropdown-item>
                <el-dropdown-item command="b">Action 2</el-dropdown-item>
                <el-dropdown-item command="c">Action 3</el-dropdown-item>
                <el-dropdown-item command="d" disabled
                  >Action 4</el-dropdown-item
                >
                <el-dropdown-item command="e" divided
                  >Action 5</el-dropdown-item
                >
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
        <div class="userOperate"></div>
      </div>
    </div>
    <div class="Tabs">
      <el-button
        type="primary"
        v-for="(item, index) in Store.cacheRouterList"
        :key="index"
        @click="goCacheItemRouter(item.path)"
        >{{ item.name }}
        <el-icon
          style="margin-left: 5px"
          v-if="item.path != '/home'"
          @click.stop="deleteCacheItem(item.path)"
          ><Delete
        /></el-icon>
      </el-button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import router from '@/router'
import { systemStore } from '@/store/index'
import { Delete } from '@element-plus/icons-vue'

const route = useRoute()
const Store = systemStore()

// 面包屑列表
const breaderList = ref()

// 页面初始化
const init = () => {
  // 初始化当前面包屑
  breaderList.value = route.matched
}

// 删除标签页
const deleteCacheItem = (item) => {
  Store.deleteCacheItem(item)
}

// 跳转到对应的标签页
const goCacheItemRouter = (item) => {
  router.push(item)
}

// 切换菜单形态
const menuClick = () => {
  Store.systemState.SidebarState == 'show'
    ? Store.setSidebarState('hide')
    : Store.setSidebarState('show')
}

// 监听路由变化,根据变化生成面包屑
watch(
  () => route.matched,
  (newValue: any) => {
    breaderList.value = newValue
  }
)

onMounted(() => {
  init()
})
</script>
<style lang="less" scoped>
.NavbarTabs {
  .Navbar {
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    margin-bottom: 5px;
    background-color: #fff;
    .right {
      .user {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        cursor: pointer;
        .userLog {
          width: 40px;
          height: 40px;
          border-radius: 6px;
          overflow: hidden;
          margin-right: 8px;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
    .left {
      .menuOperate {
        cursor: pointer;
        height: 20px;
        margin-right: 10px;
      }
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }
  }
  .Tabs {
    background-color: #fff;
    padding: 10px 20px;
    overflow: auto;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: nowrap;
  }

  /* 水平滚动条样式 */
  /* 高度 */
  .Tabs::-webkit-scrollbar {
    height: 8px;
  }
  /* 背景色 */
  .Tabs::-webkit-scrollbar-track {
    background-color: #f5f5f5;
  }
  /* 滑块颜色 */
  .Tabs::-webkit-scrollbar-thumb {
    background-color: #c1c1c1;
    border-radius: 4px;
  }
}
</style>
