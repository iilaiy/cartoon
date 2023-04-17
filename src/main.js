import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import router from './router'
import { createPinia } from 'pinia'
import Vant from 'vant'
import { Lazyload } from 'vant'
import 'vant/lib/index.css'
import getAssetsImages from './utils/getAssetsImages'
import 'amfe-flexible'
import { useSotre } from '@/store/index.js'

const app = createApp(App)

app.use(router)
app.use(createPinia())
app.use(Vant)
app.use(Lazyload, {
  lazyComponent: true,
})
const store = useSotre()
app.config.globalProperties.$store = store
app.config.globalProperties.getAssetsImages = getAssetsImages

app.mount('#app')
