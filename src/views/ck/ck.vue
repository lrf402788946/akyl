<template lang="html">
  <div id="zx">
    <!-- 表格 begin -->
    <div class="base-form">
      <div class="form-inline">
        <div class="base-form-title" style="width:100%;">
          <a class="base-margin-left-20">出库管理</a>
          <div class="button-table"></div>
        </div>
      </div>
      <div class="base-padding-20 base-bg-fff">
        <div class="base-align-right" style="margin-bottom:20px;">
          <table class="table table-bordered table-striped ">
            <tbody>
              <tr style="text-align: left;">
                <th>订单号</th>
                <th>出库人</th>
                <th>日期</th>
                <th>操作</th>
              </tr>
              <tr>
                <td><b-form-input v-model="order_no"></b-form-input></td>
                <td><b-form-input v-model="user_name"></b-form-input></td>
                <td style="text-align: left;">
                  <el-date-picker
                    v-model="timeValue"
                    value-format="yyyy-MM-dd"
                    format="yyyy-MM-dd"
                    type="daterange"
                    range-separator="-"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                  >
                  </el-date-picker>
                </td>
                <td>
                  <b-button variant="primary" style="font-size:14px !important; color:#fff !important; padding: 6px 12px !important;" @click="search()"
                    >查&nbsp;&nbsp;询</b-button
                  >
                </td>
              </tr>
            </tbody>
          </table>
          <a
            class="btn btn-info base-margin-bottom"
            data-toggle="tooltip"
            style="font-size:14px !important; color:#fff !important; padding: 6px 12px !important;"
            title=""
            role="button"
            @click="openAlert('add')"
          >
            <i class="base-margin-right-5 fa fa-plus-square" style=" color:#fff !important;"></i>出库产品
          </a>
        </div>
        <exportExcel :exportTitle="th" :db_nameList="filterVal" dataName="list" fileName="出库表"></exportExcel>

        <table class="table table-bordered table-striped ">
          <tbody v-if="list.length > 0">
            <tr>
              <th>订单号</th>
              <th>出库人</th>
              <th>出库日期</th>
              <th>备注</th>
              <th>操作</th>
            </tr>
            <tr v-for="(item, index) in list" :key="index">
              <td>{{ item.order_no }}</td>
              <td>{{ item.user_name }}</td>
              <td>{{ item.out_date }}</td>
              <td>{{ item.remark }}</td>
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
          @current-change="toSearch"
          :total="totalRow"
        >
        </el-pagination>
      </div>
    </div>
    <!-- 添加 -->
    <b-modal id="toAdd" size="lg" title="出库操作" ref="toAdd" hide-footer>
      <div class="d-block text-center">
        <div class="row">
          <div class="col-lg-4 mb25">
            <div style="margin-bottom: 7px;">订单号:</div>
            <b-form-input v-model="form.order_no" :disabled="is_update" placeholder="订单号"></b-form-input>
          </div>
          <div class="col-lg-4 mb25">
            <div style="margin-bottom: 7px;">出库人:</div>
            <b-form-input v-model="form.user_name"></b-form-input>
          </div>
          <div class="col-lg-4 mb25">
            <div style="margin-bottom: 7px;">备注:</div>
            <textarea v-model="form.remark" class="form-control" rows="3" style="height: 44px !important;" placeholder="备注"></textarea>
          </div>
          <br /><br /><br /><br />
          <table class="table table-bordered table-striped ">
            <tbody>
              <tr>
                <td>类别</td>
                <td>型号</td>
                <td>出库数量</td>
                <td>剩余库存</td>
                <td>操作</td>
              </tr>
              <tr v-for="(item, index) in form1" :key="index">
                <td>
                  <el-select class="marginBot" style="height:40px !important" v-model="item.type" filterable placeholder="请选择类别">
                    <el-option v-for="item1 in type" :key="item1.value" :label="item1.text" :value="item1.value"> </el-option>
                  </el-select>
                </td>
                <td>
                  <el-select
                    class="marginBot"
                    @change="getNums(index)"
                    @click.native="getKindList(item.type)"
                    style="height:40px !important"
                    v-model="item.kind"
                    filterable
                    placeholder="请选择型号"
                  >
                    <el-option v-for="item2 in kindList" :key="item2.value" :label="item2.type" :value="item2.type"></el-option>
                  </el-select>
                </td>
                <td>
                  <b-form-input
                    v-model="item.num"
                    type="number"
                    @change="fun(item.num, item.else_num)"
                    onkeypress="return (/[0-9.]/.test(String.fromCharCode(event.keyCode)))"
                  ></b-form-input>
                </td>
                <td>
                  <b-form-input v-model="item.else_num" :disabled="is_update"></b-form-input>
                </td>
                <b-button
                  style="margin-top: 23px; margin-left: 8px !important; margin-right: 6px !important; padding: 5px 8px !important; font-size: 13px !important;"
                  @click="closeSubForm(index)"
                  class="resetButton"
                  variant="danger"
                  >删&nbsp;&nbsp;除</b-button
                >
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <b-button
        variant="primary"
        @click="addSubForm()"
        class="resetButton"
        style="font-size:16px !important; margin-top:25px; width:30% !important; padding:6px 80px !important;margin-bottom:30px !important;margin-right:0 !important;"
        >添&nbsp;&nbsp;加</b-button
      >
      <b-button
        style="font-size:16px !important; margin:25px 5% 30px 5% !important; background-color: #17a2b8 !important;  width:30% !important; padding:6px 80px !important;"
        variant="primary"
        @click="toValidate('add')"
        >确&nbsp;认&nbsp;出&nbsp;库</b-button
      >
      <b-button
        variant="secondary"
        @click="reset()"
        class="resetButton"
        style="font-size:16px !important; margin-top:25px; margin-bottom:30px !important; width:30% !important; margin-right: 0 !important; padding:6px 80px !important;"
        >重&nbsp;&nbsp;置</b-button
      >
    </b-modal>

    <!-- 详情 -->
    <b-modal id="updateAlert" size="lg" title="出库信息" ref="updateAlert" hide-footer>
      <div class="d-block text-center">
        <div class="row">
          <div class="col-lg-4 mb25">
            <div style="margin-bottom: 7px; text-align:left;">订单号</div>
            <b-form-input v-model="updateForm.order_no" :disabled="is_update" placeholder="订单号"></b-form-input>
          </div>
          <div class="col-lg-4 mb25">
            <div style="margin-bottom: 7px; text-align:left;">出库人</div>
            <b-form-input v-model="updateForm.user_name" :disabled="is_update" placeholder="出库人"></b-form-input>
          </div>
          <div class="col-lg-4 mb25">
            <div style="margin-bottom: 7px; text-align:left;">出库时间</div>
            <b-form-input v-model="updateForm.out_date" :disabled="is_update" placeholder="出库时间"></b-form-input>
          </div>
          <div class="col-lg-8 marginBot">
            <div style="margin-bottom: 7px; text-align:left;">备注</div>
            <b-form-input v-model="updateForm.remark" :disabled="is_update" placeholder="备注"></b-form-input>
          </div>
          <br />
          <table class="table table-bordered table-striped ">
            <tbody>
              <tr>
                <td>类别</td>
                <td>型号</td>
                <td>出库数量</td>
              </tr>
              <tr v-for="(item, index) in updateForm1" :key="index">
                <td>
                  {{ item.type === '1' ? '裸针库' : item.type === '2' ? '弹簧柄库' : item.type === '3' ? '针芯库' : '直废库' }}
                </td>
                <td>
                  {{ item.kind }}
                </td>
                <td>
                  {{ item.num }}
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
        style="font-size:16px !important; margin:25px 5% 30px 5% !important; background-color: #17a2b8 !important;  width:30% !important; padding:6px 80px !important;"
        >返&nbsp;&nbsp;回</b-button
      >
    </b-modal>
    <!-- 详情 -->
  </div>
</template>

<script>
import Validator from 'async-validator';
import _ from 'lodash';
import { mapState } from 'vuex';
import exportExcel from '@/components/exportExcel.vue';
export default {
  name: 'zx',
  metaInfo: {
    title: '出库管理',
  },
  components: {
    exportExcel,
  },
  data() {
    return {
      updateForm: [],
      updateForm1: [],
      list: [],
      subFormContent: {},
      order_no: '',
      user_name: '',
      is_update: true,
      operateId: {},
      currentPage: 1,
      limit: 15,
      totalRow: 0,
      form: {},
      form1: [],
      // timeValue: ['', ''],
      timeValue: null,
      start: '',
      end: '',
      deptList: [],
      kindList: [],
      workList: [],
      mainValidator: new Validator({
        user_name: [{ required: true, message: '请填写出库人' }],
      }),
      type: [{ text: '弹簧柄库', value: '2' }, { text: '裸针库', value: '1' }, { text: '针芯库', value: '3' }, { text: '直废库', value: '4' }],
      th: ['订单号', '出库人', '出库日期', '备注'],
      filterVal: ['order_no', 'user_name', 'out_date', 'remark'],
    };
  },
  computed: {
    ...mapState({
      userInfo: state => state.userInfo,
    }),
  },
  created() {
    this.search();
  },
  methods: {
    //查询
    async search() {
      //查询方法
      if (this.timeValue === null) this.timeValue = '';
      if (typeof this.timeValue[0] != 'undefined') {
        this.start = this.timeValue[0];
      } else {
        this.start = '';
      }
      if (typeof this.timeValue[1] != 'undefined') {
        this.end = this.timeValue[1];
      } else {
        this.end = '';
      }
      let skip = (this.currentPage - 1) * this.limit;
      let result = await this.$axios.get(
        `/akyl/store/out_main_list?main_id=${this.userInfo.login_id}&skip=${skip}&limit=${this.limit}&order_no=${this.order_no}&user_name=${
          this.user_name
        }&start_time=${this.start}&end_time=${this.end}`
      );
      this.$set(this, 'list', result.data.outMainList);
      this.$set(this, 'totalRow', result.data.totalRow);
      if (result.data.msg === '没有数据') {
        this.list = [];
      }
    },
    //分页
    toSearch(currentPage) {
      this.currentPage = currentPage;
      this.search();
    },
    reset() {
      this.form = {};
      this.form1 = [];
      // this.form.dept_id = this.userInfo.dept_id;
      // this.form.login_id = this.userInfo.login_id;
      this.form1.push(this.subFormContent);
    },
    //添加字表数据
    addSubForm() {
      this.form1.push(JSON.parse(JSON.stringify(this.subFormContent)));
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
      this.form1.splice(1, this.form1.length);
    },
    //删除表单中内容
    closeSubForm(i) {
      this.form1.splice(i, 1);
    },
    async toUpdate() {
      let result = await this.$axios.post('/akyl/akyl_out_sub/akyl_out_sub_edit', { data: this.updateForm });
      this.closeAlert('update');
      this.updateForm = [];
      this.search();
    },
    seeTable(type) {
      this.getKindList(type);
    },
    async getKindList(type) {
      let result = await this.$axios.post(`/akyl/store/type_kind?type=${type}`);
      this.$set(this, 'kindList', result.data.dataList);
    },
    //添加
    async toAdd() {
      this.form.login_id = this.login_id;
      let result = await this.$axios.post('/akyl/store/out_main_save', { data: this.form });
      let id = result.data.id;
      let result1 = await this.$axios.post('/akyl/store/out_sub_save', { data: { subForm: this.form1, id: id } });
      this.form = {};
      this.form1 = [];
      this.search();
      this.$refs.toAdd.hide();
    },
    async search1(id) {
      let result = await this.$axios.get(`/akyl/store/out_sub_info?id=${this.list[id].id}`);
      this.$set(this, 'updateForm1', result.data.outSubList);
    },
    async getorder_no() {
      let result1 = await this.$axios.get(`/akyl/store/order_no?order_key=OUT`);
      this.$set(this.form, 'order_no', result1.data.order_no);
    },
    async openAlert(type, id) {
      if (type === 'update') {
        this.getorder_no();
        this.search1(id);
        this.$refs.updateAlert.show();
        this.updateForm = JSON.parse(JSON.stringify(this.list[id]));
      } else if (type === 'delete') {
        this.$refs.deleteAlert.show();
        this.operateId = id;
      } else if (type === 'add') {
        let result1 = await this.$axios.get(`/akyl/store/order_no?order_key=OUT`);
        this.$set(this.form, 'order_no', result1.data.order_no);
        this.$refs.toAdd.show();
      }
    },
    //验证,因为添加和修改的验证内容都是一样的,所以用一个方法
    toValidate(type) {
      this.mainValidator.validate(type === 'add' ? this.form : this.updateForm, (errors, fields) => {
        if (errors) {
          return this.handleErrors(errors, fields);
        }
        if (type === 'add') {
          return this.toAdd();
        } else {
          return this.toUpdate();
        }
      });
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
    getNums(index) {
      let num = 0;
      for (const item of this.kindList) {
        if (item.type === this.form1[index].kind) {
          num = item.num;
          break;
        }
      }
      this.form1[index].else_num = num;
    },
    fun(number, number1) {
      if (number * 1 > number1 * 1) {
        this.$message.error('请重新输入数量！！！');
        this.form1 = [];
      }
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
.el-input__inner {
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
}
</style>

<style scoped>
@import '../../assets/style/Font-Awesome-master/css/font-awesome.css';
@import '../../assets/style/layout/base-Layout-bootstrap.css';
@import '../../assets/style/base-style-bootstrap.css';
</style>
