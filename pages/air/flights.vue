<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->
        <div></div>

        <!-- 航班头部布局 -->
        <el-row class="flight-title">
          <el-col :span="5">
            航空信息
          </el-col>
          <el-col :span="14">
            <el-row type="flex" justify="space-between">
              <el-col :span="12">
                起飞时间
              </el-col>
              <el-col :span="12">
                到达时间
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="5">
            价格
          </el-col>
        </el-row>
        <flightListHead/>
        <!-- 航班信息 -->
        <div></div>
      </div>

      <!-- 侧边栏 -->
      <div class="aside">
        <!-- 侧边栏组件 -->
      </div>
    </el-row>
  </section>
</template>

<script>
import flightListHead from '@/components/air/FlightsListHead'
export default {
    data(){
        return{}
    },
    components:{
        flightListHead
    }
};
</script>

<style lang="less">
.contianer {
  width: 1000px;
  margin: 20px auto;
}

.flights-content {
  width: 745px;
  font-size: 14px;
}

.aside {
  width: 240px;
}
.flight-title {
  padding: 0 15px;
  border: 1px #ddd solid;
  background: #f6f6f6;
  height: 38px;
  line-height: 38px;
  color: #666;
  font-size: 12px;
  margin-bottom: 10px;

  > div {
    text-align: center;
  }
}
</style>
