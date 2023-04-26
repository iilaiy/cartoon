<template>
  <div class="comics" v-if="!(JSON.stringify(comicsList) == '{}')">
    <van-nav-bar
      :title="comicsList.comic_info.title"
      right-text="全集"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
  </div>
</template>

<script setup>
import { ref, getCurrentInstance } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getCarrtonChapterDetails } from '@/api/api.js'
const { appContext } = getCurrentInstance()
const global = appContext.config.globalProperties

const route = useRoute()
const router = useRouter()

const comicsList = ref({})

/**
 * 获取漫画章节详情
 */
const getCarrtonChapterDetailsHandler = async () => {
  try {
    const res = await getCarrtonChapterDetails(route.params.id)
    console.log(res)
    comicsList.value = res.data
    global.$store.vshow = false
  } catch (e) {
    console.log(e)
  }
}
getCarrtonChapterDetailsHandler()

// 返回上一页
const onClickLeft = () => {
  router.back()
}
// 全集
const onClickRight = () => {}
</script>

<style lang="scss" scoped>
@import './CartoonComics.scss';
</style>
