import Vue from 'vue';
import Router from 'vue-router';
import Index from './views/example/example.vue';
import post from './views/post/post.vue';
import dept from './views/dept/dept.vue';

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
      path: '/post',
      name: 'post',
      component: post,
    },
    {
      path: '/dept',
      name: 'dept',
      component: dept,
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
