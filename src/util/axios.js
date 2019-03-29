import Vue from 'vue';
import axios from 'axios';
import { Loading } from 'element-ui';
import { Message } from 'element-ui';

process.env.NODE_ENV === 'production' ? (axios.defaults.baseURL = 'http://192.168.1.217') : '';
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';

axios.interceptors.request.use(
  config => {
    let url = config.url;
    if (filterUrl(url)) {
      let loading = Loading.service({
        fullscreen: true,
        text: '请求中,请耐心等待',
      });
    }
    return config;
  },
  error => {
    let loading = Loading.service({});
    loading.close();
    Message.error('请求接口失败');
    console.error(error);
  }
);

axios.interceptors.response.use(
  response => {
    let url = response.config.url;
    if (filterUrl(url)) {
      let loading = Loading.service({});
      loading.close();
    }
    return response;
  },
  error => {
    let loading = Loading.service({});
    loading.close();
    Message.error('请求接口失败');
    console.error(error);
  }
);

let filterUrl = url => {
  if (url.includes('save')) return true;
  else if (url.includes('edit')) return true;
  else if (url.includes('delete')) return true;
  else return false;
};

export default axios;
