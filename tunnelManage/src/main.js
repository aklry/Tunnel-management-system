import { createApp } from 'vue'
import { createPinia } from 'pinia'
import elementIcon from './plugins/icon'
import App from './App.vue'
import router from './router'
//引入公共样式
import './assets/init.css'
//引入仓库持久化插件
import piniaPersist from 'pinia-plugin-persist'

const app = createApp(App)
const pinia = createPinia()

pinia.use(piniaPersist)

app.use(router)
app.use(pinia)
app.use(elementIcon)
app.mount('#app')
