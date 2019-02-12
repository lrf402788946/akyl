<template lang='html'>
  <div id="sideMenu" style="height: 100vh; display: block; background: #1c2b36;">
      <div class="base-main-left" id="menuBox">
        <div class="base-sidebar-menu">
          <span class="title">操作面板</span>
          <ul class="mainmenu">
            <li>
              <span><i class="fa-stack fa fa-user"></i>档案管理</span>
            </li>
            <ul class="submenu">
              <div class="expand-triangle"></div>
              <router-link :to="{name:'Index'}"><li><span>干部信息</span></li></router-link>

            </ul>
            <!-- <li>
              <span><i class="fa-stack fa fa-area-chart"></i>预警与统计分析</span>
            </li>
            <ul class="submenu">
              <div class="expand-triangle"></div>
              <router-link :to="{name:'Details'}"><li><span>监测预警</span></li></router-link>
              <li><span>统计分析</span></li>

            </ul> -->
            <li>
              <span><i class="fa-stack fa fa-cogs"></i>系统管理</span>
            </li>
            <ul class="submenu">
              <div class="expand-triangle"></div>
              <router-link :to="{name:'DeptIndex'}"><li><span> 部门管理</span></li></router-link>
              <router-link :to="{name:'UserIndex'}"><li><span> 用户管理</span></li></router-link>
              <router-link :to="{name:'RoleIndex'}"><li><span> 角色管理</span></li></router-link>
              <router-link :to="{name:'UserRoleIndex'}"><li><span> 权限分配</span></li></router-link>
            </ul>

          </ul>
        </div>
        <div class="base-footer"> 干部廉政档案系统 <br /> Co pyright © 2019-2020 <br /> 当前版本：1.0 </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'sideMenu',
  components: {},
  data() {
    return {};
  },
  computed: {},
  mounted() {
    var $submenu = $('.submenu');
    var $mainmenu = $('.mainmenu');
    $submenu.hide();
    $submenu
      .first()
      .delay(400)
      .slideDown(700);
    $submenu.on('click', 'li', function() {
      $submenu
        .siblings()
        .find('li')
        .removeClass('chosen');
      $(this).addClass('chosen');
    });
    $mainmenu.on('click', 'li', function() {
      $(this)
        .next('.submenu')
        .slideToggle()
        .siblings('.submenu')
        .slideUp();
    });
    $mainmenu.children('li:last-child').on('click', function() {
      $mainmenu
        .fadeOut()
        .delay(500)
        .fadeIn();
    });
  },
  methods: {},
};
</script>

<style lang='css'>
a {
    color: #7ba0bb !important;
}
.base-main-left {
  float: left;
  height: 100%;
  width: 240px;
  background-color: #1c2b36;
}
.base-footer {
  font-size: 14px;
  padding: 30px 0;
  color: #46687f;
  background-color: #1c2b36;
  width: 240px;
  height: 100px;
  line-height: 16px;
  text-align: center;
  position: fixed;
  bottom: 0;
  letter-spacing: 1px;
  z-index: 999;
}

a:hover{
  text-decoration: none !important;
}
</style>
