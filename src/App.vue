<template>
  <div id="app">
    <body>
      <!-- <div v-show="isLogin()">
        <router-view/>
      </div> -->
      <div class="base-wrapper"><!-- v-show="!isLogin()"-->
        <Header></Header>
        <div class="base-main" id="base-main">
          <sideMenu style="float:left;"></sideMenu>
          <div id="base-main-right" class="base-main-right">
            <router-view/>
          </div>
        </div>
      </div>
    </body>
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import sideMenu from '@/components/sideMenu.vue';
export default {
  components: {
    Header,
    sideMenu,
  },
  mounted() {
    $('#base-main').height($(window).height() - 60);
    $(window).resize(function() {
      $('#base-main').height($(window).height() - 60);
    });
    $('#base-main-right').width($(window).width() - 241);
    $(window).resize(function() {
      $('#base-main-right').width($(window).width() - 241);
    });
  },
  methods: {
    isLogin() {
      let routerPath = this.$route.name;
      if (routerPath.includes('Login')) {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>


<style lang="less">
body {
  padding: 0;
  margin: 0;
  font-family: '微软雅黑';
  font-size: 16px;
  overflow: hidden;
}
</style>
