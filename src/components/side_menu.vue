<template lang="html">
  <div id="sideMenu" style="height: 100vh; display: block; background: #1c2b36;">
    <div class="base-main-left" id="menuBox">
      <div class="base-sidebar-menu">
        <span class="title">操作面板</span>
        <ul class="mainmenu">
          <span v-for="(item, index) in menu" :key="index">
            <div @click="openMenuList(index)" class="tit"><i class="fa-stack fa fa-cogs"></i>{{ item.name }}</div>
            <b-collapse id="collapse" class="mainmenu" ref="collapse">
              <b-card style="background-color:#1c2b36;">
                <b-list-group>
                  <div class="expand-triangle"></div>
                  <b-list-group-item v-for="(menu_item, menu_index) in item.menu" :key="menu_index">
                    <router-link :to="{ name: menu_item.router_name }"
                      ><li>
                        <span> {{ menu_item.name }}</span>
                      </li>
                    </router-link>
                  </b-list-group-item>
                </b-list-group>
              </b-card>
            </b-collapse>
          </span>
        </ul>
        <div class="base-footer">
          爱康管理平台 <br />
          Compyright © 2019-2020 <br />
          当前版本：1.0
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { YH, XT, YW, CW, TJ, CK, CL ,DD } from '@/util/role_menu.js';
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
                newMenu.push(CK);
                newMenu.push(TJ);
                break;
              case 'ROLE_CW':
                newMenu.push(CW);
                newMenu.push(YW);
                break;
              case 'ROLE_LD':
                newMenu.push(TJ);
                newMenu.push(CK);
                break;
              case 'ROLE_SC':
                newMenu.push(CK);
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
            newMenu.push(CK);
            newMenu.push(CW);
            newMenu.push(TJ);
            newMenu.push(CL);
            newMenu.push(DD);
            break;
          }
        }
        this.$set(this, 'menu', newMenu);
      }
    },
    openMenuList(index) {
      if (!this.$refs.collapse[index].show) {
        this.$refs.collapse.forEach(item => {
          item.show = false;
        });
        this.$refs.collapse[index].show = true;
      } else {
        this.$refs.collapse[index].show = false;
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
.tit {
  color:#7ba0bb;
  display: block;
  line-height: 50px;
  font-size: 14px;
  padding-left: 40px;
  border-bottom: 1px solid #161e25;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.card-body{
  padding:0 !important;
}
.list-group-item{
    line-height: 20px !important;
    height: 40px !important;
    padding-top: 11px !important;
    margin-left: 0px !important;
    background-color: #161e25 !important;
    border-left: solid 6px #161e25 !important;
    color: #7ba0bb !important;
}
.list-group-item:hover{
  border-left: solid 6px #325671 !important;
	color:#fff !important;
}
</style>

<style scoped>
@import '../assets/style/Font-Awesome-master/css/font-awesome.css';
@import '../assets/style/layout/base-Layout-bootstrap.css';
@import '../assets/style/base-style-bootstrap.css';
</style>
