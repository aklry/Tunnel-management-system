import { createApp } from 'vue'
import { createPinia } from 'pinia'
import elementIcon from './plugins/icon'
import ElementPlus from 'element-plus'
import zh from 'element-plus/dist/locale/zh-cn.mjs'
import en from 'element-plus/dist/locale/en.mjs'
import App from './App.vue'
import router from './router'
import i18n from './locals/i18n'
//引入公共样式
import './assets/init.css'
//引入仓库持久化插件
import piniaPersist from 'pinia-plugin-persist'
//引入echarts图表
import echarts from './plugins/echarts'
const app = createApp(App)
const pinia = createPinia()

pinia.use(piniaPersist)

app.use(router)
app.use(pinia)
app.use(elementIcon)
app.use(echarts)
app.use(i18n)
app.use(ElementPlus, {
    locale: localStorage.getItem('lang') === 'zh' ? zh : en
})
app.mount('#app')
