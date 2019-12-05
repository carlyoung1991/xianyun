<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 其他代码 -->

        <!-- 航班头部布局 -->
        <FlightsListHead />
        <!-- 航班信息 -->
        <!-- 航班列表 -->
        <FlightsItem
          v-for="(item, index) in flightList"
          :key="index"
          :data="item"
        />
        <el-row type="flex" justify="center" style="margin-top:10px;">
          <!-- size-change是切换条数是触发 -->
          <!-- current-change切换页数时触发 -->
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageIndex"
            :page-sizes="[10, 15, 20, 25]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="flightdata.total"
          >
          </el-pagination>
        </el-row>
      </div>

      <!-- 其他代码... -->
    </el-row>
  </section>
</template>

<script>
import FlightsListHead from "@/components/air/flightsListHead.vue";
import FlightsItem from "@/components/air/flightsItem.vue";

export default {
  data() {
    return {
      flightdata: {},
      flightList: [],
      pageIndex: 1,
      pageSize: 15,
      total:''
    };
  },

  components: {
    FlightsListHead,
    FlightsItem
  },
  // 获取航班列表信息
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.$axios({
        url: `airs`,
        params: this.$route.query
      }).then(res => {
        console.log(res);
        this.flightdata = res.data;
        this.setDataList()
      });
    },
    // 分页功能
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
        this.pageSize=val
        // this.pageIndex=1
        this.setDataList()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pageIndex=val
     this.setDataList()
    },
    setDataList(){
         const start = (this.pageIndex-1)*this.pageSize
      const end =start +this.pageSize
      this.flightList=this.flightdata.flights.slice(start,end)
    }
  }
};
</script>

<style scoped lang="less">
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
</style>
