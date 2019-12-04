<template>
  <section class="container">
    <h2 class="feijipiao">
      <span class="iconfont iconfeiji"></span>
      <i>国内机票</i>
    </h2>
    <!-- 单程或往返 -->
    <el-row type="flex" justify="space-between" class="singlegroup">
      <!-- 搜索菜单 -->
      <searchForm></searchForm>
      <!-- bannee广告 -->
      <div class="banner">
        <img src="http://157.122.54.189:9093/images/pic_sale.jpeg" alt="" />
      </div>
    </el-row>
    <!-- 菜单栏 -->
    <el-row type="flex" justify="space-around" class="travelList">
      <div>
        <span
          class="iconfont iconweibiaoti-_huabanfuben"
          style="color:#409EFF;"
        ></span>
        <i>100%航班认证</i>
      </div>
      <div>
        <span class="iconfont iconbaozheng" style="color:green"></span>
        <i>出行认证</i>
      </div>
      <div>
        <span class="iconfont icondianhua" style="color:blue"></span>
        <i>72小时服务</i>
      </div>
    </el-row>
    <!-- 特价机票 -->
    <h2 class="feijipiao">
      <span class="iconfont iconfeiji"></span>
      <i>国内机票</i>
    </h2>
    <!-- 特价 -->
    <div class="specialprice">
      <h2>我是特价</h2>
    </div>
  </section>
</template>

<script>
import searchForm from "@/components/air/searchForm";
export default {
  data() {
    return {};
  },
  components: {
    searchForm
  }
};
</script>

<style lang="less">
.container {
  width: 1000px;
  .feijipiao {
    padding: 15px 0;
    color: rgb(255, 174, 0);
    .iconfeiji {
      font-size: 23px;
    }
  }
  .singlegroup {
    margin-bottom: 15px;
  }
  .travelList {
    border: 1px solid #999;
    padding: 15px 20px;
    background-color: rgb(221, 209, 209);
    height: 50px;
    vertical-align: middle;
    font-size: 15px;
    div {
      width: 33%;
      text-align: center;
      &:after {
        content: "";
        height: 20px;
        border-right: 1px solid #999;
        float: right;

        span {
          font-size: 30px;
          vertical-align: middle;
        }
      }
      &:nth-child(3) {
        &:after {
          border: none;
        }
      }
    }
  }
  .specialprice {
    border: 1px solid #999;
  }
}
</style>
