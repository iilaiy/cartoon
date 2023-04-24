<template>
  <div class="mob-list">
    <van-nav-bar
      title="标题"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
  </div>
</template>

<script setup>
import { getCurrentInstance, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const { appContext } = getCurrentInstance()
const global = appContext.config.globalProperties
const route = useRoute()
const router = useRouter()

defineProps({
  list: {
    type: Object,
  },
})

onMounted(() => {
  console.log(route.query)
})

const onClickLeft = () => {
  router.back()
}
</script>

<style lang="scss" scoped></style>
