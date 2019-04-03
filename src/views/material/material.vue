<template lang="html">
  <div id="material">
    <div class="form-inline">
      <div class="base-form-title" style="width:100%;">
        <a class="base-margin-left-20">材料管理</a>
        <div class="button-table"></div>
      </div>
    </div>
    <div class="base-padding-20 base-bg-fff">
      <div class="base-align-right" style="margin-bottom: 20px;">
        <div class="col-lg-3 mb25">
          <b-form-input v-model="name" placeholder="请输入材料名称查询" class="marginBot8"></b-form-input>
        </div>
        <div class="col-lg-1 mb25" style="text-align:left;">
          <b-button
            variant="primary"
            style="font-size:14px !important; color:#fff !important; width: 100% !important;  padding: 6px 0 !important; margin-right:0 !important;"
            @click="searchButton()"
            >查&nbsp;&nbsp;询</b-button
          >
        </div>
        <exportExcel :exportTitle="th" :db_nameList="filterVal" dataName="list" fileName="材料表"></exportExcel>

        <a
          class="btn btn-info base-margin-bottom"
          style="font-size:14px !important; color:#fff !important; padding: 6px 12px !important;"
          data-toggle="tooltip"
          title=""
          role="button"
          @click="operatAlert('add', null)"
        >
          <i class="base-margin-right-5 fa fa-plus-square"></i>新建材料
        </a>
      </div>
      <table class="table table-bordered table-striped ">
        <tbody v-if="list.length > 0">
          <tr>
            <th>材料</th>
            <th>配重</th>
            <th>创建日期</th>
            <th>操作</th>
          </tr>
          <tr v-for="(item, index) in list" :key="index">
            <td>{{ item.name }}</td>
            <td>{{ item.pz }}</td>
            <td>{{ item.create_date }}</td>
            <td>
              <b-button variant="primary" style="color:white; margin-right:5px;" @click="operatAlert('update', index)">详&nbsp;&nbsp;情</b-button>
              <b-button variant="danger" style="color:white;" @click="operatAlert('delete', item.id)">删&nbsp;&nbsp;除</b-button>
            </td>
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

      <b-modal id="addAlert" title="添加材料" ref="addAlert" hide-footer>
        <!--需要计算,如果是父类,正常显示,不是的话就缩进-->
        <p class="marginBot5">材料名称</p>
        <b-form-input v-model="form.name" class="marginBot8"></b-form-input>
        <p class="marginBot5">配重</p>
        <b-form-input v-model="form.pz" class="marginBot20"></b-form-input>
        <p class="marginBot5">创建日期</p>
        <el-date-picker
          style="width:100%;"
          v-model="form.create_date"
          type="date"
          placeholder="选择日期"
          value-format="yyyy-MM-dd"
          format="yyyy-MM-dd"
        ></el-date-picker>
        <b-button
          variant="secondary"
          class="resetButton"
          @click="form = {}"
          style="font-size:16px !important; margin-top:25px; padding:6px 80px !important;margin-bottom:30px !important;margin-right:0 !important;"
        >
          重&nbsp;&nbsp;置
        </b-button>
        <b-button
          variant="primary"
          class="resetButton"
          @click="toValidate('add')"
          style="font-size:16px !important; margin-top:25px; float:right; padding:6px 80px !important;margin-bottom:30px !important;margin-right:0 !important;"
        >
          保&nbsp;&nbsp;存
        </b-button>
      </b-modal>

      <b-modal id="updateAlert" title="修改材料" ref="updateAlert" hide-footer no-close-on-esc no-close-on-backdrop hide-header-close>
        <p class="marginBot5">材料名称</p>
        <b-form-input v-model="form.name" class="marginBot8"></b-form-input>
        <p class="marginBot5">配重</p>
        <b-form-input v-model="form.pz" class="marginBot20"></b-form-input>
        <p class="marginBot5">创建日期</p>
        <el-date-picker
          style="width:100%;"
          v-model="form.create_date"
          type="date"
          placeholder="选择日期"
          value-format="yyyy-MM-dd"
          format="yyyy-MM-dd"
        ></el-date-picker>
        <b-button
          variant="secondary"
          class="resetButton"
          @click="operatAlert('update', null)"
          style="font-size:16px !important; margin-top:25px; padding:6px 80px !important;margin-bottom:30px !important;margin-right:0 !important;"
        >
          返&nbsp;&nbsp;回
        </b-button>
        <b-button
          variant="primary"
          class="resetButton"
          @click="toValidate('update')"
          style="font-size:16px !important; margin-top:25px; float:right; padding:6px 80px !important;margin-bottom:30px !important;margin-right:0 !important;"
        >
          修&nbsp;&nbsp;改
        </b-button>
      </b-modal>

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
  </div>
</template>
<script>
import Validator from 'async-validator';
import exportExcel from '@/components/exportExcel.vue';

export default {
  name: 'material',
  metaInfo: {
    title: '材料管理',
  },
  components: {
    exportExcel,
  },
  data() {
    return {
      list: [],
      name: '',
      operateId: '',
      form: {},
      currentPage: 1,
      limit: 15,
      totalRow: 0,
      mainValidator: new Validator({
        name: [{ required: true, message: '请填写材料名称' }],
        pz: [{ required: true, message: '请填写配重' }],
        create_date: [{ required: true, message: '请选择创建日期' }],
      }),
      th: ['材料', '配重', '创建日期'],
      filterVal: ['name', 'pz', 'create_date'],
      is_title_search: false, //是否是模糊查询： true：是模糊查询； false： 不是模糊查询
      skip: 0,
    };
  },
  computed: {},
  created() {
    this.search();
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
      let skip = (this.currentPage - 1) * this.limit;
      let result = await this.$axios.get(`/akyl/cl/cl_list?name=${this.name}&skip=${skip}&limit=${this.limit}`);
      if (result.data.msg === '成功') {
        this.$set(this, 'list', result.data.cList);
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
      let skip = (this.currentPage - 1) * this.limit;
      let result = await this.$axios.get(`/akyl/cl/cl_list?name=${this.name}&skip=${skip}&limit=${this.limit}`);
      if (result.data.msg === '成功') {
        this.$set(this, 'list', result.data.cList);
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
      let skip = 0;
      let result = await this.$axios.get(`/akyl/cl/cl_list?name=${this.name}&skip=${skip}&limit=${this.limit}`);
      if (result.data.msg === '成功') {
        this.$set(this, 'list', result.data.cList);
        this.$set(this, 'totalRow', result.data.totalRow);
      }
      if (result.data.msg === '没有数据') {
        this.list = '';
        this.totalRow = 0;
      }
    },
    //验证
    toValidate(type) {
      this.mainValidator.validate(this.form, (errors, fields) => {
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
      let result = await this.$axios.post('/akyl/cl/cl_save', { data: this.form });
      if (result.data.rescode === '0') {
        this.$message.success('添加成功');
        this.operatAlert('add', null);
        this.search();
      } else {
        this.$message.error('添加失败');
      }
    },
    //修改
    async update() {
      let result = await this.$axios.post('/akyl/cl/cl_edit', { data: this.form });
      if (result.data.rescode === '0') {
        this.$message.success('修改成功');
        this.operatAlert('update', null);
        this.search();
      } else {
        this.$message.error('修改失败');
      }
    },
    //删除
    async toDelete() {
      let result = await this.$axios.post('/akyl/cl/cl_delete', { data: { id: this.operateId } });
      if (result.data.rescode === '0') {
        this.$message.success('删除成功');
        this.operatAlert('delete', null);
        this.search();
      } else {
        this.$message.error('删除失败');
      }
    },
    //统合弹框的开启与关闭,update是index,delete是id
    async operatAlert(type, idOrIndex) {
      if (type === 'update') {
        if (this.$refs.updateAlert.is_show) {
          //关上弹框
          this.$refs.updateAlert.hide();
          this.form = {};
        } else {
          //打开弹框
          this.$refs.updateAlert.show();
          this.form = JSON.parse(JSON.stringify(this.list[idOrIndex]));
        }
      } else if (type === 'delete') {
        if (this.$refs.deleteAlert.is_show) {
          this.$refs.deleteAlert.hide();
          this.operateId = '';
        } else {
          this.$refs.deleteAlert.show();
          this.operateId = idOrIndex;
        }
      } else if (type === 'add') {
        if (this.$refs.addAlert.is_show) {
          this.$refs.addAlert.hide();
          this.form = {};
        } else {
          this.$refs.addAlert.show();
        }
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
