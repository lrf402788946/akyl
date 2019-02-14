<template lang='html'>
  <div id="user">
    <!-- 表格 begin -->
    <div class="base-form">
      <div class="form-inline">
        <div class="base-form-title" style="width:100%;"><a class="base-margin-left-20">用户列表</a>
          <div class="button-table">
          </div>
        </div>
      </div>
      <div class="base-padding-20 base-bg-fff">
        <div class="base-align-right" style="margin-bottom: 20px;">
          <a class="btn btn-info base-margin-bottom" style="font-size:14px !important; color:#fff !important; padding: 6px 12px !important;" data-toggle="tooltip" title="" role="button" v-b-modal="'addAlert'">
            <i class="base-margin-right-5 fa fa-plus-square"></i>添加用户    
          </a>
        </div>
        <table class="table table-bordered table-striped ">
          <tbody>
            <tr>
              <th>姓名</th>
              <th>登录ID</th>
              <th>性别</th>
              <th>办公室电话</th>
              <th>个人电话</th>
              <th>家庭住址</th>
              <th>电子信箱</th>
              <th>操作</th>
            </tr>
            <tr v-for="(item,index) in list" :key="index"><!--美化下input 可以看情况使用-->
              <td>{{item.user_name}}</td>
              <td>{{item.login_id}}</td>
              <td>{{item.gender === 1?'男':'女'}}</td>
              <td>{{item.office_tell}}</td>
              <td>{{item.phone_no}}</td>
              <td>{{item.home_address}}</td>
              <td>{{item.emaill}}</td>
              <td>
                <b-button variant="primary" style="color:white; margin-right:5px;" @click="openAlert('update',index)">详&nbsp;&nbsp;情</b-button>
                <b-button variant="danger" style="color:white;"  @click="openAlert('delete',item.id)">删&nbsp;&nbsp;除</b-button>
              </td>
            </tr>
          </tbody>
        </table>
        <el-pagination
          layout="total, prev, pager, next"
          :background="true"
          :page-size="15"
          prev-text="上一页"
          next-text="下一页"
          @current-change="toSearch"
          :total="totalRow">
        </el-pagination>  
      </div>
    </div>
      <!--添加弹框-->
        <b-modal id="addAlert" title="添加用户" ref="addAlert" hide-footer> 
          <div class="d-block text-center">
            <div class="row">
              <div class="col-lg-6">
                  <b-form-input v-model="addForm.user_name" placeholder="姓名" class="marginBot" onkeypress="return (/[0-9a-zA-Z]/.test(String.fromCharCode(event.keyCode)))" ></b-form-input>
              </div>
              <div class="col-lg-6">
                  <b-form-input v-model="addForm.login_id" placeholder="登录账号" class="marginBot" onkeypress="return (/[0-9a-zA-Z]/.test(String.fromCharCode(event.keyCode)))" ></b-form-input>
              </div>
              <div class="col-lg-6">
                  <b-form-input v-model="addForm.password" placeholder="登录密码" type="password" class="marginBot" onkeypress="return (/[0-9a-zA-Z]/.test(String.fromCharCode(event.keyCode)))" ></b-form-input>
              </div>
              <div class="col-lg-6">
                  <b-form-select v-model="addForm.gender" :options="gender" class="marginBot" />
              </div>
              <div class="col-lg-6">
                  <b-form-input v-model="addForm.office_tell" placeholder="办公室电话" class="marginBot" onkeypress="return (/[0-9\\-]/.test(String.fromCharCode(event.keyCode)))" ></b-form-input>
              </div>
              <div class="col-lg-6">
                  <b-form-input v-model="addForm.phone_no" placeholder="个人电话" class="marginBot" onkeypress="return (/[0-9\\-]/.test(String.fromCharCode(event.keyCode)))" ></b-form-input>
              </div>
              <div class="col-lg-6">
                  <b-form-input v-model="addForm.home_address" placeholder="家庭住址" class="marginBot" onkeypress="return (/[0-9a-zA-Z]/.test(String.fromCharCode(event.keyCode)))" ></b-form-input>
              </div>
              <div class="col-lg-6">
                  <b-form-input v-model="addForm.emaill" placeholder="电子信箱" class="marginBot" onkeypress="return (/[0-9a-zA-Z@.]/.test(String.fromCharCode(event.keyCode)))" ></b-form-input>
              </div>
              <div class="col-lg-6">
                  <el-date-picker v-model="addForm.birthday" type="date" placeholder="出生日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd" ></el-date-picker>
              </div>
              <div class="col-lg-6">
                   <b-form-input v-model="addForm.id_number" placeholder="身份证号" maxlength="18" class="marginBot" onkeypress="return (/[0-9a-zA-Z]/.test(String.fromCharCode(event.keyCode)))" ></b-form-input>
              </div>
              <div class="col-lg-6">
                  <b-form-input v-model="addForm.card_no" placeholder="卡号" class="marginBot" onkeypress="return (/[0-9a-zA-Z]/.test(String.fromCharCode(event.keyCode)))" ></b-form-input>
              </div>
              <div class="col-lg-6"><!--部门需要调用其他表-->
                    <b-form-select v-model="addForm.dept_id"  :options="deptList" class="marginBot" />
              </div>
              <div class="col-lg-6">
                 <b-form-input v-model="addForm.level" placeholder="职务" class="marginBot" onkeypress="return (/[0-9a-zA-Z]/.test(String.fromCharCode(event.keyCode)))" ></b-form-input>
              </div>
              <div class="col-lg-6"><!--岗位需要调用其他表-->
                 <b-form-select v-model="addForm.post_id" placeholder="岗位"  :options="postList" class="marginBot" />
              </div>
            </div>
            <textarea v-model="addForm.remark" class="form-control" rows="3" style="height: 100px !important;" placeholder="备注"></textarea><br/>
          </div>
          <b-button variant="secondary" @click="addForm={gender: null,dept_id: null,post_id: null}" class="resetButton" 
          style="font-size:16px !important; margin-top:25px; padding:6px 80px !important;margin-bottom:30px !important;margin-right:0 !important;">
            重&nbsp;&nbsp;置</b-button>
          <b-button variant="primary" @click="toValidate('add')" class="resetButton" 
          style="font-size:16px !important; margin-top:25px; float:right; padding:6px 80px !important;margin-bottom:30px !important;margin-right:0 !important;"
           >保&nbsp;&nbsp;存</b-button>
        </b-modal>
      <!--修改弹框-->
        <b-modal id="updateAlert" title="修改信息" ref="updateAlert" hide-footer no-close-on-esc no-close-on-backdrop hide-header-close> 
          <div class="d-block">
            <div class="row">
              <div class="col-lg-6 marginBot4">
                  <p class="marginBot4">姓名</p>
                  <b-form-input v-model="updateForm.user_name" :disabled="is_update" onkeypress="return (/[0-9a-zA-Z]/.test(String.fromCharCode(event.keyCode)))"></b-form-input>
              </div>
              <div class="col-lg-6 marginBot4">
                  <p class="marginBot4">登录ID</p>
                  <b-form-input v-model="updateForm.login_id" :disabled="true" onkeypress="return (/[0-9a-zA-Z]/.test(String.fromCharCode(event.keyCode)))"></b-form-input>
              </div>
              <div class="col-lg-6 marginBot4">
                  <p class="marginBot4">性别</p>
                  <b-form-select v-model="updateForm.gender" :options="gender" :disabled="is_update" />
              </div>
              <div class="col-lg-6 marginBot4">
                  <p class="marginBot4">办公室电话</p>
                  <b-form-input v-model="updateForm.office_tell" :disabled="is_update" onkeypress="return (/[0-9a-zA-Z]/.test(String.fromCharCode(event.keyCode)))"></b-form-input>
              </div>
              <div class="col-lg-6 marginBot4">
                  <p class="marginBot4">个人电话</p>
                  <b-form-input v-model="updateForm.phone_no" :disabled="is_update" onkeypress="return (/[0-9a-zA-Z]/.test(String.fromCharCode(event.keyCode)))"></b-form-input>
              </div>
              <div class="col-lg-12 marginBot4">
                  <p class="marginBot4">家庭住址</p>
                  <b-form-input v-model="updateForm.home_address" :disabled="is_update" onkeypress="return (/[0-9a-zA-Z]/.test(String.fromCharCode(event.keyCode)))"></b-form-input>
              </div>
              <div class="col-lg-6 marginBot4">
                  <p class="marginBot4">电子信箱</p>
                  <b-form-input v-model="updateForm.emaill" :disabled="is_update" onkeypress="return (/[0-9a-zA-Z@.]/.test(String.fromCharCode(event.keyCode)))"></b-form-input>
              </div>
              <div class="col-lg-6 marginBot4">
                  <p class="marginBot4">出生日期</p>
                  <el-date-picker v-model="updateForm.birthday" type="date" placeholder="选择日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd" :disabled="is_update" ></el-date-picker>
                  <!-- <input v-model="updateForm.birthday" type="text" class="form-control tyx-cursor" id="updateBirthday" data-date-format="yyyy-mm-dd"/> -->
              </div>
              <div class="col-lg-6 marginBot4">
                  <p class="marginBot4">身份证号</p>
                  <b-form-input v-model="updateForm.id_number" maxlength="18" :disabled="is_update" onkeypress="return (/[0-9a-zA-Z]/.test(String.fromCharCode(event.keyCode)))"></b-form-input>
              </div>
              <div class="col-lg-6 marginBot4">
                  <p class="marginBot4">卡号</p>
                  <b-form-input v-model="updateForm.card_no" :disabled="is_update" onkeypress="return (/[0-9a-zA-Z]/.test(String.fromCharCode(event.keyCode)))"></b-form-input>
              </div>
              <div class="col-lg-6 marginBot4">
                  <p class="marginBot4">部门</p>
                  <b-form-select v-model="updateForm.dept_id"  :options="deptList" :disabled="is_update"/>
              </div>
              <div class="col-lg-6 marginBot4">
                  <p class="marginBot4">职务</p>
                  <b-form-input v-model="updateForm.level" :disabled="is_update" onkeypress="return (/[0-9a-zA-Z]/.test(String.fromCharCode(event.keyCode)))"></b-form-input>
              </div>
              <div class="col-lg-6 marginBot4">
                  <p class="marginBot4">岗位</p>
                  <b-form-select v-model="updateForm.post_id" :options="postList" :disabled="is_update"></b-form-select>
              </div>
              <div class="col-lg-12 marginBot">
                  <p class="marginBot4">备注</p>
                  <textarea v-model="updateForm.remark" class="form-control"  style="height: 100px !important;"  rows="4" :disabled="is_update"></textarea>
              </div>
            </div>
          </div>
          <b-button variant="secondary" @click="closeAlert('update')" class="resetButton" 
          style="font-size:16px !important; margin-top:25px;  padding:6px 80px !important;margin-bottom:30px !important;margin-right:0 !important;" 
          >返&nbsp;&nbsp;回</b-button>
          <b-button v-if="is_update" variant="primary" @click="is_update=false" class="resetButton"  
          style="font-size:16px !important; margin-top:25px; float:right; padding:6px 80px !important;margin-bottom:30px !important;margin-right:0 !important;"
          >修&nbsp;&nbsp;改</b-button>
          <b-button v-if="!is_update" variant="primary" @click="toValidate('update')" class="resetButton"  
          style="font-size:16px !important; margin-top:25px; float:right; padding:6px 80px !important;margin-bottom:30px !important;margin-right:0 !important;"
          >保&nbsp;&nbsp;存</b-button>
         </b-modal>
      <!--删除弹框-->
        <b-modal id="deleteAlert" title="确认删除" ref="deleteAlert" hide-footer no-close-on-esc no-close-on-backdrop hide-header-close> 
          <div class="d-block text-center">
            <b-alert variant="danger" show>删除部门可能会影响您的管理,确认删除吗?</b-alert>
          </div>
          <b-button variant="danger"  style="font-size:16px !important; margin-top:25px; padding:6px 80px !important;margin-bottom:30px !important;margin-right:0 !important;" @click="toDelete()">删&nbsp;&nbsp;除</b-button>
          <b-button variant="primary" style="font-size:16px !important; margin-top:25px; float:right; padding:6px 80px !important;margin-bottom:30px !important;margin-right:0 !important;" class="resetButton"  
          @click="closeAlert('delete'),$refs.deleteAlert.hide(),deleteItem=''">返&nbsp;&nbsp;回</b-button>
          
          
        </b-modal>
  </div>
</template>

<script>
import Validator from 'async-validator';
export default {
  name: 'user',
  metaInfo: {
    title: '用户管理',
  },
  components: {},
  data() {
    return {
      origin: [],
      list: [],
      is_update: true,
      addForm: {
        gender: null,
        dept_id: null,
        post_id: null,
      },
      updateForm: {
        gender: null,
        dept_id: null,
        post_id: null,
      },
      operateId: {},
      gender: [{ text: '请选择性别', value: null, disabled: true }, { text: '男', value: 1 }, { text: '女', value: 0 }],
      currentPage: 1,
      limit: 15,
      totalRow: 100,
      deptList: [],
      postList: [],
      addUserValidator: new Validator({
        user_name: [{ type: 'string', required: true, message: '请填写姓名' }], //{ pattern: /[0-9a-zA-Z]/, message: '输入非空字符'}
        login_id: [{ type: 'string', required: true, message: '请填写登录账号' }],
        password: [{ type: 'string', required: true, message: '请填写登录密码' }],
        gender: [{ required: true, message: '请选择性别' }],
        office_tell: [{ type: 'string', required: true, message: '请填写办公室电话' }],
        phone_no: [{ type: 'string', required: true, message: '请填写个人电话' }],
        home_address: [{ type: 'string', required: true, message: '请填写家庭住址' }],
        emaill: [{ type: 'string', required: true, message: '请填写电子信箱' }],
        birthday: [{ type: 'string', required: true, message: '请选择出生日期' }],
        id_number: [{ type: 'string', required: true, message: '请填写身份证号' }],
        card_no: [{ type: 'string', required: true, message: '请填写卡号' }],
        dept_id: [{ required: true, message: '请选择部门' }],
        level: [{ type: 'string', required: true, message: '请填写职务' }],
        post_id: [{ required: true, message: '请选择岗位' }],
      }),
      updateUserValidator: new Validator({
        user_name: [{ type: 'string', required: true, message: '请填写姓名' }],
        gender: [{ required: true, message: '请选择性别' }],
        office_tell: [{ type: 'string', required: true, message: '请填写办公室电话' }],
        phone_no: [{ type: 'string', required: true, message: '请填写个人电话' }],
        home_address: [{ type: 'string', required: true, message: '请填写家庭住址' }],
        emaill: [{ type: 'string', required: true, message: '请填写电子信箱' }],
        birthday: [{ type: 'string', required: true, message: '请选择出生日期' }],
        id_number: [{ type: 'string', required: true, message: '请填写身份证号' }],
        card_no: [{ type: 'string', required: true, message: '请填写卡号' }],
        dept_id: [{ required: true, message: '请选择部门' }],
        level: [{ type: 'string', required: true, message: '请填写职务' }],
        post_id: [{ required: true, message: '请选择岗位' }],
      }),
    };
  },
  created() {
    this.search();
    this.getOtherList();
  },
  computed: {},
  methods: {
    //分页
    toSearch(currentPage) {
      this.currentPage = currentPage;
      this.search();
    },
    //查询
    async search() {
      let skip = (this.currentPage - 1) * this.limit;
      let result = await this.$axios.get(`/akyl/user/user_list?skip=${skip}&limit=${this.limit}`);
      console.log(result.data.userList);
      if (result.data.msg === '成功') {
        this.$set(this, 'list', result.data.userList);
        this.$set(this, 'origin', result.data.userList);
        this.$set(this, 'totalRow', result.data.totalRow);
      }
    },
    //验证,因为添加和修改内容不一致,所以需要分2个验证器去分别验证
    toValidate(type) {
      if (type === 'add') {
        this.addUserValidator.validate(this.addForm, (errors, fields) => {
          if (errors) {
            return this.handleErrors(errors, fields);
          }
          return this.add();
        });
        // const vali = new P
      } else {
        this.updateUserValidator.validate(this.updateForm, (errors, fields) => {
          if (errors) {
            return this.handleErrors(errors, fields);
          }
          return this.update();
        });
      }
    },
    //添加
    async add() {
      let result = await this.$axios.post('/akyl/user/user_save', { data: this.addForm });
      this.$refs.addAlert.hide();
      this.addForm = {};
      this.search();
    },
    //修改
    async update() {
      let result = await this.$axios.post('/akyl/user/user_edit', { data: this.updateForm });
      this.closeAlert('update');
      this.updateForm = {};
      this.is_update = true;
      this.search();
    },
    //删除
    async toDelete() {
      let result = await this.$axios.post('/akyl/user/user_delete', { data: { id: this.operateId } });
      this.closeAlert('delete');
      this.search();
    },
    //请求各表
    async getOtherList() {
      //请求部门表
      let result = await this.$axios.get('/akyl/dept/dept_list?skip=0&limit=100');
      this.deptList = result.data.deptList.map(item => {
        let newObject = { text: item.dept_name, value: item.id };
        return newObject;
      });
      let defalut = { text: '请选择部门', value: null, disabled: true };
      this.deptList.unshift(defalut);
      //请求岗位表
      result = await this.$axios.get('/akyl/post/post_list?skip=0&limit=100');
      this.postList = result.data.postList.map(item => {
        let newObject = { text: item.name, value: item.id };
        return newObject;
      });
      defalut = { text: '请选择岗位', value: null, disabled: true };
      this.postList.unshift(defalut);
    },
    //打开与关闭修改和删除的弹框,现在关闭添加弹框自己点x
    openAlert(type, id) {
      if (type === 'update') {
        this.$refs.updateAlert.show();
        this.updateForm = JSON.parse(JSON.stringify(this.list[id]));
      } else if (type === 'delete') {
        this.$refs.deleteAlert.show();
        this.operateId = id;
      }
    },
    //关闭弹框
    closeAlert(type) {
      if (type === 'update') {
        this.$refs.updateAlert.hide();
      } else if (type === 'delete') {
        this.$refs.deleteAlert.hide();
      }
      this.list = JSON.parse(JSON.stringify(this.origin));
      this.is_update = true;
      this.operateId = '';
      this.updateForm = {};
    },
    //验证错误
    handleErrors(errors, fields) {
      this.$message.error(errors[0].message);
      this.errors = errors.reduce((p, c) => {
        // eslint-disable-next-line no-param-reassign
        p[c.field] = 'error';
        return p;
      }, {});
      // eslint-disable-next-line no-console
      console.debug(errors, fields);
    },
  },
};
</script>

<style scoped>
.marginBot4 {
  margin-bottom: 4px;
}
.marginBot {
  margin-bottom: 15px;
}
.resetButton {
  color: #fff;
  margin-right: 20px;
}
.table th,
.table td {
  padding: 0.5rem;
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
.btn-primary {
  background-color: #5bc0de;
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
.btn-xs,
.btn-group-xs > .btn {
  padding: 3px 8px;
  font-size: 14px;
  line-height: 1.5;
  border-radius: 5px;
}
.btn-info {
  color: #fff;
  background-color: #5bc0de;
  border-color: #46b8da;
}
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
.base-header {
  min-width: 1024px;
  height: 75px;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.base-header-left {
  float: left;
  width: 240px;
  height: 60px;
  border-bottom: 1px #161e25 solid;
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
.modal.show .modal-dialog {
  -webkit-transform: none;
  transform: none;
  max-width: 700px !important;
}
@media (min-width: 576px) {
  .modal-dialog {
    max-width: 700px !important;
    margin: 1.75rem auto;
  }
}
</style>


<style scoped>
@import '../../assets/style/Font-Awesome-master/css/font-awesome.css';
@import '../../assets/style/layout/base-Layout-bootstrap.css';
@import '../../assets/style/base-style-bootstrap.css';
</style>
