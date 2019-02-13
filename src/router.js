import Vue from 'vue';
import Router from 'vue-router';
import Index from './views/example/example.vue';
import lz from './views/lz/lz.vue';
import zx from './views/zx/zx.vue';

Vue.use(Router);

const router = new Router({
  // base: '/archive/',
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
    },
    {
      path: '/lz',
      name: 'lz',
      component: lz,
    },
    {
      path: '/zx',
      name: 'zx',
      component: zx,
    },
  ],
});
// router.beforeEach((to, from, next) => {
//   const is_login = sessionStorage.getItem('userInfo');
//   console.log(is_login);
//   if (is_login) {
//     next();
//   } else {
//     if (to.path.includes('Login')) next();
//     else next('/LoginPage');
//   }
// });
export default router;
