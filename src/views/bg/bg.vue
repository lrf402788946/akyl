<template lang='html'>
  <div id="bg">
    <!-- 表格 begin -->
    <div class="base-form">
      <div class="form-inline">
        <div class="base-form-title" style="width:100%;"><a class="base-margin-left-20">报工单管理</a>
          <div class="button-table">
          </div>
        </div>
      </div>
      <div class="base-padding-20 base-bg-fff">
        <div class="base-align-right" style="margin-bottom: 20px;">
          <a class="btn btn-info base-margin-bottom" style="font-size:14px !important; color:#fff !important; padding: 6px 12px !important;" data-toggle="tooltip" title="" role="button" @click="openAlert('add')"><!-- v-b-modal="'addAlert'"-->
            <i class="base-margin-right-5 fa fa-plus-square"></i>新建报工单    
          </a>
        </div>
        <table class="table table-bordered table-striped ">
          <tbody>
            <tr>
              <th>工号</th>
              <th>总工时</th>
              <th>请假时间</th>
              <th>操作</th>
            </tr>
            <tr v-for="(item,index) in list" :key="index">
              <td>{{item.work_num}}</td>
              <td>{{item.work_time}}</td>
              <td>{{item.break_time}}</td>
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
        <b-modal id="addAlert" title="新添报工单" ref="addAlert" size="xl" hide-footer> 
          <div class="d-block text-center">
            <div class="row">
              <div class="col-lg-6">
                  <b-form-input v-model="form.user_name" placeholder="工号" class="marginBot" onkeypress="return (/[0-9a-zA-Z]/.test(String.fromCharCode(event.keyCode)))" ></b-form-input>
              </div>
              <div class="col-lg-6">
                  <b-form-input v-model="form.login_id" placeholder="总工时" class="marginBot" onkeypress="return (/[0-9a-zA-Z.:]/.test(String.fromCharCode(event.keyCode)))" ></b-form-input>
              </div>
              <div class="col-lg-6">
                  <b-form-input v-model="form.password" placeholder="请假时间" type="password" class="marginBot" onkeypress="return (/[0-9a-zA-Z.:]/.test(String.fromCharCode(event.keyCode)))" ></b-form-input>
              </div>
              <br/>
              <table class="table table-bordered table-striped ">
                <tbody>
                <tr>
                  <td>工序</td>
                  <td>类型</td>
                  <td>数量</td>
                  <td>工时</td>
                  <td>夜班</td>
                  <td>加班</td>
                  <td>备注</td>
                </tr>
                <tr v-for="(item,index) in subForm" :key="index">
                  <td><b-form-select v-model="item.work_id" :options="workList" class="marginBot" /></td>
                  <td><b-form-select v-model="item.kind_id" :options="kindList" class="marginBot" /></td>
                  <td><b-form-input v-model="item.num" type="number" class="marginBot" onkeypress="return (/[0-9.]/.test(String.fromCharCode(event.keyCode)))" ></b-form-input></td>
                  <td><b-form-input v-model="item.time" type="number"  class="marginBot" onkeypress="return (/[0-9.]/.test(String.fromCharCode(event.keyCode)))" ></b-form-input></td>
                  <td><b-form-checkbox
                        :id="'checkbox'+index"
                        v-model="item.is_night"
                        :options="is_night_or_not"
                      >
                      </b-form-checkbox></td>
                  <td><b-form-input v-model="item.addTime" type="number"  class="marginBot" onkeypress="return (/[0-9.]/.test(String.fromCharCode(event.keyCode)))" ></b-form-input></td>
                  <td><textarea v-model="item.remark" class="form-control" rows="3" style="height: 100px !important;" placeholder="备注"></textarea><br/></td>
                </tr>
                <b-button variant="primary" @click="addSubForm()" class="resetButton" >添&nbsp;&nbsp;加</b-button>
                </tbody>
              </table>
              <!-- <div class="col-lg-6">
                    <b-form-select v-model="form.work_id"  placeholder="工序"  :options="workList" class="marginBot" />
              </div>
              <div class="col-lg-6">
                 <b-form-select v-model="form.kind_id" placeholder="类型"  :options="kindList" class="marginBot" />
              </div>
              <div class="col-lg-6">
                  <b-form-input v-model="form.num" placeholder="数量" class="marginBot" onkeypress="return (/[0-9\\-]/.test(String.fromCharCode(event.keyCode)))" ></b-form-input>
              </div>
              <div class="col-lg-6">
                  <b-form-input v-model="form.time" placeholder="工时" class="marginBot" onkeypress="return (/[0-9\\-]/.test(String.fromCharCode(event.keyCode)))" ></b-form-input>
              </div>
              <div class="col-lg-6">
                  <b-form-input v-model="form.is_night" placeholder="夜班" class="marginBot" onkeypress="return (/[0-9a-zA-Z]/.test(String.fromCharCode(event.keyCode)))" ></b-form-input>
              </div> -->
              
            </div>
            <!-- <textarea v-model="form.remark" class="form-control" rows="3" style="height: 100px !important;" placeholder="备注"></textarea><br/> -->
          </div>
          <b-button variant="secondary" @click="form={gender: null,dept_id: null,post_id: null}" class="resetButton" 
          style="font-size:16px !important; margin-top:25px; padding:6px 80px !important;margin-bottom:30px !important;margin-right:0 !important;">
            重&nbsp;&nbsp;置</b-button>
          <b-button variant="primary" @click="toValidate('add')" class="resetButton" 
          style="font-size:16px !important; margin-top:25px; float:right; padding:6px 80px !important;margin-bottom:30px !important;margin-right:0 !important;"
           >保&nbsp;&nbsp;存</b-button>
        </b-modal>
  </div>
</template>

<script>
export default {
  name: 'bg',
  metaInfo: {
    title: '用户管理',
  },
  components: {},
  data() {
    return {
      list: [],
      subForm: [],
      subFormContent: {
        work_id: null,
        kind_id: null,
        num: 0,
        time: 0,
        is_night: false,
        addTime: 0,
      },
      is_night_or_not: { text: '夜班', value: true },
      is_update: true,
      operateId: {},
      currentPage: 1,
      limit: 15,
      totalRow: 100,
      form: {
        kind_id: null,
        work_id: null,
      },
      kindList: [{ text: '请选择类型', value: null }, { text: 'kind1', value: 1 }, { text: 'kind2', value: 2 }],
      workList: [{ text: '请选择工序', value: null }, { text: 'work1', value: 1 }, { text: 'work2', value: 2 }],
    };
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
      let result = await this.$axios.get(`/akyl/bg/bg_list?skip=${skip}&limit=${this.limit}`);
      console.log(result.data.userList);
      if (result.data.msg === '成功') {
        this.$set(this, 'list', result.data.bgList);
        this.$set(this, 'totalRow', result.data.totalRow);
      }
    },
    //验证,因为添加和修改内容不一致,所以需要分2个验证器去分别验证
    toValidate(type) {
      if (type === 'add') {
        this.addUserValidator.validate(this.form, (errors, fields) => {
          if (errors) {
            return this.handleErrors(errors, fields);
          }
          return this.add();
        });
      } else {
        this.updateUserValidator.validate(this.updateForm, (errors, fields) => {
          if (errors) {
            return this.handleErrors(errors, fields);
          }
          return this.update();
        });
      }
    },
    //请求各表
    async getOtherList() {
      //请求工序表
      let result = await this.$axios.get('/akyl/work/work_list?skip=0&limit=100');
      this.workList = result.data.workList.map(item => {
        let newObject = { text: item.name, value: item.id };
        return newObject;
      });
      let defalut = { text: '请选择工序', value: null, disabled: true };
      this.workList.unshift(defalut);
      //请求类型表
      result = await this.$axios.get('/akyl/kind/kind_list?skip=0&limit=100');
      this.kindList = result.data.kindList.map(item => {
        let newObject = { text: item.name, value: item.id };
        return newObject;
      });
      defalut = { text: '请选择岗位', value: null, disabled: true };
      this.kindList.unshift(defalut);
    },
    //打开与关闭修改和删除的弹框
    openAlert(type, id) {
      if (type === 'update') {
        this.$refs.updateAlert.show();
        this.updateForm = JSON.parse(JSON.stringify(this.list[id]));
      } else if (type === 'delete') {
        this.$refs.deleteAlert.show();
        this.operateId = id;
      } else if (type === 'add') {
        this.addSubForm();
        this.$refs.addAlert.show();
      }
    },
    //关闭弹框
    closeAlert(type) {
      if (type === 'update') {
        this.$refs.updateAlert.hide();
      } else if (type === 'delete') {
        this.$refs.deleteAlert.hide();
      }
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
    //添加字表数据
    addSubForm() {
      this.subForm.push(JSON.parse(JSON.stringify(this.subFormContent)));
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
