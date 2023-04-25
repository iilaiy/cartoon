<template>
  <div class="recommend" v-if="listArray.length">
    <CartoonHeader></CartoonHeader>
    <TopTabBar>
      <div class="content">
        <div class="box" v-for="item in listArray" :key="item.comic_id">
          <div class="top">
            <div class="title" @click="toList(item)">{{ item.title.text }}</div>
            <div class="pay-attention-to">关注</div>
          </div>
          <div class="tags">
            <div
              class="tag"
              v-for="(val, i) in item.recommend_tag"
              :key="i"
              :style="{
                color: val.text_mask,
                backgroundColor: val.background_mask,
              }"
            >
              <span>{{ val.title }}</span>
              <img :src="val.behind_icon" alt="" />
            </div>
          </div>
          <div class="img-box">
            <img v-lazy="item.cover_image_info.images[0].url" alt="" />
          </div>
          <div class="bot">
            <div class="title">
              {{ item.sub_title }}
            </div>
            <div class="link">
              <img src="@/assets/images/icon/link-icon.png" alt="" />
              <span>{{ item.like_count }}</span>
            </div>
          </div>
        </div>
      </div>
    </TopTabBar>
  </div>
</template>

<script setup>
import { getCurrentInstance, ref } from 'vue'
import CartoonHeader from '@/components/CartoonHeader.vue'
import TopTabBar from '@/components/TopTabBar.vue'
// import { getCarrtonRecommend } from '@/api/api.js'
import cards from '@/data/recommend.js'
import { useRouter } from 'vue-router'
const router = useRouter()
const { appContext } = getCurrentInstance()
const global = appContext.config.globalProperties

const listArray = ref([])
listArray.value = cards
global.$store.vshow = false

// const getCarrtonRecommendHandler = async () => {
//   try {
//     const res = await getCarrtonRecommend()
//     console.log(res)
//     listArray.value = res.data.cards
//     global.$store.vshow = false
//   } catch (e) {
//     console.log(e)
//   }
// }
// getCarrtonRecommendHandler()

const toList = item => {
  router.push({
    path: `/mobile/${item.topic_id}/list`,
  })
}
</script>

<style scoped lang="scss">
@import './CartoonRecommend.scss';
</style>
