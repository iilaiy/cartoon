<template>
  <div class="mob-list">
    <van-nav-bar
      :title="route.query.module_title"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="content">
      <div class="item" v-for="item in moreList" :key="item.id">
        <div class="img-box">
          <img v-lazy="item.cover_image_url" alt="" />
        </div>
        <div class="right">
          <div class="top">
            <div class="title text-one-hidden">
              {{ item.title }}
            </div>
            <div class="button">+ 关注</div>
          </div>
          <div class="tags">
            <span v-for="(val, i) in item.category" :key="i">
              {{ val }}
            </span>
          </div>
          <div class="b-bot">
            <div class="favourite">
              <img src="@/assets/images/icon/link.png" alt="" />
              <span>{{
                item.like_count > 100000
                  ? (item.like_count / 100000).toFixed(2) + '万'
                  : item.like_count
              }}</span>
            </div>
            <div class="comment">
              <img src="@/assets/images/icon/comment.png" alt="" />
              <span>{{
                item.comment_count > 100000
                  ? (item.comment_count / 100000).toFixed(2) + '万'
                  : item.comment_count
              }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getCurrentInstance, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getMoreCartoonInfo } from '@/api/api.js'
const { appContext } = getCurrentInstance()
const global = appContext.config.globalProperties
const route = useRoute()
const router = useRouter()

const moreList = ref([])

const getMoreInfoHandler = async () => {
  try {
    const res = await getMoreCartoonInfo({
      since: 0,
      limit: 20,
      card_type: route.query.card_type,
      module_id: route.query.module_id,
    })
    moreList.value = res.data.topics
    console.log(res)
    global.$store.vshow = false
  } catch (e) {
    console.log(e)
  }
}
getMoreInfoHandler()

const onClickLeft = () => {
  router.back()
}
</script>

<style lang="scss" scoped>
@import './MoreView.scss';
</style>
