<template>
  <div class="register">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      class="demo-ruleForm"
    >
      <!-- 手机 -->
      <el-form-item prop="username">
        <el-input v-model="ruleForm.username" placeholder="用户名手机"></el-input>
      </el-form-item>
      <!-- 验证码 -->
      <el-form-item prop="captcha" class="yanzheng">
        <el-input v-model="ruleForm.captcha" placeholder="验证码"></el-input>
        <el-button class="yan" @click="handleSendCaptcha">发送验证码</el-button>
      </el-form-item>

      <!-- 你的名字 -->
      <el-form-item prop="nickname">
        <el-input v-model="ruleForm.nickname" placeholder="你的名字"></el-input>
      </el-form-item>
      <!-- 没密码 -->
      <el-form-item prop="password">
        <el-input v-model="ruleForm.password" placeholder="密码 "></el-input>
      </el-form-item>
      <!-- 确认密码 -->
      <el-form-item prop="checkPassword">
        <el-input
          v-model="ruleForm.checkPassword"
          placeholder="确认密码"
        ></el-input>
      </el-form-item>
      <!-- 注册 -->
      <el-form-item>
        <el-button type="primary" @click="handleRegSubmit" class="btnregister"
          >注册</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    
    // 首先要验证
    const validatePass=(rule,value,callback)=>{
      // rule是要验证规则的对象
      // value是输入框的值
      // callback是交验完之后需要执行的
      if(value===''){
        callback(new error('请再次输入密码'))
      } else if(value!==this.ruleForm.password){
        callback(new error('密码不一致'))
      }else{
        callback()
      }
    }
    return {
      props:[],
      ruleForm: {
        username: "13516628017", //登录用户手机
        captcha: "000000", //验证码
        nickname: "123", //昵称
        password: "123",
        checkPassword: "123"
      },
      rules: {
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          }
        ],
        checkPassword: [
          {
            validator: validatePass,
            trigger: "blur"
          }
        ],
        nickname: [
          {
            required: true,
            message: "请输入昵称",
            trigger: "blur"
          }
        ],
        captcha: [
          {
            message: "请输入验证码",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    // 发送验证码
    handleSendCaptcha() {
      if(!this.ruleForm.username){
        this.$confirm('手机号不能为空','提示',
        {
          confirmButtonText:'确定',
          showCancelButton:"false",
          type:'warning'
        }
        )
        return
      }
      if(this.ruleForm.username.length !==11){
        this.$confirm('手机号码格式错误','提示',{
          confirmButtonText:'确定',
          showCancelButton:"false",
          type:'warning'
        })
        return
      }
      // 发送验证请求
      this.$axios({
        method:'POST',
        url:`/captchas`,
        data:{
          tel:this.ruleForm.username
        }
      })
      .then(res=>{
        console.log(res);
        const {code}=res.data
        this.$confirm(`请查收验证码${code}`,'提示',{
          confirmButtonText: '确定',
            showCancelButton: false,
            type: 'warning'
        })
      })
    },
    // 发送注册事件
    handleRegSubmit() {
      this.$refs['ruleForm'].validate((valid)=>{
        if(valid){
          //提交注册
          // console.log(this.ruleForm);
          const {checkPassword,...props}=this.ruleForm
          //因为验证密码不需要提交，所以要单独把他拿出来
          // this.$axios({
          //   method:'POST',
          //   url:`/accounts/register`,
          //   data:props
          // })
          // .then(res=>{
          //   console.log(res);
          //   if(res.data.token){
          //     //清空输入内容
          //     this.ruleForm=''
          //     this.$emit('click')
          //     this.$message({
          //       message:'注册成功，现在去登录吧',
          //       type:'success'
          //     })
          //    setTimeout(() => {
          //       this.$router.push('/user/login')
          //    }, 2000);
          //   }
          // })
          this.$store.dispatch('user/register',props)
          .then(res=>{
            console.log(res);
             if(res){
              //清空输入内容
              this.ruleForm=''
              this.$emit('click')
              this.$message({
                message:'注册成功，现在去登录吧',
                type:'success'
              })
             setTimeout(() => {
                this.$router.push('/user/login')
             }, 2000);
            }
          })
          .catch(error=>{
            console.log(error);
            this.$message({
              message:'注册失败，请重新尝试',
              type:'warning'
            })
          })
        }
      })
    }
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
