<template>
  <div class="cation" v-if="cartoonList.length > 0">
    <van-nav-bar title="分类" left-arrow @click-left="toBack" />
    <TagCmp :list="cation"></TagCmp>
  </div>
</template>

<script setup>
import { ref, getCurrentInstance } from 'vue'
import TagCmp from './components/TagCmp.vue'
import { getCategoryInfo } from '@/api/api.js'
import { useRouter } from 'vue-router'
const { appContext } = getCurrentInstance()
const global = appContext.config.globalProperties
const router = useRouter()

const cation = ref([])
const page = ref(1)
const cartoonList = ref([])

const getCategoryInfoHandler = async () => {
  try {
    const res = await getCategoryInfo({ page: page.value })
    console.log(res)
    cation.value = res.hits.topicCategories
    cartoonList.value = res.hits.topicMessageList
    global.$store.vshow = false
  } catch (e) {
    console.log(e)
  }
}
getCategoryInfoHandler()

const toBack = () => {
  router.back()
}
</script>

<style lang="scss" scoped>
@import './CartoonClassification.scss';
</style>
