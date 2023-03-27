import { createI18n } from 'vue-i18n'
import zh from './lang/zh'
import en from './lang/en'
const messages = {
    zh,
    en
}

const i18n = createI18n({
    legacy:false,
    locale: localStorage.getItem('lang'),
    globalInjection:true,
    messages
})

export default i18n