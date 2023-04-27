<template>
  <div class="cation" v-if="cation.length > 0">
    <van-nav-bar title="分类" left-arrow @click-left="toBack" />
    <TagCmp :list="cation" @tagsHandler="receiveTagsHandler"></TagCmp>
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

const tagsActive = ref({})

const getCategoryInfoHandler = async params => {
  try {
    const res = await getCategoryInfo(params)
    console.log(res)
    cation.value = res.hits.topicCategories
    cartoonList.value = res.hits.topicMessageList
    global.$store.vshow = false
  } catch (e) {
    console.log(e)
  }
}
getCategoryInfoHandler({ page: page.value })

const receiveTagsHandler = obj => {
  getCategoryInfoHandler({
    page: page.value,
    tag_id: obj.tagId,
    update_status: obj[2].active,
    pay_status: obj[1].active,
    label_dimension_origin: obj[0].active,
    sort: obj[3].active,
    fav_filter: obj.fav_filter,
  })
}

const toBack = () => {
  router.back()
}
</script>

<style lang="scss" scoped>
@import './CartoonClassification.scss';
</style>
