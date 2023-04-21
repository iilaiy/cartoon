<template>
  <div class="world" v-if="infoList.length">
    <CartoonHeader></CartoonHeader>
    <TopTabBar>
      <div class="content">
        <div class="column" v-for="i in 2" :key="i">
          <div
            class="box"
            v-for="item in i == 1 ? parity() : parity(true)"
            :key="item.post.id"
          >
            <div class="img-box">
              <img v-lazy="item.post.recommendCover.picOriginalUrl" alt="" />
            </div>
            <div class="title text-two-dot" v-if="item.post.title">
              {{ item.post.title }}
            </div>
            <div class="title text-two-dot" v-else>{{ item.post.summary }}</div>
            <div class="bot">
              <div class="author">
                <img v-lazy="item.post.user.avatar_url" alt="" />
                <span>{{ item.post.user.nickname }}</span>
              </div>
              <div class="link">
                <img src="@/assets/images/icon/link-icon.png" alt="" />
                <span>{{ item.post.likeCount }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TopTabBar>
  </div>
</template>

<script setup>
import { getCurrentInstance, ref, computed } from 'vue'
import CartoonHeader from '@/components/CartoonHeader.vue'
import TopTabBar from '@/components/TopTabBar.vue'
import { getCartoonWorldInfo } from '@/api/api.js'
const { appContext } = getCurrentInstance()
const global = appContext.config.globalProperties

const infoList = ref([])

const getCartoonWorldInfoHandler = async () => {
  try {
    const res = await getCartoonWorldInfo()
    // console.log(res)
    infoList.value = res.data.universalModels
    global.$store.vshow = false
  } catch (e) {
    console.log(e)
  }
}
getCartoonWorldInfoHandler()

const parity = computed(() => {
  return (evenAumber = false) => {
    const arr = []
    infoList.value.map((item, index) => {
      if ((index % 2 == 0) != evenAumber) {
        arr.push(item)
      }
    })
    return arr
  }
})
</script>

<style scoped lang="scss">
.content {
  display: flex;
  justify-content: space-between;
  width: 96%;
  margin: 0 auto;
}
.column {
  width: 49%;
  .box {
    border: 1px solid #f6f6f6;
    border-radius: 0.2rem;
    margin: 0.2rem 0;
    overflow: hidden;
  }
  .title {
    padding-left: 0.15rem;
    font-size: 0.36rem;
    color: #333333;
    margin-top: 0.3rem;
    margin-bottom: 0.1rem;
  }
  .bot {
    margin-right: 0.15rem;
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.3rem;
    span {
      font-size: 0.3rem;
      color: #a7a7a7;
    }
    .author {
      margin-left: 0.15rem;
      img {
        width: 0.5rem;
        border-radius: 50%;
        margin-right: 0.1rem;
      }
    }
    .link {
      display: flex;
      align-items: center;
      img {
        width: 0.4rem;
        margin-right: 0.1rem;
      }
    }
  }
}
</style>
