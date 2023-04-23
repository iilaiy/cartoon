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
    path: '/mobile/:id/:page',
    name: 'Mobile',
    component: () => import('@/views/CartoonDetails/CartoonDetails.vue'),
  },
  {
    path: '/sou/:keyword?',
    name: 'Search',
    meta: {
      title: '搜索',
      keepAlive: true,
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
