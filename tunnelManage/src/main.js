import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
//引入公共样式
import './assets/init.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
