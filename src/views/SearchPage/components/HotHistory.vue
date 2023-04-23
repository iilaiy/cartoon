<template>
  <div class="content">
    <div class="hot" v-if="!(JSON.stringify(hotList) == '{}')">
      <div class="top">
        <span class="title">热门搜索</span>
        <i @click="refreshHandler">
          <img src="@/assets/images/icon/refresh-icon.png" alt="" />
        </i>
      </div>
      <div class="info">
        <div
          class="box text-one-hidden"
          v-for="item in hotList.hits.hot_word"
          :key="item.target_id"
          @click="toSearchResultHandler(item.target_title)"
        >
          <span>{{ item.target_title }}</span>
        </div>
      </div>
    </div>
    <div
      class="history"
      v-if="
        !(JSON.stringify(searchHistory) == '{}') && searchHistory.val.length
      "
    >
      <div class="top">
        <span class="title">搜索历史</span>
        <i @click="delHistory(-1)">
          <img src="@/assets/images/icon/del-icon.png" alt="" />
        </i>
      </div>
      <div class="info">
        <div
          class="box"
          v-for="(item, index) in searchHistory.val"
          :key="index"
        >
          <div class="left" @click="toSearchResultHandler(item)">
            <i>
              <img src="@/assets/images/icon/history.png" alt="" />
            </i>
            <span>{{ item }}</span>
          </div>
          <i @click="delHistory(index)">
            <img src="@/assets/images/icon/close.png" alt="" />
          </i>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits([
  'delHistoryHandler',
  'clickToSearchResultHandler',
  'clickRefreshHandler',
])
const props = defineProps({
  hotList: {
    type: Object,
  },
  pageNum: {
    type: Number,
  },
  searchHistory: {
    type: Object,
  },
})

const pageIndex = ref(1)

const refreshHandler = () => {
  // console.log(props.hotList.total)
  if (pageIndex.value < props.hotList.total / props.pageNum) {
    pageIndex.value++
  } else {
    pageIndex.value = 1
  }
  emit('clickRefreshHandler', pageIndex.value)
}

const delHistory = index => {
  emit('delHistoryHandler', index)
}

const toSearchResultHandler = item => {
  // console.log(item)
  emit('clickToSearchResultHandler', item)
}
</script>

<style lang="scss" scoped>
.top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  span {
    font-size: 0.34rem;
    color: #999999;
  }
  i {
    img {
      width: 0.8rem;
    }
  }
}
.hot,
.history {
  width: 94%;
  margin: 0 auto;
}
.hot {
  .info {
    display: flex;
    flex-wrap: wrap;
    .box {
      display: flex;
      align-items: center;
      justify-content: center;
      max-width: 100%;
      margin-top: 0.2rem;
      margin-right: 0.3rem;
      border: 1px solid #e6e6e6;
      border-radius: 0.5rem;
      padding: 0.2rem;
      span {
        font-size: 0.36rem;
      }
    }
  }
}
.history {
  margin-top: 0.4rem;
  .info {
    .box {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #e6e6e6;
      padding-bottom: 0.2rem;
      padding-top: 0.2rem;
      i {
        img {
          width: 0.4rem;
        }
      }
      .left {
        flex: 1;
        display: flex;
        align-items: center;
        span {
          margin-left: 0.2rem;
          font-size: 0.38rem;
        }
      }
    }
  }
}
</style>
