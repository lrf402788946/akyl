<template lang='html'>
  <div id="index">
     <!-- 位置导航 begin  -->
      <b-breadcrumb>
        <b-breadcrumb-item :to="{name:'DeptIndex'}">部门管理</b-breadcrumb-item>
      </b-breadcrumb>
      <!-- 表格 begin -->
      <div class="base-form">
        <div class="form-inline">
          <div class="base-form-title" style="width:100%;"><a class="base-margin-left-20">部门列表</a>
            <div class="button-table">
            </div>
          </div>
        </div>
        <div class="base-padding-20 base-bg-fff">
          <div class="base-align-right" style="margin-bottom:20px;">
            <a class="btn btn-info base-margin-bottom" data-toggle="tooltip" style="font-size:14px !important;padding: 6px 12px !important;" title="" role="button" v-b-modal="'toAdd'">
              <i class="base-margin-right-5 fa fa-plus-square"></i>添加部门
            </a>
          </div>
          <table class="table table-bordered table-striped ">
            <tbody>
              <tr>
                <th>部门名称</th>
                <th>部门职责</th>
                <th>部门电话</th>
                <th>操作</th>
              </tr>
              <tr v-for="(item,index) in list" :key="index"><!--美化下input 可以看情况使用-->
                <td>{{item.dept_name}}</td>
                <td>{{item.dept_duty}}</td>
                <td>{{item.dept_tell}}</td>
                <td>
                  <b-button variant="primary" style="color:white; margin-right:5px;" @click="openAlert('update',index)" >修&nbsp;&nbsp;改</b-button>
                  <b-button variant="danger" style="color:white;"  @click="openDeleteAlert(item.id)">删&nbsp;&nbsp;除</b-button>
                  <!-- <a class="btn btn-xs btn-info base-margin-2" data-toggle="tooltip" @click="toUpdate(index)"
                    title="" role="button">保&nbsp;&nbsp;存</a>&nbsp;&nbsp;&nbsp;&nbsp;
                  <a class="btn btn-xs btn-info base-margin-2" data-toggle="tooltip" @click="toDelete(index)"
                    title="" role="button">删&nbsp;&nbsp;除</a> -->
                </td>
              </tr>
            </tbody>
          </table>
          <b-modal id="toAdd" title="添加部门" ref="toAdd" hide-footer>
            <div style="margin-bottom: 7px;">部门名称:</div>
            <b-form-input v-model="form.dept_name"></b-form-input>
            <div style="margin-top:7px; margin-bottom:7px;">部门职责:</div>
            <b-form-input v-model="form.dept_duty"></b-form-input>
            <div style="margin-top:7px; margin-bottom:7px;">部门电话:</div>
            <b-form-input v-model="form.dept_tell"></b-form-input>
            <b-button variant="secondary" style="font-size:16px !important; margin-top:35px; padding:6px 80px !important;margin-bottom:30px !important;margin-right:0 !important;"  @click="form={}" >重&nbsp;&nbsp;置</b-button>
            <b-button  style="font-size:16px !important; margin-top:35px; float:right; padding:6px 80px !important;margin-bottom:30px !important;margin-right:0 !important;"   variant="primary" @click="toAdd()" >保&nbsp;&nbsp;存</b-button>
          </b-modal>

          <b-modal id="deleteAlert" title="确认删除" ref="deleteAlert" hide-footer> 
            <div class="d-block text-center">
              <b-alert variant="danger" show>删除部门可能会影响您的管理,确认删除吗?</b-alert>
            </div>
           <b-button variant="danger"   style="font-size:16px !important; margin-top:35px; padding:6px 80px !important;margin-bottom:30px !important;margin-right:0 !important;"   @click="toDelete()">删&nbsp;&nbsp;除</b-button>
           <b-button variant="primary"   style="font-size:16px !important; margin-top:35px; float:right; padding:6px 80px !important;margin-bottom:30px !important;margin-right:0 !important;"   @click="$refs.deleteAlert.hide(),deleteItem=''">
             返&nbsp;&nbsp;回</b-button>
          </b-modal>

          <!-- jkjkjkjk -->
          <b-modal id="updateAlert" title="修改信息" ref="updateAlert" hide-footer>
            <div class="d-block">
              <div class="row">
                <div class="col-lg-12 marginBot4">
                    <p class="marginBot4">部门名称</p>
                    <b-form-input v-model="updateForm.dept_name"></b-form-input>
                </div>
                <div class="col-lg-12 marginBot4">
                    <p class="marginBot4">部门职责</p>
                    <b-form-input v-model="updateForm.dept_duty"></b-form-input>
                </div>
                <div class="col-lg-12 marginBot">
                    <p class="marginBot4">部门电话</p>
                    <b-form-input v-model="updateForm.dept_tell"></b-form-input>
                </div>
                <div class="col-lg-12 marginBot4">
                  <b-button variant="secondary" @click="closeAlert('update')" class="resetButton" style="font-size:16px !important; margin-top:35px; padding:6px 80px !important;margin-bottom:30px !important;margin-right:0 !important;"  >
                    返&nbsp;&nbsp;回</b-button>
                  <b-button variant="primary" @click="toUpdate()" class="resetButton"  style="font-size:16px !important; margin-top:35px; float:right; padding:6px 80px !important;margin-bottom:30px !important;margin-right:0 !important;" >
                    保&nbsp;&nbsp;存</b-button>
                </div>
              </div>
            </div>
          </b-modal>
          <!-- klklklkl -->
          
        </div>
      </div>
  </div> 
</template>

<script>
import _ from 'lodash';
export default {
  name: 'index',
  components: {},
  data() {
    return {
      list: [],
      form: {},
      deleteItem: '',
      updateForm: {
        gender: -1,
        dept_id: 'default',
      },
    };
  },
  computed: {},
  created() {
    // this.search();
  },
  methods: {
    //整体逻辑:已有数据的修改直接=>提交=>请求=>刷新视图;添加数据则弹出框添加
    //查询
    async search() {
      //查询方法
      let result = await this.$axios.get('dept/dept_list');
      this.$set(this, 'list', result.data.deptList);
    },
    async toUpdate() {
      let result = await this.$axios.post('dept/dept_edit', { data: this.updateForm });
      this.closeAlert('update');
      this.updateForm = {};
      this.search();
    },
    //打开删除提示框
    openDeleteAlert(id) {
      this.$refs.deleteAlert.show();
      this.deleteItem = id;
    },
    //删除
    async toDelete() {
      let result = await this.$axios.post('dept/dept_delete', { data: { id: this.deleteItem } });
      this.search();
      this.deleteItem = '';
      this.$refs.deleteAlert.hide();
    },
    //添加
    async toAdd() {
      let result = await this.$axios.post('dept/dept_save', { data: this.form });
      this.form = {};
      this.search();
      this.$refs.toAdd.hide();
    },
    openAlert(type, id) {
      if (type === 'update') {
        this.$refs.updateAlert.show();
        this.updateForm = this.list[id];
      } else if (type === 'delete') {
        this.$refs.deleteAlert.show();
        this.operateId = id;
      }
    },
    closeAlert(type) {
      if (type === 'update') {
        this.$refs.updateAlert.hide();
      } else if (type === 'delete') {
        this.$refs.deleteAlert.hide();
      }
      this.operateId = '';
      this.updateForm = {};
    },
  },
};
</script>

<style>
.marginBot4 {
  margin-bottom: 4px;
}
.marginBot {
  margin-bottom: 15px;
}
body {
  background-color: #ecedf0 !important;
}
.btn-primary {
  background-color: #5bc0de !important;
}
.breadcrumb {
  padding: 14px 18px;
  margin-bottom: 25px;
  list-style: none;
  background-color: #f5f5f5;
}
.breadcrumb > li {
  font-size: 16px;
  color: #999;
  display: inline-block;
}
.breadcrumb > li a {
  font-size: 16px;
  color: #999;
  display: inline-block;
}

.base-form-title {
  font-weight: bold;
  display: block;
  line-height: 40px;
  font-size: 16px;
  color: #46687f;
  letter-spacing: 1px;
  text-align: left;
  background-color: #5bc0de;
}
.base-margin-left-20 {
  margin-left: 20px;
}
.base-form-title a {
  color: #fff !important;
  text-decoration: none;
}
.base-padding-20 {
  padding: 20px;
}
.base-bg-fff {
  background-color: #fff;
}
.row {
  margin-right: -15px;
  margin-left: -15px;
}
.base-margin-right-40 {
  margin-right: 40px;
}
.form-group {
  margin-bottom: 15px;
}
.form-control {
  display: block;
  width: 100%;
  height: 44px;
  padding: 6px 15px;
  font-size: 16px;
  line-height: 1.42857143;
  color: #555;
  background-color: #fff;
  background-image: none;
  border: 1px solid #ccc;
  border-radius: 4px;
  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  -webkit-transition: border-color ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;
  -o-transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
}
input,
textarea,
select,
button {
  text-rendering: auto;
  color: initial;
  letter-spacing: normal;
  word-spacing: normal;
  text-transform: none;
  text-indent: 0px;
  text-shadow: none;
  display: inline-block;
  text-align: start;
  margin: 0em;
  font: 400 13.3333px Arial;
}
.btn-info {
  color: #fff;
  background-color: #5bc0de;
  border-color: #46b8da;
}

.base-margin-2 {
  margin: 2px 0;
}
/* .btn-xs,
.btn-group-xs > .btn {
  padding: 3px 8px;
  font-size: 12px;
  line-height: 1.5;
  border-radius: 5px;
}
.btn-info {
  color: #fff;
  background-color: #5bc0de;
  border-color: #46b8da;
} */
.base-margin-right-5 {
  margin-right: 5px;
}
.base-margin-bottom {
  margin-bottom: 20px;
}
.table-bordered {
  border: 1px solid #ddd;
}
.table {
  font-size: 14px;
  width: 100%;
  max-width: 100%;
  margin-bottom: 20px;
}
table {
  background-color: transparent;
}
table {
  border-spacing: 0;
  border-collapse: collapse;
}
.pagination {
  display: inline-block;
  padding-left: 0;
  margin: 0 0;
  border-radius: 4px;
}
.pagination > li {
  display: inline;
}
.pagination-sm > li:first-child > a,
.pagination-sm > li:first-child > span {
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
}
.pagination > li:first-child > a,
.pagination > li:first-child > span {
  margin-left: 0;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
}
.pagination-sm > li > a,
.pagination-sm > li > span {
  padding: 5px 10px;
  font-size: 16px;
  line-height: 1.5;
}
.pagination > li > a,
.pagination > li > span {
  position: relative;
  float: left;
  padding: 6px 12px;
  margin-left: -1px;
  line-height: 1.42857143;
  color: #337ab7;
  text-decoration: none;
  background-color: #fff;
  border: 1px solid #ddd;
}
.pagination-sm > li > a,
.pagination-sm > li > span {
  padding: 5px 10px;
  font-size: 16px;
  line-height: 1.5;
}
.pagination > li > a,
.pagination > li > span {
  position: relative;
  float: left;
  padding: 6px 12px;
  margin-left: -1px;
  line-height: 1.42857143;
  color: #337ab7;
  text-decoration: none;
  background-color: #fff;
  border: 1px solid #ddd;
}
.pagination > li > a:hover {
  color: #666;
  background: #ddd;
}
.base-header {
  min-width: 1024px;
  height: 60px;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.base-header-left {
  float: left;
  width: 240px;
  height: 60px;
  background-color: #1c2b36;
  border-bottom: 1px #161e25 solid;
  background-image: url(/img/logo.8640fb78.png);
  color: #a6a6a6;
  cursor: pointer;
  background-size: 100%;
}

ul,
li {
  margin: 0px;
  padding: 0px;
}
li {
  list-style: none;
}

.cssInput {
  border: none !important;
  box-shadow: none;
}
.table th,
.table td {
  padding: 0.5rem !important;
}
.btn {
  margin-left: 0 !important;
  padding: 2px 5px !important;
  margin-bottom: 0 !important;
  margin-right: 10px !important;
  font-size: 12px !important;
  font-weight: normal !important;
  line-height: 1.42857143 !important;
  text-align: center !important;
  white-space: nowrap !important;
  vertical-align: middle !important;
  width: auto !important;
  border: 1px solid transparent !important;
  border-radius: 3px !important;
  height: auto !important;
}
</style>


<style scoped>
@import '../../assets/style/Font-Awesome-master/css/font-awesome.css';
@import '../../assets/style/layout/base-Layout-bootstrap.css';
@import '../../assets/style/base-style-bootstrap.css';
</style>
