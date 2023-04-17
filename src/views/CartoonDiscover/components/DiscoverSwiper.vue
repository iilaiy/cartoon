<template>
  <div class="banner" v-if="list">
    <van-swipe
      class="my-swipe"
      :autoplay="5000"
      indicator-color="white"
      duration="400"
    >
      <van-swipe-item v-for="(item, index) in list.banner_list" :key="index">
        <img :src="item.image" alt="" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script setup>
defineProps({
  list: {
    type: Object,
  },
})
</script>

<style lang="scss" scoped>
.banner {
  margin-top: 0.4rem;
  .my-swipe {
    height: 3.3rem;
    overflow: hidden;
  }
}
</style>
