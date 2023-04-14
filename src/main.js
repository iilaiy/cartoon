import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import router from './router'
import store from './store'
import Vant from 'vant'
import 'vant/lib/index.css'

import 'amfe-flexible'

const app = createApp(App)

app.use(router)
app.use(store)
app.use(Vant)

app.mount('#app')
