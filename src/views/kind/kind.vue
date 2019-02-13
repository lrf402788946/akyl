<template lang='html'>
  <div id="kind">
    <!-- 位置导航 begin  -->
    <b-breadcrumb>
      <b-breadcrumb-item :to="{name:'role'}">型号管理</b-breadcrumb-item>
    </b-breadcrumb>
    <!-- 表格 begin -->
    <div class="base-form">
      <div class="form-inline">
        <div class="base-form-title" style="width:100%;"><a class="base-margin-left-20">角色列表</a>
          <div class="button-table">
          </div>
        </div>
      </div>
      <div class="base-padding-20 base-bg-fff">
        <div class="base-align-right" style="margin-bottom:20px;">
          <a class="btn btn-info base-margin-bottom" data-toggle="tooltip" style="font-size:14px !important;padding: 6px 12px !important;" title="" role="button" v-b-modal="'toAdd'">
            <i class="base-margin-right-5 fa fa-plus-square"></i>添加型号    
          </a>
        </div>
        <table class="table table-bordered table-striped ">
          <tbody>
            <tr>
              <th>型号代码</th>
              <th>型号名称</th>
              <th>操作</th>
            </tr>
            <tr v-for="(item,index) in list" :key="index"><!--美化下input 可以看情况使用-->
              <td>{{item.code}}</td>
              <td>{{item.name}}</td>
              <td>
                <b-button variant="primary" style="color:white;" @click="openUpdateAlert(index)">修&nbsp;&nbsp;改</b-button>
                <b-button variant="danger" @click="openDeleteAlert(item.id)">删&nbsp;&nbsp;除</b-button>
              </td>
            </tr>
          </tbody>
        </table>
        <b-modal id="toAdd" title="添加型号" ref="toAdd" hide-footer> 
          <!--需要计算,如果是父类,正常显示,不是的话就缩进-->
          <p class="marginBot5">型号代码</p>
          <b-form-input v-model="form.code" class="marginBot8"></b-form-input>
          <p class="marginBot5">型号名称</p>
          <b-form-input v-model="form.name" class="marginBot20"></b-form-input>
          <b-button variant="secondary" @click="form={}" style="font-size:16px !important; margin-top:25px; padding:6px 80px !important;margin-bottom:30px !important;margin-right:0 !important;"  >重&nbsp;&nbsp;置</b-button>
          <b-button variant="primary" @click="toAdd()"  style="font-size:16px !important; margin-top:25px; float:right; padding:6px 80px !important;margin-bottom:30px !important;margin-right:0 !important;"  >保&nbsp;&nbsp;存</b-button>
        </b-modal>

        <b-modal id="Edit" title="修改型号" ref="Edit" hide-footer> 
          <p class="marginBot5">型号代码</p>
          <b-form-input v-model="form.code"  class="marginBot8"></b-form-input>
          <p class="marginBot5">型号名称</p>
          <b-form-input v-model="form.name"  class="marginBot20"></b-form-input>
          <b-button variant="secondary" @click="closeAlert()"  style="font-size:16px !important; margin-top:25px; padding:6px 80px !important;margin-bottom:30px !important;margin-right:0 !important;" >返&nbsp;&nbsp;回</b-button>
          <b-button variant="primary" @click="toUpdate()"  style="font-size:16px !important; margin-top:25px; float:right; padding:6px 80px !important;margin-bottom:30px !important;margin-right:0 !important;"  >修&nbsp;&nbsp;改</b-button>
        </b-modal>

        <b-modal id="deleteAlert" title="确认删除" ref="deleteAlert" hide-footer> 
          <div class="d-block text-center">
            <b-alert variant="danger" show>确定删除该型号?</b-alert>
          </div>
          <b-button variant="danger"  style="font-size:16px !important; margin-top:25px; padding:6px 80px !important;margin-bottom:30px !important;margin-right:0 !important;"  @click="toDelete()">删&nbsp;&nbsp;除</b-button>
          <b-button variant="primary"  style="font-size:16px !important; margin-top:25px; float:right; padding:6px 80px !important;margin-bottom:30px !important;margin-right:0 !important;" 
          @click="$refs.deleteAlert.hide(),deleteItem=''">返&nbsp;&nbsp;回</b-button>
        </b-modal>
        
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'kind',
  components: {},
  data() {
    return {
      origin: [],
      list: [],
      form: {},
      deleteItem: '',
      currentPage: 1,
      limit: 10,
      totalRow: 100,
    };
  },
  computed: {},
  created() {
    this.search();
  },
  methods: {
    //分页
    toSearch(currentPage) {
      this.currentPage = currentPage;
      this.search();
    },
    //查询
    async search() {
      let skip = (this.currentPage - 1) * this.limit;
      let result = await this.$axios.get(`/akyl/kind/kind_list?skip=${skip}&limit=${this.limit}`);
      console.log(result.data);
      if (result.data.msg === '成功') {
        this.$set(this, 'list', result.data.kindList);
        this.$set(this, 'origin', result.data.kindList);
        this.$set(this, 'totalRow', result.data.totalRow);
      }
    },
    //添加
    async toAdd() {
      let result = await this.$axios.post('/akyl/kind/kind_save', { data: this.addForm });
      this.$refs.addAlert.hide();
      this.addForm = {};
      this.search();
    },
    //修改
    async toUpdate() {
      let data = this.form;
      let result = await this.$axios.post('/akyl/kind/kind_edit', { data: data });
      console.log(result);
      this.$refs.Edit.hide();
      this.search();
    },
    //删除
    async toDelete() {
      let result = await this.$axios.post('/akyl/kind/kind_delete', { data: { id: this.operateId } });
      this.$refs.deleteAlert.hide();
      this.search();
      this.deleteItem = '';
    },
    //关闭弹框
    closeAlert() {
      this.$refs.Edit.hide();
      this.list = JSON.parse(JSON.stringify(this.origin));
      this.operateId = '';
      this.form = {};
    },
  },
};
</script>

<style lang='css' scoped>

</style>
