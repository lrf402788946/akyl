import Vue from 'vue';
import Router from 'vue-router';
import Index from './views/example/example.vue';
import user from './views/user/user.vue';
import role from './views/role/role.vue';
import user_role from './views/user_role/user_role.vue';

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
      path: '/user',
      name: 'user',
      component: user,
    },
    {
      path: '/role',
      name: 'role',
      component: role,
    },
    {
      path: '/user_role',
      name: 'user_role',
      component: user_role,
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
