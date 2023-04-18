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
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  next()
})

export default router
