<template lang='html'>
  <div id="index">
     <!-- 位置导航 begin  -->
      <b-breadcrumb>
        <b-breadcrumb-item :to="{name:'user_role'}">权限分配</b-breadcrumb-item>
      </b-breadcrumb>
      <!-- 表格 begin -->
      <div class="base-form">
        <div class="form-inline">
          <div class="base-form-title" style="width:100%;"><a class="base-margin-left-20">列表</a>
            <div class="button-table">
            </div>
          </div>
        </div>
        <div class="base-padding-20 base-bg-fff">
          <div class="base-align-right">
          </div>
          <table class="table table-bordered table-striped ">
            <tbody>
              <tr>
                <th>用户名</th>
                <th>权限</th>
              </tr>
              <tr v-for="(item,index) in userList" :key="index"><!--美化下input 可以看情况使用-->
                <td>{{item.user_name}}</td>
                <td>
                  <b-button variant="primary" style="color:white;" @click="openUpdateAlert(item.id)">查&nbsp;&nbsp;看</b-button>
                </td>
              </tr>
            </tbody>
          </table>
          <b-modal id="updateAlert" title="修改权限" ref="updateAlert" hide-footer>
            <label>请选择权限</label> 
            <el-checkbox-group v-model="form.role_id">
              <el-checkbox v-for="(item,index) in roleList" :key="index" :label="item.value">{{item.text}}</el-checkbox>
            </el-checkbox-group>
              <b-button variant="secondary"  style="font-size:16px !important; margin-top:35px; padding:6px 80px !important;margin-bottom:30px !important;margin-right:0 !important;"  @click="closeAlert()" >返&nbsp;&nbsp;回</b-button>
              <b-button variant="primary"  style="font-size:16px !important; margin-top:35px; float:right; padding:6px 80px !important;margin-bottom:30px !important;margin-right:0 !important;"  @click="toSave()" >保&nbsp;&nbsp;存</b-button>
            <!-- <b-button variant="secondary" @click="form={}" >重置</b-button><b-button variant="primary" @click="toAdd()" >保存</b-button> -->
          </b-modal>

        </div>
      </div>
  </div> 
</template>


<script>
export default {
  name: 'index',
  components: {},
  data() {
    return {
      list: [],
      origin: [
        {
          user_name: 'test',
          role_id: [0, 1],
        },
      ],
      form: {
        role_id: [],
      },
      userList: [
        {
          user_name: 'test',
          role_id: [0, 1],
        },
      ],
      roleList: [
        {
          value: 0,
          text: '厅长',
        },
        {
          value: 1,
          text: '测试员',
        },
        {
          value: 2,
          text: '测试员2',
        },
      ],
      operateId: '',
      toatalPage: 0,
      currentPage: 1,
      limit: 10,
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
      let result2 = await this.$axios.get('/akyl/user/user_list?skip=0&limit=10');
      let newList;
      if (result2.data.msg === '成功') {
        this.userList = result2.data.userList;
        newList = result.data.roleList.map(item => {
          let newObject = { text: item.role_name, value: item.id };
          return newObject;
        });
      }
      if (result.data.msg === '成功') {
        this.$set(this, 'roleList', newList);
        this.$set(this, 'userList', result2.data.userList);
        this.$set(this, 'origin', result2.data.userList);
      }
    },
    //打开修改框
    async openUpdateAlert(id) {
      this.$refs.updateAlert.show();
      this.operateId = id;
      let result = await this.$axios.get(`/akyl/user/user_role_sel?id=${id}`);
      let newList = [];
      for (const item of result.data.userRoleList) {
        newList.push(item.role_id);
      }
      this.$set(this.form, 'role_id', newList);
    },
    //修改
    async toSave() {
      this.form['id'] = this.operateId;
      let result = await this.$axios.post('/akyl/user/user_role', { data: this.form });
      this.form = {};
      this.search();
      this.$refs.updateAlert.hide();
    },
    //关闭弹框
    closeAlert() {
      this.list = JSON.parse(JSON.stringify(this.origin));
      this.$refs.updateAlert.hide();
      this.is_update = true;
      this.operateId = '';
      this.updateForm = {};
    },
  },
};
</script>

<style lang='css' scoped>

</style>
