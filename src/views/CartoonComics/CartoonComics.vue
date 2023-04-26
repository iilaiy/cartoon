<template>
  <div class="comics" v-if="!(JSON.stringify(comicsList) == '{}')">
    <van-nav-bar
      :title="comicsList.comic_info.title"
      right-text="全集"
      left-arrow
      @click-right="onClickRight"
    >
      <template #left>
        <div class="nav-bar-left">
          <div class="back" @click="onClickLeft(-1)">
            <i></i>
          </div>
          <div class="tohome" @click="onClickLeft('/')">
            <i></i>
          </div>
        </div>
      </template>
    </van-nav-bar>
    <div class="content">
      <template
        v-for="item in comicsList.comic_info.comic_images"
        :key="item.key"
      >
        <img :style="{ width: item.width }" v-lazy="item.url" alt="" />
      </template>
    </div>
    <div class="chapterButton btns">
      <div class="btn prev" @click="tpChapterButton(-1)">
        <i></i>
        <span>上一篇</span>
      </div>
      <div class="btn next" @click="tpChapterButton(1)">
        <i></i>
        <span>下一篇</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, getCurrentInstance, watch } from 'vue'
import { showToast } from 'vant'
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

const tpChapterButton = type => {
  switch (type) {
    case -1:
      if (comicsList.value.previous_comic_id == null)
        return showToast({
          message: '已经到第一话啦~',
          position: 'bottom',
        })
      router.push({
        path: `/comics/${comicsList.value.previous_comic_id}`,
      })
      break
    case 1:
      if (comicsList.value.next_comic_info.next_comic_id == null)
        return showToast({
          message: '已经到最后一话啦~',
          position: 'bottom',
        })
      router.push({
        path: `/comics/${comicsList.value.next_comic_info.next_comic_id}`,
      })
      break
  }
}

watch(
  () => route.params.id,
  () => {
    if (route.path.split('/')[1] == 'comics') {
      getCarrtonChapterDetailsHandler()
    }
  }
)

// 返回上一页&首页
const onClickLeft = type => {
  if (typeof type == 'number') {
    router.back()
  } else {
    router.push(type)
  }
}
// 全集
const onClickRight = () => {
  router.push({
    path: `/mobile/${comicsList.value.topic_info.id}/list`,
  })
}
</script>

<style lang="scss" scoped>
@import './CartoonComics.scss';
</style>
