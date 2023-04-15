import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import router from './router'
import store from './store'
import Vant from 'vant'
import { Lazyload } from 'vant'
import 'vant/lib/index.css'
import getAssetsImages from './utils/getAssetsImages'
import 'amfe-flexible'

const app = createApp(App)

app.config.globalProperties.getAssetsImages = getAssetsImages

app.use(router)
app.use(store)
app.use(Vant)
app.use(Lazyload, {
  lazyComponent: true,
})

app.mount('#app')
