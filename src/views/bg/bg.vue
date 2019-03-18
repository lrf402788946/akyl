<template lang="html">
  <div id="bg">
    <!-- 表格 begin -->
    <div class="base-form">
      <div class="form-inline">
        <div class="base-form-title" style="width:100%;">
          <a class="base-margin-left-20">报工单管理</a>
          <div class="button-table"></div>
        </div>
      </div>
      <div class="base-padding-20 base-bg-fff">
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
            <i class="base-margin-right-5 fa fa-plus-square"></i>新建报工单
          </a>
        </div>
        <table class="table table-bordered table-striped ">
          <tbody v-if="list.length > 0">
            <tr>
              <th>工号</th>
              <th>总工时(h)</th>
              <th>请假时间(h)</th>
              <th>操作</th>
            </tr>
            <tr v-for="(item, index) in list" :key="index">
              <td>{{ item.job_num }}</td>
              <td>{{ item.all_time }}</td>
              <td>{{ item.leave_time }}</td>
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
          @current-change="toSearch"
          :total="totalRow"
        >
        </el-pagination>
      </div>
    </div>

    <!--添加弹框-->
    <b-modal id="addAlert" title="新添报工单" ref="addAlert" size="xl" hide-footer>
      <div class="d-block text-center">
        <div class="row">
          <div class="col-lg-4 mb25">
            <div class="lh44">工号：</div>
            <b-form-input v-model="form.job_num" placeholder="工号" onkeypress="return (/[0-9a-zA-Z]/.test(String.fromCharCode(event.keyCode)))"></b-form-input>
          </div>
          <div class="col-lg-4 mb25">
            <div class="lh44">部门：</div>
            <b-form-input v-model="userInfo.dept_name" :readonly="true"></b-form-input>
          </div>
          <div class="col-lg-4 mb25">
            <div class="lh44">放假时间(小时)：</div>
            <b-form-input v-model="form.fj_time" placeholder="放假时间" onkeypress="return (/[0-9.:]/.test(String.fromCharCode(event.keyCode)))"></b-form-input>
          </div>
          <div class="col-lg-4 mb20">
            <div class="lh44">请假时间(小时)：</div>
            <b-form-input
              v-model="form.leave_time"
              placeholder="请假时间"
              onkeypress="return (/[0-9.:]/.test(String.fromCharCode(event.keyCode)))"
            ></b-form-input>
          </div>
          <div class="col-lg-4 mb20">
            <div class="lh44">创建日期：</div>
            <el-date-picker
              style="width:100%;"
              v-model="form.create_time"
              type="date"
              placeholder="创建日期"
              value-format="yyyy-MM-dd"
              format="yyyy-MM-dd"
            ></el-date-picker>
          </div>
          <div class="col-lg-4 mb20">
            <div class="lh44">工作时段：</div>
            <b-form-group>
              <b-form-radio-group
                id="btnradios1"
                buttons
                button-variant="outline-primary"
                v-model="time_quantum"
                :options="[{ text: '白班', value: 0 }, { text: '夜班', value: 1 }]"
                name="radiosBtnDefault"
              />
            </b-form-group>
          </div>
          <br />
          <table class="table table-bordered table-striped ">
            <tbody>
              <tr>
                <td>是否入库</td>
                <td>批号</td>
                <td>工序</td>
                <td>类型</td>
                <td>原材料批号</td>
                <td style="width:7%">计数方式</td>
                <td style="width:7%">工时(小时)</td>
                <td style="width:7%">数量</td>
                <td style="width:7%">加班</td>
                <td style="width:10%">针芯批号</td>
                <td style="width:10%">弹簧批号</td>
                <td>备注</td>
                <td>操作</td>
              </tr>
              <tr v-for="(item, index) in subForm" :key="index">
                <td>
                  <b-form-group>
                    <b-form-radio-group
                      id="btnradios1"
                      buttons
                      button-variant="outline-primary"
                      v-model="item.is_in"
                      :options="[{ text: '是', value: '0' }, { text: '否', value: '1', checked: true }]"
                      name="radiosBtnDefault"
                    />
                  </b-form-group>
                </td>
                <td>
                  <b-form-input v-model="item.order_no"></b-form-input>
                </td>
                <td>
                  <el-select
                    @change="getKindList(index)"
                    class="marginBot"
                    style="height:40px !important"
                    v-model="item.work_id"
                    filterable
                    placeholder="请选择工序"
                  >
                    <el-option v-for="item in workList" :key="item.value" :label="item.text" :value="item.value"> </el-option>
                  </el-select>
                </td>
                <td>
                  <el-select class="marginBot" placeholder="请先选择工序" style="height:40px !important" v-model="item.kind_id" filterable>
                    <el-option v-for="item in getOptions(index)" :key="item.value" :label="item.text" :value="item.value"> </el-option>
                  </el-select>
                </td>
                <td>
                  <b-form-input v-model="item.ycl_no" placeholder="请输入原材料批号"></b-form-input>
                </td>
                <td>
                  <b-form-group>
                    <b-form-radio-group
                      id="btnradios1"
                      buttons
                      button-variant="outline-primary"
                      v-model="item.work_type"
                      :options="[{ text: '计时', value: 0, checked: true }, { text: '计件', value: 1 }]"
                      name="radiosBtnDefault"
                    />
                  </b-form-group>
                </td>
                <td>
                  <b-form-input v-model="item.work_time" type="number" onkeypress="return (/[0-9.]/.test(String.fromCharCode(event.keyCode)))"></b-form-input>
                </td>
                <td>
                  <b-form-input v-model="item.num" type="number" onkeypress="return (/[0-9.]/.test(String.fromCharCode(event.keyCode)))"></b-form-input>
                </td>
                <td>
                  <b-form-input v-model="item.add_time" type="number" onkeypress="return (/[0-9.]/.test(String.fromCharCode(event.keyCode)))"></b-form-input>
                </td>
                <td v-if="tests(index)">
                  <b-form-input v-model="item.zx_order_no" placeholder="请输入针芯批号" :disabled="true"></b-form-input>
                </td>
                <td v-else>
                  <b-form-input v-model="item.zx_order_no" placeholder="请输入针芯批号"></b-form-input>
                </td>
                <td v-if="tests(index)">
                  <b-form-input v-model="item.th_order_no" placeholder="请输入弹簧批号" :disabled="true"></b-form-input>
                </td>
                <td v-else>
                  <b-form-input v-model="item.th_order_no" placeholder="请输入弹簧批号"></b-form-input>
                </td>
                <td>
                  <textarea v-model="item.remark" class="form-control" rows="3" style="height: 44px !important;" placeholder="备注"></textarea>
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

    <!--修改弹框-->
    <b-modal id="updateAlert" title="修改报工单" ref="updateAlert" size="xl" hide-footer no-close-on-esc no-close-on-backdrop hide-header-close>
      <div class="d-block text-center">
        <div class="row">
          <div class="col-lg-4 mb25">
            <div class="lh44">工号：</div>
            <b-form-input
              v-model="updateForm.job_num"
              :disabled="is_update"
              placeholder="工号"
              onkeypress="return (/[0-9a-zA-Z]/.test(String.fromCharCode(event.keyCode)))"
            ></b-form-input>
          </div>
          <div class="col-lg-4 mb25">
            <div class="lh44">部门：</div>
            <b-form-select v-model="updateForm.dept_id" :options="deptList" :disabled="true" />
          </div>
          <div class="col-lg-4 mb25">
            <div class="lh44">放假时间：</div>
            <b-form-input
              v-model="updateForm.fj_time"
              :disabled="is_update"
              placeholder="放假时间"
              onkeypress="return (/[0-9.:]/.test(String.fromCharCode(event.keyCode)))"
            ></b-form-input>
          </div>
          <div class="col-lg-4 mb20">
            <div class="lh44">请假时间(小时)：</div>
            <b-form-input
              v-model="updateForm.leave_time"
              :disabled="is_update"
              placeholder="请假时间"
              onkeypress="return (/[0-9.:]/.test(String.fromCharCode(event.keyCode)))"
            ></b-form-input>
          </div>
          <div class="col-lg-4 mb20">
            <div class="lh44">选择日期：</div>
            <el-date-picker
              style="width:100%;"
              v-model="updateForm.create_time"
              type="date"
              :disabled="is_update"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
              format="yyyy-MM-dd"
            ></el-date-picker>
          </div>
          <div class="col-lg-4 mb20">
            <div class="lh44">工作时段：</div>
            <b-form-group :disabled="is_update">
              <b-form-radio-group
                id="btnradios1"
                buttons
                button-variant="outline-primary"
                v-model="time_quantum"
                :options="[{ text: '白班', value: 0 }, { text: '夜班', value: 1 }]"
                name="radiosBtnDefault"
              />
            </b-form-group>
          </div>
          <br />
          <table class="table table-bordered table-striped ">
            <tbody>
              <tr>
                <td>是否入库</td>
                <td>批号</td>
                <td>工序</td>
                <td>类型</td>
                <td>原材料批号</td>
                <td style="width:7%">计数方式</td>
                <td style="width:7%">工时(小时)</td>
                <td style="width:7%">数量</td>
                <td style="width:7%">加班</td>
                <td style="width:10%">针芯批号</td>
                <td style="width:10%">弹簧批号</td>
                <td>备注</td>
                <td>操作</td>
              </tr>
              <tr v-for="(item, index) in subForm" :key="index">
                <td>
                  <b-form-group :disabled="is_update">
                    <b-form-radio-group
                      id="btnradios1"
                      buttons
                      button-variant="outline-primary"
                      v-model="item.is_in"
                      :options="[{ text: '是', value: '0' }, { text: '否', value: '1' }]"
                      name="radiosBtnDefault"
                    />
                  </b-form-group>
                </td>
                <td>
                  <b-form-input v-model="item.order_no" :disabled="is_update"></b-form-input>
                </td>
                <td>
                  <el-select
                    :disabled="is_update"
                    @change="getKindList(index)"
                    class="marginBot"
                    style="height:40px !important"
                    v-model="item.work_id"
                    filterable
                    placeholder="请选择工序"
                  >
                    <el-option v-for="item in workList" :key="item.value" :label="item.text" :value="item.value"> </el-option>
                  </el-select>
                </td>
                <td>
                  <el-select :disabled="is_update" class="marginBot" style="height:40px !important" v-model="item.kind_id" filterable placeholder="请选择类型">
                    <el-option v-for="item in getOptions(index)" :key="item.value" :label="item.text" :value="item.value"> </el-option>
                  </el-select>
                </td>
                <td>
                  <b-form-input v-model="item.ycl_no" placeholder="请输入原材料批号" :disabled="is_update"></b-form-input>
                </td>
                <td>
                  <b-form-group :disabled="is_update">
                    <b-form-radio-group
                      id="btnradios1"
                      buttons
                      button-variant="outline-primary"
                      v-model="item.work_type"
                      :options="[{ text: '计时', value: 0 }, { text: '计件', value: 1 }]"
                      name="radiosBtnDefault"
                    />
                  </b-form-group>
                </td>
                <td>
                  <b-form-input
                    v-model="item.work_time"
                    :disabled="is_update"
                    type="number"
                    onkeypress="return (/[0-9.]/.test(String.fromCharCode(event.keyCode)))"
                  ></b-form-input>
                </td>
                <td>
                  <b-form-input
                    v-model="item.num"
                    :disabled="is_update"
                    type="number"
                    onkeypress="return (/[0-9.]/.test(String.fromCharCode(event.keyCode)))"
                  ></b-form-input>
                </td>
                <td>
                  <b-form-input
                    v-model="item.add_time"
                    :disabled="is_update"
                    type="number"
                    onkeypress="return (/[0-9.]/.test(String.fromCharCode(event.keyCode)))"
                  ></b-form-input>
                </td>
                <td v-if="tests(index)">
                  <b-form-input v-model="item.zx_order_no" placeholder="请输入针芯批号" :disabled="true"></b-form-input>
                </td>
                <td v-else>
                  <b-form-input v-model="item.zx_order_no" placeholder="请输入针芯批号" :disabled="is_update"></b-form-input>
                </td>
                <td v-if="tests(index)">
                  <b-form-input v-model="item.th_order_no" placeholder="请输入弹簧批号" :disabled="true"></b-form-input>
                </td>
                <td v-else>
                  <b-form-input v-model="item.th_order_no" placeholder="请输入弹簧批号" :disabled="is_update"></b-form-input>
                </td>
                <td>
                  <textarea
                    v-model="item.remark"
                    :disabled="is_update"
                    class="form-control"
                    rows="3"
                    style="height: 44px !important;"
                    placeholder="备注"
                  ></textarea>
                </td>
                <b-button
                  variant="danger"
                  @click="closeSubForm(index)"
                  class="resetButton"
                  style="margin-top: 23px; margin-left: 8px !important; margin-right: 6px !important; padding: 5px 8px !important; font-size: 13px !important;"
                  >删&nbsp;&nbsp;除</b-button
                >
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <b-button
        variant="primary"
        :disabled="is_update"
        @click="addSubForm('add')"
        class="resetButton"
        style="font-size:16px !important; margin-top:25px; width:30% !important; padding:6px 80px !important;margin-bottom:30px !important;margin-right:0 !important;"
        >添&nbsp;&nbsp;加</b-button
      >
      <b-button
        v-if="is_update"
        variant="primary"
        @click="is_update = false"
        class="resetButton"
        style="font-size:16px !important; margin:25px 5% 30px 5% !important; background-color: #17a2b8 !important;  width:30% !important; padding:6px 80px !important;"
        >修&nbsp;&nbsp;改</b-button
      >
      <b-button
        v-if="!is_update"
        variant="primary"
        @click="toValidate('update')"
        class="resetButton"
        style="font-size:16px !important; margin:25px 5% 30px 5% !important; background-color: #17a2b8 !important;  width:30% !important; padding:6px 80px !important;"
        >保&nbsp;&nbsp;存</b-button
      >
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
        <b-alert variant="danger" show>删除部门可能会影响您的管理,确认删除吗?</b-alert>
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
import _ from 'lodash';

export default {
  name: 'bg',
  metaInfo: {
    title: '报工单管理',
  },
  components: {},
  data() {
    return {
      updateForm: new Array(),
      list: [],
      subForm: [],
      subFormContent: {
        work_id: null,
        kind_id: null,
        num: '',
        work_time: '',
        is_night: '',
        add_time: '',
        work_type: '',
        order_no: null,
        is_in: '1',
        ycl_no: '',
      },
      ycl_no: '',
      is_update: true,
      g_update: true,
      zx_order_no: '',
      th_order_no: '',
      operateId: {},
      currentPage: 1,
      limit: 15,
      totalRow: 0,
      is_in: '',
      order_no: null,
      form: {
        leave_time: 0,
        fj_time: 0,
      },
      time_quantum: null,
      deptList: [],
      kindList: [],
      workList: [],
      temporaryList: [],
      mainValidator: new Validator({
        job_num: [{ required: true, message: '请填写工号' }],
        dept_id: [{ required: true, message: '请选择部门' }],
        create_time: [{ required: true, message: '请选择创建日期' }],
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
  watch: {
    time_quantum: {
      handler(nV, oV) {
        if (nV === 1) {
          this.form.all_time = 8.5;
        } else {
          this.form.all_time = 9.5;
        }
      },
    },
  },
  methods: {
    tests(index) {
      let work_id = this.subForm[index].work_id;
      let result = true;
      for (const item of this.workList) {
        if (item.value === work_id && item.text === 'G') {
          result = false;
          break;
        }
      }
      return result;
    },
    //分页
    toSearch(currentPage) {
      this.currentPage = currentPage;
      this.search();
    },
    //查询
    async search() {
      let skip = (this.currentPage - 1) * this.limit;
      let result = await this.$axios.get(`/akyl/bg/job_report_list?skip=${skip}&limit=${this.limit}&dept_id=${this.userInfo.dept_id}`);
      if (result.data.totalRow === 0) {
        let array = [];
        this.$set(this, 'list', array);
      } else {
        this.$set(this, 'list', result.data.jobReportList);
      }
      this.$set(this, 'totalRow', result.data.totalRow);
    },

    //请求各表
    async getOtherList() {
      //请求部门表
      let result = await this.$axios.get('/akyl/dept/dept_list?skip=0&limit=100');
      this.deptList = result.data.deptList.map(item => {
        let newObject = { text: item.dept_name, value: item.id };
        return newObject;
      });
    },
    //请求工序表
    async getWorkList() {
      let result = await this.$axios.get('/akyl/work/work_list?skip=0&limit=100');
      this.workList = result.data.workList.map(item => {
        let newObject = { text: item.code, value: item.id };
        return newObject;
      });
    },
    //当工序为G时，针芯批号跟弹簧批号可编辑
    async changepihao(index) {
      if (this.subForm[index].work_id === 10) {
        console.log(111);
        this.g_update = false;
      } else {
        console.log(222);
        this.g_update = true;
      }
    },
    //请求类型表(应该是二级联动工序表)
    async getKindList(index) {
      if (!this.$refs.updateAlert.is_show) {
        this.subForm[index].kind_id = '';
      }
      let subFormKindList = [];
      let result = await this.$axios.get(`/akyl/kind/kind_list?skip=0&limit=1000&work_id=${this.subForm[index].work_id}`);
      if (result.data.totalRow > 0) {
        subFormKindList = result.data.kindList.map(item => {
          let newObject = { text: item.code, value: item.id };
          return newObject;
        });
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
      let result = await this.$axios.get(`/akyl/bg/job_report_sub_info?id=${id}`);
      if (result.data.msg === '成功') {
        if (result.data.jobReportSubList.length > 0) {
          this.$set(this, 'subForm', result.data.jobReportSubList);
          for (let i = 0; i < this.subForm.length; i++) {
            this.$set(this, 'time_quantum', result.data.jobReportSubList[i].is_night);
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
        if (this.time_quantum === 1 || this.time_quantum === 0) {
          if (type === 'add') {
            return this.add();
          } else {
            return this.update();
          }
        } else {
          this.$message.error('请选择工作时段');
        }
      });
    },
    //添加
    async add() {
      this.subForm.map(item => {
        item.is_night = this.time_quantum;
        return item;
      });
      let all_work_time = 0;
      this.subForm.forEach(item => {
        all_work_time = all_work_time * 1 + item.work_time * 1;
      });
      all_work_time += this.form.leave_time * 1;
      all_work_time += this.form.fj_time * 1;
      let should_work_time = this.time_quantum === 0 ? 9.5 : 8.5;
      if (should_work_time !== all_work_time) {
        this.$message.error('请假时间+工作时间+放假时间不等于总工时.时间输入有误');
        return false;
      }
      let result = await this.$axios.post('/akyl/bg/job_report_main_save', { data: this.form });
      if (result.data.msg === '成功') {
        let id = result.data.id;
        result = await this.$axios.post('/akyl/bg/job_report_sub_save', { data: { subForm: this.subForm, id: id } });
        if (result.data.msg === '成功') {
          this.$message.success('添加成功');
          this.$refs.addAlert.hide();
          this.form = {};
          this.subForm = [];
          this.time_quantum = '';
          this.search();
        } else {
          this.$message.error('添加失败');
        }
      } else {
        this.$message.error('添加失败');
      }
    },
    //修改
    async update() {
      this.subForm.map(item => {
        item.is_night = this.time_quantum;
        return item;
      });
      let all_work_time = 0;
      this.subForm.forEach(item => {
        all_work_time = all_work_time * 1 + item.work_time * 1;
      });
      all_work_time += this.updateForm.leave_time * 1;
      all_work_time += this.updateForm.fj_time * 1;
      let should_work_time = this.time_quantum === 0 ? 9.5 : 8.5;
      if (should_work_time !== all_work_time) {
        this.$message.error('请假时间加工作时间不等于总工时.时间输入有误');
        return false;
      }
      let result = await this.$axios.post('/akyl/bg/job_report_main_edit', { data: this.updateForm });
      if (result.data.msg === '成功') {
        result = await this.$axios.post('/akyl/bg/job_report_sub_edit', { data: { subForm: this.subForm, id: this.updateForm.id } });
        if (result.data.msg === '成功') {
          this.$message.success('修改成功');
          this.closeAlert('update');
          this.form = {};
          this.time_quantum = '';
          this.is_update = true;
          this.g_update = true;
          this.search();
        } else {
          this.$message.error('修改失败');
        }
      } else {
        this.$message.error('修改失败');
      }
    },
    //删除
    async toDelete() {
      let result = await this.$axios.post('/akyl/bg/job_report_delete', { data: { id: this.operateId } });
      if (result.data.rescode === '0') {
        this.$message.success('删除' + result.data.msg);
        this.closeAlert('delete');
        this.search();
      } else {
        this.$message.error(result.data.msg);
      }
    },
    //打开与关闭修改和删除的弹框
    openAlert(type, id) {
      if (type === 'update') {
        this.$refs.updateAlert.show();
        this.search();
        this.updateForm = JSON.parse(JSON.stringify(this.list[id]));
        this.searchSubForm(this.updateForm.id);
      } else if (type === 'delete') {
        this.$refs.deleteAlert.show();
        this.operateId = id;
      } else if (type === 'add') {
        this.temporaryList.splice(0, this.temporaryList.length);
        this.form.dept_id = this.userInfo.dept_id;
        this.form.login_id = this.userInfo.login_id;
        this.addSubForm('open');
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
      this.g_update = true;
      this.operateId = '';
      this.subForm.splice(0, this.subForm.length);
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
    addSubForm(type) {
      if (type === 'add') {
        this.subForm.push(JSON.parse(JSON.stringify(this.subFormContent)));
      } else {
        if (!this.subForm.length > 0) {
          this.subForm.push(JSON.parse(JSON.stringify(this.subFormContent)));
        }
      }
    },
    reset() {
      this.time_quantum = null;
      this.form = {};
      this.form.all_time = 0;
      this.form.fj_time = 0;
      this.form.leave_time = 0;
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
