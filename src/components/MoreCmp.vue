<template>
  <div class="morecmp" v-if="list.length > 0">
    <van-nav-bar :title="title" left-arrow @click-left="onClickLeft" />
    <div class="content">
      <div
        class="item"
        v-for="item in list"
        :key="item.id"
        @click.stop="toList(item)"
      >
        <div class="img-box">
          <img
            v-lazy="
              item.cover_image_url
                ? item.cover_image_url
                : item.vertical_image_url
            "
            alt=""
          />
        </div>
        <div class="right">
          <div class="top">
            <div class="title text-one-hidden">
              {{ item.title }}
            </div>
            <slot></slot>
          </div>
          <div class="tags">
            <span
              v-for="(val, i) in item.category ? item.category : item.tags"
              :key="i"
            >
              {{ val }}
            </span>
          </div>
          <div class="b-bot">
            <div class="favourite" v-if="item.like_count">
              <img src="@/assets/images/icon/link.png" alt="" />
              <span>
                {{
                  item.like_count > 100000
                    ? (item.like_count / 100000).toFixed(2) + '万'
                    : item.like_count
                }}
              </span>
            </div>
            <div class="comment" v-if="item.comment_count">
              <img src="@/assets/images/icon/comment.png" alt="" />
              <span>
                {{
                  item.comment_count > 100000
                    ? (item.comment_count / 100000).toFixed(2) + '万'
                    : item.comment_count
                }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const emit = defineEmits(['itemHandler'])
const router = useRouter()

defineProps({
  title: {
    type: String,
  },
  list: {
    type: Object,
  },
})

const toList = item => {
  emit('itemHandler', item)
}

const onClickLeft = () => {
  router.back()
}
</script>

<style lang="scss" scoped>
/* 顶部返回图标 */
:deep(.van-nav-bar .van-icon) {
  color: #000000;
  font-size: 0.5rem;
}

.content {
  .item {
    display: flex;
    justify-content: space-between;
    border-bottom: 2px solid #f3f3f3;
    padding-right: 0.4rem;
    .img-box {
      overflow: hidden;
      width: 4rem;
      height: 2.5rem;
      position: relative;
      img {
        left: 0;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
      }
    }
    .right {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      width: calc(100% - 4.3rem);
      .top {
        display: flex;
        .title {
          flex: 1;
          font-size: 0.42rem;
        }
      }
    }
    .tags {
      font-size: 0.35rem;
      span {
        margin-right: 0.1rem;
        color: #989ba0;
      }
    }

    .b-bot {
      color: #999999;
      display: flex;
      font-size: 0.3rem;
      .favourite,
      .comment {
        display: flex;
        align-items: center;
        margin-right: 0.3rem;
      }
      img {
        width: 0.4rem;
        margin-right: 0.1rem;
      }
    }
  }
}
</style>
