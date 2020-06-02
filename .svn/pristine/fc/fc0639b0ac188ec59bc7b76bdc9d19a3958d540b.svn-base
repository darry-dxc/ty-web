import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    role: '',
    account: '',
    token: '',
    httpError: '',
    userInfo: null
  },
  mutations: {
    getRole (state, value) {
      state.role = value
    },
    setAccount (state, value) {
      state.account = value
    },
    setToken (state, value) {
      state.token = value
    },
    on_http_error (state, payload) {
      state.httpError = payload
    },
    getUserInfo (state, data) {
      state.userInfo = data
    }
  },
  actions: {

  }
})
