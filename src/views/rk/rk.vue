<template lang="html">
  <div id="bg">
    <!-- 表格 begin -->
    <div class="base-form">
      <div class="form-inline">
        <div class="base-form-title" style="width:100%;">
          <a class="base-margin-left-20">入库管理</a>
          <div class="button-table"></div>
        </div>
      </div>
      <div class="base-padding-20 base-bg-fff">
        <div>
          <table>
           <tr>
             <td>入库单号查询:</td>
             <td style="padding-left:50px">入库人查询:</td>
             <td style="padding-left:50px">入库日期查询:</td>
           </tr>
           <tr>
            <td>
              <b-form-input v-model="select_order_no" placeholder="输入入库单号" style="width:200px,margin-left:50px"></b-form-input>
              </td>
              <td style="padding-left:50px">
          <b-form-input v-model="select_user_name" placeholder="输入入库人" style="padding-left:50px,width:200px"></b-form-input>
              </td>
              <td style="padding-left:50px">
                <el-date-picker
                  v-model="select_in_date"
                  value-format="yyyy-MM-dd"
                  format="yyyy-MM-dd"
                  type="daterange"
                  range-separator="-"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                >
                </el-date-picker>
              </td>
              <td style="padding-left:60px">
                <b-button
                  variant="primary"
                  style="font-size: 12px !important; color: rgb(255, 255, 255) !important; width: 100% !important; padding: 6px 15px !important; margin-right: 0px !important;"
                  @click="titlesearch()"
                >点&nbsp;&nbsp;击&nbsp;&nbsp;查&nbsp;&nbsp;询</b-button>
              </td>
            </tr>
          </table>
        </div>
        <div class="base-align-right" style="margin-bottom: 20px;">
          <a
            class="btn btn-info base-margin-bottom"
            style="font-size:14px !important; color:#fff !important; padding: 6px 12px !important;"
            data-toggle="tooltip"
            title=""
            role="button"
            @click="openAlert('add')"
          >
            <!-- v-b-modal="'addAlert'"-->
            <i class="base-margin-right-5 fa fa-plus-square"></i>新建入库单
          </a>
        </div>
        <table class="table table-bordered table-striped ">
          <tbody v-if="list.length > 0">
            <tr>
              <th>订单号</th>
              <th>入库人</th>
              <th>入库日期(h)</th>
              <th>备注</th> 
              <th>操作</th>
            </tr>
            <tr v-for="(item, index) in list" :key="index">
              <td>{{ item.order_no }}</td>
              <td>{{ item.user_name }}</td>
              <td>{{ item.in_date }}</td>
              <td>{{ item.remark }}</td>
              <td>
                <b-button variant="primary" style="color:white; margin-right:5px;" @click="openAlert('update', index)">详&nbsp;&nbsp;情</b-button>
               <!-- <b-button variant="danger" style="color:white;" @click="openAlert('delete', item.id)">删&nbsp;&nbsp;除</b-button> -->
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

    <!--添加弹框-->
    <b-modal id="addAlert" title="新添入库单" ref="addAlert" size="xl" hide-footer>
      <div class="d-block text-center">
        <div class="row">
          <div class="col-lg-4 mb25">
            <div class="lh44">订单号：</div>
            <b-form-input v-model="form.order_no" :disabled="is_update" placeholder="订单号"></b-form-input>
          </div>
          <div class="col-lg-4 mb25">
            <div class="lh44">入库人：</div>
            <b-form-input v-model="form.user_name" placeholder="入库人"></b-form-input>
          </div>
          <div class="col-lg-4 mb20">
            <div class="lh44">操作人ID：</div>
            <b-form-input
              v-model="form.login_id"
              :disabled="is_update" 
              placeholder="操作人ID"
              onkeypress="return (/[0-9.:]/.test(String.fromCharCode(event.keyCode)))"
            ></b-form-input>
          </div>
          <div class="col-lg-4 mb20">
            <div class="lh44">备注：</div>
            <textarea v-model="form.remark" class="form-control" rows="3" style="height: 44px !important;" placeholder="备注"></textarea>

          </div>
          <br />
          <table class="table table-bordered table-striped ">
            <tbody>
              <tr>
                <td>类别</td>
                <td>型号</td>
                <td>数量</td>
               <!-- <td>操作</td>-->
              </tr>
              <tr v-for="(item, index) in subForm" :key="index">
                <td>
                  <!-- <b-form-select v-model="addForm.kname" :options="kname"/>-->
                  <el-select class="marginBot" style="height:40px !important" v-model="item.type" filterable placeholder="请选择类别">
                    <el-option v-for="item in type" :key="item.value" :label="item.text" :value="item.value"> </el-option>
                  </el-select>
                  <!-- <b-form-select v-model="item.work_id" :options="workList" @change="getKindList(index)" /> -->
                </td>
                <td>
                  <b-form-input v-model="item.kind" placeholder="请输入型号"></b-form-input>
                </td>
                <td>
                  <b-form-input v-model="item.num" type="number" onkeypress="return( /[\d]/.test(String.fromCharCode(event.keyCode) ) )"></b-form-input>
                </td>
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
        variant="primary"
        @click="toValidate('add')"
        class="resetButton"
        style="font-size:16px !important; margin:25px 5% 30px 5% !important; background-color: #17a2b8 !important;  width:30% !important; padding:6px 80px !important;"
        >保&nbsp;&nbsp;存</b-button
      >
      <b-button
        variant="secondary"
        @click="reset()"
        class="resetButton"
        style="font-size:16px !important; margin-top:25px; margin-bottom:30px !important; width:30% !important; margin-right: 0 !important; padding:6px 80px !important;"
        >重&nbsp;&nbsp;置</b-button
      >
    </b-modal>

    <!--详情弹框-->
    <b-modal id="updateAlert" title="入库单详情" ref="updateAlert" size="xl" hide-footer no-close-on-esc no-close-on-backdrop hide-header-close>
      <div class="d-block text-center">
        <div class="row">
          <div class="col-lg-4 mb25">
            <div class="lh44">订单号：</div>
            <b-form-input
              v-model="updateForm.order_no"
              :disabled="is_update"
              placeholder="订单号"
              onkeypress="return (/[0-9a-zA-Z]/.test(String.fromCharCode(event.keyCode)))"
            ></b-form-input>
          </div>
          <div class="col-lg-4 mb25">
            <div class="lh44">入库人：</div>
            <b-form-input v-model="updateForm.user_name" :disabled="is_update"></b-form-input>
          </div>
          <div class="col-lg-4 mb20">
            <div class="lh44">入库日期：</div>
            <el-date-picker
              style="width:100%;"
              v-model="updateForm.in_date"
              type="date"
              :disabled="is_update"
              placeholder="入库日期"
              value-format="yyyy-MM-dd"
              format="yyyy-MM-dd"
            ></el-date-picker>
          </div>
          <div class="col-lg-4 mb20">
            <div class="lh44">备注：</div>
            <b-form-input v-model="updateForm.remark" :disabled="is_update"></b-form-input>
          </div>
          <br />
          <table class="table table-bordered table-striped ">
            <tbody>
              <tr>
                <td>类别</td>
                <td>型号</td>
                <td>数量</td>
              </tr>
              <tr v-for="(item, index) in subForm" :key="index">
                <td>
                  <el-select class="marginBot" style="height:40px !important" v-model="item.type" :disabled="is_update" filterable placeholder="请选择类别">
                    <el-option v-for="item in type" :key="item.value" :label="item.text" :value="item.value"> </el-option>
                  </el-select>
                </td>
                <td>
                  <b-form-input v-model="item.kind" :disabled="is_update"></b-form-input>
                </td>
                <td>
                  <b-form-input v-model="item.num" :disabled="is_update"></b-form-input>
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
        style="font-size:16px !important; width:30% !important; margin-top:25px; margin-bottom:30px !important; margin-right: 0 !important; padding:6px 80px !important;"
        >返&nbsp;&nbsp;回</b-button
      ></b-modal
    >

    <!--删除弹框-->
    <b-modal id="deleteAlert" title="确认删除" ref="deleteAlert" hide-footer no-close-on-esc no-close-on-backdrop hide-header-close>
      <div class="d-block text-center">
        <b-alert variant="danger" show>删除入库单可能会影响您的管理,确认删除吗?</b-alert>
      </div>
      <b-button
        variant="danger"
        style="font-size:16px !important; margin-top:25px; padding:6px 80px !important;margin-bottom:30px !important;margin-right:0 !important;"
        @click="toDelete()"
        >删&nbsp;&nbsp;除</b-button
      >
      <b-button
        variant="primary"
        style="font-size:16px !important; margin-top:25px; float:right; padding:6px 80px !important;margin-bottom:30px !important;margin-right:0 !important;"
        class="resetButton"
        @click="closeAlert('delete'), $refs.deleteAlert.hide(), (deleteItem = '')"
        >返&nbsp;&nbsp;回</b-button
      >
    </b-modal>
  </div>
</template>

<script>
import Validator from 'async-validator';
import { mapState } from 'vuex';
export default {
  name: 'bg',
  metaInfo: {
    title: '入库管理',
  },
  components: {},
  data() {
    return {
      addForm: new Array(),
      updateForm: new Array(),
      list: [],
      login_id: 'login_id',
      user_name: 'user_name',
      orderid: '',
      kuname: '',
      subForm: [],
      subFormContent: {
        work_id: null,
        kind_id: null,
        num: 0,
        work_time: 0,
        is_night: 0,
      },
      is_update: true,
      operateId: {},
      currentPage: 1,
      limit: 15,
      totalRow: 0,
      form: {},
      deptList: [],
      kindList: [],
      workList: [],
      select_order_no: null,
      select_user_name: null,
      select_in_date: null,
      start: '',
      end: '',
      timeValue: new Array(),
      realorderno: '',
      type: [{ text: '弹簧柄库', value: '2' }, { text: '裸针库', value: '1' }, { text: '针芯库', value: '3' }],
      temporaryList: [],
      mainValidator: new Validator({
        order_no: [{ required: true, message: '请填入库单号' }],
        user_name: [{ required: true, message: '请填写入库人' }],
      }),
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
    this.getWorkList();
  },
  methods: {
    //分页
    toSearch(currentPage) {
      this.currentPage = currentPage;
      this.search();
    },
    //查询
    async search() {
      let skip = (this.currentPage - 1) * this.limit;
      let result = await this.$axios.get(`/akyl/store/in_main_list?skip=${skip}&limit=${this.limit}`);
      let result1 = await this.$axios.get(`/akyl/store/order_no?order_key=IN`);
      this.$set(this.form, 'order_no', result1.data.order_no);
      if (result.data.msg === '成功') {
        this.$set(this, 'list', result.data.inMainList);
        this.$set(this, 'totalRow', result.data.totalRow);
      }
    },
    async serarchXiangxi() {
      let result = await this.$axios.get(`/akyl/store/in_sub_info?skip=0&limit=100&id=${this.updateForm.id}`);
      this.subList = result.data.subList.map(item => {
        let newObject = { text: item.dept_name, value: item.id };
        return newObject;
      });
    },
    //请求各表
    async getOtherList() {
      //请求部门表
      let result = await this.$axios.get('/akyl/dept/dept_list?skip=0&limit=100');
      this.deptList = result.data.deptList.map(item => {
        let newObject = { text: item.dept_name, value: item.id };
        return newObject;
      });
      // let defalut = { text: '请选择部门', value: null, disabled: true };
      // this.deptList.unshift(defalut);
    },
    //请求工序表
    async getWorkList() {
      let result = await this.$axios.get('/akyl/work/work_list?skip=0&limit=100');
      this.workList = result.data.workList.map(item => {
        let newObject = { text: item.code, value: item.id };
        return newObject;
      });
      // let defalut = { text: '请选择工序', value: null, disabled: true };
      // this.workList.unshift(defalut);
    },
    //请求类型表(应该是二级联动工序表)
    async getKindList(index) {
      let subFormKindList = [];
      let result = await this.$axios.get(`/akyl/kind/kind_list?skip=0&limit=1000&work_id=${this.subForm[index].work_id}`);
      if (result.data.totalRow > 0) {
        subFormKindList = result.data.kindList.map(item => {
          let newObject = { text: item.name, value: item.id };
          return newObject;
        });
        // let defalut = { text: '请选择类型', value: null, disabled: true };
        // subFormKindList.unshift(defalut);
        this.$set(this.temporaryList, `${index}`, subFormKindList);
      } else {
        let defalut = { text: '没有类型', value: null, disabled: true };
        this.subForm[index].kind_id = null;
        subFormKindList.unshift(defalut);
        this.$set(this.temporaryList, `${index}`, subFormKindList);
      }
    },
    //查询子表
    async searchSubForm(id) {
      let result = await this.$axios.get(`/akyl/store/in_sub_info?id=${id}`);
      if (result.data.msg === '成功') {
        if (result.data.inSubList.length > 0) {
          this.$set(this, 'subForm', result.data.inSubList);
          if (this.subForm.type == 1) {
            this.$set(this, 'kuname', '裸针');
          } else if (this.subForm.type == 2) {
            this.$set(this, 'kuname', '弹簧柄');
          } else if (this.subForm.type == 3) {
            this.$set(this, 'kuname', '针芯');
          }
          for (let i = 0; i < this.subForm.length; i++) {
            this.getKindList(i);
          }
        }
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
    //添加
    async add() {
      let result = await this.$axios.post('/akyl/store/in_main_save', { data: this.form });
      if (result.data.msg === '成功') {
        let id = result.data.id;
        result = await this.$axios.post('/akyl/store/in_sub_save', { data: { subForm: this.subForm, id: id } });
        if (result.data.msg === '成功') {
          this.$refs.addAlert.hide();
          this.form = {};
          this.subForm = [];
          this.search();
        }
      }
    },
    async titlesearch(){
      if (this.select_order_no === null) this.select_order_no = '';
      if (this.select_user_name === null) this.select_user_name = '';
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
        `/akyl/store/in_main_list?order_no=${this.select_order_no}&start_time=${this.start}&end_time=${this.end}&user_name=${this.select_user_name}&skip=${skip}&limit=${this.limit}`
      );
      if (result.data.msg === '成功') {
        this.$set(this, 'list', result.data.inMainList);
      }
      if (result.data.msg === '没有数据') {
        this.list = '';
      }
    },
    //修改
    async update() {
      let result = await this.$axios.post('/akyl/bg/job_report_main_edit', { data: this.updateForm });
      if (result.data.msg === '成功') {
        result = await this.$axios.post('/akyl/bg/job_report_sub_edit', { data: { subForm: this.subForm, id: this.updateForm.id } });
        if (result.data.msg === '成功') {
          this.closeAlert('update');
          this.form = {};
          this.is_update = true;
          this.search();
        }
      }
    },
    //删除
    async toDelete() {
      let result = await this.$axios.post('/akyl/bg/job_report_delete', { data: { id: this.operateId } });
      this.closeAlert('delete');
      this.search();
    },
    //打开与关闭修改和删除的弹框
    openAlert(type, id) {
      if (type === 'update') {
        this.$refs.updateAlert.show();
        this.search();
        this.updateForm = JSON.parse(JSON.stringify(this.list[id]));
        this.searchSubForm(this.updateForm.id);
        this.serarchXiangxi();
      } else if (type === 'delete') {
        this.$refs.deleteAlert.show();
        this.operateId = id;
      } else if (type === 'add') {
        this.temporaryList.splice(0, this.temporaryList.length);
        this.form.dept_id = this.userInfo.dept_id;
        this.form.login_id = this.userInfo.login_id;
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
      this.reset();
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
    //删除表单中内容
    closeSubForm(i) {
      this.subForm.splice(i, 1);
    },
    //添加字表数据
    addSubForm() {
      this.subForm.push(JSON.parse(JSON.stringify(this.subFormContent)));
      // let defalut = { text: '请先选择工序', value: null, disabled: true };
      // let subFormKindList = [];
      // subFormKindList.unshift(defalut);
      // let lengths = this.subForm.length - 1 > 0 ? this.subForm.length - 1 : 0;
      // this.$set(this.temporaryList, `${lengths}`, subFormKindList);
    },
    reset() {
      this.form.remark = [];
      this.form.type = [];
      this.form.kind = [];
      this.form.num = [];
      this.form.dept_id = this.userInfo.dept_id;
      this.form.login_id = this.userInfo.login_id;
      this.subForm = [];
      this.subForm.push(this.subFormContent);
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
