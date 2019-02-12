<template>
  <div>

    <body :style="'overflow-y: auto;background-image: url('+img+'); background-repeat:no-repeat; background-size:auto;'">
      <div class="page-container">
        <div>
          <h1 style="letter-spacing:4px; padding-bottom:20px; font-weight:bold; color:#fff;">干部廉政档案系统</h1>
        </div>
        <div class="form-container">
          <form style="margin:20px auto; width:300px;">
            <div style="text-align:left;" class="form-group">
              <label for="exampleInputuser1">用户名：</label>
              <input type="text" v-model="form.login_id" class="form-control" placeholder="">
            </div>
            <div style="text-align:left;" class="form-group">
              <label for="exampleInputPassword1">密&nbsp;&nbsp;&nbsp;码：</label>
              <input type="password" v-model="form.password" class="form-control" placeholder="">
            </div>
            <div class="form-group">
              <div class="row">
                <div class="col-lg-6">
                  <button variant="primary" @click.prevent="login()" style=" margin-top:10px;" class="dengBtn">登&nbsp;&nbsp;录</button>
                </div>
                <div class="col-lg-6">
                  <button variant="primary" @click="form={}" style=" margin-top:10px;" class="dengBtn">重&nbsp;&nbsp;置</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </body>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
export default {
  data() {
    return {
      img: require('@/assets/img/blurred.jpg'),
      form: {},
    };
  },
  methods: {
    ...mapMutations(['isLogin']),
    async login() {
      if (this.form.login_id && this.form.password) {
        let result = await this.$axios.post('/user/login', { data: this.form });
        console.log(result);
        if (result.data.rescode === '0') {
          sessionStorage.setItem('userInfo', this.form.login_id);
        } else {
          alert(result.data.msg);
        }
        this.isLogin();
        //存入sessionStorage
        // sessionStorage.setItem('userInfo', JSON.stringify(this.form));
        this.$router.push('/');
      }
    },
  },
};
</script>
<style>
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
.btn {
  margin-left: 0 !important;
  height: 46px !important;
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
