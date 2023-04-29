<template>
  <div class="ranking" v-if="rankList.length > 0">
    <van-nav-bar title="排行榜" left-arrow @click-left="toBack" />
    <div
      class="ranks-banner"
      :style="{ backgroundImage: `url('${rankList[rankActive].image_url}')` }"
    >
      <i class="rank-icon"></i>
      <div class="title">{{ rankList[rankActive].title }}</div>
      <span>{{ rankList[rankActive].next_update_date }}</span>
    </div>
    <div class="main">
      <div class="sidebar-conta">
        <van-sidebar v-model="rankActive">
          <van-sidebar-item
            v-for="item in rankList"
            :key="item.id"
            :title="item.title"
            @click="switchRank(item)"
          />
        </van-sidebar>
      </div>
      <div class="content">
        <div
          class="box"
          v-for="item in resultList"
          :key="item.id"
          @click="toList(item)"
        >
          <div
            class="img-box"
            :style="{ backgroundImage: `url('${item.image_url}')` }"
          >
            <div class="pat">{{ item.right_bottom }}</div>
          </div>
          <div class="right">
            <div class="top">
              <div class="title text-one-hidden">{{ item.title }}</div>
              <div class="description text-two-dot">
                <span>{{ item.description }}</span>
              </div>
              <div class="category">
                <span v-for="(val, i) in item.category" :key="i">{{
                  val
                }}</span>
              </div>
            </div>
            <div class="bottom">
              <div class="rank_message">
                <i
                  class="rank_icon"
                  :style="{ backgroundImage: `url('${item.rank_icon}')` }"
                ></i>
                {{ item.rank_message }}
              </div>
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
  reactive,
  ref,
  onMounted,
  onBeforeUnmount,
} from 'vue'
import { useRouter } from 'vue-router'
import { getListInfo } from '@/api/api'
const { appContext } = getCurrentInstance()
const global = appContext.config.globalProperties

const router = useRouter()

const params = reactive({
  rank_id: 9,
  since: 0,
  limit: 20,
})
const rankActive = ref(0)
const rankList = ref([])
const resultList = ref([])

// 控制触底请求、加载组件
const loading = reactive({
  text: '加载中...',
  show: false,
  size: '24px',
})

const getListInfoHandler = async () => {
  loading.show == true
  try {
    const res = await getListInfo({
      rank_id: params.rank_id,
      since: params.since,
      limit: params.limit,
    })
    // console.log('res',res)

    if (rankList.value.length === 0) {
      rankList.value = res.data.ranks
      global.$store.vshow = false
    }

    if (res.data.since === -1 && res.data.topics.length === 0) {
      loading.show == true
      loading.text = '我是有底线的~'
      loading.size = '0px'
      return
    }

    res.data.topics.map(item => {
      resultList.value.push(item)
    })
    loading.show == false
  } catch (e) {
    console.log(e)
  }
}
getListInfoHandler()

const switchRank = item => {
  params.rank_id = item.id
  // 切换榜单先清空数据再触发请求
  resultList.value = []
  params.since = 0

  loading.show == false
  loading.text = '加载中...'
  loading.size = '24px'

  getListInfoHandler()
}

const lazyLoading = () => {
  const scrollTop =
    document.documentElement.scrollTop || document.body.scrollTop
  const clientHeight = document.documentElement.clientHeight
  const scrollHeight = document.documentElement.scrollHeight
  if (scrollHeight - clientHeight == scrollTop && loading.show == false) {
    params.since += params.limit
    getListInfoHandler()
  }
}

onMounted(() => {
  window.addEventListener('scroll', lazyLoading, false)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', lazyLoading, false)
})

const toList = item => {
  router.push({
    path: `/mobile/${item.id}/list`,
  })
}

const toBack = () => {
  router.back()
}
</script>

<style lang="scss" scoped>
@import './RankingList.scss';
</style>
