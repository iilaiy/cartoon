<template>
  <div class="filter-label filter">
    <ul class="tags">
      <li
        v-for="item in list"
        :key="item.tagId"
        :class="[active === item.tagId ? 'tag_active' : '']"
        @click="tagCartoonHandler(item)"
      >
        <span>{{ item.title }}</span>
      </li>
    </ul>
    <ul class="classify">
      <li class="classify_active">
        <span>全部</span>
      </li>
      <li>
        <span>全部</span>
      </li>
      <li>
        <span>全部</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'

const props = defineProps({
  list: {
    type: Object,
  },
})

const active = ref(props.list[0].tagId)

const tagCartoonHandler = item => {
  active.value = item.tagId
}
</script>

<style lang="scss" scoped>
.filter-label {
  .tags,
  .classify {
    width: 94%;
    margin: 0 auto;
    padding-top: 0.2rem;
    padding-bottom: 0.3rem;
    font-size: 0.36rem;
    display: flex;
    flex-wrap: wrap;
    gap: 0.2rem;
    li {
      margin: 0 0.15rem;
      margin-top: 0.1rem;
      span {
        color: #666666;
      }
    }
    .tag_active,
    .classify_active {
      position: relative;
      span {
        color: #000000;
        font-weight: 600;
      }
    }
  }
  .tags {
    border-bottom: 1px solid #f0f0f0;
    .tags_active {
      &::after {
        position: absolute;
        bottom: -0.1rem;
        left: 50%;
        transform: translateX(-50%);
        content: '';
        width: 0.5rem;
        height: 0.08rem;
        border-radius: 0.1rem;
        background-color: #fce200;
      }
    }
  }
  .classify {
    li {
      position: relative;
      &:after {
        position: absolute;
        right: -50%;
        color: #e6e6e6;
        content: '|';
        transform: scale(0.7);
      }
    }
    li:last-child {
      &:after {
        display: none;
      }
    }
  }
}
</style>
