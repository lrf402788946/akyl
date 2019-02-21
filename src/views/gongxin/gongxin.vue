<template lang="html">
  <div id="bg">
    <!-- 表格 begin -->
    <div class="base-form">
      <div class="form-inline">
        <div class="base-form-title" style="width:100%;"><a class="base-margin-left-20">工资管理</a></div>
      </div>
      <div class="base-padding-20 base-bg-fff">
        <!-- <div class="block"> -->
        <div class="row">
          <div class="col-lg-3 mb25">
            <div class="lh44">月份查询：</div>
            <!-- <span class="demonstration">月份查询</span> -->
            <el-date-picker
              v-model="value1"
              type="month"
              value-format="yyyy-MM"
              format="yyyy-MM"
              placeholder="选择月份"
              :picker-options="pickerOptions0"
            ></el-date-picker>
          </div>
          <div class="col-lg-3 mb25">
            <div class="lh44">部门查询：</div>
            <!-- <span class="demonstration">部门查询:</span> -->
            <b-form-select style="height:40px !important" v-model="cdeptid" :options="deptList" class="marginBot" />
          </div>
          <div class="col-lg-3 mb25">
            <div class="lh44">工号查询：</div>
            <!-- <span class="demonstration">工号查询:</span> -->
            <b-form-input
              style="height:40px !important"
              v-model="cjobnum"
              onkeypress="return (/[0-9a-zA-Z]/.test(String.fromCharCode(event.keyCode)))"
            ></b-form-input>
          </div>
          <div class="col-lg-3 mb25">
            <div class="col-lg-4" style="padding-left:10px !important; padding-right:10px !important;">
              <b-button
                variant="primary"
                @click="toValidate(value1)"
                style="font-size:14px !important; color:#fff !important; width: 100% !important; margin-top:38px;  padding: 6px 0 !important;margin-right:0 !important;"
              >
                查&nbsp;&nbsp;询</b-button
              >
            </div>
            <div class="col-lg-4" style="padding-left:10px !important; padding-right:10px !important;">
              <b-button
                variant="primary"
                @click="toValidate(value1)"
                style="font-size:14px !important; color:#fff !important; width: 100% !important; margin-top:38px;  padding: 6px 0 !important; margin-right:0 !important;"
              >
                打&nbsp;&nbsp;印</b-button
              >
            </div>
            <div class="col-lg-4" style="padding-left:10px !important; padding-right:10px !important;">
              <b-button
                variant="primary"
                @click="search()"
                style="font-size:14px !important; color:#fff !important; margin-top:38px; width: 100% !important; padding: 6px 0 !important; margin-right:0 !important;"
              >
                导&nbsp;&nbsp;出</b-button
              >
            </div>
          </div>
        </div>
        <table class="table table-bordered table-striped ">
          <tbody>
            <tr>
              <th>工号</th>
              <th>计时工资</th>
              <th>计件工资</th>
              <th>加班工资</th>
              <th>加班补助工资</th>
              <th>满勤奖工资</th>
              <th>通勤奖工资</th>
              <th>夜班补助工资</th>
              <th>保险补助工资</th>
              <th>工龄补助工资</th>
              <th>扣除工资</th>
              <th>工资总和</th>
            </tr>
            <tr v-for="(item, index) in list" :key="index">
              <td>{{ item.job_num }}</td>
              <td>{{ item.gz_js }}</td>
              <td>{{ item.gz_jj }}</td>
              <td>{{ item.gz_jb }}</td>
              <td>{{ item.gz_jbbz }}</td>
              <td>{{ item.gz_mqj }}</td>
              <td>{{ item.gz_tq }}</td>
              <td>{{ item.gz_yb }}</td>
              <td>{{ item.gz_bxbz }}</td>
              <td>{{ item.gz_glbz }}</td>
              <td>{{ item.gz_kc }}</td>
              <td>{{ item.gz_count }}</td>
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
          :total="totalRow"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
import Validator from 'async-validator';

export default {
  name: 'gongxin',
  metaInfo: {
    title: '工资管理',
  },
  components: {},
  data() {
    return {
      pickerOptions0: {
        disabledDate(time) {
          let curDate = new Date().getTime();
          let three = 30 * 24 * 3600 * 1000;
          let threeMonths = curDate - three;
          return time.getTime() > threeMonths;
        },
      },
      list: [],
      operateId: {},
      currentPage: 1,
      limit: 1000,
      totalRow: 0,
      form: {},
      cdeptid: '',
      cjobnum: '',
      value1: '',
      selected: null,
      deptList: [{ text: '请选择部门', value: null }],
      roleValidator: new Validator({
        value1: { type: 'string', required: true, message: '请填写查询日期！' },
      }),
    };
  },
  computed: {},
  created() {
    //this.search();
    this.searchdept();
  },
  methods: {
    //分页
    toSearch(currentPage) {
      this.currentPage = currentPage;
    },
    //查询  部门下拉列表，工号选填，月份日期不可为空
    async search() {
      let skip = (this.currentPage - 1) * this.limit;
      let result = await this.$axios.get(
        `/akyl/wages/wages_list?skip=${skip}&limit=${this.limit}&create_time=${this.value1}&dept_id=${this.cdeptid}&job_num=${this.cjobnum}`
      );
      this.$set(this, 'list', result.data.wagesList);
      this.$set(this, 'totalRow', result.data.totalRow);
    },
    async searchdept() {
      //查询部门的方法
      let skip = (this.currentPage - 1) * this.limit;
      let result = await this.$axios.get(`/akyl/dept/dept_list?skip=${skip}&limit=${this.limit}`);
      this.$set(this, 'deptList', result.data.deptList);
      this.deptList = result.data.deptList.map(item => {
        let newObject = { text: item.dept_name, value: item.id };
        return newObject;
      });
      let defalut = { text: '请选择部门', value: null, disabled: false };
      this.deptList.unshift(defalut);
    },
    //验证
    toValidate(value1) {
      console.log(value1);
      if (value1 === '') {
        this.roleValidator.validate(this.form, (errors, fields) => {
          if (errors) {
            return this.handleErrors(errors, fields);
          }
        });
      } else {
        return this.search();
      }
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
.el-date-editor.el-input {
  width: 100% !important;
}
.btn-primary:hover {
  background-color: #17a2b8 !important;
}
/* .el-input--prefix .el-input__inner {
  height: 44px !important;
} */
</style>

<style scoped>
@import '../../assets/style/Font-Awesome-master/css/font-awesome.css';
@import '../../assets/style/layout/base-Layout-bootstrap.css';
@import '../../assets/style/base-style-bootstrap.css';
</style>
