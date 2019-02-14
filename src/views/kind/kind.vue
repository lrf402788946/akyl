<template lang='html'>
  <div id="kind"><!--选工序填型号-->
    <!-- 表格 begin -->
    <div class="base-form">
      <div class="form-inline">
        <div class="base-form-title" style="width:100%;"><a class="base-margin-left-20">型号列表</a>
          <div class="button-table">
          </div>
        </div>
      </div>
      <div class="base-padding-20 base-bg-fff">
        <div class="base-align-right" style="margin-bottom:20px;">
          <a class="btn btn-info base-margin-bottom" data-toggle="tooltip" style="font-size:14px !important; color:#fff !important; padding: 6px 12px !important;" title="" role="button" v-b-modal="'toAdd'">
            <i class="base-margin-right-5 fa fa-plus-square"></i>添加型号    
          </a>
        </div>
        <table class="table table-bordered table-striped ">
          <tbody>
            <tr>
              <th>工序</th>
              <th>型号代码</th>
              <th>型号名称</th>
              <th>操作</th>
            </tr>
            <tr v-for="(item,index) in list" :key="index"><!--美化下input 可以看情况使用-->
              <td>{{{data: workList, searchItem: 'value',value: item.work_id, label:'text'}|getName}}</td>
              <td>{{item.code}}</td>
              <td>{{item.name}}</td>
              <td>
                <b-button variant="primary" style="color:white;" @click="openUpdateAlert(index)">修&nbsp;&nbsp;改</b-button>
                <b-button variant="danger" @click="openDeleteAlert(item.id)">删&nbsp;&nbsp;除</b-button>
              </td>
            </tr>
          </tbody>
        </table>
        <b-modal id="toAdd" title="添加型号" ref="toAdd" hide-footer > 
          <!--需要计算,如果是父类,正常显示,不是的话就缩进-->
          <p class="marginBot5">工序</p>
          <b-form-select v-model="form.work_id"  :options="workList"/>
          <p class="marginBot5">型号代码</p>
          <b-form-input v-model="form.code" class="marginBot8"></b-form-input>
          <p class="marginBot5">型号名称</p>
          <b-form-input v-model="form.name" class="marginBot20"></b-form-input>
          <b-button variant="secondary" @click="form={}" style="font-size:16px !important; margin-top:25px; padding:6px 80px !important;margin-bottom:30px !important;margin-right:0 !important;"  >重&nbsp;&nbsp;置</b-button>
          <b-button variant="primary" @click="toValidate('add')"  style="font-size:16px !important; margin-top:25px; float:right; padding:6px 80px !important;margin-bottom:30px !important;margin-right:0 !important;"  >保&nbsp;&nbsp;存</b-button>
        </b-modal>

        <b-modal id="Edit" title="修改型号" ref="Edit" hide-footer no-close-on-esc no-close-on-backdrop hide-header-close> 
          <p class="marginBot5">工序</p>
          <b-form-select v-model="form.work_id"  :options="workList"/>
          <p class="marginBot5">型号代码</p>
          <b-form-input v-model="form.code"  class="marginBot8"></b-form-input>
          <p class="marginBot5">型号名称</p>
          <b-form-input v-model="form.name"  class="marginBot20"></b-form-input>
          <b-button variant="secondary" @click="closeAlert()"  style="font-size:16px !important; margin-top:25px; padding:6px 80px !important;margin-bottom:30px !important;margin-right:0 !important;" >返&nbsp;&nbsp;回</b-button>
          <b-button variant="primary" @click="toValidate('update')"  style="font-size:16px !important; margin-top:25px; float:right; padding:6px 80px !important;margin-bottom:30px !important;margin-right:0 !important;"  >修&nbsp;&nbsp;改</b-button>
        </b-modal>

        <b-modal id="deleteAlert" title="确认删除" ref="deleteAlert" hide-footer no-close-on-esc no-close-on-backdrop hide-header-close> 
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
import Validator from 'async-validator';
export default {
  name: 'kind',
  metaInfo: {
    title: '类型管理',
  },
  components: {},
  data() {
    return {
      origin: [],
      list: [],
      workList: [],
      form: {
        work_id: null,
      },
      deleteItem: '',
      currentPage: 1,
      limit: 15,
      totalRow: 100,
      kindValidator: new Validator({
        work_id: { type: 'number', required: true, message: '请选择工序代码' },
        code: { type: 'string', required: true, message: '请填写型号代码' },
        name: { type: 'string', required: true, message: '请填写型号名称' },
      }),
    };
  },
  computed: {},
  created() {
    this.search();
    this.searchWork();
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
      if (result.data.msg === '成功') {
        this.$set(this, 'list', result.data.kindList);
        this.$set(this, 'origin', result.data.kindList);
        this.$set(this, 'totalRow', result.data.totalRow);
      }
    },
    //查询工序表,关联用
    async searchWork() {
      let result = await this.$axios.get(`/akyl/work/work_list?skip=0&limit=100`);
      if (result.data.msg === '成功') {
        this.workList = result.data.workList.map(item => {
          let newObject = { text: item.name, value: item.id };
          return newObject;
        });
        let defalut = { text: '请选择工序', value: null, disabled: true };
        this.workList.unshift(defalut);
      }
    },
    //验证,因为添加和修改的验证内容都是一样的,所以用一个方法
    toValidate(type) {
      this.kindValidator.validate(this.form, (errors, fields) => {
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
      let result = await this.$axios.post('/akyl/kind/kind_save', { data: this.form });
      this.$refs.toAdd.hide();
      this.form = {};
      this.search();
    },
    //修改
    async update() {
      let data = this.form;
      let result = await this.$axios.post('/akyl/kind/kind_edit', { data: data });
      console.log(result);
      this.$refs.Edit.hide();
      this.search();
    },
    //删除
    async toDelete() {
      let result = await this.$axios.post('/akyl/kind/kind_delete', { data: { id: this.deleteItem } });
      this.$refs.deleteAlert.hide();
      this.search();
      this.deleteItem = '';
    },
    //打开修改提示框
    openUpdateAlert(index) {
      this.$refs.Edit.show();
      this.form = JSON.parse(JSON.stringify(this.list[index]));
    },
    //打开删除提示框
    openDeleteAlert(id) {
      this.$refs.deleteAlert.show();
      this.deleteItem = id;
    },
    //关闭弹框
    closeAlert() {
      this.$refs.Edit.hide();
      this.list = JSON.parse(JSON.stringify(this.origin));
      this.deleteItem = '';
      this.form = { work_id: null };
    },
    //验证错误
    handleErrors(errors, fields) {
      this.$message.error(errors[0].message);
      this.errors = errors.reduce((p, c) => {
        // eslint-disable-next-line no-param-reassign
        p[c.field] = 'error';
        return p;
      }, {});
      // eslint-disable-next-line no-console
      console.debug(errors, fields);
    },
  },
};
</script>

<style lang='css' scoped>

</style>
