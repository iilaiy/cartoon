<template>
  <van-tabs v-model:active="active" color="#fde23d" sticky>
    <van-tab
      v-for="(cmp, index) in topTabBarCmpList"
      :key="index"
      :title="cmp.title"
      :to="cmp.routerPath"
      :title-style="{ 'font-size': '.42rem', color: '#000000' }"
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
