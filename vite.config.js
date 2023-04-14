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
    // port: 8080, //启动端口
    // hmr: {
    //   host: '127.0.0.1',
    //   port: 8080
    // },
    // 设置 https 代理
    proxy: {
      '/api': {
        target: '127.0.0.1',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, ''),
      },
    },
  },
})
