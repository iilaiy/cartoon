<template>
  <div class="result">
    <div class="top">
      <div class="title">
        “
        <span>{{ searchValue }}</span>
        ”的搜索结果({{ searchResult.topics.hit.length }})
      </div>
      <ResultBox :resultList="selectSearchResultHandler"></ResultBox>
    </div>
    <div class="more" v-if="searchResult.topics.hit.length - 2 > 0">
      <div class="more-btn" @click="toResultView">
        <span>查看更多搜索结果</span>
        <img src="@/assets/images/icon/min-arrow-right.png" alt="" />
      </div>
    </div>
    <div class="bot" v-if="searchResult.posts.hit.length != 0">
      <div class="title">
        “
        <span>{{ searchValue }}</span>
        ”的相关内容({{ searchResult.posts.hit.length }})
      </div>
      <div class="content">
        <div class="box" v-for="item in searchResult.posts.hit" :key="item.id">
          <div class="img-box">
            <img v-lazy="item.recommendCover.picOriginalUrl" alt="" />
          </div>
          <div class="b-title text-two-dot">
            <span v-if="item.title">{{ item.title }}</span>
            <span v-else>{{ item.summary }}</span>
          </div>
          <div class="info">
            <div class="user">
              <img :src="item.user.avatar_url" alt="" />
              <span class="text-one-hidden">{{ item.user.nickname }}</span>
            </div>
            <div class="link">
              <img src="@/assets/images/icon/link.png" alt="" />
              <span>{{ item.strLikeCount }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import ResultBox from './ResultBox.vue'
const router = useRouter()

const props = defineProps({
  searchResult: {
    type: Object,
  },
  searchValue: {
    type: String,
  },
})

const selectSearchResultHandler = computed(() => {
  const arr = []
  props.searchResult.topics.hit.forEach((item, index) => {
    if (index <= 1) {
      arr.push(item)
    }
  })
  return arr
})

const toResultView = () => {
  router.push({
    path: `/sou/result/${props.searchValue}`,
  })
}
</script>

<style lang="scss" scoped>
.top,
.bot {
  width: 94%;
  margin: 0 auto;
  .title {
    margin-top: 0.1rem;
    font-size: 0.36rem;
    color: #999999;
    span {
      color: #ff8e44;
    }
  }
}

.more {
  padding-bottom: 0.3rem;
  margin-top: 1rem;
  border-bottom: 1px solid #eaeaea;
}
.more-btn {
  width: 40%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999999;
  span {
    font-size: 0.38rem;
  }
  img {
    width: 0.3rem;
  }
}
.bot {
  margin-top: 0.4rem;
  .content {
    padding-top: 0.2rem;
    padding-bottom: 0.2rem;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .box {
      overflow: hidden;
      margin-top: 0.2rem;
      border: 1px solid #f1f1f1;
      border-radius: 0.1rem;
      width: 49%;
      display: flex;
      flex-direction: column;
      .img-box {
        overflow: hidden;
        height: 5rem;
      }
      .b-title,
      .info {
        padding: 0 0.1rem;
      }
      .b-title {
        font-size: 0.36rem;
        margin-top: 0.2rem;
      }
      .info {
        margin: 0.2rem 0;
        display: flex;
        justify-content: space-between;
        color: #999999;
        img {
          margin-right: 0.1rem;
        }
        span {
          font-size: 0.34rem;
        }
        .user {
          width: 60%;
          display: flex;
          align-items: center;
          img {
            width: 0.45rem;
            border-radius: 50%;
          }
        }
        .link {
          display: flex;
          align-items: center;
          img {
            width: 0.38rem;
          }
        }
      }
    }
  }
}
</style>
