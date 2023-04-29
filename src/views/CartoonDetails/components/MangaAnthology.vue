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
      <div class="more" @click="showBottom = true">
        展开选集
        <img src="@/assets/images/icon/min-arrow-right.png" alt="" />
      </div>
    </div>
    <div class="list">
      <div
        class="box"
        v-for="item in selectComics"
        :key="item.id"
        @click="toCartoonChapterHandler(item)"
      >
        <div class="image-box">
          <img v-lazy="item.cover_image_url" alt="" />
          <div v-if="item.locked" class="lock-mask"></div>
        </div>
        <span class="text-one-hidden">{{ item.title }}</span>
      </div>
    </div>
    <!-- 底部弹出 -->
    <van-popup
      class="popup"
      v-model:show="showBottom"
      position="bottom"
      :style="{ height: '70%' }"
    >
      <div class="popup-top">
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
          <div class="sort" @click="sortHandler">
            <div :class="['btn', sort === 1 ? 'btn-active' : '']">正序</div>
            <div :class="['btn', sort === 0 ? 'btn-active' : '']">倒叙</div>
          </div>
        </div>
      </div>
      <div class="popup-content">
        <div
          class="popup-box"
          v-for="item in sortComics"
          :key="item.id"
          @click="toCartoonChapterHandler(item)"
        >
          <div
            class="image-box"
            :style="{ backgroundImage: `url('${item.cover_image_url}')` }"
          >
            <div v-if="item.locked" class="lock-mask"></div>
          </div>
          <div class="right">
            <div class="title text-one-hidden">{{ item.title }}</div>
            <span class="data">{{ item.created_at }}</span>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const showBottom = ref(false)
const sort = ref(1)

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
  const arr = []
  props.comics.map((item, index) => {
    if (index < 7) {
      arr.push(item)
    }
  })
  return arr
})

const sortComics = computed(() => {
  const arr = []
  props.comics.forEach(item => {
    sort.value === 0 ? arr.unshift(item) : arr.push(item)
  })
  return arr
})

// 切换排序
const sortHandler = () => {
  sort.value = sort.value === 1 ? 0 : 1
}

const toCartoonChapterHandler = item => {
  // console.log(item)
  router.push({
    path: `/comics/${item.id}`,
  })
}
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
.image-box {
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
.popup-top {
  padding-top: 0.5rem;
  padding-left: 0.3rem;
  padding-right: 0.3rem;
}
:deep(.van-popup) {
  border-top-left-radius: 0.2rem;
  border-top-right-radius: 0.2rem;
}
.sort {
  display: flex;
  width: 2rem;
  height: 0.6rem;
  justify-content: space-around;
  align-items: center;
  background-color: #f7f9fa;
  border-radius: 0.3rem;
  .btn {
    width: 0.8rem;
    height: 0.5rem;
    color: #999999;
    border-radius: 0.3rem;
    text-align: center;
    font-size: 0.3rem;
  }
  .btn-active {
    color: #333333;
    background-color: #ffffff;
  }
}
.popup-content {
  width: 94%;
  margin: 0 auto;
  padding-bottom: 0.4rem;
  .popup-box {
    margin-top: 0.3rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .image-box {
      width: 3rem;
      height: 1.5rem;
      background-size: cover;
      background-position: center;
    }
    .right {
      width: calc(100% - 3.3rem);
      .title {
        font-size: 0.4rem;
      }
      .data {
        font-size: 0.35rem;
        color: #999999;
      }
    }
  }
}
</style>
