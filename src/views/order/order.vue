/* eslint-disable vue/no-parsing-error */
<template lang="html">
  <div id="bg">
    <!-- 表格 begin -->
    <div class="base-form">
      <div class="form-inline">
        <div class="base-form-title" style="width:100%;">
          <a class="base-margin-left-20">订单管理</a>
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
              <p class="marginBot4">订单人查询:</p>
              <!-- <b-form-input v-model="select_cus_id" placeholder="输入订单人"></b-form-input> -->
              <el-select class="marginBot" style="height:40px !important" v-model="select_cus_id" filterable placeholder="输入订单人">
                <el-option value="" label="全部客户">全部客户</el-option>
                <el-option v-for="item in customerName" :key="item.value" :label="item.text" :value="item.value"></el-option>
              </el-select>
            </div>
            <div class="col-lg-4 marginBot4">
              <p class="marginBot4">订单日期查询:</p>
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
            <i class="base-margin-right-5 fa fa-plus-square"></i>新建订单
          </a>
        </div>
        <table class="table table-bordered table-striped ">
          <tbody v-if="list.length > 0">
            <tr>
              <th>订单号</th>
              <th>操作人</th>
              <th>客户</th>
              <th>订单日期</th>
              <th>操作时间</th>
              <th>状态</th>
              <th>备注</th>
              <th>操作</th>
            </tr>
            <tr v-for="(item, index) in list" :key="index">
              <td>{{ item.order_num }}</td>
              <td>{{ item.user_name }}</td>
              <td>{{ getName(item.cus_id) }}</td>
              <td>{{ item.in_date }}</td>
              <td>{{ item.create_time }}</td>
              <td>{{ item.status == '0' ? '未出库' : '已经出库' }}</td>
              <td>{{ item.remark }}</td>
              <td>
                <b-button variant="primary" style="color:white; margin-right:5px;" @click="openAlert('update', index)">详&nbsp;&nbsp;情</b-button>
                <b-button variant="danger" style="color:white;" @click="openAlert('delete', item.id)">删&nbsp;&nbsp;除</b-button>
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

    <!--添加弹框-->
    <b-modal id="addAlert" title="新添订单" ref="addAlert" size="xl" hide-footer>
      <div class="d-block text-center">
        <div class="row">
          <div class="col-lg-4 mb25">
            <div class="lh44">操作人：</div>
            <b-form-input v-model="form.user_name" :disabled="is_update" placeholder="操作人"></b-form-input>
            <input v-model="form.login_id" type="hidden" />
          </div>
          <div class="col-lg-4 mb25">
            <div class="lh44">客户：</div>
            <el-select class="marginBot" style="height:40px !important" v-model="form.cus_id" filterable placeholder="请选择客户">
              <el-option v-for="item2 in customerName" :key="item2.value" :label="item2.text" :value="item2.value"></el-option>
            </el-select>
          </div>
          <div class="col-lg-4 mb25">
            <div class="lh44">订单日期：</div>
            <el-date-picker
              @change="getOrderNum()"
              v-model="form.in_date"
              placeholder="订单日期"
              value-format="yyyy-MM-dd"
              format="yyyy-MM-dd"
              type="date"
              style="width: 100%;"
            >
            </el-date-picker>
          </div>
          <div class="col-lg-4 mb25">
            <div class="lh44">订单号：</div>
            <b-form-input :disabled="true" v-model="form.order_num" placeholder="订单号"></b-form-input>
          </div>
          <div class="col-lg-4 mb25">
            <!-- 0未出库，1出库 -->
            <div class="lh44">状态：</div>
            <b-form-select v-model="form.status" :options="chooseStatus" filterable placeholder="状态" />
          </div>
          <div class="col-lg-4 mb25">
            <div class="lh44">备注：</div>
            <b-form-input v-model="form.remark" placeholder="备注"></b-form-input>
          </div>
          <br />
          <table class="table table-bordered table-striped ">
            <tbody>
              <tr>
                <td>型号</td>
                <td>数量(万支)</td>
                <td>备注</td>
                <td>操作</td>
              </tr>
              <tr v-for="(item, index) in subForm" :key="index">
                <td>
                  <b-form-input v-model="item.kind"></b-form-input>
                </td>
                <td>
                  <b-form-input
                    v-model="item.num"
                    @change="getCount(subForm)"
                    type="number"
                    onkeypress="return( /[\d]/.test(String.fromCharCode(event.keyCode) ) )"
                  ></b-form-input>
                </td>
                <td>
                  <b-form-input v-model="item.remark"></b-form-input>
                </td>
                <td>
                  <b-button
                    variant="danger"
                    @click="closeSubForm(index)"
                    class="resetButton"
                    style="margin-top: 23px; margin-left: 8px !important; margin-right: 6px !important; padding: 5px 8px !important; font-size: 13px !important;"
                    >删&nbsp;&nbsp;除</b-button
                  >
                </td>
              </tr>
            </tbody>
          </table>
          <div style="margin-left:75% !important">合计:&nbsp;&nbsp;&nbsp;{{ count }}&nbsp;&nbsp;&nbsp;万支</div>
        </div>
      </div>
      <b-button
        variant="primary"
        @click="addSubForm('add')"
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

    <!--详情-->
    <b-modal id="updateAlert" title="订单详情" ref="updateAlert" size="xl" hide-footer no-close-on-esc no-close-on-backdrop hide-header-close>
      <div class="d-block text-center">
        <div class="row">
          <div class="col-lg-4 mb25">
            <div class="lh44">订单号：</div>
            <b-form-input
              :disabled="is_update"
              v-model="updateForm.order_num"
              placeholder="订单号"
              onkeypress="return (/[0-9a-zA-Z]/.test(String.fromCharCode(event.keyCode)))"
            ></b-form-input>
          </div>
          <div class="col-lg-4 mb25">
            <div class="lh44">操作人：</div>
            <b-form-input
              v-model="updateForm.user_name"
              :disabled="true"
              placeholder="操作人"
              onkeypress="return (/[0-9a-zA-Z]/.test(String.fromCharCode(event.keyCode)))"
            ></b-form-input>
          </div>
          <div class="col-lg-4 mb25">
            <div class="lh44">客户：</div>
            <b-form-input :value="getName(updateForm.cus_id)" :disabled="true" placeholder="客户"></b-form-input>
          </div>
          <div class="col-lg-4 mb25">
            <div class="lh44">订单日期：</div>
            <b-form-input v-model="updateForm.in_date" :disabled="true" placeholder="订单日期"></b-form-input>
          </div>
          <div class="col-lg-4 mb25">
            <div class="lh44">操作时间：</div>
            <b-form-input v-model="updateForm.create_time" :disabled="true" placeholder="操作时间"></b-form-input>
          </div>
          <div class="col-lg-4 mb25">
            <div class="lh44">状态：</div>
            <b-form-select v-model="updateForm.status" :options="chooseStatus" :disabled="is_update" />
          </div>
          <div class="col-lg-4 mb25">
            <div class="lh44">备注：</div>
            <b-form-input
              v-model="updateForm.remark"
              :disabled="is_update"
              placeholder="备注"
              onkeypress="return (/[0-9a-zA-Z]/.test(String.fromCharCode(event.keyCode)))"
            ></b-form-input>
          </div>
          <br />
          <table class="table table-bordered table-striped ">
            <tbody>
              <tr>
                <td>型号</td>
                <td>数量(万支)</td>
                <td>备注</td>
                <td v-if="!is_update">操作</td>
              </tr>
              <tr v-for="(item, index) in orderSubList" :key="index">
                <td>
                  <b-form-input v-model="item.kind" :disabled="is_update"></b-form-input>
                </td>
                <td>
                  <b-form-input
                    v-model="item.num"
                    @change="getCount(orderSubList)"
                    :disabled="is_update"
                    type="number"
                    onkeypress="return (/[0-9.]/.test(String.fromCharCode(event.keyCode)))"
                  ></b-form-input>
                </td>
                <td>
                  <b-form-input v-model="item.remark" :disabled="is_update"></b-form-input>
                </td>
                <td v-if="!is_update">
                  <b-button
                    variant="danger"
                    :disabled="is_update"
                    @click="closeSubForm(index)"
                    class="resetButton"
                    style="margin-top: 23px; margin-left: 8px !important; margin-right: 6px !important; padding: 5px 8px !important; font-size: 13px !important;"
                    >删&nbsp;&nbsp;除</b-button
                  >
                </td>
              </tr>
            </tbody>
          </table>
          <div style="margin-left:75% !important">合计:&nbsp;&nbsp;&nbsp;{{ count }}&nbsp;&nbsp;&nbsp;万支</div>
        </div>
      </div>
      <b-button
        v-if="!is_update"
        variant="primary"
        :disabled="is_update"
        @click="addSubForm('update')"
        class="resetButton"
        style="font-size:16px !important; margin:10px 5% 30px 5% !important; background-color: #17a2b8 !important;  width:22% !important; padding:6px 80px !important;"
        >添&nbsp;&nbsp;加</b-button
      >
      <b-button
        v-if="is_update"
        variant="primary"
        @click="is_update = false"
        class="resetButton"
        style="font-size:16px !important; margin:10px 5% 30px 5% !important; background-color: #17a2b8 !important;  width:22% !important; padding:6px 80px !important;"
        >修&nbsp;&nbsp;改</b-button
      >
      <b-button
        v-if="is_update"
        variant="primary"
        @click="exportExcel()"
        class="resetButton"
        style="font-size:16px !important; margin:10px 5% 30px 5% !important; background-color: #17a2b8 !important;  width:22% !important; padding:6px 80px !important;"
        >导&nbsp;&nbsp;出</b-button
      >
      <b-button
        v-if="!is_update"
        variant="primary"
        @click="toValidate('update')"
        class="resetButton"
        style="font-size:16px !important; margin:10px 5% 30px 5% !important; background-color: #17a2b8 !important;  width:22% !important; padding:6px 80px !important;"
        >保&nbsp;&nbsp;存</b-button
      >
      <b-button
        variant="secondary"
        @click="closeAlert('update')"
        class="resetButton"
        style="font-size:16px !important; margin:10px 5% 30px 5% !important; background-color: #ccc !important;  width:22% !important; padding:6px 80px !important;"
        >返&nbsp;&nbsp;回</b-button
      >
    </b-modal>
    <!--删除弹框-->
    <b-modal id="deleteAlert" title="确认删除" ref="deleteAlert" hide-footer no-close-on-esc no-close-on-backdrop hide-header-close>
      <div class="d-block text-center">
        <b-alert variant="danger" show>删除订单可能会有严重影响,确认删除吗?</b-alert>
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
        @click="closeAlert('delete')"
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
  name: 'order',
  metaInfo: {
    title: '订单管理',
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
        cus_id: [{ required: true, message: '请选择客户' }],
        in_date: [{ required: true, message: '请选择订单日期' }],
        status: [{ required: true, message: '请选择是否出库' }],
      }),
      th: ['订单号', '订单人', '订单日期', '备注'],
      filterVal: ['order_no', 'user_name', 'in_date', 'remark'],
      select_order_num: '',
      select_cus_id: '',
      select_in_date: null,
      chooseStatus: [{ text: '状态', value: null, disabled: true }, { text: '未出库', value: '0' }, { text: '已经出库', value: '1' }],
      is_title_search: false, //是否是模糊查询： true：是模糊查询； false： 不是模糊查询
      skip: 0,
      count: 0,
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
      if (this.select_order_num === null) this.select_order_num = '';
      if (this.select_cus_id === null) this.select_cus_id = '';
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
        `/akyl/order/order_list?skip=${skip}&limit=${this.limit}&order_num=${this.select_order_num}&cus_id=${this.select_cus_id}&start_time=${
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
    //分页查询
    async titlesearch() {
      if (this.is_title_search) {
        this.is_title_search = true;
        return;
      }
      if (this.select_order_num === null) this.select_order_num = '';
      if (this.select_cus_id === null) this.select_cus_id = '';
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
        `/akyl/order/order_list?skip=${skip}&limit=${this.limit}&order_num=${this.select_order_num}&cus_id=${this.select_cus_id}&start_time=${
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
      if (this.select_cus_id === null) this.select_cus_id = '';
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
        `/akyl/order/order_list?skip=${skip}&limit=${this.limit}&order_num=${this.select_order_num}&cus_id=${this.select_cus_id}&start_time=${
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
    //获取订单号
    async getOrderNum() {
      let result = await this.$axios.get(`/akyl/order/order_num?cus_id=${this.form.cus_id}&order_date=${this.form.in_date}`);
      this.$set(this.form, 'order_num', result.data.order_num);
    },
    //查询客户姓名
    async searchName() {
      let skip = (this.currentPage - 1) * this.limit;
      let result = await this.$axios.get(`/akyl/customer/customer_list?skip=${skip}&limit=100000`);
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
    //添加
    async add() {
      if (this.subForm.length === 0) {
        return this.$message.error('请填入订单明细');
      }
      if (this.subForm.length != 0) {
        for (let index = 0; index < this.subForm.length; index++) {
          if ((this.subForm[index].kind === undefined) | (this.subForm[index].kind === '')) {
            return this.$message.error('请填入型号');
          }
          if ((this.subForm[index].num === undefined) | (this.subForm[index].num === '')) {
            return this.$message.error('请填入数量');
          }
        }
      }
      let result = await this.$axios.post('/akyl/order/order_save', { data: this.form });
      if (result.data.msg === '成功') {
        let id = result.data.id;
        result = await this.$axios.post('/akyl/order/order_sub_save', { data: { subForm: this.subForm, id: id } });
        if (result.data.msg === '成功') {
          this.$refs.addAlert.hide();
          this.form = {};
          this.subForm = [];
          this.search();
        }
      }
    },
    //修改
    async update() {
      if (this.orderSubList.length === 0) {
        return this.$message.error('请填入订单明细');
      }
      if (this.orderSubList.length != 0) {
        for (let index = 0; index < this.orderSubList.length; index++) {
          if ((this.orderSubList[index].kind === undefined) | (this.orderSubList[index].kind === '')) {
            return this.$message.error('请填入型号');
          }
          if ((this.orderSubList[index].num === undefined) | (this.orderSubList[index].num === '')) {
            return this.$message.error('请填入数量');
          }
        }
      }
      let result = await this.$axios.post('/akyl/order/order_edit', { data: this.updateForm });
      let id = this.updateForm.id;
      if (result.data.msg === '成功') {
        for (let index = 0; index < this.orderSubList.length; index++) {
          delete this.orderSubList[index].kind_name;
        }
        result = await this.$axios.post('/akyl/order/order_sub_edit', { data: { subForm: this.orderSubList, id: id } });
        if (result.data.msg === '成功') {
          this.closeAlert('update');
          this.updateForm = new Array();
          this.orderSubList = [];
          this.is_update = true;
          this.search();
        }
      }
    },
    //删除
    async toDelete() {
      let result = await this.$axios.post('/akyl/order/order_delete', { data: { id: this.operateId } });
      this.closeAlert('delete');
      this.search();
    },
    //打开与关闭修改和删除的弹框
    async openAlert(type, id) {
      this.count = 0;
      this.subForm = [];
      this.orderSubList = [];
      if (type === 'update') {
        this.$refs.updateAlert.show();
        this.updateForm = JSON.parse(JSON.stringify(this.list[id]));
        let result = await this.$axios.get(`/akyl/order/order_info?skip=0&limit=10000&order_id=${this.updateForm.id}`);
        if (result.data.msg === '成功') {
          this.$set(this, 'orderSubList', result.data.orderSubList);
          this.getCount(this.orderSubList);
        }
      } else if (type === 'delete') {
        this.$refs.deleteAlert.show();
        this.operateId = id;
      } else if (type === 'add') {
        this.form.login_id = this.userInfo.login_id;
        this.form.user_name = this.userInfo.user_name;
        this.addSubForm('open');
        this.$refs.addAlert.show();
      }
    },
    //获取总数量
    getCount(list) {
      this.count = 0;
      for (let index = 0; index < list.length; index++) {
        this.count += JSON.parse(JSON.stringify(list[index].num * 1));
      }
    },
    //关闭弹框
    closeAlert(type) {
      if (type === 'update') {
        this.$refs.updateAlert.hide();
      } else if (type === 'delete') {
        this.$refs.deleteAlert.hide();
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
    //删除表单中内容
    closeSubForm(i) {
      this.subForm.splice(i, 1);
      this.orderSubList.splice(i, 1);
    },
    //添加字表数据
    addSubForm(type) {
      if (type === 'add') {
        this.subForm.push(JSON.parse(JSON.stringify(this.subFormContent)));
      }
      if (type === 'update') {
        this.orderSubList.push(JSON.parse(JSON.stringify(this.orderSubListContent)));
      }
    },
    reset() {
      this.form = {};
      this.subForm = [];
      this.form.user_name = this.userInfo.user_name;
      this.form.login_id = this.userInfo.login_id;
    },
    //导出
    exportExcel() {
      var tableStr = `
                      <caption><b>订单详情单</b></caption>
                      <tr style="text-align:center;">
                        <th>订单号</th>
                        <th>操作人</th>
                        <th>客户</th>
                        <th>订单日期</th>
                        <th>操作时间</th>
                        <th>状态</th>
                        <th>备注</th>
                      </tr>
                      <tr style="text-align: center;">
                          <td>${this.updateForm.order_num}&nbsp;</td>
                          <td>${this.updateForm.user_name}</td>
                          <td>${this.getName(this.updateForm.cus_id)}</td>
                          <td>${this.updateForm.in_date}</td>
                          <td>${this.updateForm.create_time}</td>
                          <td>${this.updateForm.status == '0' ? '未出库' : '已经出库'}</td>
                          <td>${this.updateForm.remark}</td>
                      </tr>
                      <tr></tr>
                      <tr style="text-align:center;">
                        <th>型号</th>
                        <th>数量(万支)</th>
                        <th>备注</th>
                      </tr>`;
      for (let item of this.orderSubList) {
        tableStr += ` <tr style="text-align: center;">
                        <td>${item.code}</td>
                        <td>${item.num}</td>
                        <td>${item.remark}</td>
                      </tr>`;
      }
      tableStr += ` <tr style="text-align: center;">
                        <td>合计：</td>
                        <td>${this.count}</td>
                        <td></td>
                      </tr>`;
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
