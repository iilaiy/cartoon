<template>
  <!-- 详情 -->
  <div class="topicDetail" v-if="!(JSON.stringify(list) == '{}')">
    <van-nav-bar
      :title="list.topic_info.title"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="header-banner">
      <div class="img-box">
        <img :src="list.topic_info.cover_image_url" alt="" />
      </div>
      <div class="mask">
        <div class="base-info">
          <div class="title">
            <h2>{{ list.topic_info.title }}</h2>
          </div>
          <div class="info">
            <span>{{ list.topic_info.popularity_info }}人气值</span>
            <span>{{ list.topic_info.comments_count }}总评论</span>
            <span>{{ list.topic_info.fav_count }}关注</span>
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
          <div
            class="author"
            v-for="val in list.topic_info.user_list"
            :key="val.user_id"
          >
            <img v-lazy="val.avatar" alt="" />
            <span>{{ val.nickname }}</span>
          </div>
        </div>
      </div>
    </div>
    <MangaAnthology
      :update_status="list.topic_info.update_status"
      :comics="list.topic_info.comics"
      :comic_body_count="list.topic_info.comic_body_count"
      :is_free="list.topic_info.is_free"
    ></MangaAnthology>
    <DetailsRecommend
      v-if="list.recommend_topics.length"
      :list="list.recommend_topics"
      :title="`看完《${list.topic_info.title}》的还会看`"
    ></DetailsRecommend>
    <!-- <DetailsRecommend
      v-if="list.bottom_recommend.topic_list.length"
      :list="list.bottom_recommend.topic_list"
      :title="list.bottom_recommend.title"
    ></DetailsRecommend> -->
    <div class="footer">
      <div class="title text-one-hidden">
        {{ list.topic_info.comics[0].title }}
      </div>
      <div class="button">开始阅读</div>
    </div>
  </div>
</template>
<script setup>
import { getCurrentInstance, ref } from 'vue'
import MangaAnthology from './components/MangaAnthology.vue'
import DetailsRecommend from './components/DetailsRecommend.vue'
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
    list.value = res.data
    // console.log(res.data);
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
