import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: {
      title: '发现',
      keepAlive: true,
    },
    component: () => import('@/views/CartoonDiscover/CartoonDiscover.vue'),
  },
  {
    path: '/recommend',
    name: 'Recommend',
    meta: {
      title: '推荐',
      keepAlive: true,
    },
    component: () => import('@/views/CartoonRecommend/CartoonRecommend.vue'),
  },
  {
    path: '/world',
    name: 'World',
    meta: {
      title: '世界',
      keepAlive: true,
    },
    component: () => import('@/views/CartoonWorld/CartoonWorld.vue'),
  },
  {
    path: '/booklist',
    name: 'BookList',
    meta: {
      title: '书架',
      keepAlive: true,
    },
    component: () => import('@/views/BookList/BookList.vue'),
  },
  {
    path: '/more/list',
    name: 'MoreView',
    meta: {
      title: '更多漫画',
    },
    component: () => import('@/views/MoreView/MoreView.vue'),
  },
  {
    path: '/mobile/:id/:page',
    name: 'Mobile',
    meta: {
      title: '漫画详情',
    },
    component: () => import('@/views/CartoonDetails/CartoonDetails.vue'),
  },
  {
    path: '/comics/:id',
    name: 'Comics',
    meta: {
      title: '章节详情',
    },
    component: () => import('@/views/CartoonComics/CartoonComics.vue'),
  },
  {
    path: '/sou/:keyword?',
    name: 'Search',
    meta: {
      title: '搜索',
    },
    component: () => import('@/views/SearchPage/SearchPage.vue'),
  },
  {
    path: '/:catchAll(.*)',
    name: 'error',
    meta: {
      title: '404',
      overlayHide: true, // 不显示加载组件
    },
    component: () => import('@/views/PageNotFound/PageNotFound.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  next()
})

export default router
