<template>
  <div class="suggestion">
    <div class="title">
      <span>搜索“{{ searchValue }}”</span>
    </div>
    <div class="content">
      <div
        class="box"
        v-for="(item, index) in suggestionList"
        :key="index"
        @click="toSearchResultHandler(item.title)"
      >
        <span>{{ item.title }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

const emit = defineEmits(['clickToSearchResultHandler'])

defineProps({
  suggestionList: {
    type: Object,
  },
  searchValue: {
    type: String,
  },
})
onMounted(() => {
  // console.log(props.suggestionList)
})

const toSearchResultHandler = item => {
  // console.log(item)
  emit('clickToSearchResultHandler', item)
}
</script>

<style lang="scss" scoped>
.suggestion {
  .title {
    font-size: 0.34rem;
    color: #4a90e2;
    margin-left: 0.3rem;
  }
  .content {
    .box {
      border-bottom: 1px solid #e6e6e6;
      font-size: 0.38rem;
      padding: 0.3rem;
      color: #333333;
    }
  }
}
</style>
