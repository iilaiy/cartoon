<template>
  <div class="booklist">
    <div class="header">
      <div class="back">
        <i class="back-icon" @click="toBack"></i>
      </div>
      <div class="mod-user">
        <div class="user-avatar">
          <span
            class="photo"
            :style="{ backgroundImage: `url('${userinfo.avatarUrl}')` }"
          ></span>
        </div>
        <div class="user-name">
          <span>{{ userinfo.name }}</span>
        </div>
      </div>
      <div class="mob-vip">
        <div class="vip-item" v-for="(item, index) in navList" :key="index">
          <i :style="{ backgroundImage: `url('${item.icon}')` }"></i>
          <span>{{ item.name }}</span>
        </div>
      </div>
      <div class="mod-blank"></div>
    </div>
    <div class="mod-container">
      <van-tabs
        v-model:active="active"
        shrink
        swipeable
        line-width="20px"
        color="#ffe500"
      >
        <van-tab v-for="(item, index) in list" :key="index" :title="item.name">
          <ModEmpty :emptyUrl="item.emptyUrl"></ModEmpty>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script setup>
import { getCurrentInstance, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import ModEmpty from './components/ModEmpty.vue'
const { appContext } = getCurrentInstance()
const global = appContext.config.globalProperties

const router = useRouter()

const userinfo = reactive({
  avatarUrl: global.getAssetsImages('icon/user_default.3404f9d.png'),
  name: '点击登录',
})

const navList = [
  {
    name: '我的钱包',
    icon: global.getAssetsImages('icon/kkb.d8b5d6b.png'),
  },
  {
    name: '会员中心',
    icon: global.getAssetsImages('icon/vip.a37741b.png'),
  },
]

const active = ref(0)
const list = reactive([
  {
    name: '阅读历史',
    emptyUrl: global.getAssetsImages('icon/none_his.0f23981.png'),
  },
  {
    name: '我的关注',
    emptyUrl: global.getAssetsImages('icon/none_att.a7a45d8.png'),
  },
])

global.$store.vshow = false

const toBack = () => {
  router.back()
}
</script>

<style lang="scss" scoped>
@import './BookList.scss';
</style>
