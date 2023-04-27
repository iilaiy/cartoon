<template>
  <div class="cartoon-top" @click.prevent>
    <div class="htop">
      <div class="logo">
        <img :src="logo" alt="" />
      </div>
      <div class="search common" @click="toSearch">
        <i class="search-icon">
          <img src="@/assets/images/icon/search_icon.png" alt="" />
        </i>
        <span>搜索作品名</span>
      </div>
      <router-link to="/booklist">
        <div class="bookshelf common">
          <i class="search-icon">
            <img src="@/assets/images/icon/booklist_icon.png" alt="" />
          </i>
          <span>书架</span>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
import logo from '@/assets/images/logo.webp'

const toSearch = () => {
  router.push({
    path: `/sou/`,
  })
}
</script>

<style scoped lang="scss">
.cartoon-top {
  .htop {
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding-top: 0.5rem;
    padding-bottom: 0.1rem;
    .common {
      display: flex;
      align-items: center;
    }
    .logo {
      width: 0.9rem;
    }
    span {
      font-size: 0.35rem;
    }
    .search {
      width: 63%;
      height: 0.9rem;
      justify-content: center;
      background-color: #f7f7f7;
      border-radius: 0.5rem;
      i {
        width: 0.55rem;
        img {
          margin-bottom: 0.08rem;
        }
      }
      span {
        color: #9999a5;
      }
    }
    a {
      color: #000000;
    }
    .bookshelf {
      i {
        float: left;
        width: 0.6rem;
        margin-right: 0.1rem;
        margin-bottom: 0.1rem;
      }
      span {
        font-size: 0.35rem;
      }
    }
  }
}
</style>
