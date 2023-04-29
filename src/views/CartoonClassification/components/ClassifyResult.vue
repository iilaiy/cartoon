<template>
  <div class="result">
    <div class="content" v-if="result.length > 0">
      <div
        class="box"
        v-for="item in result"
        :key="item.id"
        @click="toList(item)"
      >
        <div
          class="img-box"
          :style="{ backgroundImage: `url('${item.vertical_image_url}')` }"
        ></div>
        <div class="bot">
          <div class="title text-one-hidden">{{ item.title }}</div>
          <div class="fav">
            {{
              item.favourite_count > 10000
                ? parseInt(item.favourite_count / 10000) + '万'
                : item.favourite_count
            }}
          </div>
        </div>
      </div>
    </div>
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
import { useRouter } from 'vue-router'
const router = useRouter()

defineProps({
  result: {
    type: Object,
  },
})

const toList = item => {
  router.push({
    path: `/mobile/${item.id}/list`,
  })
}
</script>

<style lang="scss" scoped>
.content {
  width: 96%;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  gap: 0.1rem;
  .box {
    width: calc((100% - 0.2rem) / 3);
    .img-box {
      margin-top: 0.2rem;
      width: 100%;
      min-height: 4rem;
      background-size: cover;
      background-position: center;
    }
    .title {
      font-size: 0.4rem;
      margin-top: 0.1rem;
    }
    .fav {
      font-size: 0.3rem;
      color: #999999;
    }
  }
}
</style>
