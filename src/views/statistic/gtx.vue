<template lang="html">
  <div id="gtx">
    <div class="form-inline">
      <div class="base-form-title" style="width:100%;">
        <a class="base-margin-left-20">统计二</a>
        <div class="button-table"></div>
      </div>
    </div>
    <div class="base-padding-20 base-bg-fff">
      <div class="row">
      <div class="col-lg-4 mb25">
        <el-date-picker
          style="width: 100%;"
          v-model="form1"
          value-format="yyyy-MM-dd"
          format="yyyy-MM-dd"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          unlink-panels
        >
        </el-date-picker>
      </div>
      <div class="col-lg-3 mb25">
        <b-form-select style="height:40px !important" v-model="work_id" :options="workList" class="marginBot" @change="getKindList()" />
      </div>
      <div class="col-lg-3 mb25">
        <b-form-select style="height:40px !important" v-model="kind_id" :options="kindList" class="marginBot" />
      </div>
      <div class="col-lg-2 mb25">
        <b-button variant="primary" style="font-size:14px !important; color:#fff !important; width: 60% !important; margin-top:3px;  padding: 6px 0 !important; margin-right:0 !important;" @click="search()">查&nbsp;&nbsp;询</b-button>
      </div>
      </div>

      <table class="table table-bordered table-striped ">
        <tbody>
          <tr>
            <th>型号</th>
            <th>数量</th>
          </tr>
          <tr v-for="(item, index) in list" :key="index">
            <td>{{ item.name }}</td>
            <td>{{ item.nums }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
export default {
  name: 'gtx',
  metaInfo: {
    title: '每工序每天每型号数量',
  },
  components: {},
  data() {
    return {
      list: [],
      form1: new Array(),
      workList: [],
      kindList: [],
      work_id: null,
      kind_id: '',
    };
  },
  computed: {},
  created() {
    this.getWorkList();
  },
  methods: {
    async getWorkList() {
      let result = await this.$axios.get('/akyl/work/work_list?skip=0&limit=100');
      this.workList = result.data.workList.map(item => {
        let newObject = { text: item.name, value: item.id };
        return newObject;
      });
      let defalut = { text: '请选择工序', value: null, disabled: true };
      this.workList.unshift(defalut);
    },
    async getKindList() {
      this.kindList = [];
      let result = await this.$axios.get(`/akyl/kind/kind_list?skip=0&limit=1000&work_id=${this.work_id}`);
      this.kindList = result.data.kindList.map(item => {
        let newObject = { text: item.name, value: item.id };
        return newObject;
      });
      let defalut = { text: '请选择型号', value: null, disabled: true };
      this.kindList.unshift(defalut);
    },
    async search() {
      if (this.work_id == null) {
        this.$message.error('请选择工序');
        return false;
      }
      if (!this.form1.length > 0) {
        this.$message.error('请选择时间范围');
        return false;
      }
      let result = await this.$axios.get(
        `/akyl/count/count_work?work_id=${this.work_id}&kind_id=${this.kind_id}&start_time=${this.form1[0]}&end_time=${this.form1[1]}`
      );
      if (result.data.msg === '成功') {
        this.$set(this, 'list', result.data.dataList);
      }
      if (result.data.msg === '没有数据') {
        this.list = '';
      }
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
.mb25 {
  margin-bottom: 10px;
}
.btn-primary:hover {
  background-color: #17a2b8 !important;
}
</style>

<style scoped>
@import '../../assets/style/Font-Awesome-master/css/font-awesome.css';
@import '../../assets/style/layout/base-Layout-bootstrap.css';
@import '../../assets/style/base-style-bootstrap.css';
</style>
