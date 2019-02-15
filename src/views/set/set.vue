<template lang="html">
  <div id="index">
    <!-- 表格 begin -->
    <div class="base-form">
      <div class="form-inline">
        <div class="base-form-title" style="width:100%;">
          <a class="base-margin-left-20">基础设置列表</a>
          <div class="button-table"></div>
        </div>
      </div>
      <div class="base-padding-20 base-bg-fff">
        <form id="updateForm" name="updateForm">
          <div class="row">
            <div class="col-lg-12">
                <div class="col-lg-6">
                  <div class="li38">计时定额(元):</div>
                  <input
                    type="number"
                    class="col-lg-11 form-control"
                    v-bind:disabled="isReadOnly"
                    v-model="list.js_price"
                    onkeypress="return (/[0-9a-zA-Z]/.test(String.fromCharCode(event.keyCode)))"
                  />
                </div>
                <div class="col-lg-6">
                  <div class="li38">计件定额(元):</div>
                  <input
                    type="number"
                    class="col-lg-11 form-control"
                    v-bind:disabled="isReadOnly"
                    v-model="list.jj_price"
                    onkeypress="return (/[0-9a-zA-Z]/.test(String.fromCharCode(event.keyCode)))"
                  />
                </div>
              </div>
              <div class="col-lg-12">
                <div class="col-lg-6">
                  <div class="li38">工作时长(小时):</div>
                  <input
                    type="number"
                    class="col-lg-11 form-control"
                    v-bind:disabled="isReadOnly"
                    v-model="list.gz_sc"
                    onkeypress="return (/[0-9a-zA-Z]/.test(String.fromCharCode(event.keyCode)))"
                  />
                </div>
                <div class="col-lg-6">
                  <div class="li38">夜班补助(元):</div>
                  <input
                    type="number"
                    class="col-lg-11 form-control"
                    v-bind:disabled="isReadOnly"
                    v-model="list.yb_price"
                    onkeypress="return (/[0-9a-zA-Z]/.test(String.fromCharCode(event.keyCode)))"
                  />
                </div>
              </div>
              <div class="col-lg-12">
                <div class="col-lg-6">
                  <div class="li38">满勤奖金(元):</div>
                  <input
                    type="number"
                    class="col-lg-11 form-control"
                    v-bind:disabled="isReadOnly"
                    v-model="list.mq_price"
                    onkeypress="return (/[0-9a-zA-Z]/.test(String.fromCharCode(event.keyCode)))"
                  />
                </div>
                <div class="col-lg-6">
                  <div class="li38">通勤补助(元):</div>
                  <input
                    type="number"
                    class="col-lg-11 form-control"
                    v-bind:disabled="isReadOnly"
                    v-model="list.tq_price"
                    onkeypress="return (/[0-9a-zA-Z]/.test(String.fromCharCode(event.keyCode)))"
                  />
                </div>
              </div>
              <div class="col-lg-12">
                <div class="col-lg-6">
                  <div class="li38">加班计时定额(元):</div>
                  <input
                    type="number"
                    class="col-lg-11 form-control"
                    v-bind:disabled="isReadOnly"
                    v-model="list.jb_js_price"
                    onkeypress="return (/[0-9a-zA-Z]/.test(String.fromCharCode(event.keyCode)))"
                  />
                </div>
                <div class="col-lg-6">
                  <div class="li38">加班计件定额(元):</div>
                  <input
                    type="number"
                    class="col-lg-11 form-control"
                    v-bind:disabled="isReadOnly"
                    v-model="list.jb_jj_price"
                    onkeypress="return (/[0-9a-zA-Z]/.test(String.fromCharCode(event.keyCode)))"
                  />
                </div>
              </div>
              <div class="col-lg-12">
                <div class="col-lg-6">
                  <div class="li38">加班补助定额(元):</div>
                  <input
                    type="number"
                    class="col-lg-11 form-control"
                    v-bind:disabled="isReadOnly"
                    v-model="list.jb_price"
                    onkeypress="return (/[0-9a-zA-Z]/.test(String.fromCharCode(event.keyCode)))"
                  />
                </div>
                <div class="col-lg-6">
                  <div class="li38">三月保险每天补贴(元):</div>
                  <input
                    type="number"
                    class="col-lg-11 form-control"
                    v-bind:disabled="isReadOnly"
                    v-model="list.bx_price_sy"
                    onkeypress="return (/[0-9a-zA-Z]/.test(String.fromCharCode(event.keyCode)))"
                  />
                </div>
              </div>
              <div class="col-lg-12">
                <div class="col-lg-6">
                  <div class="li38">一年保险每天补贴(元):</div>
                  <input
                    type="number"
                    class="col-lg-11 form-control"
                    v-bind:disabled="isReadOnly"
                    v-model="list.bx_price_yn"
                    onkeypress="return (/[0-9a-zA-Z]/.test(String.fromCharCode(event.keyCode)))"
                  />
                </div>
                <div class="col-lg-6">
                  <div class="li38">两年以上保险每天补贴(元):</div>
                  <input
                    type="number"
                    class="col-lg-11 form-control"
                    v-bind:disabled="isReadOnly"
                    v-model="list.bx_price_ln"
                    onkeypress="return (/[0-9a-zA-Z]/.test(String.fromCharCode(event.keyCode)))"
                  />
                </div>
              </div>
              <div class="col-lg-12">
                <div class="col-lg-6">
                  <div class="li38">工龄工资按月累加(元):</div>
                  <input
                    type="number"
                    class="col-lg-11 form-control"
                    v-bind:disabled="isReadOnly"
                    v-model="list.gl_price"
                    onkeypress="return (/[0-9a-zA-Z]/.test(String.fromCharCode(event.keyCode)))"
                  />
                </div>
              </div>
              <div class="col-lg-12" style="margin-top:20px;">
                <div class="col-lg-6"></div>
                <div class="col-lg-6">
                  <div v-if="isReadOnly" style="text-align:right;">
                    <b-button class="btn-info" style=" color:#fff !important; font-size: 14px !important; padding:6px 12px !important;"  @click="change()" ><i class="base-margin-right-5 fa fa-hand-o-left "></i>修&nbsp;&nbsp;改</b-button>
                  </div>
                  <div v-if="!isReadOnly" style="text-align:right;">
                    <b-button class="btn-info" style=" color:#fff !important; font-size: 14px !important; padding:6px 12px !important;"  @click="tijiao()" ><i class="base-margin-right-5 fa fa-hand-o-right "></i>提&nbsp;&nbsp;交</b-button>
                    <b-button class="btn-info" style=" color:#fff !important; font-size: 14px !important; padding:6px 12px !important;"  @click="fanhui()" ><i class="base-margin-right-5 fa fa-hand-o-left "></i>返&nbsp;&nbsp;回</b-button>
                  </div>
                </div>
              </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
import Validator from 'async-validator';
export default {
  name: 'set',
  metaInfo: {
    title: '基础设置管理',
  },
  components: {},
  data() {
    return {
      list: [],
      form: {},
      deleteItem: '',
      isReadOnly: true,
      updateForm: {
        gender: -1,
      },
      roleValidator: new Validator({
        js_price: { type: 'string', required: true, message: '请填写计时金额' },
        jj_price: { type: 'string', required: true, message: '请填写计件金额' },
        jb_js_price: { type: 'string', required: true, message: '请填写加班计时金额' },
        jb_jj_price: { type: 'string', required: true, message: '请填写加班计价金额' },
        jb_price: { type: 'string', required: true, message: '请填写加班补助金额' },
        mq_price: { type: 'string', required: true, message: '请填写满勤奖' },
        tq_price: { type: 'string', required: true, message: '请填写通勤补助' },
        yb_price: { type: 'string', required: true, message: '请填写夜班补助' },
        gz_sc: { type: 'string', required: true, message: '请填写工作时长' },
        bx_price_sy: { type: 'string', required: true, message: '请填写三月保险每天补贴' },
        bx_price_yn: { type: 'string', required: true, message: '请填写一年保险每天补贴' },
        bx_price_ln: { type: 'string', required: true, message: '请填写两年以上保险每天补贴' },
        gl_price: { type: 'string', required: true, message: '请填写工龄工资按月累加' },
      }),
    };
  },
  computed: {},
  created() {
    this.search();
  },

  methods: {
    //整体逻辑:已有数据的修改直接=>提交=>请求=>刷新视图;添加数据则弹出框添加
    //查询
    async search() {
      //查询方法
      let result = await this.$axios.get('/akyl/set/set_detail');
      this.$set(this, 'list', result.data.setInfo);
    },
    async toUpdate() {
      let result = await this.$axios.post('/akyl/set/set_edit', { data: this.list });
      this.closeAlert('update');
      this.updateForm = this.list;
      this.search();
    },
    //改变文本框只读状态
    change(){
      this.isReadOnly = false;
    },
    tijiao(){
      this.isReadOnly = true;
      this.toUpdate();
    },
    fanhui(){
      this.isReadOnly = true;
      this.search();
    },
    //验证
    toValidate(type){
      this.roleValidator.validate(this.list, (errors, fields) => {
        if (errors) {
          return this.handleErrors(errors, fields);
        }
        return this.tijiao();
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
.col-lg-6,.col-lg-4,.col-lg-8,.col-lg-3,.col-lg-7,.col-lg-5 {
  float: left;
}
.col-lg-6 {
  margin-bottom: 10px;
}
.li38 {
  height: 38px;
  line-height: 38px;
  font-weight: bold;
  margin-bottom: 2px;
}
</style>
<style scoped>
@import '../../assets/style/Font-Awesome-master/css/font-awesome.css';
@import '../../assets/style/layout/base-Layout-bootstrap.css';
@import '../../assets/style/base-style-bootstrap.css';
</style>
