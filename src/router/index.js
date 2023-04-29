import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: {
      title: '发现',
      keepAlive: false,
      backTop: false,
    },
    component: () => import('@/views/CartoonDiscover/CartoonDiscover.vue'),
  },
  {
    path: '/tag',
    name: 'Tag',
    meta: {
      title: '漫画分类',
      keepAlive: true,
      backTop: true,
    },
    component: () =>
      import('@/views/CartoonClassification/CartoonClassification.vue'),
  },
  {
    path: '/ranking',
    name: 'Ranking',
    meta: {
      title: '作品排行',
      keepAlive: true,
      backTop: true,
    },
    component: () => import('@/views/RankingList/RankingList.vue'),
  },
  {
    path: '/recommend',
    name: 'Recommend',
    meta: {
      title: '推荐',
      keepAlive: true,
      backTop: false,
    },
    component: () => import('@/views/CartoonRecommend/CartoonRecommend.vue'),
  },
  {
    path: '/world',
    name: 'World',
    meta: {
      title: '世界',
      keepAlive: true,
      backTop: false,
    },
    component: () => import('@/views/CartoonWorld/CartoonWorld.vue'),
  },
  {
    path: '/booklist',
    name: 'BookList',
    meta: {
      title: '书架',
      keepAlive: true,
      backTop: false,
    },
    component: () => import('@/views/BookList/BookList.vue'),
  },
  {
    path: '/more/list',
    name: 'MoreView',
    meta: {
      title: '更多漫画',
      backTop: true,
    },
    component: () => import('@/views/MoreView/MoreView.vue'),
  },
  {
    path: '/mobile/:id/:page',
    name: 'Mobile',
    meta: {
      title: '漫画详情',
      backTop: true,
    },
    component: () => import('@/views/CartoonDetails/CartoonDetails.vue'),
  },
  {
    path: '/comics/:id',
    name: 'Comics',
    meta: {
      title: '章节详情',
      backTop: true,
    },
    component: () => import('@/views/CartoonComics/CartoonComics.vue'),
  },
  {
    path: '/sou',
    name: 'Sou',
    meta: {
      title: '搜索',
      keepAlive: true,
      backTop: true,
    },
    component: () => import('@/views/SearchPage/SearchView.vue'),
    children: [
      {
        path: ':keyword?',
        name: 'Search',
        component: () => import('@/views/SearchPage/SearchPage.vue'),
      },
      {
        path: 'result/:keywords?',
        name: 'ResultMore',
        component: () => import('@/views/SearchPage/SearchMore.vue'),
      },
    ],
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
  history: createWebHistory(import.meta.env.VITE_ROUTER_BASE),
  routes,
})

/**
 * 路由守卫
 */
router.beforeEach((to, from, next) => {
  if (to.meta.backTop) {
    // chrome
    document.body.scrollTop = 0
    // firefox
    document.documentElement.scrollTop = 0
    // safari
    window.pageYOffset = 0
  }
  next()
})

export default router
