import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const state = {
  userInfo: {},
};

var mutations = {
  isLogin(state) {
    state.userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
  },
  // 登出
  isLogout(state) {
    // 这个同理
    state.userInfo = '';
    sessionStorage.removeItem('userInfo');
  },
};
export default new Vuex.Store({
  state,
  mutations,
});
