<template lang="html">
  <div id="kind">
    <!-- 表格 begin -->
    <div class="base-form">
      <div class="form-inline">
        <div class="base-form-title" style="width:100%;">
          <a class="base-margin-left-20">型号列表</a>
          <div class="button-table"></div>
        </div>
      </div>
      <div class="base-padding-20 base-bg-fff">
        <table>
          <tr>
            <td>工序名称查询:</td>
            <td style="padding-left:50px">型号代码查询:</td>
          </tr>
          <tr>
            <td>
              <el-select class="marginBot8" style="height:40px !important" v-model="select_kind_gxname" filterable placeholder="请选择类别">
                <el-option v-for="item1 in workList" :key="item1.value" :label="item1.text" :value="item1.value"> </el-option>
              </el-select>
            </td>
            <td style="padding-left:50px">
              <b-form-input v-model="select_kind_typecode" placeholder="输入型号代码" style="padding-left:50px,width:200px"></b-form-input>
            </td>
            <td style="padding-left:60px">
              <b-button
                variant="primary"
                style="font-size: 12px !important; color: rgb(255, 255, 255) !important; width: 100% !important; padding: 6px 15px !important; margin-right: 0px !important;"
                @click="search()"
                >点&nbsp;&nbsp;击&nbsp;&nbsp;查&nbsp;&nbsp;询</b-button
              >
            </td>
          </tr>
        </table>

        <div class="base-align-right" style="margin-bottom:20px;">
          <a
            class="btn btn-info base-margin-bottom"
            data-toggle="tooltip"
            style="font-size:14px !important; color:#fff !important; padding: 6px 12px !important;"
            title=""
            role="button"
            v-b-modal="'toAdd'"
          >
            <i class="base-margin-right-5 fa fa-plus-square"></i>添加型号
          </a>
          <entrance @research="search"></entrance>
        </div>
        <table class="table table-bordered table-striped ">
          <tbody v-if="list.length > 0">
            <tr>
              <th>工序</th>
              <th>型号代码</th>
              <th>型号名称</th>
              <th>计件定额</th>
              <th>配重</th>
              <th>操作</th>
            </tr>
            <tr v-for="(item, index) in list" :key="index">
              <td>{{ { data: workList, searchItem: 'value', value: item.work_id, label: 'text' } | getName }}</td>
              <td>{{ item.code }}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.jj_price }}</td>
              <td>{{ item.pz }}</td>
              <td>
                <b-button variant="primary" style="color:white;" @click="openUpdateAlert(index)">修&nbsp;&nbsp;改</b-button>
                <b-button variant="danger" @click="openDeleteAlert(item.id)">删&nbsp;&nbsp;除</b-button>
              </td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr>
              <td style="text-align:center;">没有查询到数据</td>
            </tr>
          </tbody>
        </table>
        <el-pagination
          layout="total, prev, pager, next"
          :background="true"
          :page-size="15"
          prev-text="上一页"
          next-text="下一页"
          @current-change="toSearch"
          :total="totalRow"
        >
        </el-pagination>
        <b-modal id="toAdd" title="添加型号" ref="toAdd" hide-footer>
          <!--需要计算,如果是父类,正常显示,不是的话就缩进-->
          <p class="marginBot5">工序</p>
          <el-select class="marginBot8" style="height:40px !important" v-model="form.work_id" filterable placeholder="请选择类别">
            <el-option v-for="item1 in workList" :key="item1.value" :label="item1.text" :value="item1.value"> </el-option>
          </el-select>
          <p class="marginBot5">型号代码</p>
          <b-form-input v-model="form.code" class="marginBot8"></b-form-input>
          <p class="marginBot5">型号名称</p>
          <b-form-input v-model="form.name" class="marginBot20"></b-form-input>
          <p class="marginBot5">计时定额(元)</p>
          <b-form-input v-model="form.jj_price" type="number" class="marginBot20"></b-form-input>
          <p class="marginBot5">配重</p>
          <b-form-input v-model="form.pz" type="number" class="marginBot20"></b-form-input>
          <b-button
            variant="secondary"
            @click="form = {}"
            style="font-size:16px !important; margin-top:25px; padding:6px 80px !important;margin-bottom:30px !important;margin-right:0 !important;"
          >
            重&nbsp;&nbsp;置
          </b-button>
          <b-button
            variant="primary"
            @click="toValidate('add')"
            style="font-size:16px !important; margin-top:25px; float:right; padding:6px 80px !important;margin-bottom:30px !important;margin-right:0 !important;"
          >
            保&nbsp;&nbsp;存
          </b-button>
        </b-modal>

        <b-modal id="Edit" title="修改型号" ref="Edit" hide-footer no-close-on-esc no-close-on-backdrop hide-header-close>
          <p class="marginBot5">工序</p>
          <el-select class="marginBot8" style="height:40px !important" v-model="form.work_id" filterable placeholder="请选择类别">
            <el-option v-for="item1 in workList" :key="item1.value" :label="item1.text" :value="item1.value"> </el-option>
          </el-select>
          <p class="marginBot5">型号代码</p>
          <b-form-input v-model="form.code" class="marginBot8"></b-form-input>
          <p class="marginBot5">型号名称</p>
          <b-form-input v-model="form.name" class="marginBot20"></b-form-input>
          <p class="marginBot5">计时定额(元)</p>
          <b-form-input v-model="form.jj_price" type="number" class="marginBot20"></b-form-input>
          <p class="marginBot5">配重</p>
          <b-form-input v-model="form.pz" type="number" class="marginBot20"></b-form-input>
          <b-button
            variant="secondary"
            @click="closeAlert()"
            style="font-size:16px !important; margin-top:25px; padding:6px 80px !important;margin-bottom:30px !important;margin-right:0 !important;"
          >
            返&nbsp;&nbsp;回
          </b-button>
          <b-button
            variant="primary"
            @click="toValidate('update')"
            style="font-size:16px !important; margin-top:25px; float:right; padding:6px 80px !important;margin-bottom:30px !important;margin-right:0 !important;"
          >
            修&nbsp;&nbsp;改
          </b-button>
        </b-modal>

        <b-modal id="deleteAlert" title="确认删除" ref="deleteAlert" hide-footer no-close-on-esc no-close-on-backdrop hide-header-close>
          <div class="d-block text-center">
            <b-alert variant="danger" show>确定删除该型号?</b-alert>
          </div>
          <b-button
            variant="danger"
            style="font-size:16px !important; margin-top:25px; padding:6px 80px !important;margin-bottom:30px !important;margin-right:0 !important;"
            @click="toDelete()"
          >
            删&nbsp;&nbsp;除
          </b-button>
          <b-button
            variant="primary"
            style="font-size:16px !important; margin-top:25px; float:right; padding:6px 80px !important;margin-bottom:30px !important;margin-right:0 !important;"
            @click="$refs.deleteAlert.hide(), (deleteItem = '')"
          >
            返&nbsp;&nbsp;回
          </b-button>
        </b-modal>
      </div>
    </div>
  </div>
</template>

<script>
import Validator from 'async-validator';
import entrance from '@/components/entrance.vue';
export default {
  name: 'kind',
  metaInfo: {
    title: '类型管理',
  },
  components: {
    entrance,
  },
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
      totalRow: 0,
      select_kind_gxname: '',
      select_kind_typecode: '',
      kindValidator: new Validator({
        work_id: { type: 'number', required: true, message: '请选择工序代码' },
        code: { type: 'string', required: true, message: '请填写型号代码' },
        name: { type: 'string', required: true, message: '请填写型号名称' },
        jj_price: { required: true, message: '请填写计时定额' },
        pz: { required: true, message: '请填写配重' },
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
    // //模糊查询的方法，接口名不对
    // async titlesearch() {
    //   let skip = (this.currentPage - 1) * this.limit;
    //   let result = await this.$axios.get(
    //     `/akyl/staff/in_main_list?gx=${this.select_kind_gxname}?&code=${this.select_kind_typecode}&skip=${skip}&limit=${this.limit}`
    //   );
    //   if (result.data.msg === '成功') {
    //     this.$set(this, 'list', result.data.kindList);
    //   }
    //   if (result.data.msg === '没有数据') {
    //     this.list = '';
    //   }
    // },
    //查询
    async search() {
      let skip = (this.currentPage - 1) * this.limit;
      let result = await this.$axios.get(`/akyl/kind/kind_list?skip=${skip}&limit=${this.limit}&gx=${this.select_kind_gxname}?&code=${this.select_kind_typecode}`);
      if (result.data.msg === '成功') {
        this.$set(this, 'list', result.data.kindList);
        this.$set(this, 'origin', result.data.kindList);
        this.$set(this, 'totalRow', result.data.totalRow);
      }
      if (result.data.msg === '没有数据') {
        this.list = '';
        this.origin = '';
        this.totalRow = '';
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
      if (result.data.rescode === '0') {
        this.$message.success('添加' + result.data.msg);
        this.$refs.toAdd.hide();
        this.form = {};
        this.search();
      } else {
        this.$message.error(result.data.msg);
      }
    },
    //修改
    async update() {
      let data = this.form;
      let result = await this.$axios.post('/akyl/kind/kind_edit', { data: data });
      if (result.data.rescode === '0') {
        this.$message.success('修改' + result.data.msg);
        this.$refs.Edit.hide();
        this.search();
        this.form = {};
      } else {
        this.$message.error(result.data.msg);
      }
    },
    //删除
    async toDelete() {
      let result = await this.$axios.post('/akyl/kind/kind_delete', { data: { id: this.deleteItem } });
      if (result.data.rescode === '0') {
        this.$message.success('删除' + result.data.msg);
        this.$refs.deleteAlert.hide();
        this.search();
        this.deleteItem = '';
      } else {
        this.$message.error(result.data.msg);
      }
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

<style lang="css" scoped></style>
