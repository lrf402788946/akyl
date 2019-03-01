<template lang="html">
  <div id="entrance">
    <a href="javascript:;" class="file"
      >导入表格
      <input
        id="upload"
        type="file"
        @change="imports(this)"
        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
      />
    </a>
  </div>
</template>

<script>
import _ from 'lodash';
import Title from '@/util/excelTitle.js';
export default {
  name: 'entrance',
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

          this.da = [...outdata];
          //前提:路由的name与编辑表头的array名一直,可以直接lodash取出
          //步骤:1)判断路由名称
          //    2)取出title的array
          //    3)筛选出新数组,根据设置的字段自动匹配生成
          //    4)importArray就是结果
          //    5)根据路由名称把生成的结果,传给接口等结果回来就提示完成
          let routerName = _this.$route.name;
          let titleObject = _.get(Title, routerName);
          let importArray = [];
          this.da.map(item => {
            let newObject = {};
            for (const item2 of titleObject) {
              newObject[item2.db_name] = item[item2.name];
            }
            importArray.push(newObject);
          });
          console.log(importArray);
          _this.$message({
            showClose: true,
            message: '请耐心等待导入',
          });
          let result = await _this.$axios.post(`/akyl/${routerName}/${routerName}_import`, { data: importArray });
          console.log(result);
          if (result.data.rescode === '0') {
            _this.$message.success('导入成功');
            this.$emit('research');
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
  },
};
</script>

<style lang="css" scoped></style>
