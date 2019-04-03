<template lang="html">
  <div id="bg">
    <!-- 表格 begin -->
    <div class="base-form">
      <div class="form-inline">
        <div class="base-form-title" style="width:100%;">
          <a class="base-margin-left-20">批记录管理</a>
          <div class="button-table"></div>
        </div>
      </div>
      <div class="base-padding-20 base-bg-fff">
        <div>
          <div class="row" style="margin-bottom: 15px !important;">
            <div class="col-lg-3 marginBot4">
              <p class="marginBot4">半成品批号查询:</p>
              <b-form-input v-model="order_no" placeholder="输入半成品批号"></b-form-input>
            </div>
            <div class="col-lg-3 marginBot4">
              <p class="marginBot4">成品批号查询:</p>
              <b-form-input v-model="cp_no" placeholder="输入成品批号"></b-form-input>
            </div>
            <div class="col-lg-3 marginBot4">
              <p class="marginBot4">包装批号查询:</p>
              <b-form-input v-model="bz_no" placeholder="输入包装批号"></b-form-input>
            </div>
            <div class="col-lg-4 marginBot4">
              <p class="marginBot4">日期查询:</p>
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
              <th>型号</th>
              <th>数量</th>
              <th>半成品批号</th>
              <th>成品批号</th>
              <th>包装批号</th>
              <th>包装日期</th>
            </tr>
            <tr v-for="(item, index) in list" :key="index">
              <td>{{ item.kind }}</td>
              <td>{{ item.num }}</td>
              <td @click="getordno(index)">{{ item.order_no }}</td>
              <td>{{ item.cp_no }}</td>
              <td>{{ item.bz_no }}</td>
              <td>{{ item.update_time }}</td>
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
    <!--详情弹框-->
    <b-modal id="updateAlert" title="半成品批记录详情" ref="updateAlert" size="xl" hide-footer no-close-on-esc no-close-on-backdrop hide-header-close>
      <div class="d-block text-center">
        <div class="row">
          <div class="col-lg-4">
            <div class="lh44">半成品批号：</div>
            <b-form-input
              v-model="ordno"
              :disabled="true"
              placeholder="半成品批号"
              onkeypress="return (/[0-9a-zA-Z]/.test(String.fromCharCode(event.keyCode)))"
            ></b-form-input>
          </div>
          <div class="col-lg-4">
            <div class="lh44">型号：</div>
            <b-form-input v-model="kind_name"></b-form-input>
          </div>
          <div class="col-lg-2 marginBot4">
            <b-button
              variant="primary"
              style="font-size: 14px !important; color: rgb(255, 255, 255) !important; width: 60% !important; padding: 5px 10px !important; margin-top:28px; margin-right: 0px !important;"
              @click="alertsearch()"
              >点击查询</b-button
            >
          </div>
          <br />
          <table class="table table-bordered table-striped ">
            <tbody>
              <tr>
                <td>批号</td>
                <td>型号编码</td>
                <td>数量</td>
                <td>针芯批号</td>
                <td>针芯数量</td>
                <td>弹簧批号</td>
                <td>弹簧数量</td>
                <td>原材料批号</td>
              </tr>
              <tr v-for="(item, index) in alist" :key="index">
                <td>
                  <b-form-input v-model="item.order_no" :disabled="true"></b-form-input>
                </td>
                <td>
                  <b-form-input v-model="item.code" :disabled="true"></b-form-input>
                </td>
                <td>
                  <b-form-input v-model="item.num" :disabled="true"></b-form-input>
                </td>
                <td>
                  <b-form-input v-model="item.zx_order_no" :disabled="true"></b-form-input>
                </td>
                <td>
                  <b-form-input v-model="item.zx_num" :disabled="true"></b-form-input>
                </td>
                <td>
                  <b-form-input v-model="item.th_order_no" :disabled="true"></b-form-input>
                </td>
                <td>
                  <b-form-input v-model="item.th_num" :disabled="true"></b-form-input>
                </td>
                <td>
                  <b-form-input v-model="item.ycl_no" :disabled="true"></b-form-input>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <b-button
        variant="secondary"
        @click="closeAlert('update')"
        class="resetButton"
        style="font-size:16px !important; margin-top:25px; float: right; margin-bottom:30px !important; margin-right: 0 !important; padding:6px 20px !important;"
        >返&nbsp;&nbsp;回</b-button
      >
      <!--
      <b-button
        variant="primary"
        @click="exportExcel()"
        class="resetButton"
        style="font-size:16px !important; margin-top:25px; float: right; margin-bottom:30px !important; margin-right: 30px !important; padding:6px 20px !important;"
        >导&nbsp;&nbsp;出</b-button> -->
    </b-modal>
  </div>
</template>

<script>
import Validator from 'async-validator';
import { mapState } from 'vuex';
//import exportExcel from '@/components/exportExcel.vue';
export default {
  name: 'bg',
  metaInfo: {
    title: '批记录管理',
  },
  components: {
    //   exportExcel,
  },
  data() {
    return {
      addForm: new Array(),
      updateForm: new Array(),
      list: [],
      orderid: '',
      kuname: '',
      subForm: [],
      value1: '',
      subFormContent: {
        work_id: null,
        kind_id: '',
        num: 0,
        work_time: 0,
        is_night: 0,
      },
      is_update: true,
      operateId: {},
      currentPage: 1,
      limit: 15,
      totalRow: 0,
      kind_name: '',
      form: {},
      deptList: [],
      kindList: [],
      pjlList: [],
      alist: [],
      order_no: '',
      cp_no: null,
      bz_no: null,
      select_in_date: [],
      start: '',
      end: '',
      ordno: '',
      timeValue: new Array(),
      realorderno: '',
      temporaryList: [],
      mainValidator: new Validator({
        order_no: [{ required: true, message: '请填写半成品批号号' }],
        cp_no: [{ required: true, message: '请填写成品批号' }],
        bz_no: [{ required: true, message: '请填写包装批号' }],
      }),
      is_title_search: false, //是否是模糊查询： true：是模糊查询； false： 不是模糊查询
      skip: 0,
    };
  },
  computed: {
    ...mapState({
      userInfo: state => state.userInfo,
    }),
  },
  created() {
    this.search();
    this.getOtherList();
  },
  watch: {
    is_title_search: {
      handler(nV, oV) {
        this.$set(this, 'currentPage', 1);
        if (nV) {
          this.titlesearch();
        } else {
          this.search();
        }
      },
    },
  },
  methods: {
    //分页
    toSearch(currentPage) {
      this.currentPage = currentPage;
      if (this.is_title_search) {
        this.titlesearch();
      } else {
        this.search();
      }
    },
    //查询
    async search() {
      if (this.is_title_search) {
        this.is_title_search = false;
        return;
      }
      if (this.order_no === null) this.order_no = '';
      if (this.cp_no === null) this.cp_no = '';
      if (this.bz_no === null) this.bz_no = '';
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
        `/akyl/count/count_pjl?order_no=${this.order_no}&cp_no=${this.cp_no}&start_time=${this.start}&end_time=${this.end}&bz_no=${
          this.bz_no
        }&skip=${skip}&limit=${this.limit}`
      );
      if (result.data.msg === '成功') {
        this.$set(this, 'list', result.data.orderSubList);
        this.$set(this, 'totalRow', result.data.totalRow);
      }
      if (result.data.msg === '没有数据') {
        this.list = '';
        this.totalRow = 0;
      }
    },
    //条件查询方法
    async titlesearch() {
      if (this.is_title_search) {
        this.is_title_search = true;
        return;
      }
      if (this.order_no === null) this.order_no = '';
      if (this.cp_no === null) this.cp_no = '';
      if (this.bz_no === null) this.bz_no = '';
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
        `/akyl/count/count_pjl?order_no=${this.order_no}&cp_no=${this.cp_no}&start_time=${this.start}&end_time=${this.end}&bz_no=${
          this.bz_no
        }&skip=${skip}&limit=${this.limit}`
      );
      if (result.data.msg === '成功') {
        this.$set(this, 'list', result.data.orderSubList);
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
      if (this.order_no === null) this.order_no = '';
      if (this.cp_no === null) this.cp_no = '';
      if (this.bz_no === null) this.bz_no = '';
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
        `/akyl/count/count_pjl?order_no=${this.order_no}&cp_no=${this.cp_no}&start_time=${this.start}&end_time=${this.end}&bz_no=${
          this.bz_no
        }&skip=${skip}&limit=${this.limit}`
      );
      if (result.data.msg === '成功') {
        this.$set(this, 'list', result.data.orderSubList);
        this.$set(this, 'totalRow', result.data.totalRow);
      }
      if (result.data.msg === '没有数据') {
        this.list = '';
        this.totalRow = 0;
      }
    },
    async serarchXiangxi() {
      let result = await this.$axios.get(`/akyl/store/in_sub_info?skip=0&limit=100&id=${this.updateForm.id}`);
      this.subList = result.data.subList;
      // this.subList = result.data.subList.map(item => {
      //   let newObject = { text: item.dept_name, value: item.id };
      //   return newObject;
      // });
    },
    //请求各表
    async getOtherList() {
      //请求部门表
      let result = await this.$axios.get('/akyl/dept/dept_list?skip=0&limit=100');
      this.deptList = result.data.deptList;
      // this.deptList = result.data.deptList.map(item => {
      //   let newObject = { text: item.dept_name, value: item.id };
      //   return newObject;
      // });
      // let defalut = { text: '请选择部门', value: null, disabled: true };
      // this.deptList.unshift(defalut);
    },
    //请求批记录表
    async getPjlList() {
      let skip = (this.currentPage - 1) * this.limit;
      let result = await this.$axios.get(`/akyl/count/count_pjl?skip=${skip}&limit=${this.limit}`);
      if (result.data.msg === '成功') {
        this.$set(this, 'list', result.data.orderSubList);
        this.$set(this, 'totalRow', result.data.totalRow);
      }
    },
    //弹框中的查询方法
    async alertsearch() {
      let skip = (this.currentPage - 1) * this.limit;
      let result = await this.$axios.get(`/akyl/count/count_order_no?order_no=${this.order_no}&code=${this.kind_name}&skip=${skip}&limit=${this.limit}`);
      if (result.data.msg === '成功') {
        this.$set(this, 'alist', result.data.orderSubList);
        this.$set(this, 'totalRow', result.data.totalRow);
      }
    },
    getOptions(index) {
      let result = [];
      for (let i = 0; i < this.temporaryList.length; i++) {
        if (i === index) {
          result = JSON.parse(JSON.stringify(this.temporaryList[i]));
          break;
        }
      }
      return result;
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
    //获取对应的order_no
    async getordno(index) {
      let ordnonum = this.list[index].order_no;
      this.ordno = ordnonum;
      this.$set(this, 'ordno', ordnonum);
      this.openAlert('show');
    },
    //打开弹框
    openAlert(type, id) {
      this.subForm = [];
      if (type === 'show') {
        this.$refs.updateAlert.show();
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
      //this.reset();
      //  this.subForm.splice(0, this.subForm.length);
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
    async getKindListx(type) {
      let result = await this.$axios.post(`/akyl/store/type_kind?type=${type}`);
      this.$set(this, 'kindList', result.data.dataList);
    },
    fun(number, number1) {
      if (number * 1 > number1 * 1) {
        alert('数值过大，请重新填写');
        this.form1 = [];
      }
    },
    //删除表单中内容
    closeSubForm(i) {
      this.subForm.splice(i, 1);
    },
    //导出
    exportExcel() {
      var tableStr = `
                      <caption><b>入库单</b></caption>
                      <tr style="text-align:center;">
                        <th>订单号</th>
                        <th>入库人</th>
                        <th>入库日期</th>
                        <th>备注</th>
                      </tr>
                      <tr style="text-align: center;">
                          <td>${this.updateForm.order_no}</td>
                          <td>${this.updateForm.user_name}</td>
                          <td>${this.updateForm.in_date}</td>
                          <td>${this.updateForm.remark}</td>
                      </tr>
                      <tr></tr>
                      <tr style="text-align:center;">
                        <th>类别</th>
                        <th>型号</th>
                        <th>数量</th>
                        <th>&nbsp;</th>
                      </tr>`;
      for (let item of this.subForm) {
        tableStr += ` <tr style="text-align: center;">
                        <td>${item.type === 1 ? '裸针' : item.type === 2 ? '弹簧柄' : item.type === 3 ? '针芯' : '直废'}</td>
                        <td>${item.kind}</td>
                        <td>${item.num}</td>
                        <td>&nbsp;</td>
                      </tr>`;
      }
      //Worksheet名
      var worksheet = 'Sheet1';
      var uri = 'data:application/vnd.ms-excel;base64,';
      // 真正要导出（下载）的HTML模板
      var exportTemplate = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" 
                      xmlns="http://www.w3.org/TR/REC-html40">
                          <head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>
                              <x:Name>${worksheet}</x:Name>
                                  <x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet>
                              </x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->
                          </head>
                          <body>
                              <table border="1" cellspacing="0" cellpadding="0" syle="table-layout: fixed;word-wrap: break-word; word-break: break-all;">${tableStr}</table>
                          </body>
                      </html>`;
      //下载模板
      window.location.href = uri + this.base64(exportTemplate);
    },
    //输出base64编码
    base64(s) {
      return window.btoa(unescape(encodeURIComponent(s)));
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
