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
                <el-option value="" label="全部工序">全部工序</el-option>
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
                @click="searchButton()"
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
          <entrancePZ @research="search"></entrancePZ>
        </div>
        <!-- 导出 -->
        <div style="margin:10px 0;">
          <exportExcel :exportTitle="th" :db_nameList="filterVal" dataName="list" fileName="型号表"></exportExcel>
        </div>
        <table class="table table-bordered table-striped ">
          <tbody v-if="list.length > 0">
            <tr>
              <th>工序</th>
              <th>型号代码</th>
              <th>型号名称</th>
              <th>计件定额</th>
              <th>操作</th>
            </tr>
            <tr v-for="(item, index) in list" :key="index">
              <td>{{ { data: workList, searchItem: 'value', value: item.work_id, label: 'text' } | getName }}</td>
              <td>{{ item.code }}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.jj_price }}</td>
              <td>
                <b-button variant="primary" style="color:white;" @click="openPZ(item.id, item.name)">配&nbsp;&nbsp;重</b-button>
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
          :current-page="currentPage"
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
          <b-button
            variant="secondary"
            @click="form = {}"
            class="resetButton"
            style="font-size:16px !important; margin-top:25px; padding:6px 80px !important;margin-bottom:30px !important;margin-right:0 !important;"
          >
            重&nbsp;&nbsp;置
          </b-button>
          <b-button
            variant="primary"
            class="resetButton"
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
          <b-button
            variant="secondary"
            @click="closeAlert()"
            class="resetButton"
            style="font-size:16px !important; margin-top:25px; padding:6px 80px !important;margin-bottom:30px !important;margin-right:0 !important;"
          >
            返&nbsp;&nbsp;回
          </b-button>
          <b-button
            variant="primary"
            @click="toValidate('update')"
            class="resetButton"
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
            class="resetButton"
            style="font-size:16px !important; margin-top:25px; padding:6px 80px !important;margin-bottom:30px !important;margin-right:0 !important;"
            @click="toDelete()"
          >
            删&nbsp;&nbsp;除
          </b-button>
          <b-button
            variant="primary"
            class="resetButton"
            style="font-size:16px !important; margin-top:25px; float:right; padding:6px 80px !important;margin-bottom:30px !important;margin-right:0 !important;"
            @click="$refs.deleteAlert.hide(), (deleteItem = '')"
          >
            返&nbsp;&nbsp;回
          </b-button>
        </b-modal>

        <b-modal id="pzEdit" :title="pzTitle" ref="pzEdit" size="lg" hide-footer no-close-on-esc no-close-on-backdrop hide-header-close>
          <table class="table table-bordered table-striped ">
            <tbody>
              <tr>
                <td>材料</td>
                <td>配重</td>
                <td>操作</td>
              </tr>
              <tr v-for="(item, index) in pzForm" :key="index">
                <td>
                  <!-- <el-select class="marginBot" style="height:40px !important" v-model="item.cl_id" filterable placeholder="请选择材料">
                    <el-option v-for="(item2, index) in materialList" :key="index" :label="item2.text" :value="item2.value">{{ item2.text }}</el-option>
                  </el-select> -->
                  <b-form-input v-model="item.cl_name"></b-form-input>
                </td>
                <td>
                  <b-form-input v-model="item.num" type="number" onkeypress="return (/[0-9.]/.test(String.fromCharCode(event.keyCode)))"></b-form-input>
                </td>
                <b-button
                  style="margin-top: 23px; margin-left: 8px !important; margin-right: 6px !important; padding: 5px 8px !important; font-size: 13px !important;"
                  @click="closePzForm(index)"
                  class="resetButton"
                  variant="danger"
                  >删&nbsp;&nbsp;除</b-button
                >
              </tr>
            </tbody>
          </table>
          <b-button
            variant="primary"
            @click="addSubForm()"
            class="resetButton"
            style="font-size:16px !important; margin-top:25px; width:30% !important; padding:6px 80px !important;margin-bottom:30px !important;margin-right:0 !important;"
            >添&nbsp;&nbsp;加</b-button
          >
          <b-button
            variant="primary"
            @click="editKind_Material()"
            class="resetButton"
            style="font-size:16px !important; margin:25px 5% 30px 5% !important; background-color: #17a2b8 !important;  width:30% !important; padding:6px 80px !important;"
            >保&nbsp;&nbsp;存</b-button
          >
          <b-button
            variant="secondary"
            @click="openPZ()"
            class="resetButton"
            style="font-size:16px !important; width:30% !important; margin-top:25px; margin-bottom:30px !important; margin-right: 0 !important; padding:6px 80px !important;"
            >返&nbsp;&nbsp;回</b-button
          >
        </b-modal>
      </div>
    </div>
  </div>
</template>

<script>
import Validator from 'async-validator';
import entrance from '@/components/entrance.vue';
import entrancePZ from '@/components/entrancePZ.vue';
import exportExcel from '@/components/exportExcel.vue';
export default {
  name: 'kind',
  metaInfo: {
    title: '型号管理',
  },
  components: {
    exportExcel,
    entrance,
    entrancePZ,
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
      }),
      pzForm: [],
      materialList: [],
      pzTitle: '',
      operateId: '',
      th: ['工序', '型号代码', '型号名称', '计件定额'],
      filterVal: ['work_id', 'code', 'name', 'jj_price'],
      is_title_search: false, //是否是模糊查询： true：是模糊查询； false： 不是模糊查询
      skip: 0,
    };
  },
  computed: {},
  created() {
    this.search();
    this.searchWork();
    // this.searchMaterial();
  },
  watch: {
    is_title_search: {
      handler(nV, oV) {
        this.$set(this, 'currentPage', 1);
        if (nV) {
          this.titlesearch();
        } else {
          this.search();
        }
      },
    },
  },
  methods: {
    //分页
    toSearch(currentPage) {
      this.currentPage = currentPage;
      if (this.is_title_search) {
        this.titlesearch();
      } else {
        this.search();
      }
    },
    //查询
    async search() {
      if (this.select_kind_gxname === null) this.select_kind_gxname = '';
      if (this.select_kind_typecode === null) this.select_kind_typecode = '';
      if (this.is_title_search) {
        this.is_title_search = false;
        return;
      }
      let skip = (this.currentPage - 1) * this.limit;
      let result = await this.$axios.get(
        `/akyl/kind/kind_list?skip=${skip}&limit=${this.limit}&work_id=${this.select_kind_gxname}&code=${this.select_kind_typecode}`
      );
      if (result.data.msg === '成功') {
        this.$set(this, 'list', result.data.kindList);
        this.$set(this, 'origin', result.data.kindList);
        this.$set(this, 'totalRow', result.data.totalRow);
      }
      if (result.data.msg === '没有数据') {
        this.list = '';
        this.origin = '';
        this.totalRow = 0;
      }
    },
    //模糊查询的方法
    async titlesearch() {
      if (!this.is_title_search) {
        this.is_title_search = true;
        return;
      }
      let skip = (this.currentPage - 1) * this.limit;
      let result = await this.$axios.get(
        `/akyl/kind/kind_list?skip=${skip}&limit=${this.limit}&work_id=${this.select_kind_gxname}&code=${this.select_kind_typecode}`
      );
      if (result.data.msg === '成功') {
        this.$set(this, 'list', result.data.kindList);
        this.$set(this, 'origin', result.data.kindList);
        this.$set(this, 'totalRow', result.data.totalRow);
      }
      if (result.data.msg === '没有数据') {
        this.list = '';
        this.origin = '';
        this.totalRow = 0;
      }
    },
    //模糊查询按钮
    async searchButton() {
      this.currentPage = 1;
      if (!this.is_title_search) {
        this.is_title_search = true;
        return;
      }
      let skip = 0;
      let result = await this.$axios.get(
        `/akyl/kind/kind_list?skip=${skip}&limit=${this.limit}&work_id=${this.select_kind_gxname}&code=${this.select_kind_typecode}`
      );
      if (result.data.msg === '成功') {
        this.$set(this, 'list', result.data.kindList);
        this.$set(this, 'origin', result.data.kindList);
        this.$set(this, 'totalRow', result.data.totalRow);
      }
      if (result.data.msg === '没有数据') {
        this.list = '';
        this.origin = '';
        this.totalRow = 0;
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
        // let defalut = { text: '请选择工序', value: null, disabled: true };
        // this.workList.unshift(defalut);
      }
    },
    // //查询材料表
    // async searchMaterial() {
    //   let result = await this.$axios.get(`/akyl/cl/cl_list?name=&skip=0&limit=10000`);
    //   if (result.data.rescode === '0') {
    //     this.materialList = result.data.cList.map(item => {
    //       let newObject = { text: item.name, value: item.id };
    //       return newObject;
    //     });
    //   } else {
    //     let defalut = { text: '无材料可选择', value: null, disabled: true };
    //     this.materialList = '';
    //   }
    // },
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
    //打开修改型号的配重弹框
    async openPZ(id, name) {
      if (!this.$refs.pzEdit.is_show) {
        this.operateId = id;
        this.$set(this, 'pzTitle', name);
        this.$refs.pzEdit.show();
        let result = await this.$axios.get(`/akyl/cl/kind_cl_list?kind_id=${id}`);
        if (result.data.rescode === '0') {
          this.$set(this, 'pzForm', result.data.kindCList);
        }
      } else {
        if (this.pzForm.length > 0) {
          this.pzForm.splice(0, this.pzForm.length);
        }
        this.$refs.pzEdit.hide();
      }
    },
    //删除表单中内容
    closePzForm(i) {
      this.pzForm.splice(i, 1);
    },
    //添加字表数据
    addSubForm() {
      this.pzForm.push({});
    },
    //修改配重
    async editKind_Material() {
      let result = await this.$axios.post(`/akyl/cl/kind_cl_save`, { data: { subForm: this.pzForm, kind_id: this.operateId } });
      if (result.data.rescode === '0') {
        this.$message.success('修改成功');
        this.openPZ(null, null);
      } else {
        this.$message.error('修改失败');
      }
    },
  },
};
</script>

<style lang="css" scoped></style>
