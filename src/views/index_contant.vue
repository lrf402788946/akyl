<template>
  <div>
    <div class="ind">
      欢迎使用爱康管理平台
      <v-chart :forceFit="true" :height="height" :data="data" :scale="scale">
        <v-tooltip :showTitle="false" dataKey="year*sales" />
        <v-axis />
        <v-legend dataKey="item" />
        <v-pie position="percent" color="item" :vStyle="pieStyle" :label="labelConfig" />
        <v-coord type="theta" :radius="0.75" :innerRadius="0.6" />
      </v-chart>
    </div>
  </div>
</template>

<script>
const DataSet = require('@antv/data-set');
export default {
  data() {
    return {
      img: require('@/assets/img/blurred.jpg'),
      data: [],
      height: 400,
      sourceData: [
        { item: '事例一', count: 40 },
        { item: '事例二', count: 21 },
        { item: '事例三', count: 17 },
        { item: '事例四', count: 13 },
        { item: '事例五', count: 9 },
      ],
      scale: [
        {
          dataKey: 'percent',
          min: 0,
          formatter: '.0%',
        },
      ],
      pieStyle: {
        stroke: '#fff',
        lineWidth: 1,
      },
      labelConfig: [
        'percent',
        {
          formatter: (val, item) => {
            return item.point.item + ': ' + val;
          },
        },
      ],
    };
  },
  created() {
    this.test();
  },
  methods: {
    test() {
      const dv = new DataSet.View().source(this.sourceData);
      dv.transform({
        type: 'percent',
        field: 'count',
        dimension: 'item',
        as: 'percent',
      });
      this.data = dv.rows;
    },
  },
};
</script>
<style>
.ind {
  text-align: center;
  font-size: 60px;
  margin-top: 200px;
  line-height: 50px;
  color: #17a2b8;
}
body {
  padding: 0;
  margin: 0;
  font-family: '微软雅黑';
  font-size: 14px;
  overflow: hidden;
  height: 100vh;
}
.dengBtn {
  padding: 10px 16px;
  font-size: 18px;
  line-height: 1.3333333;
  border-radius: 6px;
  background-color: #5bc0de;
  border: none;
  color: #fff;
  display: block;
  width: 100%;
  text-align: center;
}
.dengBtn:hover {
  cursor: pointer;
}
h1 .h1 {
  font-size: 36px !important;
}
.form-group {
  margin-bottom: 15px !important;
}
label {
  display: inline-block;
  max-width: 100%;
  margin-bottom: 5px !important;
  font-weight: bold;
  font-size: 14px;
}
.btn-info {
  background-color: #5bc0de !important;
  border-color: #46b8da !important;
}
.btn-lg .btn-group-lg > .btn {
  padding: 10px 16px !important;
  font-size: 18px !important;
  line-height: 1.3333333 !important;
  border-radius: 6px !important;
}
.form-control {
  height: 34px !important;
  padding: 6px 12px !important;
  font-size: 14px !important;
  line-height: 1.42857143 !important;
  color: #555 !important;
  border: 1px solid #ccc !important;
  border-radius: 4px !important;
}
.form-container {
  height: auto !important;
  padding-bottom: 30px;
}
</style>

<style scoped>
/* @import '../icon/Font-Awesome-master/css/font-awesome.css';
@import '../layout/base-Layout-bootstrap.css';
@import '../style/base-style-bootstrap.css'; */
</style>
