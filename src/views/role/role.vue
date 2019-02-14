<template lang='html'>
  <div id="role">
     <!-- 位置导航 begin  -->
      <b-breadcrumb>
        <b-breadcrumb-item :to="{name:'role'}">角色管理</b-breadcrumb-item>
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
            <a class="btn btn-info base-margin-bottom" data-toggle="tooltip" style="font-size:14px !important; color:#fff !important; padding: 6px 12px !important;" title="" role="button" v-b-modal="'toAdd'">
              <i class="base-margin-right-5 fa fa-plus-square"></i>添加角色    
            </a>
          </div>
          <table class="table table-bordered table-striped ">
            <tbody>
              <tr>
                <th>角色代码</th>
                <th>角色名称</th>
                <th>操作</th>
              </tr>
              <tr v-for="(item,index) in list" :key="index"><!--美化下input 可以看情况使用-->
                <td>{{item.role_code}}</td>
                <td>{{item.role_name}}</td>
                <td>
                  <b-button variant="primary" style="color:white;" @click="openUpdateAlert(index)">修&nbsp;&nbsp;改</b-button>
                  <b-button variant="danger" @click="openDeleteAlert(item.id)">删&nbsp;&nbsp;除</b-button>
                </td>
              </tr>
            </tbody>
          </table>
          <b-modal id="toAdd" title="添加角色" ref="toAdd" hide-footer> 
            <!--需要计算,如果是父类,正常显示,不是的话就缩进-->
            <p class="marginBot5">所属角色</p>
            <b-form-select v-model="form.p_id" class="marginBot8">
              <option :value="0">无所属</option>
              <option v-for="(item,index) in list" :key="index" :value="item.id">{{item.role_name}}</option>
            </b-form-select>
            <p class="marginBot5">角色代码</p>
            <b-form-input v-model="form.role_code" class="marginBot8"></b-form-input>
            <p class="marginBot5">角色名称</p>
            <b-form-input v-model="form.role_name" class="marginBot20"></b-form-input>
            <b-button variant="secondary" @click="form={p_id: 0}" style="font-size:16px !important; margin-top:25px; padding:6px 80px !important;margin-bottom:30px !important;margin-right:0 !important;"  >重&nbsp;&nbsp;置</b-button>
            <b-button variant="primary" @click="toValidate('add')"  style="font-size:16px !important; margin-top:25px; float:right; padding:6px 80px !important;margin-bottom:30px !important;margin-right:0 !important;"  >保&nbsp;&nbsp;存</b-button>
          </b-modal>

          <b-modal id="Edit" title="修改角色" ref="Edit" hide-footer> 
            <p class="marginBot5">所属角色</p>
            <b-form-select v-model="form.p_id"  class="marginBot8">
              <option :value="0">无所属</option>
              <option v-for="(item,index) in list" :key="index" :value="item.id">{{item.role_name}}</option>
            </b-form-select>
            <p class="marginBot5">角色代码</p>
            <b-form-input v-model="form.role_code"  class="marginBot8"></b-form-input>
            <p class="marginBot5">角色名称</p>
            <b-form-input v-model="form.role_name"  class="marginBot20"></b-form-input>
            <b-button variant="secondary" @click="closeAlert()"  style="font-size:16px !important; margin-top:25px; padding:6px 80px !important;margin-bottom:30px !important;margin-right:0 !important;" >返&nbsp;&nbsp;回</b-button>
            <b-button variant="primary" @click="toValidate('update')"  style="font-size:16px !important; margin-top:25px; float:right; padding:6px 80px !important;margin-bottom:30px !important;margin-right:0 !important;"  >修&nbsp;&nbsp;改</b-button>
          </b-modal>

          <b-modal id="deleteAlert" title="确认删除" ref="deleteAlert" hide-footer> 
            <div class="d-block text-center">
              <b-alert variant="danger" show>确定删除该角色?</b-alert>
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
  name: 'role',
  metaInfo: {
    title: '角色管理',
  },
  components: {},
  data() {
    return {
      origin: [],
      list: [],
      form: {
        p_id: 0,
      },
      deleteItem: '',
      roleValidator: new Validator({
        role_code: [{ type: 'string', required: true, message: '请填写角色代码' }],
        role_name: { type: 'string', required: true, message: '请填写角色名称' },
      }),
    };
  },
  computed: {},
  created() {
    this.search();
  },
  methods: {
    async search() {
      //查询方法
      let result = await this.$axios.get('/akyl/role/role_list?skip=0&limit=100');
      if (result.data.msg === '成功') {
        this.$set(this, 'list', result.data.roleList);
        this.$set(this, 'origin', result.data.roleList);
      }
    },
    //验证,因为添加和修改的验证内容都是一样的,所以用一个方法
    toValidate(type) {
      this.roleValidator.validate(this.form, (errors, fields) => {
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
      console.log(1);
      let result = await this.$axios.post('/akyl/role/role_save', { data: this.form });
      this.form = {};
      this.search();
      this.$refs.toAdd.hide();
    },
    //打开删除提示框
    openDeleteAlert(id) {
      this.$refs.deleteAlert.show();
      this.deleteItem = id;
    },
    //删除
    async toDelete() {
      let result = await this.$axios.post('/akyl/role/role_delete', { data: { id: this.deleteItem } });
      this.search();
      this.deleteItem = '';
      this.$refs.deleteAlert.hide();
    },
    //打开修改提示框
    openUpdateAlert(index) {
      this.$refs.Edit.show();
      this.form = JSON.parse(JSON.stringify(this.list[index]));
    },
    //修改
    async update() {
      let data = this.form;
      let result = await this.$axios.post('/akyl/role/role_edit', { data: data });
      console.log(result);
      this.$refs.Edit.hide();
      this.search();
    },
    //关闭弹框
    closeAlert() {
      this.$refs.Edit.hide();
      this.list = JSON.parse(JSON.stringify(this.origin));
      this.operateId = '';
      this.form = {};
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
.marginBot5{
  margin-bottom: 5px;
}
.marginBot8{
  margin-bottom: 8px;
}
.marginBot20{
  margin-bottom: 20px;
}
.resetButton{
  color:#fff;
  margin-right:20px;
}
.table th, .table td {
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
.table {
    font-size: 14px;
}
</style>
