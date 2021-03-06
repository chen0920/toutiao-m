import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storage'

Vue.use(Vuex)

const USER_KEY = 'toutiao=user'
export default new Vuex.Store({
  state: {
    user: getItem(USER_KEY) // 当前登陆用户登陆状态（ token等数据）
  },
  mutations: {
    setUser (state, data) {
      state.user = data

      // 为了防止页面刷新数据丢失，我们还需要把数据放到本地存储
      // 中，这里仅仅是为了持久化
      setItem(USER_KEY, state.user)
      // window.localStorage.setItem('user', JSON.stringify(state.user))
    }

  },
  actions: {
  },
  modules: {
  }
})
