import Vue from "vue";
import Vuex from "vuex";
// import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const actions = {}

const mutations = {
  ChangeAuthState(state) {
    state.isAuth = true
  },
  Recover(state) {
    state.isAuth = false
  },
  SetIdentity(state, iden) {
    state.identity = iden
  },
  SetAnalysis(state, val) {
    state.analysis = val
  },
  SetUserName(state, val) {
    state.username = val
  }
}

const state = {
  isAuth: false,
  identity: null,//0:管理员,1:教师,2:学生
  analysis: null,
  username: null
}

export default new Vuex.Store({
  actions,
  mutations,
  state,
  // plugins: [createPersistedState()]
})
