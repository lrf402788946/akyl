import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const state = {
  userInfo: {},
  userRoleList: [],
};

var mutations = {
  isLogin(state) {
    state.userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
    state.userRoleList = JSON.parse(sessionStorage.getItem('userRoleList'));
  },
  // 登出
  isLogout(state) {
    // 这个同理
    state.userInfo = '';
    state.userRoleList = [];
    sessionStorage.removeItem('userInfo');
    sessionStorage.removeItem('userRoleList');
  },
};
export default new Vuex.Store({
  state,
  mutations,
});
