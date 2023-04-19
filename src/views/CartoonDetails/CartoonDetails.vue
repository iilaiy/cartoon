<template>
  <!-- 详情 -->
  <!-- v-if="list.length" -->
  <div class="container">
    <van-nav-bar title="标题" left-arrow @click-left="onClickLeft" />
  </div>
</template>
<script setup>
import { getCurrentInstance, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getCarrtonDetails } from '@/api/api.js'
const route = useRoute()
const router = useRouter()
const { appContext } = getCurrentInstance()
const global = appContext.config.globalProperties
global.$store.vshow = false

const list = reactive([])

const getCarrtonDetailsHandler = async () => {
  try {
    const res = await getCarrtonDetails(route.path.split('/')[2])
    console.log(res)
    console.log(' ↑------------- 详情数据 ----------------↑')
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
