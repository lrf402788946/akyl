<template lang="html">
  <div id="exportExcel">
    <div style="width:80px; height:40px; line-height:40px;">
      <b-button
        variant="primary"
        @click="excel()"
        style="font-size:14px !important; color:#fff !important; width: 100% !important; padding: 6px 0 !important; margin-right:0 !important;"
      >
        导&nbsp;&nbsp;出</b-button
      >
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
import needAllDataList from '@/util/exportExcelNeedAllData.js';
export default {
  name: 'exportExcel',
  props: {
    exportTitle: { type: Array, defalut: [] },
    db_nameList: { type: Array, defalut: [] },
    dataName: { type: String, defalut: '' },
    fileName: { type: String, default: `exportFileName${Date.parse(new Date())}` },
    sheetName: { type: String, default: 'sheet1' },
  },
  components: {},
  data() {
    return {};
  },
  computed: {},
  created() {
    // this.allData();
  },
  methods: {
    excel() {
      let th = this.exportTitle;
      let filterVar = this.db_nameList;
      let routerName = this.$route.name;
      let originData;
      if (routerName === 'staff' || routerName === 'kind') {
        originData = this.newData(routerName);
      } else {
        originData = _.get(this.$parent, this.dataName);
      }
      if (originData.length > 0) {
        const data = originData.map(v => filterVar.map(k => v[k]));
        const [fileName, fileType, sheetName] = [this.fileName, 'xlsx', this.sheetName];
        this.$message('正在导出,请耐心等待');
        this.$toExcel({ th, data, fileName, fileType, sheetName });
      } else {
        this.$message.error('无可导出的数据');
      }
    },
    newData(type) {
      if (type === 'staff') {
        let deptList = _.get(this.$parent, 'deptList');
        let postList = _.get(this.$parent, 'postList');
        let originData = _.get(this.$parent, this.dataName);
        let newData = originData.map(item => {
          let newObject = {
            job_num: item.job_num,
            user_name: item.user_name,
            gender: item.gender === 0 ? '女' : '男',
            phone_no: item.phone_no,
            birthday: item.birthday,
            id_number: item.birthday,
            dept_id: this.getName(deptList, item.dept_id),
            level: item.level,
            post_id: this.getName(postList, item.post_id),
            status: item.status === 0 ? '在职' : item.status === 1 ? '离职' : '退休',
            tq: item.tq === 0 ? '通勤' : '不通勤',
            in_time: item.in_time,
            remark: item.remark,
          };
          return newObject;
        });
        return newData;
      } else if (type === 'kind') {
        let workList = _.get(this.$parent, 'workList');
        let originData = _.get(this.$parent, this.dataName);
        let newData = originData.map(item => {
          let newObject = {
            work_id: this.getName(workList, item.work_id),
            code: item.code,
            name: item.name,
            jj_price: item.jj_price,
          };
          return newObject;
        });
        return newData;
      }
    },
    getName(data, value) {
      for (const item2 of data) {
        if (item2.value === value) {
          return item2.text;
        }
      }
    },
  },
};
</script>

<style lang="css">
.col-lg-1{
  float: left;
}
.btn-primary:hover{
  background-color:#17a2b8 !important;
}
</style>
