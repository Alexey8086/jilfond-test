import { createStore } from 'vuex'
import { $host } from "@/axios.js"


export default createStore({
  state() {


    return {
      users: null,
      selectedUserId: null,
      selectedUser: null,
      message: null,
      isLoading: false,
    }
  },
  getters: {
    users(state) {
      return state.users
    },
    selectedUserId(state) {
      return state.selectedUserId
    },
    message(state) {
      return state.message
    }
  },
  mutations: {
    setMessage(state, message) {
      state.message = message
    },
    setClearMessage(state) {
      state.message = null
    },
    setSelectedUser (state, data) {
      state.selectedUser = data
    },
    setUsers (state, data) {
      state.users = data
    },
    setSelectedUserId (state, id) {
      state.selectedUserId = id
    },
    setIsLoading(state, bool) {
      state.isLoading = bool
    }
  },
  actions: {
    message({commit}, message) {
      commit('setMessage', message)
      setTimeout(() => commit('setClearMessage'), 7000)
    },

    // Загружает пользовательские данные по id
    async loadUser({ commit, dispatch }, id) {
      try {
          const res = await $host.get(`?id=${id}`)
          if (res.data) {
            commit('setSelectedUser', res.data[0])
          }
      } catch (e) {
          dispatch('message', {
              value: error(e.response.data.message),
              type: 'danger'
          }, {root: true})
      }
    },

    async findUsers({ commit, dispatch }, usernames) {
      try {
        // формируем url параметры для запроса
        // получаем подобный массив: ['username=Tim&', 'username=John&']
        let reqUrl = usernames.map((el) => `username=${el}&`)

        // Объединяем массив в строку, убираем последний знак - &
        reqUrl = reqUrl.join('').slice(0, -1)
        console.log('request URL ---- >>> ', reqUrl)

        const res = await $host.get(`?${reqUrl}`)
        if (res.data?.length) commit('setUsers', res.data)
        else commit('setUsers', null)
      } catch (e) {
        console.log(e)
          // dispatch('message', {
          //     value: error(e.response.data.message),
          //     type: 'danger'
          // }, {root: true})
      }
    },
   
    async findOneUser({ commit, dispatch }, username) {
      try {
        const res = await $host.get(`?username=${username}`)
        if (res.data?.length) commit('setUsers', res.data)
        else commit('setUsers', null)
      } catch (e) {
        console.log(e)
          // dispatch('message', {
          //     value: error(e.response.data.message),
          //     type: 'danger'
          // }, {root: true})
      }
    }
    
  }
})
