<template>
  <div class="cation" v-if="cation.length > 0">
    <van-nav-bar title="分类" left-arrow @click-left="toBack" />
    <TagCmp :list="cation" @tagsHandler="receiveTagsHandler"></TagCmp>
    <div class="filtration">
      <van-checkbox v-model="tagsActive.fav_filter"
        >过滤已关注漫画</van-checkbox
      >
    </div>
    <ClassifyResult :result="cartoonList"></ClassifyResult>

    <van-loading
      v-if="loading.show"
      :size="loading.size"
      text-size="14px"
      class="loading"
    >
      {{ loading.text }}
    </van-loading>
  </div>
</template>

<script setup>
import {
  ref,
  reactive,
  getCurrentInstance,
  onMounted,
  onBeforeUnmount,
} from 'vue'
import TagCmp from './components/TagCmp.vue'
import ClassifyResult from './components/ClassifyResult.vue'
import { getCategoryInfo } from '@/api/api.js'
import { useRouter } from 'vue-router'
const { appContext } = getCurrentInstance()
const global = appContext.config.globalProperties
const router = useRouter()

const cation = ref([])
const cartoonList = ref([])

const pageSum = ref(0)
const page = ref(1)
const size = ref(20)
const tagsActive = ref({
  tag_id: 0,
  update_status: 0,
  pay_status: 0,
  label_dimension_origin: 0,
  sort: 1,
  fav_filter: 0,
})

// 控制触底请求、加载组件
const loading = reactive({
  text: '加载中...',
  show: false,
  size: '24px',
})

const getCategoryInfoHandler = async () => {
  loading.show == true
  try {
    const res = await getCategoryInfo({
      size: size.value,
      page: page.value,
      tag_id: tagsActive.value.tag_id,
      update_status: tagsActive.value.update_status,
      pay_status: tagsActive.value.update_status,
      label_dimension_origin: tagsActive.value.label_dimension_origin,
      sort: tagsActive.value.sort,
      fav_filter: tagsActive.value.fav_filter,
    })
    // console.log(res)
    if (cation.value.length === 0) {
      cation.value = res.hits.topicCategories
      global.$store.vshow = false
    }
    res.hits.topicMessageList.map(item => {
      cartoonList.value.push(item)
    })
    pageSum.value = Math.ceil(res.total / size.value)
    loading.show == false
  } catch (e) {
    console.log(e)
  }
}
getCategoryInfoHandler()

const receiveTagsHandler = obj => {
  tagsActive.value.tag_id = obj.tagId
  tagsActive.value.update_status = obj[2].active
  tagsActive.value.pay_status = obj[1].active
  tagsActive.value.label_dimension_origin = obj[0].active
  tagsActive.value.sort = obj[3].active

  page.value = 1
  cartoonList.value = []

  loading.text = '加载中...'
  loading.size = '24px'
  loading.show = false

  getCategoryInfoHandler()
}

const lazyLoading = () => {
  const scrollTop =
    document.documentElement.scrollTop || document.body.scrollTop
  const clientHeight = document.documentElement.clientHeight
  const scrollHeight = document.documentElement.scrollHeight
  if (scrollHeight - clientHeight == scrollTop && loading.show == false) {
    page.value++
    if (page.value > pageSum.value) {
      loading.show == true
      loading.text = '我是有底线的~'
      loading.size = '0px'
      return
    }
    getCategoryInfoHandler()
  }
}

onMounted(() => {
  window.addEventListener('scroll', lazyLoading, false)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', lazyLoading, false)
})

const toBack = () => {
  router.back()
}
</script>

<style lang="scss" scoped>
@import './CartoonClassification.scss';
</style>
