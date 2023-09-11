import { createStore } from 'vuex'


export default createStore({
  strict: true,
  state() {
    return {

    }
  },
  getters: {

  },
  mutations: {
    setMessage(state, message) {
      state.message = message
    },
  },
  actions: {
    message({commit}, message) {
      commit('setMessage', message)
      setTimeout(() => commit('setClearMessage'), 5000)
    },
  }
})
