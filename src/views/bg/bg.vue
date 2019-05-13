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
        <div class="col-lg-4 mb25">
          <el-date-picker
            style="width: 100%;"
            v-model="select_create_time"
            value-format="yyyy-MM-dd"
            format="yyyy-MM-dd"
            type="date"
            placeholder="选择日期"
          ></el-date-picker>
        </div>
        <div class="col-lg-3 mb25">
          <b-form-input
            style="height:40px !important"
            v-model="select_job_num"
            placeholder="工号"
            onkeypress="return (/[0-9a-zA-Z]/.test(String.fromCharCode(event.keyCode)))"
          ></b-form-input>
        </div>
        <div class="col-lg-2 mb25">
          <b-button
            variant="primary"
            style="font-size:14px !important; color:#fff !important; width: 60% !important; margin-top:3px;  padding: 6px 0 !important; margin-right:0 !important;"
            @click="search()"
            >查&nbsp;&nbsp;询</b-button
          >
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
            <i class="base-margin-right-5 fa fa-plus-square"></i>新建报工单
          </a>
        </div>
        <table class="table table-bordered table-striped ">
          <tbody v-if="list.length > 0">
            <tr>
              <th>日期</th>
              <th>工号</th>
              <th>姓名</th>
              <th>总工时(h)</th>
              <th>请假时间(h)</th>
              <th>操作</th>
            </tr>
            <tr v-for="(item, index) in list" :key="index">
              <td>{{ item.create_time }}</td>
              <td>{{ item.job_num }}</td>
              <td>{{ item.user_name }}</td>
              <td>{{ item.all_time }}</td>
              <td>{{ item.leave_time }}</td>
              <td>
                <b-button @click="openAlert('update', index)" variant="primary" style="color:white; margin-right:5px;">详&nbsp;&nbsp;情</b-button>
                <b-button @click="copyBgList(index)" variant="primary" style="color:white; margin-right:5px;">复&nbsp;&nbsp;制</b-button>
                <b-button @click="openAlert('delete', item.id)" variant="danger" style="color:white;">删&nbsp;&nbsp;除</b-button>
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
    <el-dialog width="85%" title="新添报工单" :visible.sync="outerVisible">
      <div class="d-block text-center">
        <div class="row">
          <div class="col-lg-4 mb25">
            <div class="lh44">工号：</div>
            <!-- <b-form-input v-model="form.job_num" placeholder="工号" onkeypress="return (/[0-9a-zA-Z]/.test(String.fromCharCode(event.keyCode)))"></b-form-input> -->
            <!-- <el-select class="marginBot" style="height:40px !important" v-model="form.job_num" filterable placeholder="工号">
              <el-option v-for="item in staffList" :key="item.id" :label="item.job_num" :value="item.job_num"> </el-option>
            </el-select> -->
            <el-autocomplete v-model="form.job_num" :fetch-suggestions="querySearch" placeholder="工号" @select="handleSelect">
              <template slot-scope="scope">
                {{ scope.item.job_num }}
              </template>
            </el-autocomplete>
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
                <td style="width:4%">是否入库</td>
                <td style="width:7.5%">工序</td>
                <td style="width:12%">类型</td>
                <td style="width:18%">批号</td>
                <td style="width:3%">计数方式</td>
                <td style="width:5.5%">工时(小时)</td>
                <td style="width:7.5%">数量</td>
                <td style="width:5.5%">加班</td>
                <td style="width:12%">备注</td>
                <td style="width:6%">操作</td>
              </tr>
              <tr v-for="(item, subFormIndex) in subForm" :key="subFormIndex">
                <td>
                  <b-form-group>
                    <b-form-radio-group
                      id="btnradios1"
                      buttons
                      button-variant="outline-primary"
                      v-model="item.is_in"
                      :options="[{ text: '是', value: '0' }, { text: '否', value: '1', checked: true }]"
                      name="radiosBtnDefault"
                      stacked
                    />
                  </b-form-group>
                </td>
                <td>
                  <el-autocomplete
                    v-model="item.work_name"
                    :fetch-suggestions="queryWork"
                    placeholder="工序"
                    @select="inputSelect"
                    @focus="getIndexAndType(subFormIndex, 'work')"
                  >
                    <template slot-scope="scope">
                      {{ scope.item.code }}
                    </template>
                  </el-autocomplete>
                  <!-- <el-select
                    @change="getKindList(subFormIndex)"
                    class="marginBot"
                    style="height:40px !important"
                    v-model="item.work_id"
                    filterable
                    placeholder="工序"
                  >
                    <el-option v-for="item in workList" :key="item.value" :label="item.text" :value="item.value"> </el-option>
                  </el-select> -->
                </td>
                <td>
                  <el-select
                    @change="getIndex(subFormIndex, item.work_id, item.kind_id)"
                    class="marginBot"
                    placeholder="类型"
                    style="height:40px !important"
                    v-model="item.kind_id"
                    filterable
                  >
                    <el-option v-for="item in temporaryList" :key="item.value" :label="item.text" :value="item.value"> </el-option>
                    <!-- getOptions(subFormIndex) -->
                  </el-select>
                </td>
                <td>
                  <div v-if="isShow('on', subFormIndex) === '1'">
                    半成品
                    <el-autocomplete
                      size="mini"
                      @select="inputSelectOnPh"
                      @focus="getPhIndex(subFormIndex)"
                      class="inline-input"
                      v-model="item.order_no"
                      :fetch-suggestions="orderNoSearch"
                      placeholder="半成品批号"
                    >
                      <template slot-scope="scope">
                        {{ scope.item.order_no }}
                      </template>
                    </el-autocomplete>
                  </div>
                  <div v-if="isShow('ycl', subFormIndex) === '1'">
                    原材料
                    <!-- <el-autocomplete size="mini" class="inline-input" v-model="item.ycl_no" placeholder="原材料批号"> </el-autocomplete> -->
                    <el-input style="width:77% !important" size="mini" placeholder="原材料批号" v-model="item.ycl_no"> </el-input>
                  </div>
                  <div v-if="isShow('zx', subFormIndex) === '1'">
                    针&nbsp;&nbsp;&nbsp;&nbsp;芯
                    <el-autocomplete
                      size="mini"
                      @select="inputSelectZxPh"
                      @focus="getPhIndex(subFormIndex)"
                      class="inline-input"
                      v-model="item.zx_order_no"
                      :fetch-suggestions="zxOrderNoSearch"
                      placeholder="针芯批号"
                    >
                      <template slot-scope="scope">
                        {{ scope.item.order_no }}
                      </template>
                    </el-autocomplete>
                  </div>
                  <div v-if="isShow('th', subFormIndex) === '1'">
                    弹簧柄
                    <el-autocomplete
                      size="mini"
                      @select="inputSelectThPh"
                      @focus="getPhIndex(subFormIndex)"
                      class="inline-input"
                      v-model="item.th_order_no"
                      :fetch-suggestions="thOrderNoSearch"
                      placeholder="弹簧柄批号"
                    >
                      <template slot-scope="scope">
                        {{ scope.item.order_no }}
                      </template>
                    </el-autocomplete>
                  </div>
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
                      stacked
                    />
                  </b-form-group>
                </td>
                <td>
                  <b-form-input
                    v-model="item.work_time"
                    type="number"
                    onkeypress="return (/[0-9.]/.test(String.fromCharCode(event.keyCode)))"
                    placeholder="工时"
                  ></b-form-input>
                </td>
                <td>
                  <b-form-input
                    v-model="item.num"
                    type="number"
                    onkeypress="return (/[0-9.]/.test(String.fromCharCode(event.keyCode)))"
                    placeholder="数量"
                  ></b-form-input>
                </td>
                <td>
                  <b-form-input
                    v-model="item.add_time"
                    type="number"
                    onkeypress="return (/[0-9.]/.test(String.fromCharCode(event.keyCode)))"
                    placeholder="加班"
                  ></b-form-input>
                </td>
                <td>
                  <textarea v-model="item.remark" class="form-control" rows="3" style="height: 44px !important;" placeholder="备注"></textarea>
                </td>
                <b-button
                  style="margin-top: 23px; margin-left: 8px !important; margin-right: 6px !important; padding: 5px 8px !important; font-size: 13px !important;"
                  @click="closeSubForm(subFormIndex)"
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
    </el-dialog>

    <!--修改弹框-->
    <el-dialog width="85%" title="修改报工单" :visible.sync="outerVisibleUpdate">
      <div class="d-block text-center">
        <div class="row">
          <div class="col-lg-4 mb25">
            <div class="lh44">工号：</div>
            <!-- <el-select :disabled="is_update" class="marginBot" style="height:40px !important;" v-model="updateForm.job_num" filterable placeholder="工号">
              <el-option v-for="item in staffList" :key="item.id" :label="item.job_num" :value="item.job_num"> </el-option>
            </el-select> -->
            <el-autocomplete :disabled="is_update" v-model="updateForm.job_num" :fetch-suggestions="querySearch" placeholder="工号" @select="handleSelect">
              <template slot-scope="scope">
                {{ scope.item.job_num }}
              </template>
            </el-autocomplete>
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
                <td style="width:4%">是否入库</td>
                <td style="width:8%">工序</td>
                <td style="width:10%">类型</td>
                <td style="width:18%">批号</td>
                <td style="width:3%">计数方式</td>
                <td style="width:5.5%">工时(小时)</td>
                <td style="width:7%">数量</td>
                <td style="width:5.9%">加班</td>
                <td style="width:12%">备注</td>
                <td style="width:6%">操作</td>
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
                      stacked
                    />
                  </b-form-group>
                </td>
                <td>
                  <!-- <el-select
                    :disabled="is_update"
                    @change="getKindList(index)"
                    class="marginBot"
                    style="height:40px !important"
                    v-model="item.work_id"
                    filterable
                    placeholder="请选择工序"
                  >
                    <el-option v-for="item in workList" :key="item.value" :label="item.text" :value="item.value"> </el-option>
                  </el-select> -->
                  <el-autocomplete
                    v-model="item.work_name"
                    :fetch-suggestions="queryWork"
                    placeholder="工序"
                    :disabled="is_update"
                    @select="inputSelect"
                    @focus="getIndexAndType(index, 'work')"
                  >
                    <template slot-scope="scope">
                      {{ scope.item.code }}
                    </template>
                  </el-autocomplete>
                </td>
                <td>
                  <el-select
                    :disabled="is_update"
                    @change="getIndexUpdate(index, item.work_id, item.kind_id)"
                    class="marginBot"
                    style="height:40px !important"
                    v-model="item.kind_id"
                    filterable
                    placeholder="请选择类型"
                  >
                    <el-option v-for="item in temporaryList" :key="item.value" :label="item.text" :value="item.value"> </el-option>
                    <!--getOptions(index)-->
                  </el-select>
                </td>
                <td>
                  <div v-if="isShow('on', index) === '1'">
                    半成品
                    <el-autocomplete
                      size="mini"
                      @select="inputSelectOnPh"
                      @focus="getPhIndex(index)"
                      :disabled="is_update"
                      class="inline-input"
                      v-model="item.order_no"
                      :fetch-suggestions="orderNoSearch"
                      placeholder="半成品批号"
                    >
                      <template slot-scope="scope">
                        {{ scope.item.order_no }}
                      </template>
                    </el-autocomplete>
                  </div>
                  <div v-if="isShow('ycl', index) === '1'">
                    原材料
                    <!-- <el-autocomplete :disabled="is_update" size="mini" class="inline-input" v-model="item.ycl_no" placeholder="原材料批号"> </el-autocomplete> -->
                    <el-input style="width:75% !important" :disabled="is_update" size="mini" placeholder="原材料批号" v-model="item.ycl_no"> </el-input>
                  </div>
                  <div v-if="isShow('zx', index) === '1'">
                    针&nbsp;&nbsp;&nbsp;&nbsp;芯
                    <el-autocomplete
                      size="mini"
                      :disabled="is_update"
                      @select="inputSelectThPh"
                      @focus="getPhIndex(index)"
                      class="inline-input"
                      v-model="item.zx_order_no"
                      :fetch-suggestions="zxOrderNoSearch"
                      placeholder="针芯批号"
                    >
                      <template slot-scope="scope">
                        {{ scope.item.order_no }}
                      </template>
                    </el-autocomplete>
                  </div>
                  <div v-if="isShow('th', index) === '1'">
                    弹簧柄
                    <el-autocomplete
                      size="mini"
                      :disabled="is_update"
                      @select="inputSelectThPh"
                      @focus="getPhIndex(index)"
                      class="inline-input"
                      v-model="item.th_order_no"
                      :fetch-suggestions="thOrderNoSearch"
                      placeholder="弹簧柄批号"
                    >
                      <template slot-scope="scope">
                        {{ scope.item.order_no }}
                      </template>
                    </el-autocomplete>
                  </div>
                </td>
                <td>
                  <b-form-group :disabled="is_update">
                    <b-form-radio-group
                      id="btnradios1"
                      buttons
                      button-variant="outline-primary"
                      v-model="item.work_type"
                      :options="[{ text: '计时', value: 0, checked: true }, { text: '计件', value: 1 }]"
                      name="radiosBtnDefault"
                      stacked
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
                  v-if="!is_update"
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
        v-if="!is_update"
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
        style="font-size:16px !important; width:30% !important; margin-top:25px; margin-bottom:30px !important; margin-right: 0px !important; padding:6px 80px !important;"
        >返&nbsp;&nbsp;回</b-button
      >
    </el-dialog>

    <!--删除弹框-->
    <b-modal id="deleteAlert" title="确认删除" ref="deleteAlert" hide-footer no-close-on-esc no-close-on-backdrop hide-header-close>
      <div class="d-block text-center">
        <b-alert variant="danger" show>请确认是否删除?</b-alert>
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
import { constants } from 'crypto';
import { throws } from 'assert';

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
        is_night: '',
        work_type: 0,
        is_in: '1',
        add_time: null,
        num: null,
        work_time: null,
        kind_id: null,
        work_id: null,
      },
      ycl_no: '',
      is_update: true,
      zx_order_no: '',
      th_order_no: '',
      operateId: '',
      currentPage: 1,
      limit: 15,
      totalRow: 0,
      is_in: '',
      order_no: null,
      form: {
        leave_time: 0,
        fj_time: 0,
      },
      time_quantum: 0,
      deptList: [],
      kindList: [],
      workList: [],
      temporaryList: [],
      mainValidator: new Validator({
        // job_num: [{ required: true, message: '请填写工号' }],
        // create_time: [{ required: true, message: '请选择创建日期' }],
      }),
      orderNoIndex: '',
      orderNoList: {},
      outerVisible: false,
      outerVisibleUpdate: false,
      contractPrice: '',
      staffList: [],
      select_create_time: '',
      select_job_num: '',
      midIndex: 0,
      phIndex: 0,
      midType: '',
      zxOrderNoList: [],
      thOrderNoList: [],
      batchChoose: [
        { code: '51.0', zx: '0', th: '0', on: '0', ycl: '0' },
        { code: 'A1', zx: '0', th: '0', on: '1', ycl: '0' },
        { code: 'A2', zx: '0', th: '0', on: '0', ycl: '0' },
        { code: 'A3', zx: '0', th: '0', on: '0', ycl: '0' },
        { code: 'A4', zx: '0', th: '0', on: '0', ycl: '0' },
        { code: 'B1', zx: '0', th: '0', on: '1', ycl: '1' },
        { code: 'B2', zx: '0', th: '0', on: '0', ycl: '0' },
        { code: 'C', zx: '0', th: '0', on: '1', ycl: '1' },
        { code: 'C1', zx: '0', th: '0', on: '1', ycl: '1' },
        { code: 'C2', zx: '0', th: '0', on: '0', ycl: '1' },
        { code: 'C3', zx: '0', th: '0', on: '0', ycl: '1' },
        { code: 'D', zx: '0', th: '0', on: '1', ycl: '1' },
        { code: 'D1', zx: '0', th: '0', on: '1', ycl: '1' },
        { code: 'D2', zx: '0', th: '0', on: '0', ycl: '1' },
        { code: 'D3', zx: '0', th: '0', on: '0', ycl: '1' },
        { code: 'E', zx: '0', th: '1', on: '0', ycl: '0' },
        { code: 'F', zx: '1', th: '0', on: '0', ycl: '0' },
        { code: 'F1', zx: '1', th: '0', on: '0', ycl: '0' },
        { code: 'F2', zx: '1', th: '0', on: '0', ycl: '0' },
        { code: 'G', zx: '1', th: '1', on: '1', ycl: '0' },
        { code: 'H', zx: '0', th: '0', on: '1', ycl: '0' },
        { code: 'H1', zx: '0', th: '0', on: '1', ycl: '0' },
        { code: 'H2', zx: '0', th: '0', on: '1', ycl: '0' },
        { code: 'H3', zx: '0', th: '0', on: '1', ycl: '0' },
        { code: 'H4', zx: '0', th: '0', on: '1', ycl: '0' },
        { code: 'H5', zx: '0', th: '0', on: '1', ycl: '0' },
        { code: 'I', zx: '0', th: '0', on: '0', ycl: '1' },
        { code: 'I1', zx: '0', th: '0', on: '0', ycl: '1' },
        { code: 'J', zx: '0', th: '0', on: '1', ycl: '0' },
        { code: 'J1', zx: '0', th: '0', on: '1', ycl: '0' },
        { code: 'J2', zx: '0', th: '0', on: '1', ycl: '0' },
        { code: 'J3', zx: '0', th: '0', on: '1', ycl: '0' },
        { code: 'J4', zx: '0', th: '0', on: '1', ycl: '0' },
        { code: 'K', zx: '0', th: '0', on: '0', ycl: '1' },
        { code: 'K1', zx: '0', th: '0', on: '1', ycl: '1' },
        { code: 'K2', zx: '0', th: '0', on: '0', ycl: '1' },
        { code: 'L', zx: '0', th: '0', on: '1', ycl: '0' },
        { code: 'M', zx: '0', th: '0', on: '1', ycl: '0' },
        { code: 'N', zx: '0', th: '0', on: '1', ycl: '0' },
        { code: 'O', zx: '0', th: '0', on: '1', ycl: '0' },
        { code: 'P', zx: '0', th: '0', on: '0', ycl: '1' },
        { code: 'Q', zx: '0', th: '0', on: '0', ycl: '1' },
        { code: 'Q1', zx: '0', th: '0', on: '1', ycl: '1' },
        { code: 'Q2', zx: '0', th: '0', on: '0', ycl: '1' },
        { code: 'R', zx: '0', th: '0', on: '1', ycl: '1' },
        { code: 'R1', zx: '0', th: '0', on: '0', ycl: '1' },
        { code: 'R2', zx: '0', th: '0', on: '0', ycl: '1' },
        { code: 'S', zx: '0', th: '0', on: '0', ycl: '1' },
        { code: 'S1', zx: '0', th: '0', on: '0', ycl: '1' },
        { code: 'S2', zx: '0', th: '0', on: '0', ycl: '1' },
        { code: 'S3', zx: '0', th: '0', on: '0', ycl: '1' },
        { code: 'S4', zx: '0', th: '0', on: '0', ycl: '1' },
        { code: 'T', zx: '0', th: '0', on: '0', ycl: '0' },
        { code: 'T1', zx: '0', th: '0', on: '0', ycl: '0' },
        { code: 'T2', zx: '0', th: '0', on: '0', ycl: '0' },
        { code: 'W', zx: '1', th: '1', on: '0', ycl: '0' },
        { code: 'X', zx: '0', th: '1', on: '0', ycl: '0' },
        { code: 'Z', zx: '0', th: '1', on: '0', ycl: '1' },
        { code: 'Z1', zx: '0', th: '1', on: '0', ycl: '0' },
        { code: 'Z2', zx: '0', th: '1', on: '0', ycl: '0' },
      ],
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
    this.searchJobNum();
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
    //工号选择
    queryWork(queryString, cb) {
      let result;
      if (queryString != undefined) {
        result = this.workList.filter(item => {
          return item.code.toLowerCase().indexOf(queryString.toLowerCase()) >= 0;
        });
        // 调用 callback 返回建议列表的数据
        if (result.length > 0) {
          let is_workId = result.filter(item => item.code.toLowerCase() === queryString.toLowerCase());
          if (is_workId.length > 0) {
            this.getKindList(is_workId[0].id);
          }
        }
      } else {
        result = this.workList;
      }
      cb(result);
    },
    getIndexAndType(index, type) {
      this.midIndex = index;
      this.midType = type;
    },
    getPhIndex(index) {
      this.phIndex = index;
    },
    inputSelectZxPh(item) {
      this.$set(this.subForm[this.phIndex], `zx_order_no`, item.order_no);
    },
    inputSelectThPh(item) {
      this.$set(this.subForm[this.phIndex], `th_order_no`, item.order_no);
    },
    inputSelectOnPh(item) {
      this.$set(this.subForm[this.phIndex], `order_no`, item.order_no);
    },
    async inputSelect(item) {
      let result = await this.$axios.get(`/akyl/bg/order_no_lt_sel?kind_id=${item.id}&type=1`);
      this.$set(this, 'zxOrderNoList', result.data.kindStoreList);
      result = await this.$axios.get(`/akyl/bg/order_no_lt_sel?kind_id=${item.id}&type=0`);
      this.$set(this, 'thOrderNoList', result.data.kindStoreList);
      this.$set(this.subForm[this.midIndex], `${this.midType}_name`, item.code);
      this.$set(this.subForm[this.midIndex], `${this.midType}_id`, item.id);
      if (this.midType === 'work') {
        this.getKindList(item.id);
      }
      this.midIndex = 0;
      this.midType = '';
    },
    querySearch(queryString, cb) {
      let result;
      if (queryString !== undefined) {
        result = this.staffList.filter(item => {
          return item.job_num.toLowerCase().indexOf(queryString.toLowerCase()) >= 0;
        });
      } else {
        result = this.staffList;
      }
      // 调用 callback 返回建议列表的数据
      cb(result);
    },
    handleSelect(item) {
      this.form.job_num = item.job_num;
      this.updateForm.job_num = item.job_num;
    },
    isG(index) {
      let work_id = this.subForm[index].work_id;
      let result = true;
      for (const item of this.workList) {
        if (item.id === work_id && item.code === 'G') {
          result = false;
          break;
        }
      }
      return result;
    },
    // 批号显示
    isShow(type, i) {
      for (let index = 0; index < this.batchChoose.length; index++) {
        if (this.batchChoose[index].code === this.subForm[i].work_name) {
          if (type === 'on') {
            return this.batchChoose[index].on;
          }
          if (type === 'ycl') {
            return this.batchChoose[index].ycl;
          }
          if (type === 'zx') {
            return this.batchChoose[index].zx;
          }
          if (type === 'th') {
            return this.batchChoose[index].th;
          }
        }
      }
    },
    //半成品批号选择
    orderNoSearch(queryString, cb) {
      let restaurants = this.orderNoList != undefined ? this.orderNoList : [];
      restaurants = restaurants.filter(item => {
        return item.order_no != null;
      });
      let result;
      if (queryString !== undefined) {
        result = restaurants.filter(item => {
          return item.order_no.toLowerCase().indexOf(queryString.toLowerCase()) >= 0;
        });
      } else {
        result = restaurants;
      }
      // 调用 callback 返回建议列表的数据
      cb(result);
    },
    //针芯批号选择
    zxOrderNoSearch(queryString, cb) {
      let restaurants = this.zxOrderNoList != undefined ? this.zxOrderNoList : [];
      restaurants = restaurants.filter(item => {
        return item.order_no != null;
      });
      let result;
      if (queryString !== undefined) {
        result = restaurants.filter(item => {
          return item.order_no.toLowerCase().indexOf(queryString.toLowerCase()) >= 0;
        });
      } else {
        result = restaurants;
      }
      // 调用 callback 返回建议列表的数据
      cb(result);
    },
    //弹簧柄批号选择
    thOrderNoSearch(queryString, cb) {
      let restaurants = this.thOrderNoList != undefined ? this.thOrderNoList : [];
      restaurants = restaurants.filter(item => {
        return item.order_no != null;
      });
      let result;
      if (queryString !== undefined) {
        result = restaurants.filter(item => {
          return item.order_no.toLowerCase().indexOf(queryString.toLowerCase()) >= 0;
        });
      } else {
        result = restaurants;
      }
      // 调用 callback 返回建议列表的数据
      cb(result);
    },
    //分页
    toSearch(currentPage) {
      this.currentPage = currentPage;
      this.search();
    },
    //查询
    async search() {
      if (this.select_create_time === null) {
        this.select_create_time = '';
      }
      let skip = (this.currentPage - 1) * this.limit;
      let result = await this.$axios.get(
        `/akyl/bg/job_report_list?skip=${skip}&limit=${this.limit}&dept_id=${this.userInfo.dept_id}&create_time=${this.select_create_time}&job_num=${
          this.select_job_num
        }`
      );
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
    //查询员工工号
    async searchJobNum() {
      let result = await this.$axios.get(`/akyl/staff/staff_list?skip=0&limit=10000`);
      this.$set(this, 'staffList', result.data.staffList);
    },
    //请求工序表
    async getWorkList() {
      let result = await this.$axios.get('/akyl/work/work_list?skip=0&limit=100');
      this.workList = result.data.workList;
      // .map(item => {
      //   let newObject = { text: item.code, value: item.id };
      //   return newObject;
      // });
    },
    //获取批号add
    async getIndex(index, kindId, workId) {
      // this.innerVisible = true;
      this.orderNoIndex = index;
      let result = await this.$axios.get(`/akyl/bg/order_no_sel?work_id=${kindId}&kind_id=${workId}`);
      if (result.data.totalRow === 0) {
        let array = [];
        this.$set(this, 'orderNoList', array);
      } else {
        this.$set(this, 'orderNoList', result.data.kindStoreList);
      }
    },
    //获取批号update
    async getIndexUpdate(index, kindId, workId) {
      // this.innerVisibleUpdate = true;
      this.orderNoIndex = index;
      let result = await this.$axios.get(`/akyl/bg/order_no_sel?work_id=${kindId}&kind_id=${workId}`);
      if (result.data.totalRow === 0) {
        let array = [];
        this.$set(this, 'orderNoList', array);
      } else {
        this.$set(this, 'orderNoList', result.data.kindStoreList);
      }
    },
    //请求类型表(应该是二级联动工序表)
    async getKindList(workId) {
      // if (this.innerVisible != true) {
      //   this.subForm[index].kind_id = '';
      // }
      if (this.subForm[0].work_name === '51.0') {
        this.subForm[0].kind_id = 6025;
        this.subForm[0].num = 0;
        this.subForm[0].work_type = 0;
        if (this.time_quantum === 1) {
          this.subForm[0].work_time = 8.5;
        }
        if (this.time_quantum === 0) {
          this.subForm[0].work_time = 9.5;
        }
        return;
      }
      let subFormKindList = [];
      let result = await this.$axios.get(`/akyl/kind/kind_list?skip=0&limit=1000&work_id=${workId}`);
      if (result.data.totalRow > 0) {
        subFormKindList = result.data.kindList.map(item => {
          let newObject = { text: item.code, value: item.id };
          return newObject;
        });
        // this.$set(this.temporaryList, `${index}`, subFormKindList);
        this.$set(this, `temporaryList`, subFormKindList);
      } else {
        let defalut = { text: '没有类型', value: null, disabled: true };
        // this.subForm[index].kind_id = null;
        subFormKindList.unshift(defalut);
        // this.$set(this.temporaryList, `${index}`, subFormKindList);
        this.$set(this, `temporaryList`, subFormKindList);
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
            for (let index = 0; index < this.workList.length; index++) {
              if (this.workList[index].id === this.subForm[i].work_id) {
                this.$set(this.subForm[i], `work_name`, this.workList[index].code);
              }
            }
            this.getKindList(this.subForm[i].work_id);
          }
        }
      }
    },
    // //获取类型
    // getOptions(index) {
    //   let result = [];
    //   for (let i = 0; i < this.temporaryList.length; i++) {
    //     if (i === index) {
    //       result = JSON.parse(JSON.stringify(this.temporaryList[i]));
    //       break;
    //     }
    //   }
    //   return result;
    // },
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
      if (this.form.fj_time === null) {
        this.form.fj_time = 0;
      }
      if (this.form.leave_time === null) {
        this.form.leave_time = 0;
      }
      all_work_time += this.form.leave_time * 1;
      all_work_time += this.form.fj_time * 1;
      let should_work_time = this.time_quantum === 0 ? 9.5 : 8.5;
      if (should_work_time !== all_work_time) {
        this.$message.error('请假时间+工作时间+放假时间不等于总工时.时间输入有误');
        return false;
      }
      for (let index = 0; index < this.subForm.length; index++) {
        if (this.subForm[index].work_id === null) {
          this.$message.error('请选择工序');
          return false;
        }
        if (this.subForm[index].kind_id === null) {
          this.$message.error('请选择类型');
          return false;
        }
        if ((this.subForm[index].work_time === null) | (this.subForm[index].work_time === '')) {
          this.$message.error('请添加工时');
          return false;
        }
        if ((this.subForm[index].num === null) | (this.subForm[index].num === '')) {
          this.$message.error('请添加数量');
          return false;
        }
      }
      let newFrom = JSON.parse(JSON.stringify(this.form));
      let filterList = this.staffList.filter(item => item.job_num === newFrom.job_num);
      if (filterList.length <= 0) {
        this.$message.error('没有此工号');
        throw new Error('job_num无对应数据');
      }
      if (newFrom.id != null) {
        delete newFrom.id;
      }
      let result = await this.$axios.post('/akyl/bg/job_report_main_save', { data: newFrom });
      if (result.data.msg === '成功') {
        let id = result.data.id;
        if (this.subForm[0].work_name != null) {
          let newSubFrom = this.subForm.map(item => {
            delete item.work_name;
            delete item.create_time;
            delete item.id;
            delete item.job_report_main;
            return item;
          });
          result = await this.$axios.post('/akyl/bg/job_report_sub_save', { data: { subForm: newSubFrom, id: id } });
        }
        if (result.data.msg === '成功') {
          this.$message.success('添加成功');
          this.outerVisible = false;
          this.form.job_num = '';
          // this.form = {};
          // this.subForm = [];
          // this.time_quantum = 0;
          this.search();
        } else {
          await this.$axios.post('/akyl/bg/job_report_delete', { data: { id: id } });
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
      for (let index = 0; index < this.subForm.length; index++) {
        if (this.subForm[index].work_id === null) {
          this.$message.error('请选择工序');
          return false;
        }
        if (this.subForm[index].kind_id === null) {
          this.$message.error('请选择类型');
          return false;
        }
        if ((this.subForm[index].work_time === null) | (this.subForm[index].work_time === '')) {
          this.$message.error('请添加工时');
          return false;
        }
        if ((this.subForm[index].num === null) | (this.subForm[index].num === '')) {
          this.$message.error('请添加数量');
          return false;
        }
      }
      if (this.time_quantum != 1) {
        this.updateForm.all_time = 9.5;
      }
      if (this.time_quantum === 1) {
        this.updateForm.all_time = 8.5;
      }
      delete this.updateForm.user_name;
      // let newFrom = JSON.parse(JSON.stringify(this.updateForm));
      // if (!newFrom.job_num) {
      //   let filterList = this.staffList.filter(item => item.job_num === newFrom.job_num);
      //   if (filterList.length <= 0) {
      //     this.$message.error('没有此工号');
      //     throw new Error('job_num无对应数据');
      //   }
      //   newFrom.job_num = `${filterList[0].id}`;
      // }
      // delete newFrom.job_num;
      let result = await this.$axios.post('/akyl/bg/job_report_main_edit', { data: this.updateForm });
      if (result.data.msg === '成功') {
        if (this.subForm[0].work_name != null) {
          for (let index = 0; index < this.subForm.length; index++) {
            delete this.subForm[index].id;
            delete this.subForm[index].job_report_main;
            delete this.subForm[index].work_name;
          }
        }
        result = await this.$axios.post('/akyl/bg/job_report_sub_edit', { data: { subForm: this.subForm, id: this.updateForm.id } });
        if (result.data.msg === '成功') {
          this.$message.success('修改成功');
          this.closeAlert('update');
          this.form = {};
          this.subForm = [];
          this.time_quantum = 0;
          this.is_update = true;
          this.search();
          this.outerVisibleUpdate = false;
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
        this.search();
        this.updateForm = JSON.parse(JSON.stringify(this.list[id]));
        this.searchSubForm(this.updateForm.id);
        this.outerVisibleUpdate = true;
      } else if (type === 'delete') {
        this.$refs.deleteAlert.show();
        this.operateId = id;
      } else if (type === 'add') {
        if (this.time_quantum != 1) {
          this.form.all_time = 9.5;
        }
        if (this.time_quantum === 1) {
          this.form.all_time = 8.5;
        }
        // this.temporaryList.splice(0, this.temporaryList.length);
        this.form.dept_id = this.userInfo.dept_id;
        this.form.login_id = this.userInfo.login_id;
        if (this.subForm.length === 0) {
          this.addSubForm('open');
        } else {
          for (let i = 0; i < this.subForm.length; i++) {
            for (let index = 0; index < this.workList.length; index++) {
              if (this.workList[index].id === this.subForm[i].work_id) {
                this.$set(this.subForm[i], `work_name`, this.workList[index].code);
              }
            }
          }
        }
        this.outerVisible = true;
      }
    },
    //关闭弹框
    closeAlert(type) {
      if (type === 'update') {
        this.outerVisibleUpdate = false;
      } else if (type === 'delete') {
        this.$refs.deleteAlert.hide();
      }
      this.is_update = true;
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
        // if (this.subForm[this.subForm.length - 1]) {

        // }
        this.subFormContent = {
          is_night: '',
          work_type: 0,
          is_in: '1',
          add_time: null,
          num: null,
          work_time: null,
          kind_id: null,
          work_id: this.subForm.length - 1 >= 0 ? this.subForm[this.subForm.length - 1].work_id : null,
          work_name: this.subForm.length - 1 >= 0 ? this.subForm[this.subForm.length - 1].work_name : '',
        };
        this.subForm.push(JSON.parse(JSON.stringify(this.subFormContent)));
      } else {
        if (!this.subForm.length > 0) {
          this.subFormContent = {
            is_night: '',
            work_type: 0,
            is_in: '1',
            add_time: null,
            num: null,
            work_time: null,
            work_id: this.subForm.length - 1 >= 0 ? this.subForm[this.subForm.length - 1].work_id : null,
            work_name: this.subForm.length - 1 >= 0 ? this.subForm[this.subForm.length - 1].work_name : '',
          };
          this.subForm.push(JSON.parse(JSON.stringify(this.subFormContent)));
        }
      }
    },
    copyBgList(index) {
      this.outerVisible = true;
      this.form = JSON.parse(JSON.stringify(this.list[index]));
      this.searchSubForm(this.form.id);
      this.form.job_num = '';
      // this.time_quantum = 0;
    },
    reset() {
      this.time_quantum = 0;
      this.form = {};
      this.form.all_time = '';
      this.form.fj_time = 0;
      this.form.leave_time = 0;
      this.form.dept_id = this.userInfo.dept_id;
      this.form.login_id = this.userInfo.login_id;
      this.subForm = [];
      this.subFormContent = {
        is_night: '',
        work_type: 0,
        is_in: '1',
        add_time: null,
        num: null,
        work_time: null,
        kind_id: null,
        work_id: null,
      };
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
