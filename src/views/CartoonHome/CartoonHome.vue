<template>
  <HomeHeader></HomeHeader>
  <main class="main">
    <van-tabs
      v-model:active="active"
      swipeable
      color="#fde23d"
      sticky
      :animated="true"
    >
      <van-tab
        v-for="(cmp, index) in contentCmpList"
        :key="index"
        :title="cmp.title"
        :title-style="{ 'font-size': '.4rem', color: '#000000' }"
      >
        <div class="content">
          <keep-alive>
            <component :is="cmp.cmp"></component>
          </keep-alive>
        </div>
      </van-tab>
    </van-tabs>
  </main>
</template>

<script setup>
import { ref, computed, defineAsyncComponent, watch } from 'vue'
import HomeHeader from './components/HomeHeader.vue'

const active = ref(0)
const contentCmpList = computed(() => {
  return [
    {
      title: '发现',
      cmp: defineAsyncComponent({
        loader: () =>
          import('./components/CartoonDiscover/CartoonDiscover.vue'),
      }),
    },
    {
      title: '推荐',
      cmp: null,
    },
    {
      title: '世界',
      cmp: null,
    },
  ]
})
/**
 * 打开当前界面时，只加载当前标签页数据组件内容，
 * 而不是默认的将所有标签页都加载完毕，而是在切换标签页时候，加载数据。
 */
watch(
  () => active.value,
  val => {
    switch (val) {
      case 1:
        if (contentCmpList.value[val].cmp) return
        contentCmpList.value[val].cmp = defineAsyncComponent({
          loader: () =>
            import('./components/CartoonRecommend/CartoonRecommend.vue'),
        })
        break
      case 2:
        if (contentCmpList.value[val].cmp) return
        contentCmpList.value[val].cmp = defineAsyncComponent({
          loader: () => import('./components/CartoonWorld/CartoonWorld.vue'),
        })
        break
    }
  }
)
</script>

<style scoped lang="scss"></style>
