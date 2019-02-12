export default {
  //获取url的参数params
  getParams() {
    let str = location.href;
    let num = str.indexOf('?');
    const param = {};
    str = str.substr(num + 1);
    let num2 = str.indexOf('#');
    let str2 = '';
    if (num2 > 0) {
      str2 = str.substr(0, num2);
    } else {
      num2 = str.indexOf('/');
      str2 = str.substr(0, num2);
    }
    const arr = str2.split('&');
    for (let i = 0; i < arr.length; i++) {
      num = arr[i].indexOf('=');
      if (num > 0) {
        const name = arr[i].substring(0, num);
        const value = arr[i].substr(num + 1);
        param[name] = decodeURI(value);
      }
    }
    return param;
  },
};
