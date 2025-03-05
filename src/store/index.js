import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex)

const actions = {}

const mutations = {
  ChangeAuthState(state) {
    state.isAuth = true
  },
  Recover(state) {
    state.isAuth = false
  }
}

const state = {
  isAuth: false
}

export default new Vuex.Store({
  actions,
  mutations,
  state
})
