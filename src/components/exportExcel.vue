<template lang="html">
  <div id="exportExcel">
    <div class="col-lg-4" style="padding-left:10px !important; padding-right:10px !important;">
      <b-button
        variant="primary"
        @click="excel()"
        style="font-size:14px !important; color:#fff !important; margin-top:38px; width: 100% !important; padding: 6px 0 !important; margin-right:0 !important;"
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
      const data = originData.map(v => filterVar.map(k => v[k]));
      const [fileName, fileType, sheetName] = [this.fileName, 'xlsx', this.sheetName];
      this.$toExcel({ th, data, fileName, fileType, sheetName });
    },
  },
};
</script>

<style lang="css" scoped></style>
