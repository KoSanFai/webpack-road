export default {
  state: {
    counter: 0
  },
  mutations: {
    add (state, payload = 3) { 
      state.counter = state.counter + payload
    }
  },
  actions: {
    add ({ commit }, payload) {
      commit('add', payload)
    }
  },
  getters: {
    getCounter (state, getters) {
      return state.counter
    }
  }
}
