<template>
  <div class="listinfo">
    <!-- 榜单信息 -->
    <van-tabs v-model:active="active" color="#fde23d">
      <van-tab
        v-for="(cmp, index) in topTabBarList"
        :key="index"
        :title="cmp.title"
        :title-style="{ 'font-size': '.42rem', color: '#000000' }"
      >
        <slot></slot>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script setup>
defineProps({
  topTabBarList: {
    type: Object,
  },
})
</script>

<style lang="scss" scoped></style>
