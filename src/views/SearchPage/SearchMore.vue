<template>
  <div class="searchmore" v-if="resultList.length > 0">
    <van-nav-bar title="漫画搜索结果" left-arrow @click-left="onClickLeft" />
    <ResultBox :resultList="resultList"></ResultBox>
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
import { getCurrentInstance, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ResultBox from './components/ResultBox.vue'
import { getSearchResult } from '@/api/api.js'
const route = useRoute()
const router = useRouter()
const { appContext } = getCurrentInstance()
const global = appContext.config.globalProperties

const resultList = ref([])

const getSearchResultHandler = async () => {
  try {
    const res = await getSearchResult({ q: route.params.keywords })
    resultList.value = res.data.topics.hit
    global.$store.vshow = false
  } catch (e) {
    console.log(e)
  }
}
getSearchResultHandler()

// 返回
const onClickLeft = () => {
  router.back()
}
</script>

<style lang="scss" scoped>
:deep(.van-nav-bar .van-icon) {
  color: #000000;
}
:deep(.van-nav-bar__title) {
  font-weight: normal;
  max-width: 50%;
}
.content {
  width: 94%;
  margin: 0 auto;
  padding-bottom: 0.3rem;
}
</style>
