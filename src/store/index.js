import { defineStore } from 'pinia'

export const useSotre = defineStore('sotre', {
  state: () => {
    return {
      // 控制加载组件显示隐藏
      vshow: true,
    }
  },
})
