<template>
  <div class="container" v-if="!$store.vshow">
    <van-loading type="spinner" class="loading" v-if="changeLoadingShow" />
    <CartoonHeader></CartoonHeader>
    <main class="main">
      <TopTabBar>
        <DiscoverSwiper :list="bannerList[0]"></DiscoverSwiper>
        <TabMenu :list="topTabBarList[0]"></TabMenu>
        <div class="content">
          <ContentsCmp
            class="margin"
            v-for="(item, index) in module_type4"
            :key="index"
            :list="item"
            @cartoonChange="cartoonChangeHandler"
            :loadingShow="changeLoadingShow"
          ></ContentsCmp>
          <CartoonListInfo :listInfo="module_type5[0]"></CartoonListInfo>
        </div>
      </TopTabBar>
    </main>
  </div>
</template>

<script setup>
import { getCurrentInstance, reactive, ref } from 'vue'
import DiscoverSwiper from './components/DiscoverSwiper.vue'
import TabMenu from './components/TabMenu.vue'
import ContentsCmp from './components/ContentsCmp.vue'
import CartoonListInfo from './components/CartoonListInfo.vue'
import CartoonHeader from '@/components/CartoonHeader.vue'
import TopTabBar from '@/components/TopTabBar.vue'
import { getCartoonInfo, getChangeCartoonInfo } from '@/api/api.js'
const { appContext } = getCurrentInstance()
const global = appContext.config.globalProperties

// banner
const bannerList = reactive([])
// top-tab-bar
const topTabBarList = reactive([])
// module_type === 4
const module_type4 = reactive([])
// module_type === 5
const module_type5 = reactive([])
// 控制换一换模块加载组件
const changeLoadingShow = ref(false)
/**
 * 换一换
 */
const cartoonChangeHandler = list => {
  changeLoadingShow.value = true
  getChangeCartoonInfo({
    module_id: list.module_id,
    filter_ids: list.filter_ids,
    card_type: list.card_type,
  }).then(res => {
    module_type4.map((item, index) => {
      if (item.module_id === res.data.module_info.module_id) {
        module_type4[index] = res.data.module_info
      }
    })
    changeLoadingShow.value = false
  })
}

/**
 * 统一数据请求
 */
const getDataAll = async () => {
  try {
    // let times = new Date()
    const res = await getCartoonInfo()
    // 当所有数据请求完毕再进行数据渲染
    console.log(res)
    console.log(' ↑------------- 首页数据 ----------------↑')
    res.data.infos.map(item => {
      switch (item.module_type) {
        case 1:
          bannerList.push(item)
          break
        case 2:
          topTabBarList.push(item)
          break
        case 4:
          module_type4.push(item)
          break
        case 5:
          module_type5.push(item)
          break
      }
    })
    // 隐藏加载组件
    global.$store.vshow = false
  } catch (error) {
    console.log(error)
  }
}
// 组件创建前发起请求
getDataAll()
</script>

<style scoped lang="scss">
@import './CartoonDiscover.scss';
</style>
