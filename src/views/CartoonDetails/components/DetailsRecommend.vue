<template>
  <div class="recommend" v-if="list">
    <div class="recommend-top">
      <div class="title text-one-hidden">{{ title }}</div>
      <div class="more">
        更多
        <img src="@/assets/images/icon/min-arrow-right.png" alt="" />
      </div>
    </div>
    <div class="content">
      <div
        class="cbox"
        v-for="item in list"
        :key="item.id"
        @click="toList(item)"
      >
        <div class="img-box">
          <img v-lazy="item.vertical_image_url" />
          <div v-if="item.update_time" class="concern text-one-hidden">
            {{ item.update_time }}
          </div>
          <div v-else class="concern text-one-hidden">
            {{ item.likes_count }}喜欢
          </div>
        </div>
        <div class="b-title text-one-hidden">{{ item.title }}</div>
        <div class="tags text-one-hidden">
          <template v-if="item.tags">
            <span v-for="(val, index) in item.tags" :key="index">
              {{ val }}
            </span>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

defineProps({
  list: {
    type: Object,
  },
  title: {
    type: String,
  },
})

const toList = item => {
  router.push({
    path: `/mobile/${item.id}/list`,
  })
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/discover/content.scss';
.recommend {
  width: 96%;
  margin: 0 auto;
  margin-bottom: 0.5rem;
}
.recommend-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .title {
    flex: 1;
    font-size: 0.45rem;
    margin-right: 0.2rem;
    color: #333333;
  }
  .more {
    width: 1.2rem;
    font-size: 0.34rem;
    color: #9d9d9d;
    img {
      width: 0.3rem;
    }
  }
}
.content {
  flex-wrap: nowrap;
  overflow-x: scroll;
  .cbox {
    width: 3.4rem;
    margin-right: 0.2rem;
    margin-top: 0.3rem;
    .img-box {
      width: 3.4rem;
      height: 4.5rem;
      img {
        border-radius: 0.2rem;
      }
    }
    .tags {
      color: #999999;
      span {
        margin-right: 0.1rem;
      }
    }
  }
  .cbox:last-child {
    margin-right: 0;
  }
}
.content::-webkit-scrollbar {
  display: none;
}
</style>
