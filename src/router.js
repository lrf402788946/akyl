import Vue from 'vue';
import Router from 'vue-router';
import Index from './views/example/example.vue';
import akyl_set from './views/akyl_set/akyl_set.vue';
import akyl_work from './views/akyl_work/akyl_work.vue';

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
      path: '/akyl_set',
      name: 'set',
      component: akyl_set,
    },
    {
      path: '/akyl_work',
      name: 'work',
      component: akyl_work,
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
