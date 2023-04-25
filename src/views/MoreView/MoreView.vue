<template>
  <div class="mob-list">
    <van-nav-bar
      :title="route.query.module_title"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="content">
      <div
        class="item"
        v-for="item in moreList"
        :key="item.id"
        @click.stop="toList(item)"
      >
        <div class="img-box">
          <img v-lazy="item.cover_image_url" alt="" />
        </div>
        <div class="right">
          <div class="top">
            <div class="title text-one-hidden">
              {{ item.title }}
            </div>
            <div class="button" @click.stop="payAttentionTo">+ 关注</div>
          </div>
          <div class="tags">
            <span v-for="(val, i) in item.category" :key="i">
              {{ val }}
            </span>
          </div>
          <div class="b-bot">
            <div class="favourite">
              <img src="@/assets/images/icon/link.png" alt="" />
              <span>
                {{
                  item.like_count > 100000
                    ? (item.like_count / 100000).toFixed(2) + '万'
                    : item.like_count
                }}
              </span>
            </div>
            <div class="comment">
              <img src="@/assets/images/icon/comment.png" alt="" />
              <span>
                {{
                  item.comment_count > 100000
                    ? (item.comment_count / 100000).toFixed(2) + '万'
                    : item.comment_count
                }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <van-loading
      v-if="loading.show"
      :size="loading.size"
      text-size="14px"
      class="loading"
    >
      {{ loading.text }}
    </van-loading>
    <van-back-top
      style="
        background-color: #ffffff;
        box-shadow: 1px 1px 5px #e0e0e0;
        color: #5e6267;
      "
    />
  </div>
</template>

<script setup>
import {
  getCurrentInstance,
  ref,
  reactive,
  onMounted,
  onBeforeUnmount,
} from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getMoreCartoonInfo } from '@/api/api.js'
const { appContext } = getCurrentInstance()
const global = appContext.config.globalProperties
const route = useRoute()
const router = useRouter()

const moreList = reactive([])
const since = ref(0)
const limit = ref(20)
// 控制触底请求、加载组件
const loading = reactive({
  text: '加载中...',
  show: false,
  size: '24px',
})

const getMoreInfoHandler = async () => {
  loading.show = true
  try {
    const res = await getMoreCartoonInfo({
      since: since.value * limit.value,
      limit: limit.value,
      card_type: route.query.card_type,
      module_id: route.query.module_id,
    })
    if (res.data.topics.length == 0) {
      window.removeEventListener('scroll', lazyLoading, false)
      loading.text = '我是有底线的~'
      loading.size = '0px'
      return
    }
    res.data.topics.forEach(item => {
      moreList.push(item)
    })
    // console.log(res)
    loading.show = false
    global.$store.vshow = false
  } catch (e) {
    console.log(e)
  }
}
getMoreInfoHandler()

// 触底加载更多
const lazyLoading = () => {
  // // 滚动到底部，再加载的处理事件
  const scrollTop =
    document.documentElement.scrollTop || document.body.scrollTop
  const clientHeight = document.documentElement.clientHeight
  const scrollHeight = document.documentElement.scrollHeight
  if (scrollHeight - clientHeight == scrollTop && loading.show == false) {
    // 滚动到底部，逻辑代码
    since.value++
    //记住滚动到底的时候，当前页需要加1
    getMoreInfoHandler()
  }
}

onMounted(() => {
  window.addEventListener('scroll', lazyLoading, false)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', lazyLoading, false)
})

const onClickLeft = () => {
  router.back()
}

const toList = item => {
  router.push({
    path: `/mobile/${item.id}/list`,
    query: {
      module_type: route.query.module_type,
      module_title: route.query.title,
      module_id: route.query.module_id,
    },
  })
}

const payAttentionTo = () => {
  console.log('关注')
}
</script>

<style lang="scss" scoped>
@import './MoreView.scss';
</style>
