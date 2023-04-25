<template>
  <div class="_404">
    <h2 class="m-0">
      抱歉，页面未找到，
      <span>{{ tim }}</span>
      s后自动跳转到
      <a href="javascript:;" @click="goHome">首页</a>
    </h2>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const tim = ref(5)
var times = null
onMounted(() => {
  times = setInterval(() => {
    tim.value--
    if (tim.value === 0) {
      goHome()
    }
  }, 1000)
})

const goHome = () => {
  clearInterval(times)
  router.replace({
    path: '/',
  })
}
</script>

<style lang="scss" scoped>
._404 {
  width: 100vw;
  height: 100vh;
  background-color: #f7f7f7;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .m-0 {
    width: 90%;
    font-size: 0.45rem;
    font-weight: 600;
    span {
      color: #dcd178;
      font-weight: 800;
      font-size: 0.5rem;
    }
    a {
      color: #000506;
      text-decoration: underline;
    }
  }
}
</style>
