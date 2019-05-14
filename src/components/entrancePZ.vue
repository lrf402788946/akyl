<template lang="html">
  <div id="entrancePZ">
    <div href="javascript:;" class="file" style="text-align: left !important;">
      导入配重
      <input
        id="upload"
        type="file"
        @change="imports(this)"
        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
      />
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
import Title from '@/util/excelTitle.js';
export default {
  name: 'entrancePZ',
  components: {},
  data() {
    return {};
  },
  computed: {},
  methods: {
    async imports(obj) {
      let _this = this;

      let inputDOM = this.$refs.inputer;

      // 通过DOM取文件数据

      this.file = event.currentTarget.files[0];

      var rABS = false; //是否将文件读取为二进制字符串

      var f = this.file;

      var reader = new FileReader();

      //if (!FileReader.prototype.readAsBinaryString) {

      FileReader.prototype.readAsBinaryString = function(f) {
        var binary = '';

        var rABS = false; //是否将文件读取为二进制字符串

        var pt = this;

        var wb; //读取完成的数据

        var outdata;

        var reader = new FileReader();

        reader.onload = async function(e) {
          var bytes = new Uint8Array(reader.result);

          var length = bytes.byteLength;

          for (var i = 0; i < length; i++) {
            binary += String.fromCharCode(bytes[i]);
          }

          var XLSX = require('xlsx');

          if (rABS) {
            // eslint-disable-next-line no-undef
            wb = XLSX.read(btoa(fixdata(binary)), {
              //手动转化

              type: 'base64',
            });
          } else {
            wb = XLSX.read(binary, {
              type: 'binary',
            });
          }
          outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]); //outdata就是你想要的东西
          _this.$message({
            showClose: true,
            message: '请耐心等待导入',
          });
          let result = await _this.$axios.post(`/akyl/cl/kind_cl_import`, { data: outdata });
          if (result.data.rescode === '0') {
            _this.$message.success('导入成功');
            _this.$emit('research');
          } else {
            _this.$message.error('导入失败');
          }
        };
        reader.readAsArrayBuffer(f);
      };

      if (rABS) {
        reader.readAsArrayBuffer(f);
      } else {
        reader.readAsBinaryString(f);
      }
    },
    excel_time_to_timestamp(excelTime) {
      const second = 25569,
        day_timestamp = 24 * 60 * 60 * 1000;
      return (+excelTime - second) * day_timestamp;
    },
  },
};
</script>

<style lang="css" scoped></style>
