<template>
  <div>
    <div class="r-title">{{ title }}</div>
    <div class="content">
      <div class="cbox" v-for="item in list" :key="item.id">
        <div class="img-box">
          <img v-lazy="item.vertical_image_url" />
          <template v-if="item.sub_title">
            <div class="concern text-one-hidden">{{ item.sub_title }}</div>
          </template>
          <template v-else-if="item.likes_count != 0">
            <div class="concern text-one-hidden">
              {{ item.likes_count }}关注
            </div>
          </template>
        </div>
        <div class="b-title text-one-hidden">
          {{ item.title }}
        </div>
        <div class="tags text-one-hidden">
          <template v-if="Array.isArray(item.tags)">
            <span v-for="(val, index) in item.tags" :key="index">{{
              val
            }}</span>
          </template>
          <template v-else>
            <span>{{ item.corner_text }}</span>
          </template>
        </div>
      </div>
    </div>
    <div class="card">
      <div class="box" @click="moreChange($event)">查看更多</div>
      <div class="box" @click="moreChange($event)">换一换</div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
const emit = defineEmits(['ContentsCmpClick'])

const props = defineProps({
  title: {
    type: String,
  },
  list: {
    type: Array,
  },
})

const moreChange = e => {
  emit('ContentsCmpClick', { name: props.title, type: e.target.innerText })
}
</script>

<style scoped lang="scss">
.r-title {
  width: 95%;
  margin: 0 auto;
  font-size: 0.42rem;
  font-weight: bold;
}
.content {
  width: 95%;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .cbox {
    width: 31.8%;
    margin-top: 0.3rem;
    .b-title {
      width: 100%;
      font-size: 0.35rem;
      margin: 0.2rem 0 0.1rem 0;
    }
    .img-box {
      position: relative;
      img {
        border-radius: 0.05rem;
      }
      .concern {
        background: linear-gradient(180deg, transparent, rgba(0, 0, 0, 0.5));
        bottom: 0;
        box-sizing: border-box;
        color: #ffffff;
        height: 1.4rem;
        line-height: 2rem;
        padding-right: 0.1rem;
        position: absolute;
        text-align: right;
        width: 100%;
        font-size: 0.3rem;
      }
    }
    .tags {
      font-size: 0.3rem;
      color: #9999a5;
      span {
        margin-right: 0.1rem;
      }
    }
  }
}
.card {
  display: flex;
  justify-content: space-between;
  margin: 0.5rem 0.24rem;
  .box {
    font-size: 0.34rem;
    color: #666666;
    text-align: center;
    width: calc(50% - 0.12rem);
    height: 1rem;
    line-height: 1rem;
    background-color: #f7f7f8;
  }
}
</style>
