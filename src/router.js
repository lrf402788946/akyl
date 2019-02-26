import Vue from 'vue';
import Router from 'vue-router';
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
import staff from './views/staff/staff.vue';
import bg from './views/bg/bg.vue';
import gongxin from './views/gongxin/gongxin.vue';
import pdt from './views/statistic/pdt.vue';
import gtx from './views/statistic/gtx.vue';
import login from './views/login_page.vue';
import update_pw from './views/user/update_pw.vue';
import index from './views/index.vue';
import index_contant from './views/index_contant.vue';
import rk from './views/rk/rk.vue';
import ck from './views/ck/ck.vue';

Vue.use(Router);
const router = new Router({
  // base: '/archive/',
  // mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login,
    },
    {
      path: '/',
      name: 'index',
      component: index,
      children: [
        {
          path: '/',
          name: 'index_contant',
          component: index_contant,
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
          path: '/set',
          name: 'set',
          component: akyl_set,
        },
        {
          path: '/work',
          name: 'work',
          component: akyl_work,
        },
        {
          path: '/thb',
          name: 'thb',
          component: thb,
        },
        {
          path: '/staff',
          name: 'staff',
          component: staff,
        },
        {
          path: '/bg',
          name: 'bg',
          component: bg,
        },
        {
          path: '/gongxin',
          name: 'gongxin',
          component: gongxin,
        },
        {
          path: '/pdt',
          name: 'pdt',
          component: pdt,
        },
        {
          path: '/gtx',
          name: 'gtx',
          component: gtx,
        },
        {
          path: '/update_pw',
          name: 'update_pw',
          component: update_pw,
        },
        {
          path: '/rk',
          name: 'rk',
          component: rk,
        },
        {
          path: '/ck',
          name: 'ck',
          component: ck,
        },
      ],
    },
  ],
});
router.beforeEach((to, from, next) => {
  const is_login = sessionStorage.getItem('userInfo');
  console.log(is_login);
  if (is_login) {
    next();
  } else {
    if (to.path.includes('login')) next();
    else if (to.path.includes('test')) next();
    else next('/login');
  }
});
export default router;
