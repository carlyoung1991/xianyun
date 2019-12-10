<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 其他代码 -->
        <FlightsFilter :data="cachFlighterData" @setDataList="setDataListabc" />
        <!-- 航班头部布局 -->
        <FlightsListHead />
        <!-- 航班信息 -->
        
        <!-- 航班列表 -->
        <FlightsItem
          v-for="(item, index) in dataList"
          :key="index"
          :data="item"
        />
        <el-row type="flex" justify="center" style="margin-top:10px;">
          <!-- size-change是切换条数是触发 -->
          <!-- current-change切换页数时触发 -->
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page="pageIndex"
            :page-sizes="[10, 15, 20, 25]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="flightdata.total"
            v-if="dataList.length > 0"
          >
          </el-pagination>
          <div v-else-if="!loading">
            这一页没有数据
          </div>
        </el-row>
      </div>

      <!-- 其他代码... -->
      <FlightsAside/>
    </el-row>
  </section>
</template>

<script>
import FlightsListHead from "@/components/air/flightsListHead.vue";
import FlightsItem from "@/components/air/flightsItem.vue";
import FlightsFilter from "@/components/air/flightFilter.vue";
import FlightsAside from "@/components/air/flightAside.vue";

export default {
  data() {
    return {
      loading: true,
      //因为刷选数据会改变原来的数据，所以要建立一个新的数组存储
      cachFlighterData:{
        flights: [],
        info: {},
        options: {}
      },
      flightdata: {
        flights: [],
        info: {},
        options: {}
      },
      pageIndex: 1,
      pageSize: 15,
      total: ""
      //过滤数据
    };
  },

  components: {
    FlightsListHead,
    FlightsItem,
    FlightsFilter,
    FlightsAside
  },
  //监听计算每次发生改变后的变化
  computed:{
    dataList(){
       const start = (this.pageIndex - 1) * this.pageSize;
      const end = start + this.pageSize;
     return this.flightdata.flights.slice(start, end);
    }
  },
  watch:{
    $route(){
    }
  },
  // 获取航班列表信息
  mounted() {
    // this.getData();
     this.$axios({
        url: `airs`,
        params: this.$route.query
      }).then(res => {
        this.loading = false;
        this.flightdata = res.data;
          // 缓存一份新的列表数据数据，这个列表不会被修改
                // 而flightsData会被修改
        this.cachFlighterData={...this.flightdata}
      });
  },
  methods: {
    //接收子串父的数据
    setDataListabc(newFlightsList) {
      // console.log(newFlightsList);
      this.flightdata.flights = newFlightsList;
    },
    // getData() {
     
    // },
    // 分页功能
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      // this.pageIndex=1
      // this.setDataList();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pageIndex = val;
      // this.setDataList();
    // },
    // setDataList(arr) {
    //   if(arr){
    //     console.log(arr);
    //     this.pageIndex=1;
    //     this.flightdata.flights=arr
    //     this.flightdata.total=arr.length
    //   }
    //   const start = (this.pageIndex - 1) * this.pageSize;
    //   const end = start + this.pageSize;
    //   this.flightList = this.flightdata.flights.slice(start, end);
    // }
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
