<template>
  <div class="listinfo" v-if="topTabBarList">
    <!-- 榜单信息 -->
    <van-tabs v-model:active="active" color="#fde23d">
      <van-tab
        v-for="(item, index) in topTabBarList.banner_list"
        :key="index"
        :title="item.title"
        :title-style="{ 'font-size': '.42rem', color: '#000000' }"
      ></van-tab>
    </van-tabs>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
const props = defineProps({
  topTabBarList: {
    type: Object,
  },
})
const active = ref(0)
onMounted(() => {
  console.log(props.topTabBarList)
})
</script>

<style lang="scss" scoped></style>
