<template>
  <div class="banner" v-if="list">
    <van-swipe
      class="my-swipe"
      :autoplay="5000"
      indicator-color="white"
      duration="400"
    >
      <van-swipe-item v-for="(item, index) in bannerList" :key="index">
        <img :src="item.image" alt="" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  list: {
    type: Object,
  },
})

const bannerList = computed(() => {
  const arr = props.list.banner_list
  if (arr.length === 1) {
    arr.push(arr[0])
  }
  return arr
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
