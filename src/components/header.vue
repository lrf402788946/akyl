<template lang="html">
  <div id="Header">
    <div class="base-header">
      <div class="base-header-left" id="menuHead">
        <img src="../assets/img/logo.png" alt="..." class="img-rounded" />
      </div>
      <div class="base-nav" id="base-nav">
        <ul class="top-nav-ul">
          <li><a @click="$router.push('/')">首 &nbsp;&nbsp; 页</a></li>
        </ul>
        <div id="base-user">
          <a href="#" class="user-name" @mouseover="mopen('m1')" @mouseout="mclose()">
            {{ getName() }}
            <span class="button-down fa fa-caret-down"></span>
          </a>
          <div id="m1" style="z-index:999;" @mouseover="mopen('m1')" @mouseout="mclose()">
            <span v-if="loginOrNot()">
              <a @click="$router.push({ name: 'update_pw' })"><i class="fa fa-lock base-margin-right-5"></i>修改密码</a>
              <a @click="logout()"><i class="fa fa-sign-out base-margin-right-5"></i>安全退出</a>
            </span>
            <span v-else>
              <a @click="$router.push({ name: 'login' })"><i class="fa fa-lock base-margin-right-5"></i>登录</a>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
export default {
  name: 'Header',
  components: {},
  data() {
    return {
      avatar: require('@/assets/img/8082.jpg'),
    };
  },
  computed: {
    ...mapState({
      userInfo: state => state.userInfo,
    }),
  },
  mounted() {
    $('#base-nav').width($(window).width() - 241);
    $(window).resize(function() {
      $('#base-nav').width($(window).width() - 241);
    });
  },
  created() {
    this.isLogin();
  },
  methods: {
    ...mapMutations(['isLogout', 'isLogin']),
    mopen(id) {
      // this.mcancelclosetime();
      if (this.ddmenuitem) this.ddmenuitem.style.visibility = 'hidden';
      this.ddmenuitem = document.getElementById(id);
      this.ddmenuitem.style.visibility = 'visible';
    },
    mclose() {
      if (this.ddmenuitem) this.ddmenuitem.style.visibility = 'hidden';
    },
    logout() {
      // sessionStorage.removeItem('userInfo');
      this.isLogout();
      this.$router.push({ path: '/login' });
    },
    loginOrNot() {
      if (this.userInfo) {
        return true;
      } else {
        return false;
      }
    },
    getName() {
      if (this.userInfo) {
        return this.userInfo.user_name ? `欢迎${this.userInfo.user_name}` : '用户';
      } else {
        return '您未登录';
      }
    },
  },
};
</script>

<style lang="css" scoped>
.base-nav ul.top-nav-ul li a {
    color: #4f5151 !important;
}
.base-nav ul.top-nav-ul li a:hover {
    color: #fff !important;
}
#base-user a.user-name {
    color: #4f5151 !important;
}
#base-user a.user-name:hover {
    color: #5bc0de !important;
}
#base-user div a {
    color: #4f5151 !important;
}
#base-user div a:hover {
    color: #fff !important;
}
</style>
