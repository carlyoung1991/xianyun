<template>
  <div class="flight-item">
    <div @click="handlerShow">
      <!-- 显示的机票信息 -->
      <el-row type="flex" align="middle" class="flight-info">
        <el-col :span="6">
          <span>{{ data.airline_name }}</span> {{ data.flight_no }}
        </el-col>
        <el-col :span="12">
          <el-row
            type="flex"
            justify="space-between"
            class="flight-info-center"
          >
            <el-col :span="8" class="flight-airport">
              <strong>{{ data.dep_time }}</strong>
              <span
                >{{ data.org_airport_name }}{{ data.org_airport_quay }}</span
              >
            </el-col>
            <el-col :span="8" class="flight-time">
              <span>{{ ranktime }}</span>
            </el-col>
            <el-col :span="8" class="flight-airport">
              <strong>{{ data.arr_time }}</strong>
              <span
                >{{ data.dst_airport_name }}{{ data.dst_airport_quay }}</span
              >
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="6" class="flight-info-right">
          ￥<span class="sell-price">{{
            data.seat_infos[0].org_settle_price_child
          }}</span
          >起
        </el-col>
      </el-row>
    </div>

    <div  class="flight-recommend">
      <el-collapse-transition>
        <div v-show="isShowRecommend">
          <div class="transition-box">
            <el-row type="flex" justify="space-between" align="middle">
              <el-col :span="4">低价推荐</el-col>
              <el-col :span="20">
                <el-row
                  type="flex"
                  justify="space-between"
                  align="middle"
                  class="flight-sell"
                  v-for="(item, index) in data.seat_infos"
                  :key="index"
                >
                  <el-col :span="16" class="flight-sell-left">
                    <span>{{ item.name }}</span> | {{ item.supplierName }}
                  </el-col>
                  <el-col :span="5" class="price">
                    ￥{{ item.org_settle_price }}
                  </el-col>
                  <el-col :span="3" class="choose-button">
                    <el-button type="warning" size="mini">
                      选定
                    </el-button>
                    <p>剩余：{{ item.discount }}</p>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-collapse-transition>
    </div>

    <div class="flight-recommend" v-if="isShowRecommend">
      <!-- 隐藏的座位信息列表 -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShowRecommend: false
    };
  },
  methods: {
    handlerShow() {
      setTimeout(() => {
        this.isShowRecommend = !this.isShowRecommend;
      }, );
    }
  },
  props: ["data"],
  computed: {
    //计算相差的时间
    ranktime() {
      // const dep = this.data.dep_time.split(":");
      // const arr = this.data.arr_time.split(":");
      // const depVal = dep[0] * 60 + (+dep[1]);
      // const arrVal = arr[0] * 60 + (+arr[1]);
      // //在一个变量前加上一个+号，强制转换为数字类型，也转换为一元运算符

      // //计算时间相减得到分钟
      // let dis = arrVal - depVal;
      // //如果是第二天凌晨，需要加上24小时
      // if (dis < 0) {
      //   dis = arrVal + 24 * 60 - depVal;
      // }
      // //得到相差时间
      // return `${Math.floor(dis / 60)}时${dis % 60}分`;

      //利用时间戳来计算航班飞行时间 date.getTime()
      //时间格式是2019-10-10 00:20:20
      // 1.之间作为参数创建一个日期对象
      //因为时间错用的是格林披治时间精确到毫秒
      var arr_time = new Date(this.data.arr_datetime).getTime(); //到达时间
      var dep_time = new Date(this.data.dep_datetime).getTime();
      // console.log(arr_time);
      var ranktime = arr_time - dep_time;
      if (ranktime < 0) {
        var minutesSecond = 24 * 60 * 60 * 1000;
        var ranktime = arr_time + minutesSecond - dep_time;
      }
      var minutesSecondRes = ranktime / 60 / 1000;
      var ranktimeHours = Math.floor(minutesSecondRes / 60);
      var ranktimeMinutes = minutesSecondRes % 60;
      return ranktimeHours + "小时" + ranktimeMinutes + "分钟";
    }
  }
};
</script>

<style scoped lang="less">
.flight-item {
  border: 1px #ddd solid;
  margin-bottom: 10px;

  .flight-info {
    padding: 15px;
    cursor: pointer;

    > div {
      &:first-child,
      &:last-child {
        text-align: center;
      }
    }
  }

  .flight-info-center {
    padding: 0 30px;
    text-align: center;

    .flight-airport {
      strong {
        display: block;
        font-size: 24px;
        font-weight: normal;
      }
      span {
        font-size: 12px;
        color: #999;
      }
    }

    .flight-time {
      span {
        display: inline-block;
        padding: 10px 0;
        border-bottom: 1px #eee solid;
        color: #999;
      }
    }
  }

  .flight-info-right {
    .sell-price {
      font-size: 24px;
      color: orange;
      margin: 0 2px;
    }
  }
}

.flight-recommend {
  background: #f6f6f6;
  border-top: 1px #eee solid;
  padding: 0 20px;

  .flight-sell {
    border-bottom: 1px #eee solid;
    padding: 10px 0;

    &:last-child {
      border-bottom: none;
    }

    .flight-sell-left {
      font-size: 12px;
      span {
        color: green;
      }
    }

    .price {
      font-size: 20px;
      color: orange;
    }

    .choose-button {
      text-align: center;
      color: #666;
      button {
        display: block;
        width: 100%;
        margin-bottom: 5px;
      }
    }
  }
}
</style>
