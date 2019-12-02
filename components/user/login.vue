<template>
  <div class="login">
    <el-form :model="form" :rules="rules" ref="form" class="demo-ruleForm">
      <el-form-item prop="username">
        <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="form.password" placeholder="密码"></el-input>
      </el-form-item>
      <p class="forget">忘记密码</p>
      <el-form-item>
        <el-button type="primary" @click="handleLoginSubmit">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: "13800138000",
        password: "123456"
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    handleLoginSubmit() {
      //验证表单
      this.$refs['form'].validate((valid)=>{
          if(valid){
              //如果正确的话
             this.$store.dispatch('user/login',this.form)
             .then(res=>{
                 this.$message({
                     message:'登录成功，正在跳转',
                     type:'success'
                 });
                 setTimeout(() => {
                     this.$router.replace('/')
                 }, 1000);
             })
          }
      })
    }
  }
};
</script>

<style lang="less">
.login {
  padding: 30px 20px;

  .forget {
    float: right;
    font-size: 13px;
    color: #999;
    margin-bottom: 8px;
  }
  .el-button {
    width: 100%;
  }
}
</style>
