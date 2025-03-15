import { createI18n } from 'vue-i18n'
import ZH from './zh'
import EN from './en'
const messages = {
  en: {
    ...EN
  },
  zh: {
    ...ZH
  }
}
//刷新或者登陆时候获取当前语言
const getCurrentLanguage = () => {
  const UAlang = navigator.language
  const langCode = UAlang.indexOf('zh') !== -1 ? 'zh' : 'en'
  localStorage.setItem('lang', langCode)
}
const lang = () => {
  return localStorage.getItem('lang')
}
const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: lang() || 'zh',
  messages: messages
})
export default i18n
