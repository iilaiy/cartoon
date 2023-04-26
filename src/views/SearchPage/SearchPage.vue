<template>
  <div class="search">
    <van-nav-bar title="快看" left-arrow @click-left="onClickLeft" />
    <form>
      <van-search
        v-model.trim="searchValue"
        show-action
        placeholder="搜索作品名"
        @search="onSearch"
        @cancel="toHome"
        @update:model-value="updataInputValHandler"
      />
    </form>
    <HotHistory
      v-if="searchValue == '' && !getBool"
      :hotList="hotList"
      :pageNum="pageNum"
      :searchHistory="searchHistory"
      @clickRefreshHandler="refreshHandler"
      @delHistoryHandler="delHistoryHandler"
      @clickToSearchResultHandler="toSearchResultHandler"
    ></HotHistory>
    <SuggestionList
      v-if="
        !(searchValue == '') && !getBool && JSON.stringify(searchResult) == '{}'
      "
      :suggestionList="suggestionList"
      :searchValue="searchValue"
      @clickToSearchResultHandler="toSearchResultHandler"
    ></SuggestionList>
    <SearchResult
      v-if="!(JSON.stringify(searchResult) == '{}')"
      :searchResult="searchResult"
      :searchValue="searchValue"
    ></SearchResult>
  </div>
</template>

<script setup>
import { ref, watch, getCurrentInstance, onMounted } from 'vue'
import HotHistory from './components/HotHistory.vue'
import SuggestionList from './components/SuggestionList.vue'
import SearchResult from './components/SearchResult.vue'
import { useRouter, useRoute } from 'vue-router'
import { getHotInfo, getSuggestionInfo, getSearchResult } from '@/api/api.js'
const { appContext } = getCurrentInstance()
const global = appContext.config.globalProperties
const router = useRouter()
const route = useRoute()

// 输入的内容
const searchValue = ref('')
// 热搜
const hotList = ref({})
const pageNum = ref(10)
// 搜索历史
const searchHistory = ref({})
// 模糊搜索
const suggestionList = ref([])
// 搜索结果
const searchResult = ref({})
// 控制搜索请求（路由变化时请求、确定搜索或点击某个历史、热搜），防止重复请求
const getBool = ref(false)
/**
 * 获取热门搜索
 */
const getHotSearchInfo = async (page = 1, size = pageNum.value) => {
  try {
    const res = await getHotInfo({ page, size })
    hotList.value = res
    global.$store.vshow = false
  } catch (e) {
    console.log(e)
  }
}
getHotSearchInfo()

// 刷新热门搜索
const refreshHandler = index => {
  getHotSearchInfo(index)
}

// 组件创建完毕读取localStorage里面的搜索历史
onMounted(() => {
  searchHistory.value = JSON.parse(localStorage.getItem('searchHistory')) || {
    val: [],
  }
})
// 接收子组件传递的值（HotHistory）
const delHistoryHandler = index => {
  // 删除对应的历史搜索
  switch (index) {
    case -1:
      searchHistory.value.val = []
      break
    default:
      searchHistory.value.val.splice(index, 1)
      break
  }
  localStorage.setItem('searchHistory', JSON.stringify(searchHistory.value))
}
// 请求搜索结果函数
const getSearchResultHandler = async val => {
  try {
    const res = await getSearchResult({ q: val })
    searchResult.value = res.data
  } catch (e) {
    console.log(e)
  }
}

// 确定搜索时触发
const onSearch = () => {
  getBool.value = true
  if (searchValue.value == '') return
  searchHistory.value.val.map((item, index) => {
    if (item == searchValue.value) {
      searchHistory.value.val.splice(index, 1)
    }
  })
  searchHistory.value.val.unshift(searchValue.value)
  localStorage.setItem('searchHistory', JSON.stringify(searchHistory.value))
  getSearchResultHandler(searchValue.value)
  router.push({
    name: 'Search',
    params: { keyword: searchValue.value },
  })
}

// 隐藏热搜与历史组件，显示模糊搜索结果组件
const updataInputValHandler = async () => {
  getBool.value = false
  searchResult.value = {}
  if (searchValue.value == '') return (suggestionList.value = [])
  try {
    const res = await getSuggestionInfo({ q: searchValue.value, size: 20 })
    suggestionList.value = res.hits
  } catch (e) {
    console.log(e)
  }
}

// 根据子组件（热门、历史）传递的搜索内容进行搜索
const toSearchResultHandler = item => {
  searchValue.value = item
  onSearch()
}

// 监听路由，进行数据请求（主要防止用户刷新数据丢失或返回上一页时数据没有实时更新）
watch(
  () => route.params.keyword,
  val => {
    searchValue.value = val
    if (searchValue.value == '' || val == undefined) {
      searchResult.value = {}
    } else {
      if (getBool.value) return
      getSearchResultHandler(searchValue.value)
    }
  },
  {
    immediate: true,
  }
)

// 点击取消回到首页
const toHome = () => {
  router.push({
    path: '/',
  })
}
// 返回上一页
const onClickLeft = () => {
  // TODO: 当请求搜索未返回结果点击返回上一页仍然是在搜索页的情况时会出现最终结果对象继续被赋值导致显示这一次请求回来的数据组件(返回时需要拦截未完成的请求)
  getBool.value = false
  router.back()
}
</script>

<style lang="scss" scoped>
@import './SearchPage.scss';
</style>
