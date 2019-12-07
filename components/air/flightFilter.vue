<template>
  <div class="filters">
    <el-row
      type="flex"
      class="filters-top"
      justify="space-between"
      align="middle"
    >
      <el-col :span="8">
        单程： {{ data.info.departCity }} - {{ data.info.destCity }} /
        {{ data.info.departDate }}
      </el-col>
      <el-col :span="4">
        <el-select
          size="mini"
          v-model="airport"
          placeholder="起飞机场"
          @change="runTime"
        >
          <el-option
            v-for="(item, index) in data.options.airport"
            :key="index"
            :label="item"
            :value="item"
          >
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select
          size="mini"
          v-model="flightTimes"
          placeholder="起飞时间"
          @change="runTime"
        >
          <el-option
            v-for="(item, index) in data.options.flightTimes"
            :key="index"
            :label="`${item.from}:00-${item.to}:00`"
            :value="`${item.from},${item.to}`"
          >
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select
          size="mini"
          v-model="company"
          placeholder="航空公司"
          @change="runTime"
        >
          <el-option
            label="厦门航空"
            value="厦门航空"
            v-for="(item, index) in data.options.company"
            :key="index"
            :label="item"
            :value="item"
          >
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select
          size="mini"
          v-model="airSize"
          placeholder="机型"
          @change="runTime"
        >
          <el-option
            v-for="(item, index) in sizes"
            :key="index"
            :value="item.size"
            :label="item.name"
          >
          </el-option>
        </el-select>
      </el-col>
    </el-row>
    <div class="filter-cancel">
      筛选：
      <el-button type="primary" round plain size="mini">
        撤销
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["data"],
  data() {
    return {
      airport: "",
      airSize: "",
      company: "",
      flightTimes: "",
      //类型
      sizes: [
        {
          name: "大",
          size: "L"
        },
        {
          name: "中",
          size: "M"
        },
        {
          name: "小",
          size: "S"
        }
      ]
    };
  },
  methods: {
    //原始数据this.data.flights作为初始数据
    runTime(){
      let newFlightsList=this.data.flights
      if(this.airport){
         newFlightsList =this.handleAirport(newFlightsList)
      }
      if(this.flightTimes){
         newFlightsList =this.handleFlightTimes(newFlightsList)
      }
      if(this.company){
         newFlightsList =this.handleCompany(newFlightsList)
      }
      if(this.airSize){
         newFlightsList =this.handleAirSize(newFlightsList)
      }
      //发送事件给父组件
      this.$emit('setDataList',newFlightsList)
    },
    handleAirport(oldDatalist) {
      var newFlightsList =oldDatalist.filter(element=>element.org_airport_name==this.airport)
      return newFlightsList
    },
    handleFlightTimes(oldDatalist) {
      var newFlightsList = oldDatalist.filter(element => {
        // 先获取飞机起飞时间的小时数据
        var depTimeHour = +element.dep_time.split(":")[0];
        // console.log(depTimeHour);
        // this.flightTimes 是一个字符串 "6,12"
        // 先切割成一个数组
        var before = +this.flightTimes.split(",")[0];
        var after = +this.flightTimes.split(",")[1];
        // 数据量少的时候可以写死一个小范围进行测试
        // var before = 21;
        // var after = 22;
        return depTimeHour >= before && depTimeHour < after;
      });
      return newFlightsList;
    },
    handleCompany(oldDatalist) {
       var newFlightsList = oldDatalist.filter(element=>element.airline_name==this.company)
       console.log(newFlightsList);
      return newFlightsList
    },
    handleAirSize(oldDatalist) {
      var newFlightsList = oldDatalist.filter(
        element => element.plane_size == this.airSize
      );
      console.log(newFlightsList);
      return newFlightsList;
    },
  }
};
</script>

<style lang="less">
.filters {
  margin-bottom: 20px;
}

.filters-top {
  > div {
    /deep/ .el-select {
      margin-left: 10px;
    }
  }
}

.filter-cancel {
  margin-top: 10px;
}
</style>
