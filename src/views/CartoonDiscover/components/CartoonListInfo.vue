<template>
  <div class="listinfo" v-if="listInfo">
    <!-- 榜单信息 -->
    <van-tabs
      v-model:active="active"
      color="#fde23d"
      line-height="0"
      line-width="0"
      shrink
    >
      <van-tab
        v-for="(item, index) in listInfo.banner_list"
        :key="index"
        :title="item.title"
        :title-style="titleStyle"
      ></van-tab>
    </van-tabs>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
const props = defineProps({
  listInfo: {
    type: Object,
  },
})
const active = ref(0)
const titleStyle = {
  fontSize: '.35rem',
  color: '#000000',
}
onMounted(() => {
  console.log(props.listInfo)
})
</script>

<style lang="scss" scoped>
:deep(.van-tab--active) {
  font-size: 0.4rem !important;
}
</style>
