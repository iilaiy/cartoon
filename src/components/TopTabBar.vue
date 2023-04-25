<template>
  <van-tabs
    v-model:active="active"
    color="#fde23d"
    sticky
    duration="0"
    line-width="25"
  >
    <van-tab
      v-for="(cmp, index) in topTabBarCmpList"
      :key="index"
      :title="cmp.title"
      :to="cmp.routerPath"
      :title-style="titleStyle"
    >
      <slot></slot>
    </van-tab>
  </van-tabs>
</template>

<script setup>
import { reactive, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()

let active = ref(0)
const titleStyle = {
  fontSize: '.42rem',
  color: '#000000',
}
const topTabBarCmpList = reactive([
  {
    title: '发现',
    routerPath: '/',
  },
  {
    title: '推荐',
    routerPath: '/recommend',
  },
  {
    title: '世界',
    routerPath: '/world',
  },
])

watch(
  () => route.path,
  val => {
    topTabBarCmpList.map((item, index) => {
      if (item.routerPath === val) {
        return (active.value = index)
      }
    })
  },
  {
    immediate: true,
  }
)
</script>

<style lang="scss" scoped>
:deep(.van-tab) {
  overflow: auto;
}
:deep(.van-tabs__line) {
  bottom: 0.55rem;
}
</style>
