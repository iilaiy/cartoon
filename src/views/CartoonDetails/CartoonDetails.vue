<template>
  <!-- 详情 -->
  <div class="topicDetail" v-if="!(JSON.stringify(list) == '{}')">
    <van-nav-bar
      :title="list.topic_info.title"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="header-banner">
      <img :src="list.topic_info.cover_image_url" alt="" />
      <div class="mask">
        <div class="base-info">
          <div class="title">
            <h2>{{ list.topic_info.title }}</h2>
          </div>
          <div class="info">
            <span>{{ list.topic_info.popularity_info }}人气值</span>
            <span>{{ list.topic_info.comments_count }}总评论</span>
            <span>{{ list.topic_info.likes_count }}关注</span>
          </div>
        </div>
        <div class="follow-button">关注</div>
      </div>
    </div>
    <div class="description">
      <div class="classifications">
        <span v-for="(val, index) in list.topic_info.tags" :key="index">
          {{ val }}
        </span>
      </div>
      <van-text-ellipsis
        rows="2"
        :content="list.topic_info.description"
        expand-text="展开"
        collapse-text="收起"
      />
      <div class="hidden-scrollbar-box">
        <div class="authors hidden-scrollbar">
          <div class="author">
            <img v-lazy="list.topic_info.user.avatar" alt="" />
            <span>{{ list.topic_info.user.nickname }}</span>
          </div>
        </div>
      </div>
    </div>
    <MangaAnthology></MangaAnthology>
  </div>
</template>
<script setup>
import { getCurrentInstance, ref } from 'vue'
import MangaAnthology from './components/MangaAnthology.vue'
import { useRoute, useRouter } from 'vue-router'
import { getCarrtonDetails } from '@/api/api.js'
const route = useRoute()
const router = useRouter()
const { appContext } = getCurrentInstance()
const global = appContext.config.globalProperties

const list = ref({})

const getCarrtonDetailsHandler = async () => {
  try {
    const res = await getCarrtonDetails(route.path.split('/')[2])
    console.log(res)
    console.log(' ↑------------- 详情数据 ----------------↑')
    list.value = res.data
    global.$store.vshow = false
  } catch (e) {
    console.log(e)
  }
}
getCarrtonDetailsHandler()
const onClickLeft = () => {
  router.back()
}
</script>
<style lang="scss" scoped>
@import './CartoonDetails.scss';
</style>
