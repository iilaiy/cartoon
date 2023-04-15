<template>
  <div class="recommended">
    <ContentsCmp
      title="为你推荐"
      :list="selectList({ status: dataShowObj, list: discoverRecommendedList })"
      @ContentsCmpClick="ContentsCmpHandler"
    ></ContentsCmp>
    <ContentsCmp
      title="最新上架"
      :list="selectList({ status: latestShow, list: latestData.data })"
      @ContentsCmpClick="ContentsCmpHandler"
    ></ContentsCmp>
  </div>
</template>

<script setup>
import { reactive, computed } from 'vue'
import { showFailToast } from 'vant'
import { getListInfo, getLatestInfo, getCategoryInfo } from '@/api/api.js'
import ContentsCmp from '@/components/ContentsCmp.vue'

let discoverRecommendedList = reactive([])
// 数据显示
const dataShowObj = reactive({
  sum: 0,
  active: 1,
  num: 6,
})
/**
 * 筛选数据
 *  & 换一换
 */
const selectList = computed(() => {
  return obj => {
    let arr = []
    obj.list.map((item, index) => {
      if (
        (obj.status.active - 1) * obj.status.num <= index &&
        index < (obj.status.active - 1) * obj.status.num + obj.status.num
      ) {
        arr.push(item)
      }
    })
    return arr
  }
})
/**
 *  获取动漫数据 (分类)
 */
const getCartoon = async () => {
  try {
    const res = await getCategoryInfo({
      update_status: 1,
      count: dataShowObj.active * dataShowObj.num,
      sort: 2,
    })
    console.log(' 首页数据 ---- ↓ ')
    console.log(res)
    const topics = res.data.data.topics
    if (topics.length === 0) {
      dataShowObj.active = 1
      getCartoon()
    }
    dataShowObj.sum = parseInt(topics.length / 6 + (topics.length % 6 > 0))
    topics.map((item, index) => {
      discoverRecommendedList[index] = item
    })
  } catch (e) {
    showFailToast('请求失败')
    console.log(e)
  }
}
getCartoon()

/**
 * 获取榜单数据
 */
const getCategoryData = async () => {
  try {
    const res = await getListInfo()
    console.log('榜单数据 --- ⬇')
    console.log(res)
  } catch (e) {
    showFailToast('请求失败')
    console.log(e)
  }
}
getCategoryData()

/**
 * 获取最新上架数据
 */
const latestData = reactive({ data: [] })
const latestShow = reactive({
  sum: 0,
  active: 1,
  num: 6,
})
const getLatestData = async () => {
  try {
    const res = await getLatestInfo()
    console.log('最新数据 --- ⬇')
    console.log(res)
    latestShow.sum = parseInt(
      res.data.data.list.length / 6 + (res.data.data.list.length % 6 > 0)
    )
    latestData.data = res.data.data.list
  } catch (e) {
    showFailToast('请求失败')
    console.log(e)
  }
}
getLatestData()

/**
 * 换一换
 */
const ContentsCmpHandler = obj => {
  console.log(obj)
  switch (obj.type) {
    case '查看更多':
      // 跳转推荐更多页面
      break
    case '换一换':
      // 换一换数据
      switch (obj.name) {
        case '为你推荐':
          dataShowObj.active++
          getCartoon()
          break
        case '最新上架':
          if (latestShow.active < latestShow.sum) {
            latestShow.active++
          } else {
            latestShow.active = 1
          }
          getLatestData()
          break
      }
      break
  }
}
</script>

<style scoped lang="scss">
.recommended {
}
</style>
