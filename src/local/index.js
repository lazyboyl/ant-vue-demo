import Vue from 'vue'
import VueI18n from 'vue-i18n'
import zhCnLocale from 'ant-design-vue/lib/locale-provider/zh_CN'
import customZhCn from './lang/zh-CN'

Vue.use(VueI18n)

// 自动根据浏览器系统语言设置语言
const navLang = navigator.language
const localLang = (navLang === 'zh-CN' || navLang === 'en-US') ? navLang : false
let lang = window.localStorage.lang || localLang || 'zh-CN'

Vue.config.lang = lang

// vue-i18n 6.x+写法
Vue.locale = () => {
}
const messages = {
  'zh-CN': Object.assign(zhCnLocale, customZhCn)
}
const i18n = new VueI18n({
  locale: localStorage.getItem('lang') || lang,
  messages
})
export default i18n
