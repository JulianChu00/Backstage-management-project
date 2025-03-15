import { createApp } from 'vue'
import App from './App.vue'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import '@/styles/index.scss'
import SvgIcon from '@/icons'
import iconFont from '@/assets/css/iconfont.css'
import i18n from './i18n'
import router from './router'
import store from './store'
import '@/router/permission'
import filters from '@/utils/filters'

const app = createApp(App)
SvgIcon(app)

for (const iconName in ElementPlusIconsVue) {
  app.component(iconName, ElementPlusIconsVue[iconName])
}
// 将app传入filters.js中暴露的函数
filters(app)

app.use(store).use(i18n).use(router).mount('#app')
