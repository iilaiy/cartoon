<template>
  <div class="banner">
    <van-swipe
      class="my-swipe"
      :autoplay="5000"
      indicator-color="white"
      duration="400"
    >
      <van-swipe-item v-for="(item, index) in bannerList" :key="index">
        <img :src="item.imgPath" alt="" />
      </van-swipe-item>
    </van-swipe>
  </div>
  <div class="tab-menu">
    <van-tabs
      v-model:active="active"
      line-height="0"
      line-width="0"
      :ellipsis="false"
    >
      <van-tab v-for="(item, index) in tabMenuList" :key="index">
        <template #title>
          <div class="menu-silder">
            <i>
              <img :src="item.icon" alt="" />
            </i>
            <span>{{ item.name }}</span>
          </div>
        </template>
      </van-tab>
    </van-tabs>
  </div>
  <div class="main">
    <DiscoverRecommended></DiscoverRecommended>
  </div>
</template>

<script setup>
import { ref, reactive, getCurrentInstance } from 'vue'
import DiscoverRecommended from './components/DiscoverRecommended.vue'

const { appContext } = getCurrentInstance()
const global = appContext.config.globalProperties

const bannerList = reactive([
  {
    imgPath: '/images/banner/khunOPxWM.png',
  },
  {
    imgPath: '/images/banner/ilhRrHqPu.webp-t.w720.jpg',
  },
])

const active = ref(0)
const tabMenuList = reactive([
  {
    name: '作品分类',
    icon: global.getAssetsImages('icon/Afymd48ND.png'),
  },
  {
    name: '作品排行',
    icon: global.getAssetsImages('icon/ibEM9nuy6.png'),
  },
  {
    name: '免费领K币',
    icon: global.getAssetsImages('icon/GOeyzQzND.png'),
  },
])
</script>

<style scoped lang="scss">
.banner {
  margin-top: 0.4rem;
  overflow: hidden;
  .my-swipe {
    height: 3.3rem;
  }
}
.tab-menu {
  height: 1.7rem;
  display: flex;
  align-items: center;
  .menu-silder {
    display: flex;
    font-weight: normal;
    align-items: center;
    color: #000000;
    font-size: 0.4rem;
    img {
      width: 0.6rem;
      margin-right: 0.1rem;
    }
  }
}
</style>
