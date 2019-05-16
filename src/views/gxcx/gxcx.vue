<template lang="html">
  <div id="gxcx">
    <!-- 表格 begin -->
    <div class="base-form">
      <div class="form-inline">
        <div class="base-form-title" style="width:100%;">
          <a class="base-margin-left-20">工资查询</a>
          <div class="button-table"></div>
        </div>
      </div>
      <div class="base-padding-20 base-bg-fff">
        <div class="row">
          <div class="col-lg-4 mb25">
            <el-date-picker
              style="width: 100%;"
              v-model="create_time"
              value-format="yyyy-MM-dd"
              format="yyyy-MM-dd"
              type="date"
              placeholder="选择日期"
            ></el-date-picker>
          </div>
          <div class="col-lg-3 mb25">
            <el-select class="marginBot" style="height:40px !important" v-model="dept_id" filterable placeholder="请选择部门">
              <el-option v-for="item in deptList" :key="item.value" :label="item.text" :value="item.value"> </el-option>
            </el-select>
          </div>
          <br />
          <div class="col-lg-3 mb25">
            <b-form-input
              style="height:40px !important"
              v-model="job_num"
              placeholder="工号"
              onkeypress="return (/[0-9a-zA-Z]/.test(String.fromCharCode(event.keyCode)))"
            ></b-form-input>
          </div>
          <div class="col-lg-3 mb25">
            <b-form-input
              style="height:40px !important"
              v-model="name"
              placeholder="姓名"
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
          <table class="table table-bordered table-striped ">
            <tbody v-if="list != []">
              <tr>
                <th width="6%">姓名</th>
                <th width="6%">工号</th>
                <th width="6%">计时工资</th>
                <th width="6%">计件工资</th>
                <th width="6%">加班工资</th>
                <th width="6%">加班补助工资</th>
                <th width="6%">满勤奖</th>
                <th width="6%">通勤补助</th>
                <th width="6%">夜班工资补助</th>
                <th width="6%">保险工资</th>
                <th width="6%">工龄补助</th>
                <th width="6%">工资总和</th>
                <th width="6%">扣除工资</th>
                <th width="6%">操作</th>
              </tr>
              <tr v-for="(item, index) in list" :key="index">
                <td>{{ item.user_name }}</td>
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
                <td>{{ item.gz_count }}</td>
                <td>{{ item.kc ? item.kc : 0 }}</td>
                <td>
                  <b-button variant="primary" style="color:white; margin-right:5px;" @click="openAlert(item)">详&nbsp;&nbsp;情</b-button>
                </td>
              </tr>
            </tbody>
            <tbody v-else>
              <tr>
                <td style="text-align:center;">没有查询到数据</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <!--查看弹框-->
      <b-modal id="updateAlert" title="工薪单" ref="updateAlert" size="xl" hide-footer no-close-on-esc no-close-on-backdrop hide-header-close>
        <div class="d-block text-center">
          <div class="row">
            <div class="col-lg-4 marginBot4">
              <p class="marginBot4">姓名</p>
              <b-form-input
                v-model="staff.user_name"
                :readonly="true"
                onkeypress="return (/[0-9a-zA-Z]/.test(String.fromCharCode(event.keyCode)))"
              ></b-form-input>
            </div>
            <div class="col-lg-4 marginBot4">
              <p class="marginBot4">工号</p>
              <b-form-input v-model="staff.job_num" :readonly="true" onkeypress="return (/[0-9a-zA-Z]/.test(String.fromCharCode(event.keyCode)))">
              </b-form-input>
            </div>
            <div class="col-lg-4 marginBot4">
              <p class="marginBot4">性别</p>
              <b-form-input
                :value="staff.gender === 0 ? '女' : '男'"
                :readonly="true"
                onkeypress="return (/[0-9a-zA-Z]/.test(String.fromCharCode(event.keyCode)))"
              ></b-form-input>
            </div>
            <div class="col-lg-4 marginBot4">
              <p class="marginBot4">个人电话</p>
              <b-form-input
                v-model="staff.phone_no"
                maxlength="11"
                :readonly="true"
                onkeypress="return (/[0-9]/.test(String.fromCharCode(event.keyCode)))"
              ></b-form-input>
            </div>
            <div class="col-lg-4 marginBot4">
              <p class="marginBot4">身份证号</p>
              <b-form-input
                v-model="staff.id_number"
                maxlength="18"
                :readonly="true"
                onkeypress="return (/[0-9a-zA-Z]/.test(String.fromCharCode(event.keyCode)))"
              ></b-form-input>
            </div>
            <div class="col-lg-4 marginBot4">
              <p class="marginBot4">部门</p>
              <b-form-select v-model="staff.dept_id" :disabled="true" :options="deptList" />
            </div>
            <div class="col-lg-4 marginBot4">
              <p class="marginBot4">职务</p>
              <b-form-input v-model="staff.level" :readonly="true" onkeypress="return (/[0-9a-zA-Z]/.test(String.fromCharCode(event.keyCode)))"></b-form-input>
            </div>
            <div class="col-lg-4 marginBot4">
              <p class="marginBot4">岗位</p>
              <b-form-select v-model="staff.post_id" :options="postList" :disabled="true"></b-form-select>
            </div>
            <div class="col-lg-4 marginBot4">
              <p class="marginBot4">工作状态</p>
              <b-form-input
                :value="staff.status === 0 ? '在职' : staff.status === 1 ? '离职' : '退休'"
                :readonly="true"
                onkeypress="return (/[0-9a-zA-Z]/.test(String.fromCharCode(event.keyCode)))"
              ></b-form-input>
            </div>
            <div class="col-lg-4 marginBot4">
              <p class="marginBot4">是否通勤</p>
              <b-form-input
                :value="staff.tq === 0 ? '通勤' : '不通勤'"
                :readonly="true"
                onkeypress="return (/[0-9a-zA-Z]/.test(String.fromCharCode(event.keyCode)))"
              ></b-form-input>
            </div>
            <div class="col-lg-4 marginBot4">
              <p class="marginBot4">入职时间</p>
              <b-form-input
                v-model="staff.in_time"
                :readonly="true"
                onkeypress="return (/[0-9a-zA-Z]/.test(String.fromCharCode(event.keyCode)))"
              ></b-form-input>
            </div>
            <div class="col-lg-4 marginBot4">
              <p class="marginBot4">出生日期</p>
              <b-form-input
                v-model="staff.birthday"
                :readonly="true"
                onkeypress="return (/[0-9a-zA-Z]/.test(String.fromCharCode(event.keyCode)))"
              ></b-form-input>
            </div>
            <div class="col-lg-12 marginBot">
              <p class="marginBot4">备注</p>
              <textarea v-model="staff.remark" class="form-control" style="height: 100px !important;" rows="4" :disabled="true"></textarea>
            </div>
            <table class="table table-bordered table-striped ">
              <tbody>
                <tr>
                  <td>工序</td>
                  <td>类型</td>
                  <td>工作时段</td>
                  <td>计数方式</td>
                  <td>工时(小时)</td>
                  <td>数量</td>
                  <td>加班</td>
                  <td>金额</td>
                  <td>备注</td>
                </tr>
                <tr v-for="(item, index) in subList" :key="index">
                  <td>
                    {{ item.work_code }}
                  </td>
                  <td>
                    {{ item.kind_code }}
                  </td>
                  <td>
                    {{ item.is_night === 0 ? '白班' : '夜班' }}
                  </td>
                  <td>
                    {{ item.work_type === 0 ? '计时' : '计件' }}
                  </td>
                  <td>
                    {{ item.work_time }}
                  </td>
                  <td>
                    {{ item.num }}
                  </td>
                  <td>
                    {{ item.add_time }}
                  </td>
                  <td>
                    {{ item.price }}
                  </td>
                  <td>
                    {{ item.remark }}
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
          style="font-size:16px !important; width:30% !important; margin-top:25px; margin-bottom:30px !important; margin-left: 720px !important; padding:6px 80px !important;"
          >返&nbsp;&nbsp;回</b-button
        >
      </b-modal>
    </div>
  </div>
</template>

<script>
import Validator from 'async-validator';
import { mapState } from 'vuex';
export default {
  name: 'gxcx',
  metaInfo: {
    title: '工资查询',
  },
  components: {},
  data() {
    return {
      list: [],
      subList: [],
      staff: {},
      currentPage: 1,
      limit: 15,
      totalRow: 0,
      dept_id: '',
      job_num: '',
      create_time: '',
      deptList: [],
      postList: [],
      name: '',
    };
  },
  computed: {
    ...mapState({
      userInfo: state => state.userInfo,
    }),
  },
  created() {
    this.getOtherList();
  },
  methods: {
    //分页
    toSearch(currentPage) {
      this.currentPage = currentPage;
      this.search();
    },
    //查询
    async search() {
      if (this.create_time === '' || this.create_time === null || this.create_time === undefined) {
        this.$message.error('请选择查询日期');
        return;
      }
      let skip = (this.currentPage - 1) * this.limit;
      let result = await this.$axios.get(
        `/akyl/wages/wages_curdate?skip=${skip}&limit=${this.limit}&dept_id=${this.dept_id}&job_num=${this.job_num}&create_time=${this.create_time}&user_name=${
          this.name
        }`
      );
      if (result.data.rescode === 1) {
        let array = [];
        this.$set(this, 'list', array);
      } else {
        this.$set(this, 'list', result.data.wagesList);
      }
    },
    //请求各表
    async getOtherList() {
      //请求部门表
      let result = await this.$axios.get('/akyl/dept/dept_list?skip=0&limit=100');
      if (result.data.rescode === '0') {
        if (result.data.totalRow > 0) {
          this.deptList = result.data.deptList.map(item => {
            let newObject = { text: item.dept_name, value: item.id };
            return newObject;
          });
          let defalut = { text: '所有部门', value: '', checked: true };
          this.deptList.unshift(defalut);
        }
      }
      result = await this.$axios.get(`/akyl/post/post_list?skip=0&limit=100`);
      if (result.data.rescode === '0') {
        this.postList = result.data.postList.map(item => {
          let newObject = { text: item.name, value: item.id };
          return newObject;
        });
      }
    },
    //查询子表
    async searchSubForm(item) {
      this.subList = [];
      let result = await this.$axios.get(`/akyl/wages/wages_curdate_detail?job_num=${item.job_num}&create_time=${item.gz_month}`);
      if (result.data.rescode === '0') {
        this.$set(this, 'subList', result.data.jobReportSubList);
        this.$set(this, 'staff', result.data.staff);
      } else {
        this.$set(this, 'staff', result.data.staff);
      }
    },
    //打开与关闭修改和删除的弹框
    async openAlert(item) {
      this.$refs.updateAlert.show();
      this.searchSubForm(item);
    },
    //关闭弹框
    closeAlert() {
      this.$refs.updateAlert.hide();
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
