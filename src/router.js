import Vue from 'vue';
import Router from 'vue-router';
import Index from './views/example/example.vue';
import lz from './views/lz/lz.vue';
import zx from './views/zx/zx.vue';
import user from './views/user/user.vue';
import role from './views/role/role.vue';
import user_role from './views/user_role/user_role.vue';
import post from './views/post/post.vue';
import dept from './views/dept/dept.vue';
import kind from './views/kind/kind.vue';
import akyl_set from './views/set/set.vue';
import akyl_work from './views/work/work.vue';
import thb from './views/thb/thb.vue';
import bg from './views/bg/bg.vue';

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
    {
      path: '/post',
      name: 'post',
      component: post,
    },
    {
      path: '/dept',
      name: 'dept',
      component: dept,
    },
    {
      path: '/kind',
      name: 'kind',
      component: kind,
    },
    {
      path: 'set',
      name: 'set',
      component: akyl_set,
    },
    {
      path: 'work',
      name: 'work',
      component: akyl_work,
    },
    {
      path: '/thb',
      name: 'thb',
      component: thb,
    },
    {
      path: '/bg',
      name: 'bg',
      component: bg,
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
