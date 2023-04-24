<template>
  <div class="mob-list">
    <van-nav-bar
      :title="route.query.module_title"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="content"></div>
  </div>
</template>

<script setup>
import { getCurrentInstance, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const { appContext } = getCurrentInstance()
const global = appContext.config.globalProperties
const route = useRoute()
const router = useRouter()

const getMoreInfoHandler = async () => {
  global.$store.vshow = false
}
getMoreInfoHandler()

onMounted(() => {
  console.log(route.query)
})

const onClickLeft = () => {
  router.back()
}
</script>

<style lang="scss" scoped>
@import './MoreView.scss';
</style>
