/* eslint-disable no-console */
export default {
  get user() {
    const val = sessionStorage.getItem('user');
    try {
      if (val) return JSON.parse(val);
    } catch (err) {
      console.error(err);
    }
    return null;
  },
  set user(userinfo) {
    sessionStorage.setItem('user', JSON.stringify(userinfo));
  },
  get token() {
    return sessionStorage.getItem('token');
  },
  set token(token) {
    sessionStorage.setItem('token', token);
  },
};
