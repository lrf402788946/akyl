<template lang="html">
  <div id="pdt">
    <div class="form-inline">
      <div class="base-form-title" style="width:100%;">
        <a class="base-margin-left-20">统计一</a>
        <div class="button-table"></div>
      </div>
    </div>
    <div class="base-padding-20 base-bg-fff">
      <div class="col-lg-4">
        <el-date-picker
          v-model="search_time"
          value-format="yyyy-MM"
          format="yyyy-MM"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          unlink-panels
        >
        </el-date-picker>
      </div>
      <div class="col-lg-3">
        <b-form-select v-model="dept_id" :options="deptList" class="marginBot" />
      </div>
      <div class="col-lg-3">
        <b-form-select v-model="kind_id" :options="kindList" class="marginBot" />
      </div>
      <b-button variant="primary" style="width:100px !important;height:44px !important;" @click="search()">查询</b-button>
      <table class="table table-bordered table-striped ">
        <tbody>
          <tr>
            <th>工号</th>
            <th>姓名</th>
            <th>型号</th>
            <th>工作量</th>
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
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'pdt',
  components: {},
  data() {
    return {
      list: [],
      search_time: [],
      dept_id: null,
      kind_id: null,
      deptList: [],
      kindList: [],
    };
  },
  computed: {},
  created() {
    this.getOtherList();
  },
  methods: {
    async getOtherList() {
      //请求部门表
      let result = await this.$axios.get('/akyl/dept/dept_list?skip=0&limit=100');
      this.deptList = result.data.deptList.map(item => {
        let newObject = { text: item.dept_name, value: item.id };
        return newObject;
      });
      let defalut = { text: '请选择部门', value: null, disabled: true };
      this.deptList.unshift(defalut);
      //请求类型表
      result = await this.$axios.get('/akyl/kind/kind_list?skip=0&limit=100');
      this.kindList = result.data.kindList.map(item => {
        let newObject = { text: item.name, value: item.id };
        return newObject;
      });
      defalut = { text: '请选择型号', value: null, disabled: true };
      this.kindList.unshift(defalut);
    },
    async search() {
      if (this.dept_id === null) this.dept_id = '';
      if (this.kind_id === null) this.kind_id = '';
      if (!this.search_time.length > 0) {
        this.$message.error('请选择时间范围');
        return false;
      }
      let result = this.$axios.get(
        `/akyl/count/count_per?dept_id=${this.dept_id}&start_time=${this.search_time[0]}&end_time=${this.search_time[1]}&kind_id=${this.kind_id}`
      );
      console.log(result);
    },
  },
};
</script>

<style lang="css" scoped>
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
</style>

<style scoped>
@import '../../assets/style/Font-Awesome-master/css/font-awesome.css';
@import '../../assets/style/layout/base-Layout-bootstrap.css';
@import '../../assets/style/base-style-bootstrap.css';
</style>
