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
      <template #nav-right>
        <div class="more"><span>更多</span></div>
      </template>
      <van-tab
        v-for="(item, index) in listInfo.banner_list"
        :key="index"
        :title="item.title"
        :title-style="titleStyle"
      >
      </van-tab>
    </van-tabs>
    <div class="content"></div>
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
  fontSize: '.38rem',
  color: '#000000',
}
onMounted(() => {
  console.log(props.listInfo)
})
</script>

<style lang="scss" scoped>
:deep(.van-tabs__nav) {
  display: flex;
  align-items: center;
}
:deep(.van-tab--active) {
  font-size: 0.44rem !important;
}
.more {
  font-size: 0.32rem;
  flex: 1;
  text-align: right;
}
</style>
