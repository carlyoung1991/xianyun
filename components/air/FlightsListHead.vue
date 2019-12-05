<template>
  <div class="flight-item">
    <el-row type="flex" align="middle" class="flight-info">
      <el-col :span="6"> <span>东航 </span> MU5316 </el-col>
        <el-col :span='12'>
            <el-row type="flex" justify="space-between">
                <el-col :span="8">
                    <p>20:30</p>
                    <span>白云机场</span>
                </el-col>
                <el-col :span="8">
                    <p>2时30分</p>
                </el-col>
                <el-col :span="8">
                    <p>20:50</p>
                    <span>红椒机场</span>
                </el-col>
            </el-row>
        </el-col>
        <el-col :span="6"> 
            ￥<span>810</span>起
         </el-col>
    </el-row>
  </div>
</template>

<script>
export default {};
</script>

<style lang='less'>

</style>
