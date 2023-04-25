<template>
  <div class="manga-anthology" v-if="comics">
    <div class="anthology-top">
      <div class="title">漫画选集</div>
      <div class="purchase" v-if="!is_free">整本购</div>
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
        <div class="image-box">
          <img v-lazy="item.cover_image_url" alt="" />
          <div v-if="item.locked" class="lock-mask"></div>
        </div>
        <span class="text-one-hidden">{{ item.title }}</span>
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
  is_free: {
    type: Boolean,
  },
})

const selectComics = computed(() => {
  let arr = []
  props.comics.map((item, index) => {
    if (index < 7) {
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
    .image-box {
      width: 4.14rem;
      height: 2.3rem;
      position: relative;
      border-radius: 0.2rem;
      overflow: hidden;
      .lock-mask {
        background-color: rgba(0, 0, 0, 0.6);
        background-image: url('@/assets/images/icon/lock.85321eb.png');
        background-position: 50%;
        background-repeat: no-repeat;
        background-size: 0.8rem 0.8rem;
        height: 100%;
        width: 100%;
        left: 0;
        position: absolute;
        top: 0;
      }
    }
    span {
      width: 100%;
      display: block;
      font-size: 0.36rem;
      margin-top: 0.2rem;
    }
  }
  .box:last-child {
    margin-right: 0;
  }
}
.list::-webkit-scrollbar {
  display: none;
}
</style>
