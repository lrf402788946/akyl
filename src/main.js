import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from '@/util/axios';
import Qs from 'qs';
import '@/plugins/meta';
import '@/plugins/element';
import '@/plugins/filters';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import viser from 'viser-vue';
import toExcel from '@/util/json2excel';
import moment from 'moment';

Vue.prototype.$axios = axios;
Vue.prototype.qs = Qs;
Vue.use(viser);
Vue.use(BootstrapVue);
Vue.prototype.$toExcel = toExcel;
Vue.prototype.$moment = moment;
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
