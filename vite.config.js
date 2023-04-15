import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import postCssPxToRem from 'postcss-pxtorem'
import * as path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    //设置别名
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  plugins: [vue()],
  css: {
    postcss: {
      plugins: [
        postCssPxToRem({
          rootValue({ file }) {
            return file.indexOf('vant') !== -1 ? 37.5 : 75 // 因为vant框架是以375px的稿子为基础的，所以需要适配一下
          },
          propList: ['*'], // 需要转换的css属性，默认*全部
          minPixelValue: 2,
        }),
      ],
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://www.kuaikanmanhua.com',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, ''),
      },
      /**
       *      配置后/api就是代理了target配置的地址（ https://www.kuaikanmanhua.com）
       *     可以理解为: /api 等于 https://www.kuaikanmanhua.com
       *     所以不需要配置 axios 的 baseUrl 了，切记。
       *     https://www.cnblogs.com/yayuya/p/17035869.html
       */
    },
  },
})
