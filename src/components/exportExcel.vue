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
  methods: {
    excel() {
      let th = this.exportTitle;
      let filterVar = this.db_nameList;
      let originData = _.get(this.$parent, this.dataName);
      if (originData.length > 0) {
        const data = originData.map(v => filterVar.map(k => v[k]));
        const [fileName, fileType, sheetName] = [this.fileName, 'xlsx', this.sheetName];
        this.$message('正在导出,请耐心等待');
        this.$toExcel({ th, data, fileName, fileType, sheetName });
      } else {
        this.$message.error('无可导出的数据');
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
