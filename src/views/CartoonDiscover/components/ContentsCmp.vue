<template>
  <div class="contents-cmp" v-if="list">
    <div class="r-title">{{ list.title }}</div>
    <div class="content" id="content">
      <div
        class="cbox"
        v-for="item in list.banner_list"
        :key="item.id"
        @click="toList(item)"
      >
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
      <div class="box">查看更多</div>
      <div class="box" @click="ChangeHandler">换一换</div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const emit = defineEmits(['cartoonChange'])

const props = defineProps({
  list: {
    type: Object,
  },
  num: {
    type: Number,
  },
  // 节流
  loadingShow: {
    type: Boolean,
  },
})

const column = computed(() => {
  const num = props.num || 3
  return Object.assign(num, props.num)
})

const ChangeHandler = () => {
  // 设置节流
  if (!props.loadingShow) {
    emit('cartoonChange', props.list)
  }
}

const toList = item => {
  console.log(item)
  router.push({
    path: `/mobile/${item.id}/list`,
    query: {
      module_type: props.list.module_type,
      module_title: props.list.title,
      module_id: props.list.module_id,
    },
  })
}
</script>

<style scoped lang="scss">
@import '@/assets/css/discover/content.scss';
.r-title {
  font-size: 0.44rem;
  font-weight: 600;
}
.content {
  height: 11rem;
  .cbox {
    height: 5rem;
    width: calc(97% / v-bind(column)) !important;
    .img-box {
      height: 4.1rem;
    }
    .tags {
      color: #9999a5;
    }
  }
}
.card {
  display: flex;
  justify-content: space-between;
  margin: 0.45rem 0;
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
