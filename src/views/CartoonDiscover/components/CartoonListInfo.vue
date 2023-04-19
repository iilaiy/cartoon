<template>
  <div class="listinfo" v-if="listInfo">
    <!-- 榜单信息 -->
    <van-tabs
      v-model:active="active"
      color="#fde23d"
      line-height="0"
      line-width="0"
      shrink
    >
      <template #nav-right>
        <div class="more">
          <span>更多</span
          ><i><img src="@/assets/images/icon/arrow-right.png" alt="" /></i>
        </div>
      </template>
      <van-tab
        v-for="(item, index) in listInfo.banner_list"
        :key="index"
        :title="item.title"
        :title-style="titleStyle"
      >
      </van-tab>
    </van-tabs>
    <div class="main">
      <img
        class="bg bg_common"
        :src="listInfo.banner_list[active].banner_children[0].image"
        alt=""
      />
      <div class="mask bg_common"></div>
      <div class="content">
        <div
          class="cbox"
          v-for="(item, index) in listInfo.banner_list[active].banner_children"
          :key="item.id"
        >
          <div class="img-box">
            <img v-lazy="item.image" />
            <div class="concern text-one-hidden">
              {{ item.right_bottom }}
            </div>
            <img
              class="rank"
              :src="getAssetsImages(`icon/rank_${index + 1}.png`)"
              alt=""
            />
          </div>
          <div class="b-title text-one-hidden">
            {{ item.title }}
          </div>
          <div class="tags text-one-hidden">
            <img class="icon" :src="item.icon" alt="" />
            <span>{{ item.sub_title }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const props = defineProps({
  listInfo: {
    type: Object,
  },
})
const active = ref(0)
const titleStyle = {
  fontSize: '.38rem',
  color: '#000000',
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/discover/content.scss';
:deep(.van-tabs__nav) {
  display: flex;
  align-items: center;
}
:deep(.van-tab--active) {
  font-size: 0.44rem !important;
}
.more {
  font-size: 0.32rem;
  flex: 1;
  display: flex;
  justify-content: flex-end;
  img {
    width: 0.3rem;
  }
}
.main {
  position: relative;
  padding: 0.4rem 0.2rem;
  .bg_common {
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
    z-index: -1;
  }
  .bg {
    backdrop-filter: blur(10px);
    filter: blur(10px);
  }
  .mask {
    background-color: rgba(0, 0, 0, 0.5);
  }
}
.content {
  .cbox {
    width: calc(97.5% / 3);
    color: #ffffff;
    .img-box {
      height: 3.1rem;
      .rank {
        position: absolute;
        top: 0;
        left: 0;
        width: 0.6rem;
      }
    }
    .tags {
      display: flex;
      align-items: center;
      .icon {
        width: 0.25rem;
        margin-right: 0.1rem;
      }
    }
  }
  .cbox:nth-child(n + 4) {
    margin-top: 0.2rem;
  }
}
</style>
