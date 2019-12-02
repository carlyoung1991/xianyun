<template>
  <div class="register">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      class="demo-ruleForm"
    >
      <!-- 手机 -->
      <el-form-item prop="phone">
        <el-input v-model="ruleForm.phone" placeholder="用户名手机"></el-input>
      </el-form-item>
      <!-- 验证码 -->
      <el-form-item prop="Vcode" class="yanzheng">
        <el-input v-model="ruleForm.Vcode" placeholder="验证码"></el-input>
        <el-button class="yan" @click="handleSendCaptcha">发送验证码</el-button>
      </el-form-item>

      <!-- 你的名字 -->
      <el-form-item prop="yourname">
        <el-input v-model="ruleForm.yourname" placeholder="你的名字"></el-input>
      </el-form-item>
      <!-- 没密码 -->
      <el-form-item prop="password">
        <el-input v-model="ruleForm.password" placeholder="密码 "></el-input>
      </el-form-item>
      <!-- 确认密码 -->
      <el-form-item prop="confirePass">
        <el-input
          v-model="ruleForm.confirePass"
          placeholder="确认密码"
        ></el-input>
      </el-form-item>
      <!-- 注册 -->
      <el-form-item>
        <el-button
          type="primary"
          @click="handleRegSubmit"
          class="btnregister"
          >注册</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        phone: "",  //登录用户手机
        Vcode: "",   //验证码
        yourname: "",  //昵称
        password: "",
        confirePass: ""
      },
      rules: {
        phone: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods:{
      handleSendCaptcha(){
      },
      handleRegSubmit(){}
  }
};
</script>

<style lang="less">
.register {
  padding: 30px 20px;
  .yanzheng {
    .el-input {
      position: relative;
    }
    .yan {
      position: absolute;
      right: 0;
      bottom: 0;
    }
  }
  .btnregister {
    width: 100%;
  }
}
</style>
