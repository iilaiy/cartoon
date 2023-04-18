<template>
  <div class="contents-cmp" v-if="list">
    <div class="r-title">{{ list.title }}</div>
    <div class="content" id="content">
      <div class="cbox" v-for="item in list.banner_list" :key="item.id">
        <div class="img-box">
          <img v-lazy="item.image" />
          <div class="concern text-one-hidden">
            {{ item.right_bottom }}
          </div>
        </div>
        <div class="b-title text-one-hidden">
          {{ item.title }}
        </div>
        <div class="tags text-one-hidden">
          <span>{{ item.sub_title }}</span>
        </div>
      </div>
    </div>
    <div class="card" v-if="list.show_more">
      <div class="box" @click="moreChange($event)">查看更多</div>
      <div class="box" @click="moreChange($event)">换一换</div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
const emit = defineEmits(['ContentsCmpClick'])

const props = defineProps({
  list: {
    type: Object,
  },
  num: {
    type: Number,
  },
})

const column = computed(() => {
  const num = props.num || 3
  return Object.assign(num, props.num)
})

const moreChange = e => {
  emit('ContentsCmpClick', { list: props.list, type: e.target.innerText })
}
</script>

<style scoped lang="scss">
.r-title {
  font-size: 0.44rem;
  font-weight: 600;
}
.content {
  height: 11.4rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .cbox {
    width: calc(97% / v-bind(column));
    height: 5.4rem;
    margin-top: 0.3rem;
    .b-title {
      width: 100%;
      font-size: 0.4rem;
      margin-top: 0.2rem;
    }
    .img-box {
      height: 4.1rem;
      overflow: hidden;
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
      font-size: 0.35rem;
      color: #9999a5;
    }
  }
}
.card {
  display: flex;
  justify-content: space-between;
  margin: 0.5rem 0;
  .box {
    font-size: 0.36rem;
    color: #666666;
    text-align: center;
    width: calc(50% - 0.1rem);
    height: 1rem;
    line-height: 1rem;
    background-color: #f7f7f8;
  }
}
</style>
