<template>
  <div class="tab-menu" v-if="list">
    <div class="tabs">
      <div class="tab" v-for="item in list.banner_list" :key="item.id">
        <img :src="item.image" alt="" />
        <span>{{ item.title }}</span>
        <i>
          <img :src="item.icon" alt="" />
        </i>
      </div>
    </div>
  </div>
</template>

<script setup>
// import { ref } from 'vue'
defineProps({
  list: {
    type: Object,
  },
})
</script>

<style lang="scss" scoped>
.tabs {
  display: flex;
  justify-content: space-around;
  white-space: nowrap;
  overflow-x: scroll;
  .tab {
    width: 4rem;
    padding: 0.4rem;
    display: flex;
    align-items: center;
    justify-content: space-around;
    background-image: url('@/assets/images/icon/menu-bg.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    img {
      width: 0.6rem;
    }
    span {
      font-size: 0.4rem;
    }
    i {
      img {
        width: 0.4rem;
      }
    }
  }
}
.tabs::-webkit-scrollbar {
  display: none;
}
</style>
