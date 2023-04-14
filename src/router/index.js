import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: {
      title: '首页',
      keepAlive: true,
    },
    component: () => import('./views/CartoonHome.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})
export default router
