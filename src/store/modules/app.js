import { login as loginApi } from '@/api/login'
import router from '@/router'
import { resolve } from 'core-js/es/promise'
import { setTokenTime } from '@/utils/auth'
export default {
  namespaced: true,
  state: () => ({
    token: localStorage.getItem('token') || '',
    siderType: true,
    lang: localStorage.getItem('lang') || 'zh'
  }),
  mutations: {
    setToken(state, token) {
      state.token = token
      localStorage.setItem('token', token)
    },
    changeSiderType(state) {
      state.siderType = !state.siderType
    },
    changeLang(state, lang) {
      state.lang = lang
      localStorage.setItem('lang', lang)
    }
  },
  actions: {
    //登陆
    login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        loginApi(userInfo)
          .then((res) => {
            // console.log(res)
            commit('setToken', res.token)
            setTokenTime()
            router.replace('/')
            resolve()
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    //退出
    logout({ commit }) {
      commit('setToken', '')
      localStorage.clear()
      router.replace('/login')
    }
  }
}
