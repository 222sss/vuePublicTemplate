<template>
  <div class="AppMain">
    <router-view v-slot="{ Component }">
      <keep-alive :include="keepAliveList">
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>
</template>
<script lang="ts" setup>
import { systemStore } from '@/store/index'
const Store = systemStore()
const keepAliveList = ref<Array<string>>([])

const init = () => {
  keepAliveList.value = Store.cacheRouterList.map((item) => {
    return item.path
  })
}

onMounted(() => {
  init()
})
</script>
<style lang="less" scoped>
.AppMain {
  background-color: #fff;
  height: 100%;
  padding: 20px;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
}
</style>
