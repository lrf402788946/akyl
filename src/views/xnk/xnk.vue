<template lang="html">
  <div id="material">
    <div class="form-inline">
        <div class="base-form-title" style="width:100%;">
          <a class="base-margin-left-20">虚拟库管理</a>
          <div class="button-table"></div>
        </div>
      </div>
    <div class="base-padding-20 base-bg-fff">
      <div class="base-align-right" style="margin-bottom: 20px;">
        <div class="col-lg-3 mb25">
          <b-form-input v-model="select_code" placeholder="工序查询" class="marginBot8"></b-form-input>
        </div>
        <div class="col-lg-3 mb25">
          <b-form-input v-model="select_kind_code" placeholder="型号查询" class="marginBot8"></b-form-input>
        </div>
        <div class="col-lg-1 mb25" style="text-align:left;">
          <b-button
            variant="primary"
            style="font-size:14px !important; color:#fff !important; width: 100% !important;  padding: 6px 0 !important; margin-right:0 !important;"
            @click="searchButton()"
            >查&nbsp;&nbsp;询</b-button
          >
        </div>
      </div>
      <table class="table table-bordered table-striped ">
        <tbody v-if="list.length > 0">
          <tr>
            <th>工序</th>
            <!-- <th>工序ID</th> -->
            <th>型号</th>
            <!-- <th>型号ID</th> -->
            <th>数量</th>
            <th>批号</th>
            
            <th>原材料批号</th>
          </tr>
          <tr v-for="(item, index) in list" :key="index">
            <td>{{ item.code }}</td>
            <!-- <td>{{ item.work_id }}</td> -->
            <td>{{ item.kind_code }}</td>
            <!-- <td>{{ item.kind_id }}</td> -->
            <td>{{ item.num }}</td>
            <td>{{ item.order_no }}</td>
            <td>{{ item.ycl_no }}</td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr>
            <td style="text-align:center;">没有数据</td>
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
</template>
<script>
import Validator from 'async-validator';
import exportExcel from '@/components/exportExcel.vue';

export default {
  name: 'xnk',
  metaInfo: {
    title: '虚拟库管理',
  },
  components: {
    exportExcel,
  },
  data() {
    return {
      list: [],
      operateId: '',
      form: {},
      currentPage: 1,
      limit: 15,
      totalRow: 0,
      select_code:'',
      select_kind_code:'',
      is_title_search:false, //是否是模糊查询： true：是模糊查询； false： 不是模糊查询
      skip:0,
    };
  },
  computed: {},
  created() {
    this.search();
  },
  watch:{
    is_title_search: {
      handler(nV, oV) {
        this.$set(this, 'currentPage', 1);
        if (nV) {
          this.titlesearch();
        } else {
          this.search();
        }
      }
    },
  },
  methods: {
    //分页
    toSearch(currentPage) {
      this.currentPage = currentPage;
      if (this.is_title_search) {
        this.titlesearch();
      }else{
        this.search();
      }
    },
    //查询
    async search() {
      if (this.is_title_search) {
        this.is_title_search = false;
        return;
      }
      if(this.select_code===null)select_code='';
      if(this.select_kind_code===null)select_kind_code='';
      let skip = (this.currentPage - 1) * this.limit;
      let result = await this.$axios.get(`/akyl/count/count_xnk?skip=${skip}&limit=${this.limit}&code=${this.select_code}&kind_code=${this.select_kind_code}`);
      if (result.data.msg === '成功') {
        this.$set(this, 'list', result.data.kindStoreList);
        this.$set(this, 'totalRow', result.data.totalRow);
      }
      if (result.data.msg === '没有数据') {
        this.list = '';
        this.totalRow = 0;
      }
    },
    async titlesearch() {
      if (this.is_title_search) {
        this.is_title_search = true;
        return;
      }
      if(this.select_code===null)select_code='';
      if(this.select_kind_code===null)select_kind_code='';
      let skip = (this.currentPage - 1) * this.limit;
      let result = await this.$axios.get(`/akyl/count/count_xnk?skip=${skip}&limit=${this.limit}&code=${this.select_code}&kind_code=${this.select_kind_code}`);
      if (result.data.msg === '成功') {
        this.$set(this, 'list', result.data.kindStoreList);
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
      if(this.select_code===null)select_code='';
      if(this.select_kind_code===null)select_kind_code='';
      let skip = 0;
      let result = await this.$axios.get(`/akyl/count/count_xnk?skip=${skip}&limit=${this.limit}&code=${this.select_code}&kind_code=${this.select_kind_code}`);
      if (result.data.msg === '成功') {
        this.$set(this, 'list', result.data.kindStoreList);
        this.$set(this, 'totalRow', result.data.totalRow);
      }
      if (result.data.msg === '没有数据') {
        this.list = '';
        this.totalRow = 0;
      }
    },
    //统合弹框的开启与关闭,update是index,delete是id
    async operatAlert(idOrIndex) {
    if (this.$refs.updateAlert.is_show) {
        //关上弹框
        this.$refs.updateAlert.hide();
        this.form = {};
    } else {
        //打开弹框
        this.$refs.updateAlert.show();
        this.form = JSON.parse(JSON.stringify(this.list[idOrIndex]));
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
.col-lg-1{
  float: left;
}
</style>

<style scoped>
@import '../../assets/style/Font-Awesome-master/css/font-awesome.css';
@import '../../assets/style/layout/base-Layout-bootstrap.css';
@import '../../assets/style/base-style-bootstrap.css';
</style>
