<template>
  <div class="manga-anthology" v-if="comics">
    <div class="anthology-top">
      <div class="title">漫画选集</div>
      <div class="purchase">整本购</div>
    </div>
    <div class="anthology-bot">
      <div class="info">
        <span>{{ update_status }}</span>
        <span>共{{ comics.length }}个内容</span>
        <span>{{ comic_body_count }}篇正文</span>
      </div>
      <div class="more">
        展开选集
        <img src="@/assets/images/icon/min-arrow-right.png" alt="" />
      </div>
    </div>
    <div class="list">
      <div class="box" v-for="item in selectComics" :key="item.id">
        <img :src="item.cover_image_url" alt="" />
        <span class="text-one-hidden">{{ item.title }}</span>
      </div>
      <div class="clickMore">
        <img src="@/assets/images/icon/q-right.png" alt="" />
        <span>查看更多</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({
  comic_body_count: {
    type: Number,
  },
  comics: {
    type: Array,
  },
  update_status: {
    type: String,
  },
})

const selectComics = computed(() => {
  let arr = []
  props.comics.map((item, index) => {
    if (index < 8) {
      arr.push(item)
    }
  })
  return arr
})
</script>

<style lang="scss" scoped>
.manga-anthology {
  padding: 0.8rem 0.3rem;
}
.anthology-top {
  display: flex;
  align-items: center;
  .title {
    font-size: 0.45rem;
    margin-right: 0.2rem;
    color: #333333;
  }
  .purchase {
    background-color: #eed220;
    font-size: 0.3rem;
    border-radius: 0.3rem;
    padding: 0.08rem 0.2rem;
  }
}
.anthology-bot {
  display: flex;
  justify-content: space-between;
  margin: 0.1rem 0;
  font-size: 0.34rem;
  color: #9d9d9d;
  span {
    margin-right: 0.2rem;
    &:after {
      content: '|';
      margin-left: 0.2rem;
    }
  }
  span:last-child {
    &:after {
      display: none;
    }
  }
  .more {
    img {
      width: 0.3rem;
    }
  }
}
.list {
  overflow-x: scroll;
  margin-top: 0.4rem;
  display: flex;
  .box {
    width: 4.14rem;
    margin-right: 0.2rem;
    text-align: center;
    img {
      width: 4.14rem;
      border-radius: 0.2rem;
    }
    span {
      width: 100%;
      display: block;
      font-size: 0.36rem;
      margin-top: 0.1rem;
    }
  }
  .clickMore {
    border-radius: 0.2rem;
    background-color: #f2f2f2;
    font-size: 0.3rem;
    color: #a3a3a3;
    height: 2.35rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0 0.25rem;
    img {
      width: 0.3rem;
    }
  }
}
.list::-webkit-scrollbar {
  display: none;
}
</style>
