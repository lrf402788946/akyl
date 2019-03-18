<template>
  <div>
    <div class="base-wrapper">
      <Header></Header>
      <div class="base-main" id="base-main">
        <sideMenu style="float:left;"></sideMenu>
        <div id="base-main-right" class="base-main-right">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/header.vue';
import sideMenu from '@/components/side_menu.vue';
export default {
  data() {
    return {
      img: require('@/assets/img/blurred.jpg'),
      form: {},
    };
  },
  components: {
    Header,
    sideMenu,
  },
  mounted() {
    $('#base-main').height($(window).height() - 60);
    $(window).resize(function() {
      $('#base-main').height($(window).height() - 60);
    });
    $('#base-main-right').width($(window).width() - 260);
    $(window).resize(function() {
      $('#base-main-right').width($(window).width() - 260);
    });
  },
  methods: {
    isLogin() {
      let routerPath = this.$route.name;
      console.log(routerPath);
      if (routerPath != null) {
        if (routerPath.includes('login')) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    },
  },
};
</script>
<style>
.ind {
  text-align: center;
  font-size: 60px;
  margin-top: 200px;
  line-height: 50px;
  color: #17a2b8;
}
body {
  padding: 0;
  margin: 0;
  font-family: '微软雅黑';
  font-size: 14px;
  overflow: hidden;
  height: 100vh;
}
.dengBtn {
  padding: 10px 16px;
  font-size: 18px;
  line-height: 1.3333333;
  border-radius: 6px;
  background-color: #5bc0de;
  border: none;
  color: #fff;
  display: block;
  width: 100%;
  text-align: center;
}
.dengBtn:hover {
  cursor: pointer;
}
h1 .h1 {
  font-size: 36px !important;
}
.form-group {
  margin-bottom: 15px !important;
}
label {
  display: inline-block;
  max-width: 100%;
  margin-bottom: 5px !important;
  font-weight: bold;
  font-size: 14px;
}
.btn-info {
  background-color: #5bc0de !important;
  border-color: #46b8da !important;
}
.btn-lg .btn-group-lg > .btn {
  padding: 10px 16px !important;
  font-size: 18px !important;
  line-height: 1.3333333 !important;
  border-radius: 6px !important;
}
.form-control {
  height: 34px !important;
  padding: 6px 12px !important;
  font-size: 14px !important;
  line-height: 1.42857143 !important;
  color: #555 !important;
  border: 1px solid #ccc !important;
  border-radius: 4px !important;
}
.form-container {
  height: auto !important;
  padding-bottom: 30px;
}
</style>

<style scoped>
/* @import '../icon/Font-Awesome-master/css/font-awesome.css';
@import '../layout/base-Layout-bootstrap.css';
@import '../style/base-style-bootstrap.css'; */
</style>
