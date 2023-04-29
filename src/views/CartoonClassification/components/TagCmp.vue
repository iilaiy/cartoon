<template>
  <div class="filter-label filter">
    <ul class="tags">
      <li
        v-for="item in list"
        :key="item.tagId"
        :class="[tagId === item.tagId ? 'tag_active' : '']"
        @click="tagCartoonHandler(item, 'tags')"
      >
        <span>{{ item.title }}</span>
      </li>
    </ul>
    <ul class="classify" v-for="(item, index) in classifyList" :key="index">
      <li
        :class="[item.active == val.id ? 'classify_active' : '']"
        v-for="val in item.Categories"
        :key="val.id"
        @click="tagCartoonHandler(val, item.title)"
      >
        <span>{{ val.title }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { classify } from '@/data/classify.js'
const emit = defineEmits(['tagsHandler'])

const props = defineProps({
  list: {
    type: Object,
  },
})

const tagId = ref(props.list[0].tagId)
const classifyList = ref(classify)

const tagCartoonHandler = (item, type) => {
  switch (type) {
    case 'tags':
      tagId.value = item.tagId
      break
    default:
      classifyList.value.forEach(val => {
        if (val.title == type) {
          return (val.active = item.id)
        }
      })
  }
  emit('tagsHandler', {
    tagId: tagId.value,
    ...classifyList.value,
  })
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
      &:before {
        position: absolute;
        left: -0.3rem;
        color: #e6e6e6;
        content: '|';
        transform: scale(0.7);
      }
    }
    li:first-child {
      &:before {
        display: none;
      }
    }
  }
}
</style>
