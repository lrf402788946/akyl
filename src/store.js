import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const state = {
  userName: '',
};

var mutations = {
  isLogin(state) {
    console.log('in');
    console.log(sessionStorage.getItem('userInfo'));
    state.userName = sessionStorage.getItem('userInfo');
  },
  // 登出
  isLogout(state) {
    // 这个同理
    state.userName = '';
    sessionStorage.removeItem('userInfo');
  },
};
var getters = {
  isLogin(state) {
    if (!state.logined) {
      state.logined = sessionStorage.getItem('logined'); //从sessionStorage中读取状态
      state.Loginedname = sessionStorage.getItem('Loginedname');
      state.UserId = sessionStorage.getItem('UserId');
    }
    return state.logined;
  },
};
export default new Vuex.Store({
  getters,
  state,
  mutations,
});
