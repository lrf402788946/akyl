/* eslint-disable vue/no-parsing-error */
<template lang="html">
  <div id="bg">
    <!-- 表格 begin -->
    <div class="base-form">
      <div class="form-inline">
        <div class="base-form-title" style="width:100%;">
          <a class="base-margin-left-20">包装管理</a>
          <div class="button-table"></div>
        </div>
      </div>
      <div class="base-padding-20 base-bg-fff">
        <div>
          <div class="row" style="margin-bottom: 15px !important;">
            <div class="col-lg-3 marginBot4">
              <p class="marginBot4">订单单号查询:</p>
              <b-form-input v-model="select_order_num" placeholder="输入订单单号"></b-form-input>
            </div>
            <div class="col-lg-3 marginBot4">
              <p class="marginBot4">产品批号查询:</p>
              <b-form-input v-model="select_cp_no" placeholder="输入包装单号"></b-form-input>
            </div>
            <div class="col-lg-3 marginBot4">
              <p class="marginBot4">包装状态:</p>
              <b-form-select v-model="select_status" :options="chooseStatus"/>
            </div>
            <div class="col-lg-4 marginBot4">
              <p class="marginBot4">包装日期查询:</p>
              <el-date-picker
                style="width:100%; height: 34px !important; line-height: 34px !important;"
                v-model="select_in_date"
                value-format="yyyy-MM-dd"
                format="yyyy-MM-dd"
                type="daterange"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              >
              </el-date-picker>
            </div>
            <div class="col-lg-2 marginBot4">
              <b-button
                variant="primary"
                style="font-size: 14px !important; color: rgb(255, 255, 255) !important; width: 60% !important; padding: 5px 10px !important; margin-top:28px; margin-right: 0px !important;"
                @click="searchButton()"
                >点击查询</b-button
              >
            </div>
          </div>
        </div>

        <table class="table table-bordered table-striped ">
          <tbody v-if="list.length > 0">
            <tr>
              <!-- <th>cus_id客户编号</th> -->
              <th>订单单号</th>
              <th>订单日期</th>
              <th>型号</th>
              <th>客户名称</th>
              <th>订单数量</th>
              <!-- <th>order_id订单Id</th> -->
              <th>创建日期</th>
              <th>包装状态</th>
              <th>半成品批号</th>
              <th>包装批号</th>
              <th>产品批号</th>
              <th>操作</th>
            </tr>
            <tr v-for="(item, index) in list" :key="index">
              <!-- <td>{{ item.cus_id }}</td> -->
              <td>{{ item.order_num }}</td>
              <td>{{ item.in_date }}</td>
              <td>{{ item.code }}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.num }}</td>
              <!-- <td>{{ item.order_id }}</td> -->
              <td>{{ item.update_time }}</td>
              <td>{{ item.status == '0' ? '未包装' : '已经包装' }}</td>
              <td>{{ item.order_no }}</td>
              <td>{{ item.bz_no }}</td>
              <td>{{ item.cp_no }}</td>
              <td>
                <b-button variant="primary" style="color:white; margin-right:5px;" @click="openAlert('update', index)">详&nbsp;&nbsp;情</b-button>
              </td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr>
              <td style="text-align:center;">没有查询到数据</td>
            </tr>
          </tbody>
        </table>
        <el-pagination
          layout="total, prev, pager, next"
          :background="true"
          :page-size="15"
          prev-text="上一页"
          next-text="下一页"
          :current-page="currentPage"
          @current-change="toSearch"
          :total="totalRow"
        >
        </el-pagination>
      </div>
    </div>

    <!--详情/修改-->
    <b-modal id="updateAlert" title="包装详情" ref="updateAlert" size="xl" hide-footer no-close-on-esc no-close-on-backdrop hide-header-close>
      <div class="d-block text-center">
        <div class="row">
          <div class="col-lg-4 mb25">
            <div class="lh44">订单单号：</div>
            <b-form-input v-model="updateForm.order_num" :disabled="true"></b-form-input>
          </div>
          <div class="col-lg-4 mb25">
            <div class="lh44">订单日期：</div>
            <b-form-input v-model="updateForm.in_date" :disabled="true"></b-form-input>
          </div>
          <div class="col-lg-4 mb25">
            <div class="lh44">型号：</div>
            <b-form-input v-model="updateForm.code" :disabled="true"></b-form-input>
          </div>
          <div class="col-lg-4 mb25">
            <div class="lh44">客户名称：</div>
            <b-form-input v-model="updateForm.name" :disabled="true"></b-form-input>
          </div>
          <div class="col-lg-4 mb25">
            <div class="lh44">订单数量：</div>
            <b-form-input v-model="updateForm.num" :disabled="true"></b-form-input>
          </div>
          <div class="col-lg-4 mb25">
            <div class="lh44">创建日期：</div>
            <b-form-input v-model="updateForm.update_time" :disabled="true"></b-form-input>
          </div>
          <div class="col-lg-4 mb25">
            <div class="lh44">包装状态：</div>
            <b-form-select v-model="updateForm.status" :options="updateChooseStatus" :disabled="true   " />
          </div>
          <div class="col-lg-4 mb25">
            <div class="lh44">半成品批号：</div>
            <b-form-input v-model="updateForm.order_no" :disabled="is_update"></b-form-input>
          </div>
          <div class="col-lg-4 mb25">
            <div class="lh44">包装批号：</div>
            <b-form-input v-model="updateForm.bz_no" :disabled="is_update"></b-form-input>
          </div>
          <div class="col-lg-4 mb25">
            <div class="lh44">产品批号：</div>
            <b-form-input v-model="updateForm.cp_no" :disabled="is_update"></b-form-input>
          </div>
        </div>
      </div>
      <b-button
        v-if="is_update"
        variant="primary"
        @click="isUpdate(updateForm.status)"
        class="resetButton"
        style="font-size:16px !important; margin:10px 5% 30px 5% !important; background-color: #17a2b8 !important;  width:30% !important; padding:6px 80px !important;"
        >修&nbsp;&nbsp;改</b-button
      >
      <b-button
        v-if="!is_update"
        variant="primary"
        @click="toValidate('update')"
        class="resetButton"
        style="font-size:16px !important; margin:10px 5% 30px 5% !important; background-color: #17a2b8 !important;  width:30% !important; padding:6px 80px !important;"
        >保&nbsp;&nbsp;存</b-button
      >
      <b-button
        variant="secondary"
        @click="closeAlert('update')"
        class="resetButton"
        style="font-size:16px !important; margin:10px 5% 30px 5% !important; background-color: #ccc !important;  width:30% !important; padding:6px 80px !important;"
        >返&nbsp;&nbsp;回</b-button
      >
    </b-modal>
  </div>
</template>

<script>
import Validator from 'async-validator';
import { mapState } from 'vuex';
import { log } from 'util';
//import exportExcel from '@/components/exportExcel.vue';
export default {
  name: 'package',
  metaInfo: {
    title: '包装管理',
  },
  data() {
    return {
      updateForm: new Array(),
      list: [],
      customerName: [],
      subForm: [],
      subFormContent: {},
      orderSubListContent: {},
      is_update: true,
      operateId: {},
      currentPage: 1,
      limit: 15,
      totalRow: 0,
      form: {},
      kindList: [],
      workList: [],
      orderSubList: [],
      selectKind: '',
      selectKindList: [],
      selectKindListContent: {},
      start: '',
      end: '',
      mainValidator: new Validator({
        // cus_id: [{ required: true, message: '请选择客户' }],
        // status: [{ required: true, message: '请选择是否出库' }],
      }),
      th: ['包装号', '包装人', '包装日期', '备注'],
      filterVal: ['order_no', 'user_name', 'in_date', 'remark'],
      select_order_num: '',
      select_cp_no: '',
      select_status: '',
      select_in_date: null,
      chooseStatus: [{ text: '所有状态', value: '' },{ text: '未包装', value: '0' }, { text: '已经包装', value: '1' }],
      updateChooseStatus: [{ text: '未包装', value: '0' }, { text: '已经包装', value: '1' }],
      is_title_search:false, //是否是模糊查询： true：是模糊查询； false： 不是模糊查询
      skip:0,
    };
  },
  computed: {
    ...mapState({
      userInfo: state => state.userInfo,
    }),
  },
  created() {
    this.search();
    this.searchName();
  },
  watch:{
    is_title_search: {
      handler(nV, oV) {
        this.$set(this, 'currentPage', 1);
        if (nV) {
          this.titlesearch();
        } else {
          this.search();
        }
      }
    },
  },
  methods: {
    //分页
    toSearch(currentPage) {
      this.currentPage = currentPage;
      if (this.is_title_search) {
        this.titlesearch();
      }else{
        this.search();
      }
    },
    //查询
    async search() {
      if (this.is_title_search) {
        this.is_title_search = false;
        return;
      }
      if (this.select_order_num === null) this.select_order_num = '';
      if (this.select_cp_no === null) this.select_cp_no = '';
      if (this.select_in_date === null) this.select_in_date = '';
      if (typeof this.select_in_date[0] != 'undefined') {
        this.start = this.select_in_date[0];
      } else {
        this.start = '';
      }
      if (typeof this.select_in_date[1] != 'undefined') {
        this.end = this.select_in_date[1];
      } else {
        this.end = '';
      }
      let skip = (this.currentPage - 1) * this.limit;
      let result = await this.$axios.get(
        `/akyl/order/package_list?skip=${skip}&limit=${this.limit}&status=${this.select_status}&order_num=${this.select_order_num}&cp_no=${this.select_cp_no}&start_time=${
          this.start
        }&end_time=${this.end}`
      );
      if (result.data.msg === '成功') {
        this.$set(this, 'list', result.data.orderList);
        this.$set(this, 'totalRow', result.data.totalRow);
      }
      if (result.data.msg === '没有数据') {
        this.list = '';
        this.totalRow = 0;
      }
    },
    //查询按钮
    async titlesearch() {
      if (this.is_title_search) {
        this.is_title_search = true;
        return;
      }
      if (this.select_order_num === null) this.select_order_num = '';
      if (this.select_cp_no === null) this.select_cp_no = '';
      if (this.select_in_date === null) this.select_in_date = '';
      if (typeof this.select_in_date[0] != 'undefined') {
        this.start = this.select_in_date[0];
      } else {
        this.start = '';
      }
      if (typeof this.select_in_date[1] != 'undefined') {
        this.end = this.select_in_date[1];
      } else {
        this.end = '';
      }
      let skip = (this.currentPage - 1) * this.limit;
      let result = await this.$axios.get(
        `/akyl/order/package_list?skip=${skip}&limit=${this.limit}&status=${this.select_status}&order_num=${this.select_order_num}&cp_no=${this.select_cp_no}&start_time=${
          this.start
        }&end_time=${this.end}`
      );
      if (result.data.msg === '成功') {
        this.$set(this, 'list', result.data.orderList);
        this.$set(this, 'totalRow', result.data.totalRow);
      }
      if (result.data.msg === '没有数据') {
        this.list = '';
        this.totalRow = 0;
      }
    },
    //模糊查询按钮
    async searchButton() {
      this.currentPage = 1;
      if (this.is_title_search) {
        this.is_title_search = true;
        return;
      }
      if (this.select_order_num === null) this.select_order_num = '';
      if (this.select_cp_no === null) this.select_cp_no = '';
      if (this.select_in_date === null) this.select_in_date = '';
      if (typeof this.select_in_date[0] != 'undefined') {
        this.start = this.select_in_date[0];
      } else {
        this.start = '';
      }
      if (typeof this.select_in_date[1] != 'undefined') {
        this.end = this.select_in_date[1];
      } else {
        this.end = '';
      }
      let skip = 0;
      let result = await this.$axios.get(
        `/akyl/order/package_list?skip=${skip}&limit=${this.limit}&status=${this.select_status}&order_num=${this.select_order_num}&cp_no=${this.select_cp_no}&start_time=${
          this.start
        }&end_time=${this.end}`
      );
      if (result.data.msg === '成功') {
        this.$set(this, 'list', result.data.orderList);
        this.$set(this, 'totalRow', result.data.totalRow);
      }
      if (result.data.msg === '没有数据') {
        this.list = '';
        this.totalRow = 0;
      }
    },
    //查询客户姓名
    async searchName() {
      let skip = (this.currentPage - 1) * this.limit;
      let result = await this.$axios.get(`/akyl/customer/customer_list?skip=${skip}&limit=${this.limit}`);
      if (result.data.msg === '成功') {
        this.customerName = result.data.customerList.map(item => {
          let newObject = { text: item.name, value: item.id };
          return newObject;
        });
      }
    },
    //显示客户姓名
    getName(id) {
      for (let index = 0; index < this.customerName.length; index++) {
        if (this.customerName[index].value === id) {
          return this.customerName[index].text;
        }
      }
    },
    //验证
    toValidate(type) {
      this.mainValidator.validate(type === 'add' ? this.form : this.updateForm, (errors, fields) => {
        if (errors) {
          return this.handleErrors(errors, fields);
        }
        if (type === 'add') {
          return this.add();
        } else {
          return this.update();
        }
      });
    },
    //判断是否为已经包装来断定可否修改
    isUpdate(status){
      let id = this.updateForm.order_id;
      console.log(id)
      if (status==1) {
        this.is_update=true
      }else{
        this.is_update=false
      }
    },
    //修改
    async update() {
      let id = this.updateForm.id;
      let order_no = this.updateForm.order_no;
      let bz_no = this.updateForm.bz_no;
      let cp_no = this.updateForm.cp_no;
      let result = await this.$axios.post('/akyl/order/package_edit', { data: { id : id, order_no : order_no, bz_no : bz_no, cp_no : cp_no } });
        if (result.data.msg === '成功') {
          this.closeAlert('update');
          this.updateForm = new Array();
          this.is_update = true;
          this.search();
        }
    },
    //打开与关闭修改和删除的弹框
    async openAlert(type, id) {
      this.subForm = [];
      this.orderSubList = [];
      if (type === 'update') {
        this.$refs.updateAlert.show();
        this.updateForm = JSON.parse(JSON.stringify(this.list[id]));
      }
    },
    //关闭弹框
    closeAlert(type) {
      if (type === 'update') {
        this.$refs.updateAlert.hide();
      } 
      // this.form.user_name = this.userInfo.user_name;
      // this.form.login_id = this.userInfo.login_id;
      this.is_update = true;
      this.operateId = '';
      this.reset();
    },
    //验证错误
    handleErrors(errors, fields) {
      this.$message.error(errors[0].message);
      this.errors = errors.reduce((p, c) => {
        p[c.field] = 'error';
        return p;
      }, {});
      console.debug(errors, fields);
    },
    reset() {
      this.form = {};
      this.subForm = [];
      this.form.user_name = this.userInfo.user_name;
      this.form.login_id = this.userInfo.login_id;
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
  vertical-align: inherit;
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
.btn-primary1 {
  background-color: #5bc0de;
  color: white;
  width: 400px;
  height: 280px;
  cursor: hand;
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
.lh44 {
  text-align: left;
  line-height: 35px;
}
.mb25 {
  margin-bottom: 10px;
}
.mb20 {
  margin-bottom: 20px;
}
</style>
<style scoped>
@import '../../assets/style/Font-Awesome-master/css/font-awesome.css';
@import '../../assets/style/layout/base-Layout-bootstrap.css';
@import '../../assets/style/base-style-bootstrap.css';
</style>
