<template>
  <div class="container">
    <el-row type="flex" justify="space-between">
      <!-- 订单表单 -->

      <div class="main">
        <orderForm :data='infoData'
        @setAllprice='setAllprice'/>
      </div>

      <!-- 侧边栏 -->
      <div class="aside">
          <orderAside :data='infoData'
          :allPrice='allPrice'/>
      </div>
    </el-row>
  </div>
</template>

<script>
import orderForm from "@/components/air/orderForm";
import orderAside from "@/components/air/orderAside";
export default {
    data(){
        return{
            infoData:{
                insurances:[] , //保险数据
                seat_infos:{}
            },
            allPrice:{
                 length:'',
                 price:0
            }
        }
    },
  mounted() {
    const { query } = this.$route;
    this.$axios({
      url: `airs/${query.id}`,
      params: {
        seat_xid: query.seat_xid
      }
    })
    .then(res=>{
        console.log(res);
        this.infoData=res.data
    })
  },
  components: {
    orderForm,
    orderAside
  },
  //监听纸组件发送的事件
  methods:{
      setAllprice(price){
      this.allPrice=price
  }
  }
};
</script>

<style lang="less" scoped>
.container {
  width: 1000px;
  margin: 20px auto;
}

/*aside*/
.aside {
  width: 350px;
  height: fit-content;
  border: 1px #ddd solid;
}
</style>
