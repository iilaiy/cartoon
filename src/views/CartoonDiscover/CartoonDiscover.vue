<template>
  <CartoonHeader v-if="!$store.vshow"></CartoonHeader>
  <main class="main" v-if="!$store.vshow">
    <TopTabBar>
      <DiscoverSwiper :list="homeArray.data[0]"></DiscoverSwiper>
      <TabMenu :list="homeArray.data[1]"></TabMenu>
      <div class="content">
        <ContentsCmp
          v-for="(item, index) in selectCartoonList"
          :key="index"
          :list="item"
          :num="3"
          @ContentsCmpClick="ContentsCmpHandler"
        ></ContentsCmp>
      </div>
    </TopTabBar>
  </main>
</template>

<script setup>
import { computed, getCurrentInstance, reactive } from 'vue'
import DiscoverSwiper from './components/DiscoverSwiper.vue'
import TabMenu from './components/TabMenu.vue'
import ContentsCmp from './components/ContentsCmp.vue'
import CartoonHeader from '@/components/CartoonHeader.vue'
import TopTabBar from '@/components/TopTabBar.vue'
import {
  getCartoonInfo,
  getUpdatedDailyInfo,
  getChangeCartoonInfo,
} from '@/api/api.js'
const { appContext } = getCurrentInstance()
const global = appContext.config.globalProperties

// 首页数据
const homeArray = reactive({ data: [] })

// 每日更新
// const dailyUpdateList = reactive({ data: [] })
// const dailyUpdateStatus = reactive({
//   title: '每日更新',
//   pageIndex: 1,
//   pageNum: 6,
//   pageSum: 1,
//   newList: [],
// })

/**
 * 数据处理
 * @function selectCartoonList
 *  module_type === 4
 */
const selectCartoonList = computed(() => {
  const arr = []
  homeArray.data.map(item => {
    if (item.module_type === 4) {
      arr.push(item)
    }
  })
  return arr
})

// const cartoonCalculationHandler = (obj, list, callback) => {
//   obj.pageSum = parseInt(
//     list.length / obj.pageNum + (list.length % obj.pageNum > 0),
//   )
//   callback(obj, list)
// }
// const selectCartoonList = (obj, list, bool = false) => {
//   if (bool) {
//     if (obj.pageIndex < obj.pageSum) {
//       obj.pageIndex++
//     } else {
//       obj.pageIndex = 1
//     }
//   }
//   obj.newList = []
//   list.map((item, index) => {
//     if (
//       (obj.pageIndex - 1) * obj.pageNum <= index &&
//       index < (obj.pageIndex - 1) * obj.pageNum + obj.pageNum
//     ) {
//       obj.newList.push(item)
//       // 当数组长度满足一次渲染的条数时不再继续循环
//       if (obj.newList.length === obj.pageNum) return
//     }
//   })
// }

/**
 * 查看更多&换一换
 */
const ContentsCmpHandler = obj => {
  switch (obj.type) {
    case '查看更多':
      break
    case '换一换':
      getChangeCartoonInfo({
        module_id: obj.list.module_id,
        filter_ids: obj.list.filter_ids,
        card_type: obj.list.card_type,
      }).then(res => {
        homeArray.data.map((item, index) => {
          if (item.module_id === res.data.module_info.module_id) {
            homeArray.data[index] = res.data.module_info
          }
        })
      })
      break
  }
}

/**
 * 统一数据请求
 */
const getDataAll = async () => {
  try {
    let times = new Date()
    const res = await getCartoonInfo()
    // 当所有数据请求完毕再进行数据渲染
    const res2 = await getUpdatedDailyInfo(times.getDay())
    console.log('首页数据 --- 😊')
    console.log(res)
    console.log('每日数据 --- 😊')
    console.log(res2)
    homeArray.data = res.data.infos
    // dailyUpdateList.data = res2.data.topics
    // cartoonCalculationHandler(
    //   dailyUpdateStatus,
    //   dailyUpdateList.data,
    //   selectCartoonList,
    // )
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
