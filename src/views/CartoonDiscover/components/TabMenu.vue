<template>
  <div class="tab-menu" v-if="list">
    <van-tabs
      v-model:active="tabMenuActive"
      line-height="0"
      line-width="0"
      :ellipsis="false"
    >
      <van-tab v-for="(item, index) in list.banner_list" :key="index">
        <template #title>
          <div class="menu-silder">
            <i>
              <img :src="item.image" alt="" />
            </i>
            <span>{{ item.title }}</span>
          </div>
        </template>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script setup>
import { ref } from 'vue'
defineProps({
  list: {
    type: Object,
  },
})
const tabMenuActive = ref(0)
</script>

<style lang="scss" scoped>
.tab-menu {
  height: 1.7rem;
  display: flex;
  align-items: center;
  .menu-silder {
    display: flex;
    font-weight: normal;
    align-items: center;
    color: #000000;
    font-size: 0.42rem;
    img {
      width: 0.6rem;
      margin-right: 0.1rem;
    }
  }
}
</style>
