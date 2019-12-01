<template>
  <div class="header">
    <el-row type="flex" class="mian" justify="space-between">
      <!-- logo -->
      <div class="logo">
        <nuxt-link to="/">
          <img src="http://157.122.54.189:9093/images/logo.jpg" alt="" />
          <h1>头部</h1>
        </nuxt-link>
      </div>
      <!-- 导航 -->
      <div class="nav-bar">
        <span>首页</span>
        <span>旅游攻略</span>
        <span>酒店</span>
        <span>国内机票</span>
      </div>
      <!-- 登录注册 -->
      <div class="login">
        <div class="message">
          <span class="el-icon-bell"></span>
          <i>消息</i>
          <span class="el-icon-caret-bottom upside"></span>
        </div>
        <div class="denglu">
          <div class="loginuser">登录</div>
          <i class="xiegang">/</i>
          <div class="loginuser">注册</div>
        </div>
      </div>
    </el-row>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less">
.header {
  height: 60px;
  border: 1px solid #eee;
  box-shadow: 0 2px 3px -1px #eee;
  .mian {
    width: 1000px;
    margin: 0 auto;
    .logo {
      img {
        width: 80%;
      }
    }
  }
  .nav-bar {
    flex: 1;
    display: block;
    font-size: 18px;
    line-height: 60px;
    span {
      margin-right: 30px;
    }
  }
  .login {
    display: flex;
    line-height: 60px;
    color: #666;
    .message {
      vertical-align: middle;
      display: flex;
      line-height: 60px;
      height: 60px;
      .upside {
        width: 25px;
        text-align: center;
      }
      span {
        display: block;
        line-height: 60px;
      }
    }
    .denglu {
        &:hover{
            color: aqua;
            border-bottom: 1px solid aqua;
        }
      display: flex;
      .xiegang{
          display: block;
          width: 15px;
          text-align: center;
      }
    }
  }
}
</style>
