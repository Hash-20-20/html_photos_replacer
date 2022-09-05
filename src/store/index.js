import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    html: ''
  },
  mutations: {
    setHTML(state, html) {
      state.html = html
    }
  },
  actions: {
  },
  modules: {
  }
})
