<template lang="html">
  <div id="sc" style="font-family: '微软雅黑';">
    <div class="form-inline">
      <div class="base-form-title" style="width:100%;">
        <a class="base-margin-left-20">生产统计</a>
        <div class="button-table"></div>
      </div>
    </div>
    <div class="base-padding-20 base-bg-fff">
      <div class="base-align-right" style="margin-bottom: 20px;">
        <div class="col-lg-3 mb25">
          <b-form-input v-model="select_order_num" placeholder="订单号查询" class="marginBot8"></b-form-input>
        </div>
        <div class="col-lg-3 mb25">
          <el-select @click.native="searchName()" class="marginBot8" style="height:40px !important" v-model="select_cus_id" filterable placeholder="请选择客户">
            <el-option value="" label="全部客户">全部客户</el-option>
            <el-option v-for="item1 in cusNameList" :key="item1.value" :label="item1.text" :value="item1.value"> </el-option>
          </el-select>
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
            <th>客户姓名</th>
            <th>创建日期</th>
            <th>订单号</th>
            <th>日期</th>
            <th>备注</th>
            <th>操作</th>
          </tr>
          <tr v-for="(item, index) in list" :key="index">
            <td>{{ item.name }}</td>
            <td>{{ item.create_time }}</td>
            <td>{{ item.order_num }}</td>
            <td>{{ item.in_date }}</td>
            <td>{{ item.remark }}</td>
            <td>
              <b-button variant="primary" style="color:white; margin-right:5px;" @click="openAlert(item.id)">生&nbsp;产&nbsp;统&nbsp;计</b-button>
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
    </div>
    <!--详情弹框-->
    <b-modal id="detailsAlert" title="生产统计" size="xl" ref="detailsAlert" hide-footer no-close-on-esc no-close-on-backdrop hide-header-close>
      <div class="d-block">
        <el-tabs type="border-card">
          <el-tab-pane label="编号：PJL">
            <table class="table table-bordered table-striped " id="tabDiv2">
              <tr>
                <td style="width:120px;">客户名称：</td>
                <td style="width:120px;">{{ titleList.name }}</td>
                <td style="width:120px;">合同号：</td>
                <td style="width:120px;">{{ titleList.order_num }}</td>
                <td style="width:120px;">产品批号：</td>
                <td style="width:120px;">{{ cp_no }}</td>
                <td style="width:120px;">合同评审：</td>
                <td style="width:120px;"></td>
                <td style="width:120px;"></td>
              </tr>
              <tr>
                <td colspan="9"></td>
              </tr>
              <tr>
                <td>规格型号</td>
                <td>发货明细</td>
                <td>包装投入产出表</td>
                <td>包装日期</td>
                <td>标签记录</td>
                <td>成品检验报告</td>
                <td>灭菌报告</td>
                <td>灭菌颜色贴记录</td>
                <td>无菌检测报告</td>
              </tr>
              <tr v-for="(item, index) in pageListOne" :key="index">
                <td>{{ item.kind }}</td>
                <td>{{ item.num }}</td>
                <td>{{ item.bz_no }}</td>
                <td>{{ item.update_time }}</td>
                <td></td>
                <td>{{ item.jy_bg }}</td>
                <td>{{ item.mj_bg }}</td>
                <td></td>
                <td>{{ item.wj_bg }}</td>
              </tr>
            </table>
          </el-tab-pane>
          <el-tab-pane label="编号：BCJL">
            <table class="table table-bordered table-striped " id="tabDiv3">
              <tr>
                <td>规格型号</td>
                <td>包装投入产出表</td>
                <td>裸针来料批号</td>
                <td>检验报告</td>
                <td>采购合同</td>
                <td>针芯来料批号</td>
                <td>检验报告</td>
                <td>采购合同</td>
                <td>弹簧柄来料批号</td>
                <td>检验报告</td>
                <td>采购合同</td>
              </tr>
              <tr v-for="(item, index) in pageListTwo" :key="index">
                <td>{{ item.one_code }}</td>
                <td>{{ item.code }} : {{ item.num }}</td>
                <td>{{ item.order_no }}</td>
                <td></td>
                <td></td>
                <td>{{ item.zx_order_no }}</td>
                <td></td>
                <td></td>
                <td>{{ item.th_order_no }}</td>
                <td></td>
                <td></td>
              </tr>
            </table>
          </el-tab-pane>
          <el-tab-pane label="编号：SCJL">
            <table class="table table-bordered table-striped " border="1" style="float:left;" id="tabDiv4">
              <tr>
                <td style="width:270px;">型号</td>
                <td style="width:270px;">包装投入产出表</td>
                <td style="width:270px;">针灸针加工投入产出表</td>
                <td style="width:270px;">针芯加工投入产出表</td>
                <td style="width:270px;">弹簧柄加工投入产出表</td>
              </tr>
              <tr>
                <td v-for="(item, index) in pageListTwo" :key="index">{{ item.one_code }}</td>
                <td v-for="(item, index) in pageListTwo" :key="index">{{ item.bz_no }}</td>
                <td v-for="(item, index) in pageListTwo" :key="index">{{ item.code }} : {{ item.num }}</td>
                <td v-for="(item, index) in pageListThree" :key="index">{{ item.code }} : {{ item.num }}</td>
                <td v-for="(item, index) in pageListFour" :key="index">{{ item.code }} : {{ item.num }}</td>
              </tr>
            </table>

            <!-- <table class="table table-bordered table-striped " border="1" style="float:left; width:240px; border-right:none !important;">
              <tr>
                <td style="border:none !important;">针芯加工投入产出表</td>
              </tr>
              <tr v-for="(item, index) in pageListThree" :key="index">
                <td>{{ item.code }} : {{ item.num }}</td>
              </tr>
            </table>

            <table class="table table-bordered table-striped " border="1" style="float:left; width:240px;">
              <tr>
                <td>弹簧柄加工投入产出表</td>
              </tr>
              <tr v-for="(item, index) in pageListFour" :key="index">
                <td>{{ item.code }} : {{ item.num }}</td>
              </tr>
            </table> -->
          </el-tab-pane>
          <el-tab-pane label="编号：YCLJL">
            <table class="table table-bordered table-striped " id="tabDiv5">
              <tr>
                <td>规格型号</td>
                <td>针芯加工投入产出表</td>
                <td>针线批号</td>
                <td>检验报告</td>
                <td>采购合同</td>
                <td>弹簧柄加工投入产出表</td>
                <td>绕柄线批号</td>
                <td>检验报告</td>
                <td>采购合同</td>
              </tr>
              <tr v-for="(item, index) in pageListFour" :key="index">
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
              </tr>
            </table>
          </el-tab-pane>
        </el-tabs>
      </div>
      <b-button
        variant="secondary"
        @click="closeAlert()"
        class="resetButton"
        style="font-size:13px !important; margin-top:40px;font-family: '微软雅黑'; float: right; padding:4px 9px !important;margin-bottom:25px !important;margin-right:0px !important;"
        ><i class="base-margin-right-5 fa fa-reply"></i>返&nbsp;&nbsp;回</b-button
      >
      <b-button
        variant="primary"
        @click="exp()"
        class="resetButton"
        style="font-size:13px !important; margin-top:40px;font-family: '微软雅黑'; float: right; margin-bottom:25px !important; margin-right: 22px !important; padding:4px 10px !important;"
        ><i class="base-margin-right-5 fa fa-file-text-o"></i>导&nbsp;&nbsp;出</b-button
      >
    </b-modal>
  </div>
</template>
<script>
import Validator from 'async-validator';
import exportExcel from '@/components/exportExcel.vue';

export default {
  name: 'sc',
  metaInfo: {
    title: '生产统计',
  },
  components: {
    // exportExcel,
  },
  data() {
    return {
      list: [],
      form: {},
      cusNameList: [],
      currentPage: 1,
      limit: 15,
      totalRow: 0,
      select_order_num: '',
      select_cus_id: '',
      is_title_search: false, //是否是模糊查询： true：是模糊查询； false： 不是模糊查询
      skip: 0,
      titleList: {},
      pageListOne: [],
      pageListTwo: [],
      pageListThree: [],
      pageListFour: [],
      cp_no: '',
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
      if (this.select_order_num === null) this.select_order_num = '';
      if (this.select_cus_id === null) this.select_cus_id = '';
      let skip = (this.currentPage - 1) * this.limit;
      let result = await this.$axios.get(
        `/akyl/count/count_produce?skip=${skip}&limit=${this.limit}&order_num=${this.select_order_num}&cus_id=${this.select_cus_id}`
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
    //查询客户姓名
    async searchName() {
      // let skip = (this.currentPage - 1) * this.limit; //111
      // let result = await this.$axios.get(`/akyl/customer/customer_list?skip=${skip}&limit=${this.limit}`);
      let result = await this.$axios.get(`/akyl/customer/customer_list?skip=0&limit=500000`);
      if (result.data.msg === '成功') {
        this.cusNameList = result.data.customerList.map(item => {
          let newObject = { text: item.name, value: item.id };
          return newObject;
        });
      }
    },
    async titlesearch() {
      if (this.is_title_search) {
        this.is_title_search = true;
        return;
      }
      if (this.select_order_num === null) this.select_order_num = '';
      if (this.select_cus_id === null) this.select_cus_id = '';
      let skip = (this.currentPage - 1) * this.limit;
      let result = await this.$axios.get(
        `/akyl/count/count_produce?skip=${skip}&limit=${this.limit}&order_num=${this.select_order_num}&cus_id=${this.select_cus_id}`
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
      let skip = 0;
      let result = await this.$axios.get(
        `/akyl/count/count_produce?skip=${skip}&limit=${this.limit}&order_num=${this.select_order_num}&cus_id=${this.select_cus_id}`
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
    //查询生产统计详情弹窗接口
    async openAlert(id) {
      let result = await this.$axios.get(`/akyl/count/count_produce_info?id=${id}`);
      this.$set(this, 'pageListOne', result.data.pageListOne);
      this.cp_no = this.pageListOne[0].cp_no;
      this.$set(this, 'titleList', result.data.order);
      this.$set(this, 'pageListTwo', result.data.pageListTwo);
      this.$set(this, 'pageListThree', result.data.pageListThree);
      this.$set(this, 'pageListFour', result.data.pageListFour);
      this.$refs.detailsAlert.show();
    },
    //关闭弹框
    closeAlert() {
      this.$refs.detailsAlert.hide();
      this.titleList = {};
      this.pageListOne = [];
      this.pageListTwo = [];
      this.pageListThree = [];
      this.pageListFour = [];
    },
    //导出
    exp() {
      this.tablesToExcel(['tabDiv2', 'tabDiv3', 'tabDiv4', 'tabDiv5'], ['PJL', 'BCJL', 'SCJL', 'YCLJL'], '生产统计.xls', 'Excel');
    },
    tablesToExcel(tables, wsnames, wbname, appname) {
      var uri = 'data:application/vnd.ms-excel;base64,',
        tmplWorkbookXML =
          '<?xml version="1.0"?><?mso-application progid="Excel.Sheet"?><Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">' +
          '<DocumentProperties xmlns="urn:schemas-microsoft-com:office:office"><Author>Axel Richter</Author><Created>{created}</Created></DocumentProperties>' +
          '<Styles>' +
          '<Style ss:ID="Currency"><NumberFormat ss:Format="Currency"></NumberFormat></Style>' +
          '<Style ss:ID="Date"><NumberFormat ss:Format="Medium Date"></NumberFormat></Style>' +
          '</Styles>' +
          '{worksheets}</Workbook>',
        tmplWorksheetXML = '<Worksheet ss:Name="{nameWS}"><Table>{rows}</Table></Worksheet>',
        tmplCellXML = '<Cell{attributeStyleID}{attributeFormula}><Data ss:Type="{nameType}">{data}</Data></Cell>',
        base64 = function(s) {
          return window.btoa(unescape(encodeURIComponent(s)));
        },
        format = function(s, c) {
          return s.replace(/{(\w+)}/g, function(m, p) {
            return c[p];
          });
        };

      var ctx = '';
      var workbookXML = '';
      var worksheetsXML = '';
      var rowsXML = '';

      for (var i = 0; i < tables.length; i++) {
        if (!tables[i].nodeType) tables[i] = document.getElementById(tables[i]);

        //           控制要导出的行数
        for (var j = 0; j < tables[i].rows.length; j++) {
          rowsXML += '<Row>';

          for (var k = 0; k < tables[i].rows[j].cells.length; k++) {
            var dataType = tables[i].rows[j].cells[k].getAttribute('data-type');
            var dataStyle = tables[i].rows[j].cells[k].getAttribute('data-style');
            var dataValue = tables[i].rows[j].cells[k].getAttribute('data-value');
            dataValue = dataValue ? dataValue : tables[i].rows[j].cells[k].innerHTML;
            var dataFormula = tables[i].rows[j].cells[k].getAttribute('data-formula');
            dataFormula = dataFormula ? dataFormula : appname == 'Calc' && dataType == 'DateTime' ? dataValue : null;
            ctx = {
              attributeStyleID: dataStyle == 'Currency' || dataStyle == 'Date' ? ' ss:StyleID="' + dataStyle + '"' : '',
              nameType: dataType == 'Number' || dataType == 'DateTime' || dataType == 'Boolean' || dataType == 'Error' ? dataType : 'String',
              data: dataFormula ? '' : dataValue,
              attributeFormula: dataFormula ? ' ss:Formula="' + dataFormula + '"' : '',
            };
            rowsXML += format(tmplCellXML, ctx);
          }
          rowsXML += '</Row>';
        }
        ctx = { rows: rowsXML, nameWS: wsnames[i] || 'Sheet' + i };
        worksheetsXML += format(tmplWorksheetXML, ctx);
        rowsXML = '';
      }

      ctx = { created: new Date().getTime(), worksheets: worksheetsXML };
      workbookXML = format(tmplWorkbookXML, ctx);
      var link = document.createElement('A');
      link.href = uri + base64(workbookXML);
      link.download = wbname || 'Workbook.xls';
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
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
.col-lg-1 {
  float: left;
}
</style>

<style scoped>
@import '../../assets/style/Font-Awesome-master/css/font-awesome.css';
@import '../../assets/style/layout/base-Layout-bootstrap.css';
@import '../../assets/style/base-style-bootstrap.css';
</style>
