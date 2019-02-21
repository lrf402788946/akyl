<template lang="html">
  <div id="sideMenu" style="height: 100vh; display: block; background: #1c2b36;">
    <div class="base-main-left" id="menuBox">
      <div class="base-sidebar-menu">
        <span class="title">操作面板</span>
        <ul class="mainmenu">
          <div class="mainmain" v-for="(item, index) in menu" :key="index">
            <li>
              <span><i class="fa-stack fa fa-cogs"></i>{{ item.name }}</span>
            </li>
            <ul class="submenu">
              <div class="expand-triangle"></div>
              <div class="sp" v-for="(menu_item, menu_index) in item.menu" :key="menu_index">
                <router-link :to="{ name: menu_item.router_name }"
                  ><li>
                    <span> {{ menu_item.name }}</span>
                  </li></router-link
                >
              </div>
            </ul>
          </div>
        </ul>
        <b-button v-b-toggle.collapse1 variant="primary" class="title">Toggle Collapse</b-button>
        <br />
        <b-collapse id="collapse1" class="mainmenu">
          <b-card class="mainmenu" style="background-color:#1c2b36;">
            <b-list-group>
              <div class="expand-triangle"></div>
              <b-list-group-item style="background-color:#1c2b36;color: #46687f">Cras justo odio</b-list-group-item>
              <b-list-group-item style="background-color:#1c2b36;color: #46687f">Dapibus ac facilisis in</b-list-group-item>
              <b-list-group-item style="background-color:#1c2b36;color: #46687f">Morbi leo risus</b-list-group-item>
              <b-list-group-item style="background-color:#1c2b36;color: #46687f">Porta ac consectetur ac</b-list-group-item>
              <b-list-group-item style="background-color:#1c2b36;color: #46687f">Vestibulum at eros</b-list-group-item>
            </b-list-group>
          </b-card>
        </b-collapse>
        <div class="base-footer">
          爱康管理平台 <br />
          Co pyright © 2019-2020 <br />
          当前版本：1.0
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { YH, XT, YW, CW, TJ } from '@/util/role_menu.js';
import { mapState } from 'vuex';
export default {
  name: 'sideMenu',
  components: {},
  data() {
    return {
      menu: [],
    };
  },
  computed: {
    ...mapState({
      userRoleList: state => state.userRoleList,
    }),
  },
  mounted() {
    var $submenu = $('.submenu');
    var $mainmenu = $('.mainmenu');
    var $sp = $('.sp');
    var $mainmain = $('.mainmain');
    
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

    $sp.on('click', 'li', function() {
      $sp
        .siblings()
        .find('li')
        .removeClass('chosen');
      $(this).addClass('chosen');
    });

    // $mainmain.on('click', 'li', function() {
    //   $(this)
    //     .next('.submenu')
    //     .slideToggle()
    //     .siblings('.submenu')
    //     .slideUp();
    // });

    $mainmenu.on('click', 'li', function() {
      $(this)
        
        .next('.submenu')
        .slideToggle()
        .siblings('.submenu')
        .slideUp()
        
    });



    $mainmenu.children('li:last-child').on('click', function() {
      $mainmenu
        .fadeOut()
        .delay(500)
        .fadeIn();
    });

  },
  created() {
    this.menuList();
  },
  methods: {
    menuList() {
      let newMenu = [];
      if (this.userRoleList) {
        for (const item of this.userRoleList) {
          if (item.role_code !== 'ROLE_ADMIN') {
            switch (item.role_code) {
              case 'ROLE_ZZ':
                newMenu.push(YW);
                break;
              case 'ROLE_CW':
                newMenu.push(CW);
                break;
              case 'ROLE_LD':
                newMenu.push(TJ);
                break;
              default:
                break;
            }
          } else {
            newMenu.splice(0, newMenu.length);
            newMenu.push(YH);
            newMenu.push(XT);
            newMenu.push(YW);
            newMenu.push(CW);
            newMenu.push(TJ);
            break;
          }
        }
        this.$set(this, 'menu', newMenu);
        console.log(this.menu);
      }
    },
  },
};
</script>

<style lang="css">
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
.mainmenu {
  margin-bottom: 0 !important;
}
</style>

<style scoped>
@import '../assets/style/Font-Awesome-master/css/font-awesome.css';
@import '../assets/style/layout/base-Layout-bootstrap.css';
@import '../assets/style/base-style-bootstrap.css';
</style>

