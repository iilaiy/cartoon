<template>
  <div class="content">
    <div
      class="box"
      v-for="item in resultList"
      :key="item.id"
      @click.stop="toList(item)"
    >
      <div class="left">
        <div class="img-box">
          <img v-lazy="item.vertical_image_url" alt="" />
        </div>
      </div>
      <div class="right">
        <div class="b-title">
          <span class="text-one-hidden">{{ item.title }}</span>
          <button @click.stop="payAttentionTo">+ 关注</button>
        </div>
        <p>{{ item.user.nickname }}</p>
        <div class="tags">
          <span v-for="(val, i) in item.category" :key="i">
            {{ val }}
          </span>
        </div>
        <div class="b-bot">
          <div class="comment">
            <img src="@/assets/images/icon/comment.png" alt="" />
            <span>{{ (item.comment_count / 10000).toFixed(2) }}万</span>
          </div>
          <div class="favourite">
            <img src="@/assets/images/icon/link.png" alt="" />
            <span>{{ (item.favourite_count / 10000).toFixed(2) }}万</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['resultList'],
  methods: {
    toList(item) {
      this.$router.push({
        path: `/mobile/${item.id}/list`,
      })
    },
    payAttentionTo() {
      console.log('关注')
    },
  },
}
</script>

<style lang="scss" scoped>
.content {
  .box {
    margin-top: 0.3rem;
    display: flex;
    .left {
      .img-box {
        width: 2.5rem;
        img {
          border-radius: 0.1rem;
        }
      }
    }
    .right {
      width: calc(100% - 2.8rem);
      margin-left: 0.3rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .b-title {
        font-size: 0.4rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        span {
          flex: 1;
        }
      }
      button {
        background-color: #ffe120;
        border-radius: 0.4rem;
        padding: 0.1rem 0.2rem;
        font-size: 0.3rem;
      }
      p,
      .tags,
      .b-bot {
        font-size: 0.34rem;
        color: #999999;
      }
      p {
        line-height: 0.5rem;
      }
      .tags {
        span {
          margin-right: 0.1rem;
        }
      }
      .b-bot {
        margin-top: 0.5rem;
        display: flex;
        div {
          display: flex;
          align-items: center;
          margin-right: 0.3rem;
        }
        img {
          width: 0.5rem;
          margin-right: 0.1rem;
        }
        span {
          font-size: 0.38rem;
        }
      }
    }
  }
}
</style>
